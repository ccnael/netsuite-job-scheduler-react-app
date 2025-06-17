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
  function getList(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_ITEM,
      filters:
        [
          ['isinactive', 'is', 'F']
        ],
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

    // log.audit('----- [Work Order Items] -----', items);
    response.write(JSON.stringify(items));
  }

  /**
   * Create WO items selected from the WO
   * @param {Object} event Event data
   */
  function createItems(event) {
    const items = event?.selectedItems || [];
    for (const item of items) {
      try {
        const rec = record.copy({
          type: env.RecordType.WORK_ORDER_ITEM,
          id: item.id,
          isDynamic: true
        });
        rec.setValue({ fieldId: 'name', value: item.item.text });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_quantity', value: item.quantity });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_completedqty', value: 0 });
        item.id = rec.save({ ignoreMandatoryFieds: true });
        log.audit('----- [Created WO Item Record] -----', item.id);
      } catch (e) {
        log.error('Error on WO Item > Create', { item: item.item, errorMsg: e.message });
        item.errorMsg = e.message;
      }
    }
  }

  /**
   * Update existing items quantities
   * @param {Object} event Event data
   * @param {Object} dataSrc Data source
   */
  function updateItems(event, dataSrc) {
    const selectedItems = event.selectedItems;
    const selectedItemIds = selectedItems.map(x => x.id);
    const srcItems = dataSrc.items.filter(x => !!(x.selected));
    const srcItemIds = srcItems.map(x => x.id);
    const removedItems = srcItems.filter(x => !(selectedItemIds.includes(x.id)));
    const newItems = selectedItems.filter(x => !(srcItemIds.includes(x.id)));

    log.audit('Updating WO Item Event List', { selectedItems, removedItems, newItems });

    // If theres to quantity update
    for (const item of selectedItems) {
      if (!item.id) continue;

      try {
        const itemLookUp = search.lookupFields({
          type: env.RecordType.WORK_ORDER_ITEM,
          id: item.id,
          columns: [
            'custrecord_esp_fop_wo_item_quantity',
            'custrecord_esp_fop_wo_item_completedqty'
          ]
        });

        const values = {};

        if (itemLookUp.custrecord_esp_fop_wo_item_quantity != item.quantity) {
          values.custrecord_esp_fop_wo_item_quantity = item.quantity;
        }

        // Upon event completion
        if (itemLookUp.custrecord_esp_fop_wo_item_completedqty != item.completedQty) {
          values.custrecord_esp_fop_wo_item_completedqty = item.completedQty;
        }

        if (Object.keys(values).length) {
          record.submitFields({
            type: env.RecordType.WORK_ORDER_ITEM,
            id: item.id,
            values,
            options: {
              ignoreMandatoryFieds: true
            }
          });
          log.error('----- [Updated WO Item Record] -----', { item });
        }
      } catch (e) {
        log.error('Error on WO Item > Update', { item, errorMsg: e.message });
      }
    }

    // If theres to remove (removed items)
    utils.deleteRecords(env.RecordType.WORK_ORDER_ITEM, removedItems.map(x => x.id));

    // If theres to create (newly added items)
    const clonedEventObj = helper.deepCopy(event);
    clonedEventObj.selectedItems = newItems;
    createItems(clonedEventObj);
  }

  return {
    getList,
    createItems,
    updateItems
  }
})