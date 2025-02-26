import * as dataSet from '../dataSet';

export function setupFilters() {
  // 2nd Form
  // ----------------------------
  window.showSecondForm = (ev, modalId) => {
    ev.preventDefault();
    $(`${modalId} .filterForm`).hide();
    $(`${modalId} .selectFiltersForm`).show();
  }
  // 2nd Form Submit
  // ----------------------------
  window.selectFilters = (ev, section, modalId) => {
    ev.preventDefault();
    const selectedFields = $(`${modalId} .selectFiltersForm select.multiple-filter-fields`).val();
    if (!selectedFields.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please select at least one field before submitting.'
      });
      return;
    }
    // Update shared filter fields data
    dataSet.filterFields[section].fields.map(field => {
      field.display = !!selectedFields.includes(field.className);
      if (!field.display) {
        const el = $(`${modalId} .filter-fields .${field.className}`);
        clearFieldValue(el, field.type);
      }
    });
    writeFilterFields(selectedFields)
      .then(result => {
        // console.log('RESULT', result);
        // Properly reset & reinitialize modal
        $(modalId).modal('hide').on('hidden.bs.modal', function () {
          $(this).off('hidden.bs.modal'); // Unbind to prevent stacking
          $(`${modalId} .selectFiltersForm`).hide();
          $(`${modalId} .filterForm`).show();
          setTimeout(() => $(modalId).modal('show'), 150);
        });
      });
  }

  // Update the filterMap.json in NS
  async function writeFilterFields(selectedFields) {
    const swalLoading = Swal.fire({
      title: 'Updating Fields...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      customClass: {
        title: 'swal-custom-title'
      }
    });
    try {
      const response = await fetch(`${dataSet.suiteletUrl}&mode=updateFilters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedFields),
      });
      const data = await response.json();
      await swalLoading.close();
      // Swal.fire('Success!', 'Request completed successfully.', 'success');
      console.log('Response:', data);
      return data;
    } catch (error) {
      await swalLoading.close();
      Swal.fire('Error!', 'Something went wrong.', 'error');
      return error;
    }
  }

  window.backToFirstForm = (ev, modalId) => {
    ev.preventDefault();
    $(`${modalId} .selectFiltersForm`).hide();
    $(`${modalId} .filterForm`).show();
  }

  window.clearFilters = modalId => {
    // Clear multiselect fields
    $(`${modalId} .filter-fields select[class*="multiple"]`).each(function () {
      clearFieldValue($(this), 'multiselect');
    });
    // Unmark checkboxes
    $(`${modalId} .filter-fields .form-check-input`).each(function () {
      clearFieldValue($(this), 'checkbox');
    });
    // Date fields
    $(`${modalId} .filter-fields input[type="date"]`).each(function () {
      clearFieldValue($(this), 'date');
    });
    // Clear freeform
    $(`${modalId} .filter-fields input[type="text"]`).each(function () {
      clearFieldValue($(this), 'text');
    });
  }

  function clearFieldValue(el, type) {
    switch (type) {
      case 'multiselect':
        el.val([]).change();
        break;
      case 'checkbox':
        el.prop('checked', false).change();
        break;
      case 'date':
        el.val('').change();
        break;
      case 'text':
        el.val('').trigger('keyup');
        break;
      default:
        break;
    }
  }
}

// Board Filters
// -----------------------------------------------------------------
export function onFilterResource(fieldId) {
  const $items = $(`#boardSection .leftSidebar .collapsible-list .person-container`);
  const $resourceFilter = $(`${fieldId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${fieldId} select.multiple-resource-group-field`);
  const $resourceSkillFilter = $(`${fieldId} select.multiple-resource-skill-field`);
  const $statusFilter = $(`${fieldId} select.multiple-status-field`);
  const $locationFilter = $(`${fieldId} select.multiple-location-field`);
  const $departmentFilter = $(`${fieldId} select.multiple-department-field`);
  const $emailFilter = $(`${fieldId} input.email-field`);
  const $phoneFilter = $(`${fieldId} input.phone-field`);
  const $selected = {
    resource: [],
    resourceGroup: [],
    resourceSkill: [],
    status: [],
    location: [],
    department: [],
    email: '',
    phone: ''
  };
  let $groupCounterMap = {};
  if ($resourceFilter.length) {
    $resourceFilter.on('change', function () {
      $selected.resource = $(this).val() || [];
      filterItems();
    });
  }
  if ($resourceGroupFilter.length) {
    $resourceGroupFilter.on('change', function () {
      $selected.resourceGroup = $(this).val() || [];
      filterItems();
    });
  }
  if ($resourceSkillFilter.length) {
    $resourceSkillFilter.on('change', function () {
      $selected.resourceSkill = $(this).val() || [];
      filterItems();
    });
  }
  if ($statusFilter.length) {
    $statusFilter.on('change', function () {
      $selected.status = $(this).val() || [];
      filterItems();
    });
  }
  if ($locationFilter.length) {
    $locationFilter.on('change', function () {
      $selected.location = $(this).val() || [];
      filterItems();
    });
  }
  if ($departmentFilter.length) {
    $departmentFilter.on('change', function () {
      $selected.department = $(this).val() || [];
      filterItems();
    });
  }
  if ($emailFilter.length) {
    $emailFilter.on('keyup', function () {
      $selected.email = $(this).val() || '';
      filterItems();
    });
  }
  if ($phoneFilter.length) {
    $phoneFilter.on('keyup', function () {
      $selected.phone = $(this).val() || '';
      filterItems();
    });
  }

  function filterItems() {
    $groupCounterMap = {};
    $items.each(function () {
      const $el = $(this);
      const elementId = $(this)[0].id;
      const resourceId = elementId.split('-').pop();
      const containerId = $el.closest('div[id*="-filter-tableWrapper"]').attr('id');
      const groupId = (containerId.match('asset') || containerId.match('vendor') || containerId.match(/\d+/))[0];
      const _resource = dataSet.resources.find(resource => resource.employee.value == resourceId);
      const _vendor = dataSet.vendors.find(vendor => vendor.vendor.value == resourceId);
      const _asset = dataSet.assets.find(asset => asset.asset.value == resourceId);

      if (_resource || _vendor || _asset) {
        let _resourceGroup = [], _resourceSkill = [];
        if (_resource) {
          _resourceGroup = [..._resourceGroup, ..._resource.resourceGroups.map(resourceGroup => resourceGroup.value)];
          _resourceGroup = Array.from(new Set(_resourceGroup));
          _resourceSkill = [..._resourceSkill, ..._resource.resourceSkills.map(resourceSkill => resourceSkill.value)];
          _resourceSkill = Array.from(new Set(_resourceSkill));
        } else {
          _resourceGroup = ['vendor', 'asset'];
        }
        const _resourceStatus = (_resource || _vendor || _asset).active ? '1' : '0';
        const _resourceLocation = (_resource || _vendor || _asset).location.value;
        const _resourceDepartment = (_resource || _vendor || _asset).department.value;
        const email = (_resource || _vendor || _asset).email;
        const email_regExp = new RegExp($selected.email, 'gi');
        const phone = (_resource || _vendor || _asset).phone;
        const phone_regExp = new RegExp($selected.phone, 'gi');
        const shouldDisplay = !!(
          (!$selected.resource.length || $selected.resource.includes(resourceId)) &&
          (!$selected.resourceGroup.length || $selected.resourceGroup.includes(groupId)) &&
          (!$selected.resourceSkill.length || $selected.resourceSkill.some(value => new Set(_resourceSkill).has(value))) &&
          (!$selected.status.length || $selected.status.includes(_resourceStatus)) &&
          (!$selected.location.length || $selected.location.includes(_resourceLocation)) &&
          (!$selected.department.length || $selected.department.includes(_resourceDepartment)) &&
          ($selected.email ? (email && email.match(email_regExp)) : true) &&
          ($selected.phone ? (phone && phone.match(phone_regExp)) : true)
        );
        $el.toggle(shouldDisplay);
        // Group counter map
        if (!$groupCounterMap[groupId]) {
          $groupCounterMap[groupId] = 0;
        }
        if (shouldDisplay) {
          $groupCounterMap[groupId]++;
        }
      }
    });
    updateHeaderGroupCount();
    updateFilterCounter();
  }

  // Update header column counter
  function updateHeaderGroupCount() {
    $.each($groupCounterMap, (headerId, count) => {
      $(`#boardSection .leftSidebar #resourceGroup-${headerId}-filter-tableWrapper span.counter`).html(count);
    });
  }

  function updateFilterCounter() {
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    $(`#filter-resource-counter`).html(counter);
  }
}

// Shared
export function onFilterJob(selectorId, fieldId) {
  const $items = $(`${selectorId} .card-wrapper .card-item`);
  const $customerFilter = $(`${fieldId} select.multiple-customer-field`);
  const $locationFilter = $(`${fieldId} select.multiple-location-field`);
  const $woIdFilter = $(`${fieldId} input[class*="wo-id"]`);
  const $woTitleFilter = $(`${fieldId} input[class*="wo-title"]`);
  const $statusFilter = $(`${fieldId} select.multiple-status-field`);
  const $projectFilter = $(`${fieldId} select.multiple-project-field`);
  const $dateFromFilter = $(`${fieldId} input[class*="datefrom"]`);
  const $dateToFilter = $(`${fieldId} input[class*="dateto"]`);
  const $selected = {
    dateFrom: '',
    dateTo: '',
    customer: [],
    location: [],
    status: [],
    project: [],
    woId: '',
    woTitle: '',
  };
  if ($dateFromFilter.length) {
    $dateFromFilter.on('change', function () {
      $selected.dateFrom = $(this).val() || '';
      filterItems();
    });
  }
  if ($dateToFilter.length) {
    $dateToFilter.on('change', function () {
      $selected.dateTo = $(this).val() || '';
      filterItems();
    });
  }
  if ($customerFilter.length) {
    $customerFilter.on('change', function () {
      $selected.customer = $(this).val() || [];
      filterItems();
    });
  }
  if ($locationFilter.length) {
    $locationFilter.on('change', function () {
      $selected.location = $(this).val() || [];
      filterItems();
    });
  }
  if ($statusFilter.length) {
    $statusFilter.on('change', function () {
      $selected.status = $(this).val() || [];
      filterItems();
    });
  }
  if ($projectFilter.length) {
    $projectFilter.on('change', function () {
      $selected.project = $(this).val() || [];
      filterItems();
    });
  }
  if ($woIdFilter.length) {
    $woIdFilter.on('keyup', function () {
      $selected.woId = $(this).val() || '';
      filterItems();
    });
  }
  if ($woTitleFilter.length) {
    $woTitleFilter.on('keyup', function () {
      $selected.woTitle = $(this).val() || '';
      filterItems();
    });
  }

  function filterItems() {
    $items.each(function () {
      const $el = $(this);
      const woId = $el[0].id;
      const woRef = dataSet.workOrders.find(wo => wo.id == woId);

      if (woRef) {
        let date = woRef.date;
        const customerId = woRef.customer.value;
        const locationId = woRef.location.value;
        const statusId = woRef.status.value;
        const projectId = woRef.project.value;
        const woId = woRef.id;
        const id_regExp = new RegExp($selected.woId, 'gi');
        const woTitle = woRef.title;
        const title_regExp = new RegExp($selected.woTitle, 'gi');
        let withinRange = false;

        if (date) {
          date = moment(date);
          $selected.dateFrom = $selected.dateFrom ? moment($selected.dateFrom) : '';
          $selected.dateTo = $selected.dateTo ? moment($selected.dateTo) : '';
          if ($selected.dateFrom && $selected.dateTo) {
            withinRange = date.isBetween($selected.dateFrom, $selected.dateTo, null, '[]');
          } else if ($selected.dateFrom && !$selected.dateTo) {
            withinRange = date.isSameOrAfter($selected.dateFrom);
          } else if (!$selected.dateFrom && $selected.dateTo) {
            withinRange = date.isSameOrBefore($selected.dateTo);
          }
        }
        if (!$selected.dateFrom && !$selected.dateTo) {
          withinRange = true;
        }
        const shouldDisplay = !!(
          withinRange &&
          (!$selected.customer.length || $selected.customer.includes(customerId)) &&
          (!$selected.location.length || $selected.location.includes(locationId)) &&
          (!$selected.status.length || $selected.status.includes(statusId)) &&
          (!$selected.project.length || $selected.project.includes(projectId)) &&
          ($selected.woId ? woId.match(id_regExp) : true) &&
          ($selected.woTitle ? woTitle.match(title_regExp) : true)
        );
        $el.toggle(shouldDisplay);
      }
    });
    updateHeaderGroupCount();
    updateFilterCounter();
  }

  // Update header column counter
  function updateHeaderGroupCount() {
    const total = $items.filter(function () {
      return $(this).css('display') !== 'none';
    }).length;
    let id;
    if (fieldId.match(/board/gi)) {
      id = `#header-boardjob-counter`;
    } else {
      id = `#header-calendarjob-counter`;
    }
    $(id).html(total);
  }

  function updateFilterCounter() {
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    let id;
    if (fieldId.match(/board/gi)) {
      id = `#filter-boardjob-counter`;
    } else {
      id = `#filter-calendarjob-counter`;
    }
    $(id).html(counter);
  }
}

export function onFilterBoardEvent(fieldId) {
  const $items = $(`#boardSection .thirdColumn .card-wrapper .card-item`);
  const $field = {
    dateFrom: $(`${fieldId} input[id*="datefrom"]`),
    dateTo: $(`${fieldId} input[id*="dateto"]`),
    resource: $(`${fieldId} select.multiple-resource-field`),
    resourceGroup: $(`${fieldId} select.multiple-resource-group-field`),
    status: $(`${fieldId} select.multiple-event-status-field`),
    priority: $(`${fieldId} select.multiple-event-priority-field`),
    organizer: $(`${fieldId} select.multiple-event-organizer-field`),
    eventType: $(`${fieldId} select.multiple-event-type-field`),
    receiptStatus: $(`${fieldId} select.multiple-event-receipt-field`)
  };
  // Set default resource filter value (TBD move to on hide/close modal instead?)
  const $resourceIds_temp = $(`#boardSection select.multiple-resource-field-hidden`).val();
  $field.resource.val($resourceIds_temp).change();
  const $selected = {
    dateFrom: '',
    dateTo: '',
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: [],
    eventType: [],
    receiptStatus: []
  };
  for (const id in $field) {
    if ($field[id].length) {
      $field[id].on('change', function () {
        $selected[id] = $(this).val() || (!id.match(/date/gi) ? [] : '');
        filterItems();
        // Highlight resource rows
        if (id == 'resource') {
          $('.person-container').each(function () {
            const elementId = $(this)[0].id;
            const resourceId = elementId.split('-').pop();
            if ($selected[id].includes(resourceId)) {
              $(this).addClass('row-available');
            } else {
              $(this).removeClass('row-available');
            }
          });
          $(`#boardSection select.multiple-resource-field-hidden`).val($selected[id]).change();
        }
      });
    }
  }

  function filterItems() {
    $items.each(function () {
      const $el = $(this);
      const eventId = $el[0].id;
      const eventData = dataSet.events.find(event => event.id == eventId);

      if (eventData) {
        let date = eventData.date.end || eventData.date.start;
        const eventResources = eventData.resources.map(resource => resource.employee.value);
        const eventVendors = eventData.vendors.map(vendor => vendor.vendor.value);
        const combinedResources = [...eventResources, ...eventVendors];
        let eventResourceGroups = [];
        eventData.resources.map(resource => eventResourceGroups = [...eventResourceGroups, ...resource.resourceGroups.map(resourceGroup => resourceGroup.value)]);
        eventResourceGroups = Array.from(new Set(eventResourceGroups));
        if (eventVendors.length) {
          eventResourceGroups.push('vendor');
        } else if (!eventData.resources.length && !eventVendors.length) {
          eventResourceGroups.push('unassigned');
        }
        const eventStatus = eventData.status.value;
        const eventPriority = eventData.priority.value;
        const eventOrganizer = eventData.organizer.value;
        const eventType = !!eventData.workorder.text ? '2' : '1';
        const receiptStatus = eventData.woRef.receiptStatus?.value || '';
        let withinRange = false;

        if (date) {
          date = moment(date);
          $selected.dateFrom = $selected.dateFrom ? moment($selected.dateFrom) : '';
          $selected.dateTo = $selected.dateTo ? moment($selected.dateTo) : '';

          if ($selected.dateFrom && $selected.dateTo) {
            withinRange = date.isBetween($selected.dateFrom, $selected.dateTo, null, '[]');
          } else if ($selected.dateFrom && !$selected.dateTo) {
            withinRange = date.isSameOrAfter($selected.dateFrom);
          } else if (!$selected.dateFrom && $selected.dateTo) {
            withinRange = date.isSameOrBefore($selected.dateTo);
          }
        }
        if (!$selected.dateFrom && !$selected.dateTo) {
          withinRange = true;
        }
        const shouldDisplay = !!(
          withinRange &&
          (!$selected.resource.length || $selected.resource.some(value => new Set(combinedResources).has(value))) && // Check if the selected resources is in the event resources
          (!$selected.resourceGroup.length || $selected.resourceGroup.some(value => new Set(eventResourceGroups).has(value))) && // Check if the selected resource groups is in the event resource groups
          (!$selected.status.length || $selected.status.includes(eventStatus)) &&
          (!$selected.priority.length || $selected.priority.includes(eventPriority)) &&
          (!$selected.organizer.length || $selected.organizer.includes(eventOrganizer)) &&
          (!$selected.eventType.length || $selected.eventType.includes(eventType)) &&
          (!$selected.receiptStatus.length || $selected.receiptStatus.includes(receiptStatus))
        );
        $el.toggle(shouldDisplay);
      }
    });
    updateHeaderGroupCount();
    updateFilterCounter();
  }

  // Update header column counter
  function updateHeaderGroupCount() {
    const total = $items.filter(function () {
      return $(this).css('display') !== 'none';
    }).length;
    $(`#header-boardevent-counter`).html(total);
  }

  function updateFilterCounter() {
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date|showReceivedItems/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    $('#filter-boardevent-counter').html(counter);
  }
}

export function onClickResource() {
  const $items = $(`#boardSection .thirdColumn .card-wrapper .card-item`);
  const $resourceFilterHidden = $(`#boardSection select.multiple-resource-field-hidden`);
  const $selected = {
    resource: []
  };
  // This hidden filter field is to trigger the boardevent filter resource field
  if ($resourceFilterHidden.length) {
    $resourceFilterHidden.on('change', function () {
      $selected.resource = $(this).val() || [];
      filterItems();
      // Highlight resource rows
      $('.person-container').each(function () {
        const elementId = $(this)[0].id;
        const resourceId = elementId.split('-').pop();
        if ($selected.resource.includes(resourceId)) {
          $(this).addClass('row-available');
        } else {
          $(this).removeClass('row-available');
        }
      });
    });
  }
  let resourceIds = [];
  // On click resource row
  $('.person-container').on('click', function () {
    const elementId = $(this)[0].id;
    const resourceId = elementId.split('-').pop();
    if ($(this).hasClass('row-available')) {
      $(this).removeClass('row-available');
      const index = resourceIds.indexOf(resourceId);
      if (index > -1) {
        resourceIds.splice(index, 1);
      }
    } else {
      $(this).addClass('row-available');
      resourceIds.push(resourceId);
    }
    $('.person-container').each(function () {
      const elementId = $(this)[0].id;
      const resourceId = elementId.split('-').pop();
      if (resourceIds.includes(resourceId)) {
        $(this).addClass('row-available');
      } else {
        $(this).removeClass('row-available');
      }
    });
    resourceIds = Array.from(new Set(resourceIds));
    $(`#boardSection select.multiple-resource-field-hidden`).val(resourceIds).change();
  });

  function filterItems() {
    $items.each(function () {
      const $el = $(this);
      const eventId = $el[0].id;
      const eventData = dataSet.events.find(event => event.id == eventId);

      if (eventData) {
        const eventResources = eventData.resources.map(resource => resource.employee.value);
        const eventVendors = eventData.vendors.map(vendor => vendor.vendor.value);
        const eventAssets = eventData.assets.map(asset => asset.asset.value);
        const combinedResources = [...eventResources, ...eventVendors, ...eventAssets];
        const shouldDisplay = !!(
          (!$selected.resource.length || $selected.resource.some(value => new Set(combinedResources).has(value)))
        );
        $el.toggle(shouldDisplay);
      }
    });
    updateHeaderGroupCount();
    updateFilterCounter();
  }

  // Update header column counter
  function updateHeaderGroupCount() {
    const total = $items.filter(function () {
      return $(this).css('display') !== 'none';
    }).length;
    $(`#header-boardevent-counter`).html(total);
  }

  function updateFilterCounter() {
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    $('#filter-boardevent-counter').html(counter);
  }
}

// Calendar Filters
// -----------------------------------------------------------------
export function onFilterCalendarEvent(fieldId, pageSwitched, info) {
  const $field = {
    resource: $(`${fieldId} select.multiple-resource-field`),
    resourceGroup: $(`${fieldId} select.multiple-resource-group-field`),
    status: $(`${fieldId} select.multiple-event-status-field`),
    priority: $(`${fieldId} select.multiple-event-priority-field`),
    organizer: $(`${fieldId} select.multiple-event-organizer-field`),
    eventType: $(`${fieldId} select.multiple-event-type-field`),
    receiptStatus: $(`${fieldId} select.multiple-event-receipt-field`)
  };
  const $selected = {
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: [],
    eventType: [],
    receiptStatus: []
  };
  if (pageSwitched) {
    let hasDefaultFilter = false;
    for (const id in $field) {
      if ($field[id].length) {
        $selected[id] = $field[id].val() || [];
        hasDefaultFilter = !!$selected[id].length;
      }
    }
    if (hasDefaultFilter) {
      filterItems();
    }
  } else {
    for (const id in $field) {
      if ($field[id].length) {
        $field[id].on('change', function () {
          $selected[id] = $(this).val() || [];
          filterItems();
        });
      }
    }
  }

  function filterItems() {
    window.FullCalendar.refetchResources();
    window.FullCalendar.refetchEvents();
    window.FullCalendar.getResources().forEach(resource => {
      resource.remove();
    });
    let calendarResources = dataSet.combinedResourceGroups.map(resourceGroup => ({
      id: resourceGroup.value,
      title: resourceGroup.text,
      children: resourceGroup.resources
        .map(resource => ({
          id: `${resourceGroup.value}-${resource.id}`,
          title: resource.name,
          extendedProps: resource
        })),
      get resourceCount() {
        return this.children.length;
      },
      extendedProps: resourceGroup
    }));

    if ($selected.resourceGroup.length) {
      calendarResources = calendarResources.filter(calendarResource => $selected.resourceGroup.includes(calendarResource.id.split('-').pop()));
    }
    if ($selected.resource.length) {
      calendarResources.forEach(calendarResource => {
        calendarResource.children = calendarResource.children.filter(resource => $selected.resource.includes(resource.id.split('-').pop()));
      });
    }
    let calendarEvents = window.FullCalendar.getEvents();
    if ($selected.status.length) {
      calendarEvents = calendarEvents.filter(event => !!($selected.status.includes(event.extendedProps.status.value)));
    }
    if ($selected.priority.length) {
      calendarEvents = calendarEvents.filter(event => !!($selected.priority.includes(event.extendedProps.priority.value)));
    }
    if ($selected.organizer.length) {
      calendarEvents = calendarEvents.filter(event => !!($selected.organizer.includes(event.extendedProps.organizer.value)));
    }
    if ($selected.eventType.length) {
      calendarEvents = calendarEvents.filter(event => !!($selected.eventType.includes(!!event.extendedProps.workorder.text ? '2' : '1')));
    }
    if ($selected.receiptStatus.length) {
      calendarEvents = calendarEvents.filter(event => !!($selected.receiptStatus.includes(event.extendedProps.woRef.receiptStatus)));
    }
    // Events with no resource gets assigned here
    if (!$selected.resource.length && !$selected.resourceGroup.length || $selected.resourceGroup.includes('z-unassigned')) {
      calendarResources.push({ id: 'z-unassigned', title: 'Unassigned', children: [] });
    }
    window.FullCalendar.getEvents().forEach(event => {
      event.remove();
    });
    calendarEvents.forEach(calendarEvent => {
      window.FullCalendar.addEvent(calendarEvent);
    });
    calendarResources.forEach(calendarResource => {
      window.FullCalendar.addResource(calendarResource);
    });
    if (pageSwitched) {
      setTimeout(() => {
        for (const id in $field) {
          if ($selected[id].length) {
            $field[id].change();
          }
        }
      })
    }
    // setTimeout(() => window.FullCalendar.updateSize(), 250);
    updateFilterCounter();
  }

  function updateFilterCounter() {
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date|showReceivedItems/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    $('#filter-calendarevent-counter').html(counter);
  }
}

// Event Modal Filters
// -----------------------------------------------------------------
export function onFilterEventResource(fieldId) {
  const dataTable = $('#resources').DataTable();
  const $resourceFilter = $(`${fieldId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${fieldId} select.multiple-resource-group-field`);
  const $resourceSkillFilter = $(`${fieldId} select.multiple-resource-skill-field`);
  /* const $statusFilter = $(`${fieldId} select.multiple-status-field`);
  const $locationFilter = $(`${fieldId} select.multiple-location-field`);
  const $departmentFilter = $(`${fieldId} select.multiple-department-field`); */
  const $emailFilter = $(`${fieldId} input.email-field`);
  const $phoneFilter = $(`${fieldId} input.phone-field`);
  const $showAvailableResourceFilter = $(`${fieldId} input.show-available-resource-field`);

  if ($resourceFilter.length) {
    $resourceFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($resourceGroupFilter.length) {
    $resourceGroupFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($resourceSkillFilter.length) {
    $resourceSkillFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($emailFilter.length) {
    $emailFilter.on('keyup', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($phoneFilter.length) {
    $phoneFilter.on('keyup', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($showAvailableResourceFilter.length) {
    $showAvailableResourceFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }

  function filterItems() {
    // Resource custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const resourceTexts = $resourceFilter.find('option:selected').map(function () {
        return $(this).text();
      }).get();
      if (!resourceTexts.length) {
        return true; // No filter applied, show all rows
      }
      const cellContent = $(dataTable.cell(dataIndex, 1).node()).text(); // Change index to target your rendered column
      return resourceTexts.includes(cellContent);
    });
    // Resource Group custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const resourceGroupValues = $resourceGroupFilter.find('option:selected').map(function () {
        return $(this).text();
      }).get();
      if (!resourceGroupValues.length) {
        return true; // No filter applied, show all rows
      }
      let cellContent = $(dataTable.cell(dataIndex, 2).node());
      cellContent = Array.from($(cellContent).find('span')).map(span => span.textContent).filter(Boolean);
      return resourceGroupValues.some(value => cellContent.includes(value));
    });
    // Resource Skill custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const resourceSkillTexts = $resourceSkillFilter.find('option:selected').map(function () {
        return $(this).text();
      }).get();
      if (!resourceSkillTexts.length) {
        return true;
      }
      let cellContent = $(dataTable.cell(dataIndex, 3).node());
      cellContent = Array.from($(cellContent).find('span')).map(span => span.textContent).filter(Boolean);
      return resourceSkillTexts.some(value => cellContent.includes(value));
    });
    // Email custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const emailInput = $emailFilter.val();
      if (!emailInput.length) {
        return true;
      }
      let cellContent = $(dataTable.cell(dataIndex, 4).node());
      cellContent = (cellContent && cellContent[0]) ? Array.from(cellContent)[0].textContent : '';
      return cellContent.includes(emailInput);
    });
    // Phone custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const phoneInput = $phoneFilter.val();
      if (!phoneInput.length) {
        return true;
      }
      let cellContent = $(dataTable.cell(dataIndex, 5).node());
      cellContent = (cellContent && cellContent[0]) ? Array.from(cellContent)[0].textContent : '';
      return cellContent.includes(phoneInput);
    });
    // Show Only Available Resources custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const row = dataTable.row(dataIndex).node();
      const isRowUnavailable = $(row).hasClass('row-unavailable');
      const filterChecked = $showAvailableResourceFilter.prop('checked');
      return filterChecked ? !isRowUnavailable : true;
    });

    $resourceFilter.selectpicker();
    $resourceGroupFilter.selectpicker();
    $resourceSkillFilter.selectpicker();
  }

  function updateFilterCounter() {
    const $selected = {
      resource: $resourceFilter.val() || [],
      resourceGroup: $resourceGroupFilter.val() || [],
      resourceSkill: $resourceSkillFilter.val() || [],
    };
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    if ($showAvailableResourceFilter.prop('checked')) {
      counter++;
    }
    $('#filter-eventresource-counter').html(counter);
  }
}

