import { suiteletUrl, resourceGroups, resources, workOrders, events } from './dataSet';
import { initLeftSideBarFilters, initAvailableJobsFilters, initEventJobsFilters } from './filterHandler';
import { 
  woResourcesDtColumns, 
  woItemsDtColumns, 
  woContactsDtColumns, 
  woAddressesDtColumns, 
  ceTimeSheetsDtColumns,
  ceItemsDtColumns,
  cePunchItemsDtColumns
} from './dataTableColumns';

let temp_woResourcesDataTable,
  temp_woItemsDataTable,
  temp_woContactsDataTable,
  temp_woAddressesDataTable,
  temp_ceTimeSheetDataTable,
  temp_ceItemsDataTable,
  temp_cePunchItemsDataTable;

export class Board {

  static showBanners() {
    setTimeout(() => {

      const toasties = [
        /* {
          text: 'TBD Resource Dragging..',
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
        {
          text: 'In Progress',
          duration: 99999,
          close: true,
          gravity: 'top',
          position: 'right',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        },
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
  
  static initLayoutHandlers() {
    const leftSidebar = document.getElementById('leftSidebar');
    
    // Resizable columns functionality
    const gridContainer = document.querySelector('.grid-container');
    const baseWidth = (gridContainer.getBoundingClientRect().width * .20);
    const resizer = document.getElementById('columnResizer');
    const secondColumn = document.getElementById('secondColumn');
    const thirdColumn = document.getElementById('thirdColumn');
    // Collapsible sidebar functionality
    const toggleLeft = document.getElementById('toggleLeft');
    const collapseLeft = document.getElementById('collapseLeft');
    
    collapseLeft.style.display = 'block';
    leftSidebar.style.width = '18%';
    
    toggleLeft.addEventListener('click', el => {
      if (collapseLeft.style.display === 'none' || collapseLeft.style.display === '') {
        collapseLeft.style.display = 'block';
        leftSidebar.style.width = '18%'; // Adjust width as needed
        toggleLeft.classList.remove('fa-square-caret-right');
        toggleLeft.classList.add('fa-square-caret-left');
      } else {
        collapseLeft.style.display = 'none';
        leftSidebar.style.width = '0'; // Adjust width as needed
        toggleLeft.classList.remove('fa-square-caret-left');
        toggleLeft.classList.add('fa-square-caret-right');
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

    initLeftSideBarFilters(resources);
    initAvailableJobsFilters(workOrders);
    initEventJobsFilters(events);
  }

  static holdWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;

    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`${suiteletUrl}&mode=holdWorkOrder&woId=${woId}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          Swal.fire({
            title: 'Success!',
            text: `Work Order Status has been set to Hold`,
            icon: 'success'
          });
          Swal.hideLoading();
          window.location.reload();
        })
        .catch(error => {
          Swal.fire(
            'Unexpected Error',
            error.message,
            'error'
          );
          Swal.hideLoading();
        });
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      text: 'Updating Work Order Status to Hold'
    });
  }
  
  static cancelWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`${suiteletUrl}&mode=cancelWorkOrder&woId=${woId}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          Swal.fire({
            title: 'Success!',
            text: `Work Order Status has been set to Closed`,
            icon: 'success'
          });
          Swal.hideLoading();
          window.location.reload();
        })
        .catch(error => {
          Swal.fire(
            'Unexpected Error',
            error.message,
            'error'
          );
          Swal.hideLoading();
        });
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      text: 'Updating Work Order Status to Closed'
    });
  }
  
  static printWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    console.log('printWorkOrder', `${suiteletUrl}&mode=printWorkOrder&woId=${woId}`)
    window.open(`${suiteletUrl}&mode=printWorkOrder&woId=${woId}`);
  }
  
  static printPickList(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printPickList&woId=${woId}`);
  }
}

export class Calendar {
  
}

export class Event {
  /* 
    MainForm
    - initialize
      - onload
      - submit
      - hide
  */
  static MainForm() {

    return {
      initialize: () => {
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
        $('#eventModal').on('shown.bs.modal', ev => {
          setTimeout(() => {
            _hideCustomLoader('eventModal');

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
                Event._eventFormHandlers();
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
                Event._eventFormHandlers();
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
            Event._createEventRecord(payload, 'eventModal');
          } else if (mode == 'edit') {
            payload.eventData.id = eventId;
            payload.eventDataSrc = JSON.parse(decodeURIComponent($('#eventModal').attr('eventDataSrc')));
            Event._updateEventRecord(payload); // Only MainForm has update
          }
        });

        // Main Event Form -> On Close
        $('#eventModal').on('hidden.bs.modal', ev => Event._clearFieldValues('eventModal'));
      }
    }
  }
  /* 
    GeneralEventForm
    - initialize
      - onload
      - submit
      - hide
  */
  static GeneralEventForm() {
    
    return {
      initialize: () => {
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
            _hideCustomLoader('generalEventModal');

            temp_woResourcesDataTable = $('#woResources_dt_ge').DataTable({
              processing: true,
              retrieve: true,
              ajax(data, callback, settings) {
                callback({
                  data: resources.active
                })
              },
              columns: woResourcesDtColumns,
              initComplete: () => {
                Event._eventFormHandlers();
              }
            });
          }, 250);
        });
   
        // General Event Form -> On Submit
        $('#generalEventSubmitForm').on('submit', ev => {
          ev.preventDefault();
          
          const payload = {
            eventData: {},
            woRef: {}
          };
          payload.eventData.title = $('#generalEventModal input.eventTitle').val();
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
          const woResources_dt_tr = document.querySelectorAll('#woResources_dt_ge tbody .dt-line-select');
          for (const line of woResources_dt_tr) {
            if (line.checked) {
              const id = line.getAttribute('recordid');
              if (id) {
                resourceIds.push(id);
              }
            }
          }
    
          payload.eventData.selectedResources = resources.active.filter(resource => Boolean(resourceIds.includes(resource.employee.value)));
          Event._createEventRecord(payload, 'generalEventModal');
        });
  
        // General Event Form -> On Close
        $('#generalEventModal').on('hidden.bs.modal', ev => Event._clearFieldValues('generalEventModal'));
      }
    }
  }

  static CompleteEventForm() {

    return {
      initialize:() => {
        // Load Complete Event Form

        $('#completeEventModal').on('shown.bs.modal', ev => {
          const eventId = $('#completeEventModal').attr('eventId');
          const eventData = events.find(event => event.id == eventId);
          const woRef = eventData.woRef;
          const woId = woRef.id;

          $('#completeEventModal').attr('woId', woId);
          $('#completeEventModal').attr('eventDataSrc', encodeURIComponent(JSON.stringify(eventData))); // Data from NS

          $('#completeEventModal .eventTitle p').html(`<a href="${eventData.url}" target="_blank">${eventData.title}</a>`); 
          $('#completeEventModal .title p').html(`<a href="${woRef.woUrl}" target="_blank">${woRef.title}</a>`);
          $('#completeEventModal .project p').html(`<a href="${woRef.projectUrl}" target="_blank">${woRef.project.text}</a>`);
          $('#completeEventModal .status p').text(eventData.status.text);

          temp_ceTimeSheetDataTable = $('#timeSheets_dt').DataTable({
            processing: true,
            retrieve: true,
            info: false,
            ajax(_data, callback, _settings) {
              callback({
                data: eventData.resources
              })
            },
            columns: ceTimeSheetsDtColumns
          });

          temp_ceItemsDataTable = $('#woItems_dt_ce').DataTable({
            processing: true,
            retrieve: true,
            info: false,
            ajax(_data, callback, _settings) {
              callback({
                data: eventData.items
              })
            },
            columns: ceItemsDtColumns,
            initComplete: () => {  
              Event._eventFormHandlers();
            }
          });

          // Fetch order punch list
          /* $('#completeEventModal').attr('punchLines', encodeURIComponent('[]'));
          temp_cePunchItemsDataTable = $('#punchItems_dt').DataTable({
            processing: true,
            retrieve: true,
            searching: false,
            paging: false, 
            info: false,
            ajax(_data, callback, _settings) {
              callback({
                data: []
              })
            },
            columns: cePunchItemsDtColumns,
            initComplete: () => {  
              Event._completeEventFormHandlers();
              _hideCustomLoader('completeEventModal');
            }
          }); */
          fetch(
            `${suiteletUrl}&mode=getOrderPunchList&woId=${woId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
          })
          .then(response => response.json())
          .then(result => {
            $('#completeEventModal').attr('punchLines', encodeURIComponent(JSON.stringify(result)));

            temp_cePunchItemsDataTable = $('#punchItems_dt').DataTable({
              processing: true,
              retrieve: true,
              searching: false,
              paging: false, 
              info: false,
              ajax(_data, callback, _settings) {
                callback({
                  data: result
                })
              },
              columns: cePunchItemsDtColumns,
              initComplete: () => {  
                Event._completeEventFormHandlers();
                _hideCustomLoader('completeEventModal');
              }
            });
          })
          .catch(error => {
            Swal.fire(
              'Unexpected Error',
              error.message,
              'error'
            );
            _hideCustomLoader('completeEventModal');
          });
        });
   
        // General Event Form -> On Submit
        $('#completeEventSubmitForm').on('submit', ev => {
          ev.preventDefault();
          
          const payload = {
            eventDataSrc: {},
            timeSheets: [],
            fulfillItems: []
          }

          payload.eventDataSrc = JSON.parse(decodeURIComponent($('#completeEventModal').attr('eventDataSrc')));
          const punchLines = JSON.parse(decodeURIComponent($('#completeEventModal').attr('punchLines')));
          const eventId = payload.eventDataSrc.id;

          $('#timeSheets_dt tbody > tr').each(function() {
            payload.timeSheets.push({
              id: $(this).find('.resourceName p').attr('recordId'),
              location: $(this).find('.resourceName p').attr('locationId'),
              startTime: $(this).find('.starttime').val(),
              endTime:$(this).find('.endtime').val(),
              awayHrs: $(this).find('.away-hrs').val(),
              awayMins: $(this).find('.away-mins').val(),
              otHrs: $(this).find('.ot-hrs').val(),
              otMins: $(this).find('.ot-mins').val(),
              dtHrs: $(this).find('.dt-hrs').val(),
              dtMins: $(this).find('.dt-mins').val(),
              notes: $(this).find('.note').val(),
            });
          });

          $('#woItems_dt_ce tbody > tr').each(function() {
            const customRecordId = $(this).find('.dt-line-select').attr('recordId');
            const checked = $(this).find('.dt-line-select')[0].checked;
            const lineId = $(this).find('.lineId').text();
            const quantity = +$(this).find('.itemQty').text();
            const completeQty = +$(this).find('.completeQty').val();
            if (checked) {
              payload.fulfillItems.push({ customRecordId, lineId, quantity, completeQty });
            }
          });

          console.log('payload', payload);

          if (punchLines.length) {
            // TBD
          }

          Swal.fire({
            title: 'Complete Event?',
            text: `This will fulfill order items for Event ID ${eventId}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#817c7c',
            confirmButtonText: 'Yes'
          })
          .then(result => {
            if (result.isConfirmed) {
              Swal.fire({
                didOpen: () => {
                  Swal.showLoading();
                  fetch(
                    `${suiteletUrl}&mode=completeEvent`, {
                      method: 'POST',
                      body: JSON.stringify(payload),
                      headers: {
                        'Content-Type': 'application/json',
                      }
                  })
                  .then(response => response.json())
                  .then(result => {
                    if (result.code == 200) {
                      Swal.fire({
                        title: 'Success!',
                        text: `Event ID ${eventId} Completed`,
                        icon: 'success'
                      })
                      .then(() => {
                        window.location.reload();
                      });
                    } else {
                      Swal.fire({
                        title: 'Unexpected Error',
                        text: `Error: ${result.errorMsg}`,
                        icon: 'error'
                      });
                    }
                    Swal.hideLoading();
                  })
                  .catch(error => {
                    Swal.fire(
                      'Unexpected Error',
                      error.message,
                      'error'
                    );
                    Swal.hideLoading();
                  });
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                text: `Completing Event ID ${eventId}...`
              });
            }
          });
        });
  
        // General Event Form -> On Close
        $('#completeEventModal').on('hidden.bs.modal', ev => Event._clearFieldValues('completeEventModal'));
      }
    }
  }

  static _eventFormHandlers() {
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

  static _completeEventFormHandlers() {
    window.completeAll = () => {
      $('#woItems_dt_ce tbody > tr').each(function() {
        const quantity = +$(this).find('.itemQty').text();
        +$(this).find('.completeQty').val(quantity);
      });
    }

    window.clearAll = () => {
      $('#woItems_dt_ce tbody > tr').each(function() {
        +$(this).find('.completeQty').val(0);
      });
    }
  }

  static _clearFieldValues(modalId) {
    console.log('***** Clearing Fields *****', modalId);
    
    _showCustomLoader(modalId);

    if (modalId.match(/eventModal|generalEventModal/g)) {
      $(`#${modalId}`).attr('mode', '');
      $(`#${modalId}`).attr('woId', '');
      $(`#${modalId}`).attr('eventId', '');
      $(`#${modalId}`).attr('eventDataSrc', '');
      $(`#${modalId} .datefrom`).val('');
      $(`#${modalId} .dateto`).val('');
      $(`#${modalId} .starttime`).val('');
      $(`#${modalId} .endtime`).val('');
      $(`#${modalId} .note`).val('');
    
      document.querySelector(`#${modalId} .priority`).value = '1'; // Default Low
      document.querySelector(`#${modalId} .status`).value = 'TENTATIVE'; // Default Tentative
      $(`#${modalId} .alldayevent-switch`)[0].checked = false;
      
      // Clear WO Resources
      if (temp_woResourcesDataTable) {
        if (modalId == 'eventForm') {
          $('table#woResources_dt tbody').children().remove();
        } else if (modalId == 'generalEventForm') {
          $('table#woResources_dt_ge tbody').children().remove();
        }
        temp_woResourcesDataTable = temp_woResourcesDataTable.destroy();
      }
    
      // Clear DataTable rows
      if (temp_woItemsDataTable) {
        if (modalId == 'eventModal') {
          $('table#woItems_dt tbody').children().remove();
        }
        temp_woItemsDataTable = temp_woItemsDataTable.destroy();
      }
      
      if (modalId == 'eventModal') {
        if (temp_woContactsDataTable) {
          $('table#contacts tbody').children().remove();
          temp_woContactsDataTable = temp_woContactsDataTable.destroy();
        }

        if (temp_woAddressesDataTable) {
          $('table#addresses tbody').children().remove();
          temp_woAddressesDataTable = temp_woAddressesDataTable.destroy(); 
        }
      }
    }

    if (modalId == 'completeEventModal') {
      $(`#${modalId}`).attr('eventId', '');
      $(`#${modalId}`).attr('woId', '');
      $(`#${modalId}`).attr('eventDataSrc', '');
      $(`#${modalId}`).attr('punchLines', '');
      $(`#${modalId} eventTitle p`).html('');
      $(`#${modalId} title p`).html('');
      $(`#${modalId} project p`).html('');
      $(`#${modalId} status p`).html('');

      if (temp_ceTimeSheetDataTable) {
        $('table#timeSheets_dt tbody').children().remove();
        temp_ceTimeSheetDataTable = temp_ceTimeSheetDataTable.destroy(); 
      }

      if (temp_ceItemsDataTable) {
        $('table#woItems_dt_ce tbody').children().remove();
        temp_ceItemsDataTable = temp_ceItemsDataTable.destroy(); 
      }

      if (temp_cePunchItemsDataTable) {
        $('table#punchItems_dt tbody').children().remove();
        temp_cePunchItemsDataTable = temp_cePunchItemsDataTable.destroy(); 
      }
    }
  }

  static _createEventRecord(payload, modalId) {
    console.log('***** _createEventRecord() -> PAYLOAD *****', payload);

    Swal.fire({
      title: 'Create Event Record?',
      text: payload.woRef?.name ? `Create Event for Work Order : ${payload.woRef.name}` : 'Create Event',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(
              `${suiteletUrl}&mode=createEventRecord`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(result => {
               if (result.code == 200) {
                Swal.fire({
                  title: 'Success!',
                  text: `New Event Record ID ${result.recordId} has been created`,
                  icon: 'success'
                })
                .then(() => {
                  $(`#${modalId}`).modal('hide');
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Unexpected Error',
                  text: `Error: ${result.errorMsg}`,
                  icon: 'error'
                });
              }
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          text: 'Creating Event Record...'
        });
      }
    });
  }

  static _updateEventRecord(payload) {
    console.log('***** _updateEventRecord() -> PAYLOAD *****', payload);

    Swal.fire({
      title: `Update Event Record?`,
      text: `Event Record ID ${payload.eventData.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(
              `${suiteletUrl}&mode=updateEventRecord`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(result => {
              if (result.code == 200) {
                Swal.fire({
                  title: 'Success!',
                  text: `Event Record ID ${payload.eventData.id} has been updated`,
                  icon: 'success'
                })
                .then(() => {
                  $(`#eventModal`).modal('hide');
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Unexpected Error',
                  text: `Error: ${result.errorMsg}`,
                  icon: 'error'
                });
              }
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          text: `Updating Event Record ID ${payload.eventData.id}...`
        });
      }
    });
  }

  static deleteEventRecord(ev) {
    const eventId = ev.target.closest('.card-item').getAttribute('id');
    console.log('deleteEventRecord() > Event ID', eventId);

    Swal.fire({
      title: `Delete Event Record ID ${eventId}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(`${suiteletUrl}&mode=deleteEventRecord&id=${eventId}`, { 
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json())
            .then(result => {
              Swal.fire({
                title: 'Deleted!',
                text: `Event Record ID ${eventId} has been deleted`,
                icon: 'success'
              })
              .then(() => {
                window.location.reload();
              });
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: true,
          text: `Deleting Event Record ID ${eventId}...`
        });
      }
    });
  }
}

const _showCustomLoader = modalId => {
  $(`#${modalId} .spinner`).show();
  $(`#${modalId} .modal-body`).css('z-index', '-1');
}

const _hideCustomLoader = modalId => {
  $(`#${modalId} .spinner`).hide();
  $(`#${modalId} .modal-body`).css('z-index', '1');
}