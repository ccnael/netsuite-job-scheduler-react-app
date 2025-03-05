/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(() => ({
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
    ASSET: 'customrecord_esp_fop_asset'
  },
  WorkOrderCode: {
    NOT_STARTED: '#026adf',
    IN_PROGRESS: '#026adf',
    COMPLETED: '#28a745',
    ON_HOLD: '#6c757d',
    CLOSED: '#6c757d'
  },
  EventCode: {
    TENTATIVE: 'bg-secondary',
    CONFIRMED: 'bg-success',
    COMPLETED: 'bg-info'
  },
  PriorityCode: {
    LOW: '#026adf',
    MEDIUM: '#dfcf02',
    HIGH: '#ca6621',
    URGENT: '#9a2407'
  },
  Status: {
    PENDING: '1',
    IN_PROGRESS: '2',
    CLOSED: '3',
    COMPLETED: '4',
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
  FilterMapPath: './lib/filterMap.json'
}))