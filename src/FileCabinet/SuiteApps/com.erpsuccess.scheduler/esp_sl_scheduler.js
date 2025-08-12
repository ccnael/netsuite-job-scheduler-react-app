/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author lc
 */
define([
  'N/runtime',
  './lib/esp_cm_scheduler',
  './lib/esp_cm_employee',
  './lib/esp_cm_vendor',
  './lib/esp_cm_asset',
  './lib/esp_cm_workOrder',
  './lib/esp_cm_event',
  './lib/esp_cm_woResource',
  './lib/esp_cm_woVendor',
  './lib/esp_cm_woAsset',
  './lib/esp_cm_woItem',
  './lib/esp_cm_woContact',
  './lib/esp_cm_woAddress',
  './lib/esp_cm_routingGroup',
  './lib/esp_cm_completeEvent',
  './lib/esp_cm_customer',
  './lib/esp_cm_location',
], (
  runtime,
  schedulerLib,
  employeeLib,
  vendorLib,
  assetLib,
  woLib,
  eventLib,
  woResourceLib,
  woVendorLib,
  woAssetLib,
  woItemLib,
  woContactLib,
  woAddressLib,
  routingGroupLib,
  completeEventLib,
  customerLib,
  locationLib
) => {
  /**
   * Suitelet entry point
   * Defines the Suitelet script trigger point.
   * @param {Object} context
   * @param {ServerRequest} context.request - Incoming request
   * @param {ServerResponse} context.response - Suitelet response
   * @since 2015.2
   */
  const onRequest = (context) => {
    const { parameters: params, method } = context.request;
    const script = runtime.getCurrentScript();
    const mode = params?.mode;
    // log.audit('----- [START] -----', { mode });

    if (method === 'GET') {

      switch (mode) {
        case 'getEmployees':
          employeeLib.getEmployees(context);
          break;
        case 'getVendors':
          vendorLib.getVendors(context);
          break;
        case 'getAssets':
          assetLib.getAssets(context);
          break;
        case 'getWorkOrders':
          woLib.getWorkOrders(context);
          break;
        case 'getEvents':
          eventLib.getEvents(context);
          break;
        case 'getWorkOrderResources':
          woResourceLib.getResources(context);
          break;
        case 'getWorkOrderVendors':
          woVendorLib.getVendors(context);
          break;
        case 'getWorkOrderAssets':
          woAssetLib.getAssets(context);
          break;
        case 'getWorkOrderItems':
          woItemLib.getItems(context);
          break;
        case 'getWorkOrderContacts':
          woContactLib.getContacts(context);
          break;
        case 'getWorkOrderAddresses':
          woAddressLib.getAddresses(context);
          break;
        case 'printWorkOrder':
          woLib.printWorkOrder(context);
          break;
        case 'holdWorkOrder':
          woLib.holdWorkOrder(context);
          break;
        case 'cancelWorkOrder':
          woLib.cancelWorkOrder(context);
          break;
        case 'getRoutingGroups':
          routingGroupLib.getRoutingGroups(context);
          break;
        case 'getPunchItems':
          completeEventLib.getPunchItems(context);
          break;
        case 'getCustomers':
          customerLib.getCustomers(context);
          break;
        case 'getLocations':
          locationLib.getLocations(context);
          break;
        default:
          schedulerLib.runApp(context);
          break;
      }
    } else if (method === 'POST') {

      switch (mode) {
        case 'createRoutingGroup':
          routingGroupLib.createRoutingGroup(context);
          break;
        case 'createEvent':
          eventLib.createEvent(context);
          break;
        case 'updateEvent':
          eventLib.updateEvent(context);
          break;
        case 'removeEvent':
          eventLib.removeEvent(context);
          break;
        case 'assignEmployee':
          employeeLib.assignEmployee(context);
          break;
        case 'assignVendor':
          vendorLib.assignVendor(context);
          break;
        case 'assignAsset':
          assetLib.assignAsset(context);
          break;
        case 'completeEvent':
          completeEventLib.completeEvent(context);
          break;
      }
    }

    // log.audit('----- [END] -----', {
    //   remainingUsage: script.getRemainingUsage()
    // });
  }

  return { onRequest }

});