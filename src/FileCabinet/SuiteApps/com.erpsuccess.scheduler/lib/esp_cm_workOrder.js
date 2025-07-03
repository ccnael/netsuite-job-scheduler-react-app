/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/search',
  'N/record',
  'N/render',
  './esp_cm_utils',
  './esp_cm_constants'
], (search, record, render, utils, env) => {
  /**
   * Get the list of work orders
   * @param {Object} context Suitelet object
   */
  function getWorkOrders(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: env.RecordType.WORK_ORDER,
      filters:
        [
          ['isinactive', 'is', 'F'],
          'AND',
          ['custrecord_esp_cfi_wo_so.mainline', 'is', 'T']
        ],
      columns:
        [
          search.createColumn({
            name: 'internalid',
            label: 'Internal ID',
            sort: search.Sort.DESC
          }),
          search.createColumn({ name: 'id', label: 'ID' }),
          search.createColumn({ name: 'name', label: 'Name' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_trandate', label: 'Date' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_title', label: 'Title' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_project', label: 'Project' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_status', label: 'Status' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_type', label: 'Work Order Type' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_so', label: 'Related Sales Order' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_customer', label: 'Customer' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_resource_group', label: 'Resource Group' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_memo', label: 'Work Order Memo' }),
          search.createColumn({ name: 'created', label: 'Date Created' }),
          search.createColumn({ name: 'custrecord_esp_cfi_wo_est_hours', label: 'Estimated Hours' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_location', label: 'Location' }),
          search.createColumn({ name: 'custrecord_esp_fop_wo_ir_status', label: 'Item Receipt Status' }),
          search.createColumn({ name: 'custbody_so_oi', join: 'custrecord_esp_cfi_wo_so', label: 'Project Insight' })
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const workOrders = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue('name'),
      title: map.getValue('custrecord_esp_cfi_wo_title'),
      project: {
        text: map.getText('custrecord_esp_cfi_wo_project'),
        value: map.getValue('custrecord_esp_cfi_wo_project'),
      },
      date: map.getValue('custrecord_esp_cfi_wo_trandate'),
      status: {
        text: map.getText('custrecord_esp_fop_wo_status'),
        value: map.getValue('custrecord_esp_fop_wo_status'),
        get code() {
          switch (this.text.toLowerCase()) {
            case 'not started':
              return env.WorkOrderCode.NOT_STARTED;
            case 'in progress':
              return env.WorkOrderCode.IN_PROGRESS;
            case 'completed':
              return env.WorkOrderCode.COMPLETED;
            case 'hold':
              return env.WorkOrderCode.ON_HOLD;
            case 'closed':
              return env.WorkOrderCode.CLOSED;
          }
        }
      },
      type: {
        text: map.getText('custrecord_esp_cfi_wo_type'),
        value: map.getValue('custrecord_esp_cfi_wo_type')
      },
      memo: map.getValue('custrecord_esp_cfi_wo_memo'),
      salesorder: {
        text: map.getText('custrecord_esp_cfi_wo_so'),
        value: map.getValue('custrecord_esp_cfi_wo_so'),
      },
      customer: {
        text: map.getText('custrecord_esp_cfi_wo_customer'),
        value: map.getValue('custrecord_esp_cfi_wo_customer'),
      },
      // resources: [],
      // vendors: [],
      // assets: [],
      // items: [],
      // addresses: [],
      // contacts: [],
      // events: [],
      get projectUrl() {
        return utils.Url.projectUrl(this.project.value)
      },
      get woUrl() {
        return utils.Url.workOrderUrl(this.id)
      },
      get soUrl() {
        return utils.Url.salesOrderUrl(this.salesorder.value)
      },
      esthours: map.getValue('custrecord_esp_cfi_wo_est_hours'),
      location: {
        text: map.getText('custrecord_esp_fop_wo_location'),
        value: map.getValue('custrecord_esp_fop_wo_location'),
      },
      receiptStatus: {
        text: map.getText('custrecord_esp_fop_wo_ir_status'),
        value: map.getValue('custrecord_esp_fop_wo_ir_status'),
        get code() {
          switch (this.value) {
            case '2':
              return env.ReceiptStatusCode.PARTIAL;
            case '3':
              return env.ReceiptStatusCode.FULL;
          }
        },
        get display() {
          switch (this.value) {
            case '2':
              return env.ReceiptStatusDisplay.PARTIAL;
            case '3':
              return env.ReceiptStatusDisplay.FULL;
          }
        }
      },
      projectInsight: {
        text: map.getText({
          name: 'custbody_so_oi',
          join: 'custrecord_esp_cfi_wo_so'
        }),
        value: map.getValue({
          name: 'custbody_so_oi',
          join: 'custrecord_esp_cfi_wo_so'
        })
      }
    }));

    // utils.createLogFile(JSON.stringify(workOrders));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Work Orders] -----', workOrders.length);
    response.write(JSON.stringify(workOrders));
  }

  function holdWorkOrder(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId } = params;
    const result = {};

    try {
      record.submitFields({
        type: env.RecordType.WORK_ORDER,
        id: woId,
        values: {
          custrecord_esp_fop_wo_status: env.Status.ON_HOLD
        }
      });
      result.status = 'success';
      result.message = 'Updated Successfully';
    } catch (e) {
      result.status = 'failed';
      result.message = `Unexpected Error: ${e.message}`;
    }

    log.audit('----- [Hold Work Order] -----', { woId, result });

    response.write(JSON.stringify(result));
  }

  function cancelWorkOrder(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId } = params;
    const result = {};

    try {
      record.submitFields({
        type: env.RecordType.WORK_ORDER,
        id: woId,
        values: {
          custrecord_esp_fop_wo_status: env.Status.CLOSED
        }
      });
      result.status = 'success';
      result.message = 'Updated Successfully';
    } catch (e) {
      result.status = 'failed';
      result.message = `Unexpected Error: ${e.message}`;
    }

    log.audit('----- [Cancel Work Order] -----', { woId, result });

    response.write(JSON.stringify(result));
  }

  function printWorkOrder(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId } = params;
    const woRec = record.load({
      type: env.RecordType.WORK_ORDER,
      id: woId
    });
    const subsidiaryId = woRec.getValue({
      fieldId: 'custrecord_esp_cfi_wo_subsidiary'
    });
    const subRec = record.load({
      type: 'subsidiary',
      id: subsidiaryId
    });
    const renderer = render.create();
    renderer.addRecord({
      templateName: 'record',
      record: woRec
    });
    renderer.addRecord({
      templateName: 'subsidiary',
      record: subRec
    });
    renderer.setTemplateByScriptId({
      scriptId: env.WO_PDF_TEMPLATE_ID
    });
    const pdfFile = renderer.renderAsPdf();
    pdfFile.name = `WorkOrder_${woId}`;
    response.writeFile({
      file: pdfFile,
      isInline: true
    });
  }

  function printPickList(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { woId } = params;
    const woLookUp = search.lookupFields({
      type: env.RecordType.WORK_ORDER,
      id: woId,
      columns: 'custrecord_esp_cfi_wo_so'
    });
    let soId;
    if (woLookUp) {
      soId = +(woLookUp.custrecord_esp_cfi_wo_so[0].value);
    }
    if (soId) {
      const pdfFile = render.pickingTicket({
        entityId: soId,
        printMode: render.PrintMode.PDF,
        inCustLocale: true
      });
      pdfFile.name = `PickingTicket_${soId}.pdf`;
      response.writeFile({
        file: pdfFile,
        isInline: true
      });
    } else {
      response.write('<h1>Missing Sales Order</h1>');
    }
  }

  function getWorkOrderStatuses() {
    const formatText = txt => {
      return txt
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    };
    return Object.entries(env.Status).map(([key, value]) => ({
      text: formatText(key),
      value: value
    }));
  }

  return {
    getWorkOrders,
    holdWorkOrder,
    cancelWorkOrder,
    printWorkOrder,
    printPickList,
    getWorkOrderStatuses
  }
})