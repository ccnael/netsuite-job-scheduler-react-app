/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author lc
 * 
 * TBD
 * - Sanitize
 * - FOPS-575 Refactor in progress
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
], (runtime, schedulerLib, employeeLib, vendorLib, assetLib, woLib, eventLib, woResourceLib, woVendorLib, woAssetLib, woItemLib, woContactLib, woAddressLib) => {
  /**
   * Vanilla JS UI Suitelet entry point (to be replaced)
   * Defines the Suitelet script trigger point.
   * @param {Object} context
   * @param {ServerRequest} context.request - Incoming request
   * @param {ServerResponse} context.response - Suitelet response
   * @since 2015.2
   */
  const _onRequest = (context) => {
    const { parameters: params, method } = context.request;
    const script = runtime.getCurrentScript();
    const mode = params?.mode;
    log.audit('----- [START] -----', { mode });

    if (method === 'GET') {
      switch (mode) {
        case 'rescheduleEvent':
          break;
        case 'unlock':
          break;
        case 'holdWorkOrder':
          schedulerLib.WorkOrder.hold(context);
          break;
        case 'cancelWorkOrder':
          schedulerLib.WorkOrder.cancel(context);
          break;
        case 'printWorkOrder':
          schedulerLib.WorkOrder.print(context);
          break;
        case 'printPickList':
          schedulerLib.WorkOrder.printPickList(context);
          break;
        case 'getOrderPunchList':
          schedulerLib.Event.getOrderPunchList(context);
          break;
        default:
          schedulerLib.runVanillaApp(context);
          break;
      }
    } else if (method === 'POST') {
      switch (mode) {
        case 'createEventRecord':
          schedulerLib.Event.createEventRecord(context);
          break;
        case 'updateEventRecord':
          schedulerLib.Event.updateEventRecord(context);
          break;
        case 'updateResourceAssignment':
          schedulerLib.WorkOrderResource.updateResourceAssignment(context);
          break;
        case 'updateAssetAssignment':
          schedulerLib.WorkOrderAsset.updateAssetAssignment(context);
          break;
        case 'updateResourceDateTime':
          schedulerLib.WorkOrderResource.updateResourceDateTime(context);
          break;
        case 'updateAssetDateTime':
          schedulerLib.WorkOrderAsset.updateAssetDateTime(context);
          break;
        case 'completeEvent':
          schedulerLib.Event.completeEvent(context);
          break;
        case 'deleteEventRecord':
          schedulerLib.Event.deleteEventRecord(context);
          break;
        case 'updateFilters':
          schedulerLib.Utils.updateFilters(context);
          break;
      }
    }

    log.audit('----- [END] -----', {
      remainingUsage: script.getRemainingUsage()
    });
  }

  /**
   * React JS UI Suitelet entry point
   * Defines the Suitelet script trigger point.
   * @param {Object} context
   * @param {ServerRequest} context.request - Incoming request
   * @param {ServerResponse} context.response - Suitelet response
   * @since 2015.2
   */
  const _onRequestNew = (context) => {
    const { parameters: params, method } = context.request;
    const script = runtime.getCurrentScript();
    const mode = params?.mode;
    log.audit('----- [START] -----', { mode });

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
        case 'holdWorkOrder':
          woLib.holdWorkOrder(context);
          break;
        case 'cancelWorkOrder':
          woLib.cancelWorkOrder(context);
          break;
        case 'printWorkOrder':
          woLib.printWorkOrder(context);
          break;
        case 'printPickList':
          woLib.printPickList(context);
          break;
        case 'getOrderPunchList':
          eventLib.getOrderPunchList(context);
          break;
        default:
          schedulerLib.runReactApp(context);
          break;
      }
    } else if (method === 'POST') {

      switch (mode) {
        case 'createEvent':
          eventLib.createEvent(context);
          break;
        case 'updateEvent':
          eventLib.updateEvent(context);
          break;
        case 'updateResourceAssignment':
          woResourceLib.updateCalendarResourceAssignment(context);
          break;
        case 'updateAssetAssignment':
          woAssetLib.updateCalendarAssetAssignment(context);
          break;
        case 'updateResourceDateTime':
          woResourceLib.updateCalendarResizedDateTime(context);
          break;
        case 'updateAssetDateTime':
          woAssetLib.updateCalendarResizedDateTime(context);
          break;
        case 'completeEvent':
          eventLib.completeEvent(context);
          break;
        case 'deleteEvent':
          eventLib.deleteEvent(context);
          break;
      }
    }

    log.audit('----- [END] -----', {
      remainingUsage: script.getRemainingUsage()
    });
  }

  return {
    onRequest(context) {
      const script = runtime.getCurrentScript();
      if (script.deploymentId === 'customdeploy_esp_sl_scheduler_new') {
        _onRequestNew(context);
      } else {
        _onRequest(context);
      }
    }
  }

});