import mockup from './mockup.json';

const DEV_MODE = true;
// const DEV_MODE = false;

const getValue = (selector, mockValue) => !DEV_MODE ? JSON.parse(decodeURIComponent($(selector).val())) : mockValue;

export const devMode = DEV_MODE;
export const userId = !DEV_MODE ? $('#userId').val() : mockup.userId;
export const suiteletUrl = !DEV_MODE ? decodeURIComponent($('#suiteletUrl').val()) : mockup.suiteletUrl;
export const resources = getValue('#resources', mockup.resources);
export const resourceGroups = getValue('#resourceGroups', mockup.resourceGroups);
export const resourceSkills = getValue('#resourceSkills', mockup.resourceSkills);
export const resourceLocations = getValue('#resourceLocations', mockup.resourceLocations);
export const resourceDepartments = getValue('#resourceDepartments', mockup.resourceDepartments);
export const vendors = getValue('#vendors', mockup.vendors);
export const assets = getValue('#assets', mockup.assets);
export const workOrders = getValue('#workOrders', mockup.workOrders);
export const woResources = getValue('#woResources', mockup.woResources);
export const customers = getValue('#customers', mockup.customers);
export const woLocations = getValue('#woLocations', mockup.woLocations);
export const woProjects = getValue('#woProjects', mockup.woProjects);
export const woStatuses = getValue('#woStatuses', mockup.woStatuses);
export const events = getValue('#events', mockup.events);
export const organizers = getValue('#organizers', mockup.organizers);
export const filterFields = getValue('#filterFields', mockup.filterFields);
export const activeResources = resources.filter(resource => !!resource.active);
export const combinedResourceGroups = [
  ...resourceGroups,
  {
    text: 'Vendor Subcons',
    value: 'vendor',
    resources: vendors,
    resourceCount: vendors.length,
  },
  {
    text: 'Asset & Equipments',
    value: 'asset',
    resources: assets,
    resourceCount: assets.length,
  }
];