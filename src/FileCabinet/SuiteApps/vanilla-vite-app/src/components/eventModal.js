import { resources, workOrders, events } from './dataSet';
import { woResourcesDtColumns, woItemsDtColumns, woContactsDtColumns, woAddressesDtColumns } from './dataTableColumns';
import { Event } from './utils';

let temp_woResourcesDataTable, temp_woItemsDataTable, temp_woContactsDataTable, temp_woAddressesDataTable;

$(document).ready(() => {
  $('#app').append(`<div class="modal fade" id="eventModal" mode="" woId="" eventId="" eventDataSrc="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventModalLabel"><strong class="table-header"></strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="spinner"></div>
        <div class="modal-body">
          <form id="eventSubmitForm" onsubmit="return validateForm()">
            <!-- First Accordion Item -->
            <div class="accordion" id="eventFirstAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeadingOne">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <!-- <strong class="grid-header">&nbsp;Primary Information</strong> -->
                    <strong class="table-header">Primary Information</strong>
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="eventHeadingOne" data-parent="#eventFirstAccordion">
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
            <!-- Second Accordion Item -->
            <div class="accordion" id="eventSecondAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeadingTwo">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <strong class="table-header">Select Available Resources</strong>
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="eventHeadingTwo" data-parent="#eventSecondAccordion">
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
            <!-- Third Accordion Item -->
            <div class="accordion" id="eventThirdAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeadingThree">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                    <strong class="table-header">Work Order Items</strong>
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="eventHeadingThree" data-parent="#eventThirdAccordion">
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
            <!-- Fourth Accordion Item -->
            <div class="accordion" id="eventFourthAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeadingFourth">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseFourth" aria-expanded="true" aria-controls="collapseFourth">
                    <strong class="table-header">Work Order Contacts</strong>
                  </button>
                </h2>
                <div id="collapseFourth" class="accordion-collapse collapse show" aria-labelledby="eventHeadingFourth" data-parent="#eventFourthAccordion">
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
            <!-- Fifth Accordion Item -->
            <div class="accordion" id="eventFifthAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="eventHeadingFifth">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapseFifth" aria-expanded="true" aria-controls="collapseFifth">
                    <strong class="table-header">Work Order Addresses</strong>
                  </button>
                </h2>
                <div id="collapseFifth" class="accordion-collapse collapse show" aria-labelledby="eventHeadingFifth" data-parent="#eventFifthAccordion">
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

  window.openEventModal = (ev, id) => {
    let woId, eventId;
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
      woId = id;
      $('#eventModal').attr('mode', 'create');
      $('#eventModal').attr('woId', woId);
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
      let woRef, eventData, modalTitle, eventTitle, activeResources;
  
      if (mode == 'create') {
        modalTitle = 'Create New Event';
        woRef = workOrders.find(wo => wo.id == woId);
        eventTitle = woRef?.title;
        activeResources = resources.all;
      }
      // Find Event Data to update from Work Orders
      else if (mode == 'edit') {
        modalTitle = 'Update Event Details';
        eventData = events.find(event => event.id == eventId);
        woRef = eventData.woRef;
        eventTitle = eventData?.title;
        activeResources = JSON.parse(JSON.stringify(resources.all));
        activeResources = activeResources.map(activeResource => {
          activeResource.selected = Boolean(eventData.resources.find(resource => activeResource.employee.value == resource.employee.value));
          return activeResource;
        });
      }
  
      console.log('***** Work Order Data *****', { woId, eventId }, { woRef, eventData });
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
            data: activeResources
          })
        },
        columns: woResourcesDtColumns,
        initComplete: () => {
          eventFormHandlers();
        }
      });
    
      temp_woItemsDataTable = $('#woItems_dt').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (mode == 'create') ? woRef.items : eventData?.items || []
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
            data: (mode == 'create') ? woRef.contacts : eventData?.contacts || []
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
            data: (mode == 'create') ? woRef.addresses : eventData?.addresses || []
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
  
    const itemIds = [];
    const woItems_dt_tr = document.querySelectorAll('#woItems_dt tbody .dt-line-select');
    for (const line of woItems_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
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
    payload.eventData.selectedResources = resources.active.filter(resource => Boolean(resourceIds.includes(resource.employee.value)));
    payload.eventData.selectedItems = woRef.items.filter(item => Boolean(itemIds.includes(item.id)));
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
    console.log('***** Clearing Fields *****');
    
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
    
    // Clear WO Resources
    if (temp_woResourcesDataTable) {
      $('table#woResources_dt tbody').children().remove();
      temp_woResourcesDataTable = temp_woResourcesDataTable.destroy();
    }
  
    // Clear DataTable rows
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