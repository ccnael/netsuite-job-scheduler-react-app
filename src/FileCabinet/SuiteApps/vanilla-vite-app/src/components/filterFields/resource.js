import { onFilterResource } from './filterUtils';
import './filterField.css';
import * as dataSet from '../dataSet';

$(document).ready(() => {
  const { modalId, fields } = dataSet.filterFields.resource;

  $('#app').append(`
    <div class="modal fade" id="${modalId.replace('#', '')}" mode="" title="" tabindex="-1" style="z-index: -999">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${modalId.replace('#', '')}Label"><strong class="table-header">Filter Resources</strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="spinner"></div>
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
              <button type="submit" class="btn btn-primary" onclick="showSecondForm(event, '${modalId}')">Select Filters</button>
              <button type="button" class="btn btn-secondary btn-clear" onclick="clearFilters('${modalId}')">Clear Filters</button>
            </div>
          </form>
          <form class="selectFiltersForm">
            <div class="row mb-3 justify-content-start align-items-center">
              <div class="col mb-6 d-flex align-items-center">
                <select class="selectpicker mx-auto multiple-filter-fields" 
                  title="Select Fields" 
                  data-live-search="true" 
                  data-selected-text-format="count>3" 
                  data-style="custom-select-style" 
                  data-style-base="form-control" 
                  data-actions-box="true" 
                  multiple>
                  ${fields.map(field => `<option value="${field.className}" ${field.display && 'selected'}>${field.label}</option>`)}
                </select>
                <i class="fa-solid fa-circle-plus ms-2 d-flex align-items-center justify-content-center" style="cursor: pointer; font-size: 2rem; color: #218938" onclick="alert('Not yet available.')">
                </i>
              </div>
              <div class="col-md-5 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2" onclick="selectFilters(event, 'resource', '${modalId}')">Save</button>
                <button type="button" class="btn btn-secondary btn-back" onclick="backToFirstForm(event, '${modalId}')">Back</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`);

  $(modalId).on('shown.bs.modal', () => {
    showCustomLoader();
    $(this).removeAttr('aria-hidden'); // Ensure it's not hidden when shown
    $(this).focus(); // Set focus to a valid element
    // Append/not append fields
    const fieldsStr = fields.reduce((holder, field) => {
      // Do not append fields that already exist
      const el = $(`${modalId} .filter-fields .${field.className}`);
      let fieldStr = '';
      switch (field.type) {
        case 'multiselect':
          fieldStr = `<select class="selectpicker mx-auto ${field.className}" 
              title="Filter by ${field.label}" 
              data-live-search="true" 
              data-selected-text-format="count>2" 
              data-style="custom-select-style" 
              data-style-base="form-control" 
              data-actions-box="true" 
              multiple>
              ${field.options.map(option => `<option value="${option.value}" data-icon="${field['data-icon'] || ''}">${option.text}</option>`)}
            </select>`;
          break;
        case 'date':
          fieldStr = `<div class="d-flex align-items-center">
            <label for="${field.className}" class="me-2 mb-0">${field.label.replace('Date ', '')}:</label>
            <input type="date" class="form-control ${field.className}" id="${field.className}">
          </div>`;
          break;
        case 'checkbox':
          fieldStr = `<div class="d-flex align-items-center ms-3">
            <div class="form-check form-switch w-100" style="margin-top: 10px; margin-left: 20px; display: flex; align-items: center;">
              <input class="form-check-input me-2 ${field.className}" type="checkbox">
              <label class="form-check-label" style="font-size: 11px; margin: 0;">Show Available Resource Only</label>
            </div>
          </div>`;
          break;
        case 'text':
          fieldStr = `<input type="text" class="form-control ${field.className} custom-select-style" placeholder="Enter ${field.label}">`;
          break;
      }
      holder += !el.length
        ?
        `<div class="col-md-6" style="display: ${field.display ? 'block' : 'none'}">
        ${fieldStr}
        </div>`
        :
        '';
      return holder;
    }, '');
    // Display/not display fields
    console.log('fields', fields)
    fields.map(field => {
      const el = $(`${modalId} .filter-fields .${field.className}`);
      console.log(el, field);
      !!el.length && el.closest('div.col-md-6').css('display', ` ${field.display ? 'block' : 'none'}`);
    });

    $(`${modalId} .filter-fields`).append(fieldsStr);
    $(`${modalId} .selectpicker`).selectpicker();
    onFilterResource(modalId);

    $(modalId).modal('show');
    $(modalId).css('z-index', '9999');
    setTimeout(() => hideCustomLoader(), 150);
  });

  $(modalId).on('hidden.bs.modal', e => {
    $(`${modalId} .selectFiltersForm`).hide();
    $(`${modalId} .filterForm`).show();
    $(modalId).css('z-index', '-999');
  });

  function showCustomLoader() {
    $(`${modalId} .spinner`).show();
    $(`${modalId} .modal-body`).css('z-index', '-1');
  }

  function hideCustomLoader() {
    $(`${modalId} .spinner`).hide();
    $(`${modalId} .modal-body`).css('z-index', '1');
  }
})