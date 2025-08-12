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
   * Get the list of WO contacts
   * @param {Object} context Suitelet object
   */
  function getContacts(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId, eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (woId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_rel_wo', 'is', woId]
      );
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_wo_rel_event', 'is', eventId]
      );
    }

    if (!woId && !eventId) {
      filters.push('AND',
        [
          ['custrecord_esp_fop_rel_wo', 'noneof', ['@NONE@', '']],
          'OR',
          ['custrecord_esp_fop_wo_rel_event', 'noneof', ['@NONE@', '']]
        ]
      );
    }

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_CONTACT,
      filters,
      columns:
        [
          search.createColumn({ name: 'custrecord_esp_fop_rel_wo', label: 'Work Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_rel_event', label: 'Work Order Event' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_contact_rec', label: 'Contact' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_contact_name', label: 'Contact Name' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_contact_email', label: 'Email' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_contact_jobtitle', label: 'Job Title' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_mobile_no', label: 'Mobile Phone Number' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_phone_number', label: 'Phone Number' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_contact_role', label: 'Role' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const contacts = searchResult.map((map) => ({
      id: map.id,
      workorder: {
        text: map.getText('custrecord_esp_fop_rel_wo'),
        value: map.getValue('custrecord_esp_fop_rel_wo')
      },
      events: helper.stringToArray(map.getValue('custrecord_esp_fop_wo_rel_event')), // TBD change to just list field
      get event() {
        return this.events[0] || '';
      },
      contact: {
        text: map.getText('custrecord_esp_fop_wo_contact_rec'),
        value: map.getValue('custrecord_esp_fop_wo_contact_rec')
      },
      name: map.getValue('custrecord_esp_fop_wo_contact_name'),
      email: map.getValue('custrecord_esp_fop_wo_contact_email'),
      jobTitle: map.getValue('custrecord_esp_fop_wo_contact_jobtitle'),
      mobilePhone: map.getValue('custrecord_esp_fop_wo_mobile_no'),
      phone: map.getValue('custrecord_esp_fop_wo_phone_number'),
      primary: !!((map.getText('custrecord_esp_fop_wo_contact_role') || '').match(/primary contact/gi)),
      get url() {
        return utils.Url.contactUrl(this.contact.value)
      }
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    // log.audit('----- [Work Order Contacts] -----', contacts);
    response.write(JSON.stringify(contacts));
  }

  /**
   * Create WO contacts selected from the WO
   * @param {Object} event Event data
   */
  function createContacts(event) {
    const contacts = event?.contacts || [];
    for (const contact of contacts) {
      try {
        const rec = record.copy({
          type: env.RecordType.WORK_ORDER_CONTACT,
          id: contact.id,
          isDynamic: true
        });
        rec.setValue({ fieldId: 'custrecord_esp_fop_wo_rel_event', value: event.id });
        contact.id = rec.save({ ignoreMandatoryFieds: true });
        log.audit('----- [Created WO Contact Record] -----', contact.id);
      } catch (e) {
        log.error('Error on WO Contact > Create', { contact, errorMsg: e.message });
        contact.errorMsg = e.message;
      }
    }
  }

  /**
   * Delete WO Contacts records
   * @param {Object} removeContacts WO Contacts for deletion
   */
  function removeContacts(removedContacts) {
    utils.deleteRecords(env.RecordType.WORK_ORDER_CONTACT, removedContacts.map(x => x.id));
  }

  /**
   * Prepare WO Contacts to create or remove based on event data and updates.
   *
   * @param {Object} eventData - The current event data with existing WO contacts.
   * @param {Object} updates - The incoming update data with new WO contacts.
   * @returns {Object} An object containing:
   *  - newContacts: Contacts that need to be created.
   *  - removedContacts: Contacts that should be removed.
   */
  function prepareUpdatedWOContacts(eventData, updates) {
    const selectedContacts = updates.contacts || [];
    const srcContacts = eventData.contacts || [];

    const selectedContactIds = selectedContacts.map(x => x.id).filter(Boolean);
    const srcContactIds = srcContacts.map(x => x.id);

    const removedContacts = srcContacts.filter(
      src => !selectedContactIds.includes(src.id)
    );

    const newContacts = selectedContacts.filter(
      upd => !upd.id || !srcContactIds.includes(upd.id)
    );

    return {
      newContacts,
      removedContacts
    };
  }

  return {
    getContacts,
    createContacts,
    removeContacts,
    prepareUpdatedWOContacts
  }
})