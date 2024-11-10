import * as dataSet from './components/dataSet';
import { initLeftSideBarFilters, initAvailableJobsFilters, initEventFilters } from './components/filterHandler';
import { Event } from './components/utils';
import './board.css';

export default class Board {

  static setup() {
    $(`<div id="container">
        <div id="tabSections">
          <div class="tab-content active" id="boardSection">
            <div class="main-container">
              <!-- Collapsible First Column -->
              <aside class="sidebar leftSidebar">
                <div class="collapse-content collapseLeft">
                  <div style="padding: 10px; margin-top: 20px" class="card-header header">
                    <i class="fa-solid fa-icon-size fa-users-gear" style="font-size: 14px; margin-right: 5px"></i>
                    <span style="display: inline-block;"><h5><strong>Resources</strong></h5></span>
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
                            <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                              ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
                              ${dataSet.vendors.map(vendor => `<option value="${vendor.id}">${vendor.name}</option>`)}
                            </select>
                          </div>
                          <div class="input-group mb-3">
                            <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                            ${dataSet.resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`)}
                            <option value="vendor">Vendor Subcontractors</option>
                            </select>
                          </div>
                          <div class="input-group mb-3">
                            <select class="selectpicker mx-auto multiple-status-field" title="Filter by Status" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collapsible-list overflow-auto" style="height: 100%; overflow: scroll">
                  ${dataSet.resourceGroups.map(resourceGroup => `
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
                          <div class="person-container" resourceType="employee" id="${resourceGroup.value}-${resource.id}">
                            <div draggable=${!!(resource.active) ? "true" : "false"} ondragstart="dragResourceFunctions(event);" ondragend="dragResourceFunctions(event);" class="person-circle cursor-grab" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="right" 
                                  title="<strong>${resource.name}</strong><br/>
                                    Types: ${resource.types.map(type => type.text).join('/')}<br/>
                                    Groups: ${resource.resourceGroups.map(_resourceGroup => _resourceGroup.text).join('/')}<br/>
                                    Email: ${resource.email}<br/>
                                    Phone: ${resource.phone}<br/>
                                    Location: ${resource.location.text}<br/>
                                    Events: ${resource.events.length}<br/>
                                <span class="initials">${resource.initials}</span>
                                ${!!(resource.active) ? '<span class="status active"></span>' : '<span class="status busy"></span>'}
                            </div>
                            <div class="person-info">
                                <span class="full-name">${resource.name}</span>
                                ${!!(resource.active) ? '<span class="status-text">Active</span>' : '<span class="status-text">Inactive</span>'}
                            </div>
                          </div>`)}
                        </div>
                      </div>
                    </div>`
                  )}
                  ${`<div id="resourceGroup-vendor-filter-tableWrapper" class="accordion accordion-flush">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="resourceGroup-vendor-filter-tableHeading">
                          <button class="accordion-button" type="button" data-toggle="collapse" data-target="#resourceGroup-vendor-filter-table" aria-expanded="true" aria-controls="resourceGroup-vendor-filter-table">
                            <i class="fa-solid fa-icon-size fa-user-group"></i>
                            <strong class="grid-header">&nbsp;Vendor Subcontractors&nbsp;</strong>
                            <span class="badge badge-danger badge-pill counter">${dataSet.vendors.length}</span>
                          </button>
                        </h2>
                        <div id="resourceGroup-vendor-filter-table" class="accordion-collapse collapse show" aria-labelledby="resourceGroup-vendor-filter-tableHeading" data-parent="#resourceGroup-vendor-filter-tableWrapper">
                          ${dataSet.vendors.map(vendor => `
                          <div class="person-container" resourceType="vendor" id="${vendor.id}">
                            <div draggable="true" ondragstart="dragResourceFunctions(event);" ondragend="dragResourceFunctions(event);" class="person-circle cursor-grab" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="right" 
                                  title="<strong>${vendor.name}</strong><br/>
                                  URL: ${vendor.url}<br/>
                                  Email: ${vendor.email}<br/>
                                  Events: ${vendor.events.length}<br/>
                                <span class="initials">${vendor.initials}</span>
                                ${!!(vendor.active) ? '<span class="status active"></span>' : '<span class="status busy"></span>'}
                            </div>
                            <div class="person-info">
                                <span class="full-name">${vendor.name}</span>
                                ${!!(vendor.active) ? '<span class="status-text">Active</span>' : '<span class="status-text">Inactive</span>'}
                            </div>
                          </div>`)}
                        </div>
                      </div>
                    </div>`}
                </div>
              </aside>
              <div class="collapse-btn">
                <i class="fa-solid fa-angle-left toggleLeft"></i>
              </div>
              <div class="grid-container">
                <!-- Resizable Second Column -->
                <div class="column resizable secondColumn">
                  <div class="content">
                    <div class="card-header header">
                      <div style="text-align: center;">
                        <i class="fa-solid fa-screwdriver-wrench" style="font-size: 16px"></i>
                        <span style="display: inline-block; margin-left: 5px"><h5><strong>Available Jobs</strong></h5></span>&nbsp;
                        <span class="badge badge-danger badge-pill counter">${dataSet.workOrders.length}</span>
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
                          <div class="input-group inline-inputs">
                            <div class="input-group mb-3" style="border-radius: 5px 5px 0 0; margin-top: 15px; margin-left: 10px;">
                              <select class="selectpicker mx-auto multiple-customer-field" title="Filter by Customer" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                                ${dataSet.customers.map(customer => `<option value="${customer.value}">${customer.text}</option>`)}
                              </select>
                            </div>
                            <div class="mb-3" style="border-radius: 5px 5px 0 0; margin-top: 15px; margin-left: 10px;">
                              <input type="text" class="form-control" id="woTitle" placeholder="Enter Work Order Title">
                            </div>
                          </div>
                          <div class="input-group inline-inputs" style="margin-top: 10px; margin-left: 10px;">
                            <div class="mb-3 row align-items-center">
                              <label for="board-job-datefrom" class="col-form-label col-auto">From: </label>
                              <div class="col-auto">
                                  <input type="date" class="form-control" id="board-job-datefrom">
                              </div>
                            </div>
                            <div class="mb-3 row align-items-center">
                              <label for="board-job-dateto" class="col-form-label col-auto">To: </label>
                              <div class="col-auto">
                                  <input type="date" class="form-control" id="board-job-dateto">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-wrapper">
                      ${dataSet.workOrders.map(wo => `
                        <div type="workorder" class="card-item" id="${wo.id}" draggable="true" ondragstart="dragJobFunctions(event);" ondragend="dragJobFunctions(event);">
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
                <div class="resizer" id="boardColumnResizer"></div>

