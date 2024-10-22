import mockup from './mockup';

// const DEV_MODE = true;
const DEV_MODE = false;

export const suiteletUrl = !DEV_MODE ? decodeURIComponent($('#suiteletUrl').val()) : mockup.suiteletUrl;
export const workOrders = !DEV_MODE ? JSON.parse(decodeURIComponent($('#workOrders').val())) : mockup.workOrders;
export const customers = !DEV_MODE ? JSON.parse(decodeURIComponent($('#customers').val())) : mockup.customers;
export const resources = !DEV_MODE ? JSON.parse(decodeURIComponent($('#resources').val())) : mockup.resources;
export const resourceGroups = !DEV_MODE ? JSON.parse(decodeURIComponent($('#resourceGroups').val())) : mockup.resourceGroups;
export const vendors = !DEV_MODE ? JSON.parse(decodeURIComponent($('#vendors').val())) : mockup.vendors;
export const vendorGrouped = !DEV_MODE ? JSON.parse(decodeURIComponent($('#vendorGrouped').val())) : mockup.vendorGrouped;
export const events = !DEV_MODE ? JSON.parse(decodeURIComponent($('#events').val())) : mockup.events;
export const organizers = !DEV_MODE ? JSON.parse(decodeURIComponent($('#organizers').val())) : mockup.organizers;

export const combinedResourceGroups = (() => {
    let combined = JSON.parse(JSON.stringify(resourceGroups));
    const vendorObj = {
        text: 'Vendor Subcontractors',
        value: 'vendor',
        resources: [],
        resourceCount: 0
      };
      for (const vendorId in vendorGrouped) {
        vendorObj.resources.push({
          employee: {
            text: vendorGrouped[vendorId].vendor.text,
            value: vendorId
          },
          isVendor: true,
          ...vendorGrouped[vendorId]
        })
      }
      vendorObj.resourceCount = vendorObj.resources.length;
      combined.push(vendorObj);
      return combined;
})();

// Fetch promise?