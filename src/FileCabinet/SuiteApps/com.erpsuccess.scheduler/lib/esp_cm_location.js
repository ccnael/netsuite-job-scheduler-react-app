/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(['N/search'], (search) => {
  /**
   * Get the list of locations
   * @param {Object} context Suitelet object
   */
  function getLocations(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: search.Type.LOCATION,
      filters:
        [
          ['isinactive', 'is', 'F']
        ],
      columns:
        [
          search.createColumn({ name: 'name', label: 'Name' })
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const locations = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue('name')
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Locations] -----', locations.length);
    response.write(JSON.stringify(locations));
  }

  return {
    getLocations
  }
})