import mockup from './mockup';

// const DEV_MODE = true;
const DEV_MODE = false;

const getValue = (selector, mockValue) => !DEV_MODE ? JSON.parse(decodeURIComponent($(selector).val())) : mockValue;

export const userId = !DEV_MODE ? $('#userId').val() : mockup.userId;
export const suiteletUrl = !DEV_MODE ? decodeURIComponent($('#suiteletUrl').val()) : mockup.suiteletUrl;
export const workOrders = getValue('#workOrders', mockup.workOrders);
export const customers = getValue('#customers', mockup.customers);
export const resources = getValue('#resources', mockup.resources);
export const resourceGroups = getValue('#resourceGroups', mockup.resourceGroups);
export const woResources = getValue('#woResources', mockup.woResources);
export const assets = getValue('#assets', mockup.assets);
export const vendors = getValue('#vendors', mockup.vendors);
export const events = getValue('#events', mockup.events);
export const organizers = getValue('#organizers', mockup.organizers);
export const resourceSkills = getValue('#resourceSkills', mockup.resourceSkills);
export const activeResources = resources.filter(resource => !!resource.active);
export const combinedResourceGroups = (() => {
  const combinedGroup = JSON.parse(JSON.stringify(resourceGroups));
  const vendorObj = {
    text: 'Vendor Subcons',
    value: 'vendor',
    resources: vendors,
    resourceCount: vendors.length
  };
  combinedGroup.push(vendorObj);
  return combinedGroup;
})();