import { onFilterResource, clearFilters } from '../filterFunctions';
import './filterField.css';
import fieldsData from './fieldsData';

$(document).ready(() => {
  $('#app').append(`
    <div class="modal fade" id="filterFieldResource" mode="" title="" tabindex="-1" style="z-index: -999">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filterFieldResourceLabel"><strong class="table-header">Filter Resources</strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="filterForm">
            <div class="row" style=" margin-top: 10px;">
              <div class="d-flex justify-content-center align-items-center">
                <div class="container p-4 border rounded bg-light">
                  <div class="row g-3 filter-fields">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Update Fields</button>
              <button type="button" class="btn btn-secondary btn-clear">Clear Filters</button>
            </div>
          </form>
          <form class="updateFieldsForm">
            <!-- Row containing select field and buttons -->
            <div class="row mb-3 justify-content-start align-items-center">
              <div class="col mb-3">
                <select class="selectpicker mx-auto multiple-filter-fields" title="Select Fields" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                  ${fieldsData.resource.fields.map(field => `<option value="${field.className}" ${field.display && 'selected'}>${field.label}</option>`)}
                </select>
              </div>
              <!-- Buttons placed beside the select field -->
              <div class="col-md-5 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">Submit</button>
                <button type="button" class="btn btn-secondary btn-back">Back</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`);

  const modalId = fieldsData.resource.modalId;
  let isInitialized = false;

  // Hide updateFieldsForm on page load
  $(`${modalId} .updateFieldsForm`).hide();

  $(modalId).on('shown.bs.modal', () => {
    console.log('fieldsData', fieldsData);
    setTimeout(() => {
      if (isInitialized) return;
      const fieldsStr = fieldsData.resource.fields.reduce((holder, field) =>
        holder += `<div class="col-md-6" style="display: ${field.display ? 'block' : 'none'}">
          ${(field.type === 'multiselect') ?
          `<select class="selectpicker mx-auto ${field.className}" title="Filter by ${field.label}" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
            ${field.options.map(option => `<option value="${option.value}">${option.text}</option>`)}
          </select>` :
          `<input type="text" class="form-control" id="${field.className}" placeholder="Enter ${field.label}">`
        }
        </div>
        `, '');
      $(`${modalId} .filter-fields`).append(fieldsStr);
      $(`${modalId} .selectpicker`).selectpicker();
      onFilterResource(modalId);
      $(modalId).css('z-index', '9999');
      isInitialized = true;
    }, 150);
  });
  // On click add fields button
  $(modalId).on('click', '.btn-success', e => {
    e.preventDefault();
    $(`${modalId} .filterForm`).hide();
    $(`${modalId} .updateFieldsForm`).show();
  });
  // On click clear button
  $(modalId).on('click', '.btn-clear', e => {
    e.preventDefault();
    clearFilters(modalId);
  });
  // On click submit button
  $(modalId).on('click', '.btn-primary', e => {
    e.preventDefault();
    $(`${modalId} .updateFieldsForm`).hide();
    $(`${modalId} .filterForm`).show();
    /* console.log(JSON.stringify(fieldsData));

    const selectedValues = $(`${modalId} .updateFieldsForm select.multiple-filter-fields`).val();

    $(`${modalId} div.filter-fields`).append(`
      <div class="col-md-6">
        <select class="selectpicker mx-auto multiple-resource-group-field2" title="Filter by Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
        <option value="vendor">XXX</option>
        <option value="asset">YYY</option>
        </select>
      </div>
    `); */
    $(`${modalId} .selectpicker`).selectpicker();
    alert('Still In Progress...');
  });
  // On click back button
  $(modalId).on('click', '.btn-back', e => {
    e.preventDefault();
    $(`${modalId} .updateFieldsForm`).hide();
    $(`${modalId} .filterForm`).show();
  });
  // Main Event Form -> On Close
  $(modalId).on('hidden.bs.modal', e => {
    $(`${modalId} .updateFieldsForm`).hide();
    $(`${modalId} .filterForm`).show();
  });
})