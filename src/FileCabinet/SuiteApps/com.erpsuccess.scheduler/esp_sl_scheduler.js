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

  (runtime, file, mod) => {
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

      if (method === 'GET') {
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
      } else if (method === 'POST') {
        switch (mode) {
          case 'createEventRecord':
            mod.Event.createEventRecord(scriptContext);
            break;
          case 'updateEventRecord':
            mod.Event.updateEventRecord(scriptContext);
            break;
          case 'updateResourceAssignment':
            mod.WorkOrderResource.updateResourceAssignment(scriptContext);
            break;
          case 'updateAssetAssignment':
            mod.WorkOrderAsset.updateAssetAssignment(scriptContext);
            break;
          case 'updateResourceDateTime':
            mod.WorkOrderResource.updateResourceDateTime(scriptContext);
            break;
          case 'updateAssetDateTime':
            mod.WorkOrderAsset.updateAssetDateTime(scriptContext);
            break;
          case 'completeEvent':
            mod.Event.completeEvent(scriptContext);
            break;
          case 'deleteEventRecord':
            mod.Event.deleteEventRecord(scriptContext);
            break;
          case 'updateFilters':
            mod.Utils.updateFilters(scriptContext);
            break;
        }
      }

      log.audit('----- [END] -----', { remainingUsage: script.getRemainingUsage() });
    }

    function runApp(context) {
      const { request, response } = context;
      const user = runtime.getCurrentUser();
      const suiteletUrl = mod.Url.suitelet();
      // Fetch needed data
      const workOrders = mod.WorkOrder.getList();
      const events = mod.Event.getList(); // Includes standalone/general events
      const customers = mod.WorkOrder.getCustomers(workOrders);
      const woLocations = mod.WorkOrder.getLocations(workOrders);
      const woProjects = mod.WorkOrder.getProjects(workOrders);
      const woResources = mod.WorkOrderResource.getList();
      const woVendors = mod.WorkOrderVendor.getList();
      const woAssets = mod.WorkOrderAsset.getList();
      const woItems = mod.WorkOrderItem.getList(workOrders);
      const woContacts = mod.WorkOrderContact.getList(workOrders);
      const woAddresses = mod.WorkOrderAddress.getList(workOrders);
      const organizers = mod.Event.getOrganizers(events);

      mod.WorkOrder.fullMap(workOrders, events, woVendors, woAssets, woItems, woContacts, woAddresses);
      mod.Event.fullMap(workOrders, events, woResources, woVendors, woAssets, woItems, woContacts, woAddresses);

      const resources = mod.Resource.getEmployees(events);
      const resourceGroups = mod.Resource.getResourceGroups(resources);
      const vendors = mod.Resource.getVendors(events);
      const assets = mod.Resource.getAssets();
      const assetTypes = mod.Resource.getAssetTypes(assets);
      const resourceSkills = mod.Resource.getResourceSkills(resources);
      const resourceLocations = mod.Resource.getResourceLocations(resources, vendors, assets);
      const resourceDepartments = mod.Resource.getResourceDepartments(resources, vendors, assets);
      const woStatuses = mod.WorkOrder.getStatuses();
      const filterFields = mod.Utils.getFilters({
        user,
        resources,
        resourceGroups,
        vendors,
        assets,
        assetTypes,
        resourceSkills,
        resourceLocations,
        resourceDepartments,
        customers,
        woLocations,
        woProjects,
        woStatuses,
        organizers
      });

      const sampleWOs = workOrders.filter((_, index) => index < 20); // TBR
      const sampleEvents = events.filter((_, index) => index < 20); // TBR

      mod.Utils.createLogFile({
        userId: user.id,
        suiteletUrl,
        workOrders: sampleWOs,
        customers,
        woLocations,
        woProjects,
        resources,
        resourceGroups,
        woResources,
        vendors,
        assets,
        events: sampleEvents,
        woContacts,
        woAddresses,
        organizers,
        resourceSkills,
        resourceLocations,
        resourceDepartments,
        filterFields,
        woStatuses
      });

      const fileObj = {
        template: file.load('./vanilla-vite-app-bundle/index.html'),
        style: file.load('./vanilla-vite-app-bundle/index.css'),
        js: file.load('./vanilla-vite-app-bundle/app.js'),
        svg: file.load('./vanilla-vite-app-bundle/assets/images/vite.svg'),
        aiIcon: file.load('./vanilla-vite-app-bundle/assets/images/ai.png'),
      }

      // UI DATA SET
      const htmlStr = fileObj.template.getContents()
        .replace('<script type="module" crossorigin src="/app.js"></script>', `<script type="module" crossorigin src="${fileObj.js.url}"></script>`)
        .replace('<link rel="stylesheet" crossorigin href="/index.css">', `<link rel="stylesheet" crossorigin href="${fileObj.style.url}">`)
        .replace('<link rel="icon" type="image/svg+xml" href="/public/vite.svg" />', `<link rel="icon" type="image/svg+xml" href="${fileObj.svg.url}" />`)
        .replace('<img src="/assets/images/ai.png" alt="Logo" />', `<img src="${fileObj.aiIcon.url}" alt="Logo" />`)
        .replace('{{userId}}', user.id)
        .replace('{{suiteletUrl}}', encodeURIComponent(suiteletUrl))
        .replace('{{resources}}', encodeURIComponent(JSON.stringify(resources)))
        .replace('{{resourceGroups}}', encodeURIComponent(JSON.stringify(resourceGroups)))
        .replace('{{resourceSkills}}', encodeURIComponent(JSON.stringify(resourceSkills)))
        .replace('{{resourceLocations}}', encodeURIComponent(JSON.stringify(resourceLocations)))
        .replace('{{resourceDepartments}}', encodeURIComponent(JSON.stringify(resourceDepartments)))
        .replace('{{woResources}}', encodeURIComponent(JSON.stringify(woResources)))
        .replace('{{vendors}}', encodeURIComponent(JSON.stringify(vendors)))
        .replace('{{assets}}', encodeURIComponent(JSON.stringify(assets)))
        .replace('{{workOrders}}', encodeURIComponent(JSON.stringify(workOrders)))
        .replace('{{customers}}', encodeURIComponent(JSON.stringify(customers)))
        .replace('{{woLocations}}', encodeURIComponent(JSON.stringify(woLocations)))
        .replace('{{woProjects}}', encodeURIComponent(JSON.stringify(woProjects)))
        .replace('{{woStatuses}}', encodeURIComponent(JSON.stringify(woStatuses)))
        .replace('{{events}}', encodeURIComponent(JSON.stringify(events)))
        .replace('{{organizers}}', encodeURIComponent(JSON.stringify(organizers)))
        .replace('{{filterFields}}', encodeURIComponent(JSON.stringify(filterFields)))
        ;

      response.write(htmlStr);
    }

    return {
      onRequest
    }

  });