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
   * Get the list of WO addresses
   * @param {Object} context Suitelet object
   */
  function getAddresses(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId, eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (woId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_address_rel_wo', 'is', woId]
      );
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_add_event', 'is', eventId]
      );
    }

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_ADDRESS,
      filters,
      columns:
        [
          search.createColumn({ name: 'custrecord_esp_fop_address_rel_wo', label: 'Work Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_add_customer', label: 'Customer' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_add_event', label: 'Work Order Event' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_address', label: 'Address' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_add_details', label: 'Address Details' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const addresses = searchResult.map((map) => ({
      id: map.id,
      workorder: {
        text: map.getText('custrecord_esp_fop_address_rel_wo'),
        value: map.getValue('custrecord_esp_fop_address_rel_wo')
      },
      customer: {
        text: map.getText('custrecord_esp_fop_wo_add_customer'),
        value: map.getValue('custrecord_esp_fop_wo_add_customer')
      },
      events: helper.stringToArray(map.getValue('custrecord_esp_fop_wo_add_event')),
      address: {
        text: map.getText('custrecord_esp_fop_wo_address'),
        value: map.getValue('custrecord_esp_fop_wo_address')
      },
      addressDetails: (map.getValue('custrecord_esp_fop_wo_add_details') || '').replace(/\n/g, '<br/>'),
      get customerUrl() {
        return utils.Url.customerUrl(this.customer.value)
      }
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    // log.audit('----- [Work Order Addresses] -----', addresses);
    response.write(JSON.stringify(addresses));
  }

  /**
   * Add address to the events
   * @param {Object} event Event data
   */
  function addEventToAddresses(event) {
    const addresses = event?.addresses || [];

    for (const address of addresses) {
      if (!address.id) continue;

      try {
        const addressLookUp = search.lookupFields({
          type: env.RecordType.WORK_ORDER_ADDRESS,
          id: address.id,
          columns: 'custrecord_esp_fop_wo_add_event'
        });
        let events = (addressLookUp.custrecord_esp_fop_wo_add_event[0]?.value || '').split(',');
        events.push(event.id);
        events = events.filter(Boolean);

        record.submitFields({
          type: env.RecordType.WORK_ORDER_ADDRESS,
          id: address.id,
          values: {
            custrecord_esp_fop_wo_add_event: events
          },
          options: {
            ignoreMandatoryFieds: true
          }
        });
        log.audit('----- [Added Event to WO Address Record] -----', address);
      } catch (e) {
        log.error('Error on WO Address > Add Events', { address: address.address.text, errorMsg: e.message });
        address.errorMsg = e.message;
      }
    }
  }

  /**
   * Remove the event from the addresses
   * @param {Array} addresses WO addresses
   * @param {String|Number} eventId Event internalid
   */
  function removeEventFromAddresses(addresses, eventId) {
    for (const address of addresses) {
      if (!address.id) continue;

      try {
        const lookUp = search.lookupFields({
          type: env.RecordType.WORK_ORDER_ADDRESS,
          id: address.id,
          columns: 'custrecord_esp_fop_wo_add_event'
        });
        const idToRemove = eventId;
        let events = (lookUp.custrecord_esp_fop_wo_add_event[0]?.value || '').split(',');
        const index = events.indexOf(idToRemove);

        if (index > -1) {
          events.splice(index, 1);
        }

        record.submitFields({
          type: env.RecordType.WORK_ORDER_ADDRESS,
          id: address.id,
          values: {
            custrecord_esp_fop_wo_add_event: events
          },
          options: {
            ignoreMandatoryFieds: true
          }
        });
        log.audit('----- [Removed Event from WO Address Record] -----', address);
      } catch (e) {
        log.error('Error on WO Address > Remove Event', { address, errorMsg: e.message });
        address.errorMsg = e.message;
      }
    }
  }

  return {
    getAddresses,
    addEventToAddresses,
    removeEventFromAddresses
  }
})