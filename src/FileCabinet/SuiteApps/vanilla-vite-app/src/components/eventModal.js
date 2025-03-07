import * as dataSet from './dataSet';
import { resourcesDtColumns, vendorsDtColumns, assetsDtColumns, itemsDtColumns, contactsDtColumns, addressesDtColumns } from './dataTableColumns';
import { Event } from './utils';
import './eventModal.css';

let temp_resourcesDataTable, temp_vendorsDataTable, temp_assetsDataTable, temp_itemsDataTable, temp_contactsDataTable, temp_addressesDataTable;

$(document).ready(() => {
  $('#app').append(`<div class="modal fade" id="eventModal" mode="" woId="" eventId="" oldEventData="" calendarEventDrop="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
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
                              <option value="COMPLETED">Completed</option>
                            </select>
                          </td>
                          <td>
                            <table width="100%">
                              <tr>
                                <td width="25%">
                                  <div class="d-flex align-items-center ms-3">
                                    <div class="form-check form-switch w-100" style="margin-top: 10px; margin-left: 20px; display: flex; align-items: center;">
                                      <input class="form-check-input me-2 allday-toggle" type="checkbox">
                                      <label class="form-check-label" style="font-size: 11px; margin: 0; align-self: flex-end;">All Day</label>
                                    </div>
                                  </div>
                                </td>
                                <td width="75%">
                                  <div class="d-flex align-items-right ms-3">
                                    <div class="form-check form-switch w-100" style="margin-top: 10px; margin-left: 20px; display: flex; align-items: center;">
                                      <input class="form-check-input me-2 asset-maintenance-toggle" type="checkbox">
                                      <label class="form-check-label" style="font-size: 11px; margin: 0; align-self: flex-end;">Asset Maintenance</label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
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
                    <strong class="table-header">Resources</strong>
                  </button>
                </h2>
                <div id="collapse2nd" class="accordion-collapse collapse show" aria-labelledby="eventHeading2nd" data-parent="#event2ndAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="resources">
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
                    <strong class="table-header">Vendor Subcontractors</strong>
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
                    <strong class="table-header">Assets</strong>
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
                      <table class="table table-striped" id="items">
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

  window.openEventModal = (ev, woId, eventId, calendarEventDrop) => {
    if (ev) {
      const dataTransfer = ev?.dataTransfer;
      if (dataTransfer) {
        const dataTransferObj = JSON.parse(dataTransfer.getData('text'));
        woId = dataTransferObj.id;
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
        if (!!calendarEventDrop) {
          $('#eventModal').attr('calendarEventDrop', encodeURIComponent(JSON.stringify(calendarEventDrop)));
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
  // Main Event Form -> On Load
  $('#eventModal').on('shown.bs.modal', function (ev) {
    setTimeout(() => {
      hideCustomLoader();

      const mode = $('#eventModal').attr('mode');
      let woId = $('#eventModal').attr('woId');
      const eventId = $('#eventModal').attr('eventId');
      let calendarEventDrop = $('#eventModal').attr('calendarEventDrop');
      let woRef, eventData, modalTitle, eventTitle;

      if (mode === 'create') {
        modalTitle = `Create Event [WO ID ${woId}]`;
        woRef = dataSet.workOrders.find(wo => wo.id == woId);
        eventTitle = woRef?.title;

        if (!!calendarEventDrop) {
          calendarEventDrop = JSON.parse(decodeURIComponent(calendarEventDrop));
          $('#eventModal .datefrom').val(calendarEventDrop.date.start);
          $('#eventModal .dateto').val(calendarEventDrop.date.end);
          $('#eventModal .starttime').val(calendarEventDrop.time.start);
          $('#eventModal .endtime').val(calendarEventDrop.time.end);
          calendarEventDrop.resourceType === 'asset'
            && setTimeout(() => {
              const toggleEl = $('#eventModal .asset-maintenance-toggle');
              toggleEl.prop('checked', true).change();
              toggleEl.prop('disabled', true);
            });
        }
      } else if (mode === 'edit') { // Find Event Data to update from Work Orders
        modalTitle = `Update Event Details [ID ${eventId}]`;
        eventData = dataSet.events.find(event => event.id == eventId);
        woRef = eventData.woRef;
        woId = woRef.id;
        eventTitle = eventData?.title;
      }

      console.log('----- [Work Order Data] -----', { woId, eventId }, { woRef, eventData });
      $('#eventModal .modal-title').text(modalTitle); // Set Modal Title
      $('#eventModal input.eventTitleInput').val(eventTitle); // Set primary info

      if (woRef.id) {
        $('#eventModal .title p').html(`<a href="${woRef.woUrl}" target="_blank">${woRef.title}</a>`);
        $('#eventModal .project p').html(`<a href="${woRef.projectUrl}" target="_blank">${woRef.project.text}</a>`);
      }

      if (mode === 'edit') {
        if (eventData) {
          $('#eventModal').attr('woId', eventData.workorder.value);
          $('#eventModal').attr('oldEventData', encodeURIComponent(JSON.stringify(eventData))); // Data from NS
          $('#eventModal .datefrom').val(eventData.date.start);
          $('#eventModal .dateto').val(eventData.date.end);
          $('#eventModal .starttime').val(eventData.time.start);
          $('#eventModal .endtime').val(eventData.time.end);
          $('#eventModal .note').val(eventData.note);
          // $('#eventModal .allday-toggle').prop('checked', eventData.allDay ? 'checked' : '');
          $('#eventModal .status').val(eventData.status.value);
          $('#eventModal .priority').val(eventData.priority.value);
          $('#eventModal .asset-maintenance-toggle').prop('checked', eventData.assetMaintenance).change();
        }
      }

      // Set DataTable values
      $.fn.dataTable.ext.errMode = 'none';

      temp_resourcesDataTable = $('#resources').DataTable({
        dom: '<"d-flex justify-content-between align-items-center"<"left-col"l><"middle-col"><"right-col"f>>tip',
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              const woResourcesFiltered = dataSet.woResources.filter(resource => resource.workorder.value == woId);

              if (mode === 'create') {
                if (!!calendarEventDrop) {
                  return dataSet.activeResources.map(resource => {
                    const _resource = deepCopy(resource);
                    if (calendarEventDrop.selectedResourceId == resource.id) {
                      _resource.selected = true;
                      _resource.time = calendarEventDrop.time;
                    }
                    return _resource;
                  });
                } else {
                  // Combine employees and WO resources
                  return dataSet.activeResources.map(resource => {
                    const id = resource.id;
                    const foundObj = woResourcesFiltered.find(woResource => woResource.employee.value == id);
                    if (foundObj) {
                      resource = deepCopy(foundObj);
                    }
                    return resource;
                  });
                }
              } else if (mode === 'edit') {
                // Combine employees and WO resources and Event resources
                return dataSet.activeResources.map(resource => {
                  const id = resource.id;
                  let foundObj = woResourcesFiltered.find(woResource => woResource.employee.value == id);
                  if (foundObj) {
                    resource = deepCopy(foundObj);
                  }
                  foundObj = eventData.resources.find(eventResource => eventResource.employee.value == id);
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

      temp_vendorsDataTable = $('#vendors').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                if (!!calendarEventDrop) {
                  return dataSet.vendors.map(vendor => {
                    const _vendor = deepCopy(vendor);
                    if (calendarEventDrop.selectedVendorId == _vendor.id) {
                      _vendor.selected = true;
                    }
                    return _vendor;
                  })
                } else {
                  return dataSet.vendors;
                }
              } else if (mode === 'edit') {
                // Combine vendors and WO vendors
                const unassignedVendors = deepCopy(dataSet.vendors)
                  .filter(vendor => !eventData.vendors.map(vendor => vendor.vendor.value)
                    .includes(vendor.id));
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

      temp_assetsDataTable = $('#assets').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                if (!!calendarEventDrop) {
                  return dataSet.assets
                    .filter(asset => !asset.onMaintenance)
                    .map(asset => {
                      const _asset = deepCopy(asset);
                      if (calendarEventDrop.selectedAssetId == _asset.id) {
                        _asset.selected = true;
                        _asset.time = calendarEventDrop.time;
                      }
                      return _asset;
                    })
                } else {
                  return dataSet.assets.filter(asset => !asset.onMaintenance);
                }
              } else if (mode === 'edit') {
                // Combine assets and WO assets
                const unassignedAssets = deepCopy(dataSet.assets)
                  .filter(asset => !asset.onMaintenance && !eventData.assets.map(asset => asset.asset.value)
                    .includes(asset.id));
                /* unassignedAssets.map(asset => {
                  asset.selected = true;
                  return asset;
                }) */
                // console.log('unassignedAssets', unassignedAssets);
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

      temp_itemsDataTable = $('#items').DataTable({
        processing: true,
        retrieve: true,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                return woRef.items.filter(item => !item.event);
              } else {
                let unassignedItems = deepCopy(woRef.items.filter(item => !item.event));
                unassignedItems = unassignedItems.filter(item => !eventData.items.map(item => item.item.value).includes(item.item.value));
                return [...eventData.items, ...unassignedItems];
              }
            })()
          })
        },
        columns: itemsDtColumns,
        initComplete: () => {
          eventFormHandlers();
        }
      });

      temp_contactsDataTable = $('#contacts').DataTable({
        processing: true,
        retrieve: true,
        searching: false,
        paging: false,
        info: false,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                // return woRef.contacts.filter(contact => !contact.event);
                let contacts = woRef.contacts.filter(contact => !contact.event);
                if (!contacts.length) {
                  let contactsWithEvents = woRef.contacts.filter(contact => !!contact.event);
                  const merged = Object.values(
                    contactsWithEvents.reduce((acc, contact) => {
                      acc[contact.name] = { ...contact };
                      return acc;
                    }, {})
                  );
                  contacts = merged;
                }
                return contacts;
              } else {
                let unassignedContacts = deepCopy(woRef.contacts.filter(contact => !contact.event));
                unassignedContacts = unassignedContacts.filter(contact => !eventData.contacts.map(contact => contact.contact.value).includes(contact.contact.value));
                return [...eventData.contacts, ...unassignedContacts];
              }
            })()
          })
        },
        columns: contactsDtColumns
      });

      temp_addressesDataTable = $('#addresses').DataTable({
        processing: true,
        retrieve: true,
        searching: false,
        paging: false,
        info: false,
        ajax(_data, callback, _settings) {
          callback({
            data: (() => {
              if (mode === 'create') {
                return deepCopy(woRef.addresses).map(address => {
                  address.selected = woRef.addresses.length == 1;
                  return address;
                });
              } else {
                return deepCopy(eventData.addresses).map(address => {
                  address.selected = address.id == eventData.address.value;
                  return address;
                });
              }
            })()
          })
        },
        columns: addressesDtColumns
      });

      Event.handleAllDayToggle('#eventModal');
      Event.handleAssetMaintenanceToggle('#eventModal', mode, [
        temp_resourcesDataTable,
        temp_vendorsDataTable
      ]);
      Event.validateResourcesOnLoad('#wo-primaryinfo', '#resources', eventId);
      Event.validateOnHeaderFieldChange('#wo-primaryinfo', '#resources', eventId, 'eventResource');
      Event.validateOnLineFieldChange('#wo-primaryinfo', '#resources');

      Event.validateResourcesOnLoad('#wo-primaryinfo', '#assets', eventId);
      Event.validateOnHeaderFieldChange('#wo-primaryinfo', '#assets', eventId, 'eventResource');
      Event.validateOnLineFieldChange('#wo-primaryinfo', '#assets');
    }, 250);
  });

  // Main Event Form -> On Submit
  $('#eventSubmitForm').on('submit', ev => {
    ev.preventDefault();

    const mode = $('#eventModal').attr('mode');
    const woId = $('#eventModal').attr('woId');
    const eventId = $('#eventModal').attr('eventId');
    const eventData = dataSet.events.find(event => event.id == eventId);
    const woRef = dataSet.workOrders.find(wo => wo.id == woId);
    const woResourcesFiltered = dataSet.woResources.filter(resource => resource.workorder.value == woId);
    let resourcesToUse = [], vendorsToUse = [], assetsToUse = [];

    if (mode === 'create') {
      resourcesToUse = dataSet.activeResources.map(resource => {
        const id = resource.id;
        const foundObj = woResourcesFiltered.find(woResource => woResource.employee.value == id);
        if (foundObj) {
          resource = deepCopy(foundObj);
        }
        return resource;
      });

      vendorsToUse = dataSet.vendors;
      assetsToUse = dataSet.assets;
    } else {
      resourcesToUse = dataSet.activeResources.map(resource => {
        const id = resource.id;
        let foundObj = woResourcesFiltered.find(woResource => woResource.employee.value == id);
        if (foundObj) {
          resource = deepCopy(foundObj);
        }
        foundObj = eventData.resources.find(eventResource => eventResource.employee.value == id);
        if (foundObj) {
          resource = deepCopy(foundObj);
        }
        return resource;
      });

      let unassignedVendors = deepCopy(dataSet.vendors)
        .filter(vendor => !eventData.vendors.map(vendor => vendor.vendor.value)
          .includes(vendor.id));
      unassignedVendors = [...eventData.vendors, ...unassignedVendors];
      vendorsToUse = unassignedVendors;

      let unassignedAssets = deepCopy(dataSet.assets)
        .filter(asset => !eventData.assets.map(asset => asset.asset.value)
          .includes(asset.id));
      unassignedAssets = [...eventData.assets, ...unassignedAssets];
      assetsToUse = unassignedAssets;
    }

    const payload = {
      oldEventData: {},
      woRef,
      eventData: {},
      woResources: woResourcesFiltered
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
    payload.eventData.allDay = $('#eventModal .allday-toggle').prop('checked');
    payload.eventData.assetMaintenance = $('#eventModal .asset-maintenance-toggle').prop('checked');
    payload.eventData.status = $('#eventModal .status').val();
    payload.eventData.priority = $('#eventModal .priority').val();
    payload.eventData.selectedResources = [];
    payload.eventData.selectedVendors = [];
    payload.eventData.selectedAssets = [];
    payload.eventData.selectedItems = [];
    payload.eventData.selectedContacts = [];
    payload.eventData.selectedAddress = {};

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
              const startTime = $(node).find('input.starttime-row').val();
              const endTime = $(node).find('input.endtime-row').val();
              foundObj.time.start = startTime;
              foundObj.time.end = endTime;
            }
            resourceIds.push(id);
          }
        }
      });
    }

    const vendorIds = [];
    if (temp_vendorsDataTable) {
      const vendors_dt_tr = temp_vendorsDataTable.rows({ search: 'applied' }).nodes();
      vendors_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          if (id) {
            const foundObj = vendorsToUse.find(vendor => vendor.id == id);
            if (foundObj) {
              const newQty = +$(node).find('.quantity').val();
              const memo = $(node).find('.note').val();
              foundObj.quantityRequired = newQty;
              foundObj.memo = memo;
            }
            vendorIds.push(id);
          }
        }
      });
    }

    const assetIds = [];
    if (temp_assetsDataTable) {
      const assets_dt_tr = temp_assetsDataTable.rows({ search: 'applied' }).nodes();
      assets_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          if (id) {
            const foundObj = assetsToUse.find(resource => resource.id == id);
            if (foundObj) {
              const newQty = +$(node).find('.quantity').val();
              foundObj.quantity = newQty;
              const startTime = $(node).find('input.starttime-row').val();
              const endTime = $(node).find('input.endtime-row').val();
              foundObj.time.start = startTime;
              foundObj.time.end = endTime;
            }
            assetIds.push(id);
          }
        }
      });
    }

    const itemIds = [];
    if (temp_itemsDataTable) {
      const items_dt_tr = temp_itemsDataTable.rows({ search: 'applied' }).nodes();
      items_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          if (id) {
            const foundObj = woRef.items.find(item => item.id == id);
            if (foundObj) {
              const newQty = +$(node).find('.quantity').val();
              foundObj.quantity = newQty;
            }
            itemIds.push(id);
          }
        }
      });
    }

    const contactIds = [];
    if (temp_contactsDataTable) {
      const contacts_dt_tr = temp_contactsDataTable.rows({ search: 'applied' }).nodes();
      contacts_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          if (id) {
            contactIds.push(id);
          }
        }
      });
    }

    let addressId = '';
    if (temp_addressesDataTable) {
      const addresses_dt_tr = temp_addressesDataTable.rows({ search: 'applied' }).nodes();
      addresses_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          if (id) {
            addressId = id;
            return;
          }
        }
      });
    }

    // Filter only items that needs update
    payload.eventData.selectedResources = resourcesToUse.filter(resource => !!resourceIds.includes(resource.id));
    payload.eventData.selectedVendors = vendorsToUse.filter(vendor => !!vendorIds.includes(vendor.id));
    payload.eventData.selectedAssets = assetsToUse.filter(asset => !!assetIds.includes(asset.id));
    payload.eventData.selectedItems = woRef.items.filter(item => !!itemIds.includes(item.id));
    payload.eventData.selectedContacts = woRef.contacts.filter(contact => !!contactIds.includes(contact.id));
    payload.eventData.selectedAddress = woRef.addresses.find(address => address.id == addressId) || {};
    payload.eventData.addresses = woRef.addresses;

    if (mode === 'create') {
      Event.createEventRecord(payload, 'eventModal');
    } else if (mode === 'edit') {
      payload.eventData.id = eventId;
      payload.oldEventData = JSON.parse(decodeURIComponent($('#eventModal').attr('oldEventData')));
      Event.updateEventRecord(payload, 'eventModal');
    }
  });

  // Main Event Form -> On Close
  $('#eventModal').on('hidden.bs.modal', ev => clearFieldValues());

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
    const entriesLabel = $(`#resources_wrapper div.dt-length`);
    entriesLabel.addClass('d-flex align-items-center mb-2'); // Align entries label with search bar
    const dtSearch = $(`#resources_wrapper .dt-search`);
    dtSearch.addClass('d-flex align-items-center mb-2'); // Align search bar as well
    // Add filter icon beside the entries label
    entriesLabel.append(`
      <div class="d-flex align-items-center">
        <i class="fa-solid fa-filter filter-icon" style="font-size: 20px; margin-left: 20px" title="Filter" data-bs-toggle="modal" data-bs-target="#filterFieldEventResource"></i>
        <span class="badge badge-danger badge-pill counter" style="font-size: 8px" id="filter-eventresource-counter">0</span>
      </div>
    `);
  }

  function clearFieldValues() {
    console.log('----- [Clearing Fields] -----');
    window.clearFilters('#filterFieldEventResource');
    showCustomLoader();

    $(`#eventModal`).attr('mode', '');
    $(`#eventModal`).attr('woId', '');
    $(`#eventModal`).attr('eventId', '');
    $(`#eventModal`).attr('oldEventData', '');
    $(`#eventModal`).attr('calendarEventDrop', '');
    $(`#eventModal .datefrom`).val('');
    $(`#eventModal .dateto`).val('');
    $(`#eventModal .starttime`).val('');
    $(`#eventModal .endtime`).val('');
    $(`#eventModal .note`).val('');
    $('#eventModal .priority').val('1').change(); // Default Low
    $('#eventModal .status').val('TENTATIVE').change(); // Default Tentative
    $('#eventSubmitForm input[type="checkbox"]').prop('checked', false).change();

    // Clear DataTable rows
    if (temp_resourcesDataTable) {
      $('table#resources tbody').children().remove();
      temp_resourcesDataTable = temp_resourcesDataTable.destroy();
    }

    if (temp_vendorsDataTable) {
      $('table#vendors tbody').children().remove();
      temp_vendorsDataTable = temp_vendorsDataTable.destroy();
    }

    if (temp_assetsDataTable) {
      $('table#assets tbody').children().remove();
      temp_assetsDataTable = temp_assetsDataTable.destroy();
    }

    if (temp_itemsDataTable) {
      $('table#items tbody').children().remove();
      temp_itemsDataTable = temp_itemsDataTable.destroy();
    }

    if (temp_contactsDataTable) {
      $('table#contacts tbody').children().remove();
      temp_contactsDataTable = temp_contactsDataTable.destroy();
    }

    if (temp_addressesDataTable) {
      $('table#addresses tbody').children().remove();
      temp_addressesDataTable = temp_addressesDataTable.destroy();
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

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
})