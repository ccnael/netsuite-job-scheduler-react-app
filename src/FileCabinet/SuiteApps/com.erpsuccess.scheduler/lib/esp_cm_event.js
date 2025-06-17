/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  './esp_cm_woResource',
  './esp_cm_woVendor',
  './esp_cm_woAsset',
  './esp_cm_woItem',
  './esp_cm_woContact',
  './esp_cm_woAddress',
  './esp_cm_helper',
  './esp_cm_utils',
  './esp_cm_constants',
  './moment.min',
], (search, record, woResourceLib, woVendorLib, woAssetLib, woItemLib, woContactLib, woAddressLib, helper, utils, env, moment) => {
  /**
   * Get the list of events. Includes standalone/general events
   * @param {Object} context Suitelet object
   */
  function getEvents(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const filters = [
      ['response', 'is', 'ACCEPTED'], // To prevent duplicate results
      'AND',
      ['status', 'noneof', ['CANCELLED']]
    ];

    const searchObj = search.create({
      type: record.Type.CALENDAR_EVENT,
      filters,
      columns:
        [
          search.createColumn({ name: 'internalid', label: 'Internal ID', sort: search.Sort.DESC }),
          search.createColumn({ name: 'title', label: 'Event' }),
          search.createColumn({ name: 'location', label: 'Location' }),
          search.createColumn({ name: 'response', label: 'Response' }),
          search.createColumn({ name: 'status', label: 'Status' }),
          search.createColumn({ name: 'startdate', label: 'Start Date' }),
          search.createColumn({ name: 'starttime', label: 'Start Time' }),
          search.createColumn({ name: 'endtime', label: 'End Time' }),
          search.createColumn({ name: 'owner', label: 'Organiser' }),
          search.createColumn({ name: 'organizer', label: 'Organizer' }),
          search.createColumn({ name: 'markdone', label: 'Mark' }),
          search.createColumn({ name: 'custevent_esp_fop_work_order', label: 'Work Order' }),
          search.createColumn({ name: 'custevent_esp_fop_event_priority', label: 'Priority' }),
          search.createColumn({ name: 'custevent_esp_fop_memo', label: 'Memo' }),
          search.createColumn({ name: 'recurrence', label: 'Recurrency' }), // Extract endbydate field. Ex. output "occurs every day from 9/10/2024 until 9/12/2024"
          search.createColumn({ name: 'custevent_esp_fop_event_address', label: 'Selected Address' }),
          search.createColumn({ name: 'custevent_task_pi', label: 'Project Insight' }),
          search.createColumn({ name: 'custevent_esp_fop_asset_maintenance', label: 'Asset Maintenance' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const events = searchResult.map((map) => ({
      id: map.id,
      title: map.getValue('title'),
      workorder: {
        text: map.getText('custevent_esp_fop_work_order'),
        value: map.getValue('custevent_esp_fop_work_order')
      },
      location: map.getValue('location'),
      status: {
        text: map.getText('status'),
        get value() {
          let val = map.getValue('status');
          if (val === 'COMPLETE') {
            val = 'COMPLETED';
          }
          return val;
        },
        get code() {
          switch (this.value) {
            case 'TENTATIVE':
              return env.EventCode.TENTATIVE;
            case 'CONFIRMED':
              return env.EventCode.CONFIRMED;
            case 'COMPLETED':
              return env.EventCode.COMPLETED;
          }
        }
      },
      date: {
        recurrence: map.getValue('recurrence') || '',
        get dates() {
          const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/g;
          return this.recurrence.match(dateRegex);
        },
        // start: moment(map.getValue('startdate')).format(env.Format.EXPORT_DATE), // Returns the main body field date
        get start() {
          if (this.dates.length) {
            return moment(this.dates[0]).format(env.Format.EXPORT_DATE);
          } else {
            return ''
          }
        },
        get end() {
          if (this.dates.length) {
            return moment(this.dates[this.dates.length - 1]).format(env.Format.EXPORT_DATE);
          } else {
            return this.start; // TBR
          }
        }
      },
      time: {
        start: moment(`1/1/1999 ${map.getValue('starttime')}`).format(env.Format.EXPORT_TIME),
        end: moment(`1/1/1999 ${map.getValue('endtime')}`).format(env.Format.EXPORT_TIME)
      },
      priority: {
        text: map.getText('custevent_esp_fop_event_priority'),
        value: map.getValue('custevent_esp_fop_event_priority'),
        get code() {
          switch (this.value) {
            case '1':
              return env.PriorityCode.LOW;
            case '2':
              return env.PriorityCode.MEDIUM;
            case '3':
              return env.PriorityCode.HIGH;
            case '4':
              return env.PriorityCode.URGENT;
          }
        }
      },
      note: map.getValue('custevent_esp_fop_memo'),
      get url() {
        return utils.Url.eventUrl(this.id)
      },
      color: '#1a6756',
      woRef: {},
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      // Event without resources
      get unassigned() {
        return !this.resources.length &&
          !this.vendors.length &&
          !this.assets.length
      },
      contacts: [],
      addresses: [],
      address: { // Selected address
        text: map.getText('custevent_esp_fop_event_address'),
        value: map.getValue('custevent_esp_fop_event_address')
      },
      organizer: {
        text: map.getText('organizer'),
        value: map.getValue('organizer')
      },
      projectInsight: {
        text: map.getText('custevent_task_pi'),
        value: map.getValue('custevent_task_pi')
      },
      assetMaintenance: map.getValue('custevent_esp_fop_asset_maintenance')
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Work Order Events] -----', events.length);
    response.write(JSON.stringify(events));
  }

  /**
   * Creates event record
   * @param {Object} context Suitelet object
   */
  function createEvent(context) {
    const { request, response } = context;
    const user = runtime.getCurrentUser();
    let requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);

    log.audit('----- [Create Work Order Event] -----', { payload });

    const { eventData, woRef } = payload;

    try {
      eventData.date.start = moment(eventData.date.start).format(env.Format.IMPORT_DATE);
      eventData.date.end = moment(eventData.date.end).format(env.Format.IMPORT_DATE);
      eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(env.Format.IMPORT_TIME);
      eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(env.Format.IMPORT_TIME);

      const setField = {};
      setField.title = eventData.title;
      setField.custevent_esp_fop_work_order = woRef?.id || '';
      setField.organizer = user.id;
      setField.status = eventData.status;
      setField.accesslevel = 'PUBLIC';
      setField.startdate = new Date(eventData.date.start);
      setField.starttime = helper.toDateTimez(eventData.date.start, eventData.time.start);
      setField.endtime = helper.toDateTimez(eventData.date.start, eventData.time.end);
      setField.custevent_esp_fop_event_priority = eventData.priority;
      setField.custevent_esp_fop_memo = eventData.note;
      setField.custevent_task_pi = woRef?.projectInsight?.value;
      setField.custevent_esp_fop_asset_maintenance = !!(eventData?.assetMaintenance);

      if (!!eventData.selectedAddress) {
        setField.custevent_esp_fop_event_address = eventData.selectedAddress.id;
      }

      const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;

      if (numberOfDays > 1) {
        setField.frequency = 'DAY';
        setField.period = '1'; // Repeat every 1 day(s) / Daily
      } else {
        // Default > Single Day Event (value->NONE)
      }
      setField.endbydate = new Date(eventData.date.end);

      const rec = record.create({
        type: record.Type.CALENDAR_EVENT,
        isDynamic: true
      });

      for (const key in setField) {
        rec.setValue({
          fieldId: key,
          value: setField[key]
        });
      }

      eventData.id = rec.save({ ignoreMandatoryFieds: true });
      log.audit('----- [Created Event Record] -----', { recordId: eventData.id });

      woResourceLib.createResources(eventData, woRef);
      woVendorLib.createVendors(eventData, woRef);
      woAssetLib.createAssets(eventData, woRef);
      woItemLib.createItems(eventData);
      woContactLib.createContacts(eventData);
      woAddressLib.addEventToAddresses(eventData);

      response.write(JSON.stringify({
        code: 200,
        recordId: eventData.id,
        status: 'success'
      }));
    } catch (e) {
      log.audit('createEventRecord() Unexpected Error', e.message);

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  /**
   * Updates event record
   * @param {Object} context Suitelet object
   */
  function updateEvent(context) {
    const { request, response } = context;
    let requestBody = request.body || '{}';
    const payload = JSON.parse(requestBody);
    const { oldEventData, eventData, woRef, draggedResource } = payload;
    const eventDataProps = Object.keys(eventData);
    log.audit('----- [Update Work Order Event] -----', { eventDataProps, payload });
    // log.debug(`eventData.unassigned`, eventData.unassigned);
    // log.debug(`eventData.resourceType`, eventData.resourceType);

    try {
      // Drag single resource scenario
      if (!!draggedResource) {
        switch (draggedResource) {
          case 'employee':
            woResourceLib.createResources(eventData, woRef, true);
            break;
          case 'vendor':
            woVendorLib.createVendors(eventData, woRef);
            break;
          case 'asset':
            woAssetLib.createAssets(eventData, woRef, true);
            break;
        }
      } else if (eventData.unassigned && eventData.resourceType) { // Assigning new resource scenario (TBR)
        switch (eventData.resourceType) {
          case 'employee':
            woResourceLib.createResources(eventData, woRef, true);
            break;
          case 'vendor':
            woVendorLib.createVendors(eventData, woRef);
            break;
          case 'asset':
            woAssetLib.createAssets(eventData, woRef, true);
            break;
        }
      } else {
        eventData.date.start = moment(eventData.date.start).format(env.Format.IMPORT_DATE);
        eventData.date.end = moment(eventData.date.end).format(env.Format.IMPORT_DATE);
        eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(env.Format.IMPORT_TIME);
        eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(env.Format.IMPORT_TIME);

        const rec = record.load({
          type: record.Type.CALENDAR_EVENT,
          id: eventData.id
        });
        const eventRecObj = {
          title: rec.getValue('title'),
          date: {
            start: rec.getText('startdate'),
            end: rec.getText('endbydate')
          },
          time: {
            start: rec.getText('starttime'),
            end: rec.getText('endtime')
          },
          note: rec.getValue('custevent_esp_fop_memo'),
          status: rec.getValue('status'),
          priority: rec.getValue('custevent_esp_fop_event_priority'),
          address: {
            text: rec.getText('custevent_esp_fop_event_address'),
            value: rec.getText('custevent_esp_fop_event_address')
          }
        };

        const setField = {};

        if (eventRecObj.title != eventData.title) {
          setField.title = eventData.title;
        }
        if (eventRecObj.date.start != eventData.date.start) {
          setField.startdate = new Date(eventData.date.start);
        }
        if (eventRecObj.date.end != eventData.date.end) {
          const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;
          if (numberOfDays > 1) {
            setField.frequency = 'DAY';
            setField.period = '1';
          }
          setField.endbydate = new Date(eventData.date.end);
        }
        if (eventRecObj.time.start != eventData.time.start) {
          setField.starttime = _toDateTimez(eventData.date.start, eventData.time.start);
        }
        if (eventRecObj.time.end != eventData.time.end) {
          setField.endtime = _toDateTimez(eventData.date.end, eventData.time.end);
        }
        if (eventRecObj.note != eventData.note) {
          setField.custevent_esp_fop_memo = eventData.note;
        }
        if (eventData.priority) {
          if (eventRecObj.priority != eventData.priority) {
            setField.custevent_esp_fop_event_priority = eventData.priority;
          }
        }
        if (eventData.status) {
          if (eventRecObj.status != eventData.status) {
            setField.status = eventData.status;
          }
        }
        if (eventData.selectedAddress) {
          if (eventData.selectedAddress.id != eventRecObj.address.id) {
            setField.custevent_esp_fop_event_address = eventData.selectedAddress.id;
          }
        }
        log.audit('Fields to update', { eventRecObj, setField });

        if (Object.keys(setField).length) {
          for (const key in setField) {
            rec.setValue({
              fieldId: key,
              value: setField[key]
            });
            log.debug('Setting field ' + key, setField[key]);
          }
          rec.save({ ignoreMandatoryFieds: true });
          log.audit('----- [Updated Event Record] -----', { recordId: eventData.id });
        } else {
          log.audit('----- [Update Event Record not needed!] -----', { recordId: eventData.id });
        }

        if (eventData.selectedResources) {
          woResourceLib.updateResources(eventData, oldEventData, woRef);
        }
        if (eventData.selectedVendors) {
          woVendorLib.updateVendors(eventData, oldEventData, woRef);
        }
        if (eventData.selectedAssets) {
          woAssetLib.updateAssets(eventData, oldEventData, woRef);
        }
        if (eventData.selectedItems) {
          woItemLib.updateItems(eventData, oldEventData);
        }
        if (eventData.selectedContacts) {
          woContactLib.updateContacts(eventData, oldEventData);
        }
      }

      response.write(JSON.stringify({
        code: 200,
        status: 'success'
      }));
    } catch (e) {
      log.error('updateEventRecord() Unexpected Error', e.message);

      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  /**
   * Delete event record
   * @param {Object} context Suitelet object
   */
  function deleteEvent(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const requestBody = request.body || '{}';
    const eventId = params.id;

    try {
      const eventData = JSON.parse(requestBody);

      // Unlink event from related child records before the deletion
      utils.deleteRecords(env.RecordType.WORK_ORDER_RESOURCE, eventData.resources.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_VENDOR, eventData.vendors.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_ASSET, eventData.assets.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_ITEM, eventData.items.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_CONTACT, eventData.contacts.map(x => x.id));
      WorkOrderAddress._removeEventFromAddresses(eventData.addresses, eventData.id);

      // Remove timetracking lines
      const rec = record.load({
        type: record.Type.CALENDAR_EVENT,
        id: eventId,
        isDynamic: true
      });
      const lineCount = rec.getLineCount({ sublistId: 'timeitem' });
      for (let i = lineCount - 1; i >= 0; i--) {
        rec.removeLine({
          sublistId: 'timeitem',
          line: i
        });
      }

      // Unlink related records first
      rec.setValue({ fieldId: 'custevent_esp_fop_event_address', value: '' });
      rec.setValue({ fieldId: 'custevent_esp_fop_sales_order', value: '' });
      rec.save({ ignoreMandatoryFieds: true });

      record.delete({
        type: record.Type.CALENDAR_EVENT,
        id: eventId
      });
      response.write(JSON.stringify({
        code: 200,
        status: 'success'
      }));
    } catch (e) {
      log.audit('deleteRecord() Unexpected Error', e.message);
      response.write(JSON.stringify({
        code: 401,
        status: 'failed',
        errorMsg: e.message
      }));
    }
  }

  return {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
})