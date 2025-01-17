import * as dataSet from '../dataSet';
import { onFilterBoardEvent, clearFilters } from '../filterFunctions';
import './filterField.css';

$(document).ready(() => {
  $('#app').append(`
    <div class="modal fade" id="filterFieldBoardEvent" mode="" title="" tabindex="-1" style="z-index: -999">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filterFieldBoardEventLabel"><strong class="table-header">Filter Events</strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="filterForm">
            <div class="row" style=" margin-top: 10px;">
              
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

  const MODAL_ID = '#filterFieldBoardEvent';
  let isInitialized = false;

  // Hide addFieldsForm on page load
  $(`${MODAL_ID} .addFieldsForm`).hide();

  $(MODAL_ID).on('shown.bs.modal', () => {
    setTimeout(() => {
      if (isInitialized) return;
      $(`${MODAL_ID} .filterForm > .row`).html(`<div class="d-flex justify-content-center align-items-center">
        <div class="container p-4 border rounded bg-light">
          <div class="row g-3">
            <!-- Row 1 -->
            <div class="col-md-6">
              <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Resource Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
                ${dataSet.vendors.map(vendor => `<option value="${vendor.id}">${vendor.name}</option>`)}
                ${dataSet.assets.map(asset => `<option value="${asset.id}">${asset.name}</option>`)}
              </select>
            </div>
            <div class="col-md-6">
              <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Resource Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                ${dataSet.resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`)}
                <option value="vendor">Vendor Subcons</option>
                <option value="asset">Asset & Equipments</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
            <!-- Row 2 -->
            <div class="col-md-6">
              <select class="selectpicker mx-auto multiple-event-status-field" title="Filter by Status" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" multiple>
                <option value="TENTATIVE">Tentative</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div class="col-md-6">
              <select class="selectpicker mx-auto multiple-event-priority-field" title="Filter by Priority" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                <option value="1">Low</option>
                <option value="2">Mid</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
              </select>
            </div>
            <!-- Row 3 -->
            <div class="col-md-6">
              <select class="selectpicker mx-auto multiple-event-organizer-field" title="Filter by Organizer" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                ${dataSet.organizers.map(organizer => `<option value="${organizer.value}">${organizer.text}</option>`)}
              </select>
            </div>
            <div class="col-md-6">
              <select class="selectpicker mx-auto multiple-event-type-field" title="Filter by Event Type" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                <option value="1">General Event</option>
                <option value="2">Non General Event</option>
              </select>
            </div>
            <!-- Row 4 -->
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <label for="board-event-datefrom" class="me-2 mb-0">From:</label>
                <input type="date" class="form-control" id="board-job-datefrom">
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <label for="board-event-dateto" class="me-2 mb-0">To:</label>
                <input type="date" class="form-control" id="board-job-dateto">
              </div>
            </div>
          </div>
        </div>
      </div>
      `);

      $(`${MODAL_ID} .selectpicker`).selectpicker();
      onFilterBoardEvent(MODAL_ID);
      $(MODAL_ID).css('z-index', '9999');
      isInitialized = true;
    }, 150);
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
  });
})