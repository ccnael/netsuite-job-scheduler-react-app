import { Board, Event } from './components/utils';
import { customers, resources, resourceGroups, workOrders, events } from './components/dataSet';
import './board.css';

const resourceCount = resources.all.length;
const resourceOptions = resources.all.map(resource => `<option value="${resource.employee.value}">${resource.employee.text}</option>`);
const resourceGroupOptions = resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`);

document.querySelector('#app').innerHTML = `
  <div id="container">
    <header class="header">
      <ul class="nav nav-tabs" id="section-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="board-tab" data-toggle="tab" href="#boardSection" role="tab" aria-controls="boardSection" aria-selected="true">Board</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="calendar-tab" data-toggle="tab" href="#calendarSection" role="tab" aria-controls="calendarSection" aria-selected="false">Calendar</a>
        </li>
      </ul>
    </header>
    <div class="tab-content" id="tabSections">
      <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab" id="boardSection">
        <div class="main-container">
          <!-- Collapsible First Column -->
          <aside class="sidebar" id="leftSidebar">
            <div class="collapse-content" id="collapseLeft">
              <div style="padding: 10px" class="card-header header">
                <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
                <span style="display: inline-block;"><h5><strong>Resources</strong></h5></span>
                <span class="badge badge-danger badge-pill counter">${resourceCount}</span>
              </div>
              <div id="col1-filter-tableWrapper" class="accordion accordion-flush">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="col1-filter-tableHeading">
                    <button class="accordion-button" type="button" data-toggle="collapse" data-target="#col1-filter-table" aria-expanded="true" aria-controls="col1-filter-table">
                      <i class="fa fa-filter"></i>
                      <strong class="grid-header">&nbsp;Filters</strong>
                    </button>
                  </h2>
                  <div id="col1-filter-table" class="accordion-collapse collapse show" aria-labelledby="col1-filter-tableHeading" data-parent="#col1-filter-tableWrapper">
                    <div class="input-group" style=" margin-top: 10px;">
                      <div class="input-group mb-3" style="border-radius: 5px 5px 0 0;">
                        <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                          ${resourceOptions}
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                        ${resourceGroupOptions}
                        </select>
                      </div>
                      <div class="input-group mb-3">
                        <select class="selectpicker mx-auto multiple-status-field" title="Filter by Status" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                          <option value="1">Available</option>
                          <option value="0">Unavailable</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="collapsible-list overflow-auto" style="height: 100%; overflow: scroll">
              ${resourceGroups.map(resourceGroup => `
                <div id="resourceGroup-${resourceGroup.value}-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="resourceGroup-${resourceGroup.value}-filter-tableHeading">
                      <button class="accordion-button" type="button" data-toggle="collapse" data-target="#resourceGroup-${resourceGroup.value}-filter-table" aria-expanded="true" aria-controls="resourceGroup-${resourceGroup.value}-filter-table">
                        <i class="fa-solid fa-icon-size fa-user-group"></i>
                        <strong class="grid-header">&nbsp;${resourceGroup.text}&nbsp;</strong>
                        <span class="badge badge-danger badge-pill counter">${resourceGroup.resourceCount}</span>
                      </button>
                    </h2>
                    <div id="resourceGroup-${resourceGroup.value}-filter-table" class="accordion-collapse collapse show" aria-labelledby="resourceGroup-${resourceGroup.value}-filter-tableHeading" data-parent="#resourceGroup-${resourceGroup.value}-filter-tableWrapper">
                      ${resourceGroup.resources.map(resource => `
                      <div class="person-container" id="${resource.employee.value}">
                        <div class="person-circle">
                            <span class="initials">${resource.initials}</span>
                            ${Boolean(resource.active) ? '<span class="status active"></span>' : '<span class="status busy"></span>'}
                        </div>
                        <div class="person-info">
                            <span class="full-name">${resource.employee.text}</span>
                            ${Boolean(resource.active) ? '<span class="status-text">Available</span>' : '<span class="status-text">Not Available</span>'}
                        </div>
                      </div>`)}
                    </div>
                  </div>
                </div>`
              )}
            </div>
          </aside>
          <div class="collapse-btn">
            <i id="toggleLeft" class="fa-solid fa-square-caret-left"></i>
          </div>
          <div class="grid-container">
            <!-- Resizable Second Column -->
            <div class="column resizable" id="secondColumn">
              <div class="content">
                <div class="card-header header">
                  <div style="text-align: center;">
                    <i class="fa-solid fa-screwdriver-wrench" style="font-size: 16px"></i>
                    <span style="display: inline-block; margin-left: 5px"><h5><strong>Available Jobs</strong></h5></span>&nbsp;
                    <span class="badge badge-danger badge-pill counter">${workOrders.length}</span>
                  </div>
                </div>
                <div id="col2-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="col2-filter-tableHeading">
                      <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#col2-filter-table" aria-expanded="false" aria-controls="col2-filter-table">
                        <i class="fa fa-filter"></i>
                        <strong class="grid-header">&nbsp;Filters</strong>
                      </button>
                    </h2>
                    <div id="col2-filter-table" class="accordion-collapse collapse" aria-labelledby="col2-filter-tableHeading" data-parent="#col2-filter-tableWrapper">
                      <div class="input-group inline-inputs" style="margin-top: 10px; margin-left: 10px;">
                        <div class="mb-3 row align-items-center">
                          <label for="job-datefrom" class="col-form-label col-auto">From: </label>
                          <div class="col-auto">
                              <input type="date" class="form-control" id="job-datefrom">
                          </div>
                        </div>
                        <div class="mb-3 row align-items-center">
                          <label for="job-dateto" class="col-form-label col-auto">To: </label>
                          <div class="col-auto">
                              <input type="date" class="form-control" id="job-dateto">
                          </div>
                        </div>
                      </div>
                      <div class="input-group inline-inputs">
                        <div class="input-group mb-3" style="border-radius: 5px 5px 0 0; margin-left: 10px;">
                          <select class="selectpicker mx-auto multiple-customer-field" title="Filter by Customer" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
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
                <div class="card-wrapper">
                  ${workOrders.map(wo => `
                    <div class="card-item" id="${wo.id}" draggable="true" ondragstart="dragFunctions(event);" ondragend="dragFunctions(event);" draggable="true">
                      <div class="card-head">
                        <a href="${wo.woUrl}" target="_blank"><strong>${wo.name}</strong></a>
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
                        <div class="card-content-so"><a href="${wo.soUrl}" target="_blank">${wo.salesorder.text}</a></div>
                        <div class="card-content-project"><a href="${wo.projectUrl}" target="_blank">${wo.project.text}</a></div>
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

            <!-- Resizer Between Second and Third Columns -->
            <div class="resizer" id="columnResizer"></div>

            <!-- Resizable Third Column -->
            <div class="column resizable" id="thirdColumn" ondragenter="dragFunctions(event);" ondragover="dragFunctions(event);" ondrop="dragFunctions(event);" ondragleave="dragFunctions(event);">
              <div class="content">
                <div class="card-header header">
                  <div style="text-align: center;">
                    <i class="fa-regular fa-icon-size fa-calendar-check" style="font-size: 18px;"></i>
                    <span style="display: inline-block; margin-left: 5px"><h5><strong>Events</strong></h5></span>
                    <span class="badge badge-danger badge-pill counter">${events.length}</span>
                  </div>
                </div>
                <div id="col3-filter-tableWrapper" class="accordion accordion-flush">
                  <div class="accordion-item">
                      <h2 class="accordion-header" id="col3-filter-tableHeading">
                        <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#col3-filter-table" aria-expanded="false" aria-controls="col3-filter-table">
                          <i class="fa fa-filter"></i>
                          <strong class="grid-header">&nbsp;Filters</strong>
                        </button>
                      </h2>
                      <div id="col3-filter-table" class="accordion-collapse collapse" aria-labelledby="col3-filter-tableHeading" data-parent="#col3-filter-tableWrapper">
                        <div class="input-group inline-inputs" style="margin-top: 10px; margin-left: 10px;">
                          <div class="row align-items-center">
                            <label for="event-datefrom" class="col-form-label col-auto">From: </label>
                            <div class="col-auto">
                                <input type="date" class="form-control" id="event-datefrom">
                            </div>
                          </div>
                          <div class="row align-items-center">
                            <label for="event-dateto" class="col-form-label col-auto">To: </label>
                            <div class="col-auto">
                                <input type="date" class="form-control" id="event-dateto">
                            </div>
                          </div>
                        </div>
                        <div class="input-group inline-inputs" style="margin-top: 10px;">
                          <div class="input-group mb-3" style="border-radius: 5px 5px 0 0;">
                            <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Resource Name" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                              ${resourceOptions}
                            </select>
                          </div>
                          <div class="input-group mb-3">
                            <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Resource Group" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                            ${resourceGroupOptions}
                            </select>
                          </div>
                        </div>
                        <div class="input-group inline-inputs">
                          <div class="mb-3">
                            <select class="selectpicker mx-auto multiple-event-status-field" title="Filter by Status" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" multiple>
                              <option value="TENTATIVE">Tentative</option>
                              <option value="CONFIRMED">Confirmed</option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <select class="selectpicker mx-auto multiple-event-priority-field" title="Filter by Priority" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                              <option value="1">Low</option>
                              <option value="2">Mid</option>
                              <option value="3">High</option>
                              <option value="4">Urgent</option>
                            </select>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="secondary-row">
                  <button class="btn btn-primary button-add" onclick="openGeneralEventForm(event)">
                    <i class="fa-regular fa-icon-size fa-plus-square"></i> New
                  </button>
                  <!-- <button class="btn btn-primary button-submit" onclick="submitEvents(event)">
                    <i class="fa-solid fa-file-export"></i> Submit -->
                  </button>
                </div>
                <div class="card-wrapper">
                  ${events.map(event => `
                    <div class="card-item" id="${event.id}">
                      <div class="card-head">
                        <div class="card-name"><a href="${event.url}" target="_blank"><strong>${event.title}</strong></a></div>
                        <div class="card-header-options">
                          <div class="dropdown">
                            <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
                            <div class="dropdown-content">
                              <a href="#" onclick="openEventForm(event)">Update Event</a>
                              <a href="#" onclick="openCompleteEventForm(event)">Complete Event</a>
                              <a href="#" onclick="deleteEventRecord(event)">Remove Event</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-content">
                        <div class="card-content-eventId" eventId="${event.id}">ID ${event.id}</div>
                        <div class="card-content-woText">${event.workorder.text}</div>
                        <div class="card-content-date">${event.date.start == event.date.end ? event.date.start : `${event.date.start} - ${event.date.end}`}</div>
                        <div class="card-content-time">${event.time.start} - ${event.time.end}</div>
                        <div class="row">
                          <div class="col-2 fc-event-status">
                            <span class="badge py-1 px-2 ${event.status.code} rounded-pill text-uppercase">${event.status.text}</span>
                            <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.priority.code};">${event.priority.text}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  `)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`.replace(/,/g, '');

document.addEventListener("DOMContentLoaded", function(event) {
  Board.showBanners();
  Board.initLayoutHandlers();
  Event.MainForm().initialize();
  Event.GeneralEventForm().initialize();
  Event.CompleteEventForm().initialize();

  window.holdWorkOrder = Board.holdWorkOrder;
  window.printWorkOrder = Board.printWorkOrder;
  window.cancelWorkOrder = Board.cancelWorkOrder;
  window.printPickList = Board.printPickList;
  window.deleteEventRecord = Event.deleteEventRecord;

  // *************** Drag WO > Events ***************

  window.dragFunctions = ev => {
    switch (ev.type) {
      case 'dragstart':
        thirdColumn.style.border = '5px dashed #26CC4E';
        const el = ev.target.closest('.card-item');
        const woId = el.querySelector('.card-content-woId')?.getAttribute('woId');
        ev.dataTransfer.setData('text/plain', woId);
        return;

      case 'drop':
        openEventForm(ev);
        break;

      case 'dragend':
        thirdColumn.style.border = '';
        break;

      default:
        // console.log('Skip Reading Event.');
        break;
    }
    ev.stopPropagation();
    ev.preventDefault();
  }

  window.openEventForm = ev => {
    const dataTransfer = ev.dataTransfer;
    let woId, eventId;
    if (dataTransfer) {
      woId = dataTransfer.getData('text');
      $('#eventModal').attr('mode', 'create');
      $('#eventModal').attr('woId', woId);
    } else {
      eventId = ev.target.closest('.card-item').getAttribute('id');
      $('#eventModal').attr('mode', 'edit');
      $('#eventModal').attr('eventId', eventId);
    }

    if (woId || eventId) {
      $('#eventModal').modal('toggle');
    }
  }

  window.openGeneralEventForm = ev => {
    $('#generalEventModal').modal('toggle');
  }

  window.openCompleteEventForm = ev => {
    const eventId = ev.target.closest('.card-item').getAttribute('id');
    console.log('openCompleteEventForm() > Event ID', eventId);
    $('#completeEventModal').attr('eventId', eventId);
    $('#completeEventModal').modal('toggle');
  }
});