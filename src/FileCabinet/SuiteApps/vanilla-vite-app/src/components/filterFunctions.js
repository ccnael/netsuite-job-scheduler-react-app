import * as dataSet from './dataSet';

// Board Filters
// -----------------------------------------------------------------
export function onFilterResource(fieldId) {
  const $items = $(`#boardSection .leftSidebar .collapsible-list .person-container`);
  const $resourceFilter = $(`${fieldId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${fieldId} select.multiple-resource-group-field`);
  const $statusFilter = $(`${fieldId} select.multiple-status-field`);
  const $resourceSkillFilter = $(`${fieldId} select.multiple-resource-skill-field`);
  const $selected = {
    resource: [],
    resourceGroup: [],
    resourceSkill: [],
    status: []
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
      const _asset = dataSet.assets.find(asset => asset.item.value == resourceId);

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
        const shouldDisplay = !!(
          (!$selected.resource.length || $selected.resource.includes(resourceId)) &&
          (!$selected.resourceGroup.length || $selected.resourceGroup.includes(groupId)) &&
          (!$selected.resourceSkill.length || $selected.resourceSkill.some(value => new Set(_resourceSkill).has(value))) &&
          (!$selected.status.length || $selected.status.includes(_resourceStatus))
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
  const $dateFromFilter = $(`${fieldId} input[id*="datefrom"]`);
  const $dateToFilter = $(`${fieldId} input[id*="dateto"]`);
  const $customerFilter = $(`${fieldId} select.multiple-customer-field`);
  const $woTitleFilter = $(`${fieldId} input[id*="wo-title"]`);
  const $selected = {
    dateFrom: '',
    dateTo: '',
    customers: [],
    woTitle: ''
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
      $selected.customers = $(this).val() || [];
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
        const woTitle = woRef.title;
        const regExp = new RegExp($selected.woTitle, 'gi');
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
          (!$selected.customers.length || $selected.customers.includes(customerId)) &&
          ($selected.woTitle ? woTitle.match(regExp) : true)
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
    showReceivedItems: $(`${fieldId} input.form-check-input`)
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
    showReceivedItems: false
  };
  for (const id in $field) {
    if ($field[id].length) {
      $field[id].on('change', function () {
        if (id != 'showReceivedItems') {
          $selected[id] = $(this).val() || (!id.match(/date/gi) ? [] : '');
        } else {
          $selected[id] = $(this).prop('checked');
        }
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
          (!$selected.showReceivedItems || eventData.hasQuantityReceived === $selected.showReceivedItems)
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
        const eventAssets = eventData.assets.map(asset => asset.item.value);
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

export function onFilterEventResource(fieldId) {
  const dataTable = $('#resources').DataTable();
  const $resourceFilter = $(`${fieldId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${fieldId} select.multiple-resource-group-field`);
  const $resourceSkillFilter = $(`${fieldId} select.multiple-resource-skill-field`);
  const $showAvailableResourceFilter = $(`${fieldId} input.form-check-input`);

  $resourceFilter.on('change', () => {
    filterItems();
    dataTable.draw();
    updateFilterCounter();
  });
  $resourceGroupFilter.on('change', () => {
    filterItems();
    dataTable.draw();
    updateFilterCounter();
  });
  $resourceSkillFilter.on('change', () => {
    filterItems();
    dataTable.draw();
    updateFilterCounter();
  });
  $showAvailableResourceFilter.on('change', function () {
    const show = $(this).prop('checked');
    if (show) {
      dataTable.ajax.reload();
      dataTable.rows('.row-unavailable').nodes().to$().remove();
    } else {
      dataTable.ajax.reload();
    }
    updateFilterCounter();
  });

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

export function onFilterGeneralEventResource(fieldId) {
  const dataTable = $('#resources_ge').DataTable();
  const $resourceFilter = $(`${fieldId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${fieldId} select.multiple-resource-group-field`);
  const $resourceSkillFilter = $(`${fieldId} select.multiple-resource-skill-field`);
  const $showAvailableResourceFilter = $(`${fieldId} input.form-check-input`);

  $resourceFilter.on('change', () => {
    filterItems();
    dataTable.draw();
    updateFilterCounter();
  });
  $resourceGroupFilter.on('change', () => {
    filterItems();
    dataTable.draw();
    updateFilterCounter();
  });
  $resourceSkillFilter.on('change', () => {
    filterItems();
    dataTable.draw();
    updateFilterCounter();
  });
  $showAvailableResourceFilter.on('change', function () {
    const show = $(this).prop('checked');
    if (show) {
      dataTable.ajax.reload();
      dataTable.rows('.row-unavailable').nodes().to$().remove();
    } else {
      dataTable.ajax.reload();
    }
    updateFilterCounter();
  });

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
    showReceivedItems: $(`${fieldId} input.form-check-input`)
  };
  const $selected = {
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: [],
    eventType: [],
    showReceivedItems: false
  };
  if (pageSwitched) {
    let hasDefaultFilter = false;
    for (const id in $field) {
      if ($field[id].length) {
        if (id != 'showReceivedItems') {
          $selected[id] = $field[id].val() || [];
          hasDefaultFilter = !!$selected[id].length;
        } else {
          $selected[id] = $field[id].prop('checked');
          hasDefaultFilter = !!$selected[id];
        }
      }
    }
    if (hasDefaultFilter) {
      filterItems();
    }
  } else {
    for (const id in $field) {
      if ($field[id].length) {
        $field[id].on('change', function () {
          if (id != 'showReceivedItems') {
            $selected[id] = $(this).val() || [];
          } else {
            $selected[id] = $(this).prop('checked');
          }
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
      children: resourceGroup.resources.map(resource => ({
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
    if ($selected.showReceivedItems) {
      calendarEvents = calendarEvents.filter(event => $selected.showReceivedItems == event.extendedProps.hasQuantityReceived);
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
        // updateCurrentCalendarPageEventCount(info);
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

/* export function updateCurrentCalendarPageEventCount(info) {
  const currentView = window.FullCalendar.view;
  const start = moment(currentView.currentStart);
  const end = moment(currentView.currentEnd);

  // Check if the event is in the current view's date range
  const currentEvents = window.FullCalendar.getEvents().filter(event => {
    return moment(event.end).isBetween(start, end, null, '[]') || moment(event.start).isSameOrBefore(start) && moment(event.end).isSameOrAfter(end);
  });
  $('#eventsViewCounter').text(currentEvents.length);

  // 2nd approach (catch)
  if (!currentEvents.length) {
    const allEvents = window.FullCalendar.getEvents(); // Get all loaded events
    const currentPageEvents = [];

    // Filter events that fall within the current view date range
    allEvents.forEach(event => {
      const eventStart = event.start;
      const eventEnd = event.end || event.start; // Use start if end is not defined

      // Check if the event falls within the current view's date range
      if (eventStart < info.end && eventEnd >= info.start) {
        currentPageEvents.push(event);
      }
    });
    $('#eventsViewCounter').text(currentPageEvents.length);
  }
} */

export function clearFilters(fieldId) {
  // Clear multiselect fields
  $(`${fieldId} select`).each(function () {
    $(this).val([]).change();
  });
  // Unmark checkboxes
  $(`${fieldId} input.form-check-input`).each(function () {
    $(this).prop('checked', false).change();
  });
  // Clear freeform/date fields
  $(`${fieldId} input.form-control`).each(function () {
    const elementId = $(this)[0].id;
    if (elementId.match(/wo-title/g)) {
      $(this).val('').trigger('keyup');
    } else {
      $(this).val('').change();
    }
  });
}