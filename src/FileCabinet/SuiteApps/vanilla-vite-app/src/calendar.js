import { Calendar as FullCalendar } from '@fullcalendar/core';
import adaptivePlugin from '@fullcalendar/adaptive';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import * as dataSet from './components/dataSet';
import { initCalendarFilters, initAvailableJobsFilters, updateCurrentCalendarPageEventCount } from './components/filters';
import { Event } from './components/utils';
import './calendar.css';

export default class Calendar {
  static setup() {
    setTimeout(() => {
      $(`<div class="tab-content" id="calendarSection">
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
                      <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
                      <span style="display: inline-block; text-align: center"><h5><strong>Available Jobs</strong></h5></span>
                      <span class="badge badge-danger badge-pill counter">${dataSet.workOrders.length}</span>
                    </div>
                    <div id="col2_2-filter-tableWrapper" class="accordion accordion-flush">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="col2_2-filter-tableHeading">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#col2_2-filter-table" aria-expanded="false" aria-controls="col2_2-filter-table">
                            <i class="fa fa-filter"></i>
                            <strong class="grid-header">&nbsp;Filters</strong>
                          </button>
                        </h2>
                        <div id="col2_2-filter-table" class="accordion-collapse collapse" aria-labelledby="col2_2-filter-tableHeading" data-bs-parent="#col2_2-filter-tableWrapper">
                          <div class="container-fluid mt-3">
                            <!-- Customer Filter (First Row) -->
                            <div class="row g-3">
                              <div class="col-6">
                                <select class="selectpicker mx-auto multiple-customer-field" title="Filter by Customer" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                                  ${dataSet.customers.map(customer => `<option value="${customer.value}">${customer.text}</option>`)}
                                </select>
                              </div>
                            </div>
                            <!-- Work Order Title (Second Row) -->
                            <div class="row g-3 mt-3">
                              <div class="col-9">
                                <input type="text" class="form-control" id="woTitle" placeholder="Enter Work Order Title">
                              </div>
                            </div>

                            <!-- Date Filters (Third Row) -->
                            <div class="row g-3 mt-3 align-items-center">
                              <div class="col-md-6 d-flex align-items-center">
                                <label for="calendar-job-datefrom" class="col-form-label me-2">From:</label>
                                <input type="date" class="form-control" id="calendar-job-datefrom">
                              </div>
                              <div class="col-md-6 d-flex align-items-center">
                                <label for="calendar-job-dateto" class="col-form-label me-2">To:</label>
                                <input type="date" class="form-control" id="calendar-job-dateto">
                              </div>
                            </div>
                          </div>
                        </div>
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
      children: resourceGroup.resources.map(resource => ({
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
    let calendarEvents = dataSet.events.map(event => {
      const map = {};
      map.id = event.id;
      map.title = event.title;
      map.start = `${event.date.start}T${event.time.start}`;
      map.end = `${event.date.end}T${event.time.end}`;
      map.url = event.url;
      map.className = 'event-class-style-name';

      switch (event.status.value) {
        case 'TENTATIVE':
          map.className += ' tentative';
          break;
        case 'CONFIRMED':
          map.className += ' confirmed';
          break;
        case 'COMPLETED':
          map.className += ' confirmed';
          break;
      }
      map.resourceIds = [];
      map.resourceIds = [...map.resourceIds, ...event.vendors.map(vendor => `vendor-${vendor.vendor.value}`)];

      event.resources.forEach(resource => {
        resource.resourceGroups.forEach(resourceGroup => {
          map.resourceIds.push(`${resourceGroup.value}-${resource.employee.value}`);
        });
      });

      if (!map.resourceIds.length) {
        map.resourceIds = ['z-unassigned'];
      }
      map.extendedProps = deepCopy(event);
      return map;
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
      droppable: true, // Allow external events to be dropped
      aspectRatio: 1,
      eventDurationEditable: true,
      eventResizableFromStart: true,
      eventOverlap: true,
      // eventColor: '#02ac5a', // Default color class -> .confirmed
      // scrollTime: '00:00', // Undo default 6am scrollTime
      // Add legend and filter fields
      contentHeight: 'auto', // or a specific value like 600
      scrollTime: '08:00:00', // Set default scroll start time
      dayMinWidth: 100, // Adjust as needed
      slotMinWidth: 75, // Adjust this value based on your needs
      slotDuration: '04:00:00', // Set slot duration to 4 hours
      slotLabelInterval: '04:00', // Optionally, set the slot label interval to 4 hours
      snapDuration: '01:00:00', // Snap to 15 minutes
      // -----------------------------------------------------------------
      viewDidMount: info => {
        this._appendHeaderAndFilterFields();
        // $('button.bs-deselect-all').click(); // Deselect filter fields
        // this._setDefaultEvents();
        updateCurrentCalendarPageEventCount(info);
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
          buttonText: 'Day'
        },
        resourceTimelineDefault: {
          type: 'resourceTimeline',
          buttonText: '3 days',
          duration: { days: 3 },
          slotLabelFormat: [
            { weekday: 'long' },  // Display day of the week
            { hour: 'numeric', /* minute: '2-digit', */ meridiem: 'short' }  // Time format
          ]
        }
      },
      resourceAreaHeaderContent: arg => {
        return {
          html: `<div style="padding: 10px; width: 100%" id="main-resource-header">
            <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
            <span style="display: inline-block;"><h5><strong>Resources</strong></h5></span>
          </div>`
        }
      },
      resources: (fetchInfo, successCallback, failureCallback) => {
        successCallback(calendarResources);
      },
      resourceLabelContent: arg => {
        const resource = arg.resource.extendedProps;
        if (resource.resourceCount) {
          return {
            html: `<i class="fa-solid fa-icon-size fa-user-group"></i>
            ${resource.text}
            <span class="badge badge-danger badge-pill counter">${resource.resourceCount}</span>
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
        const event = info.event.extendedProps;
        // console.log('eventDidMount', event);
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
            this._initDropDown(info);
            this._initToolTip(info);
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
            <div style="margin-left: 5px; height: 60px;" id="${event.id}">
            <div class="card-head">
              <div class="card-name"><a href="${event.url}" target="_blank" onclick="window.open('/app/crm/calendar/event.nl?id=${event.id}', '_blank')"><strong>${event.title}</strong></a>
              </div>
            </div>
            <div class="card-content" style="position: relative">
              <div class="row">
                <div class="col-2 fc-event-status">
                  <div class="card-content-eventId" eventId="${event.id}">ID ${event.id}</div>
                  <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.priority.code};">${event.priority.text}</span>
                </div>
              </div>
            </div>
          </div>
            `;
            // console.log('eventContent', el.event)
            updateCurrentCalendarPageEventCount(el.event);
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
        info.action = 'eventDrop';
        this._confirmUpdateEvent(info);
      },
      eventDragStop: info => {
        this._removeToolTip();
      },
      // Updates start and end time and day
      // -----------------------------------------------------------------
      eventResize: info => {
        info.action = 'eventResize';
        this._confirmUpdateEvent(info);
      },
      // Ex. Dropping external events/jobs
      // -----------------------------------------------------------------
      eventReceive: info => {
        // console.log('Job dropped');
        info.action = 'eventReceive';
        this._prefillAddEvent(info);
      },
      // Disable event drop on Groups
      eventAllow: (dropInfo, draggedEvent) => {
        return !!!((dropInfo.resource.extendedProps.resourceCount));
      },
      windowResize: arg => {
        console.log('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
        this._adjustZoomLevel(arg);
        window.FullCalendar.render();
      },
      datesSet: info => {
        console.log('Page changed', info);
        this._adjustZoomLevel(info);
        initCalendarFilters(true, info);
        updateCurrentCalendarPageEventCount(info);
      }
    });

    window.FullCalendar.render();
  }

  /* static _setDefaultEvents() {
    $('#calendar-filters select.multiple-event-status-field').val(['TENTATIVE', 'CONFIRMED']);
    $('#calendar-filters select.multiple-event-status-field').change();
  } */

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

    initCalendarFilters(false);
    initAvailableJobsFilters('#calendarSection .thirdColumn');

    // updateCurrentCalendarPageEventCount();
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
    }
    if (!$('#calendar-filters').length) {
      $(`<div id="calendar-filters">
        <div class="input-group inline-inputs" style="margin-top: 10px;">
          <div class="input-group mb-3" style="border-radius: 5px 5px 0 0;">
            <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Resource Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
              ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
              ${dataSet.vendors.map(vendor => `<option value="${vendor.id}">${vendor.name}</option>`)}
            </select>
          </div>
          <div class="input-group mb-3">
            <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Resource Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
            ${dataSet.resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`)}
            <option value="vendor">Vendor Subcons</option>
            <option value="z-unassigned">Unassigned</option>
            </select>
          </div>
          <div class="input-group mb-3">
            <select class="selectpicker mx-auto multiple-event-organizer-field" title="Filter by Organizer" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
            ${dataSet.organizers.map(organizer => `<option value="${organizer.value}">${organizer.text}</option>`)}
            </select>
          </div>
        </div>
        <div class="input-group inline-inputs">
          <div class="mb-3">
            <select class="selectpicker mx-auto multiple-event-status-field" title="Filter by Status" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
              <option value="TENTATIVE">Tentative</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div class="mb-3">
            <select class="selectpicker mx-auto multiple-event-priority-field" title="Filter by Priority" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
              <option value="1">Low</option>
              <option value="2">Mid</option>
              <option value="3">High</option>
              <option value="4">Urgent</option>
            </select>
          </div>
          <div class="mb-3">
            <select class="selectpicker mx-auto multiple-event-type-field" title="Filter by Event Type" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
              <option value="1">General Event</option>
              <option value="2">Non General Event</option>
            </select>
          </div>
        </div>
      </div>`).insertAfter('.fc-header-toolbar');

      if (!$('#eventsViewCounter').length) {
        $('.fc-toolbar-title').append('<h6><span class="badge badge-danger badge-pill counter" style="display: inline-block" id="eventsViewCounter">TBD</span></h6>');
      }
    }
  }

  static _prefillAddEvent(info) {
    console.log('Event Received', info);
    this._removeToolTip();

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
    const selectedResourceIds = info.event._def.resourceIds;

    const hasConflict = Event.draggedJobHasConflictEvent(start, selectedResourceIds[0]);
    if (hasConflict) {
      Swal.fire(
        'Notice',
        `Unable to proceed due to conflict event`,
        'error'
      );
      info.revert();
      return;
    }

    data.selectedResourceIds = selectedResourceIds.filter(id => id.split('-').shift() !== 'vendor').map(id => id.split('-').pop());
    data.selectedVendorIds = selectedResourceIds.filter(id => id.split('-').shift() === 'vendor').map(id => id.split('-').pop());

    console.log('Prefill Data', data);
    openEventModal(null, woId, '', data);
    info.revert();
  }

  static _confirmUpdateEvent(info) {
    this._removeToolTip();

    const payload = {};
    payload.eventData = deepCopy(info.event.extendedProps);
    console.log('payload.eventData', payload.eventData)
    payload.eventDataSrc = dataSet.events.find(event => event.id == payload.eventData.id) || {};
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.eventData.date.start = startSplit[0];
    payload.eventData.time.start = startSplit[1];
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.eventData.date.end = endSplit[0];
    payload.eventData.time.end = endSplit[1];
    payload.eventData.priority = payload.eventData.priority.value;
    payload.eventData.status = payload.eventData.status.value;

    if (info.action == 'eventDrop') {
      console.log('Event Drop info', info);

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

            let resourceType, resourceKey;
            if (info.newResource.extendedProps.employee) {
              resourceType = 'employee';
              resourceKey = 'resources';
            } else {
              resourceType = 'vendor';
              resourceKey = 'vendors';
            }

            const elementId = info.newResource._resource.id;
            const resourceId = elementId.split('-').pop();
            let foundObj, allowEvent = false;

            if (resourceType === 'employee') {
              foundObj = payload.eventData.resources.find(resource => resource.employee.value == resourceId);
              const hasConflict = Event.draggedResourceHasConflictEvent(payload.eventData, resourceId);
              allowEvent = !!!foundObj && !hasConflict;
            } else if (resourceType === 'vendor') {
              foundObj = payload.eventData.vendors.find(vendor => vendor.vendor.value == resourceId);
              allowEvent = !!!foundObj;
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
                  const index = payload.eventData.selectedResources.map(resource => resource.employee.value).indexOf(info.oldResource.extendedProps.employee.value);
                  if (index > -1) {
                    payload.eventData.selectedResources.splice(index, 1); // Removed resource
                  }
                }

              } else if (resourceKey === 'vendors') {
                let unassignedVendors = deepCopy(dataSet.vendors).filter(vendor => !!!payload.eventData.vendors.map(vendor => vendor.vendor.value).includes(vendor.id));
                unassignedVendors = [...payload.eventData.vendors, ...unassignedVendors];
                const vendorsToUse = unassignedVendors;

                payload.eventData.selectedVendors = vendorsToUse.filter(vendor => resourceId == vendor.id);
                payload.eventData.selectedVendors = [...payload.eventData.vendors, ...payload.eventData.selectedVendors];
                if (info.oldResource) {
                  const index = payload.eventData.selectedVendors.map(vendor => vendor.vendor.value).indexOf(info.oldResource.extendedProps.vendor.value);
                  if (index > -1) {
                    payload.eventData.selectedVendors.splice(index, 1); // Removed vendor
                  }
                }
              }
            } else {
              Swal.fire(
                'Notice',
                `Unable to proceed due to conflict event`,
                'error'
              );
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
          woId: el.getAttribute('id')
        };
      }
    });
  }

  static _initDropDown(info) {
    const eventId = info.event.id;
    const event = dataSet.events.find(event => event.id == eventId);

    const html = `<div class="card-header-options"><div class="dropdown" style="display:inline-block">
      <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
      <div class="dropdown-content">
        ${(!event.workorder.value) ? `<a href="#" onclick="openGeneralEventModal(${eventId})">Update Event</a>` : `<a href="#" onclick="openEventModal('', '', ${eventId})">Update Event</a>`}
        <a href="#" onclick="openCompleteEventModal('', ${eventId})">Complete Event</a>
        <a href="#" onclick="deleteEventRecord('', ${eventId})">Remove Event</a>
      </div>
    </div></div>`;

    const el = info.el.querySelector('div.card-name');
    el.insertAdjacentHTML('afterend', html);
  }

  static _initToolTip(info) {
    const event = info.event.extendedProps;
    new bootstrap.Tooltip(info.el, {
      html: true,
      title: `
        <strong>${event.title}</strong><br>
        ID ${event.id}<br/>
        ${event.workorder.text}<br/>
        ${event.date.start == event.date.end ? moment(event.date.start).format('M/D/YYYY') : `${moment(event.date.start).format('M/D/YYYY')} - ${moment(event.date.end).format('M/D/YYYY')}`}<br/>
        ${moment(`1/1/1999 ${event.time.start}`).format('h:mm a')} - ${moment(`1/1/1999 ${event.time.end}`).format('h:mm a')}<br/>
        <br/>
        Resources:<br/>
        ${event.resources.map((resource, counter) => `${+counter + 1}. ${resource.employee.text}`).join('<br/>')}<br/>
        ${event.vendors.map((vendor, counter) => `${event.resources.length + counter + 1}. ${vendor.vendor.text || vendor.name}`).join('<br/>')}
        `,
      placement: 'left'
    });
  }

  static _removeToolTip() {
    $('.tooltip').remove();
  }
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}