/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author lc
 */
define([
  'N/runtime', 
  'N/file',
  './esp_cm_scheduler'
],

  (runtime, file,  mod) => {
    /**
     * Defines the Suitelet script trigger point.
     * @param {Object} scriptContext
     * @param {ServerRequest} scriptContext.request - Incoming request
     * @param {ServerResponse} scriptContext.response - Suitelet response
     * @since 2015.2
     */
    const onRequest = (scriptContext) => {
      const { request, response } = scriptContext;
      const { parameters: params, method } = request;
      const script = runtime.getCurrentScript();
      const mode = params?.mode;
      log.audit('----- [START] -----', { mode });

      if (method == 'GET') {
        switch (mode) {
          case 'rescheduleEvent':
            break;
          case 'unlock':
            break;
          case 'holdWorkOrder':
            mod.WorkOrder.hold(scriptContext);
            break;
          case 'cancelWorkOrder':
            mod.WorkOrder.cancel(scriptContext);
            break;
          case 'printWorkOrder':
            mod.WorkOrder.print(scriptContext);
            break;
          case 'printPickList':
            mod.WorkOrder.printPickList(scriptContext);
            break;
          case 'getOrderPunchList':
            mod.Event.getOrderPunchList(scriptContext);
            break;
            
          default: 
            runApp(scriptContext);
            break;
        }
      } else if (method == 'POST') {
        switch (mode) {
          case 'createEventRecord':
            mod.Event.createEventRecord(scriptContext);
            break;
          case 'updateEventRecord':
            mod.Event.updateEventRecord(scriptContext);
            break;
          case 'completeEvent':
            mod.Event.completeEvent(scriptContext);
            break;
          case 'deleteEventRecord':
            mod.Event.deleteEventRecord(scriptContext);
            break;
        }
      }

      log.audit('----- [END] -----', { remainingUsage: script.getRemainingUsage() });
    }

    function runApp(context) {
      const { request, response } = context;
      const suiteletUrl = mod.Url.suitelet();
      // Fetch needed data
      const workOrders = mod.WorkOrder.getList();
      const customers = mod.WorkOrder.getCustomers(workOrders);
      const resources = mod.WorkOrderResource.getList();
      const resourceGroups = mod.WorkOrderResource.getResourceGroups(resources);

      const items = mod.WorkOrderItem.getList(workOrders);
      const contacts = mod.WorkOrderContact.getList(workOrders);
      const addresses = mod.WorkOrderAddress.getList(workOrders);
      const events = mod.Event.getList(workOrders); // Includes standalone/general events

      mod.WorkOrder.fullMap(workOrders, events, items, contacts, addresses);
      mod.Event.fullMap(workOrders, events, resources, items, contacts, addresses);

      mod.Utils.createLogFile('mockupDataSet', JSON.stringify({ suiteletUrl, workOrders, customers, resources, resourceGroups, events, contacts, addresses }), 2199);

      const fileObj = {
        template: file.load('./vanilla-vite-app-bundle/index.html'),
        style: file.load('./vanilla-vite-app-bundle/index.css'),
        js: file.load('./vanilla-vite-app-bundle/app.js'),
        svg: file.load('./vanilla-vite-app-bundle/assets/images/vite.svg')
      }

      let htmlStr = fileObj.template.getContents()
        .replace('<script type="module" crossorigin src="/app.js"></script>', `<script type="module" crossorigin src="${fileObj.js.url}"></script>`)
        .replace('<link rel="icon" type="image/svg+xml" href="/assets/images/vite.svg" />', `<link rel="icon" type="image/svg+xml" href="${fileObj.svg.url}" />`)
        .replace('<link rel="stylesheet" crossorigin href="/index.css">', `<link rel="stylesheet" crossorigin href="${fileObj.style.url}">`)
        .replace('{{suiteletUrl}}', encodeURIComponent(suiteletUrl))
        .replace('{{workOrders}}', encodeURIComponent(JSON.stringify(workOrders)))
        .replace('{{customers}}', encodeURIComponent(JSON.stringify(customers)))
        .replace('{{resources}}', encodeURIComponent(JSON.stringify(resources)))
        .replace('{{resourceGroups}}', encodeURIComponent(JSON.stringify(resourceGroups)))
        .replace('{{events}}', encodeURIComponent(JSON.stringify(events)));

      response.write(htmlStr);
    }

    return {
      onRequest
    }

  });