import { suiteletUrl, resources, events } from './dataSet';
import { ceTimeSheetsDtColumns, ceItemsDtColumns, cePunchItemsDtColumns } from './dataTableColumns';
import { Event } from './utils';
import './completeEventModal.css';

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
          <form id="completeEventSubmitForm" onsubmit="return completeEventValidateForm()">
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
            <!-- 1st Accordion Item -->
            <div class="accordion" id="completeEvent1stAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="completeEventHeading1st">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapse1st" aria-expanded="true" aria-controls="completeEventCollapse1st">
                    <strong class="table-header">Time Sheets</strong>
                  </button>
                </h2>
                <div id="completeEventCollapse1st" class="accordion-collapse collapse show" aria-labelledby="completeEventHeading1st" data-parent="#completeEvent1stAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="timesheets">
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
                <h2 class="accordion-header" id="completeEventHeading2nd">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapse2nd" aria-expanded="true" aria-controls="completeEventCollapse2nd">
                    <strong class="table-header">Work Order Items</strong>
                  </button>
                </h2>
                <div id="completeEventCollapse2nd" class="accordion-collapse collapse show" aria-labelledby="completeEventHeading2nd" data-parent="#completeEventSecondAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="items_ce">
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

            <!-- 3rd Accordion Item -->
            <div class="accordion" id="completeEvent3rdAccordion" style="margin-top: 15px">
              <div class="accordion-item">
                <h2 class="accordion-header" id="completeeventHeading3rd">
                  <button class="accordion-button" type="button" data-toggle="collapse" data-target="#completeEventCollapse3rd" aria-expanded="true" aria-controls="completeEventCollapse3rd">
                    <strong class="table-header">Punch Items</strong>
                  </button>
                </h2>
                <div id="completeEventCollapse3rd" class="accordion-collapse collapse show" aria-labelledby="completeeventHeading3rd" data-parent="#completeEvent3rdAccordion">
                  <div class="accordion-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="punchItems">
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
          <button type="submit" form="completeEventSubmitForm" class="btn btn-primary">Complete</button>
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
    const noLocationResources = eventData.resources.filter(resource => !resource.location.value);
    const woRef = eventData.woRef;
    const woId = woRef?.id || '';

    if (woId) {
      $('#completeEventModal').attr('woId', woId);
      $('#completeEventModal .title p').html(`<a href="${woRef.woUrl}" target="_blank">${woRef.title}</a>`);
      $('#completeEventModal .project p').html(`<a href="${woRef.projectUrl}" target="_blank">${woRef.project.text}</a>`);
    }
    $('#completeEventModal').attr('eventDataSrc', encodeURIComponent(JSON.stringify(eventData))); // Data from NS
    $('#completeEventModalLabel').text(`Complete Event [ID ${eventData.id}]`);
    $('#completeEventModal .eventTitle p').html(`<a href="${eventData.url}" target="_blank">${eventData.title}</a>`);
    $('#completeEventModal .status p').text(eventData.status.text);
    $('#completeEventModal .modal-footer').find('button[type*="submit"]').attr('disabled', !!noLocationResources.length);

    temp_ceTimeSheetDataTable = $('#timesheets').DataTable({
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

    temp_ceItemsDataTable = $('#items_ce').DataTable({
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
    if (window.location.hostname === 'localhost') {
      $('#completeEventModal').attr('punchLines', encodeURIComponent('[]'));
      temp_cePunchItemsDataTable = $('#punchItems').DataTable({
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
      });
    } else {
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

          temp_cePunchItemsDataTable = $('#punchItems').DataTable({
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
              setTimeout(() => hideCustomLoader('completeEventModal'), 1000);
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
    }
  });

  // General Event Form -> On Submit
  $('#completeEventSubmitForm').on('submit', ev => {
    ev.preventDefault();

    const payload = {
      eventDataSrc: {},
      timeSheets: [],
      items: []
    }
    payload.eventDataSrc = JSON.parse(decodeURIComponent($('#completeEventModal').attr('eventDataSrc')));
    const punchLines = JSON.parse(decodeURIComponent($('#completeEventModal').attr('punchLines')));
    const unresolvedPunchCount = punchLines.filter(punch => punch.status.value != 6).length; // 6 (Resolved)
    const eventId = payload.eventDataSrc.id;
    const eventData = events.find(event => event.id == eventId);
    const assetMaintenance = eventData.assetMaintenance;

    console.log('----- Punch Items -----', payload);

    if (unresolvedPunchCount) {
      Swal.fire(
        'Unable to Proceed',
        `There are remaining Unresolved Punch Item(s)`,
        'error'
      );
      return;
    }

    $('#timesheets tbody > tr').each(function () {
      const that = $(this);
      payload.timeSheets.push({
        id: that.find('.resourceName p').attr('recordId'),
        location: that.find('.resourceName p').attr('locationId'),
        startTime: that.find('.starttime').val(),
        endTime: that.find('.endtime').val(),
        awayHrs: +that.find('.away-hrs').val() || 0,
        awayMins: +that.find('.away-mins').val() || 0,
        stHrs: +that.find('.st-hrs').val() || 0,
        stMins: +that.find('.st-mins').val() || 0,
        otHrs: +that.find('.ot-hrs').val() || 0,
        otMins: +that.find('.ot-mins').val() || 0,
        dtHrs: +that.find('.dt-hrs').val() || 0,
        dtMins: +that.find('.dt-mins').val() || 0,
        notes: that.find('.note').val(),
        get labRates() {
          const resource = resources.find(resource => resource.id == this.id);
          return resource?.labRates || [];
        },
        get stCost() {
          const labRateData = this.labRates.find(el => el.labRateCatId == '1') || '';
          return labRateData ? (this.stHrs * +labRateData?.labRate) + ((this.stMins / 60) * +labRateData?.labRate) : 0;
        },
        get otCost() {
          const labRateData = this.labRates.find(el => el.labRateCatId == '2') || '';
          return labRateData ? (this.otHrs * +labRateData?.labRate) + ((this.otMins / 60) * +labRateData?.labRate) : 0;
        },
        get dtCost() {
          const labRateData = this.labRates.find(el => el.labRateCatId == '3') || '';
          return labRateData ? (this.dtHrs * +labRateData?.labRate) + ((this.dtMins / 60) * +labRateData?.labRate) : 0;
        },
        get actualCost() {
          return this.stCost + this.otCost + this.dtCost;
        },
        get actualCostData() {
          return JSON.stringify({
            st: {
              hrs: this.stHrs,
              mins: this.stMins,
              cost: this.stCost
            },
            ot: {
              hrs: this.otHrs,
              mins: this.otMins,
              cost: this.otCost
            },
            dt: {
              hrs: this.dtHrs,
              mins: this.dtMins,
              cost: this.dtCost
            }
          });
        }
      });
    });

    // Sanitize: Filter out undefined, null etc values
    payload.timeSheets = payload.timeSheets.filter(timeSheet => {
      Object.keys(timeSheet).forEach(key => {
        if (!timeSheet[key])
          delete timeSheet[key];
      })
      return timeSheet;
    })

    const allowedProperties = [
      'id',
      'location',
      'startTime',
      'endTime',
      'awayHrs',
      'awayMins',
      'stHrs',
      'stMins',
      'otHrs',
      'otMins',
      'dtHrs',
      'dtMins',
      'notes'
    ];

    // Check if any object property is in the allowedProperties array
    payload.timeSheets = payload.timeSheets.filter(obj =>
      Object.keys(obj).some(key => allowedProperties.includes(key))
    );

    // WO Items
    if (temp_ceItemsDataTable) {
      const items_dt_tr = temp_ceItemsDataTable.rows({ search: 'applied' }).nodes();
      items_dt_tr.each(function (node) {
        const line = $(node).find('input.dt-line-select');
        if (line.is(':checked')) {
          const id = line.attr('recordId');
          const completeQty = +$(node).find('.quantity').val();
          if (id) {
            payload.items.push({
              id,
              completeQty
            });
          }
        }
      });
    }

    console.log('----- Complete Event Payload -----');
    console.log(payload);

    if (!payload.timeSheets.length && !assetMaintenance) {
      Swal.fire(
        'Unable to Proceed',
        `Time Sheets Required`,
        'error'
      );
      return;
    }

    Event.completeEvent(payload, eventId);
  });

  // General Event Form -> On Close
  $('#completeEventModal').on('hidden.bs.modal', ev => clearFieldValues());

  function eventFormHandlers() {
    window.markAll = ev => {
      const value = ev.target.checked;
      const el = ev.target.closest('.dataTable').querySelectorAll('.dt-line-select');
      for (let i = 0; i < el.length; i++) {
        if (el[i].type === 'checkbox') {
          el[i].checked = value;//!el[i].checked;
        }
      }
    }

    window.completeEventValidateForm = () => true;
  }

  function completeEventModalHandlers() {
    window.completeAll = () => {
      $('#items_ce tbody > tr').each(function () {
        const quantity = +$(this).find('.itemQty').text();
        +$(this).find('.completeQty').val(quantity);
      });
    }

    window.clearAll = () => {
      $('#items_ce tbody > tr').each(function () {
        +$(this).find('.completeQty').val(0);
      });
    }
  }

  function clearFieldValues() {
    console.log('----- Clearing Fields -----');

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
      $('table#timesheets tbody').children().remove();
      temp_ceTimeSheetDataTable = temp_ceTimeSheetDataTable.destroy();
    }

    if (temp_ceItemsDataTable) {
      $('table#items_ce tbody').children().remove();
      temp_ceItemsDataTable = temp_ceItemsDataTable.destroy();
    }

    if (temp_cePunchItemsDataTable) {
      $('table#punchItems tbody').children().remove();
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