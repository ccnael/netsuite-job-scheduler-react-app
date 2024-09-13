import mockup from './mockup';

export const suiteletUrl = decodeURIComponent($('#suiteletUrl').val());
export const workOrders = JSON.parse(decodeURIComponent($('#workOrders').val()));
export const customers = JSON.parse(decodeURIComponent($('#customers').val()));
export const resources = JSON.parse(decodeURIComponent($('#resources').val()));
export const resourceGroups = JSON.parse(decodeURIComponent($('#resourceGroups').val()));
export const events = JSON.parse(decodeURIComponent($('#events').val()));

/* export const suiteletUrl = mockup.suiteletUrl;
export const workOrders = mockup.workOrders;
export const customers = mockup.customers;
export const resources = mockup.resources;
export const resourceGroups = mockup.resourceGroups;
export const events = mockup.events; */

/* export const suiteletUrl = $('#suiteletUrl').val() ? decodeURIComponent($('#suiteletUrl').val()) : mockup.suiteletUrl;
export const workOrders = $('#workOrders').val() ? JSON.parse(decodeURIComponent($('#workOrders').val())) : mockup.workOrders;
export const customers = $('#customers').val() ? JSON.parse(decodeURIComponent($('#customers').val())) : mockup.customers;
export const resources = $('#resources').val() ? JSON.parse(decodeURIComponent($('#resources').val())) : mockup.resources;
export const resourceGroups = $('#resourceGroups').val() ? JSON.parse(decodeURIComponent($('#resourceGroups').val())) : mockup.resourceGroups;
export const events = $('#events').val() ? JSON.parse(decodeURIComponent($('#events').val())) : mockup.events; */

// Fetch promise?