import * as dataSet from './dataSet';

$(document).ready(() => {
  window.openAddResourceModal = (eventId, dataTransfer) => {
    const { type, id } = dataTransfer;
    const eventData = dataSet.events.find(event => event.id == eventId);
    const woId = eventData.workorder.value;
    const woRef = woId ? dataSet.workOrders.find(wo => wo.id == woId) : {};
    let payload, resourceName;

    if (type === 'employee') {
      resourceName = dataSet.resources.find(resource => resource.id == id).name;
      const woResourcesFiltered = woId ? dataSet.woResources.filter(resource => resource.workorder.value == woId) : [];
      
      let foundObj, resourceToUse;
      if (woResourcesFiltered.length) {
        foundObj = woResourcesFiltered.find(woResource => woResource.employee.value == id);
        if (!!foundObj) {
          resourceToUse = deepCopy(foundObj);
        }
      }
      foundObj = eventData.resources.find(eventResource => eventResource.employee.value == id);
      if (!!foundObj) {
        resourceToUse = deepCopy(foundObj);
      }

      if (!resourceToUse) {
        resourceToUse = dataSet.resources.find(resource => resource.id == id);
      }

      payload = {
        // eventDataSrc: eventData,
        woRef,
        eventData: {
          id: eventId,
          selectedResources: [resourceToUse]
        },
        woResources: woResourcesFiltered
      };

      console.log('Add resources payload', payload);

      Swal.fire({
        title: 'Confirm Add',
        text: `Add resource ${resourceName} to the Event ID ${eventId}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#817c7c',
        confirmButtonText: 'Yes'
      })
      .then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            didOpen: () => {
              Swal.showLoading();
              fetch(
                `${dataSet.suiteletUrl}&mode=updateEventRecord`, {
                  method: 'POST',
                  body: JSON.stringify(payload),
                  headers: {
                    'Content-Type': 'application/json',
                  }
              })
              .then(response => response.json())
              .then(result => {
                if (result.code == 200) {
                  Swal.fire({
                    title: 'Success!',
                    text: `Resource ${resourceName} has been added to Event ID ${eventId}`,
                    icon: 'success'
                  })
                  .then(() => {
                    window.location.reload();
                  });
                } else {
                  Swal.fire({
                    title: 'Unexpected Error',
                    text: `Error: ${result.errorMsg}`,
                    icon: 'error'
                  });
                }
                Swal.hideLoading();
              })
              .catch(error => {
                Swal.fire(
                  'Unexpected Error',
                  error.message,
                  'error'
                );
                Swal.hideLoading();
              });
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            text: `Adding resource to the Event Record ID ${eventId}...`
          });
        }
      });

    } else if (type === 'vendor') {
      resourceName = dataSet.vendors.find(vendor => vendor.id == id).name;
      let unassignedVendors = deepCopy(dataSet.vendors).filter(vendor => !!!eventData.vendors.map(vendor => vendor.vendor.value).includes(vendor.id));
      unassignedVendors = [...eventData.vendors, ...unassignedVendors];
      const vendorToUse = unassignedVendors.find(vendor => vendor.id == id);
      
      payload = {
        // eventDataSrc: eventData,
        woRef,
        eventData: {
          id: eventId,
          selectedVendors: [vendorToUse]
        },
        woResources: []
      };

      console.log('Add vendors payload', payload);

      Swal.fire({
        title: 'Confirm Add',
        text: `Enter Quantity for vendor ${resourceName}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#817c7c',
        confirmButtonText: 'Yes',
        input: 'number', // Set input type to number
        inputValue: 1, // Set the default value
        inputAttributes: {
          min: 1, // Minimum value for quantity
          max: 100, // Maximum value for quantity
          step: 1 // Step increment (optional)
        },
        preConfirm: (quantity) => {
          // Check if the input is valid
          if (quantity < 1) {
            Swal.showValidationMessage('Please enter a valid quantity');
            return false;
          }
          return quantity; // Return the quantity entered by the user
        },
      })
      .then(result => {
        if (result.isConfirmed) {
          const quantity = result.value;
          payload.eventData.selectedVendors[0].quantityRequired = quantity;

          Swal.fire({
            didOpen: () => {
              Swal.showLoading();
              fetch(
                `${dataSet.suiteletUrl}&mode=updateEventRecord`, {
                  method: 'POST',
                  body: JSON.stringify(payload),
                  headers: {
                    'Content-Type': 'application/json',
                  }
              })
              .then(response => response.json())
              .then(result => {
                if (result.code == 200) {
                  Swal.fire({
                    title: 'Success!',
                    text: `Vendor ${resourceName} has been added to Event ID ${eventId}`,
                    icon: 'success'
                  })
                  .then(() => {
                    window.location.reload();
                  });
                } else {
                  Swal.fire({
                    title: 'Unexpected Error',
                    text: `Error: ${result.errorMsg}`,
                    icon: 'error'
                  });
                }
                Swal.hideLoading();
              })
              .catch(error => {
                Swal.fire(
                  'Unexpected Error',
                  error.message,
                  'error'
                );
                Swal.hideLoading();
              });
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            text: `Adding vendor to the Event Record ID ${eventId}...`
          });
        }
      });
    }  
  }

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
});