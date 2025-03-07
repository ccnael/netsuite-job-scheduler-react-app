import * as dataSet from './components/dataSet';
import { Event, ToolTip } from './components/utils';
import { onClickResource } from './components/filterFields/filterUtils';
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
                  <div style="padding: 10px; margin-top: 20px; display: flex; align-items: center;" class="card-header header">
                    <i class="fa-solid fa-users-gear" style="font-size: 14px; margin-right: 5px;"></i>
                    <h5 style="margin: 0;"><strong>Resources</strong></h5>
                    <i class="fa-solid fa-filter filter-icon" style="margin-left: auto; font-size: 14px;" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldResource"></i>
                    <span class="badge badge-danger badge-pill counter" id="filter-resource-counter">0</span>
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
                                    Groups: ${resource.resourceGroups.map(_resourceGroup => _resourceGroup.text).join(' / ')}<br/>
                                    Skills: ${resource.resourceSkills.map(resourceSkill => resourceSkill.text).join(' / ')}<br/>
                                    Email: ${resource.email}<br/>
                                    Phone: ${resource.phone}<br/>
                                    Location: ${resource.location.text}<br/>
                                    Events: ${resource.events.length}<br/>"
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
                    </div>`)}
                  ${`<div id="resourceGroup-vendor-filter-tableWrapper" class="accordion accordion-flush">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="resourceGroup-vendor-filter-tableHeading">
                          <button class="accordion-button" type="button" data-toggle="collapse" data-target="#resourceGroup-vendor-filter-table" aria-expanded="true" aria-controls="resourceGroup-vendor-filter-table">
                            <i class="fa-solid fa-icon-size fa-user-group"></i>
                            <strong class="grid-header">&nbsp;Vendor Subcons&nbsp;</strong>
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
                    ${`<div id="resourceGroup-asset-filter-tableWrapper" class="accordion accordion-flush">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="resourceGroup-asset-filter-tableHeading">
                          <button class="accordion-button" type="button" data-toggle="collapse" data-target="#resourceGroup-asset-filter-table" aria-expanded="true" aria-controls="resourceGroup-asset-filter-table">
                            <i class="fa-solid fa-screwdriver-wrench"></i>
                            <strong class="grid-header">&nbsp;Assets&nbsp;</strong>
                            <span class="badge badge-danger badge-pill counter">${dataSet.assets.length}</span>
                          </button>
                        </h2>
                        <div id="resourceGroup-asset-filter-table" class="accordion-collapse collapse show" aria-labelledby="resourceGroup-asset-filter-tableHeading" data-parent="#resourceGroup-asset-filter-tableWrapper">
                          ${dataSet.assets.map(asset => `
                          <div class="person-container" resourceType="asset" id="${asset.id}">
                            <div draggable="true" ondragstart="dragResourceFunctions(event);" ondragend="dragResourceFunctions(event);" class="person-circle cursor-grab" 
                                  data-bs-toggle="tooltip" 
                                  data-bs-placement="right" 
                                  title="<strong>${asset.name}</strong><br/>
                                  Name: ${asset.name}<br/>
                                  Description: ${asset.description}<br/>
                                <span class="initials">${asset.name.substring(0, 1)}</span>
                                ${!asset.onMaintenance ? '<span class="status active"></span>' : '<span class="status busy"></span>'}
                            </div>
                            <div class="person-info">
                                <span class="full-name">${asset.name}</span>
                                ${!asset.onMaintenance ? '<span class="status-text">Available</span>' : '<span class="status-text">Not Available</span>'}
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
                      <div style="display: flex; justify-content: space-between; align-items: center; text-align: center;">
                        <div style="display: flex; align-items: center;">
                          <i class="fa-solid fa-pen-to-square" style="font-size: 16px;"></i>
                          <span style="margin-left: 5px; display: flex; align-items: center;">
                            <h5 style="margin: 0;"><strong>Available Jobs</strong></h5>
                          </span>
                          &nbsp;
                          <span class="badge badge-danger badge-pill counter" id="header-boardjob-counter">${dataSet.workOrders.length}</span>
                        </div>
                        <i class="fa-solid fa-filter filter-icon" style="font-size: 14px;" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldBoardJob"></i>
                        <span class="badge badge-danger badge-pill counter" id="filter-boardjob-counter">0</span>
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
                              <!-- ${wo.receiptStatus.value ? `<span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${wo.receiptStatus.code}">${wo.receiptStatus.display}</span>` : ''} -->
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
                      <div style="display: flex; justify-content: space-between; align-items: center; text-align: center;">
                        <div style="display: flex; align-items: center;">
                          <i class="fa-solid fa-calendar-check" style="font-size: 16px;"></i>
                          <span style="margin-left: 5px; display: flex; align-items: center;">
                            <h5 style="margin: 0;"><strong>Events</strong></h5>
                          </span>
                          &nbsp;
                          <span class="badge badge-danger badge-pill counter" id="header-boardevent-counter">${dataSet.events/* .filter(event => event.status.value !== 'COMPLETED') */.length}</span>
                        </div>
                        <i class="fa-solid fa-filter filter-icon" style="font-size: 14px;" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldBoardEvent"></i>
                        <span class="badge badge-danger badge-pill counter" id="filter-boardevent-counter">0</span>
                      </div>
                    </div>
                    <div class="secondary-row">
                      <button class="btn btn-primary button-new-event" onclick="openGeneralEventModal(event)">
                        <i class="fa-regular fa-icon-size fa-plus-square"></i> New
                      </button>
                      <div class="col-md-6">
                        <select class="selectpicker mx-auto multiple-resource-field multiple-resource-field-hidden" title="Filter by Resource Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                          ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
                          ${dataSet.vendors.map(vendor => `<option value="${vendor.id}">${vendor.name}</option>`)}
                          ${dataSet.assets.map(asset => `<option value="${asset.id}">${asset.name}</option>`)}
                        </select>
                      </div>
                      </button>
                    </div>
                    <div class="card-wrapper">
                      ${dataSet.events.map(event => `
                        <div type="event" class="card-item" id="${event.id}" 
                        data-bs-toggle="tooltip" 
                        data-bs-placement="right" 
                        title="
                          <strong>${event.title}</strong><br/><br/>
                          Resources:<br/>
                            ${(event.resources.length || event.vendors.length || event.assets.length) ? `${event.resources.map((resource, counter) => `${+counter + 1}. ${resource.employee.text}`).join('<br/>')}${event.resources.length ? '<br/>' : ''}
                              ${event.vendors.map((vendor, counter) => `${event.resources.length + counter + 1}. ${vendor.vendor.text || vendor.name}`).join('<br/>')}${event.vendors.length ? '<br/>' : ''}
                              ${event.assets.map((asset, counter) => `${event.resources.length + event.vendors.length + counter + 1}. ${asset.asset.text || asset.name}`).join('<br/>')}` : '- None -'}"
                        style="${''/* event.status.value === 'COMPLETED' ? 'display: none' : 'display: initial' */}">
                          <div class="card-head">
                            <div class="card-name"><a href="${event.url}" target="_blank"><strong>${event.title}</strong></a></div>
                            <div class="card-header-options">
                              <div class="dropdown">
                                <i class="fa-solid fa-angles-down" style="cursor: pointer"></i>
                                ${event.status.value !== 'COMPLETED' ? `<div class="dropdown-content">
                                  ${(!event.workorder.value) ? `<a href="#" onclick="openGeneralEventModal(${event.id})">Update Event</a>` : '<a href="#" onclick="openEventModal(event)">Update Event</a>'}
                                  <a href="#" onclick="openCompleteEventModal(event)">Complete Event</a>
                                  <a href="#" onclick="deleteEventRecord(event)">Remove Event</a>
                                </div>` : `<div class="dropdown-content">
                                  <a href="#" onclick="deleteEventRecord(event)">Remove Event</a>
                                </div>`}
                              </div>
                            </div>
                          </div>
                          <div class="card-content">
                            <div class="card-content-eventId" eventId="${event.id}">ID ${event.id}</div>
                            <div class="card-content-woText">${!!event.workorder.text ? `<a href="${event.woRef.woUrl}" target="_blank">${event.woRef.name}</a>` : '<span class="badge py-1 px-2 rounded-pill text-uppercase general-bg">General</span>'}</div>
                            <div class="card-content-date">${event.date.start == event.date.end ? moment(event.date.start).format('M/D/YYYY') : `${moment(event.date.start).format('M/D/YYYY')} - ${moment(event.date.end).format('M/D/YYYY')}`}</div>
                            <div class="card-content-time">${moment(`1/1/1999 ${event.time.start}`).format('h:mm a')} - ${moment(`1/1/1999 ${event.time.end}`).format('h:mm a')}</div>
                            <div>Organizer: ${event.organizer.text}</div>
                            <div class="">
                              <div class=row"col-2 fc-event-status" style="font-size: ${event.woRef?.receiptStatus?.value ? '10px' : '12px'}">
                                <span class="badge py-1 px-2 ${event.status.code} rounded-pill text-uppercase">${event.status.text}</span>
                                <span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.priority.code};">${event.priority.text}</span>
                                ${event.woRef?.receiptStatus?.value ? `<span class="badge py-1 px-2 rounded-pill text-uppercase" style="background-color: ${event.woRef.receiptStatus.code}">${event.woRef.receiptStatus.display}</span>` : ''}
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

    ToolTip.setup();
    this._initLayoutHandlers();
    this._onDragResource();
    // this._showBanners();
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

          $('.thirdColumn').find('div[type*="event"]').each(function () {
            const id = this.id;
            const eventData = dataSet.events.find(event => event.id == id);

            let foundObj, allowEvent = false;
            if (resourceType === 'employee') {
              foundObj = eventData.resources.find(resource => resource.employee.value == resourceId);
              const hasConflict = Event.draggedResourceHasConflictEvent(eventData.id, eventData.date, eventData.time, resourceId);
              allowEvent = !foundObj && !hasConflict;
            } else if (resourceType === 'vendor') {
              foundObj = eventData.vendors.find(vendor => vendor.vendor.value == resourceId);
              allowEvent = !foundObj;
            } else if (resourceType === 'asset') {
              foundObj = eventData.assets.find(asset => asset.asset.value == resourceId);
              allowEvent = !foundObj;
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
          if (dataTransfer.type === 'employee') {
            foundObj = eventData.resources.find(resource => resource.employee.value == dataTransfer.id);
            const hasConflict = Event.draggedResourceHasConflictEvent(eventData.id, eventData.date, eventData.time, dataTransfer.id);
            allowResource = !foundObj && !hasConflict;
          } else if (dataTransfer.type === 'vendor') {
            foundObj = eventData.vendors.find(vendor => vendor.vendor.value == dataTransfer.id);
            allowResource = !foundObj;
          } else if (dataTransfer.type === 'asset') {
            foundObj = eventData.assets.find(asset => asset.asset.value == dataTransfer.id);
            allowResource = !foundObj;
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
            if (dataTransfer.type.match(/employee|vendor|asset/g)) {
              window.openDragResourceModal(eventId, dataTransfer);
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
          $('.thirdColumn').find('div[type*="event"]').each(function () {
            $(this).removeClass('event-available event-unavailable');
          });
          break;

        default:
          break;
      }
      ev.stopPropagation();
      ev.preventDefault();
    }

    onClickResource();
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
          duration: 3000,
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

  // This prevents conflict dropping conflict with the job items drag and drop
  static _onDragResource() {
    $('.person-circle').on('dragstart', function (event) {
      $('.thirdColumn').find('div[type*="event"]').on('dragenter dragover drop dragleave', dragResourceFunctions);
    });
    $('.person-circle').on('dragend', function (event) {
      $('.thirdColumn').find('div[type*="event"]').off('dragenter dragover drop dragleave', dragResourceFunctions);
    });
  }
}