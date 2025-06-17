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
  function getList(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_CONTACT,
      filters:
        [
          ['isinactive', 'is', 'F']
        ],
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
        return Url.contact(this.contact.value)
      }
    }));

    // log.audit('----- [Work Order Contacts] -----', contacts);
    response.write(JSON.stringify(contacts));
  }

  /**
   * Create WO contacts selected from the WO
   * @param {Object} event Event data
   */
  function createContacts(event) {
    const contacts = event?.selectedContacts || [];
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
        log.error('Error on WO Contact > Create', { id: contact.id, errorMsg: e.message });
        contact.errorMsg = e.message;
      }
    }
  }

  /**
   * Update event contacts
   * @param {Object} event Event data
   * @param {Object} dataSrc Data source
   */
  function updateContacts(event, dataSrc) {
    const selectedContacts = event.selectedContacts;
    const selectedContactIds = selectedContacts.map(x => x.id);
    const srcContacts = dataSrc.contacts.filter(x => !!(x.selected));
    const srcContactIds = srcContacts.map(x => x.id);
    const removedContacts = srcContacts.filter(x => !(selectedContactIds.includes(x.id)));
    const newContacts = selectedContacts.filter(x => !(srcContactIds.includes(x.id)));

    log.audit('Updating WO Contact Event List', { selectedContacts, removedContacts, newContacts });

    // If theres to remove (removed contacts)
    utils.deleteRecords(env.RecordType.WORK_ORDER_CONTACT, removedContacts.map(x => x.id));

    // If theres to create (newly added contacts)
    const clonedEventObj = helper.deepCopy(event);
    clonedEventObj.selectedContacts = newContacts;
    createContacts(clonedEventObj);
  }

  return {
    getList,
    createContacts,
    updateContacts
  }
})