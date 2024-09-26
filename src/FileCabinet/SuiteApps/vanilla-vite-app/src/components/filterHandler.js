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
  const $dateFromFilter = $(`${sectionId} .thirdColumn input#board-event-datefrom`);
  const $dateToFilter = $(`${sectionId} .thirdColumn input#board-event-dateto`);
  const $resourceFilter = $(`${sectionId} .thirdColumn select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${sectionId} .thirdColumn select.multiple-resource-group-field`);
  const $statusFilter = $(`${sectionId} .thirdColumn select.multiple-event-status-field`);
  const $priorityFilter = $(`${sectionId} .thirdColumn select.multiple-event-priority-field`);
  const $organizerFilter = $(`${sectionId} .thirdColumn select.multiple-event-organizer-field`);
  const $selected = {
    dateFrom: '',
    dateTo: '',
    resources: [],
    resourceGroups: [],
    status: [],
    priority: [],
    organizer: []
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

  if ($priorityFilter.length) {
    $priorityFilter.on('change', function() {
      $selected.priority = $(this).val() || [];
      filterItems();
    });
  }

  if ($organizerFilter.length) {
    $organizerFilter.on('change', function() {
      $selected.organizer = $(this).val() || [];
      filterItems();
    });
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
          (!$selected.resources.length || $selected.resources.some(value => new Set(eventResources).has(value))) && // Check if the selected resources is in the event resources
          (!$selected.resourceGroups.length || $selected.resourceGroups.some(value => new Set(eventResourceGroups).has(value))) && // Check if the selected resource groups is in the event resource groups
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
  const sectionId = '#calendar-filters';
  const $dateFromFilter = $(`${sectionId} input#calendar-event-datefrom`);
  const $dateToFilter = $(`${sectionId} input#calendar-event-dateto`);
  const $resourceFilter = $(`${sectionId} select.multiple-resource-field`);
  const $resourceGroupFilter = $(`${sectionId} select.multiple-resource-group-field`);
  const $statusFilter = $(`${sectionId} select.multiple-event-status-field`);
  const $priorityFilter = $(`${sectionId} select.multiple-event-priority-field`);
  const $organizerFilter = $(`${sectionId} select.multiple-event-organizer-field`);
  const $selected = {
    dateFrom: '',
    dateTo: '',
    resources: [],
    resourceGroups: [],
    status: [],
    priority: [],
    organizer: []
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

  if ($priorityFilter.length) {
    $priorityFilter.on('change', function() {
      $selected.priority = $(this).val() || [];
      filterItems();
    });
  }

  if ($organizerFilter.length) {
    $organizerFilter.on('change', function() {
      $selected.organizer = $(this).val() || [];
      filterItems();
    });
  }

  function filterItems() {
    const calendarEvents = FullCalendar.getEvents();
    const displayedEventIds = [];
    let eventsResourceIds = [];
    for (const event of calendarEvents) {
      // console.log('Filter Event', event);
      const eventId = event.id;
      const eventData = event.extendedProps;
      
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
          (!$selected.resources.length || $selected.resources.some(value => new Set(eventResources).has(value))) && // Check if the selected resources is in the event resources
          (!$selected.resourceGroups.length || $selected.resourceGroups.some(value => new Set(eventResourceGroups).has(value))) && // Check if the selected resource groups is in the event resource groups
          (!$selected.status.length || $selected.status.includes(eventStatus)) && 
          (!$selected.priority.length || $selected.priority.includes(eventPriority)) &&
          (!$selected.organizer.length || $selected.organizer.includes(eventOrganizer))
        );

        console.log('>>>', { eventOrganizer, '$selected.organizer': $selected.organizer, bool: $selected.organizer.includes(eventOrganizer), shouldDisplay })

        event.setProp('display', shouldDisplay ? '' : 'none');

        if (shouldDisplay) {
          displayedEventIds.push(eventId);
          const resourceIds = eventData.resources.map(resource => resource.employee.value);
          eventsResourceIds = [...eventsResourceIds, ...resourceIds];
        }
      }
    } 

    const resourceGroupMap = {};
    resourceGroups.forEach(resourceGroup => {
      resourceGroupMap[resourceGroup.value] = [];
    });

    // Resources display
    $('div.fc-scroller-harness tbody tr[role*="row"]').each(function() {
      const rowId = $(this).find('td.fc-resource').attr('data-resource-id');

      const isResourceGroup = Boolean(resourceGroups.find(resourceGroup => resourceGroup.value == rowId));
      if (!isResourceGroup) {
        let shouldDisplay = Boolean(eventsResourceIds.includes(rowId));

        if (!$selected.resources.length && !$selected.resourceGroups.length && !$selected.status.length && !$selected.priority.length && !$selected.organizer.length && !$selected.dateFrom && !$selected.dateTo) {
          shouldDisplay = true;
        }
        
        if (shouldDisplay) {
          $(this).css('display', '');
          $(this).find('div.fc-datagrid-cell-frame').css('height', '34px');
          
          const _resource = resources.all.find(resource => resource.employee.value == rowId);
          if (_resource) {
            if (resourceGroupMap[_resource.resourceGroup.value]) {
              resourceGroupMap[_resource.resourceGroup.value].push(rowId);
            }
          }
        } else {
          $(this).css('display', 'none');
        }
      }
    });

    // Resource groups counter
    $('div.fc-scroller-harness tbody tr[role*="row"]').each(function() {
      const rowId = $(this).find('td.fc-resource').attr('data-resource-id');
      const isResourceGroup = Boolean(resourceGroups.find(resourceGroup => resourceGroup.value == rowId));
      if (isResourceGroup) {
       const counter = $(this).find('span.counter').text();
       if (counter) {
        $(this).find('span.counter').text(resourceGroupMap[rowId].length);
       }
      }
    });

    setTimeout(() => {
      window.FullCalendar.updateSize();
    }, 250);

    updateHeaderCount();
    
    // Update header column counter
    function updateHeaderCount() {
      let total = 0;
      resourceGroups.forEach(resourceGroup => {
        total += resourceGroupMap[resourceGroup.value].length;
      })
      $(`div#main-resource-header span.counter`).html(total);

      // Reset
      resourceGroups.forEach(resourceGroup => {
        resourceGroupMap[resourceGroup.value] = [];
      });
    }
  }
}