import * as dataSet from './dataSet';
import { Cache } from './utils';
import * as env from './constants';

$(document).ready(() => {
  window.openDragResourceModal = (eventId, dataTransfer) => {
    const { type, id } = dataTransfer;
    const eventData = dataSet.events.find(event => event.id == eventId);
    const woId = eventData.workorder.value;
    const woRef = woId ? dataSet.workOrders.find(wo => wo.id == woId) : {};
    let payload, resourceName;

    switch (type) {
      case 'employee':
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
          draggedResource: type,
          // oldEventData: eventData,
          woRef,
          eventData: {
            id: eventId,
            selectedResources: [resourceToUse],
            date: eventData.date,
            time: eventData.time
          },
          woResources: woResourcesFiltered
        };

        Swal.fire({
          title: 'Confirm Add',
          text: `Add ${resourceName} to Event [ID ${eventId}]?`,
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
                        const messageTxt = `Resource ${resourceName} has been added to Event [ID ${eventId}]`;
                        Swal.fire({
                          title: 'Success!',
                          text: messageTxt,
                          icon: 'success',
                          showConfirmButton: false,
                          allowOutsideClick: false
                        });
                        Cache.set(env.SessionKey.UPDATED_EVENT, messageTxt);
                        window.location.reload();
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
                text: `Adding Resource to Event Record [ID ${eventId}]...`
              });
            }
          });
        break;

      case 'vendor':
        resourceName = dataSet.vendors.find(vendor => vendor.id == id).name;
        let unassignedVendors = deepCopy(dataSet.vendors)
          .filter(vendor => !eventData.vendors.map(vendor => vendor.vendor.value)
            .includes(vendor.id));
        unassignedVendors = [...eventData.vendors, ...unassignedVendors];
        const vendorToUse = unassignedVendors.find(vendor => vendor.id == id);

        payload = {
          draggedResource: type,
          // oldEventData: eventData,
          woRef,
          eventData: {
            id: eventId,
            selectedVendors: [vendorToUse],
            /* date: eventData.date,
            time: eventData.time */
          },
          woResources: []
        };

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
                        const messageTxt = `Vendor ${resourceName} has been added to Event [ID ${eventId}]`;
                        Swal.fire({
                          title: 'Success!',
                          text: messageTxt,
                          icon: 'success',
                          showConfirmButton: false,
                          allowOutsideClick: false
                        });
                        Cache.set(env.SessionKey.UPDATED_EVENT, messageTxt);
                        window.location.reload();
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
                text: `Adding Vendor to Event Record [ID ${eventId}]...`
              });
            }
          });
        break;

      case 'asset':
        resourceName = dataSet.assets.find(asset => asset.id == id).name;
        let unassignedAssets = deepCopy(dataSet.assets)
          .filter(asset => !eventData.assets.map(asset => asset.asset.value)
            .includes(asset.id));
        unassignedAssets = [...eventData.assets, ...unassignedAssets];
        const assetToUse = unassignedAssets.find(asset => asset.id == id);

        payload = {
          draggedResource: type,
          // oldEventData: eventData,
          woRef,
          eventData: {
            id: eventId,
            selectedAssets: [assetToUse],
            date: eventData.date,
            time: eventData.time
          },
          woResources: []
        };

        Swal.fire({
          title: 'Confirm Add',
          text: `Enter Quantity for Asset ${resourceName}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#817c7c',
          confirmButtonText: 'Yes',
          input: 'number', // Set input type to number
          inputValue: 1, // Set the default value
          inputAttributes: {
            min: 1, // Minimum value for quantity
            max: assetToUse.maxQuantity, // Maximum value for quantity
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
              payload.eventData.selectedAssets[0].quantity = quantity;

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
                        const messageTxt = `Asset ${resourceName} has been added to Event [ID ${eventId}]`;
                        Swal.fire({
                          title: 'Success!',
                          text: messageTxt,
                          icon: 'success',
                          showConfirmButton: false,
                          allowOutsideClick: false
                        });
                        Cache.set(env.SessionKey.UPDATED_EVENT, messageTxt);
                        window.location.reload();
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
                text: `Adding Asset to Event Record [ID ${eventId}]...`
              });
            }
          });
        break;
    }
  }

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
});