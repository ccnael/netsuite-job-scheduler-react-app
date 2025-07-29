/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  './esp_cm_constants',
  './moment.min',
], (search, record, env, moment) => {
  /**
   * Get the list of routing groups
   * @param {Object} context Suitelet object 
   */
  function getRoutingGroups(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: env.RecordType.ROUTING_GROUP,
      filters: [
        ['isinactive', 'is', 'F']
      ],
      columns:
        [
          search.createColumn({
            name: 'internalid',
            sort: search.Sort.ASC
          }),
          search.createColumn({ name: 'name' })
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const routingGroups = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue('name')
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    // log.audit('----- [Routing Groups] -----', routingGroups.length);
    response.write(JSON.stringify(routingGroups));
  }

  function createRoutingGroup(context) {
    const { request, response } = context;
    let requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);
    const groupName = payload.name;

    try {
      const rec = record.create({ type: env.RecordType.ROUTING_GROUP });
      rec.setValue({ fieldId: 'name', value: groupName });
      const id = rec.save({ ignoreMandatoryFieds: true });
      // log.audit('----- [New Routing Group] -----', { groupName, id });

      response.write(JSON.stringify({
        code: 200,
        status: 'success',
        name: groupName,
        id
      }));
    } catch (e) {
      log.error('Routing Group Creation Error', e.message);
      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        name: groupName,
        errorMsg: e.message
      }));
    }
  }

  return {
    getRoutingGroups,
    createRoutingGroup
  }
})