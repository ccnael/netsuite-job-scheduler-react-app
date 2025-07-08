/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  './esp_cm_woItem',
  './esp_cm_helper',
  './esp_cm_utils',
  './moment.min',
  './esp_cm_constants'
], (search, record, woItemLib, helper, utils, moment, env) => {
  /**
   * Get the SO punch list
   * @param {Object} context Suitelet object
   */
  function getPunchItems(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { soId } = params;

    const punchItems = [];

    if (soId) {
      const searchObj = search.create({
        type: env.RecordType.PUNCH,
        filters:
          [
            ['custrecord_esp_pp_so', 'is', soId]
          ],
        columns:
          [
            search.createColumn({ name: 'custrecord_esp_pp_status', label: 'Status' }),
            search.createColumn({ name: 'custrecord_esp_pp_so', label: 'Sales Order' }),
            search.createColumn({ name: 'custrecord_esp_pp_linked_tran_line', label: 'Linked Transaction Line' }),
            search.createColumn({ name: 'custrecord_esp_pp_item', label: 'Item' }),
            search.createColumn({ name: 'custrecord_esp_pp_qty', label: 'Qty' }),
            search.createColumn({ name: 'custrecord_esp_pp_assign', label: 'Assigned To' }),
            search.createColumn({ name: 'custrecord_esp_pp_reason', label: 'Reason' }),
            search.createColumn({ name: 'custrecord_esp_pp_prod_loca', label: 'Product Location' }),
            search.createColumn({ name: 'custrecord_esp_pp_laborhours', label: 'Labor Cost & Hours to Fix' }),
            search.createColumn({ name: 'custrecord_esp_pp_intnotes', label: 'Resolutions Instructions' }),
            search.createColumn({ name: 'custrecord_esp_pp_reasoncode', label: 'Reason Code:' }),
            search.createColumn({ name: 'custrecord_esp_pp_hold_tillresolve', label: 'Do Not Invoice Till Resolved' }),
            search.createColumn({ name: 'custrecord_esp_pp_refnumber', label: 'Reference #' }),
            search.createColumn({ name: 'custrecord_esp_pp_descr', label: 'Description of Issue and CORRECT Part Number' }),
            search.createColumn({ name: 'custrecord_esp_pp_ackno', label: 'Original Acknoweldgement #' }),
            search.createColumn({ name: 'created', label: 'Date Created' })
          ]
      });
      searchObj.run().each((result) => {
        punchItems.push({
          status: {
            text: result.getText('custrecord_esp_pp_status'),
            value: result.getValue('custrecord_esp_pp_status')
          },
          reason: result.getText('custrecord_esp_pp_reason'),
          description: result.getValue('custrecord_esp_pp_descr'),
          resolution: result.getValue('custrecord_esp_pp_intnotes'),
          dateCreated: result.getValue('created'),
          enteredBy: result.getText('custrecord_esp_pp_assign'),
          salesorder: {
            text: result.getText('custrecord_esp_pp_so'),
            value: result.getValue('custrecord_esp_pp_so')
          }
        })
        return true;
      });
    }

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Punch Items] -----', punchItems);
    response.write(JSON.stringify(punchItems));
  }

  /**
   * Set the event record to complete
   * @param {Object} context Suitelet object
   */
  function completeEvent(context) {
    const { request, response } = context;
    const requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);
    let { eventData, oldEventData, timeSheets } = payload;
    const eventId = eventData.id;
    log.audit('----- [Complete Event] -----', { oldEventData, timeSheets });

    try {
      timeSheets.length &&
        createTimeTracking(oldEventData, timeSheets);

      !!eventData.selectedItems.length &&
        woItemLib.updateItems(eventData, oldEventData);

      record.submitFields({
        type: record.Type.CALENDAR_EVENT,
        id: eventId,
        values: {
          status: 'COMPLETE'
        },
        options: {
          ignoreMandatoryFieds: true
        }
      });

      response.write(JSON.stringify({
        code: 200,
        recordId: eventId,
        status: 'success'
      }));
    } catch (e) {
      log.audit('Complete Event Unexpected Error', e.message);

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  /**
   * Create event time tracking records
   * @param {Object} oldEventData Old state event data
   * @param {Array} timeSheets Time tracking data
   */
  function createTimeTracking(oldEventData, timeSheets) {
    const eventId = oldEventData.id;

    // Map hours and location
    timeSheets = timeSheets.map((timeSheet) => {
      timeSheet.startTime = moment(`1/1/1999 ${timeSheet.startTime}`).format(env.Format.IMPORT_TIME);
      timeSheet.endTime = moment(`1/1/1999 ${timeSheet.endTime}`).format(env.Format.IMPORT_TIME);

      const diffDate = helper.diffDates(`1/1/1999 ${timeSheet.startTime}`, `1/1/1999 ${timeSheet.endTime}`);
      timeSheet.hours = helper.convertTimeToDecimal(diffDate.hour, diffDate.minute);

      const resource = oldEventData.resources.find(resource => resource.id == timeSheet.id);
      if (resource) {
        timeSheet.location = resource.location.value;
      }
      return timeSheet;
    });

    log.audit('Mapped Timesheets', timeSheets);
    timeSheets = timeSheets.filter(x => !!(x.location)); // Location is mandatory in the event record timetracking sublist

    if (timeSheets.length) {
      log.audit('----- [Creating Timesheets] -----', timeSheets);

      const rec = record.load({
        type: record.Type.CALENDAR_EVENT,
        id: eventId
      });
      const lineCount = rec.getLineCount({ sublistId: 'timeitem' });
      const projectInsight = oldEventData.woRef?.projectInsight?.value;

      for (let i in timeSheets) {
        const timeSheet = timeSheets[i];
        const line = +i + lineCount;
        try {
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'employee',
            value: timeSheet.id,
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'trandate',
            value: new Date(),
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'hours',
            value: timeSheet.hours,
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'location',
            value: timeSheet.location,
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'memo',
            value: timeSheet.notes,
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'custcol_time_act_cost',
            value: timeSheet.actualCost,
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'custcol_time_act_cost_data',
            value: timeSheet.actualCostData,
            line
          });
          rec.setSublistValue({
            sublistId: 'timeitem',
            fieldId: 'custcol_time_pi',
            value: projectInsight || '',
            line
          });
          log.audit('Timesheet Added', timeSheet);
        } catch (e) {
          log.error('Error Setting Timesheet', { errorMsg: e.message, timeSheet });
        }
      }
      rec.save({ ignoreMandatoryFields: true });
    }
  }

  return {
    getPunchItems,
    completeEvent
  }
})