                <!-- Resizable Third Column -->
                <div class="column resizable thirdColumn" ondragenter="dragJobFunctions(event);" ondragover="dragJobFunctions(event);" ondrop="dragJobFunctions(event);" ondragleave="dragJobFunctions(event);">
                  <div class="content">
                    <div class="card-header header">
                      <div style="text-align: center;">
                        <i class="fa-regular fa-icon-size fa-calendar-check" style="font-size: 18px;"></i>
                        <span style="display: inline-block; margin-left: 5px"><h5><strong>Events</strong></h5></span>
                        <span class="badge badge-danger badge-pill counter">${dataSet.events/* .filter(event => event.status.value !== 'COMPLETED') */.length}</span>
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
                                <option value="vendor">Vendor Subcontractors</option>
                                <option value="unassigned">Unassigned</option>
                                </select>
                              </div>
                            </div>
                            <div class="input-group inline-inputs">
                              <div class="mb-3">
                                <select class="selectpicker mx-auto multiple-event-status-field" title="Filter by Status" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" multiple>
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
                            </div>
                            <div class="input-group inline-inputs">
                              <div class="input-group mb-3">
                                <select class="selectpicker mx-auto multiple-event-organizer-field" title="Filter by Organizer" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                                ${dataSet.organizers.map(organizer => `<option value="${organizer.value}">${organizer.text}</option>`)}
                                </select>
                              </div>
                              <div class="mb-3">
                                <select class="selectpicker mx-auto multiple-event-type-field" title="Filter by Event Type" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                                  <option value="1">General Event</option>
                                  <option value="2">Non General Event</option>
                                </select>
                              </div>
                            </div>
                            <div class="input-group inline-inputs" style="margin-left: 10px; padding-bottom: 10px">
                              <div class="row align-items-center">
                                <label for="board-event-datefrom" class="col-form-label col-auto">From: </label>
                                <div class="col-auto">
                                    <input type="date" class="form-control" id="board-event-datefrom">
                                </div>
                              </div>
                              <div class="row align-items-center">
                                <label for="board-event-dateto" class="col-form-label col-auto">To: </label>
                                <div class="col-auto">
                                    <input type="date" class="form-control" id="board-event-dateto">
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="secondary-row">
                      <button class="btn btn-primary button-add" onclick="openGeneralEventModal(event)">
                        <i class="fa-regular fa-icon-size fa-plus-square"></i> New
                      </button>
                      <!-- <button class="btn btn-primary button-submit" onclick="submitEvents(event)">
                        <i class="fa-solid fa-file-export"></i> Submit -->
                      </button>
                    </div>
                    <div class="card-wrapper">
                      ${dataSet.events.map(event => `
                        <div type="event" class="card-item" id="${event.id}" data-bs-toggle="tooltip" data-bs-placement="left" 
                        title="Resources:<br/>${(event.resources.length || event.vendors.length) ? 
                          `
                            ${event.resources.map((resource, counter) => `${+counter+1}. ${resource.employee.text}`).join('<br/>')}<br/>
                            ${event.vendors.map((vendor, counter) => `${event.resources.length+counter+1}. ${vendor.vendor.text || vendor.name}`).join('<br/>')}
                          `  
                          : '- None -'}"
                        style="${''/* event.status.value === 'COMPLETED' ? 'display: none' : 'display: initial' */}">
                          <div class="card-head">
                            <div class="card-name"><a href="${event.url}" target="_blank"><strong>${event.title}</strong></a></div>
                            <div class="card-header-options">
                              <div class="dropdown">
                                <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
                                <div class="dropdown-content">
                                  ${(!event.workorder.value) ? `<a href="#" onclick="openGeneralEventModal(${event.id})">Update Event</a>` : '<a href="#" onclick="openEventModal(event)">Update Event</a>'}
                                  <a href="#" onclick="openCompleteEventModal(event)">Complete Event</a>
                                  <a href="#" onclick="deleteEventRecord(event)">Remove Event</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="card-content">
                            <div class="card-content-eventId" eventId="${event.id}">ID ${event.id}</div>
                            <div class="card-content-woText">${!!event.workorder.text ? `<a href="${event.woRef.woUrl}" target="_blank">${event.woRef.name}</a>` : '<span class="badge py-1 px-2 rounded-pill text-uppercase general-bg">General</span>'}</div>
                            <div class="card-content-date">${event.date.start == event.date.end ? moment(event.date.start).format('M/D/YYYY') : `${moment(event.date.start).format('M/D/YYYY')} - ${moment(event.date.end).format('M/D/YYYY')}`}</div>
                            <div class="card-content-time">${moment(`1/1/1999 ${event.time.start}`).format('h:mm a')} - ${moment(`1/1/1999 ${event.time.end}`).format('h:mm a')}</div>
                            <div>Organizer: ${event.organizer.text}</div>
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
      </div>`
      .replace(/,/g, ''))
      .insertAfter('header');

    this._initLayoutHandlers();
    this._initToolTip();
    this._initResourceDragFunctionsTempSwitch();
    this._showBanners();
  }

