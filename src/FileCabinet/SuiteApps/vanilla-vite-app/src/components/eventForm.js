document.querySelector('#app').innerHTML +=
`<div class="modal fade" id="eventModal" mode="" woId="" eventId="" eventDataSrc="" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
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
</div>`