// General Event Modal Filters
// -----------------------------------------------------------------
export function onFilterGeneralEventResource(fieldId) {
  const dataTable = $('#resources_ge').DataTable();
  const $resourceFilter = $(`${fieldId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${fieldId} select.multiple-resource-group-field`);
  const $resourceSkillFilter = $(`${fieldId} select.multiple-resource-skill-field`);
  /* const $statusFilter = $(`${fieldId} select.multiple-status-field`);
  const $locationFilter = $(`${fieldId} select.multiple-location-field`);
  const $departmentFilter = $(`${fieldId} select.multiple-department-field`); */
  const $emailFilter = $(`${fieldId} input.email-field`);
  const $phoneFilter = $(`${fieldId} input.phone-field`);
  const $showAvailableResourceFilter = $(`${fieldId} input.show-available-resource-field`);

  if ($resourceFilter.length) {
    $resourceFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($resourceGroupFilter.length) {
    $resourceGroupFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($resourceSkillFilter.length) {
    $resourceSkillFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($emailFilter.length) {
    $emailFilter.on('keyup', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($phoneFilter.length) {
    $phoneFilter.on('keyup', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }
  if ($showAvailableResourceFilter.length) {
    $showAvailableResourceFilter.on('change', () => {
      filterItems();
      dataTable.draw();
      updateFilterCounter();
    });
  }

  function filterItems() {
    // Resource custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const resourceTexts = $resourceFilter.find('option:selected').map(function () {
        return $(this).text();
      }).get();
      if (!resourceTexts.length) {
        return true; // No filter applied, show all rows
      }
      const cellContent = $(dataTable.cell(dataIndex, 1).node()).text(); // Change index to target your rendered column
      return resourceTexts.includes(cellContent);
    });
    // Resource Group custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const resourceGroupValues = $resourceGroupFilter.find('option:selected').map(function () {
        return $(this).text();
      }).get();
      if (!resourceGroupValues.length) {
        return true; // No filter applied, show all rows
      }
      let cellContent = $(dataTable.cell(dataIndex, 2).node());
      cellContent = Array.from($(cellContent).find('span')).map(span => span.textContent).filter(Boolean);
      return resourceGroupValues.some(value => cellContent.includes(value));
    });
    // Resource Skill custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const resourceSkillTexts = $resourceSkillFilter.find('option:selected').map(function () {
        return $(this).text();
      }).get();
      if (!resourceSkillTexts.length) {
        return true;
      }
      let cellContent = $(dataTable.cell(dataIndex, 3).node());
      cellContent = Array.from($(cellContent).find('span')).map(span => span.textContent).filter(Boolean);
      return resourceSkillTexts.some(value => cellContent.includes(value));
    });
    // Email custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const emailInput = $emailFilter.val();
      if (!emailInput.length) {
        return true;
      }
      let cellContent = $(dataTable.cell(dataIndex, 4).node());
      cellContent = (cellContent && cellContent[0]) ? Array.from(cellContent)[0].textContent : '';
      return cellContent.includes(emailInput);
    });
    // Phone custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const phoneInput = $phoneFilter.val();
      if (!phoneInput.length) {
        return true;
      }
      let cellContent = $(dataTable.cell(dataIndex, 5).node());
      cellContent = (cellContent && cellContent[0]) ? Array.from(cellContent)[0].textContent : '';
      return cellContent.includes(phoneInput);
    });
    // Show Only Available Resources custom filtering
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const row = dataTable.row(dataIndex).node();
      const isRowUnavailable = $(row).hasClass('row-unavailable');
      const filterChecked = $showAvailableResourceFilter.prop('checked');
      return filterChecked ? !isRowUnavailable : true;
    });

    $resourceFilter.selectpicker();
    $resourceGroupFilter.selectpicker();
    $resourceSkillFilter.selectpicker();
  }

  function updateFilterCounter() {
    const $selected = {
      resource: $resourceFilter.val() || [],
      resourceGroup: $resourceGroupFilter.val() || [],
      resourceSkill: $resourceSkillFilter.val() || [],
    };
    let counter = 0;
    for (const key in $selected) {
      if (!key.match(/date/g))
        counter += $selected[key].length;
      else if (!!$selected[key])
        counter++;
    }
    if ($showAvailableResourceFilter.prop('checked')) {
      counter++;
    }
    $('#filter-generaleventresource-counter').html(counter);
  }
}