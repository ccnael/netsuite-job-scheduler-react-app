/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/runtime',
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
], (
  runtime,
  search,
  record,
  woResourceLib,
  woVendorLib,
  woAssetLib,
  woItemLib,
  woContactLib,
  woAddressLib,
  helper,
  utils,
  env,
  moment
) => {
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
          search.createColumn({ name: 'custevent_esp_fop_routing_group', label: 'Routing Group' }),
          search.createColumn({ name: 'custevent_esp_fop_sales_order', label: 'Sales Order' }),
          search.createColumn({ name: 'tranid', join: 'custevent_esp_fop_sales_order', label: 'Document Number' }),
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
      assetMaintenance: map.getValue('custevent_esp_fop_asset_maintenance'),
      routingGroup: {
        text: map.getText('custevent_esp_fop_routing_group'),
        value: map.getValue('custevent_esp_fop_routing_group')
      },
      salesorder: {
        text: map.getValue({
          name: 'tranid',
          join: 'custevent_esp_fop_sales_order'
        }),
        value: map.getValue('custevent_esp_fop_sales_order')
      }
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
    const eventData = JSON.parse(requestBody);

    log.audit('----- [Create Work Order Event] -----', { eventData });

    try {
      eventData.parsedStartDate = utils.parseDate(eventData.date.start);
      eventData.parsedEndDate = utils.parseDate(eventData.date.end);
      eventData.date.start = moment(eventData.date.start).format(env.Format.IMPORT_DATE);
      eventData.date.end = moment(eventData.date.end).format(env.Format.IMPORT_DATE);
      eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(env.Format.IMPORT_TIME);
      eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(env.Format.IMPORT_TIME);

      const nsFld = {};
      nsFld.title = eventData.title;
      nsFld.custevent_esp_fop_work_order = eventData?.woRef?.id || '';
      nsFld.organizer = user.id;
      nsFld.status = eventData.status.value.replace('COMPLETED', 'COMPLETE');
      nsFld.accesslevel = 'PUBLIC';
      nsFld.startdate = eventData.parsedStartDate;
      nsFld.starttime = helper.toDateTimez(eventData.date.start, eventData.time.start);
      nsFld.endtime = helper.toDateTimez(eventData.date.start, eventData.time.end);
      nsFld.custevent_esp_fop_event_priority = eventData.priority.value;
      nsFld.custevent_esp_fop_memo = eventData.note;
      nsFld.custevent_task_pi = eventData?.projectInsight?.value;
      nsFld.custevent_esp_fop_asset_maintenance = !!(eventData?.assetMaintenance);

      if (eventData.address) {
        nsFld.custevent_esp_fop_event_address = eventData.address?.value;
      }

      const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;

      if (numberOfDays > 1) {
        nsFld.frequency = 'DAY';
        nsFld.period = '1'; // Repeat every 1 day(s) / Daily
      } else {
        // Default > Single Day Event (value->NONE)
      }
      nsFld.custevent_esp_fop_routing_group = eventData.routingGroup.value;
      nsFld.endbydate = eventData.parsedEndDate;

      const rec = record.create({
        type: record.Type.CALENDAR_EVENT,
        isDynamic: true
      });

      for (const key in nsFld) {
        rec.setValue({
          fieldId: key,
          value: nsFld[key]
        });
      }

      eventData.id = rec.save({ ignoreMandatoryFieds: true });
      log.audit('----- [Created Event Record] -----', { recordId: eventData.id });

      eventData?.resources.length && woResourceLib.createResources(eventData);
      eventData?.vendors.length && woVendorLib.createVendors(eventData);
      eventData?.assets.length && woAssetLib.createAssets(eventData);
      eventData?.items.length && woItemLib.createItems(eventData);
      eventData?.contacts.length && woContactLib.createContacts(eventData);
      eventData?.address?.value && woAddressLib.addEventToAddress(eventData);

      response.write(JSON.stringify({
        code: 200,
        recordId: eventData.id,
        status: 'success'
      }));
    } catch (e) {
      log.error('createEventRecord() Unexpected Error', e.message);
      throw new Error(`Unexpected Error: ${e.message}`);
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
    const { eventData, updates } = payload;

    log.audit('----- [Update Work Order Event] -----', { updates });
    log.audit('----- [Event Record Data] -----', eventData);

    const parsedStartDate = utils.parseDate(updates.date.start);
    const parsedEndDate = utils.parseDate(updates.date.end);
    const nsFld = {};

    try {
      if (eventData.title != updates.title) {
        nsFld.title = updates.title;
      }
      if (eventData.date.start != updates.date.start) {
        nsFld.startdate = parsedStartDate;
      }
      if (eventData.date.end != updates.date.end) {
        const numberOfDays = moment(updates.date.end).diff(moment(updates.date.start), 'days') + 1;
        if (numberOfDays > 1) {
          nsFld.frequency = 'DAY';
          nsFld.period = '1';
        }
        nsFld.endbydate = parsedEndDate;
      }

      if (eventData.time.start != updates.time.start) {
        updates.date.start = moment(updates.date.start).format(env.Format.IMPORT_DATE);
        updates.time.start = moment(`1/1/1999 ${updates.time.start}`).format(env.Format.IMPORT_TIME);
        nsFld.starttime = helper.toDateTimez(updates.date.start, updates.time.start);
      }
      if (eventData.time.end != updates.time.end) {
        updates.date.end = moment(updates.date.end).format(env.Format.IMPORT_DATE);
        updates.time.end = moment(`1/1/1999 ${updates.time.end}`).format(env.Format.IMPORT_TIME);
        nsFld.endtime = helper.toDateTimez(updates.date.end, updates.time.end);
      }
      if (eventData.note != updates.note) {
        nsFld.custevent_esp_fop_memo = updates.note;
      }
      if (updates.priority) {
        if (eventData.priority?.value != updates.priority?.value) {
          nsFld.custevent_esp_fop_event_priority = updates.priority.value;
        }
      }
      if (updates.status) {
        if (eventData.status?.value != updates.status?.value) {
          nsFld.status = updates.status.value.replace('COMPLETED', 'COMPLETE');
        }
      }
      if (updates.address) {
        if (eventData.address?.value != updates.address?.value) {
          nsFld.custevent_esp_fop_event_address = updates.address.value;
        }
      }
      if (eventData.routingGroup.value != updates.routingGroup.value) {
        nsFld.custevent_esp_fop_routing_group = updates.routingGroup.value;
      }

      const { newResources, updatedResources, removedResources } = woResourceLib.prepareUpdatedWOResources(eventData, updates);
      const { newVendors, updatedVendors, removedVendors } = woVendorLib.prepareUpdatedWOVendors(eventData, updates);
      const { newAssets, updatedAssets, removedAssets } = woAssetLib.prepareUpdatedWOAssets(eventData, updates);
      const { newItems, updatedItems, removedItems } = woItemLib.prepareUpdatedWOItems(eventData, updates);
      const { newContacts, removedContacts } = woContactLib.prepareUpdatedWOContacts(eventData, updates);

      log.audit('Fields To Update', {
        nsFld,
        newResources: newResources.length,
        updatedResources: updatedResources.length,
        removedResources: removedResources.length,
        newVendors: newVendors.length,
        updatedVendors: updatedVendors.length,
        removedVendors: removedVendors.length,
        newAssets: newAssets.length,
        updatedAssets: updatedAssets.length,
        removedAssets: removedAssets.length,
        newItems: newItems.length,
        updatedItems: updatedItems.length,
        removedItems: removedItems.length,
        newContacts: newContacts.length,
        removedContacts: removedContacts.length,
        newAddressId: nsFld.custevent_esp_fop_routing_group
      });

      if (
        !Object.keys(nsFld).length &&
        !newResources.length &&
        !updatedResources.length &&
        !removedResources.length &&
        !newVendors.length &&
        !updatedVendors.length &&
        !removedVendors.length &&
        !newAssets.length &&
        !updatedAssets.length &&
        !removedAssets.length &&
        !newItems.length &&
        !updatedItems.length &&
        !removedItems.length &&
        !newContacts.length &&
        !removedContacts.length &&
        !nsFld.custevent_esp_fop_event_address
      ) {
        response.write(JSON.stringify({
          code: 200,
          status: 'success',
          message: 'Nothing to update'
        }));
      } else {
        // Update event
        if (Object.keys(nsFld).length) {
          // Will not work (doesnt support event native fields)
          /* record.submitFields({}); */
          const rec = record.load({
            type: record.Type.CALENDAR_EVENT,
            id: eventData.id
          });
          for (const key in nsFld) {
            rec.setValue({
              fieldId: key,
              value: nsFld[key]
            });
            // log.debug(`Setting Field ${key}`, nsFld[key]);
          }
          rec.save({ ignoreMandatoryFieds: true });
          log.audit('----- [Updated Event Record] -----', { recordId: eventData.id });
        } else {
          log.audit('----- [Update Event Record not needed!] -----', { recordId: eventData.id });
        }

        eventData.resources = newResources;
        eventData.vendors = newVendors;
        eventData.assets = newAssets;
        eventData.items = newItems;
        eventData.contacts = newContacts;

        newResources.length && woResourceLib.createResources(eventData);
        updatedResources.length && woResourceLib.updateResources(updatedResources);
        removedResources.length && woResourceLib.removeResources(removedResources);
        newVendors.length && woVendorLib.createVendors(eventData);
        updatedVendors.length && woVendorLib.updateVendors(updatedVendors);
        removedVendors.length && woVendorLib.removeVendors(removedVendors);
        newAssets.length && woAssetLib.createAssets(eventData);
        updatedAssets.length && woAssetLib.updateAssets(updatedAssets);
        removedAssets.length && woAssetLib.removeAssets(removedAssets);
        newItems.length && woItemLib.createItems(eventData);
        updatedItems.length && woItemLib.updateItems(updatedItems);
        removedItems.length && woItemLib.removeItems(removedItems);
        newContacts.length && woContactLib.createContacts(eventData);
        removedContacts.length && woContactLib.removeContacts(removedContacts);

        if (eventData.address?.value != updates.address?.value) {
          woAddressLib.removeEventFromAddress(eventData.address, eventData.id);
          eventData.address = updates.address;
          woAddressLib.addEventToAddress(eventData);
        }

        response.write(JSON.stringify({
          code: 200,
          status: 'success',
          message: 'Updated Successfully'
        }));
      }
    } catch (e) {
      log.error('updateEventRecord() Unexpected Error', e.message);
      throw new Error(`Unexpected Error: ${e.message}`);
    }
  }

  /**
   * Delete event record
   * @param {Object} context Suitelet object
   */
  function removeEvent(context) {
    const { request, response } = context;
    const requestBody = request.body || '{}';

    try {
      const eventData = JSON.parse(requestBody);
      const eventId = eventData.id;

      // Unlink event from related child records before the deletion
      utils.deleteRecords(env.RecordType.WORK_ORDER_RESOURCE, eventData.resources.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_VENDOR, eventData.vendors.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_ASSET, eventData.assets.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_ITEM, eventData.items.map(x => x.id));
      utils.deleteRecords(env.RecordType.WORK_ORDER_CONTACT, eventData.contacts.map(x => x.id));
      woAddressLib.removeEventFromAddress(eventData.address, eventData.id);

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
      log.error('removeEvent() Unexpected Error', e.message);
      throw new Error(`Unexpected Error: ${e.message}`);
    }
  }

  return {
    getEvents,
    createEvent,
    updateEvent,
    removeEvent
  }
})