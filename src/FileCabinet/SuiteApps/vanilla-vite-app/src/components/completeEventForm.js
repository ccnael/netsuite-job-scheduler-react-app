import './completeEventForm.css';

document.querySelector('#app').innerHTML +=
`<div class="modal fade" id="completeEventModal" woId="" eventId="" punchLines="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
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
</div>`