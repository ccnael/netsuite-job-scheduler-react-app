import * as dataSet from '../dataSet';
import { onFilterGeneralEventResource, clearFilters } from '../filterFunctions';
import './filterField.css';

$(document).ready(() => {
  $('#app').append(`
    <div class="modal" id="filterFieldGeneralEventResource" mode="" title="" tabindex="-1">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filterFieldGeneralEventResourceLabel"><strong class="table-header">Filter Resources</strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="filterForm">
            <div class="row" style=" margin-top: 10px;">
              <div class="d-flex justify-content-center align-items-center">
                <div class="container p-4 border rounded bg-light">
                <div class="row g-3">
                    <!-- Row 1 -->
                    <div class="col-md-6">
                    <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                    ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
                    ${dataSet.vendors.map(vendor => `<option value="${vendor.id}">${vendor.name}</option>`)}
                    </select>
                    </div>
                    <div class="col-md-6">
                    <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                    ${dataSet.resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`)}
                    </select>
                    </div>
                    <!-- Row 2 -->
                    <div class="col-md-6">
                      <select class="selectpicker mx-auto multiple-resource-skill-field" title="Filter by Skill" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                      ${dataSet.resourceSkills.map(resourceSkill => `<option value="${resourceSkill.value}">${resourceSkill.text}</option>`)}
                      </select>
                    </div>
                    <div class="col-md-6">
                      <div class="d-flex align-items-center ms-3">
                        <div class="form-check form-switch w-100" style="margin-top: 10px; margin-left: 20px; display: flex; align-items: center;">
                          <input class="form-check-input me-2" type="checkbox">
                          <label class="form-check-label" style="font-size: 11px; margin: 0;">Show Available Resource Only</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Add Fields</button>
              <button type="button" class="btn btn-secondary btn-clear">Clear Filters</button>
            </div>
          </form>
          <form class="addFieldsForm">
            <!-- Row containing select field and buttons -->
            <div class="row mb-3 justify-content-start align-items-center">
              <div class="col mb-3">
                <select class="selectpicker mx-auto multiple-field-1" title="Select Fields" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                  <option value="field1">Location</option>
                  <option value="field2">Department</option>
                  <option value="field3">Class</option>
                  <option value="field3">Email</option>
                  <option value="field3">Mobile Phone</option>
                </select>
              </div>
              <!-- Buttons placed beside the select field -->
              <div class="col-md-5 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">Submit</button>
                <button type="button" class="btn btn-secondary">Back</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`);

  const MODAL_ID = '#filterFieldGeneralEventResource';

  // Hide addFieldsForm on page load
  $(`${MODAL_ID} .addFieldsForm`).hide();

  $(MODAL_ID).on('shown.bs.modal', () => {
    $('#generalEventModal').css('z-index', '1');
    onFilterGeneralEventResource(MODAL_ID);
  });
  // On click add fields button
  $(MODAL_ID).on('click', '.btn-success', e => {
    e.preventDefault();
    $(`${MODAL_ID} .filterForm`).hide();
    $(`${MODAL_ID} .addFieldsForm`).show();
  });
  // On click clear button
  $(MODAL_ID).on('click', '.btn-clear', e => {
    e.preventDefault();
    clearFilters(MODAL_ID);
  });
  // On click submit button
  $(MODAL_ID).on('click', '.btn-primary', e => {
    e.preventDefault();
    $(`${MODAL_ID} .addFieldsForm`).hide();
    $(`${MODAL_ID} .filterForm`).show();
    alert('Still In Progress...');
  });
  // On click back button
  $(MODAL_ID).on('click', '.btn-secondary', e => {
    e.preventDefault();
    $(`${MODAL_ID} .addFieldsForm`).hide();
    $(`${MODAL_ID} .filterForm`).show();
  });
  // Main Event Form -> On Close
  $(MODAL_ID).on('hidden.bs.modal', e => {
    $(`${MODAL_ID} .addFieldsForm`).hide();
    $(`${MODAL_ID} .filterForm`).show();
    // Reset the parent modal
    $('#generalEventModal').css('overflow', 'auto');
    $('#generalEventModal').css('z-index', '9999');
  });
})