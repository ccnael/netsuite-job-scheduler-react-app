import { resources, vendors, assets, events } from './dataSet';
import { resourcesDtColumns, vendorsDtColumns, assetsDtColumns } from './dataTableColumns';
import { Event } from './utils';

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
                    <strong class="table-header">Select Available Resources</strong>
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
                    <strong class="table-header">Work Order Vendors</strong>
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
                    <strong class="table-header">Work Order Assets</strong>
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

  window.openGeneralEventModal = eventId => {
    $('#generalEventModal').attr('mode', typeof eventId == 'object' ? 'create' : 'edit');
    $('#generalEventModal').attr('eventId', eventId);
    $('#generalEventModal').modal('toggle');
  }

  // Load General Event Form
  // All day event switch function
  $('#generalEventModal .alldayevent-switch').on('change', ev => {
    if (ev.target.checked) {
      $('#generalEventModal .starttime').val('08:00'); // NS default starttime
      $('#generalEventModal .endtime').val('18:00'); // NS default endtime
      $('#generalEventModal .starttime').prop('disabled', true);
      $('#generalEventModal .endtime').prop('disabled', true);
    } else {
      $('#generalEventModal .starttime').prop('disabled', false);
      $('#generalEventModal .endtime').prop('disabled', false);
    }
  });

  // Load General Event Form
  $('#generalEventModal').on('shown.bs.modal', ev => {
    setTimeout(() => {
      hideCustomLoader();

      const mode = $('#generalEventModal').attr('mode');
      const eventId = $('#generalEventModal').attr('eventId');
      let eventData, modalTitle, eventTitle;

      if (mode == 'create') {
        modalTitle = `Create New Event`;
        eventTitle = '';
      } else if (mode == 'edit') {
        modalTitle = `Update Event Details [ID ${eventId}]`;
        eventData = events.find(event => event.id == eventId);
        eventTitle = eventData?.title;
      }

      $('#generalEventModal .modal-title').text(modalTitle); // Set Modal Title
      $('#generalEventModal input.eventTitleInput').val(eventTitle); // Set primary info

      if (mode == 'edit') {
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
        processing: true,
        retrieve: true,
        ajax(data, callback, settings) {
          callback({
            data: (() => {
              if (mode == 'create') {
                return resources.filter(resource => !!resource.active);
              } else {
                const activeResources = deepCopy(resources.filter(resource => !!resource.active));
                return activeResources.map(allResource => {
                  allResource.selected = !!(eventData.resources.find(resource => resource.id == allResource.id));
                  return allResource;
                });
              }
            })()
          })
        },
        columns: resourcesDtColumns,
        initComplete: () => {
          eventFormHandlers();
        }
      });

      temp_vendorsDataTable = $('#vendors_ge').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            // data: vendors
            data: (() => {
              if (mode == 'create') {
                return vendors;
              } else {
                // Combine resource vendors and WO vendors
                const unassignedVendors = deepCopy(vendors).filter(vendor => !!!eventData.vendors.map(vendor => vendor.vendor.value).includes(vendor.id));
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
              if (mode == 'create') {
                return assets;
              } else {
                // Combine resource assets and WO assets
                const unassignedAssets = deepCopy(assets).filter(asset => !!!eventData.assets.map(asset => asset.item.value).includes(asset.id));
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
    }, 250);
  });

  // General Event Form -> On Submit
  $('#generalEventSubmitForm').on('submit', ev => {
    ev.preventDefault();
    
    const mode = $('#generalEventModal').attr('mode');
    const eventId = $('#generalEventModal').attr('eventId');
    const eventData = events.find(event => event.id == eventId);
    let vendorsToUse = [], assetsToUse = [];

    if (mode == 'create') {
      vendorsToUse = vendors;
      assetsToUse = assets;
    } else {
      let unassignedVendors = deepCopy(vendors).filter(vendor => !!!eventData.vendors.map(vendor => vendor.vendor.value).includes(vendor.id));
      unassignedVendors = [...eventData.vendors, ...unassignedVendors];
      vendorsToUse = unassignedVendors;

      let unassignedAssets = deepCopy(assets).filter(asset => !!!eventData.assets.map(asset => asset.item.value).includes(asset.id));
      unassignedAssets = [...eventData.assets, ...unassignedAssets];
      assetsToUse = unassignedAssets;
    }

    const payload = {
      eventDataSrc: {},
      woRef: {},
      eventData: {}
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
    payload.eventData.selectedItems = [];
    payload.eventData.selectedContact = {};
    payload.eventData.selectedAddress = {};

    const resourceIds = [];
    const resources_dt_tr = document.querySelectorAll('#resources_ge tbody .dt-line-select');
    for (const line of resources_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          resourceIds.push(id);
        }
      }
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
            foundObj.quantityRequired = newQty;
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

    payload.eventData.selectedResources = resources.filter(resource => !!resource.active && !!(resourceIds.includes(resource.id)));
    payload.eventData.selectedVendors = vendorsToUse.filter(vendor => !!(vendorIds.includes(vendor.id)));
    payload.eventData.selectedAssets = assetsToUse.filter(asset => !!(assetIds.includes(asset.id)));

    if (mode == 'create') {
      Event.createEventRecord(payload, 'generalEventModal');
    } else if (mode == 'edit') {
      payload.eventData.id = eventId;
      payload.eventDataSrc = JSON.parse(decodeURIComponent($('#generalEventModal').attr('eventDataSrc')));
      Event.updateEventRecord(payload, 'generalEventModal');
    }
  });

  // General Event Form -> On Close
  $('#generalEventModal').on('hidden.bs.modal', ev => clearFieldValues());

  function eventFormHandlers() {
    window.markAll = (ev) => {
      const value = ev.target.checked;
      const el = ev.target.closest('.dataTable').querySelectorAll('.dt-line-select');
      for(let i = 0; i < el.length; i++) {  
        if(el[i].type == 'checkbox')  
          el[i].checked = value;//!el[i].checked;
      }
    }
  
    window.validateForm = () => true;
  }

  function clearFieldValues() {
    console.log('----- Clearing Fields -----');
    
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