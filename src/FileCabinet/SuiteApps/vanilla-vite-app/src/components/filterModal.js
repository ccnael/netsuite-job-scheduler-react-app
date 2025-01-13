import * as dataSet from './dataSet';
import { initLeftSideBarFilters, initAvailableJobsFilters, initEventFilters } from './filters';
import './filterModal.css';

$(document).ready(() => {
  $('#app').append(`
    <div class="modal fade" id="filterModal" mode="" eventId="" tabindex="-1">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filterModalLabel"><strong class="table-header">Filter Options</strong></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row" style=" margin-top: 10px;">
            <div class="col mb-3" style="border-radius: 5px 5px 0 0;">
              <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
                ${dataSet.vendors.map(vendor => `<option value="${vendor.id}">${vendor.name}</option>`)}
              </select>
            </div>
            <div class="col mb-3">
              <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
              ${dataSet.resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`)}
              <option value="vendor">Vendor Subcons</option>
              </select>
            </div>
            <div class="col mb-3">
              <select class="selectpicker mx-auto multiple-status-field" title="Filter by Status" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" form="filterSubmitForm" class="btn btn-primary">Add Fields</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    `);
  initLeftSideBarFilters('#boardSection');
  initAvailableJobsFilters('#boardSection .secondColumn');
  initEventFilters('#boardSection');

  window.openFilterModal = modalTitle => {
    $('#filterModal .modal-title').text(modalTitle);
    $('#filterModal').modal('toggle');
  }
})