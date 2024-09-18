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

export function initAvailableJobsFilters(sectionId, workOrders) {
  const $items = $(`${sectionId} .secondColumn .card-wrapper .card-item`);
  const $dateFromFilter = $(`${sectionId} .secondColumn input#board-job-datefrom`);
  const $dateToFilter = $(`${sectionId} .secondColumn input#board-job-dateto`);
  const $customerFilter = $(`${sectionId} .secondColumn select.multiple-customer-field`);
  const $woTitleFilter = $(`${sectionId} .secondColumn input#woTitle`);
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
    $(`${sectionId} .secondColumn .card-header span.counter`).html(total);
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
  const $selected = {
    dateFrom: '',
    dateTo: '',
    resources: [],
    resourceGroups: [],
    status: [],
    priority: []
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
          (!$selected.priority.length || $selected.priority.includes(eventPriority))
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