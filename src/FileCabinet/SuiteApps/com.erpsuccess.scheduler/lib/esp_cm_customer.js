/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(['N/search'], (search) => {
  /**
   * Get the list of customers
   * @param {Object} context Suitelet object
   */
  function getCustomers(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: search.Type.CUSTOMER,
      filters:
        [
          ['isinactive', 'is', 'F']
        ],
      columns:
        [
          // search.createColumn({ name: 'name', label: 'Name' }),
          search.createColumn({ name: 'entityid', label: 'Customer ID' }),
          search.createColumn({ name: 'companyname', label: 'Company Name' }),
          search.createColumn({ name: 'firstname', label: 'First Name' }),
          search.createColumn({ name: 'lastname', label: 'Last Name' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const customers = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue('entityid'),
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Customers] -----', customers.length);
    response.write(JSON.stringify(customers));
  }

  return {
    getCustomers
  }
})