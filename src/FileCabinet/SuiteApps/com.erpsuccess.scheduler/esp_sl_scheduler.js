/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author lc
 */
define(['N/runtime', './lib/esp_cm_scheduler'],

  (runtime, schedulerLib) => {
    /**
     * Defines the Suitelet script trigger point.
     * @param {Object} scriptContext
     * @param {ServerRequest} scriptContext.request - Incoming request
     * @param {ServerResponse} scriptContext.response - Suitelet response
     * @since 2015.2
     */
    const onRequest = (scriptContext) => {
      const { parameters: params, method } = scriptContext.request;
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
            schedulerLib.WorkOrder.hold(scriptContext);
            break;
          case 'cancelWorkOrder':
            schedulerLib.WorkOrder.cancel(scriptContext);
            break;
          case 'printWorkOrder':
            schedulerLib.WorkOrder.print(scriptContext);
            break;
          case 'printPickList':
            schedulerLib.WorkOrder.printPickList(scriptContext);
            break;
          case 'getOrderPunchList':
            schedulerLib.Event.getOrderPunchList(scriptContext);
            break;
          default:
            schedulerLib.runApp(scriptContext);
            break;
        }
      } else if (method === 'POST') {
        switch (mode) {
          case 'createEventRecord':
            schedulerLib.Event.createEventRecord(scriptContext);
            break;
          case 'updateEventRecord':
            schedulerLib.Event.updateEventRecord(scriptContext);
            break;
          case 'updateResourceAssignment':
            schedulerLib.WorkOrderResource.updateResourceAssignment(scriptContext);
            break;
          case 'updateAssetAssignment':
            schedulerLib.WorkOrderAsset.updateAssetAssignment(scriptContext);
            break;
          case 'updateResourceDateTime':
            schedulerLib.WorkOrderResource.updateResourceDateTime(scriptContext);
            break;
          case 'updateAssetDateTime':
            schedulerLib.WorkOrderAsset.updateAssetDateTime(scriptContext);
            break;
          case 'completeEvent':
            schedulerLib.Event.completeEvent(scriptContext);
            break;
          case 'deleteEventRecord':
            schedulerLib.Event.deleteEventRecord(scriptContext);
            break;
          case 'updateFilters':
            schedulerLib.Utils.updateFilters(scriptContext);
            break;
        }
      }

      log.audit('----- [END] -----', {
        remainingUsage: script.getRemainingUsage()
      });
    }

    return {
      onRequest
    }

  });