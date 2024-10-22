import { resources, workOrders, events } from './dataSet';
import { woResourcesDtColumns, woVendorsDtColumns, woAssetsDtColumns, woItemsDtColumns, woContactsDtColumns, woAddressesDtColumns } from './dataTableColumns';
import { Event } from './utils';

let temp_woResourcesDataTable, temp_woVendorsDataTable, temp_woAssetsDataTable, temp_woItemsDataTable, temp_woContactsDataTable, temp_woAddressesDataTable;

$(document).ready(() => {
  $('#app').append(`<div class="modal fade" id="eventModal" mode="" woId="" eventId="" eventDataSrc="" prefillData="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventModalLabel"><strong class="table-header"></strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="spinner"></div>
        <div class="modal-body">
          <form id="eventSubmitForm" onsubmit="return validateForm()">
            <!-- 1st Accordion Item -->
            <div class="accordion" id="event1stAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading1st">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse1st" aria-expanded="true" aria-controls="collapse1st">
                    <!-- <strong class="grid-header">&nbsp;Primary Information</strong> -->
                    <strong class="table-header">Primary Information</strong>
                  </button>
                </h2>
                <div id="collapse1st" class="accordion-collapse collapse show" aria-labelledby="eventHeadingOne" data-parent="#event1stAccordion">
                  <div class="accordion-body">
                    <form>
                      <table class="table w-100 table-borderless" id="wo-primaryinfo">
                        <tr>
                          <td class="eventTitle">
                            <div>
                              <label for="eventTitleInput" class="form-label required">Event Title</label>
                              <input type="text" class="form-control eventTitleInput" required>
                            </div>
                          </td>
                          <td class="title">
                            <label class="form-label">Work Order</label>
                            <p></p>
                          </td>
                          <td class="project">
                            <label class="form-label">Project</label>
                            <p></p>
                          </td>
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
            <div class="accordion" id="event2ndAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading2nd">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse2nd" aria-expanded="true" aria-controls="collapse2nd">
                    <strong class="table-header">Select Available Resources</strong>
                  </button>
                </h2>
                <div id="collapse2nd" class="accordion-collapse collapse show" aria-labelledby="eventHeading2nd" data-parent="#event2ndAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="woResources_dt">
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
            <div class="accordion" id="event3rdAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading3rd">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse3rd" aria-expanded="true" aria-controls="collapse3rd">
                    <strong class="table-header">Work Order Vendors</strong>
                  </button>
                </h2>
                <div id="collapse3rd" class="accordion-collapse collapse show" aria-labelledby="eventHeading3rd" data-parent="#event3rdAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="vendors">
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
            <div class="accordion" id="event4thAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading4th">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse4th" aria-expanded="true" aria-controls="collapse4th">
                    <strong class="table-header">Work Order Assets</strong>
                  </button>
                </h2>
                <div id="collapse4th" class="accordion-collapse collapse show" aria-labelledby="eventHeading4th" data-parent="#event4thAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="assets">
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
            <!-- 5th Accordion Item -->
            <div class="accordion" id="event5thAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading5th">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse5th" aria-expanded="true" aria-controls="collapse5th">
                    <strong class="table-header">Work Order Items</strong>
                  </button>
                </h2>
                <div id="collapse5th" class="accordion-collapse collapse show" aria-labelledby="eventHeading5th" data-parent="#event5thAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="woItems_dt">
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
            <!-- 6th Accordion Item -->
            <div class="accordion" id="event6thAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading6th">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse6th" aria-expanded="true" aria-controls="collapse6th">
                    <strong class="table-header">Work Order Contacts</strong>
                  </button>
                </h2>
                <div id="collapse6th" class="accordion-collapse collapse show" aria-labelledby="eventHeading6th" data-parent="#event6thAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="contacts">
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
            <!-- 7th Accordion Item -->
            <div class="accordion" id="event7thAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeading7th">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse7th" aria-expanded="true" aria-controls="collapse7th">
                    <strong class="table-header">Work Order Addresses</strong>
                  </button>
                </h2>
                <div id="collapse7th" class="accordion-collapse collapse show" aria-labelledby="eventHeading7th" data-parent="#event7thAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="addresses">
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
          <button type="submit" form="eventSubmitForm" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>`);

  window.openEventModal = (ev, woId, eventId, prefillData) => {
    if (ev) {
      const dataTransfer = ev?.dataTransfer;
      if (dataTransfer) {
        woId = dataTransfer.getData('text');
        $('#eventModal').attr('mode', 'create');
        $('#eventModal').attr('woId', woId);
      } else {
        eventId = ev.target.closest('.card-item').getAttribute('id');
        $('#eventModal').attr('mode', 'edit');
        $('#eventModal').attr('eventId', eventId);
      }
    } else { // Calendar view scenario
      if (woId) {
        $('#eventModal').attr('mode', 'create');
        $('#eventModal').attr('woId', woId);

        // Calendar event > drag jobs create event scenario
        if (prefillData) {
          $('#eventModal').attr('prefillData', encodeURIComponent(JSON.stringify(prefillData)));
        }

      } else if (eventId) {
        $('#eventModal').attr('mode', 'edit');
        $('#eventModal').attr('eventId', eventId);
      }
    }
    if (woId || eventId) {
      $('#eventModal').modal('toggle');
    }
  }

  // Load Event Form
  // All day event switch function
  $('#eventModal .alldayevent-switch').on('change', ev => {
    if (ev.target.checked) {
      $('#eventModal .starttime').val('08:00'); // NS default starttime
      $('#eventModal .endtime').val('18:00'); // NS default endtime
      $('#eventModal .starttime').prop('disabled', true);
      $('#eventModal .endtime').prop('disabled', true);
    } else {
      $('#eventModal .starttime').prop('disabled', false);
      $('#eventModal .endtime').prop('disabled', false);
    }
  });
  
  // Main Event Form -> On Load
  $('#eventModal').on('shown.bs.modal', function(ev) {
    setTimeout(() => {
      hideCustomLoader();

      const mode = $('#eventModal').attr('mode');
      const woId = $('#eventModal').attr('woId');
      const eventId = $('#eventModal').attr('eventId');
      let prefillData = $('#eventModal').attr('prefillData');
      let woRef, eventData, modalTitle, eventTitle;
      const dtLine = {
        resources: [],
        vendors: [],
        assets: [],
        items: [],
        contacts: [],
        addresses: []
      };
  
      if (mode == 'create') {
        modalTitle = `Create New Event [WO ID ${woId}]`;
        woRef = workOrders.find(wo => wo.id == woId);
        eventTitle = woRef?.title;
        dtLine.resources = resources.filter(resource => !!resource.active);

        const usedVendors = woRef.vendors.filter(vendor => !!vendor.event);
        const usedAssets = woRef.assets.filter(asset => !!asset.event);
        const usedItems = woRef.items.filter(item => !!item.event);

        dtLine.vendors = woRef.vendors.filter(vendor => !!!vendor.event);
        dtLine.assets = woRef.assets.filter(asset => !!!asset.event);
        dtLine.items = woRef.items.filter(item => !!!item.event);

        // Calculate remaining vendor quantities
        // -------------------------------------
        dtLine.vendors.forEach(vendor => {
          const qtyUsed = usedVendors.filter(usedVendor => usedVendor.workorder.value == vendor.workorder.value && usedVendor.vendor.value == vendor.vendor.value)
            .reduce((total, vendor) => total += vendor.quantityRequired, 0);
          vendor.quantityAvailable -= qtyUsed;
        });
        // Calculate remaining asset quantities
        // -------------------------------------
        dtLine.assets.forEach(asset => {
          const qtyUsed = usedAssets.filter(usedAsset => usedAsset.workorder.value == asset.workorder.value && usedAsset.equipment.value == asset.equipment.value)
            .reduce((total, asset) => total += asset.quantity, 0);
            asset.quantity -= qtyUsed;
        });
        // Calculate remaining item quantities
        // -------------------------------------
        dtLine.items.forEach(item => {
          const qtyUsed = usedItems.filter(usedItem => usedItem.workorder.value == item.workorder.value && usedItem.uuid == item.uuid)
            .reduce((total, item) => total += item.quantity, 0);
          item.quantity -= qtyUsed;
        });

        dtLine.contacts = JSON.parse(JSON.stringify(woRef.contacts));
        dtLine.contacts = dtLine.contacts.map(woContact => {
          woContact.selected = woContact.primary
          return woContact;
        });
        dtLine.addresses = JSON.parse(JSON.stringify(woRef.addresses));
        dtLine.addresses = dtLine.addresses.map(woAddress => {
          woAddress.selected = !!(dtLine.addresses.length == 1);
          return woAddress;
        });

        if (prefillData) {
          prefillData = JSON.parse(decodeURIComponent(prefillData));
          $('#eventModal .datefrom').val(prefillData.date.start);
          $('#eventModal .dateto').val(prefillData.date.end);
          $('#eventModal .starttime').val(prefillData.time.start);
          $('#eventModal .endtime').val(prefillData.time.end);
        }
      }
      // Find Event Data to update from Work Orders
      else if (mode == 'edit') {
        modalTitle = `Update Event Details [ID ${eventId}]`;
        eventData = events.find(event => event.id == eventId);
        woRef = eventData.woRef;
        eventTitle = eventData?.title;
        dtLine.resources = JSON.parse(JSON.stringify(resources.filter(resource => !!resource.active)));
        dtLine.resources = dtLine.resources.map(allResource => {
          allResource.selected = !!(eventData.resources.find(resource => resource.employee.value == allResource.employee.value));
          return allResource;
        });
        
        dtLine.vendors = JSON.parse(JSON.stringify(woRef.vendors));
        dtLine.vendors = dtLine.vendors.map(woVendor => {
          woVendor.selected = !!(eventData.vendors.find(vendor => vendor.id == woVendor.id));
          return woVendor;
        });
        dtLine.vendors = dtLine.vendors.filter(vendor => vendor.event == eventId);

        dtLine.assets = JSON.parse(JSON.stringify(woRef.assets));
        dtLine.assets = dtLine.assets.map(woAsset => {
          woAsset.selected = !!(eventData.assets.find(asset => asset.id == woAsset.id));
          return woAsset;
        });
        dtLine.assets = dtLine.assets.filter(asset => asset.event == eventId);

        dtLine.items = JSON.parse(JSON.stringify(woRef.items));
        dtLine.items = dtLine.items.map(woItem => {
          woItem.selected = !!(eventData.items.find(item => item.id == woItem.id));
          return woItem;
        });
        dtLine.items = dtLine.items.filter(item => item.event == eventId);

        dtLine.contacts = JSON.parse(JSON.stringify(woRef.contacts));
        dtLine.contacts = dtLine.contacts.map(woContact => {
          woContact.selected = woContact.id == eventData.contact.value;
          return woContact;
        });
        
        dtLine.addresses = JSON.parse(JSON.stringify(woRef.addresses));
        dtLine.addresses = dtLine.addresses.map(woAddress => {
          woAddress.selected = woAddress.id == eventData.address.value;
          return woAddress;
        });
      }
  
      console.log('----- [Work Order Data] -----', { woId, eventId }, { woRef, eventData });
      if (!woRef) return;
  
      // Set Modal Title
      $('#eventModal .modal-title').text(modalTitle);
      // Set primary info
      $('#eventModal input.eventTitleInput').val(eventTitle);
      $('#eventModal .title p').html(`<a href="${woRef.woUrl}" target="_blank">${woRef.title}</a>`);
      $('#eventModal .project p').html(`<a href="${woRef.projectUrl}" target="_blank">${woRef.project.text}</a>`);
  
      if (mode == 'edit') {
        if (eventData) {
          $('#eventModal').attr('woId', eventData.workorder.value);
          $('#eventModal').attr('eventDataSrc', encodeURIComponent(JSON.stringify(eventData))); // Data from NS
          $('#eventModal .datefrom').val(eventData.date.start);
          $('#eventModal .dateto').val(eventData.date.end);
          $('#eventModal .starttime').val(eventData.time.start);
          $('#eventModal .endtime').val(eventData.time.end);
          $('#eventModal .note').val(eventData.note);
          // $('#eventModal .alldayevent-switch').prop('checked', eventData.allDay ? 'checked' : '');
          $('#eventModal .status').val(eventData.status.value);
          $('#eventModal .priority').val(eventData.priority.value);
        }
      }
      
      // Set DataTable values
      $.fn.dataTable.ext.errMode = 'none';
    
      temp_woResourcesDataTable = $('#woResources_dt').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: dtLine.resources
          })
        },
        columns: woResourcesDtColumns,
        initComplete: () => {
          eventFormHandlers();
        }
      });

      temp_woVendorsDataTable = $('#vendors').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: dtLine.vendors
          })
        },
        columns: woVendorsDtColumns,
        initComplete: () => {  
          eventFormHandlers();
        }
      });

      temp_woAssetsDataTable = $('#assets').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: dtLine.assets
          })
        },
        columns: woAssetsDtColumns,
        initComplete: () => {  
          eventFormHandlers();
        }
      });
    
      temp_woItemsDataTable = $('#woItems_dt').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: dtLine.items
          })
        },
        columns: woItemsDtColumns,
        initComplete: () => {  
          eventFormHandlers();
        }
      });
  
      temp_woContactsDataTable = $('#contacts').DataTable({
        processing: true,
        retrieve: true,
        searching: false,
        paging: false, 
        info: false,
        ajax(_data, callback, _settings) {
          callback({
            data: dtLine.contacts
          })
        },
        columns: woContactsDtColumns
      });
  
      temp_woAddressesDataTable = $('#addresses').DataTable({
        processing: true,
        retrieve: true,
        searching: false,
        paging: false, 
        info: false,
        ajax(_data, callback, _settings) {
          callback({
            data: dtLine.addresses
          })
        },
        columns: woAddressesDtColumns
      });
    }, 250);
  });
  
  // Main Event Form -> On Submit
  $('#eventSubmitForm').on('submit', ev => {
    ev.preventDefault();
    
    const mode = $('#eventModal').attr('mode');
    const woId = $('#eventModal').attr('woId');
    const eventId = $('#eventModal').attr('eventId');
    const woRef = workOrders.find(wo => wo.id == woId);
    
    const payload = {
      eventDataSrc: {},
      woRef,
      eventData: {}
    };
    payload.eventData.title = $('#eventModal input.eventTitleInput').val();
    payload.eventData.date = {
      start: $('#eventModal .datefrom').val(),
      end: $('#eventModal .dateto').val()
    };
    payload.eventData.time = {
      start: $('#eventModal .starttime').val(),
      end: $('#eventModal .endtime').val()
    };
    payload.eventData.note = $('#eventModal .note').val();
    // payload.eventData.allDay = $('#eventModal .alldayevent-switch')[0].checked;
    payload.eventData.status = $('#eventModal .status').val();
    payload.eventData.priority = $('#eventModal .priority').val();
    payload.eventData.selectedResources = [];
    payload.eventData.selectedVendors = [];
    payload.eventData.selectedAssets = [];
    payload.eventData.selectedItems = [];
    payload.eventData.selectedContact = {};
    payload.eventData.selectedAddress = {};
  
    // Extract Internal IDs
    const resourceIds = [];
    const woResources_dt_tr = document.querySelectorAll('#woResources_dt tbody .dt-line-select');
    for (const line of woResources_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          resourceIds.push(id);
        }
      }
    }

    const vendorIds = [];
    const woVendors_dt_tr = document.querySelectorAll('#vendors tbody .dt-line-select');
    for (const line of woVendors_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          const foundObj = woRef.vendors.find(vendor => vendor.id == id);
          if (foundObj) {
            const newQty = line.parentNode.parentNode.parentNode.querySelector('.quantity').value;
            foundObj.quantityAvailable = newQty;
          }
          vendorIds.push(id);
        }
      }
    }

    const assetIds = [];
    const woAssets_dt_tr = document.querySelectorAll('#assets tbody .dt-line-select');
    for (const line of woAssets_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          const foundObj = woRef.assets.find(asset => asset.id == id);
          if (foundObj) {
            const newQty = line.parentNode.parentNode.parentNode.querySelector('.quantity').value;
            foundObj.quantity = newQty;
          }
          assetIds.push(id);
        }
      }
    }
  
    const itemIds = [];
    const woItems_dt_tr = document.querySelectorAll('#woItems_dt tbody .dt-line-select');
    for (const line of woItems_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          const foundObj = woRef.items.find(item => item.id == id);
          if (foundObj) {
            const newQty = line.parentNode.parentNode.parentNode.querySelector('.quantity').value;
            foundObj.quantity = newQty;
          }
          itemIds.push(id);
        }
      }
    }
  
    let contactId = '';
    const woContacts_dt_tr = document.querySelectorAll('#contacts tbody input[name="woContact"]');
    for (const line of woContacts_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          contactId = id;
          break;
        }
      }
    }
  
    let addressId = '';
    const woAddresses_dt_tr = document.querySelectorAll('#addresses tbody input[name="woAddress"]');
    for (const line of woAddresses_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          addressId = id;
          break;
        }
      }
    }
    
     // Filter objects by id
    payload.eventData.selectedResources = resources.filter(resource => !!resource.active && !!(resourceIds.includes(resource.employee.value)));
    payload.eventData.selectedVendors = woRef.vendors.filter(vendor => !!(vendorIds.includes(vendor.id)));
    payload.eventData.selectedAssets = woRef.assets.filter(asset => !!(assetIds.includes(asset.id)));
    payload.eventData.selectedItems = woRef.items.filter(item => !!(itemIds.includes(item.id)));
    payload.eventData.selectedContact = woRef.contacts.find(contact => contact.id == contactId) || {};
    payload.eventData.selectedAddress = woRef.addresses.find(address => address.id == addressId) || {};
    payload.eventData.contacts = woRef.contacts;
    payload.eventData.addresses = woRef.addresses;
  
    if (mode == 'create') {
      Event.createEventRecord(payload, 'eventModal');
    } else if (mode == 'edit') {
      payload.eventData.id = eventId;
      payload.eventDataSrc = JSON.parse(decodeURIComponent($('#eventModal').attr('eventDataSrc')));
      Event.updateEventRecord(payload); // Only MainForm has update
    }
  });
  
  // Main Event Form -> On Close
  $('#eventModal').on('hidden.bs.modal', ev => clearFieldValues());
  
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
    console.log('----- [Clearing Fields] -----');
    
    showCustomLoader();
  
    $(`#eventModal`).attr('mode', '');
    $(`#eventModal`).attr('woId', '');
    $(`#eventModal`).attr('eventId', '');
    $(`#eventModal`).attr('eventDataSrc', '');
    $(`#eventModal .datefrom`).val('');
    $(`#eventModal .dateto`).val('');
    $(`#eventModal .starttime`).val('');
    $(`#eventModal .endtime`).val('');
    $(`#eventModal .note`).val('');
  
    document.querySelector(`#eventModal .priority`).value = '1'; // Default Low
    document.querySelector(`#eventModal .status`).value = 'TENTATIVE'; // Default Tentative
    $(`#eventModal .alldayevent-switch`)[0].checked = false;
    
    // Clear DataTable rows
    if (temp_woResourcesDataTable) {
      $('table#woResources_dt tbody').children().remove();
      temp_woResourcesDataTable = temp_woResourcesDataTable.destroy();
    }
  
    if (temp_woVendorsDataTable) {
      $('table#vendors tbody').children().remove();
      temp_woVendorsDataTable = temp_woVendorsDataTable.destroy();
    }

    if (temp_woAssetsDataTable) {
      $('table#assets tbody').children().remove();
      temp_woAssetsDataTable = temp_woAssetsDataTable.destroy();
    }

    if (temp_woItemsDataTable) {
      $('table#woItems_dt tbody').children().remove();
      temp_woItemsDataTable = temp_woItemsDataTable.destroy();
    }
    
    if (temp_woContactsDataTable) {
      $('table#contacts tbody').children().remove();
      temp_woContactsDataTable = temp_woContactsDataTable.destroy();
    }
  
    if (temp_woAddressesDataTable) {
      $('table#addresses tbody').children().remove();
      temp_woAddressesDataTable = temp_woAddressesDataTable.destroy(); 
    }
  }
  
  function showCustomLoader() {
    $(`#eventModal .spinner`).show();
    $(`#eventModal .modal-body`).css('z-index', '-1');
  }
  
  function hideCustomLoader() {
    $(`#eventModal .spinner`).hide();
    $(`#eventModal .modal-body`).css('z-index', '1');
  }
})