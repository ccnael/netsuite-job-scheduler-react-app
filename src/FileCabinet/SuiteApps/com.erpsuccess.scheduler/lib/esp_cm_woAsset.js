/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  './esp_cm_helper',
  './esp_cm_utils',
  './moment.min',
  './esp_cm_constants'
], (search, record, helper, utils, moment, env) => {
  /**
   * Get the list of WO assets
   * @param {Object} context Suitelet object
   */
  function getAssets(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId, eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (woId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_ast_rel_wo', 'anyof', woId]
      );
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_ast_wo_event', 'anyof', eventId]
      );
    }

    if (!woId && !eventId) {
      filters.push('AND',
        [
          ['custrecord_esp_fop_ast_rel_wo', 'noneof', ['@NONE@', '']],
          'OR',
          ['custrecord_esp_fop_ast_wo_event', 'noneof', ['@NONE@', '']]
        ]
      );
    }

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_ASSET,
      filters,
      columns:
        [
          search.createColumn({ name: 'custrecord_esp_fop_ast_rel_wo', label: 'Work Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_wo_event', label: 'Work Order Event' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_asset_rec', label: 'Asset' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_quantity', label: 'Quantity' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_item_desc', label: 'Item Description' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_is_owned', label: 'Is Owned' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_start_date', label: 'Start Date' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_end_date', label: 'End Date' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_start_time', label: 'Start Time' }),
          search.createColumn({ name: 'custrecord_esp_fop_ast_end_time', label: 'End Time' }),
          search.createColumn({
            name: 'custrecord_esp_fop_is_maintenance',
            join: 'custrecord_esp_fop_ast_asset_rec',
            label: 'Asset on Maintenance'
          }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const assets = searchResult.map((map) => ({
      id: map.id,
      name: map.getText('custrecord_esp_fop_ast_asset_rec'),
      workorder: {
        text: map.getText('custrecord_esp_fop_ast_rel_wo'),
        value: map.getValue('custrecord_esp_fop_ast_rel_wo')
      },
      event: map.getValue('custrecord_esp_fop_ast_wo_event'),
      quantity: +map.getValue('custrecord_esp_fop_ast_quantity'),
      maxQuantity: +map.getValue('custrecord_esp_fop_ast_quantity'),
      description: map.getValue('custrecord_esp_fop_ast_item_desc'),
      asset: {
        text: map.getText('custrecord_esp_fop_ast_asset_rec'),
        value: map.getValue('custrecord_esp_fop_ast_asset_rec')
      },
      onMaintenance: map.getValue({ name: 'custrecord_esp_fop_is_maintenance', join: 'custrecord_esp_fop_ast_asset_rec' }),
      owned: map.getValue('custrecord_esp_fop_ast_is_owned'),
      get time() {
        const startTime = map.getValue('custrecord_esp_fop_ast_start_time');
        const endTime = map.getValue('custrecord_esp_fop_ast_end_time');
        return {
          start: startTime && moment(`1/1/1999 ${startTime}`).format(env.Format.EXPORT_TIME),
          end: endTime && moment(`1/1/1999 ${endTime}`).format(env.Format.EXPORT_TIME)
        }
      },
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    // log.audit('----- [Work Order Assets] -----', assets);
    response.write(JSON.stringify(assets));
  }

  /**
   * Transform assets to WO assets
   * @param {Object} event Event data
   */
  function createAssets(event) {
    const assets = event?.assets || [];
    for (const asset of assets) {
      try {
        const rec = asset.woAssetId
          ? record.copy({
            type: env.RecordType.WORK_ORDER_ASSET,
            id: asset.woAssetId,
            isDynamic: true
          })
          : record.create({
            type: env.RecordType.WORK_ORDER_ASSET,
            isDynamic: true
          });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_asset_rec', value: asset.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rel_wo', value: event?.woRef?.id || '' });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_wo_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_quantity', value: asset.quantity });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_is_owned', value: !!asset.owned });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_start_date', value: event.parsedStartDate });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_end_date', value: event.parsedEndDate });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_ast_start_time',
          value: helper.toDateTimez(event.date.start, asset.startTime)
        });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_ast_end_time',
          value: helper.toDateTimez(event.date.start, asset.endTime)
        });
        const newId = rec.save({ ignoreMandatoryFieds: true });
        log.audit('----- [Created WO Asset Record] -----', newId);
      } catch (e) {
        log.error('Error on WO asset > Create', { asset, errorMsg: e.message });
        asset.errorMsg = e.message;
      }
    }
  }

  /**
   * Update existing assets qty, start/end time
   * @param {Object} updatedAssets WO Assets for update
   */
  function updateAssets(updatedAssets) {
    // log.audit('Updating WO Assets', { updatedAssets });
    for (const update of updatedAssets) {
      const values = {};

      if (update.updatedQuantity) {
        values.custrecord_esp_fop_ast_quantity = update.updatedQuantity;
      }
      if (update.updatedStartTime) {
        values.custrecord_esp_fop_ast_start_time = moment(`1/1/1999 ${update.updatedStartTime}`).format(env.Format.IMPORT_TIME);
      }
      if (update.updatedEndTime) {
        values.custrecord_esp_fop_ast_end_time = moment(`1/1/1999 ${update.updatedEndTime}`).format(env.Format.IMPORT_TIME);
      }
      record.submitFields({
        type: env.RecordType.WORK_ORDER_ASSET,
        id: update.woAssetId,
        values,
        options: {
          ignoreMandatoryFieds: true,
        }
      });
      log.audit('----- [Updated WO Asset Record] -----', { update });
    }
  }

  /**
   * Delete WO Assets records
   * @param {Object} removedAssets WO Assets for deletion
   */
  function removeAssets(removedAssets) {
    utils.deleteRecords(env.RecordType.WORK_ORDER_ASSET, removedAssets.map(x => x.id));
  }

  /**
   * Determines the Work Order (WO) assets that need to be created, updated, or removed
   * based on the differences between the current event data and the incoming updates.
   *
   * @param {Object} eventData - The original event data containing current WO assets.
   * @param {Object} updates - The updated event data containing new asset state.
   * @returns {Object} An object with:
   *  - updatedAssets: Array of assets that need their time fields updated.
   *  - newAssets: Array of new assets to be created.
   *  - removedAssets: Array of assets that are no longer present in the updates.
   */
  function prepareUpdatedWOAssets(eventData, updates) {
    const selectedAssets = updates.assets;
    const srcAssets = eventData.assets;

    const selectedAssetIds = selectedAssets.map(x => x.woAssetId).filter(Boolean);
    const srcAssetIds = srcAssets.map(x => x.id);

    const removedAssets = srcAssets.filter(
      src => !selectedAssetIds.includes(src.id)
    );

    const newAssets = selectedAssets.filter(
      upd => !upd.woAssetId || !srcAssetIds.includes(upd.woAssetId)
    );
    const updatedAssets = [];

    for (const upd of selectedAssets) {
      const matchId = upd.woAssetId;
      if (!matchId) continue;

      const existing = srcAssets.find(src => src.id === matchId);
      if (existing) {
        const valuesToUpdate = {};
        if (existing.quantity !== upd.quantity) {
          valuesToUpdate.updatedQuantity = upd.quantity;
        }
        if (existing.time?.start !== upd.startTime) {
          valuesToUpdate.updatedStartTime = upd.startTime;
        }
        if (existing.time?.end !== upd.endTime) {
          valuesToUpdate.updatedEndTime = upd.endTime;
        }
        if (Object.keys(valuesToUpdate).length) {
          updatedAssets.push({
            ...upd,
            ...valuesToUpdate
          });
        }
      }
    }

    return {
      updatedAssets,
      newAssets,
      removedAssets
    }
  }

  /**
   * Applies when dragging and assigning new asset events in the calendar view
   * @param {Object} context Suitelet object
   */
  function updateCalendarAssetAssignment(context) {
    const { request, response } = context;
    const requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);

    try {
      const assetLookup = search.lookupFields({
        type: env.RecordType.WORK_ORDER_ASSET,
        id: payload.id,
        columns: ['custrecord_esp_fop_ast_asset_rec']
      });
      const oldResourceId = assetLookup.custrecord_esp_fop_ast_asset_rec[0]?.value;
      const newResourceId = payload.newResource.id;
      const values = {};
      values.custrecord_esp_fop_ast_start_time = moment(`1/1/1999 ${payload.time.start}`).format(env.Format.IMPORT_TIME);
      values.custrecord_esp_fop_ast_end_time = moment(`1/1/1999 ${payload.time.end}`).format(env.Format.IMPORT_TIME);

      if (oldResourceId != newResourceId) {
        const newResource = payload.newResource;
        values.custrecord_esp_fop_ast_asset_rec = newResourceId;
        // values.custrecord_esp_fop_ast_site = newResource.site.value;
        // values.custrecord_esp_fop_ast_quantity = newResource.quantity;
        values.custrecord_esp_fop_ast_is_owned = newResource.owned;
        values.custrecord_esp_fop_ast_is_consumable = newResource.consumable;
        values.custrecord_esp_fop_ast_item_desc = newResource.description;
      }

      if (Object.keys(values).length) {
        record.submitFields({
          type: env.RecordType.WORK_ORDER_ASSET,
          id: payload.id,
          values,
          options: {
            ignoreMandatoryFieds: true
          }
        });
        log.audit('----- [Updated WO Asset Record] -----', { payload });

        response.write(JSON.stringify({
          code: 200,
          recordId: payload.id,
          status: 'success'
        }));
      }
    } catch (e) {
      log.error('Error on WO Asset > Update', { payload, errorMsg: e.message });

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  /**
   * Applies when resizing asset events in the calendar view
   * @param {Object} context Suitelet object 
   */
  function updateCalendarResizedDateTime(context) {
    const { request, response } = context;
    let requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);
    // log.debug('updateAssetDateTime', payload);

    try {
      const assetLookup = search.lookupFields({
        type: env.RecordType.WORK_ORDER_ASSET,
        id: payload.id,
        columns: [
          'custrecord_esp_fop_ast_start_date',
          'custrecord_esp_fop_ast_end_date',
          'custrecord_esp_fop_ast_start_time',
          'custrecord_esp_fop_ast_end_time'
        ]
      });
      const values = {};
      // Check if dates changed
      const startDate = moment(payload.date.start).format(env.Format.IMPORT_DATE);
      const endDate = moment(payload.date.end).format(env.Format.IMPORT_DATE);
      if (assetLookup.custrecord_esp_fop_ast_start_date != startDate) {
        values.custrecord_esp_fop_ast_start_date = startDate;
      }
      if (assetLookup.custrecord_esp_fop_ast_end_date != endDate) {
        values.custrecord_esp_fop_ast_end_date = endDate;
      }
      // Check if times changed
      const startTime = moment(`1/1/1999 ${payload.time.start}`).format(env.Format.IMPORT_TIME);
      const endTime = moment(`1/1/1999 ${payload.time.end}`).format(env.Format.IMPORT_TIME);
      if (assetLookup.custrecord_esp_fop_ast_start_time != startTime) {
        values.custrecord_esp_fop_ast_start_time = startTime;
      }
      if (assetLookup.custrecord_esp_fop_ast_end_time != endTime) {
        values.custrecord_esp_fop_ast_end_time = endTime;
      }

      if (Object.keys(values).length) {
        record.submitFields({
          type: env.RecordType.WORK_ORDER_ASSET,
          id: payload.id,
          values,
          options: {
            ignoreMandatoryFieds: true
          }
        });
        log.audit('----- [Updated WO Asset Record] -----', { payload });

        response.write(JSON.stringify({
          code: 200,
          recordId: payload.id,
          status: 'success'
        }));
      }
    } catch (e) {
      log.error('Error on WO Asset > Update', { payload, errorMsg: e.message });

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  return {
    getAssets,
    createAssets,
    updateAssets,
    removeAssets,
    prepareUpdatedWOAssets,
    updateCalendarAssetAssignment,
    updateCalendarResizedDateTime
  }
})