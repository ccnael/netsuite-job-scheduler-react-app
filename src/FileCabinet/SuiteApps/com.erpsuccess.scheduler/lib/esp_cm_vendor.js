/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(['N/search'], (search) => {
  /**
   * Get the list of vendors
   * @param {Object} context Suitelet object
   */
  function getVendors(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: 'vendor',
      filters:
        [
          ['custentity_esp_fop_is_wo_vendor', 'is', 'T'],
          'AND',
          ['isinactive', 'is', 'F']
        ],
      columns:
        [
          search.createColumn({ name: 'entityid', label: 'Name' }),
          search.createColumn({ name: 'email', label: 'Email' }),
          search.createColumn({ name: 'url', label: 'Web Address' }),
          search.createColumn({ name: 'phone', label: 'Phone' }),
          search.createColumn({ name: 'altphone', label: 'Office Phone' }),
          search.createColumn({ name: 'fax', label: 'Fax' }),
          search.createColumn({ name: 'altemail', label: 'Alt. Email' }),
          search.createColumn({ name: 'custentity_esp_fop_ven_avail_resources', label: 'Available Resources' }),
          search.createColumn({ name: 'isinactive', label: 'Isinactive' })
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
      name: map.getValue('entityid'),
      get vendor() {
        return {
          text: this.name,
          value: this.id
        }
      },
      url: map.getValue('url'),
      email: map.getValue('email'),
      get initials() {
        let split = this.name.split(' ').map(name => name.replace(/[^a-zA-Z]/g, ''));
        split = split.filter(Boolean);
        if (split.length > 1) {
          return `${split[0][0]}${split[1][0] || ''}`;
        } else if (split.length == 1) {
          return split[0][0];
        } else {
          return this.name;
        }
      },
      quantityRequired: 0,
      quantityAvailable: +map.getValue('custentity_esp_fop_ven_avail_resources'),
      purchaseOrder: {
        text: '',
        value: ''
      },
      woVendor: false,
      events: [], // Will be updated in the front end side once events data is fetched
      memo: '',
      location: {
        text: '',
        value: ''
      },
      department: {
        text: '',
        value: ''
      },
      time: {
        start: '',
        end: ''
      },
      active: true
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Vendors] -----', vendors.length);
    response.write(JSON.stringify(vendors));
  }

  return {
    getVendors
  }
})