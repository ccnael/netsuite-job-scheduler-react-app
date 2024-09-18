import { Calendar as FullCalendar } from '@fullcalendar/core';
import adaptivePlugin from '@fullcalendar/adaptive';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { customers, resources, resourceGroups, workOrders, events } from './components/dataSet';
import { initAvailableJobsFilters } from './components/filterHandler';
import './calendar.css';

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
    </div>
    <!-- Popup Element -->
    <div id="eventPopup" class="popup" style="display: none;">
      <div class="popup-content">
        <p>Event Details</p>
        <button id="closePopup">Close</button>
      </div>
    </div>`
    .replace(/,/g, ''));

    this.initFullCalendarIO();
    this.initLayoutHandlers();
  }

  static initFullCalendarIO() {
    
    const calendarResources = resourceGroups.map(resourceGroup => ({
      id: resourceGroup.value,
      title: resourceGroup.text,
      children: resourceGroup.resources.map(resource => ({
        id: resource.employee.value,
        title: resource.employee.text
      }))
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
      map.color = `#${Math.floor(Math.random()*16777215).toString(16)}`; // TBD
      map.className = 'event-class-style-name';
      map.resourceIds = event.resources.map(resource => resource.employee.value);
      map.extendedProps = JSON.parse(JSON.stringify(event));
      return map;
    });

    console.log('CALENDAR DATA', { calendarResources, calendarEvents });

    const calendarEl = document.getElementById('calendar');
    const containerEl = document.querySelector('#calendarSection .thirdColumn');
    
    // Initialize the external events
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
    const eventPopup = document.getElementById('eventPopup');
    const closePopupBtn = document.getElementById('closePopup');
    let popperInstance = null;

    window.FullCalendar = new FullCalendar(calendarEl, {
      plugins: [ adaptivePlugin, interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin ],
      schedulerLicenseKey: 'XXX',
      nowIndicator: true,
      editable: true, // enable draggable events
      droppable: true, // Allow external events to be dropped
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      headerToolbar: {
        left: 'todayBtn prev,next',
        center: 'title',
        // right: 'resourceTimelineDay,resourceTimelineSevenDays,timeGridWeek,dayGridMonth,listWeek'
        right: 'resourceTimelineDay,resourceTimelineSevenDays,resourceTimelineWeek,resourceTimelineMonth,listWeek createEventBtn'
      },
      initialView: 'resourceTimelineSevenDays',
      views: {
        resourceTimelineDay: {
          buttonText: 'Day'
        },
        resourceTimelineSevenDays: {
          type: 'resourceTimeline',
          duration: { days: 7 },
          buttonText: '7 days'
        }
      },
      resourceAreaHeaderContent: 'Resources',
      resources: calendarResources,
      events: calendarEvents,
      customButtons: {
        todayBtn: {
          text: 'Today',
          click: () => {
            const currentDate = new Date();  // Get the current date
            window.FullCalendar.changeView('resourceTimelineDay'); // Switch to resourceTimelineDay view
            window.FullCalendar.gotoDate(currentDate); // Set the calendar to the current date
          }
        },
        createEventBtn: {
          text: 'New Event',
          click: () => {
            openGeneralEventModal();
          }
        }
      },
      eventClick: event => {
        // if (event.event.url) {
        //   event.jsEvent.preventDefault();
        //   window.open(event.event.url, "_blank");
        // }
        // Show popup when event is clicked
        eventPopup.style.display = 'block';

        // Create a new Popper instance
        popperInstance = Popper.createPopper(info.el, eventPopup, {
          placement: 'top',
        });

        // Update content based on the event
        eventPopup.querySelector('.popup-content p').textContent = `Event: ${info.event.title}`;
      },
      eventDrop: info => {
        console.log('Event dropped to new dates:', info.event.start, info.event.end);
      },
      eventResize: info => {
        console.log('Event resized to:', info.event.start, info.event.end);
      },
      eventReceive: info => {
        const woId = info.event.extendedProps.woId;
        console.log('eventReceive woId', woId);
        window.openEventModal(null, woId);

        // $('#event-modal').attr('event-id', defId);
        // toggleEventModal();
        // addEvent();
        info.event.remove();
        // return confirm('TEST?');
        // if (draggedEvent.id === '999') {
        //   return dropInfo.start < new Date(2016, 0, 1); // a boolean
        // }
        // else {
        //   return true;
        // }
      },
    });
  
    window.FullCalendar.render();

    // Close popup when close button is clicked
    closePopupBtn.addEventListener('click', function() {
      eventPopup.style.display = 'none';

      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    });
  }

  // Instantiate tab header switch, column resizer etc.
  // -----------------------------------------------------------------
  static initLayoutHandlers() {
    this.initTabSwitch();

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

    initAvailableJobsFilters('#calendarSection', workOrders);
  }

  // Instantiate tab switch
  // -----------------------------------------------------------------
  static initTabSwitch() {
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
          // window.FullCalendar.render();
        }
      });
    });
  }
}