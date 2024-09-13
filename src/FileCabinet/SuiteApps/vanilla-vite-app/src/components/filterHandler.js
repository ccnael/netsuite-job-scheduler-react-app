export function initLeftSideBarFilters(resources) {
  const $leftSideBarFilters = $('#leftSidebar select.selectpicker'); // Applies to all multiselect filter
  let selectedResources = [], selectedResourceGroups = [], selectedStatuses = [];

  $leftSideBarFilters.on('change', function() {
    const selectedValues = $(this).val() || [];
    const parentClass = $(this).parent().attr('class').split(' ').find(cls => cls.match(/multiple-/gi));
    const counterMap = {};
    
    switch (parentClass) {
      case 'multiple-resource-field':
        selectedResources = selectedValues;
        break;
      case 'multiple-resource-group-field':
        selectedResourceGroups = selectedValues;
        break;
      case 'multiple-status-field':
        selectedStatuses = selectedValues;
        break;
    }

    const $items = $('#leftSidebar .collapsible-list .person-container');
    $items.each(function() {
      const $el = $(this);
      const containerId = $el.closest('div[id*="-filter-tableWrapper"]').attr('id');
      const headerId = containerId.match(/\d+/)[0];
      if (!counterMap[headerId]) {
        counterMap[headerId] = 0;
      }
      let toDisplay = false, resource;

      if (selectedResources.length) {
        toDisplay = selectedResources.includes($el.attr('id'));
      }

      if (toDisplay && selectedResourceGroups.length) {
        resource = resources.all.find(resource => resource.employee.value == $el.attr('id'));
        if (resource) {
          toDisplay = selectedResourceGroups.includes(resource.resourceGroup.value);
        }
      }

      if (toDisplay && selectedStatuses.length) {
        resource = resources.all.find(resource => resource.employee.value == $el.attr('id'));
        if (resource) {
          if (selectedStatuses.includes('1')) {
            toDisplay = Boolean(resource.active);
          } else if (selectedStatuses.includes('2')) {
            toDisplay = !Boolean(resource.active);
          } else {
            toDisplay = true;
          }
        }
      }

      // Display all for no selected filters (default)
      if (!selectedResources.length && !selectedResourceGroups.length && !selectedStatuses.length) {
        toDisplay = true;
      }

      $el.toggle(toDisplay);
      if (toDisplay) {
        counterMap[headerId]++;
      }
    });

    // Update group counter
    $.each(counterMap, function(headerId, count) {
      $(`#leftSidebar #resourceGroup-${headerId}-filter-tableWrapper span.counter`).html(count);
    });

    // Update header column counter
    const total = Object.values(counterMap).reduce((x, y) => x + y, 0);
    $('#leftSidebar .card-header span.counter').html(total);
  });
}

export function initAvailableJobsFilters(workOrders) {
  const $items = $('#secondColumn .card-wrapper .card-item');
  const $dateFromFilter = $('#secondColumn input#job-datefrom');
  const $dateToFilter = $('#secondColumn input#job-dateto');
  const $customerFilter = $('#secondColumn select.multiple-customer-field');
  const $woTitleFilter = $('#secondColumn input#woTitle');
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
    $('#secondColumn .card-header span.counter').html(total);
  }
}

export function initEventJobsFilters(events) {
  const $items = $('#thirdColumn .card-wrapper .card-item');
  const $dateFromFilter = $('#thirdColumn input#event-datefrom');
  const $dateToFilter = $('#thirdColumn input#event-dateto');
  const $resourceFilter = $('#thirdColumn select.multiple-resource-field');
  const $resourceGroupFilter = $('#thirdColumn select.multiple-resource-group-field');
  const $statusFilter = $('#thirdColumn select.multiple-event-status-field');
  const $priorityFilter = $('#thirdColumn select.multiple-event-priority-field');
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
    $('#thirdColumn .card-header span.counter').html(total);
  }
}