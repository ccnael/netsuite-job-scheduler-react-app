/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  './esp_cm_helper',
  './esp_cm_utils',
  './esp_cm_constants'
], (search, record, helper, utils, env) => {
  /**
   * Get the list of WO items
   * @param {Object} context Suitelet object
   */
  function getItems(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId, eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (woId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_item_rel_wo', 'is', woId]
      );
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_item_event', 'is', eventId]
      );
    }

    if (!woId && !eventId) {
      filters.push('AND',
        [
          ['custrecord_esp_fop_wo_item_rel_wo', 'noneof', ['@NONE@', '']],
          'OR',
          ['custrecord_esp_fop_wo_item_event', 'noneof', ['@NONE@', '']]
        ]
      );
    }

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_ITEM,
      filters,
      columns:
        [
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_rel_wo', label: 'Work Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_so', label: 'Sales Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_event', label: 'Work Order Event' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_name', label: 'Item' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_description', label: 'Description' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_quantity', label: 'Quantity' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_memo', label: 'Memo' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_line_id', label: 'Line ID' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_uuid', label: 'UUID' }),
          search.createColumn({ name: 'custrecord_esp_fop_total_ir', label: 'Received Quantity' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_item_completedqty', label: 'Completed Quantity' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const items = searchResult.map((map) => ({
      id: map.id,
      workorder: {
        text: map.getText('custrecord_esp_fop_wo_item_rel_wo'),
        value: map.getValue('custrecord_esp_fop_wo_item_rel_wo')
      },
      salesorder: {
        text: map.getText('custrecord_esp_fop_wo_item_so'),
        value: map.getValue('custrecord_esp_fop_wo_item_so')
      },
      event: map.getValue('custrecord_esp_fop_wo_item_event'),
      uuid: map.getValue('custrecord_esp_fop_wo_item_uuid'),
      line: map.getValue('custrecord_esp_fop_wo_item_line_id'),
      item: {
        text: map.getText('custrecord_esp_fop_wo_item_name'),
        value: map.getValue('custrecord_esp_fop_wo_item_name')
      },
      description: map.getValue('custrecord_esp_fop_wo_item_description'),
      quantity: +map.getValue('custrecord_esp_fop_wo_item_quantity'),
      availableQty: +map.getValue('custrecord_esp_fop_wo_item_quantity'),
      note: map.getValue('custrecord_esp_fop_wo_item_memo'),
      quantityReceived: +map.getValue('custrecord_esp_fop_total_ir'),
      completedQty: +map.getValue('custrecord_esp_fop_wo_item_completedqty')
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    // log.audit('----- [Work Order Items] -----', items.length);
    response.write(JSON.stringify(items));
  }

  /**
   * Create WO items selected from the WO
   * @param {Object} event Event data
   */
  function createItems(event) {
    const items = event?.items || [];
    for (const item of items) {
      try {
        const rec = record.copy({
          type: env.RecordType.WORK_ORDER_ITEM,
          id: item.id,
          isDynamic: true
        });
        rec.setValue({ fieldId: 'name', value: item.name });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_quantity', value: item.quantity });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_completedqty', value: 0 });
        item.id = rec.save({ ignoreMandatoryFieds: true });
        log.audit('----- [Created WO Item Record] -----', item.id);
      } catch (e) {
        log.error('Error on WO Item > Create', { item, errorMsg: e.message });
        item.errorMsg = e.message;
      }
    }
  }

  /**
   * Update existing items quantity
   * @param {Object} updatedItems WO Items for update
   */
  function updateItems(updatedItems) {
    // log.audit('Updating WO Items', { updatedItems });
    for (const update of updatedItems) {
      const values = {};
      if (update.updatedQuantity) {
        values.custrecord_esp_fop_wo_item_quantity = update.updatedQuantity;
      }
      if (update.updatedCompleteQuantity) {
        values.custrecord_esp_fop_wo_item_completedqty = update.updatedCompleteQuantity;
      }
      record.submitFields({
        type: env.RecordType.WORK_ORDER_ITEM,
        id: update.id,
        values,
        options: {
          ignoreMandatoryFieds: true,
        }
      });
      log.audit('----- [Updated WO Item Record] -----', { update });
    }
  }

  /**
   * Delete WO Items records
   * @param {Object} removedItems WO Items for deletion
   */
  function removeItems(removedItems) {
    utils.deleteRecords(env.RecordType.WORK_ORDER_ITEM, removedItems.map(x => x.id));
  }

  /**
 * Determines the Work Order (WO) items that need to be created, updated, or removed
 * based on the differences between the current event data and the incoming updates.
 *
 * @param {Object} eventData - The original event data containing current WO items.
 * @param {Object} updates - The updated event data containing new item state.
 * @returns {Object} An object with:
 *  - updatedItems: Array of items that need their time fields updated.
 *  - newItems: Array of new items to be created.
 *  - removedItems: Array of items that are no longer present in the updates.
 */
  function prepareUpdatedWOItems(eventData, updates) {
    const selectedItems = updates.items;
    const srcItems = eventData.items;

    const selectedItemIds = selectedItems.map(x => x.id).filter(Boolean);
    const srcItemsIds = srcItems.map(x => x.id);

    const removedItems = srcItems.filter(
      src => !selectedItemIds.includes(src.id)
    );

    const newItems = selectedItems.filter(
      upd => !upd.id || !srcItemsIds.includes(upd.id)
    );
    const updatedItems = [];

    for (const upd of selectedItems) {
      const matchId = upd.id;
      if (!matchId) continue;

      const existing = srcItems.find(src => src.id === matchId);
      if (existing) {
        const valuesToUpdate = {};
        if (existing.quantity !== upd.quantity) {
          valuesToUpdate.updatedQuantity = upd.quantity;
        }
        if (existing.completedQty && existing.completedQty !== upd.endTime) {
          valuesToUpdate.updatedCompleteQuantity = upd.completedQty;
        }
        if (Object.keys(valuesToUpdate).length) {
          updatedItems.push({
            ...upd,
            ...valuesToUpdate
          });
        }
      }
    }

    return {
      updatedItems,
      newItems,
      removedItems
    }
  }

  return {
    getItems,
    createItems,
    updateItems,
    removeItems,
    prepareUpdatedWOItems
  }
})