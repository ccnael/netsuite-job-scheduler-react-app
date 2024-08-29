/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author lc
 */
define([
  'N/runtime', 
  'N/url', 
  'N/render', 
  './esp_cm_scheduler'
],

  (runtime, url, render, mod) => {
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
      log.audit('***** START *****', { mode });

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
          case 'viewCreatedEvents':
            break;
          default: 
            mainForm(scriptContext);
            break;
        }
      } else if (method == 'POST') {
        switch (mode) {
          case 'createEventRecord':
            mod.Event.createEventRecord(scriptContext);
            break;
          case 'fulfillOrderItems':
            mod.Event.fulfillOrderItems(scriptContext);
            break;
        }
      }

      log.audit('***** END *****', { remainingUsage: script.getRemainingUsage() });
    }

    function mainForm(context) {
      const { request, response } = context;
      const { parameters: params } = request;
      const suiteletUrl = mod.Url.suitelet();
      let fileName = params.viewId || 'board';
      
      // Load related files
      const { template, js, css, utils } = mod.Utils.loadFiles(fileName);

      const domain = url.resolveDomain({
        hostType: url.HostType.APPLICATION,
        accountId: runtime.accountId
      });

      // Fetch needed data
      const workOrders = mod.WorkOrder.getList();
      const customers = mod.WorkOrder.getCustomers(workOrders);
      const resources = mod.WorkOrderResource.getList();
      const resourceGroups = mod.WorkOrderResource.getResourceGroups(resources);

      let htmlStr = template.getContents()
        .replace(`${fileName}.js`, `https://${domain}${js.url}`)
        .replace(`${fileName}.css`, `https://${domain}${css.url}`)
        .replace('{{suiteletUrl}}', suiteletUrl)
        .replace('{{suiteletUrlEnc}}', encodeURIComponent(suiteletUrl))
        .replace('{{modUrl}}', encodeURIComponent(`https://${domain}${utils.url}`))
        .replace('{{workOrders}}', encodeURIComponent(JSON.stringify(workOrders)))
        .replace('{{resources}}', encodeURIComponent(JSON.stringify(resources)))
        .replace('{{resourceGroups}}', encodeURIComponent(JSON.stringify(resourceGroups)))
        .replace(/'/g, '"');

      // mod.Utils.createLogFile('test.html', htmlStr, -15);
      
      const renderer = render.create();        
      renderer.addCustomDataSource({
        alias: 'data',
        format: render.DataSource.OBJECT,
        data: { workOrders, resources, customers, resourceGroups }
      });
      renderer.templateContent = htmlStr;
      const rendered = renderer.renderAsString();

      response.write(rendered);
      // response.write(`<iframe id="scheduler" srcdoc='${html}' width="100%" height="1000px" frameborder="0"></iframe>`);
    }

    return {
      onRequest
    }

  });