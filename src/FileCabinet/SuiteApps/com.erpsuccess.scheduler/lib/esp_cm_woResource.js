/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  './esp_cm_helper',
  './esp_cm_utils',
  './moment.min',
  './esp_cm_constants'
], (search, record, helper, utils, moment, env) => {
  /**
   * Get the list of WO resources
   * @param {Object} context Suitelet object
   */
  function getResources(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId, eventId, start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F']
    ];

    if (woId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_res_rel_wo', 'anyof', woId]
      );
    } else {
      filters.push(
        'AND',
        ['custrecord_esp_fop_res_rel_wo', 'noneof', ['@NONE@', '']]
      );
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_res_rel_wo_event', 'anyof', eventId]
      );
    } else {
      filters.push(
        'AND',
        ['custrecord_esp_fop_res_rel_wo_event', 'noneof', ['@NONE@', '']]
      );
    }

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER_RESOURCE,
      filters,
      columns:
        [
          search.createColumn({ name: 'custrecord_esp_fop_res_employee', label: 'Resource Employee' }),
          search.createColumn({
            name: 'formulatext',
            formula: 'SUBSTR(TO_CHAR({custrecord_esp_fop_res_employee.firstname}), 0, 1) || SUBSTR(TO_CHAR({custrecord_esp_fop_res_employee.lastname}), 0, 1)',
            label: 'Formula (Text)'
          }),
          search.createColumn({
            name: 'formulatext',
            formula: "{custrecord_esp_fop_res_employee.firstname} || ' ' || {custrecord_esp_fop_res_employee.lastname}",
            label: 'Formula (Text)'
          }),
          search.createColumn({ name: 'email', join: 'custrecord_esp_fop_res_employee', label: 'Email' }),
          search.createColumn({ name: 'phone', join: 'custrecord_esp_fop_res_employee', label: 'Phone' }),
          search.createColumn({ name: 'location', join: 'custrecord_esp_fop_res_employee', label: 'Location' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_rel_wo', label: 'Work Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_rel_wo_event', label: 'Work Order Event' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_rel_resource_grp', label: 'Resource Group' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_resource_type', label: 'Resource Type' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_resource_subtype', label: 'Resource Subtype' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_rate', label: 'Rate' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_vendor', label: 'Vendor' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_rel_po', label: 'Purchase Order' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_aff_type', label: 'Affiliation Type' }),
          search.createColumn({ name: 'custentity_esp_fop_is_employee_active', join: 'custrecord_esp_fop_res_employee', label: 'Active' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_start_time', label: 'Start Time' }),
          search.createColumn({ name: 'custrecord_esp_fop_res_end_time', label: 'End Time' }),
          search.createColumn({ name: 'location', join: 'custrecord_esp_fop_res_employee', label: 'Location' }),
          search.createColumn({ name: 'department', join: 'custrecord_esp_fop_res_employee', label: 'Department' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const resources = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue(map.columns[2]),
      initials: map.getValue(map.columns[1]),
      email: map.getValue({ name: 'email', join: 'custrecord_esp_fop_res_employee' }),
      phone: map.getValue({ name: 'phone', join: 'custrecord_esp_fop_res_employee' }),
      active: map.getValue({ name: 'custentity_esp_fop_is_employee_active', join: 'custrecord_esp_fop_res_employee' }),
      workorder: {
        text: map.getText('custrecord_esp_fop_res_rel_wo'),
        value: map.getValue('custrecord_esp_fop_res_rel_wo')
      },
      event: map.getValue('custrecord_esp_fop_res_rel_wo_event'),
      employee: {
        text: map.getText('custrecord_esp_fop_res_employee'),
        value: map.getValue('custrecord_esp_fop_res_employee')
      },
      get resourceGroups() {
        const obj = {
          texts: helper.stringToArray(map.getText('custrecord_esp_fop_res_rel_resource_grp')),
          values: helper.stringToArray(map.getValue('custrecord_esp_fop_res_rel_resource_grp')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      get types() {
        const obj = {
          texts: helper.stringToArray(map.getText('custrecord_esp_fop_res_resource_type')),
          values: helper.stringToArray(map.getValue('custrecord_esp_fop_res_resource_type')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      get subTypes() {
        const obj = {
          texts: helper.stringToArray(map.getText('custrecord_esp_fop_res_resource_subtype')),
          values: helper.stringToArray(map.getValue('custrecord_esp_fop_res_resource_subtype')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      rate: +map.getValue('custrecord_esp_fop_res_rate'),
      vendor: {
        text: map.getText('custrecord_esp_fop_res_vendor'),
        value: map.getValue('custrecord_esp_fop_res_vendor'),
      },
      purchaseOrder: {
        text: map.getText('custrecord_esp_fop_res_rel_po'),
        value: map.getValue('custrecord_esp_fop_res_rel_po'),
      },
      affiliationType: {
        text: map.getText('custrecord_esp_fop_res_aff_type'),
        value: map.getValue('custrecord_esp_fop_res_aff_type')
      },
      get time() {
        const startTime = map.getValue('custrecord_esp_fop_res_start_time');
        const endTime = map.getValue('custrecord_esp_fop_res_end_time');
        return {
          start: startTime && moment(`1/1/1999 ${startTime}`).format(env.Format.EXPORT_TIME),
          end: endTime && moment(`1/1/1999 ${endTime}`).format(env.Format.EXPORT_TIME)
        }
      },
      get resourceSkills() {
        const obj = {
          texts: helper.stringToArray(map.getText({ name: 'custentity_esp_fop_emp_resource_skill', join: 'custrecord_esp_fop_res_employee' })),
          values: helper.stringToArray(map.getValue({ name: 'custentity_esp_fop_emp_resource_skill', join: 'custrecord_esp_fop_res_employee' })),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      location: {
        text: map.getText({ name: 'location', join: 'custrecord_esp_fop_res_employee' }),
        value: map.getValue({ name: 'location', join: 'custrecord_esp_fop_res_employee' }),
      },
      department: {
        text: map.getText({ name: 'department', join: 'custrecord_esp_fop_res_employee' }),
        value: map.getValue({ name: 'department', join: 'custrecord_esp_fop_res_employee' }),
      }
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Work Order Resources] -----', resources.length);
    response.write(JSON.stringify(resources));
  }

  /**
   * Transform employees to WO resources
   * @param {Object} event Event data
   * @param {Object} woRef WO data
   * @param {Boolean} copyEventTime 
   */
  function createResources(event, woRef, copyEventTime) {
    const resources = event?.selectedResources || [];
    for (const resource of resources) {
      try {
        const rec = record.create({
          type: env.RecordType.WORK_ORDER_RESOURCE,
          isDynamic: false
        });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_wo', value: woRef?.id || '' });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_wo_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_employee', value: resource.employee.value });

        if (resource.resourceGroups.length) {
          rec.setValue({
            fieldId: 'custrecord_esp_fop_res_rel_resource_grp',
            value: resource.resourceGroups.map(x => x.value)
          });
        }

        if (resource.types.length) {
          rec.setValue({
            fieldId: 'custrecord_esp_fop_res_resource_type',
            value: resource.types.map(x => x.value)
          });
        }

        if (resource.subTypes.length) {
          rec.setValue({
            fieldId: 'custrecord_esp_fop_res_resource_subtype',
            value: resource.subTypes.map(x => x.value)
          });
        }

        rec.setValue({ fieldId: 'custrecord_esp_fop_res_rate', value: resource.rate });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_vendor', value: resource.vendor.value });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_aff_type', value: resource.affiliationType.value });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_event_start_date', value: new Date(event.date.start) });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_event_end_date', value: new Date(event.date.end) });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_res_start_time',
          value: helper.toDateTimez(event.date.start, !copyEventTime ? resource.time.start : event.time.start) // If no resource start time, use event start time instead
        });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_res_end_time',
          value: helper.toDateTimez(event.date.start, !copyEventTime ? resource.time.end : event.time.end)  // If no resource end time, use event end time instead
        });
        const newId = rec.save({ ignoreMandatoryFields: true });
        log.audit('----- [Created WO Resource Record] -----', newId);
      } catch (e) {
        log.error('Error on WO Resource > Create', { resource: resource.employee, errorMsg: e.message });
        resource.errorMsg = e.message;
      }
    }
  }

  /**
   * Update existing resources start/end time etc
   * @param {Object} event Event data
   * @param {Object} dataSrc Data source
   * @param {Object} woRef WO data
   */
  function updateResources(event, dataSrc, woRef) {
    const selectedResources = event.selectedResources;
    const selectedResourceIds = selectedResources.map(x => x.id);
    const srcResources = dataSrc.resources.filter(x => !!(x.selected));
    const srcResourcesIds = srcResources.map(x => x.id);
    const removedResources = srcResources.filter(x => !(selectedResourceIds.includes(x.id)));
    const newResources = selectedResources.filter(x => !(srcResourcesIds.includes(x.id)));

    log.audit('Updating WO Resource Event List', { selectedResources, removedResources, newResources });

    // If theres to start/end time to update
    for (const resource of selectedResources) {
      if (!resource.id) continue;

      try {
        const resourceLookup = search.lookupFields({
          type: env.RecordType.WORK_ORDER_RESOURCE,
          id: resource.id,
          columns: ['custrecord_esp_fop_res_start_time', 'custrecord_esp_fop_res_end_time']
        });
        const values = {};

        const startTime = moment(`1/1/1999 ${resource.time.start}`).format(env.Format.IMPORT_TIME);
        if (resourceLookup.custrecord_esp_fop_res_start_time != startTime) {
          values.custrecord_esp_fop_res_start_time = startTime;
        }

        const endTime = moment(`1/1/1999 ${resource.time.end}`).format(env.Format.IMPORT_TIME);
        if (resourceLookup.custrecord_esp_fop_res_end_time != endTime) {
          values.custrecord_esp_fop_res_end_time = endTime;
        }
        if (Object.keys(values).length) {
          record.submitFields({
            type: env.RecordType.WORK_ORDER_RESOURCE,
            id: resource.id,
            values,
            options: {
              ignoreMandatoryFields: true
            }
          });
          log.audit('----- [Updated WO Resource Record] -----', { resource });
        }
      } catch (e) {
        log.error('Error on WO Resource > Update', { resource, errorMsg: e.message });
      }
    }

    // If theres to remove (removed resources)
    utils.deleteRecords(env.RecordType.WORK_ORDER_RESOURCE, removedResources.map(x => x.id));

    // If theres to create (newly added resources)
    const clonedEventObj = helper.deepCopy(event);
    clonedEventObj.selectedResources = newResources;
    createResources(clonedEventObj, woRef);
  }

  /**
   * Applies when dragging and assigning new resource events in the calendar view
   * @param {Object} context Suitelet object
   */
  function updateCalendarResourceAssignment(context) {
    const { request, response } = context;
    const requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);

    try {
      const resourceLookup = search.lookupFields({
        type: env.RecordType.WORK_ORDER_RESOURCE,
        id: payload.id,
        columns: ['custrecord_esp_fop_res_employee']
      });
      const oldResourceId = resourceLookup.custrecord_esp_fop_res_employee[0]?.value;
      const newResourceId = payload.newResource.id;
      const values = {};
      values.custrecord_esp_fop_res_start_time = moment(`1/1/1999 ${payload.time.start}`).format(env.Format.IMPORT_TIME);
      values.custrecord_esp_fop_res_end_time = moment(`1/1/1999 ${payload.time.end}`).format(env.Format.IMPORT_TIME);

      if (oldResourceId != newResourceId) {
        values.custrecord_esp_fop_res_employee = newResourceId;
        values.custrecord_esp_fop_res_rel_resource_grp = payload.newResource.resourceGroups.map(x => x.value);
        values.custrecord_esp_fop_res_resource_type = payload.newResource.types.map(x => x.value);
        values.custrecord_esp_fop_res_resource_subtype = payload.newResource.subTypes.map(x => x.value);
        values.custrecord_esp_fop_res_aff_type = payload.newResource.affiliationType.value;
      }

      if (Object.keys(values).length) {
        record.submitFields({
          type: env.RecordType.WORK_ORDER_RESOURCE,
          id: payload.id,
          values,
          options: {
            ignoreMandatoryFieds: true
          }
        });
        log.audit('----- [Updated WO Resource Record] -----', { payload });

        response.write(JSON.stringify({
          code: 200,
          recordId: payload.id,
          status: 'success'
        }));
      }
    } catch (e) {
      log.error('Error on WO Resource > Update', { payload, errorMsg: e.message });

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  /**
   * Applies when resizing resource events in the calendar view
   * @param {Object} context Suitelet object 
   */
  function updateCalendarResizedDateTime(context) {
    const { request, response } = context;
    let requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);
    // log.debug('updateResourceDateTime', payload);

    try {
      const resourceLookup = search.lookupFields({
        type: env.RecordType.WORK_ORDER_RESOURCE,
        id: payload.id,
        columns: [
          'custrecord_esp_fop_res_event_start_date',
          'custrecord_esp_fop_res_event_end_date',
          'custrecord_esp_fop_res_start_time',
          'custrecord_esp_fop_res_end_time'
        ]
      });
      const values = {};
      // Check if dates changed
      const startDate = moment(payload.date.start).format(env.Format.IMPORT_DATE);
      const endDate = moment(payload.date.end).format(env.Format.IMPORT_DATE);
      if (resourceLookup.custrecord_esp_fop_res_event_start_date != startDate) {
        values.custrecord_esp_fop_res_event_start_date = startDate;
      }
      if (resourceLookup.custrecord_esp_fop_res_event_end_date != endDate) {
        values.custrecord_esp_fop_res_event_end_date = endDate;
      }
      // Check if times changed
      const startTime = moment(`1/1/1999 ${payload.time.start}`).format(env.Format.IMPORT_TIME);
      const endTime = moment(`1/1/1999 ${payload.time.end}`).format(env.Format.IMPORT_TIME);
      if (resourceLookup.custrecord_esp_fop_res_start_time != startTime) {
        values.custrecord_esp_fop_res_start_time = startTime;
      }
      if (resourceLookup.custrecord_esp_fop_res_end_time != endTime) {
        values.custrecord_esp_fop_res_end_time = endTime;
      }

      if (Object.keys(values).length) {
        record.submitFields({
          type: env.RecordType.WORK_ORDER_RESOURCE,
          id: payload.id,
          values,
          options: {
            ignoreMandatoryFieds: true
          }
        });
        log.audit('----- [Updated WO Resource Record] -----', { payload });

        response.write(JSON.stringify({
          code: 200,
          recordId: payload.id,
          status: 'success'
        }));
      }
    } catch (e) {
      log.error('Error on WO Resource > Update', { payload, errorMsg: e.message });

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  return {
    getResources,
    createResources,
    updateResources,
    updateCalendarResourceAssignment,
    updateCalendarResizedDateTime
  }
})