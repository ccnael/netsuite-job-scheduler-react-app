import * as dataSet from './dataSet';
import { resourcesDtColumns, vendorsDtColumns, assetsDtColumns } from './dataTable';
import { Event } from './utils';
// import { clearFilters } from './filterUtils';
import './generalEventModal.css';

let temp_resourcesDataTable, temp_vendorsDataTable, temp_assetsDataTable;

$(document).ready(() => {
  $('#app').append(`<div class="modal fade" id="generalEventModal" mode="" eventId="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="generalEventModalLabel"><strong class="table-header"></strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="spinner"></div>
        <div class="modal-body">
          <form id="generalEventSubmitForm" onsubmit="return validateForm()">
            <!-- 1st Accordion Item -->
            <div class="accordion" id="generalEvent1stAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="generalEventHeading1st">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapse1st" aria-expanded="true" aria-controls="generalEventCollapse1st">
                    <!-- <strong class="grid-header">&nbsp;Primary Information</strong> -->
                    <strong class="table-header">Primary Information</strong>
                  </button>
                </h2>
                <div id="generalEventCollapse1st" class="accordion-collapse collapse show" aria-labelledby="generalEventHeading1st" data-parent="#generalEvent1stAccordion">
                  <div class="accordion-body">
                    <form>
                      <table class="table w-100 table-borderless" id="wo-primaryinfo-ge">
                        <tr>
                          <td class="eventTitle">
                            <div>
                              <label for="eventTitleInput" class="form-label required">Event Title</label>
                              <input type="text" class="form-control eventTitleInput" required>
                            </div>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <label for="datefrom" class="form-label required">Start Date</label>
                              <input type="date" class="form-control datefrom" required>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label for="dateto" class="form-label required">End Date</label>
                              <input type="date" class="form-control dateto" required>
                            </div>
                          </td>
                          <td rowspan="2">
                            <div>
                              <label for="textarea" class="form-label">Notes</label>
                              <textarea class="form-control note" rows="5"></textarea>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <label for="starttime" class="form-label required">Start Time</label>
                              <input type="time" class="form-control starttime" required>
                            </div>
                          </td>
                          <td>
                            <div>
                              <label for="endtime" class="form-label required">End Time</label>
                              <input type="time" class="form-control endtime" required>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="priority" class="form-label">Priority</label>
                            <select class="form-select priority">
                              <option value="1" selected>Low</option>
                              <option value="2">Mid</option>
                              <option value="3">High</option>
                              <option value="4">Urgent</option>
                            </select>
                          </td>
                          <td>
                            <label for="status" class="form-label">Status</label>
                            <select class="form-select status">
                              <option value="TENTATIVE" selected>Tentative</option>
                              <option value="CONFIRMED">Confirmed</option>
                              <option value="COMPLETED">Completed</option>
                            </select>
                          </td>
                          <td>
                            <label class="form-check-label">All Day</label>
                            <div class="form-check form-switch w-100" style="margin-left: 30px">
                              <input class="form-check-input text-right alldayevent-switch" type="checkbox">
                            </div>
                          </td>
                        </tr>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- 2nd Accordion Item -->
            <div class="accordion" id="generalEvent2ndAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="generalEventHeading2nd">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapse2nd" aria-expanded="true" aria-controls="generalEventCollapse2nd">
                    <strong class="table-header">Resources</strong>
                  </button>
                </h2>
                <div id="generalEventCollapse2nd" class="accordion-collapse collapse show" aria-labelledby="generalEventHeading2nd" data-parent="#generalEvent2ndAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="resources_ge">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 3rd Accordion Item -->
            <div class="accordion" id="generalEvent3rdAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="generalEventHeading3rd">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapse3rd" aria-expanded="true" aria-controls="generalEventCollapse3rd">
                    <strong class="table-header">Vendor Subcontractors</strong>
                  </button>
                </h2>
                <div id="generalEventCollapse3rd" class="accordion-collapse collapse show" aria-labelledby="generalEventHeading3rd" data-parent="#generalEvent3rdAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="vendors_ge">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 4th Accordion Item -->
            <div class="accordion" id="generalEvent4thAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="generalEventHeading4th">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapse4th" aria-expanded="true" aria-controls="generalEventCollapse4th">
                    <strong class="table-header">Assets & Equipments</strong>
                  </button>
                </h2>
                <div id="generalEventCollapse4th" class="accordion-collapse collapse show" aria-labelledby="generalEventHeading4th" data-parent="#generalEvent4thAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="assets_ge">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="generalEventSubmitForm" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>`);

  window.openGeneralEventModal = (eventId = '') => {
    $('#generalEventModal').attr('mode', !eventId || typeof eventId === 'object' ? 'create' : 'edit');
    $('#generalEventModal').attr('eventId', eventId);
    $('#generalEventModal').modal('toggle');
  }
  // Load General Event Form
  $('#generalEventModal').on('shown.bs.modal', ev => {
    setTimeout(() => {
      hideCustomLoader();

      const mode = $('#generalEventModal').attr('mode');
      const eventId = $('#generalEventModal').attr('eventId');
      let eventData, modalTitle, eventTitle;

      if (mode === 'create') {
        modalTitle = `Create Event`;
        eventTitle = '';
      } else if (mode === 'edit') {
        modalTitle = `Update Event Details [ID ${eventId}]`;
        eventData = dataSet.events.find(event => event.id == eventId);
        eventTitle = eventData?.title;
      }

      $('#generalEventModal .modal-title').text(modalTitle); // Set Modal Title
      $('#generalEventModal input.eventTitleInput').val(eventTitle); // Set primary info

      if (mode === 'edit') {
        if (eventData) {
          $('#generalEventModal').attr('eventDataSrc', encodeURIComponent(JSON.stringify(eventData))); // Data from NS
          $('#generalEventModal .datefrom').val(eventData.date.start);
          $('#generalEventModal .dateto').val(eventData.date.end);
          $('#generalEventModal .starttime').val(eventData.time.start);
          $('#generalEventModal .endtime').val(eventData.time.end);
          $('#generalEventModal .note').val(eventData.note);
          // $('#generalEventModal .alldayevent-switch').prop('checked', eventData.allDay ? 'checked' : '');
          $('#generalEventModal .status').val(eventData.status.value);
          $('#generalEventModal .priority').val(eventData.priority.value);
        }
      }

      // Set DataTable values
      $.fn.dataTable.ext.errMode = 'none';

      temp_resourcesDataTable = $('#resources_ge').DataTable({
        dom: '<"d-flex justify-content-between align-items-center"<"left-col"l><"middle-col"><"right-col"f>>tip',
        processing: true,
        retrieve: true,
        ajax(data, callback, settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                return dataSet.activeResources;
              } else {
                // Combine employees and Event resources
                return dataSet.activeResources.map(resource => {
                  const id = resource.id;
                  const foundObj = eventData.resources.find(eventResource => eventResource.employee.value == id);
                  if (foundObj) {
                    resource = deepCopy(foundObj);
                  }
                  return resource;
                });
              }
            })()
          })
        },
        columns: resourcesDtColumns,
        initComplete: () => {
          eventFormHandlers();
          addFilterIcon();
        }
      });

      temp_vendorsDataTable = $('#vendors_ge').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                return dataSet.vendors;
              } else {
                // Combine vendors and WO vendors
                const unassignedVendors = deepCopy(dataSet.vendors).filter(vendor => !!!eventData.vendors.map(vendor => vendor.vendor.value).includes(vendor.id));
                return [...eventData.vendors, ...unassignedVendors];
              }
            })()
          })
        },
        columns: vendorsDtColumns,
        initComplete: () => {
          eventFormHandlers();
        }
      });

      temp_assetsDataTable = $('#assets_ge').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                return dataSet.assets;
              } else {
                // Combine assets and WO assets
                const unassignedAssets = deepCopy(dataSet.assets).filter(asset => !!!eventData.assets.map(asset => asset.item.value).includes(asset.id));
                return [...eventData.assets, ...unassignedAssets];
              }
            })()
          })
        },
        columns: assetsDtColumns,
        initComplete: () => {
          eventFormHandlers();
        }
      });

      Event.switchAllDay('#generalEventModal'); // All day event switch function
      Event.validateResourcesOnLoad('#wo-primaryinfo-ge', '#resources_ge', eventId);
      Event.validateOnHeaderFieldChange('#wo-primaryinfo-ge', '#resources_ge', eventId);
      Event.validateOnLineFieldChange('#wo-primaryinfo-ge', '#resources_ge', eventId);
    }, 250);
  });

  // General Event Form -> On Submit
  $('#generalEventSubmitForm').on('submit', ev => {
    ev.preventDefault();

    const mode = $('#generalEventModal').attr('mode');
    const eventId = $('#generalEventModal').attr('eventId');
    const eventData = dataSet.events.find(event => event.id == eventId);
    let resourcesToUse = [], vendorsToUse = [], assetsToUse = [];

    if (mode === 'create') {
      resourcesToUse = dataSet.activeResources;
      vendorsToUse = dataSet.vendors;
      assetsToUse = dataSet.assets;
    } else {
      resourcesToUse = dataSet.activeResources.map(resource => {
        const id = resource.id;
        const foundObj = eventData.resources.find(eventResource => eventResource.employee.value == id);
        if (foundObj) {
          resource = deepCopy(foundObj);
        }
        return resource;
      });

      let unassignedVendors = deepCopy(dataSet.vendors).filter(vendor => !!!eventData.vendors.map(vendor => vendor.vendor.value).includes(vendor.id));
      unassignedVendors = [...eventData.vendors, ...unassignedVendors];
      vendorsToUse = unassignedVendors;

      let unassignedAssets = deepCopy(dataSet.assets).filter(asset => !!!eventData.assets.map(asset => asset.item.value).includes(asset.id));
      unassignedAssets = [...eventData.assets, ...unassignedAssets];
      assetsToUse = unassignedAssets;
    }

    const payload = {
      eventDataSrc: {},
      woRef: {},
      eventData: {},
      woResources: []
    };
    payload.eventData.title = $('#generalEventModal input.eventTitleInput').val();
    payload.eventData.date = {
      start: $('#generalEventModal .datefrom').val(),
      end: $('#generalEventModal .dateto').val()
    };
    payload.eventData.time = {
      start: $('#generalEventModal .starttime').val(),
      end: $('#generalEventModal .endtime').val()
    };
    payload.eventData.note = $('#generalEventModal .note').val();
    payload.eventData.allDay = $('#generalEventModal .alldayevent-switch')[0].checked;
    payload.eventData.status = $('#generalEventModal .status').val();
    payload.eventData.priority = $('#generalEventModal .priority').val();
    payload.eventData.selectedResources = [];
    payload.eventData.selectedVendors = [];
    payload.eventData.selectedAssets = [];

    // Extract selected rows
    const resourceIds = [];
    if (temp_resourcesDataTable) {
      const resources_dt_tr = temp_resourcesDataTable.rows({ search: 'applied' }).nodes();
      resources_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          if (id) {
            const foundObj = resourcesToUse.find(resource => resource.id == id);
            if (foundObj) {
              const startTime = $(node).find('input.starttime-resource').val();
              const endTime = $(node).find('input.endtime-resource').val();
              foundObj.time.start = startTime;
              foundObj.time.end = endTime;
            }
            resourceIds.push(id);
          }
        }
      });
    }

    const vendorIds = [];
    const vendors_dt_tr = document.querySelectorAll('#vendors_ge tbody .dt-line-select');
    for (const line of vendors_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          const foundObj = vendorsToUse.find(vendor => vendor.id == id);
          if (foundObj) {
            const newQty = +line.parentNode.parentNode.parentNode.querySelector('.quantity').value;
            const comment = line.parentNode.parentNode.parentNode.querySelector('.note').value;
            foundObj.quantityRequired = newQty;
            foundObj.memo = comment;
          }
          vendorIds.push(id);
        }
      }
    }

    const assetIds = [];
    const assets_dt_tr = document.querySelectorAll('#assets_ge tbody .dt-line-select');
    for (const line of assets_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          const foundObj = assetsToUse.find(asset => asset.id == id);
          if (foundObj) {
            const newQty = +line.parentNode.parentNode.parentNode.querySelector('.quantity').value;
            foundObj.quantity = newQty;
          }
          assetIds.push(id);
        }
      }
    }

    payload.eventData.selectedResources = resourcesToUse.filter(resource => !!resourceIds.includes(resource.id));
    payload.eventData.selectedVendors = vendorsToUse.filter(vendor => !!vendorIds.includes(vendor.id));
    payload.eventData.selectedAssets = assetsToUse.filter(asset => !!assetIds.includes(asset.id));

    if (mode === 'create') {
      Event.createEventRecord(payload, 'generalEventModal');
    } else if (mode === 'edit') {
      payload.eventData.id = eventId;
      payload.eventDataSrc = JSON.parse(decodeURIComponent($('#generalEventModal').attr('eventDataSrc')));
      Event.updateEventRecord(payload, 'generalEventModal');
    }
  });

  // General Event Form -> On Close
  $('#generalEventModal').on('hidden.bs.modal', ev => clearFieldValues());

  function eventFormHandlers() {
    window.markAll = ev => {
      const value = ev.target.checked;
      const el = ev.target.closest('.dataTable').querySelectorAll('.dt-line-select');
      for (let i = 0; i < el.length; i++) {
        if (el[i].type === 'checkbox') {
          if (!el[i].disabled) {
            if (value == !el[i].checked) {
              el[i].checked = !el[i].checked;
            }
          }
        }
      }
    }
    window.validateForm = () => true;
  }

  function addFilterIcon() {
    const entriesLabel = $(`#resources_ge_wrapper div.dt-length`);
    entriesLabel.addClass('d-flex align-items-center mb-2'); // Align entries label with search bar
    const dtSearch = $(`#resources_ge_wrapper .dt-search`);
    dtSearch.addClass('d-flex align-items-center mb-2'); // Align search bar as well
    // Add filter icon beside the entries label
    entriesLabel.append(`
      <div class="d-flex align-items-center">
      <i class="fa-solid fa-filter filter-icon" style="font-size: 20px; margin-left: 20px" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldGeneralEventResource"></i>
        <span class="badge badge-danger badge-pill counter" style="font-size: 8px" id="filter-generaleventresource-counter">0</span>
      </div>
    `);
  }

  function clearFieldValues() {
    console.log('----- Clearing Fields -----');
    // clearFilters('#filterFieldGeneralEventResource');
    showCustomLoader();

    $(`#generalEventModal`).attr('mode', '');
    $(`#generalEventModal`).attr('woId', '');
    $(`#generalEventModal`).attr('eventId', '');
    $(`#generalEventModal`).attr('eventDataSrc', '');
    $(`#generalEventModal .datefrom`).val('');
    $(`#generalEventModal .dateto`).val('');
    $(`#generalEventModal .starttime`).val('');
    $(`#generalEventModal .endtime`).val('');
    $(`#generalEventModal .note`).val('');

    document.querySelector(`#generalEventModal .priority`).value = '1'; // Default Low
    document.querySelector(`#generalEventModal .status`).value = 'TENTATIVE'; // Default Tentative
    $(`#generalEventModal .alldayevent-switch`)[0].checked = false;

    // Clear DataTable rows
    if (temp_resourcesDataTable) {
      $('table#resources_ge tbody').children().remove();
      temp_resourcesDataTable = temp_resourcesDataTable.destroy();
    }

    if (temp_vendorsDataTable) {
      $('table#vendors_ge tbody').children().remove();
      temp_vendorsDataTable = temp_vendorsDataTable.destroy();
    }

    if (temp_assetsDataTable) {
      $('table#assets_ge tbody').children().remove();
      temp_assetsDataTable = temp_assetsDataTable.destroy();
    }

    // 
  }

  function showCustomLoader() {
    $(`#generalEventModal .spinner`).show();
    $(`#generalEventModal .modal-body`).css('z-index', '-1');
  }

  function hideCustomLoader() {
    $(`#generalEventModal .spinner`).hide();
    $(`#generalEventModal .modal-body`).css('z-index', '1');
  }

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
});