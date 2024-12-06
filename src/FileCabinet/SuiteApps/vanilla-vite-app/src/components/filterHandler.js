import * as dataSet from './dataSet';

export function initLeftSideBarFilters(sectionId) {
  const $items = $(`${sectionId} .leftSidebar .collapsible-list .person-container`);
  const $resourceFilter = $(`${sectionId} .leftSidebar select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${sectionId} .leftSidebar select.multiple-resource-group-field`);
  const $statusFilter = $(`${sectionId} .leftSidebar select.multiple-status-field`);
  const $selected = {
    resource: [],
    resourceGroup: [],
    status: []
  };
  let $groupCounterMap = {};

  if ($resourceFilter.length) {
    $resourceFilter.on('change', function() {
      $selected.resource = $(this).val() || [];
      filterItems();
    });
  }

  if ($resourceGroupFilter.length) {
    $resourceGroupFilter.on('change', function() {
      $selected.resourceGroup = $(this).val() || [];
      filterItems();
    });
  }

  if ($statusFilter.length) {
    $statusFilter.on('change', function() {
      $selected.status = $(this).val() || [];
      filterItems();
    });
  }

  function filterItems() {
    $groupCounterMap = {};

    $items.each(function() {
      const $el = $(this);
      const elementId = $(this)[0].id;
      const resourceId = elementId.split('-').pop();
      const containerId = $el.closest('div[id*="-filter-tableWrapper"]').attr('id');
      const groupId = (containerId.match('vendor')|| containerId.match(/\d+/))[0];
      const _resource = dataSet.resources.find(resource => resource.employee.value == resourceId);
      const _vendor = dataSet.vendors.find(vendor => vendor.vendor.value == resourceId);
      
      if (_resource || _vendor) {
        let _resourceGroup = [];
        if (_resource) {
          _resourceGroup = [..._resourceGroup, ..._resource.resourceGroups.map(resourceGroup => resourceGroup.value)];
          _resourceGroup = Array.from(new Set(_resourceGroup));
        } else {
          _resourceGroup = ['vendor'];
        }
        const _resourceStatus = (_resource || _vendor).active ? '1' : '0';

        const shouldDisplay = !!(
          (!$selected.resource.length || $selected.resource.includes(resourceId)) &&
          (!$selected.resourceGroup.length || $selected.resourceGroup.includes(groupId)) &&
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
    updateHeaderCount();
  }

  // Update header column counter
  function updateHeaderCount() {
    // Update group counter
    $.each($groupCounterMap, (headerId, count) => {
      $(`${sectionId} .leftSidebar #resourceGroup-${headerId}-filter-tableWrapper span.counter`).html(count);
    });
    /* const total = $items.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    $(`${sectionId} .leftSidebar .card-header span.counter`).html(total); */
  }
}

export function initAvailableJobsFilters(selectorId) {
  const $items = $(`${selectorId} .card-wrapper .card-item`);
  const $dateFromFilter = $(`${selectorId} input[id*="datefrom"]`);
  const $dateToFilter = $(`${selectorId} input[id*="dateto"]`);
  const $customerFilter = $(`${selectorId} select.multiple-customer-field`);
  const $woTitleFilter = $(`${selectorId} input#woTitle`);
  const $selected = {
    dateFrom: '',
    dateTo: '',
    customers: [],
    woTitle: ''
  };

  if ($dateFromFilter.length) {
    $dateFromFilter.on('change', function() {
      $selected.dateFrom = $(this).val() || [];
      filterItems();
    });
  }

  if ($dateToFilter.length) {
    $dateToFilter.on('change', function() {
      $selected.dateTo = $(this).val() || [];
      filterItems();
    });
  }

  if ($customerFilter.length) {
    $customerFilter.on('change', function() {
      $selected.customers = $(this).val() || [];
      filterItems();
    });
  }

  if ($woTitleFilter.length) {
    $woTitleFilter.on('keyup', function() {
      $selected.woTitle = $(this).val();
      filterItems();
    });
  }

  function filterItems() {
    $items.each(function() {
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
          woTitle.match(regExp)
        );      
        $el.toggle(shouldDisplay);
      }
    });
    updateHeaderCount();
  }

  // Update header column counter
  function updateHeaderCount() {
    const total = $items.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    $(`${selectorId} .card-header span.counter`).html(total);
  }
}

export function initEventFilters(sectionId) {
  // On click resources
  let resourceIds = [];
  $('.person-container').on('click', function() {
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

    $('.person-container').each(function() {
      const elementId =  $(this)[0].id;
      const resourceId = elementId.split('-').pop();

      if (resourceIds.includes(resourceId)) {
        $(this).addClass('row-available');
      } else {
        $(this).removeClass('row-available');
      }
    });
    resourceIds = Array.from(new Set(resourceIds));
    $(`${sectionId} .thirdColumn select.multiple-resource-field`).val(resourceIds).change();
  });

  const $items = $(`${sectionId} .thirdColumn .card-wrapper .card-item`);

  const $field = {
    dateFrom: $(`${sectionId} .thirdColumn input#board-event-datefrom`),
    dateTo: $(`${sectionId} .thirdColumn input#board-event-dateto`),
    resource: $(`${sectionId} .thirdColumn select.multiple-resource-field`),
    resourceGroup: $(`${sectionId} .thirdColumn select.multiple-resource-group-field`),
    status: $(`${sectionId} .thirdColumn select.multiple-event-status-field`),
    priority: $(`${sectionId} .thirdColumn select.multiple-event-priority-field`),
    organizer:  $(`${sectionId} .thirdColumn select.multiple-event-organizer-field`),
    eventType:  $(`${sectionId} .thirdColumn select.multiple-event-type-field`),
  };
  const $selected = {
    dateFrom: '',
    dateTo: '',
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: [],
    eventType: []
  };

  for (const id in $field) {
    if ($field[id].length) {
      $field[id].on('change', function() {
        $selected[id] = $(this).val() || [];
        filterItems();

        // Highligh resource rows
        if (id == 'resource') {
          $('.person-container').each(function() {
            const elementId = $(this)[0].id;
            const resourceId = elementId.split('-').pop();
            if ($selected[id].includes(resourceId)) {
              $(this).addClass('row-available');
            } else {
              $(this).removeClass('row-available');
            }
          });
        }
      });
    }
  }

  function filterItems() {
    $items.each(function() {
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
          (!$selected.eventType.length || $selected.eventType.includes(eventType))
        ); 

        $el.toggle(shouldDisplay);
      }
    });
    updateHeaderCount();
  }

  // Update header column counter
  function updateHeaderCount() {
    const total = $items.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    $(`${sectionId} .thirdColumn .card-header span.counter`).html(total);
  }
}