  // Instantiate column resizer etc.
  // -----------------------------------------------------------------
  static _initLayoutHandlers() {
    const leftSidebar = document.querySelector('#boardSection .leftSidebar');
    // Resizable columns functionality
    // -----------------------------------------------------------------
    const gridContainer = document.querySelector('.grid-container');
    const baseWidth = (gridContainer.getBoundingClientRect().width * .20);
    const resizer = document.getElementById('boardColumnResizer');
    const secondColumn = document.querySelector('#boardSection .secondColumn');
    const thirdColumn = document.querySelector('#boardSection .thirdColumn');
    // Collapsible sidebar functionality
    // -----------------------------------------------------------------
    const toggleLeft = document.querySelector('#boardSection .toggleLeft');
    const collapseLeft = document.querySelector('#boardSection .collapseLeft');
    
    collapseLeft.style.display = 'block';
    leftSidebar.style.width = '18%';
    
    toggleLeft.addEventListener('click', el => {
      if (collapseLeft.style.display === 'none' || collapseLeft.style.display === '') {
        collapseLeft.style.display = 'block';
        leftSidebar.style.width = '18%'; // Adjust width as needed
        toggleLeft.classList.remove('fa-angle-right');
        toggleLeft.classList.add('fa-angle-left');
      } else {
        collapseLeft.style.display = 'none';
        leftSidebar.style.width = '0'; // Adjust width as needed
        toggleLeft.classList.remove('fa-angle-left');
        toggleLeft.classList.add('fa-angle-right');
      }
      secondColumn.style.width = '';
      thirdColumn.style.width = '';
    });
    
    let startX, startWidthSecond, startWidthThird;
    
    resizer.addEventListener('mousedown', el => {
      startX = el.clientX;
      startWidthSecond = secondColumn.getBoundingClientRect().width;
      startWidthThird = thirdColumn.getBoundingClientRect().width;
    
      document.addEventListener('mousemove', _handleMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', _handleMouseMove);
      });
    });
    
