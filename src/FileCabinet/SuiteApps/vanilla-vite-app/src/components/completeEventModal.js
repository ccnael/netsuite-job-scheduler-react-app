import './completeEventModal.css';
import { suiteletUrl, events } from './dataSet';
import {  ceTimeSheetsDtColumns, ceItemsDtColumns, cePunchItemsDtColumns } from './dataTableColumns';

let temp_ceTimeSheetDataTable, temp_ceItemsDataTable, temp_cePunchItemsDataTable;

$(document).ready(() => {
  $('#app').append(`<div class="modal fade" id="completeEventModal" woId="" eventId="" punchLines="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="completeEventModalLabel">Complete Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="spinner"></div>
        <div class="modal-body">
          <form id="completeEventSubmitForm" onsubmit="return validateForm()">
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">Event Title</th>
                    <th class="text-center">Work Order</th>
                    <th class="text-center">Project</th>
                    <th class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center eventTitle"><p></p></td>
                    <td class="text-center title"><p></p></td>
                    <td class="text-center project"><p></p></td>
                    <td class="text-center status"><p></p></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- First Accordion Item -->
            <div class="accordion" id="completeEventFirstAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="completeEventHeadingFirst">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapseFirst" aria-expanded="true" aria-controls="completeEventCollapseFirst">
                    <strong class="table-header">Time Sheets</strong>
                  </button>
                </h2>
                <div id="completeEventCollapseFirst" class="accordion-collapse collapse show" aria-labelledby="completeEventHeadingFirst" data-parent="#completeEventFirstAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="timeSheets_dt">
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
            <!-- Second Accordion Item -->
            <div class="accordion" id="completeEventSecondAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="completeEventHeadingTwo">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapseTwo" aria-expanded="true" aria-controls="completeEventCollapseTwo">
                    <strong class="table-header">Work Order Items</strong>
                  </button>
                </h2>
                <div id="completeEventCollapseTwo" class="accordion-collapse collapse show" aria-labelledby="completeEventHeadingTwo" data-parent="#completeEventSecondAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="woItems_dt_ce">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                      <div class="d-grid gap-2 d-md-block float-end" style="margin: 10px 0 10px 0">
                        <button class="btn btn-primary" type="button" onclick="completeAll(event)">Complete All</button>
                        <button class="btn btn-secondary" type="button" onclick="clearAll(event)">Clear</button>
                      </div>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Third Accordion Item -->
            <div class="accordion" id="completeEventThirdAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="completeeventHeadingThree">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapseThree" aria-expanded="true" aria-controls="completeEventCollapseThree">
                    <strong class="table-header">Punch Items</strong>
                  </button>
                </h2>
                <div id="completeEventCollapseThree" class="accordion-collapse collapse show" aria-labelledby="completeeventHeadingThree" data-parent="#completeEventThirdAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="punchItems_dt">
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
          <button type="submit" form="completeEventSubmitForm" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>`);

  window.openCompleteEventModal = (ev, eventId) => {
    eventId = eventId || ev.target.closest('.card-item').getAttribute('id');
    console.log('openCompleteEventModal() > Event ID', eventId);
    $('#completeEventModal').attr('eventId', eventId);
    $('#completeEventModal').modal('toggle');
  }

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
        eventFormHandlers();
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
        completeEventModalHandlers();
        hideCustomLoader();
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
          completeEventModalHandlers();
          hideCustomLoader('completeEventModal');
        }
      });
    })
    .catch(error => {
      Swal.fire(
        'Unexpected Error',
        error.message,
        'error'
      );
      hideCustomLoader('completeEventModal');
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
  $('#completeEventModal').on('hidden.bs.modal', ev => clearFieldValues());

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

  function completeEventModalHandlers() {
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

  function clearFieldValues() {
    console.log('***** Clearing Fields *****');
    
    showCustomLoader();

    $(`#completeEventModal`).attr('eventId', '');
    $(`#completeEventModal`).attr('woId', '');
    $(`#completeEventModal`).attr('eventDataSrc', '');
    $(`#completeEventModal`).attr('punchLines', '');
    $(`#completeEventModal eventTitle p`).html('');
    $(`#completeEventModal title p`).html('');
    $(`#completeEventModal project p`).html('');
    $(`#completeEventModal status p`).html('');

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

  function showCustomLoader() {
    $(`#completeEventModal .spinner`).show();
    $(`#completeEventModal .modal-body`).css('z-index', '-1');
  }

  function hideCustomLoader() {
    $(`#completeEventModal .spinner`).hide();
    $(`#completeEventModal .modal-body`).css('z-index', '1');
  }
})