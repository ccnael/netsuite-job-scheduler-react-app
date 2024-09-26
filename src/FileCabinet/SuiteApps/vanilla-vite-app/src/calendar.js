import { Calendar as FullCalendar } from '@fullcalendar/core';
import adaptivePlugin from '@fullcalendar/adaptive';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { customers, resources, resourceGroups, workOrders, events } from './components/dataSet';
import { initCalendarFilters, initAvailableJobsFilters } from './components/filterHandler';
import { Event } from './components/utils';
import './calendar.css';

const resourceCount = resources.all.length;
const resourceOptions = resources.all.map(resource => `<option value="${resource.employee.value}">${resource.employee.text}</option>`);
const resourceGroupOptions = resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`);

export default class Calendar {
  
  static setup() {
    $('#app').append(`
    <div class="tab-content" id="calendarSection">
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
                  <span class="badge badge-danger badge-pill counter">${workOrders.length}</span>
                </div>
                <div id="col2_2-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="col2_2-filter-tableHeading">
                      <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#col2_2-filter-table" aria-expanded="false" aria-controls="col2_2-filter-table">
                        <i class="fa fa-filter"></i>
                        <strong class="grid-header">&nbsp;Filters</strong>
                      </button>
                    </h2>
                    <div id="col2_2-filter-table" class="accordion-collapse collapse" aria-labelledby="col2_2-filter-tableHeading" data-parent="#col2_2-filter-tableWrapper">
                      <div class="input-group inline-inputs" style="margin-top: 10px; margin-left: 10px;">
                        <div class="mb-3 row align-items-center">
                          <label for="calendar-job-datefrom" class="col-form-label col-auto">From: </label>
                          <div class="col-auto">
                              <input type="date" class="form-control" id="calendar-job-datefrom">
                          </div>
                        </div>
                        <div class="mb-3 row align-items-center">
                          <label for="calendar-job-dateto" class="col-form-label col-auto">To: </label>
                          <div class="col-auto">
                              <input type="date" class="form-control" id="calendar-job-dateto">
                          </div>
                        </div>
                      </div>
                      <div class="input-group inline-inputs">
                        <div class="input-group mb-3" style="border-radius: 5px 5px 0 0; margin-left: 10px;">
                          <select class="selectpicker mx-auto multiple-customer-field" title="Filter by Customer" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                            ${customers.map(customer => `<option value="${customer.value}">${customer.text}</option>`)}
                          </select>
                        </div>
                        <div class="mb-3" style="border-radius: 5px 5px 0 0; margin-left: 10px;">
                          <input type="text" class="form-control" id="woTitle" placeholder="Enter Work Order Title">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collapsible-list overflow-auto" style="height: 100%; overflow: scroll">
                  <div class="card-wrapper">
                    ${workOrders.map(wo => `
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
    .replace(/,/g, ''));

    this._initFullCalendarIO();
    this._initLayoutHandlers();
  }

  static _initFullCalendarIO() {
    
    const containerEl = document.querySelector('#calendarSection .thirdColumn');
    const calendarEl = document.getElementById('calendar');

    const calendarResources = resourceGroups.map(resourceGroup => ({
      id: resourceGroup.value,
      title: resourceGroup.text,
      children: resourceGroup.resources.map(resource => ({
        id: resource.employee.value,
        title: resource.employee.text,
        extendedProps: resource
      })),
      extendedProps: resourceGroup
    }))

    // Remap calendar events data
    // -----------------------------------------------------------------
    const calendarEvents = events.map(event => {
      const map = {};
      map.id = event.id;
      map.title = event.title;
      map.start = `${event.date.start}T${event.time.start}`;
      map.end = `${event.date.end}T${event.time.end}`;
      map.url = event.url;
      map.className = 'event-class-style-name';
      map.className += (event.status.value === 'TENTATIVE' ? ' tentative' : ' confirmed');
      map.resourceIds = event.resources.map(resource => resource.employee.value);
      map.extendedProps = JSON.parse(JSON.stringify(event));
      return map;
    });
    
    // Instantiate draggable external events
    // -----------------------------------------------------------------
    new Draggable(containerEl, {
      itemSelector: '.card-item',
      eventData: el => {
        return {
          title: el.innerText,
          woId: el.getAttribute('id')
        };
      }
    });
    
    // Instantiate calendar
    // -----------------------------------------------------------------
    window.FullCalendar = new FullCalendar(calendarEl, {
      plugins: [ adaptivePlugin, interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin ],
      schedulerLicenseKey: 'XXX',
      nowIndicator: true,
      editable: true,
      droppable: true, // Allow external events to be dropped
      aspectRatio: 1,
      eventDurationEditable: true,
      eventResizableFromStart: true,
      // eventColor: '#02ac5a', // Default color class -> .confirmed
      scrollTime: '00:00', // Undo default 6am scrollTime
      // Add legend and filter fields
      // -----------------------------------------------------------------
      viewDidMount: info => {
        console.log('viewDidMount')
        this._appendHeaderFields();
      },
      headerToolbar: {
        left: 'todayBtn prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineDefault,resourceTimelineWeek,resourceTimelineMonth,listWeek createEventBtn'
      },
      // Resource etc settings
      // -----------------------------------------------------------------
      initialView: 'resourceTimelineDefault',
      resourceAreaWidth: '20%',
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
      // Set slot duration to 4 hours
      slotDuration: '04:00:00',
      // Optionally, set the slot label interval to 4 hours
      slotLabelInterval: '04:00',
      resourceAreaHeaderContent: arg => {
        return {
          html: `<div style="padding: 10px; width: 100%" id="main-resource-header">
            <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
            <span style="display: inline-block;"><h5><strong>Resources</strong></h5></span>
            <span class="badge badge-danger badge-pill counter">${resources.all.length}</span>
          </div>`
        }
      },
      resources: calendarResources,
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
          return resource.employee.text;
        }
      },
      events: calendarEvents,
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
        if (event.id) {
          try {
            info.el.classList.add(event.status.value === 'TENTATIVE' ? 'tentative' : 'confirmed');
  
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
            <div style="margin-left: 15px; height: 110px" id="${event.id}">
            <div class="card-head">
              <div class="card-name"><a href="${event.url}" target="_blank"><strong>${event.title}</strong></a>
              </div>
            </div>
            <div class="card-content" style="position: relative">
              <div class="card-content-eventId" eventId="${event.id}">ID ${event.id}</div>
              <div class="card-content-date">${event.date.start == event.date.end ? moment(event.date.start).format('M/D/YYYY') : `${moment(event.date.start).format('M/D/YYYY')} - ${moment(event.date.end).format('M/D/YYYY')}`}</div>
              <div class="card-content-time">${moment(`1/1/1999 ${event.time.start}`).format('h:mm a')} - ${moment(`1/1/1999 ${event.time.end}`).format('h:mm a')}</div>
              <div class="row">
                <div class="col-2 fc-event-status">
                  <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.priority.code};">${event.priority.text}</span>
                </div>
              </div>
            </div>
          </div>
            `;
            this._updateEventCounter();
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
        info.action = 'eventReceive';
        this._prefillAddEvent(info);
      },
      // Disable event drop on Groups
      eventAllow: (dropInfo, draggedEvent) => {
        return !Boolean((dropInfo.resource.extendedProps.resourceCount));
      },
      windowResize: arg => {
        console.log('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
        window.FullCalendar.render();
      }
    });
  
    window.FullCalendar.render();
  }

  // Instantiate tab header switch, column resizer etc.
  // -----------------------------------------------------------------
  static _initLayoutHandlers() {
    this._initTabSwitch();

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

    initAvailableJobsFilters('#calendarSection #collapseRight', workOrders);
    initCalendarFilters(resources, resourceGroups);

    this._updateEventCounter();
  }

  // Instantiate tab switch
  // -----------------------------------------------------------------
  static _initTabSwitch() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    document.getElementById('calendarSection').style.display = 'none';
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-target');
        // Remove active class from all tabs and content
        tabs.forEach(item => item.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
  
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
  
        if (tabId == 'boardSection') {
          document.getElementById(tabId).style.display = 'block';
          document.getElementById('calendarSection').style.display = 'none';
        } else {
          document.getElementById(tabId).style.display = 'block';
          document.getElementById('boardSection').style.display = 'none';
        }
      });
    });
  }

  static _appendHeaderFields() {
    if (!$('#legend').length) {
      const legendHTML = `
      <div id="legend">
        <span class="confirmed"></span> Confirmed
        <span class="tentative"></span> Tentative
      </div>`;
      $(legendHTML).insertAfter('.fc-toolbar-title');
    }
    if (!$('#calendar-filters').length) {
      $(`<div id="calendar-filters">
        <div class="input-group inline-inputs" style="margin-top: 10px;">
          <div class="input-group mb-3" style="border-radius: 5px 5px 0 0;">
            <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Resource Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
              ${resourceOptions}
            </select>
          </div>
          <div class="input-group mb-3">
            <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Resource Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
            ${resourceGroupOptions}
            </select>
          </div>
          <div class="mb-3">
            <select class="selectpicker mx-auto multiple-event-status-field" title="Filter by Status" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" multiple>
              <option value="TENTATIVE">Tentative</option>
              <option value="CONFIRMED">Confirmed</option>
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
        </div>
        <div class="input-group inline-inputs" style="margin-top: 10px;">
         <div class="row align-items-center">
            <label for="calendar-event-datefrom" class="col-form-label col-auto">From: </label>
            <div class="col-auto">
                <input type="date" class="form-control" id="calendar-event-datefrom">
            </div>
          </div>
          <div class="row align-items-center">
            <label for="calendar-event-dateto" class="col-form-label col-auto">To: </label>
            <div class="col-auto">
                <input type="date" class="form-control" id="calendar-event-dateto">
            </div>
          </div>
        </div>
      </div>`).insertAfter('.fc-header-toolbar');

      if (!$('#eventsViewCounter').length) {
        // $('.fc-toolbar-title').append('<h6><span class="badge badge-danger badge-pill counter" style="display: inline-block" id="eventsViewCounter">TBD</span></h6>');
      }

      this._updateEventCounter();
    }
  }

  // TBD
  static _updateEventCounter() {
    // setTimeout(() => {
    //   const $eventIds = Array.from($('div.fc-event-main .card-content-eventId')).map(m => m.getAttribute('eventid'));
    //   const counter = Array.from(new Set($eventIds)).length;
    //   console.log('Current View Events Count: ', counter);

    //   $('#eventsViewCounter').text(counter);
    // });
        // // Get the current view
        // const currentView = FullCalendar.view;
        // const start = currentView.currentStart; // Start date of the current view
        // const end = currentView.currentEnd; // End date of the current view
    
        // // Filter events manually
        // const currentEvents = calendar.getEvents().filter(event => {
        //     if (event.id == 100786) {
        //         console.log(event.end, ' isBetween, ', start, end, ' = ', moment(event.start).isBetween(start, end, null, '[]'))
        //     }
        //     // Check if the event is in the current view's date range
        //     return moment(event.end).isBetween(start, end, null, '[]') ||  (moment(start).isBetween(event.start, event.end, null, '[]') && moment(end).isBetween(event.start, event.end, null, '[]'))
        // });
    
        // // Get the count of the filtered events
        // const count = currentEvents.length;
    
        // // Log and display the count
        // // console.log('Current event count in view:', count);
  }

  static _prefillAddEvent(info) {
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

    openEventModal(null, woId, '', data);
    info.revert();
  }

  static _confirmUpdateEvent(info) {
    this._removeToolTip();

    const payload = {};
    payload.eventData = JSON.parse(JSON.stringify(info.event.extendedProps));
    payload.eventDataSrc = events.find(event => event.id == payload.eventData.id) || {};
    const startSplit = moment(info.event.startStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.eventData.date.start = startSplit[0];
    payload.eventData.time.start = startSplit[1];
    const endSplit = moment(info.event.endStr).format('YYYY-MM-DDTHH:mm').split('T');
    payload.eventData.date.end = endSplit[0];
    payload.eventData.time.end = endSplit[1];

    if (info.action == 'eventDrop') {
      const calEvents = window.FullCalendar.getEvents();
      if (calEvents.length) {
        const calEvent = calEvents.find(event => event.id == info.event.id);
        if (calEvent) {
          const resourceIds = calEvent._def.resourceIds;
          payload.eventData.selectedResources = resources.active.filter(resource => Boolean(resourceIds.includes(resource.employee.value)));
        }
      }
    }

    console.log('NEW PAYLOAD', payload, info);
    Event.updateEventRecord(payload, info);
  }

  static _initDropDown(info) {
    const event = info.event;
    const html = `<div class="card-header-options"><div class="dropdown" style="display:inline-block">
      <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
      <div class="dropdown-content">
        <a href="#" onclick="openEventModal('', '', ${event.id})">Update Event</a>
        <a href="#" onclick="openCompleteEventModal('', ${event.id})">Complete Event</a>
        <a href="#" onclick="deleteEventRecord('', ${event.id})">Remove Event</a>
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
        ${moment(`1/1/1999 ${event.time.start}`).format('h:mm a')} - ${moment(`1/1/1999 ${event.time.end}`).format('h:mm a')}`,
      placement: 'left'
    });
  }

  static _removeToolTip() {
    $('.tooltip').remove();
  }
}