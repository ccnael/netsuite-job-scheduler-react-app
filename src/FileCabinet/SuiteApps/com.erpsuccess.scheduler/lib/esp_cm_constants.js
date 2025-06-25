/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define({
  RecordType: {
    RESOURCE_GROUP: 'customrecord_esp_fop_wo_resources',
    WORK_ORDER: 'customrecord_esp_fop_work_order',
    WORK_ORDER_RESOURCE: 'customrecord_esp_fop_wo_resources_select',
    WORK_ORDER_VENDOR: 'customrecord_esp_fop_wo_subcons_select',
    WORK_ORDER_ASSET: 'customrecord_esp_fop_wo_asset_selected',
    WORK_ORDER_ITEM: 'customrecord_esp_fop_wo_item',
    WORK_ORDER_CONTACT: 'customrecord_esp_fop_wo_contact',
    WORK_ORDER_ADDRESS: 'customrecord_esp_fop_wo_address',
    PUNCH: 'customrecord_esp_pp_punch',
    RESOURCE_SKILL: 'customrecord_esp_fop_resource_skill',
    ASSET: 'customrecord_esp_fop_asset',
    ROUTING_GROUP: 'customlist_esp_fop_routing_group'
  },
  WorkOrderCode: {
    NOT_STARTED: '#026adf',
    IN_PROGRESS: '#026adf',
    COMPLETED: '#28a745',
    ON_HOLD: '#6c757d',
    CLOSED: '#6c757d'
  },
  /* EventCode: {
    TENTATIVE: 'bg-secondary',
    CONFIRMED: 'bg-success',
    COMPLETED: 'bg-info'
  }, */
  EventCode: {
    TENTATIVE: '#6c757d',
    CONFIRMED: '#22c55e',
    COMPLETED: '#3b82f6'
  },
  PriorityCode: {
    LOW: '#026adf',
    MEDIUM: '#dfcf02',
    HIGH: '#ca6621',
    URGENT: '#9a2407'
  },
  Status: {
    IN_PROGRESS: '1',
    COMPLETED: '2',
    CLOSED: '3',
    PENDING: '4',
    ON_HOLD: '5'
  },
  ReceiptStatusCode: {
    PARTIAL: '#FF5733',
    FULL: '#C70039'
  },
  ReceiptStatusDisplay: {
    PARTIAL: 'Partial Received',
    FULL: 'Fully Received'
  },
  Format: {
    EXPORT_DATE: 'YYYY-MM-DD',
    IMPORT_DATE: 'M/D/YYYY',
    EXPORT_TIME: 'HH:mm',
    IMPORT_TIME: 'h:mm a'
  },
  AppFilePath: {
    VanillaJS: {
      TEMPLATE: '../vanilla-app-bundle/index.html',
      STYLE: '../vanilla-app-bundle/index.css',
      JS: '../vanilla-app-bundle/app.js',
      SVG: '../vanilla-app-bundle/assets/images/vite.svg',
      AI_ICON: '../vanilla-app-bundle/assets/images/ai.png'
    },
    React: {
      TEMPLATE: '../react-app-bundle/index.html',
      STYLE: '../react-app-bundle/index.css',
      JS: '../react-app-bundle/app.js',
      SVG: '../react-app-bundle/assets/images/react.svg',
    },
    MOCKUP: './esp_cm_mockup.json',
    FILTER_MAP: './esp_cm_filterMap.json',
  },
  WO_PDF_TEMPLATE_ID: 'CUSTTMPL_FOP_WORK_ORDER'
})