document.querySelector('#app').innerHTML +=
`<div class="modal fade" id="generalEventModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="generalEventModalLabel">Create New Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="spinner"></div>
      <div class="modal-body">
        <form id="generalEventSubmitForm" onsubmit="return validateForm()">
          <!-- First Accordion Item -->
          <div class="accordion" id="generalEventFirstAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="generalEventHeadingOne">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapseOne" aria-expanded="true" aria-controls="generalEventCollapseOne">
                  <!-- <strong class="grid-header">&nbsp;Primary Information</strong> -->
                  <strong class="table-header">Primary Information</strong>
                </button>
              </h2>
              <div id="generalEventCollapseOne" class="accordion-collapse collapse show" aria-labelledby="generalEventHeadingOne" data-parent="#generalEventFirstAccordion">
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
          <!-- Second Accordion Item -->
          <div class="accordion" id="generalEventSecondAccordion" style="margin-top: 15px">
            <div class="accordion-item">
              <h2 class="accordion-header" id="generalEventHeadingTwo">
                <button class="accordion-button" type="button" data-toggle="collapse" data-target="#generalEventCollapseTwo" aria-expanded="true" aria-controls="generalEventCollapseTwo">
                  <strong class="table-header">Select Available Resources</strong>
                </button>
              </h2>
              <div id="generalEventCollapseTwo" class="accordion-collapse collapse show" aria-labelledby="generalEventHeadingTwo" data-parent="#generalEventSecondAccordion">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-striped" id="woResources_dt_ge">
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
</div>`