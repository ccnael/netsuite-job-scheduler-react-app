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
    const { woId, eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (woId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_sub_rel_wo', 'anyof', woId]
      );
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_sub_event', 'anyof', eventId]
      );
    }

    if (!woId && !eventId) {
      filters.push('AND',
        [
          ['custrecord_esp_fop_wo_sub_rel_wo', 'noneof', ['@NONE@', '']],
          'OR',
          ['custrecord_esp_fop_wo_sub_event', 'noneof', ['@NONE@', '']]
        ]
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
          // search.createColumn({
          //   name: 'custentity_esp_fop_ven_avail_resources',
          //   join: 'CUSTRECORD_ESP_FOP_WO_SUB_VENDOR',
          //   label: 'Available Resources'
          // }),
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
   */
  function createVendors(event) {
    const vendors = event?.vendors || [];
    for (const vendor of vendors) {
      try {
        const rec = vendor.woVendorId
          ? record.copy({
            type: env.RecordType.WORK_ORDER_VENDOR,
            id: vendor.woVendorId,
            isDynamic: true
          })
          : record.create({
            type: env.RecordType.WORK_ORDER_VENDOR,
            isDynamic: true
          });
        rec.setValue({ fieldId: 'name', value: vendor.name });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_vendor', value: vendor.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_rel_wo', value: event?.woRef?.id || '' });
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
   * Update existing vendors qtyrequired and memo
   * @param {Object} updatedVendors WO Vendors for update
   */
  function updateVendors(updatedVendors) {
    // log.audit('Updating WO Vendors', { updatedVendors });
    for (const update of updatedVendors) {
      const values = {};
      if (update.updatedQuantityRequired) {
        values.custrecord_esp_fop_wo_sub_qty_rqd = update.updatedQuantityRequired;
      }
      if (update.updatedMemo) {
        values.custrecord_esp_fop_wo_sub_comment = update.updatedMemo;
      }
      record.submitFields({
        type: env.RecordType.WORK_ORDER_VENDOR,
        id: update.woVendorId,
        values,
        options: {
          ignoreMandatoryFieds: true,
        }
      });
      log.audit('----- [Updated WO Vendor Record] -----', { update });
    }
  }

  /**
   * Delete WO Vendor records
   * @param {Object} removedVendors WO Vendors for deletion
   */
  function removeVendors(removedVendors) {
    utils.deleteRecords(env.RecordType.WORK_ORDER_VENDOR, removedVendors.map(x => x.id));
  }

  /**
   * Determines the Work Order (WO) vendors that need to be created, updated, or removed
   * based on the differences between the current event data and the incoming updates.
   *
   * @param {Object} eventData - The original event data containing current WO vendors.
   * @param {Object} updates - The updated event data containing new vendor state.
   * @returns {Object} An object with:
   *  - updatedVendors: Array of vendors that need their time fields updated.
   *  - newVendors: Array of new vendors to be created.
   *  - removedVendors: Array of vendors that are no longer present in the updates.
   */
  function prepareUpdatedWOVendors(eventData, updates) {
    const selectedVendors = updates.vendors;
    const srcVendors = eventData.vendors;

    const selectedVendorIds = selectedVendors.map(x => x.woVendorId).filter(Boolean);
    const srcVendorIds = srcVendors.map(x => x.id);

    const removedVendors = srcVendors.filter(
      src => !selectedVendorIds.includes(src.id)
    );

    const newVendors = selectedVendors.filter(
      upd => !upd.woVendorId || !srcVendorIds.includes(upd.woVendorId)
    );
    const updatedVendors = [];

    for (const upd of selectedVendors) {
      const matchId = upd.woVendorId;
      if (!matchId) continue;

      const existing = srcVendors.find(src => src.id === matchId);
      if (existing) {
        const valuesToUpdate = {};
        if (existing.quantityRequired !== upd.quantityRequired) {
          valuesToUpdate.updatedQuantityRequired = upd.quantityRequired;
        }
        if (existing.memo !== upd.memo) {
          valuesToUpdate.updatedMemo = upd.memo;
        }
        if (Object.keys(valuesToUpdate).length) {
          updatedVendors.push({
            ...upd,
            ...valuesToUpdate
          });
        }
      }
    }

    return {
      updatedVendors,
      newVendors,
      removedVendors
    }
  }

  return {
    getVendors,
    createVendors,
    updateVendors,
    removeVendors,
    prepareUpdatedWOVendors
  }
})