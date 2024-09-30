export function initLeftSideBarFilters(sectionId, resources) {
  const $items = $(`${sectionId} .leftSidebar .collapsible-list .person-container`);
  const $resourceFilter = $(`${sectionId} .leftSidebar select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${sectionId} .leftSidebar select.multiple-resource-group-field`);
  const $statusFilter = $(`${sectionId} .leftSidebar select.multiple-status-field`);
  const $selected = {
    resources: [],
    resourceGroups: [],
    status: []
  };
  let $groupCounterMap = {};

  if ($resourceFilter.length) {
    $resourceFilter.on('change', function() {
      $selected.resources = $(this).val() || [];
      filterItems();
    });
  }

  if ($resourceGroupFilter.length) {
    $resourceGroupFilter.on('change', function() {
      $selected.resourceGroups = $(this).val() || [];
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
      const resourceId = $el[0].id;
      const _resource = resources.all.find(resource => resource.employee.value == resourceId);
      
      if (_resource) {
        const _resourceGroup = _resource.resourceGroup.value;
        const _resourceStatus = _resource.active ? '1' : '0';
        const shouldDisplay = Boolean(
          (!$selected.resources.length || $selected.resources.includes(resourceId)) &&
          (!$selected.resourceGroups.length || $selected.resourceGroups.includes(_resourceGroup)) &&
          (!$selected.status.length || $selected.status.includes(_resourceStatus))
        ); 
        $el.toggle(shouldDisplay);

        // Group counter map
        const containerId = $el.closest('div[id*="-filter-tableWrapper"]').attr('id');
        const groupId = containerId.match(/\d+/)[0];
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
    const total = $items.filter(function() {
      return $(this).css('display') !== 'none';
    }).length;
    $(`${sectionId} .leftSidebar .card-header span.counter`).html(total);
  }
}

export function initAvailableJobsFilters(selectorId, workOrders) {
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
      const woRef = workOrders.find(wo => wo.id == woId);
      
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
  
        const shouldDisplay = Boolean(
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

export function initEventFilters(sectionId, events) {
  const $items = $(`${sectionId} .thirdColumn .card-wrapper .card-item`);

  const $field = {
    dateFrom: $(`${sectionId} .thirdColumn input#board-event-datefrom`),
    dateTo: $(`${sectionId} .thirdColumn input#board-event-dateto`),
    resource: $(`${sectionId} .thirdColumn select.multiple-resource-field`),
    resourceGroup: $(`${sectionId} .thirdColumn select.multiple-resource-group-field`),
    status: $(`${sectionId} .thirdColumn select.multiple-event-status-field`),
    priority: $(`${sectionId} .thirdColumn select.multiple-event-priority-field`),
    organizer:  $(`${sectionId} .thirdColumn select.multiple-event-organizer-field`)
  };
  const $selected = {
    dateFrom: '',
    dateTo: '',
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: []
  };

  for (const id in $field) {
    if ($field[id].length) {
      $field[id].on('change', function() {
        $selected[id] = $(this).val() || [];
        filterItems();
      });
    }
  }

  function filterItems() {
    $items.each(function() {
      const $el = $(this);
      const eventId = $el[0].id;
      const eventData = events.find(event => event.id == eventId);
      
      if (eventData) {
        let date = eventData.date.end || eventData.date.start;
        const eventResources = eventData.resources.map(resource => resource.employee.value);
        const eventResourceGroups = eventData.resources.map(resource => resource.resourceGroup.value);
        const eventStatus = eventData.status.value;
        const eventPriority = eventData.priority.value;
        const eventOrganizer = eventData.organizer.value;
  
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
  
        const shouldDisplay = Boolean(
          withinRange && 
          (!$selected.resource.length || $selected.resource.some(value => new Set(eventResources).has(value))) && // Check if the selected resources is in the event resources
          (!$selected.resourceGroup.length || $selected.resourceGroup.some(value => new Set(eventResourceGroups).has(value))) && // Check if the selected resource groups is in the event resource groups
          (!$selected.status.length || $selected.status.includes(eventStatus)) && 
          (!$selected.priority.length || $selected.priority.includes(eventPriority)) &&
          (!$selected.organizer.length || $selected.organizer.includes(eventOrganizer))
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

export function initCalendarFilters(resources, resourceGroups) {
  const $field = {
    resource: $(`#calendar-filters select.multiple-resource-field`),
    resourceGroup: $(`#calendar-filters select.multiple-resource-group-field`),
    status: $(`#calendar-filters select.multiple-event-status-field`),
    priority: $(`#calendar-filters select.multiple-event-priority-field`),
    organizer: $(`#calendar-filters select.multiple-event-organizer-field`)
  };
  const $selected = {
    resource: [],
    resourceGroup: [],
    status: [],
    priority: [],
    organizer: []
  };

  for (const id in $field) {
    if ($field[id].length) {
      $field[id].on('change', function() {
        $selected[id] = $(this).val() || [];
        filterItems();
      });
    }
  }

  function filterItems() {
    window.FullCalendar.refetchResources();
    window.FullCalendar.refetchEvents();

    window.FullCalendar.getResources().forEach(resource => {
      resource.remove();
    });

    let calendarResources = resourceGroups.map(resourceGroup => ({
      id: resourceGroup.value,
      title: resourceGroup.text,
      children: resourceGroup.resources.map(resource => ({
        id: resource.employee.value,
        title: resource.employee.text,
        extendedProps: resource
      })),
      get resourceCount() {
        return this.children.length;
      },
      extendedProps: resourceGroup
    }));
    
    if ($selected.resourceGroup.length) {
      calendarResources = calendarResources.filter(calendarResource => $selected.resourceGroup.includes(calendarResource.id));
    }
    if ($selected.resource.length) {
      calendarResources.forEach(calendarResource => {
        calendarResource.children = calendarResource.children.filter(resource => $selected.resource.includes(resource.id));
      });   
    }

    let calendarEvents = window.FullCalendar.getEvents();
    if ($selected.status.length) {
      calendarEvents = calendarEvents.filter(event => Boolean($selected.status.includes(event.extendedProps.status.value)));
    }

    if ($selected.priority.length) {
      calendarEvents = calendarEvents.filter(event => Boolean($selected.priority.includes(event.extendedProps.priority.value)));
    }

    if ($selected.organizer.length) {
      calendarEvents = calendarEvents.filter(event => Boolean($selected.organizer.includes(event.extendedProps.organizer.value)));
    }
    
    // Events with no resource gets assigned here
    if (!$selected.resource.length && !$selected.resourceGroup.length) {
      calendarResources.push({ id: 'general', title: 'General', children: [] });
    }

    window.FullCalendar.getEvents().forEach(event => {
      event.remove();
    });
    calendarEvents.forEach(calendarEvent => {
      window.FullCalendar.addEvent(calendarEvent);
    });

    const eventIds = calendarEvents.map(event => event.id);

    calendarResources.forEach(calendarResource => {
      calendarResource.children = calendarResource.children.filter(resource => Boolean(eventIds.some(value => new Set(resource.extendedProps.events).has(value))));
    });
    calendarResources.forEach(calendarResource => {
      window.FullCalendar.addResource(calendarResource);
    });

    const currentView = window.FullCalendar.view;
    const start = moment(currentView.currentStart);
    const end = moment(currentView.currentEnd);

    // Resource groups counter
    $('div.fc-scroller-harness tbody tr[role*="row"]').each(function() {
      const rowId = $(this).find('td.fc-resource').attr('data-resource-id');
      const resourceGroup = calendarResources.find(resourceGroup => resourceGroup.id == rowId);
      if (resourceGroup) {
       const counter = $(this).find('span.counter').text();
       console.log(resourceGroup, counter);
       if (counter) {
        $(this).find('span.counter').text(resourceGroup.resourceCount);
       }
      }
    });

    setTimeout(() => window.FullCalendar.updateSize(), 250);

    updateHeaderCount();
    
    // Update header column counter
    function updateHeaderCount() {
      let total = 0;
      calendarResources.forEach(resourceGroup => {
        total += +resourceGroup?.resourceCount || 0;
        console.log(resourceGroup.resourceCount, total);
      });
      $(`div#main-resource-header span.counter`).html(total);
      // $('#eventsViewCounter').text(total);
    }
  }
}