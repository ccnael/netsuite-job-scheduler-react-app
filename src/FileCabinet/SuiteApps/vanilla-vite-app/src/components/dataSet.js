import mockup from './mockup';

const DEV_MODE = false;

export const suiteletUrl = !DEV_MODE ? decodeURIComponent($('#suiteletUrl').val()) : mockup.suiteletUrl;
export const workOrders = !DEV_MODE ? JSON.parse(decodeURIComponent($('#workOrders').val())) : mockup.workOrders;
export const customers = !DEV_MODE ? JSON.parse(decodeURIComponent($('#customers').val())) : mockup.customers;
export const resources = !DEV_MODE ? JSON.parse(decodeURIComponent($('#resources').val())) : mockup.resources;
export const resourceGroups = !DEV_MODE ? JSON.parse(decodeURIComponent($('#resourceGroups').val())) : mockup.resourceGroups;
export const events = !DEV_MODE ? JSON.parse(decodeURIComponent($('#events').val())) : mockup.events;
export const organizers = !DEV_MODE ? JSON.parse(decodeURIComponent($('#organizers').val())) : mockup.organizers;

// Fetch promise?