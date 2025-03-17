import { Calendar as FullCalendar } from '@fullcalendar/core';
import adaptivePlugin from '@fullcalendar/adaptive';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import * as dataSet from './components/dataSet';
import { onFilterCalendarEvent, onFilterJob } from './components/filterFields/filterUtils';
import { Event, Resource, ToolTip, WarningAlert } from './components/utils';
import './calendar.css';

export default class Calendar {
  static setup() {
    setTimeout(() => {
      $(`<div class="tab-content" id="calendarSection">
          <div class="spinner"></div>
          <div class="main-container">
            <!-- Collapsible First Column -->
            <div class="grid-container">
              <div class="container resizable secondColumn">
                <div id="calendar"></div>
              </div>
              <!-- Resizer Between Second and Third Columns -->
              <div class="resizer" id="calendarColumnResizer"></div>
              <aside class="sidebar resizable thirdColumn">
                <div class="collapse-content collapseRight">
                    <!-- Available Jobs -->
                    <div style="padding: 10px;" class="card-header header">
                      <div style="display: flex; justify-content: space-between; align-items: center; text-align: center;">
                        <div style="display: flex; align-items: center;">
                          <i class="fa-solid fa-screwdriver-wrench" style="font-size: 16px;"></i>
                          <span style="margin-left: 5px; display: flex; align-items: center;">
                            <h4 style="margin: 0;"><strong>Available Jobs</strong></h4>
                          </span>
                          &nbsp;
                          <span class="badge badge-danger badge-pill counter" id="header-calendarjob-counter">${dataSet.workOrders.length}</span>
                        </div>
                        <i class="fa-solid fa-filter filter-icon" style="font-size: 14px;" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldCalendarJob"></i>
                        <span class="badge badge-danger badge-pill counter" id="filter-calendarjob-counter">0</span>
                      </div>
                    </div>
                    <div class="collapsible-list overflow-auto" style="height: 100%; overflow: scroll">
                      <div class="card-wrapper">
                        ${dataSet.workOrders.map(wo => `
                          <div class="card-item" id="${wo.id}" draggable="true">
                            <div class="card-head">
                              <div class="card-name"><a href="${wo.woUrl}" target="_blank"><strong>${wo.name}</strong></a></div>
                              <div class="card-header-options">
                                <div class="dropdown">
                                  <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
                                  <div class="dropdown-content">
                                    <a href="#" onclick="holdWorkOrder(event)">Hold</a>
                                    <a href="#" onclick="printWorkOrder(event)">Print</a>
                                    <a href="#" onclick="cancelWorkOrder(event)">Cancel</a>
                                    <a href="#" onclick="printPickList(event)">Print Pick List</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="card-content">
                              <div class="card-content-woId" woId="${wo.id}">ID ${wo.id}</div>
                              <div class="card-content-customer" customerId="${wo.customer.value}"><strong>${wo.customer.text}</strong></div>
                              <div class="card-content-date">${wo.date}</div>
                              <div class="card-content-project"><strong>EST Hours: </strong>${wo.esthours}</div>
                              <div>
                                <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${wo.status.code};">${wo.status.text}</span>
                              </div>
                            </div>
                          </div>  
                        `)}
                      </div>
                    </div>
                </div>
              </aside>
            </div>
          </div>
        </div>`
        .replace(/,/g, ''))
        .insertAfter('header');

      this._initFullCalendarIO();
      this._initLayoutHandlers();
    });
  }