export function initResourceDtCustomFilters(dataTable, resourceFieldId, resourceGroupFieldId) {
  const resourceFilter = $(`<select class="selectpicker mx-auto ${resourceFieldId}" title="Filter by Name" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple style="margin-bottom: 35px">
    ${dataSet.resources.map(resource => `<option value="${resource.id}">${resource.name}</option>`)}
    </select>`);
  const resourceGroupFilter = $(`<select class="selectpicker mx-auto ${resourceGroupFieldId}" title="Filter by Group" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
    ${dataSet.resourceGroups.map(resourceGroup => `<option value="${resourceGroup.value}">${resourceGroup.text}</option>`)}
  </select>`);
  
  // Append filters in the middle section
  $('div.middle-col').append(resourceFilter).append(resourceGroupFilter);
  
  // Resource custom filtering
  $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
    const resourceValues = resourceFilter.find('option:selected').map(function() {
      return $(this).text();
    }).get();
    if (!resourceValues.length) {
      return true; // No filter applied, show all rows
    }
    const cellContent = $(dataTable.cell(dataIndex, 1).node()).text(); // Change index to target your rendered column
    return resourceValues.includes(cellContent);
  });
  // Resource Group custom filtering
  $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
    const resourceGroupValues = resourceGroupFilter.find('option:selected').map(function() {
      return $(this).text();
    }).get();
    if (!resourceGroupValues.length) {
      return true; // No filter applied, show all rows
    }
    let cellContent = $(dataTable.cell(dataIndex, 2).node()).text(); // Change index to target your rendered column
    cellContent = cellContent.split(', ');
    return resourceGroupValues.some(value => cellContent.includes(value));
  });

  resourceFilter.on('change', () => dataTable.draw());
  resourceGroupFilter.on('change', () => dataTable.draw());

  resourceFilter.selectpicker();
  resourceGroupFilter.selectpicker();
}

export function initCalendarFilters(pageSwitched, info) {
  const $field = {
    resource: $(`#calendar-filters select.multiple-resource-field`),
    resourceGroup: $(`#calendar-filters select.multiple-resource-group-field`),
    status: $(`#calendar-filters select.multiple-event-status-field`),
    priority: $(`#calendar-filters select.multiple-event-priority-field`),
    organizer: $(`#calendar-filters select.multiple-event-organizer-field`),
    eventType:  $(`#calendar-filters select.multiple-event-type-field`),
  };
  const $selected = {
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: [],
    eventType: []
  };

  if (pageSwitched) {
    let hasDefaultFilter = false;
    for (const id in $field) {
      if ($field[id].length) {
        $selected[id] = $field[id].val() || [];
        if ($selected[id].length) {
          hasDefaultFilter = true;
        }
      }
    }
    if (hasDefaultFilter) {
      filterItems();
    }
  } else {
    for (const id in $field) {
      if ($field[id].length) {
        $field[id].on('change', function() {
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
    // Remove unassigned resources
    /* const eventIds = calendarEvents.map(event => event.id);
    calendarResources.forEach(calendarResource => {
      calendarResource.children = calendarResource.children.filter(resource => !!(eventIds.some(value => new Set(resource.extendedProps.events).has(value))));
    }); */
    calendarResources.forEach(calendarResource => {
      window.FullCalendar.addResource(calendarResource);
    });

    // Resource groups counter
    /* $('div.fc-scroller-harness tbody tr[role*="row"]').each(function() {
      const rowId = $(this).find('td.fc-resource').attr('data-resource-id');
      const resourceGroup = calendarResources.find(resourceGroup => resourceGroup.id == rowId);
      if (resourceGroup) {
       const counter = $(this).find('span.counter').text();
       if (counter) {
        $(this).find('span.counter').text(resourceGroup.resourceCount);
        // console.log('counter', counter, resourceGroup.resourceCount)
       }
      }
    }); */
    
    if (pageSwitched) {
      setTimeout(() => {
        for (const id in $field) {
          if ($selected[id].length) {
            $field[id].change();
          }
        }
        updateCurrentCalendarPageEventCount(info);
      })
    }

    // setTimeout(() => window.FullCalendar.updateSize(), 250);
  }
}

export function updateCurrentCalendarPageEventCount(info) {
  const currentView = window.FullCalendar.view;
  const start = moment(currentView.currentStart);
  const end = moment(currentView.currentEnd);
  
  // Check if the event is in the current view's date range
  const currentEvents = window.FullCalendar.getEvents().filter(event => {
    return moment(event.end).isBetween(start, end, null, '[]') ||  moment(event.start).isSameOrBefore(start) && moment(event.end).isSameOrAfter(end);
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
}