    function _handleMouseMove(el) {
      const dx = el.clientX - startX;
      const newWidthSecond = startWidthSecond + dx;
      const newWidthThird = startWidthThird - dx;
      if (newWidthSecond > baseWidth && newWidthThird > baseWidth) { // Constraints
        secondColumn.style.width = `${newWidthSecond}px`;
        thirdColumn.style.width = `${newWidthThird}px`;
      }
    }
    
    window.dragJobFunctions = ev => {
      const $thirdColumn = $('#boardSection .thirdColumn');
  
      switch (ev.type) {
        case 'dragstart':
          $thirdColumn.css('border', '5px dashed #26CC4E');
          const $el = $(ev.target).closest('.card-item');
          const woId = $el.find('.card-content-woId').attr('woId');
          ev.dataTransfer.setData('text/plain', JSON.stringify({
            type: 'workorder',
            id: woId
          }));
          return;

        case 'drop':
          const dataTransfer = ev.dataTransfer;
          const dataTransferObj = JSON.parse(dataTransfer.getData('text') || '{}');
          if (dataTransferObj?.type === 'workorder') {
            window.openEventModal(ev);
          }
          break;

        case 'dragend':
          $thirdColumn.css('border', '');
          break;
  
        default:
          // console.log('Skip Reading Event.');
          break;
      }
      ev.stopPropagation();
      ev.preventDefault();
    };
  
