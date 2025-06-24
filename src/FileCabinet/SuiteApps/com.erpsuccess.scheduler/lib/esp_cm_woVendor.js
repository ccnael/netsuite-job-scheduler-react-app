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
   * Get the list of WO vendors
   * @param {Object} context Suitelet object
   */
  function getVendors(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_sub_event', 'anyof', eventId]
      );
    }

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_VENDOR,
      filters,
      columns:
        [
          search.createColumn({ name: 'name', label: 'Name' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_vendor', label: 'Vendor' }),
          search.createColumn({ name: 'url', join: 'custrecord_esp_fop_wo_sub_vendor', label: 'Web Address' }),
          search.createColumn({ name: 'email', join: 'custrecord_esp_fop_wo_sub_vendor', label: 'Email' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_rel_wo', label: 'Work Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_qty_rqd', label: 'Quantity Required' }),
          search.createColumn({
            name: 'custentity_esp_fop_ven_avail_resources',
            join: 'CUSTRECORD_ESP_FOP_WO_SUB_VENDOR',
            label: 'Available Resources'
          }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_event', label: 'Event' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_po', label: 'Purchase Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_amount', label: 'Amount' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_sub_comment', label: 'Comments' })
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const vendors = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue('name'),
      vendor: {
        text: map.getText('custrecord_esp_fop_wo_sub_vendor'),
        value: map.getValue('custrecord_esp_fop_wo_sub_vendor')
      },
      url: map.getValue(map.columns[2]),
      email: map.getValue(map.columns[3]),
      get initials() {
        let split = this.vendor.text.split(' ').map(name => name.replace(/[^a-zA-Z]/g, ''));
        split = split.filter(Boolean);
        if (split.length > 1) {
          return `${split[0][0]}${split[1][0] || ''}`;
        } else if (split.length == 1) {
          return split[0][0];
        } else {
          return this.vendor.text;
        }
      },
      workorder: {
        text: map.getText('custrecord_esp_fop_wo_sub_rel_wo'),
        value: map.getValue('custrecord_esp_fop_wo_sub_rel_wo')
      },
      event: map.getValue('custrecord_esp_fop_wo_sub_event'),
      quantityRequired: +map.getValue('custrecord_esp_fop_wo_sub_qty_rqd'),
      quantityAvailable: +map.getValue(map.columns[6]),
      purchaseOrder: {
        text: map.getText('custrecord_esp_fop_wo_sub_po'),
        value: map.getValue('custrecord_esp_fop_wo_sub_po')
      },
      amount: +map.getValue('custrecord_esp_fop_wo_sub_amount'),
      active: !!map.getValue(map.columns[6]),
      woVendor: true,
      memo: map.getValue('custrecord_esp_fop_wo_sub_comment') || '',
      time: {
        start: '',
        end: ''
      }
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    // log.audit('----- [Work Order Vendors] -----', vendors);
    response.write(JSON.stringify(vendors));
  }

  /**
   * Transform vendors to WO vendors
   * @param {Object} event Event data
   * @param {Object} woRef WO data
   */
  function createVendors(event, woRef) {
    const vendors = event?.selectedVendors || [];
    for (const vendor of vendors) {
      try {
        const rec = record.create({
          type: env.RecordType.WORK_ORDER_VENDOR,
          isDynamic: true
        });
        rec.setValue({ fieldId: 'name', value: vendor.name });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_vendor', value: vendor.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_rel_wo', value: woRef?.id || '' });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_qty_rqd', value: vendor.quantityRequired });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_comment', value: vendor.memo });
        const newId = rec.save({ ignoreMandatoryFieds: true });
        log.audit('----- [Created WO Vendor Record] -----', newId);
      } catch (e) {
        log.error('Error on WO Vendor > Create', { vendor, errorMsg: e.message });
        vendor.errorMsg = e.message;
      }
    }
  }

  /**
   * Update existing vendors quantity and memo
   * @param {Object} event Event data
   * @param {Object} dataSrc Data source
   * @param {Object} woRef WO data
   */
  function updateVendors(event, dataSrc, woRef) {
    const selectedVendors = event.selectedVendors;
    const selectedVendorIds = selectedVendors.map(x => x.id);
    const srcVendors = dataSrc.vendors.filter(x => !!(x.selected));
    const srcVendorIds = srcVendors.map(x => x.id);
    const removedVendors = srcVendors.filter(x => !(selectedVendorIds.includes(x.id)));
    const newVendors = selectedVendors.filter(x => !(srcVendorIds.includes(x.id)));

    log.audit('Updating WO Vendor Event List', { selectedVendors, removedVendors, newVendors });

    // If theres quantity to update
    for (const vendor of selectedVendors) {
      if (!vendor.id) continue;

      try {
        const vendorLookUp = search.lookupFields({
          type: env.RecordType.WORK_ORDER_VENDOR,
          id: vendor.id,
          columns: ['custrecord_esp_fop_wo_sub_qty_rqd', 'custrecord_esp_fop_wo_sub_comment']
        });

        const values = {};

        if (vendorLookUp.custrecord_esp_fop_wo_sub_qty_rqd != vendor.quantityRequired) {
          values.custrecord_esp_fop_wo_sub_qty_rqd = vendor.quantityRequired;
        }

        if (vendorLookUp.custrecord_esp_fop_wo_sub_comment != vendor.memo) {
          values.custrecord_esp_fop_wo_sub_comment = vendor.memo;
        }

        if (Object.keys(values).length) {
          record.submitFields({
            type: env.RecordType.WORK_ORDER_VENDOR,
            id: vendor.id,
            values,
            options: {
              ignoreMandatoryFieds: true
            }
          });
          log.audit('----- [Updated WO Vendor Record] -----', { vendor });
        }
      } catch (e) {
        log.error('Error on WO Vendor > Update', { vendor, errorMsg: e.message });
      }
    }

    // If theres to remove (removed vendors)
    utils.deleteRecords(env.RecordType.WORK_ORDER_VENDOR, removedVendors.map(x => x.id));

    // If theres to create (newly added vendors)
    const clonedEventObj = helper.deepCopy(event);
    clonedEventObj.selectedVendors = newVendors;
    createVendors(clonedEventObj, woRef);
  }

  return {
    getVendors,
    createVendors,
    updateVendors
  }
})