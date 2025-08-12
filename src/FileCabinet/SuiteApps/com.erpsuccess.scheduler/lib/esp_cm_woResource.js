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
    }

    if (eventId) {
      filters.push(
        'AND',
        ['custrecord_esp_fop_res_rel_wo_event', 'anyof', eventId]
      );
    }

    if (!woId && !eventId) {
      filters.push('AND',
        [
          ['custrecord_esp_fop_res_rel_wo', 'noneof', ['@NONE@', '']],
          'OR',
          ['custrecord_esp_fop_res_rel_wo_event', 'noneof', ['@NONE@', '']]
        ]
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
          search.createColumn({ name: 'custentity_esp_fop_resource_group', join: 'custrecord_esp_fop_res_employee' }),
          search.createColumn({ name: 'custentity_esp_fop_emp_resource_skill', join: 'custrecord_esp_fop_res_employee' }),
          search.createColumn({ name: 'custentity_esp_fop_emp_resource_type', join: 'custrecord_esp_fop_res_employee', label: 'Resource Type' }),
          search.createColumn({ name: 'custentity_esp_fop_emp_resource_subtype', join: 'custrecord_esp_fop_res_employee', label: 'Resource Subtype' }),
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
          texts: helper.stringToArray(map.getText({ name: 'custentity_esp_fop_resource_group', join: 'custrecord_esp_fop_res_employee' })),
          values: helper.stringToArray(map.getValue({ name: 'custentity_esp_fop_resource_group', join: 'custrecord_esp_fop_res_employee' })),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      get types() {
        const obj = {
          texts: helper.stringToArray(map.getText({ name: 'custentity_esp_fop_emp_resource_type', join: 'custrecord_esp_fop_res_employee' })),
          values: helper.stringToArray(map.getValue({ name: 'custentity_esp_fop_emp_resource_type', join: 'custrecord_esp_fop_res_employee' })),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      get subTypes() {
        const obj = {
          texts: helper.stringToArray(map.getText({ name: 'custentity_esp_fop_emp_resource_subtype', join: 'custrecord_esp_fop_res_employee' })),
          values: helper.stringToArray(map.getValue({ name: 'custentity_esp_fop_emp_resource_subtype', join: 'custrecord_esp_fop_res_employee' })),
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
   */
  function createResources(event) {
    const resources = event?.resources || [];
    for (const resource of resources) {
      try {
        const rec = resource.woResourceId
          ? record.copy({
            type: env.RecordType.WORK_ORDER_RESOURCE,
            id: resource.woResourceId,
            isDynamic: true
          })
          : record.create({
            type: env.RecordType.WORK_ORDER_RESOURCE,
            isDynamic: true
          });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_wo', value: event?.woRef?.id || '' });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_wo_event', value: event.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_employee', value: resource.id });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_event_start_date', value: event.parsedStartDate });
        rec.setValue({ fieldId: 'custrecord_esp_fop_res_event_end_date', value: event.parsedEndDate });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_res_start_time',
          value: helper.toDateTimez(event.date.start, resource.startTime)
        });
        rec.setValue({
          fieldId: 'custrecord_esp_fop_res_end_time',
          value: helper.toDateTimez(event.date.start, resource.endTime)
        });
        const newId = rec.save({ ignoreMandatoryFields: true });
        log.audit('----- [Created WO Resource Record] -----', newId);
      } catch (e) {
        log.error('Error on WO Resource > Create', { resource, errorMsg: e.message });
        resource.errorMsg = e.message;
      }
    }
  }

  /**
   * Update existing resources start/end time etc
   * @param {Object} updatedResources WO Resources for update
   */
  function updateResources(updatedResources) {
    // log.audit('Updating WO Resources', { updatedResources });
    for (const update of updatedResources) {
      const values = {};
      if (update.updatedStartTime) {
        values.custrecord_esp_fop_res_start_time = moment(`1/1/1999 ${update.updatedStartTime}`).format(env.Format.IMPORT_TIME);
      }
      if (update.updatedEndTime) {
        values.custrecord_esp_fop_res_end_time = moment(`1/1/1999 ${update.updatedEndTime}`).format(env.Format.IMPORT_TIME);
      }
      record.submitFields({
        type: env.RecordType.WORK_ORDER_RESOURCE,
        id: update.woResourceId,
        values,
        options: {
          ignoreMandatoryFieds: true,
        }
      });
      log.audit('----- [Updated WO Resource Record] -----', { update });
    }
  }

  /**
   * Delete WO Resource records
   * @param {Object} removedResources WO Resources for deletion
   */
  function removeResources(removedResources) {
    utils.deleteRecords(env.RecordType.WORK_ORDER_RESOURCE, removedResources.map(x => x.id));
  }

  /**
   * Determines the Work Order (WO) resources that need to be created, updated, or removed
   * based on the differences between the current event data and the incoming updates.
   *
   * @param {Object} eventData - The original event data containing current WO resources.
   * @param {Object} updates - The updated event data containing new resource state.
   * @returns {Object} An object with:
   *  - updatedResources: Array of resources that need their time fields updated.
   *  - newResources: Array of new resources to be created.
   *  - removedResources: Array of resources that are no longer present in the updates.
   */
  function prepareUpdatedWOResources(eventData, updates) {
    const selectedResources = updates.resources;
    const srcResources = eventData.resources;

    const selectedResourceIds = selectedResources.map(x => x.woResourceId).filter(Boolean);
    const srcResourceIds = srcResources.map(x => x.id);

    const removedResources = srcResources.filter(
      src => !selectedResourceIds.includes(src.id)
    );

    const newResources = selectedResources.filter(
      upd => !upd.woResourceId || !srcResourceIds.includes(upd.woResourceId)
    );
    const updatedResources = [];

    for (const upd of selectedResources) {
      const matchId = upd.woResourceId;
      if (!matchId) continue;

      const existing = srcResources.find(src => src.id === matchId);
      if (existing) {
        const valuesToUpdate = {};
        if (existing.time?.start !== upd.startTime) {
          valuesToUpdate.updatedStartTime = upd.startTime;
        }
        if (existing.time?.end !== upd.endTime) {
          valuesToUpdate.updatedEndTime = upd.endTime;
        }
        if (Object.keys(valuesToUpdate).length) {
          updatedResources.push({
            ...upd,
            ...valuesToUpdate
          });
        }
      }
    }

    return {
      updatedResources,
      newResources,
      removedResources
    }
  }

  return {
    getResources,
    createResources,
    updateResources,
    removeResources,
    prepareUpdatedWOResources
  }
})