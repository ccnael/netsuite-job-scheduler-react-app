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
    const { start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

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
   * @param {Object} woRef WO data
   * @param {Boolean} copyEventTime 
   */
  function createAssets(event, woRef, copyEventTime) {
    const assets = event?.selectedAssets || [];
    for (const asset of assets) {
      try {
        const rec = record.create({
          type: env.RecordType.WORK_ORDER_ASSET,
          isDynamic: true
        });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_asset_rec', value: asset.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_wo_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_quantity', value: asset.quantity });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_is_owned', value: !!asset.owned });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rel_wo', value: woRef?.id || '' });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_start_date', value: new Date(event.date.start) });
        rec.setValue({ fieldId: 'custrecord_esp_fop_ast_end_date', value: new Date(event.date.end) });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_ast_start_time',
          value: helper.toDateTimez(event.date.start, !copyEventTime ? asset.time.start : event.time.start) // If no asset start time, use event start time instead
        });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_ast_end_time',
          value: helper.toDateTimez(event.date.start, !copyEventTime ? asset.time.end : event.time.end) // If no asset end time, use event end time instead
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
   * Update existing assets quantity
   * @param {Object} event Event data
   * @param {Object} dataSrc Data source
   * @param {Object} woRef WO data
   */
  function updateAssets(event, dataSrc, woRef) {
    const selectedAssets = event.selectedAssets;
    const selectedassetIds = selectedAssets.map(x => x.id);
    const srcAssets = dataSrc.assets.filter(x => !!x.selected);
    const srcAssetIds = srcAssets.map(x => x.id);
    const removedAssets = srcAssets.filter(x => !(selectedassetIds.includes(x.id)));
    const newAssets = selectedAssets.filter(x => !(srcAssetIds.includes(x.id)));

    log.audit('Updating WO Asset Event List', { selectedAssets, removedAssets, newAssets });

    // If theres quantity to update
    for (const asset of selectedAssets) {
      if (!asset.id) continue;

      try {
        const assetLookUp = search.lookupFields({
          type: env.RecordType.WORK_ORDER_ASSET,
          id: asset.id,
          columns: 'custrecord_esp_fop_ast_quantity'
        });

        if (assetLookUp.custrecord_esp_fop_ast_quantity != asset.quantity) {
          record.submitFields({
            type: env.RecordType.WORK_ORDER_ASSET,
            id: asset.id,
            values: {
              custrecord_esp_fop_ast_quantity: asset.quantity
            },
            options: {
              ignoreMandatoryFieds: true
            }
          });
          log.audit('----- [Updated WO Asset Record] -----', { asset });
        }
      } catch (e) {
        log.error('Error on WO Asset > Update', { asset, errorMsg: e.message });
      }
    }

    // If theres to remove (removed assets)
    utils.deleteRecords(env.RecordType.WORK_ORDER_ASSET, removedAssets.map(x => x.id));

    // If theres to create (newly added assets)
    const clonedEventObj = helper.deepCopy(event);
    clonedEventObj.selectedAssets = newAssets;
    createAssets(clonedEventObj, woRef);
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
    updateCalendarAssetAssignment,
    updateCalendarResizedDateTime
  }
})