  static _initFullCalendarIO() {
    const containerEl = document.querySelector('#calendarSection .thirdColumn');
    const calendarEl = document.getElementById('calendar');
    const calendarResources = dataSet.combinedResourceGroups.map(resourceGroup => ({
      id: resourceGroup.value,
      title: resourceGroup.text,
      children: resourceGroup.resources
        .map(resource => ({
          id: `${resourceGroup.value}-${resource.id}`,
          title: resource.name,
          extendedProps: resource
        })),
      extendedProps: resourceGroup
    }));
    // console.log('calendarResources', calendarResources);
    // Events with no resource gets assigned here
    calendarResources.push({
      id: 'z-unassigned', // Auto sorts by id, needs to ba after vendor group
      title: 'Unassigned',
      children: []
    });

    // Remap calendar events data
    // -----------------------------------------------------------------
    let calendarEvents = [];

    const statusClassName = {
      TENTATIVE: 'tentative',
      CONFIRMED: 'confirmed',
      COMPLETED: 'confirmed'
    }

    // Resources
    dataSet.events.map(event => {
      event.resources.map(resource => {
        resource.resourceGroups.map(resourceGroup => {
          const map = {};
          map.id = event.id;//`${event.id}-${resourceGroup.value}-${resource.employee.value}`;
          map.title = event.title;
          map.start = `${event.date.start}T${resource.time.start}`;
          map.end = `${event.date.end}T${resource.time.end}`;
          map.url = event.url;
          map.className = `event-class-style-name ${statusClassName[event.status.value]}`;
          map.resourceIds = [`${resourceGroup.value}-${resource.employee.value}`];
          map.groupId = '';
          if (map.resourceIds.length) {
            map.extendedProps = deepCopy(event);
            map.extendedProps.hasOwnTime = true;
            map.extendedProps.resourceType = 'employee';
            map.extendedProps.resourceKey = 'resources';
            map.extendedProps.woResourceId = resource.id;
            calendarEvents.push(map);
          }
        });
      });
    });

    // Vendor
    dataSet.events.map(event => {
      const map = {};
      map.id = event.id;
      map.title = event.title;
      map.start = `${event.date.start}T${event.time.start}`;
      map.end = `${event.date.end}T${event.time.end}`;
      map.url = event.url;
      map.className = `event-class-style-name ${statusClassName[event.status.value]}`;
      map.resourceIds = event.vendors.map(vendor => `vendor-${vendor.vendor.value}`);
      map.groupId = '';
      if (map.resourceIds.length) {
        map.extendedProps = deepCopy(event);
        map.extendedProps.resourceType = 'vendor';
        map.extendedProps.resourceKey = 'vendors';
        calendarEvents.push(map);
      }
    });

    // Assets
    dataSet.events.map(event => {
      event.assets
        // .filter(asset => !asset.onMaintenance)
        .map(asset => {
          const map = {};
          map.id = event.id;
          map.title = event.title;
          map.start = `${/* asset.date.start ||  */event.date.start}T${asset.time.start}`;
          map.end = `${/* asset.date.end ||  */event.date.end}T${asset.time.end}`;
          map.url = event.url;
          map.className = `event-class-style-name ${statusClassName[event.status.value]}`;
          map.resourceIds = [`asset-${asset.asset.value}`];
          map.groupId = '';
          if (map.resourceIds.length) {
            map.extendedProps = deepCopy(event);
            map.extendedProps.hasOwnTime = true;
            map.extendedProps.resourceType = 'asset';
            map.extendedProps.resourceKey = 'assets';
            map.extendedProps.woAssetId = asset.id;
            calendarEvents.push(map);
          }
        });
    });

    // Unassigned resources
    dataSet.events.map(event => {
      if (!event.resources.length && !event.vendors.length && !event.assets.length) {
        const map = {};
        map.id = event.id;
        map.title = event.title;
        map.start = `${event.date.start}T${event.time.start}`;
        map.end = `${event.date.end}T${event.time.end}`;
        map.url = event.url;
        map.className = `event-class-style-name ${statusClassName[event.status.value]}`;
        map.resourceIds = ['z-unassigned'];
        map.extendedProps = deepCopy(event);
        calendarEvents.push(map);
      }
    });

    calendarEvents = calendarEvents.filter(event => !!(event.resourceIds.length));
    // Instantiate draggable external events
    // -----------------------------------------------------------------
    this._initDraggableEvents(containerEl);
    // Instantiate calendar
    // -----------------------------------------------------------------
    window.FullCalendar = new FullCalendar(calendarEl, {
      plugins: [adaptivePlugin, interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin],
      schedulerLicenseKey: 'XXX',
      nowIndicator: true,
      editable: true,
      // droppable: true, // Allow external events to be dropped
      aspectRatio: 1,
      eventDurationEditable: true,
      eventResizableFromStart: true,
      eventOverlap: true,
      // Add legend and filter fields
      contentHeight: 'auto', // or a specific value like 600
      scrollTime: '08:00:00', // Set default scroll start time
      dayMinWidth: 100, // Adjust as needed
      slotMinWidth: 75, // Adjust this value based on your needs
      // slotDuration: '04:00:00', // Set slot duration to 4 hours
      // slotLabelInterval: '04:00', // Optionally, set the slot label interval to 4 hours
      snapDuration: '01:00:00', // Snap to 15 minutes
      // -----------------------------------------------------------------
      viewDidMount: info => {
        // console.log('viewDidMount triggered.');
        this._appendHeaderAndFilterFields();
      },
      headerToolbar: {
        left: 'todayBtn prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineDefault,resourceTimelineWeek,resourceTimelineMonth createEventBtn'
      },
      // Resource etc settings
      // -----------------------------------------------------------------
      initialView: 'resourceTimelineDefault',
      resourceAreaWidth: '15%',
      views: {
        resourceTimelineDay: {
          buttonText: 'Day',
          slotDuration: '01:00:00',  // 1-hour interval for today view
          slotLabelInterval: '01:00', // Optionally, set the slot label interval to 1 hour
        },
        resourceTimelineDefault: {
          type: 'resourceTimeline',
          buttonText: '3 days',
          duration: { days: 3 },
          slotLabelFormat: [
            { weekday: 'long' },  // Display day of the week
            { hour: 'numeric', /* minute: '2-digit', */ meridiem: 'short' }  // Time format
          ],
          slotDuration: '04:00:00', // Set slot duration to 4 hours
          slotLabelInterval: '04:00', // Optionally, set the slot label interval to 4 hours
        },
        resourceTimelineWeek: {
          slotDuration: '04:00:00', // Set slot duration to 4 hours
          slotLabelInterval: '04:00', // Optionally, set the slot label interval to 4 hours
        },
        resourceTimelineMonth: {
          slotDuration: '04:00:00', // Set slot duration to 4 hours
          slotLabelInterval: '04:00', // Optionally, set the slot label interval to 4 hours
        }
      },
      resourceAreaHeaderContent: arg => {
        return {
          html: `<div style="padding: 10px; width: 100%" id="main-resource-header">
            <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
            <span style="display: inline-block;"><h4><strong>Resources</strong></h4></span>
          </div>`
        }
      },
      resources: (fetchInfo, successCallback, failureCallback) => {
        successCallback(calendarResources);
      },
      resourceOrder: 'group', // Asset placed at the bottom
      resourceLabelContent: arg => {
        const resource = arg.resource.extendedProps;
        if (resource.resourceCount) {
          return {
            html: `<i class="fa-solid fa-icon-size fa-user-group"></i>
            ${resource.text}
            <span class="badge badge-danger badge-pill counter" style="font-size: 9px">${resource.resourceCount}</span>
            `
          };
        } else {
          if (resource.id)
            return resource.name;
        }
      },
      events: (fetchInfo, successCallback, failureCallback) => {
        successCallback(calendarEvents/* .filter(event => event.extendedProps.status.value !== 'COMPLETED') */);
      },
      customButtons: {
        todayBtn: {
          text: 'Today',
          click: () => {
            const currentDate = new Date();
            window.FullCalendar.changeView('resourceTimelineDay');
            window.FullCalendar.gotoDate(currentDate);
          }
        },
        createEventBtn: {
          text: 'New Event',
          click: () => {
            openGeneralEventModal();
          }
        }
      },
      // Event actions etc settings
      // -----------------------------------------------------------------
      eventDidMount: info => {
        // console.log('eventDidMount triggered.');
        const event = info.event.extendedProps;
        if (event.id) {
          try {
            switch (event.status.value) {
              case 'TENTATIVE':
                info.el.classList.add('tentative');
                break;
              case 'CONFIRMED':
                info.el.classList.add('confirmed');
                break;
              case 'COMPLETED':
                info.el.classList.add('completed');
                break;
            }
            ToolTip.setup();
            this._initDropDown(info);
            this._adjustZoomLevel(info);
          } catch (e) {
            console.log('eventDidMount Unexpected Error', e.message);
          }
        }
      },
      eventContent: el => {
        const event = el.event.extendedProps;
        if (event.id) {
          try {
            const html = `
              <div 
                clas="card-event" id="${event.id}" 
                draggable=true
                data-bs-toggle="tooltip" 
                data-bs-placement="right" 
                title="<strong>${event.title}</strong><br>
                  ID ${event.id}<br/>
                  ${event.workorder.text}<br/>
                  ${event.date.start == event.date.end ? moment(event.date.start).format('M/D/YYYY') : `${moment(event.date.start).format('M/D/YYYY')} - ${moment(event.date.end).format('M/D/YYYY')}`}<br/>
                  ${moment(el.event.start).format('h:mm a')} - ${moment(el.event.end).format('h:mm a')}"
              >
              <div class="card-head">
                <div class="card-name"><a href="${event.url}" target="_blank" onclick="window.open('/app/crm/calendar/event.nl?id=${event.id}', '_blank')"><strong>${event.title}</strong> [ID ${event.id}]</a>
                </div>
              </div>
              <div class="card-content" style="position: relative">
                <div class="row">
                  <div class="col-2 fc-event-status">
                    <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.priority.code};">${event.priority.text}</span>
                    ${(event.woRef?.receiptStatus?.value || '') !== '1' && event?.woRef?.receiptStatus?.code ? `<span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.woRef.receiptStatus.code}">${event.woRef.receiptStatus.display}</span>` : ''}
                  </div>
                </div>
              </div>
            </div>
            `;
            return { html };
          } catch (e) {
            console.log('eventContent Unexpected Error', e.message);
          }
        }
      },
      eventClick: event => {
        if (event.event.url) {
          event.jsEvent.preventDefault();
          // window.open(event.event.url, "_blank");
        }
      },
      // Moving events to change dates (Updates start and end date)
      // -----------------------------------------------------------------
      eventDrop: info => {
        // console.log('eventDrop triggered.', info);
        info.action = 'eventDrop';
        const eventData = info.event.extendedProps;
        if (eventData?.hasOwnTime) {
          if (info.newResource) {
            if (eventData.resourceType === 'employee') {
              this._confirmResourceAssignment(info); // Assigning new resource
            } else {
              this._confirmAssetAssignment(info);
            }
          } else {
            if (eventData.resourceType === 'employee') {
              this._confirmResourceDateTimeUpdate(info); // Dragging the event horizontally
            } else {
              this._confirmAssetDateTimeUpdate(info);
            }
          }
        } else {
          this._confirmEventUpdate(info);
        }
      },
      // Updates start and end time and day
      // -----------------------------------------------------------------
      eventResize: info => {
        // console.log('eventResize triggered.', info);
        info.action = 'eventResize';
        const eventData = info.event.extendedProps;
        if (eventData?.hasOwnTime) {
          if (eventData.resourceType === 'employee') {
            this._confirmResourceDateTimeUpdate(info);
          } else {
            this._confirmAssetDateTimeUpdate(info);
          }
        } else {
          this._confirmEventUpdate(info);
        }
      },
      // Ex. Dropping external events/jobs
      // -----------------------------------------------------------------
      eventReceive: info => {
        // console.log('eventReceive triggered.');
        info.action = 'eventReceive';
        this._calendarEventDrop(info);
      },
      // Disable event drop on Groups
      eventAllow: (dropInfo, draggedEvent) => {
        // console.log('eventAllow triggered.');
        return !dropInfo.resource.extendedProps.resourceCount;
      },
      windowResize: arg => {
        console.log('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
        this._adjustZoomLevel(arg);
        window.FullCalendar.render();
      },
      datesSet: info => {
        console.log('Page changed', info);
        this._adjustZoomLevel(info);
        onFilterCalendarEvent('#filterFieldCalendarEvent', true, info);
      }
    });

    window.FullCalendar.render();
  }

  // Instantiate tab header switch, column resizer etc.
  // -----------------------------------------------------------------
  static _initLayoutHandlers() {
    const resizer = document.getElementById('calendarColumnResizer');
    const leftSide = document.querySelector('#calendarSection .secondColumn');
    const rightSide = document.querySelector('#calendarSection .thirdColumn');
    let x = 0;
    let leftWidth = 0;

    const mouseMoveHandler = e => {
      const dx = e.clientX - x;
      const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
      leftSide.style.flexBasis = `${newLeftWidth}%`;
      rightSide.style.flexBasis = `${100 - newLeftWidth}%`;
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    const mouseDownHandler = e => {
      x = e.clientX;
      leftWidth = leftSide.getBoundingClientRect().width;
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    resizer.addEventListener('mousedown', mouseDownHandler);

    onFilterCalendarEvent('#filterFieldCalendarEvent', false);
    onFilterJob('#calendarSection .thirdColumn');
  }

  static _adjustZoomLevel(el) {
    if (el.view.type === 'resourceTimelineDay' || (screen.width > 1470 && screen.height > 956)) { // Restore original zoom level for resourceTimelineDay view
      $('#calendarSection .grid-container').css('zoom', 1);
      $('#calendarSection .fc-timeline-event-harness').css('zoom', 1);
    } else {
      $('#calendarSection .grid-container').css('zoom', 0.8);
      $('#calendarSection .fc-timeline-event-harness').css('zoom', 1.25);
    }
  }

  static _appendHeaderAndFilterFields() {
    if (!$('#legend').length) {
      const legendHTML = `
      <div id="legend">
        <span class="confirmed"></span> Confirmed
        <span class="tentative"></span> Tentative
        <span class="completed"></span> Completed
      </div>`;
      $(legendHTML).insertAfter('.fc-toolbar-title');
      $('#fc-dom-1').append(`
        <div class="d-flex align-items-center">
          <i class="fa-solid fa-filter filter-icon" style="font-size: 20px; margin-left: 20px" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldCalendarEvent"></i>
          <span class="badge badge-danger badge-pill counter" style="font-size: 8px" id="filter-calendarevent-counter">0</span>
        </div>`);
    }
  }

  static _calendarEventDrop(info) {
    // console.log('Event Received', info);
    ToolTip.remove();

    const data = {};
    data.date = {};
    data.time = {};

    const woId = info.event.extendedProps.woId;
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    data.date.start = startSplit[0];
    data.time.start = startSplit[1];
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    data.date.end = endSplit[0];
    data.time.end = endSplit[1];
    const start = moment(`${data.date.start} ${data.time.start}`);
    const selectedResourceId = info.event._def.resourceIds[0].split('-').pop();
    data.selectedResourceId = dataSet.resources
      .map(resource => resource.id)
      .includes(selectedResourceId) ? selectedResourceId : '';
    data.selectedVendorId = dataSet.vendors
      .map(vendor => vendor.id)
      .includes(selectedResourceId) ? selectedResourceId : '';
    data.selectedAssetId = dataSet.assets
      .map(asset => asset.id)
      .includes(selectedResourceId) ? selectedResourceId : '';
    if (data.selectedResourceId) {
      data.resourceType = 'employee';
    } else if (data.selectedVendorId) {
      data.resourceType = 'vendor';
    } else if (data.selectedAssetId) {
      data.resourceType = 'asset';
    }
    const hasConflict = Event.draggedJobHasConflictEventToResource(start, data.resourceType, selectedResourceId);
    if (hasConflict) {
      WarningAlert.conflictSchedule();
      info.revert();
      return;
    }

    console.log('Calendar Drop Data', data);
    openEventModal(null, woId, '', data);
    info.revert();
  }

  static _confirmResourceAssignment(info) {
    ToolTip.remove();

    const payload = {};
    const eventData = info.event.extendedProps;
    const employeeId = info.newResource.id.split('-').pop();
    const resourceId = eventData.woResourceId;
    payload.id = resourceId;
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.date = {
      start: startSplit[0],
      end: endSplit[0]
    }
    payload.time = {
      start: startSplit[1],
      end: endSplit[1]
    }
    const calEvents = window.FullCalendar.getEvents();
    if (calEvents.length) {
      const calEvent = calEvents.find(event => event.id == info.event.id);
      if (calEvent) {
        const hasConflict = Event.draggedEventToNewResourceHasConflictEvent(payload.date, payload.time, employeeId);
        const allowEvent = !hasConflict;

        if (allowEvent) {
          // console.log('----- [Updated Event Details] -----', payload, info);
          Resource.updateResourceAssignment(payload, info);
        } else {
          WarningAlert.conflictSchedule();
          info.revert();
        }
      }
    }
  }

  static _confirmAssetAssignment(info) {
    ToolTip.remove();

    const payload = {};
    const eventData = info.event.extendedProps;
    const assetId = info.newResource.id.split('-').pop();
    const resourceId = eventData.woAssetId;
    payload.id = resourceId;
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.date = {
      start: startSplit[0],
      end: endSplit[0]
    }
    payload.time = {
      start: startSplit[1],
      end: endSplit[1]
    }
    const calEvents = window.FullCalendar.getEvents();
    if (calEvents.length) {
      const calEvent = calEvents.find(event => event.id == info.event.id);
      if (calEvent) {
        const hasConflict = Event.draggedEventToNewAssetHasConflictEvent(payload.date, payload.time, assetId);
        const allowEvent = !hasConflict;

        if (allowEvent) {
          // console.log('----- [Updated Event Details] -----', payload, info);
          Resource.updateAssetAssignment(payload, info);
        } else {
          WarningAlert.conflictSchedule();
          info.revert();
        }
      }
    }
  }

  static _confirmResourceDateTimeUpdate(info) {
    ToolTip.remove();

    const payload = {};
    const eventData = deepCopy(info.event.extendedProps);
    const resourceId = eventData.woResourceId;

    if (eventData.status.value === 'COMPLETED') {
      Swal.fire(
        'Event already Completed',
        `Event Record [${eventData.id}]`,
        'warning'
      );
      info.revert();
      return;
    }

    payload.id = resourceId;
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.date = {
      start: startSplit[0],
      end: endSplit[0]
    }
    payload.time = {
      start: startSplit[1],
      end: endSplit[1]
    }
    const calEvents = window.FullCalendar.getEvents();
    if (calEvents.length) {
      const calEvent = calEvents.find(event => event.id == info.event.id);
      if (calEvent) {
        const hasConflict = Event.draggedResourceHasConflictEvent(eventData.id, payload.date, payload.time, resourceId);
        const allowEvent = !hasConflict;

        if (allowEvent) {
          // console.log('----- [Updated Event Details] -----', payload, info);
          Resource.updateResourceDateTime(payload, info);
        } else {
          WarningAlert.conflictSchedule();
          info.revert();
        }
      }
    }
  }

  static _confirmAssetDateTimeUpdate(info) {
    ToolTip.remove();

    const payload = {};
    const eventData = deepCopy(info.event.extendedProps);
    const resourceId = eventData.woAssetId;

    if (eventData.status.value === 'COMPLETED') {
      Swal.fire(
        'Event already Completed',
        `Event Record [${eventData.id}]`,
        'warning'
      );
      info.revert();
      return;
    }

    payload.id = resourceId;
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.date = {
      start: startSplit[0],
      end: endSplit[0]
    }
    payload.time = {
      start: startSplit[1],
      end: endSplit[1]
    }
    const calEvents = window.FullCalendar.getEvents();
    if (calEvents.length) {
      const calEvent = calEvents.find(event => event.id == info.event.id);
      if (calEvent) {
        const hasConflict = Event.draggedAssetHasConflictEvent(eventData.id, payload.date, payload.time, resourceId);
        const allowEvent = !hasConflict;

        if (allowEvent) {
          // console.log('----- [Updated Event Details] -----', payload, info);
          Resource.updateAssetDateTime(payload, info);
        } else {
          WarningAlert.conflictSchedule();
          info.revert();
        }
      }
    }
  }

  static _confirmEventUpdate(info) {
    ToolTip.remove();
    const payload = {};
    const eventData = deepCopy(info.event.extendedProps);

    if (eventData.status.value === 'COMPLETED') {
      Swal.fire(
        'Event already Completed',
        `Event Record [${eventData.id}]`,
        'warning'
      );
      info.revert();
      return;
    }

    payload.eventData = eventData;
    payload.oldEventData = dataSet.events.find(event => event.id == payload.eventData.id) || {};
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    const date = {
      start: startSplit[0],
      end: endSplit[0]
    }
    const time = {
      start: startSplit[1],
      end: endSplit[1]
    }
    payload.eventData.date.start = date.start;
    payload.eventData.date.end = date.end;
    payload.eventData.time.start = time.start;
    payload.eventData.time.end = time.end;

    payload.eventData.priority = payload.eventData.priority.value;
    payload.eventData.status = payload.eventData.status.value;

    if (info.action === 'eventDrop') {
      const calEvents = window.FullCalendar.getEvents();
      if (calEvents.length) {
        const calEvent = calEvents.find(event => event.id == info.event.id);
        if (calEvent) {
          // Validate new resource
          if (info.newResource) {
            const woRef = !!Object.keys(payload.eventData.woRef).length ? payload.eventData.woRef : null;
            const woResourcesFiltered = woRef ? dataSet.woResources.filter(resource => resource.workorder.value == woRef.id) : [];
            payload.woRef = woRef;
            payload.woResources = woResourcesFiltered;

            const { resourceType, resourceKey } = eventData;

            const elementId = info.newResource._resource.id;
            const resourceId = elementId.split('-').pop();
            let foundObj, allowEvent = false;

            if (resourceType === 'employee') {
              foundObj = payload.eventData.resources.find(resource => resource.employee.value == resourceId);
              const hasConflict = Event.draggedResourceHasConflictEvent(payload.eventData.id, date, time, resourceId);
              allowEvent = !foundObj && !hasConflict;
            } else {
              payload.eventData.date.start = date.start;
              payload.eventData.date.end = date.end;
              payload.eventData.time.start = time.start;
              payload.eventData.time.end = time.end;

              if (resourceType === 'vendor') {
                foundObj = payload.eventData.vendors.find(vendor => vendor.vendor.value == resourceId);
                allowEvent = !foundObj;
              }
            }

            if (allowEvent) {
              if (resourceKey === 'resources') {
                const resourcesToUse = dataSet.activeResources.map(resource => {
                  const id = resource.id;
                  let foundObj = woResourcesFiltered.find(woResource => woResource.employee.value == id);
                  if (foundObj) {
                    resource = deepCopy(foundObj);
                  }
                  foundObj = payload.eventData.resources.find(eventResource => eventResource.employee.value == id);
                  if (foundObj) {
                    resource = deepCopy(foundObj);
                  }
                  return resource;
                });
                payload.eventData.selectedResources = resourcesToUse.filter(resource => resourceId == resource.id);
                payload.eventData.selectedResources = [...payload.eventData.resources, ...payload.eventData.selectedResources];
                if (info.oldResource) {
                  const index = payload.eventData.selectedResources
                    .map(resource => resource.employee.value)
                    .indexOf(info.oldResource.extendedProps.employee.value);
                  if (index > -1) {
                    payload.eventData.selectedResources.splice(index, 1); // Removed resource
                  }
                }
              } else if (resourceKey === 'vendors') {
                let unassignedVendors = deepCopy(dataSet.vendors)
                  .filter(vendor => !payload.eventData.vendors.map(vendor => vendor.vendor.value)
                    .includes(vendor.id));
                unassignedVendors = [...payload.eventData.vendors, ...unassignedVendors];
                const vendorsToUse = unassignedVendors;
                payload.eventData.selectedVendors = vendorsToUse.filter(vendor => resourceId == vendor.id);
                payload.eventData.selectedVendors = [...payload.eventData.vendors, ...payload.eventData.selectedVendors];
                if (info.oldResource) {
                  const index = payload.eventData.selectedVendors
                    .map(vendor => vendor.vendor.value)
                    .indexOf(info.oldResource.extendedProps.vendor.value);
                  if (index > -1) {
                    payload.eventData.selectedVendors.splice(index, 1); // Removed vendor
                  }
                }
              } else if (resourceKey === 'assets') { // TBR
                let unassignedAssets = deepCopy(dataSet.assets)
                  .filter(asset => !payload.eventData.assets.map(asset => asset.asset.value)
                    .includes(asset.id));
                unassignedAssets = [...payload.eventData.assets, ...unassignedAssets];
                const assetsToUse = unassignedAssets;
                payload.eventData.selectedAssets = assetsToUse.filter(asset => resourceId == asset.id);
                payload.eventData.selectedAssets = [...payload.eventData.assets, ...payload.eventData.selectedAssets];
                if (info.oldResource) {
                  const index = payload.eventData.selectedAssets
                    .map(asset => asset.asset.value)
                    .indexOf(info.oldResource.extendedProps.asset.value);
                  if (index > -1) {
                    payload.eventData.selectedAssets.splice(index, 1); // Removed asset
                  }
                }
              }
            } else {
              WarningAlert.conflictSchedule();
              info.revert();
              return;
            }
          }
        }
      }
    }
    // console.log('----- [Updated Event Details] -----', payload, info);
    Event.updateEventRecord(payload, 'eventModal', info);
  }

  static _initDraggableEvents(el) {
    new Draggable(el, {
      itemSelector: '.card-item',
      eventData: el => {
        return {
          title: el.innerText,
          woId: el.getAttribute('id'),
          duration: '04:00'
        };
      }
    });
  }

  static _initDropDown(info) {
    const eventId = info.event.id;
    const event = dataSet.events.find(event => event.id == eventId);
    const html = `<div class="card-header-options">
      <div class="dropdown" style="display:inline-block">
        <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
        ${`<div class="dropdown-content" style="top: -30px">
            ${(!event.workorder.value) ? `<a href="#" onclick="openGeneralEventModal(${eventId})" ${event.status.value === 'COMPLETED' && "class='disabled'"}>Update Event</a>` : `<a href="#" onclick="openEventModal('', '', ${eventId})" ${event.status.value === 'COMPLETED' && "class='disabled'"}>Update Event</a>`}
            <a href="#" onclick="openCompleteEventModal('', ${eventId})" ${event.status.value === 'COMPLETED' && "class='disabled'"}>Complete Event</a>
            <a href="#" onclick="deleteEventRecord('', ${eventId})">Remove Event</a>
          </div>`}
      </div>
    </div>`;
    const el = info.el.querySelector('div.card-name');
    el.insertAdjacentHTML('afterend', html);
  }
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}