    window.dragResourceFunctions = ev => {
      let $el, eventId, dataTransfer, $draggedEl;
  
      switch (ev.type) {
        case 'dragstart':
          $el = $(ev.target).closest('.person-container');
          const resourceType = $el.attr('resourceType');
          const resourceId = $el.attr('id').split('-').pop();

          // ev.dataTransfer doesn't work
          localStorage.setItem('dragResourceFunctions', JSON.stringify({
            type: resourceType,
            id: resourceId,
            elementId: $el.attr('id')
          }));

          $('.thirdColumn').find('div[type*="event"]').each(function() {
            const id = this.id;
            const eventData = dataSet.events.find(event => event.id == id);
            
            let foundObj, allowEvent = false;
            if (resourceType == 'employee') {
              foundObj = eventData.resources.find(resource => resource.employee.value == resourceId);
              const hasConflict = Event.draggedResourceHasConflicEvent(eventData, resourceId);
              allowEvent = !!!foundObj && !hasConflict;
            } else if (resourceType == 'vendor') {
              foundObj = eventData.vendors.find(vendor => vendor.vendor.value == resourceId);
              allowEvent = !!!foundObj;
            }

            if (allowEvent) {
              $(this).removeClass('event-unavailable').addClass('event-available');
            } else {
              $(this).removeClass('event-available').addClass('event-unavailable');
            }
          });
          return;
        
        case 'dragenter':
          $el = $(ev.target).closest('.card-item');
          eventId = $el.attr('id');
          const eventData = dataSet.events.find(event => event.id == eventId);
          dataTransfer = JSON.parse(localStorage.getItem('dragResourceFunctions'));

          let foundObj, allowResource = false;
          if (dataTransfer.type == 'employee') {
            foundObj = eventData.resources.find(resource => resource.employee.value == dataTransfer.id);
            const hasConflict = Event.draggedResourceHasConflicEvent(eventData, dataTransfer.id);
            allowResource = !!!foundObj && !hasConflict;
          } else if (dataTransfer.type == 'vendor') {
            foundObj = eventData.vendors.find(vendor => vendor.vendor.value == dataTransfer.id);
            allowResource = !!!foundObj;
          }

          $draggedEl = $(`#${dataTransfer.elementId}`).find('.person-circle');
          if (allowResource) {
            $draggedEl.removeClass('cursor-x').addClass('cursor-plus');
          } else {
            $draggedEl.removeClass('cursor-plus').addClass('cursor-x');
          }
          break;

        case 'drop':
          $el = $(ev.target).closest('.card-item');
          eventId = $el.attr('id');
          dataTransfer = JSON.parse(localStorage.getItem('dragResourceFunctions'));

          if (!$el.hasClass('event-unavailable')) {
            if (dataTransfer.type.match(/employee|vendor/g)) {
              window.openAddResourceModal(eventId, dataTransfer);
            }
          }
          break;

        case 'dragend':
          // Set default classes
          dataTransfer = JSON.parse(localStorage.getItem('dragResourceFunctions'));
          $draggedEl = $(`#${dataTransfer.elementId}`).find('.person-circle');
          if (!$draggedEl.hasClass('cursor-grab')) {
            $draggedEl.addClass('cursor-grab');
          }
          $draggedEl.removeClass('cursor-plus cursor-x');

          $('.thirdColumn').find('div[type*="event"]').each(function() {
            $(this).removeClass('event-available event-unavailable');
          });
          break;

        default:
          break;
      }
      ev.stopPropagation();
      ev.preventDefault();
    };
  
    initLeftSideBarFilters('#boardSection');
    initAvailableJobsFilters('#boardSection .secondColumn');
    initEventFilters('#boardSection');
  }

  static _showBanners() {
    setTimeout(() => {

      const toasties = [
        /* {
          text: 'TBD Resource Info, Schedules & Allocation View on click..',
          duration: 99999,
          close: true,
          gravity: 'bottom',
          position: 'left',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        },
        {
          text: 'TBD Resource Info, Schedules & Allocation View on click..',
          duration: 99999,
          close: true,
          gravity: 'bottom',
          position: 'left',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        }, */
        /* {
          text: 'Under Construction...',
          duration: 99999,
          close: true,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        }, */
        {
          text: 'Drag Available Jobs to Events Column',
          duration: 99999,
          close: true,
          gravity: 'top',
          position: 'center',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        }
      ];
      
      toasties.map(toast => Toastify(toast).showToast());
    }, 250);
  }

  static _initToolTip() {
    $('[data-bs-toggle="tooltip"]').each(function() {
      new bootstrap.Tooltip(this, {
          html: true
      });
    });
  }

  // This prevents conflict dropping conflict with the job items drag and drop
  static _initResourceDragFunctionsTempSwitch() {
    $('.person-circle').on('dragstart', function(event) {
      $('.thirdColumn').find('div[type*="event"]').on('dragenter dragover drop dragleave', dragResourceFunctions);
    });
    $('.person-circle').on('dragend', function(event) {
      $('.thirdColumn').find('div[type*="event"]').off('dragenter dragover drop dragleave', dragResourceFunctions);
    });
  }
}