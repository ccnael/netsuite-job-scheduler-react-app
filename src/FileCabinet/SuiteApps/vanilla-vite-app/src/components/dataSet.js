import mockup from './mockup';

const DEV_MODE = true;
// const DEV_MODE = false;

export const userId = !DEV_MODE ? $('#userId').val() : mockup.userId;
export const suiteletUrl = !DEV_MODE ? decodeURIComponent($('#suiteletUrl').val()) : mockup.suiteletUrl;
export const workOrders = !DEV_MODE ? JSON.parse(decodeURIComponent($('#workOrders').val())) : mockup.workOrders;
export const customers = !DEV_MODE ? JSON.parse(decodeURIComponent($('#customers').val())) : mockup.customers;
export const resources = !DEV_MODE ? JSON.parse(decodeURIComponent($('#resources').val())) : mockup.resources;
export const resourceGroups = !DEV_MODE ? JSON.parse(decodeURIComponent($('#resourceGroups').val())) : mockup.resourceGroups;
export const woResources = !DEV_MODE ? JSON.parse(decodeURIComponent($('#woResources').val())) : mockup.woResources;
export const assets = !DEV_MODE ? JSON.parse(decodeURIComponent($('#assets').val())) : mockup.assets;
export const vendors = !DEV_MODE ? JSON.parse(decodeURIComponent($('#vendors').val())) : mockup.vendors;
export const events = !DEV_MODE ? JSON.parse(decodeURIComponent($('#events').val())) : mockup.events;
export const organizers = !DEV_MODE ? JSON.parse(decodeURIComponent($('#organizers').val())) : mockup.organizers;
export const activeResources = resources.filter(resource => !!resource.active);

export const combinedResourceGroups = (() => {
  let combined = JSON.parse(JSON.stringify(resourceGroups));
  const vendorObj = {
    text: 'Vendor Subcons',
    value: 'vendor',
    resources: vendors,
    resourceCount: 0
  };
  vendorObj.resourceCount = vendorObj.resources.length;
  combined.push(vendorObj);
  return combined;
})();

// Fetch promise?