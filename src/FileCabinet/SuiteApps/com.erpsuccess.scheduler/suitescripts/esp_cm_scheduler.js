/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/file', 
  'N/runtime', 
  'N/search', 
  'N/config', 
  'N/url', 
  'N/render',
  'N/record',
  'N/format',
  './lib/moment.min', 
  './lib/mockup'
],
  /**
   * @param{file} file
   * @param{runtime} runtime
   * @param{search} search
   * @param{config} config
   * @param{url} url
   * @param{render} render
   * @param{record} record
   * @param{format} format
   */
  (file, runtime, search, config, url, render, record, format, moment, mockup) => {

    class WorkOrderResource {

      static getList(ids, eventIds) {
        // return mockup.resources();
        let filters = [
          ['isinactive','is','F'],
          // 'AND',
          // ['custentity_esp_fop_is_employee_active','is','T'],
          'AND',
          ['custentity_esp_fop_is_wo_resource','is','T']
        ];

        if (ids) {
          filters.push('AND');
          filters.push(['internalid', 'anyof', ids]);
        }

        if (eventIds) {
          filters.push('AND');
          filters.push(['custentity_esp_fop_events', 'anyof', eventIds]);
        }

        // log.debug('WorkOrderResource > getList > filters', filters);

        const searchObj = search.create({
          type: 'employee',
          filters,
          columns: [
            search.createColumn({name: 'custentity_esp_fop_resource_group', label: 'Resource Group'}),
            search.createColumn({
              name: 'formulatext',
              formula: 'SUBSTR(TO_CHAR({firstname}), 0, 1) || SUBSTR(TO_CHAR({lastname}), 0, 1)',
              label: 'Formula (Text)'
            }),
            search.createColumn({
              name: 'formulatext',
              formula: "{firstname} || ' ' || {lastname}",
              label: 'Formula (Text)'
            }),
            search.createColumn({ name: 'email', label: 'Email' }),
            search.createColumn({ name: 'phone', label: 'Phone' }),
            search.createColumn({ name: 'location', label: 'Location' }),
            search.createColumn({name: 'custentity_esp_fop_is_employee_active', label: 'Active'}),
            search.createColumn({name: 'custentity_esp_fop_emp_resource_type', label: 'Resource Type'}),
            search.createColumn({name: 'custentity_esp_fop_emp_resource_subtype', label: 'Resource Subtype'}),
            search.createColumn({name: 'custentity_esp_fop_emp_affiliation_type', label: 'Affiliation Type'}),
            search.createColumn({name: 'custentity_esp_fop_emp_affiliated_vendor', label: 'Affiliated Vendor'}),
            search.createColumn({name: 'custentity_esp_fop_emp_employment_type', label: 'Employment Type'}),
            search.createColumn({name: 'custentity_esp_fop_emp_contract_type', label: 'Contract Type'}),
            search.createColumn({name: 'custentity_esp_fop_emp_contract_duration', label: 'Contract Duration'}),
            search.createColumn({name: 'custentity_esp_fop_emp_rate_per_hr', label: 'Rate Per Hour'}),
            search.createColumn({name: 'custentity_esp_fop_emp_fixed_bid_rate', label: 'Fixed Bid Rate'}),
            search.createColumn({name: 'custentity_esp_fop_events', label: 'Events'})
          ]
        });

        const all = [];
        searchObj.run().each((result) => {
          all.push({
            employee: {
              text: result.getValue(result.columns[2]),
              value: result.id
            },
            initials: result.getValue(result.columns[1]),
            email: result.getValue({ name: 'email' }),
            phone: result.getValue({ name: 'phone' }),
            location: {
              text: result.getText({ name: 'location' }),
              value: result.getValue({ name: 'location' }),
            },
            active: result.getValue('custentity_esp_fop_is_employee_active'),
            resourceGroup: {
              text: result.getText('custentity_esp_fop_resource_group'),
              value: result.getValue('custentity_esp_fop_resource_group'),
            },
            type: {
              text: result.getText('custentity_esp_fop_emp_resource_type'),
              value: result.getValue('custentity_esp_fop_emp_resource_type')
            },
            color: mockup.resourceColorCode()[result.id],//`#${Math.floor(Math.random()*16777215).toString(16)}`, // '#29546d'
            get url() {
              return encodeURIComponent(Url.resource(this.id))
            },
            events: (result.getValue('custentity_esp_fop_events') || '').split(',')
          });
          return true;
        });

        const active = all.filter(resource => Boolean(resource.active));
        log.audit('***** Resources *****', all);

        return {
          all,
          active
        };
      }

      static getResourceGroups(resources) {
        let all = resources.all
          .filter(resource => Boolean(resource.resourceGroup.text))
          .map(resource => resource.resourceGroup)
          .filter((x, i, arr) => 
            arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
          );

        let active = resources.active
          .filter(resource => Boolean(resource.resourceGroup.text))
          .map(resource => resource.resourceGroup)
          .filter((x, i, arr) => 
            arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
          );

        return {
          all,
          active
        }
      }

      // Link newly created event to the employee resources
      static _addEventToList(event) {
        const resources = event.selectedResources;

        for (let resource of resources) {
          try {
            const lookUp = search.lookupFields({
              type: 'employee', 
              id: resource.employee.id, 
              columns: 'custentity_esp_fop_events' 
            });
            const events = (lookUp.custentity_esp_fop_events[0]?.value || '').split(',');
            events.push(event.id);

            record.submitFields({
              type: 'employee',
              id: resource.employee.id,
              values: {
                custentity_esp_fop_events: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Updated Resource/Employee Record *****', resource.employee.id);
          } catch (e) {
            log.error('Error on Resource/Employee Update', { resource: resource.employee.id, errorMsg: e.message });
            resource.errorMsg = e.message;
          }
        }
      }
    }

    class WorkOrder {

      static getList() {
        // return mockup.workOrders()
        const searchObj = search.create({
          type: 'customrecord_esp_fop_work_order',
          filters:
          [
             ['isinactive', 'is', 'F']
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
            /* search.createColumn({ name: 'custrecord_esp_cfi_wo_location', label: 'Work Order Location' }),
            search.createColumn({ name: 'internalid', join: 'CUSTRECORD_ESP_CFI_WO_LOCATION', label: 'Internal ID' }), 
            search.createColumn({ name: 'name', join: 'CUSTRECORD_ESP_CFI_WO_LOCATION', label: 'Name' }), 
            search.createColumn({ name: 'address1', join: 'CUSTRECORD_ESP_CFI_WO_LOCATION', label: 'Address 1' }), 
            search.createColumn({ name: 'address2', join: 'CUSTRECORD_ESP_CFI_WO_LOCATION', label: 'Address 2' }), 
            search.createColumn({ name: 'address3', join: 'CUSTRECORD_ESP_CFI_WO_LOCATION', label: 'Address 3' }), */
            search.createColumn({ name: 'custrecord_esp_cfi_wo_so', label: 'Related Sales Order' }),
            search.createColumn({ name: 'custrecord_esp_cfi_wo_customer', label: 'Customer' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_resource_group', label: 'Resource Group' }),
            search.createColumn({ name: 'custrecord_esp_cfi_wo_memo', label: 'Work Order Memo' }),
            search.createColumn({ name: 'created', label: 'Date Created' }),
          ]
        });

        const workOrders = [];
        searchObj.run().each((result) => {
          workOrders.push({
            id: result.id,
            name: result.getValue('name'),
            title: result.getValue('custrecord_esp_cfi_wo_title'),
            project: {
              text: result.getText('custrecord_esp_cfi_wo_project'),
              value: result.getValue('custrecord_esp_cfi_wo_project'),
            },
            date: result.getValue('custrecord_esp_cfi_wo_trandate'),
            status: {
              text: result.getText('custrecord_esp_fop_wo_status'),
              value: result.getValue('custrecord_esp_fop_wo_status')
            },
            type: {
              text: result.getText('custrecord_esp_cfi_wo_type'),
              value: result.getValue('custrecord_esp_cfi_wo_type')
            },
            /* location: {
              text: result.getText('custrecord_esp_cfi_wo_location'),
              value: result.getValue('custrecord_esp_cfi_wo_location')
            },
            locationaddr: `${
              (result.getValue({ name: 'address1', join: 'custrecord_esp_cfi_wo_location' }) || '', 
               result.getValue({ name: 'address2', join: 'custrecord_esp_cfi_wo_location' }) || '', 
               result.getValue({ name: 'address3', join: 'custrecord_esp_cfi_wo_location' }) || '').trim(),
               result.getText('custrecord_esp_cfi_wo_location')
            }`, */
            memo: result.getValue('custrecord_esp_cfi_wo_memo'),
            salesorder: {
              text: result.getText('custrecord_esp_cfi_wo_so'),
              value: result.getValue('custrecord_esp_cfi_wo_so'),
            },
            customer: {
              text: result.getText('custrecord_esp_cfi_wo_customer'),
              value: result.getValue('custrecord_esp_cfi_wo_customer'),
            },
            resourceGroup: {
              text: result.getText('custrecord_esp_fop_wo_resource_group'),
              value: result.getValue('custrecord_esp_fop_wo_resource_group'),
            },
            priority: '',
            resources: {},
            items: [],
            addresses: [],
            contacts: [],
            events: [],
            get projectUrl() {
              return Url.project(this.project.value)
            },
            get woUrl() {
              return Url.workOrder(this.id)
            }
          });
          return true;
        });
        
        const woIds = workOrders.map(wo => wo.id);
        if (woIds.length) {
          const items = WorkOrderItem.getList(woIds);
          // Map WO Items
          for (let item of items) {
            const woRef = workOrders.find(wo => wo.id == item.workorder.value);
            if (woRef) {
              woRef.items.push(item);
            }
          }

          const contacts = WorkOrderContact._getList(woIds);
          // Map WO Contacts
          for (let contact of contacts) {
            const woRef = workOrders.find(wo => wo.id == contact.workorder.value);
            if (woRef) {
              woRef.contacts.push(contact);
            }
          }

          const addresses = WorkOrderAddress._getList(woIds);
          // Map WO Addresses
          for (let address of addresses) {
            const woRef = workOrders.find(wo => wo.id == address.workorder.value);
            if (woRef) {
              woRef.addresses.push(address);
            }
          }

          const events = Event._getList(woIds);
          // Map WO Addresses
          for (let event of events) {
            const woRef = workOrders.find(wo => wo.id == event.workorder.value);
            if (woRef) {
              woRef.events.push(event);
            }
          }
        }

        log.audit('***** Work Orders *****', workOrders);
        return workOrders;
      }

      static getCustomers(wokrOrders) {
        return wokrOrders
        .map(wo => wo.customer)
        .filter((x, i, arr) => 
          arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
        );
      }
      
      static hold(scriptContext) {
        const { request, response } = scriptContext;
        const { parameters: params } = request;
        const workOrderId = params.workOrderId;
        let responseJson = {};

        try {
          record.submitFields({
            type: 'customrecord_esp_fop_work_order',
            id: workOrderId,
            values: {
              custrecord_esp_fop_wo_status: 7 //Hold
            }
          });
          responseJson.status = 'success';
          responseJson.message = 'Updated Successfully';
        } catch (e) {
          responseJson.status = 'failed';
          responseJson.message = `Unexpected Error: ${e.message}`;
        }

        log.audit('***** Hold Work Order *****', { workOrderId, responseJson });

        response.write(JSON.stringify(responseJson));
      }

      static cancel(scriptContext) {
        const { request, response } = scriptContext;
        const { parameters: params } = request;
        const workOrderId = params.workOrderId;
        let responseJson = {};

        try {
          record.submitFields({
            type: 'customrecord_esp_fop_work_order',
            id: workOrderId,
            values: {
              custrecord_esp_fop_wo_status: 3 //Closed
            }
          });
          responseJson.status = 'success';
          responseJson.message = 'Updated Successfully';
        } catch (e) {
          responseJson.status = 'failed';
          responseJson.message = `Unexpected Error: ${e.message}`;
        }

        log.audit('***** Cancel Work Order *****', { workOrderId, responseJson });

        response.write(JSON.stringify(responseJson));
      }

      static print(scriptContext) {
        const { request, response } = scriptContext;
        const { parameters: params } = request;
        const workOrderId = params.workOrderId;

        const woRec = record.load({
          type: 'customrecord_esp_fop_work_order',
          id: workOrderId
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
          scriptId: 'CUSTTMPL_FOP_WORK_ORDER'
        });

        const pdfFile = renderer.renderAsPdf();
        pdfFile.name = `WorkOrder_${workOrderId}`;

        response.writeFile({
          file: pdfFile,
          isInline: true
        });
      }

      static printPickList(scriptContext) {
        const { request, response } = scriptContext;
        const { parameters: params } = request;
        const workOrderId = params.workOrderId;

        const woLookUp = search.lookupFields({
          type: 'customrecord_esp_fop_work_order',
          id: workOrderId,
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
    }

    class WorkOrderItem {
      
      static getList(woIds) {
        const searchObj = search.create({
          type: 'customrecord_esp_fop_wo_item',
          filters:
          [
            ['isinactive', 'is', 'F'],
            'AND',
            ['custrecord_esp_fop_wo_item_rel_wo', 'anyof', woIds]
          ],
          columns:
          [
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_rel_wo', label: 'Work Order' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_event', label: 'Work Order Event' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_name', label: 'Item' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_description', label: 'Description' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_quantity', label: 'Quantity' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_memo', label: 'Memo' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_line_id', label: 'Line ID' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_item_uuid', label: 'UUID' }),
          ]
        });

        const items = [];
        searchObj.run().each((result) => {
          items.push({
            id: result.id,
            workorder: {
              text: result.getText('custrecord_esp_fop_wo_item_rel_wo'),
              value: result.getValue('custrecord_esp_fop_wo_item_rel_wo')
            },
            event: {
              text: result.getText('custrecord_esp_fop_wo_item_event'),
              value: result.getValue('custrecord_esp_fop_wo_item_event')
            },
            uuid: result.getValue('custrecord_esp_fop_wo_item_uuid'),
            line: result.getValue('custrecord_esp_fop_wo_item_line_id'),
            item: {
              text: result.getText('custrecord_esp_fop_wo_item_name'),
              value: result.getValue('custrecord_esp_fop_wo_item_name')
            },
            description: result.getValue('custrecord_esp_fop_wo_item_description'),
            quantity: +result.getValue('custrecord_esp_fop_wo_item_quantity'),
            note: result.getValue('custrecord_esp_fop_wo_item_memo')
          });
          return true;
        });
        // log.audit('***** Work Order Items *****', items);
        return items;
      }

      static _addEventToList(event) {
        const items = event.selectedItems;

        for (let item of items) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_item', 
              id: item.id, 
              columns: 'custrecord_esp_fop_wo_item_event' 
            });
            const events = (lookUp.custrecord_esp_fop_wo_item_event[0]?.value || '').split(',');
            events.push(event.id);

            record.submitFields({
              type: 'customrecord_esp_fop_wo_item',
              id: item.id,
              values: {
                custrecord_esp_fop_wo_item_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Updated Work Order Item Record *****', item.id);
          } catch (e) {
            log.error('Error on Work Order Item Update', { item: item.item, errorMsg: e.message });
            item.errorMsg = e.message;
          }
        }
      }

      static _createList(event) {
        const items = event.items;

        for (let item of items) {
          try {
            const rec = record.create({ 
              type: 'customrecord_esp_fop_wo_item', 
              isDynamic: true 
            });
            const vars = {};
            vars.custrecord_esp_fop_wo_item_rel_wo = event.woRef.id;
            vars.custrecord_esp_fop_wo_item_event = event.id;
            vars.custrecord_esp_fop_wo_item_name = item.value;
            vars.custrecord_esp_fop_wo_item_quantity = item.quantity;
            vars.custrecord_esp_fop_wo_item_description = item.description;
            // vars.custrecord_esp_fop_wo_item_memo = ''
            vars.custrecord_esp_fop_wo_item_so = event.woRef.salesorder.value;
            vars.custrecord_esp_fop_wo_item_uuid = item.uuid;
            vars.custrecord_esp_fop_wo_item_line_id = item.line;

            for (let fieldId in vars) {
              rec.setValue({ fieldId, value: vars[fieldId] });
            }
            const newId = rec.save({ ignoreMandatoryFieds: true });
            log.audit('***** New Work Order Item Record *****', newId);

          } catch (e) {
            log.error('Error on Work Order Item Create', { item: item.item, errorMsg: e.message });
            item.errorMsg = e.message;
          }
        }
      }
    }

    class WorkOrderContact {

      static _getList = (woIds) => {
        const contacts = [];
        const searchObj = search.create({
          type: 'customrecord_esp_fop_wo_contact',
          filters:
          [
            ['isinactive', 'is', 'F'],
            'AND',
            ['custrecord_esp_fop_rel_wo', 'anyof', woIds]
          ],
          columns:
          [
            search.createColumn({ name: 'custrecord_esp_fop_rel_wo', label: 'Work Order' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_rel_event', label: 'Work Order Event' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_contact_rec', label: 'Contact' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_contact_name', label: 'Contact Name' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_contact_email', label: 'Email' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_contact_jobtitle', label: 'Job Title' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_mobile_no', label: 'Mobile Phone Number' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_phone_number', label: 'Phone Number' }),
          ]
        });
        searchObj.run().each((result) => {
          contacts.push({
            id: result.id,
            workorder: {
              text: result.getText('custrecord_esp_fop_rel_wo'),
              value: result.getValue('custrecord_esp_fop_rel_wo')
            },
            event: {
              text: result.getText('custrecord_esp_fop_wo_rel_event'),
              value: result.getValue('custrecord_esp_fop_wo_rel_event')
            },
            contact: {
              text: result.getText('custrecord_esp_fop_wo_contact_rec'),
              value: result.getValue('custrecord_esp_fop_wo_contact_rec')
            },
            name: result.getValue('custrecord_esp_fop_wo_contact_name'),
            email: result.getValue('custrecord_esp_fop_wo_contact_email'),
            jobTitle: result.getValue('custrecord_esp_fop_wo_contact_jobtitle'),
            mobilePhone: result.getValue('custrecord_esp_fop_wo_mobile_no'),
            phone: result.getValue('custrecord_esp_fop_wo_phone_number'),
            get url() {
              return Url.contact(this.contact.value)
            }
          });
          return true;
        });
        // log.audit('***** Work Order Contacts *****', contacts);
        return contacts;
      }

      static _addEventToList(event) {
        const contacts = event.contacts;

        for (let contact of contacts) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_contact', 
              id: contact.id, 
              columns: 'custrecord_esp_fop_wo_item_event' 
            });
            const events = (lookUp.custrecord_esp_fop_wo_item_event[0]?.value || '').split(',');
            events.push(event.id);

            record.submitFields({
              type: 'customrecord_esp_fop_wo_contact',
              id: item.id,
              values: {
                custrecord_esp_fop_wo_rel_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Updated Work Order Contact Record *****', contact.id);
          } catch (e) {
            log.error('Error on Work Order Contact Update', { contact: contact.name, errorMsg: e.message });
            item.errorMsg = e.message;
          }
        }
      }

      static _createList(event) {
        const contacts = event.contacts;

        for (let contact of contacts) {
          try {
            const rec = record.create({ 
              type: 'customrecord_esp_fop_wo_item', 
              isDynamic: true 
            });
            const vars = {};
            vars.custrecord_esp_fop_rel_wo = event.woRef.id;
            vars.custrecord_esp_fop_wo_rel_event = event.id;
            vars.custrecord_esp_fop_wo_contact_rec = contact.id;

            for (let fieldId in vars) {
              rec.setValue({ fieldId, value: vars[fieldId] });
            }
            const newId = rec.save({ ignoreMandatoryFieds: true });
            log.audit('***** New Work Order Contact Record *****', newId);

          } catch (e) {
            log.error('Error on Work Order Contact Create', { id: contact.id, errorMsg: e.message });
            contact.errorMsg = e.message;
          }
        }
      }
    }

    class WorkOrderAddress {

      static _getList(woIds) {
        const addresses = [];
        const searchObj = search.create({
          type: 'customrecord_esp_fop_wo_address',
          filters:
          [
            ['isinactive', 'is', 'F'],
            'AND',
            ['custrecord_esp_fop_address_rel_wo', 'anyof', woIds]
          ],
          columns:
          [
            search.createColumn({ name: 'custrecord_esp_fop_address_rel_wo', label: 'Work Order' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_add_customer', label: 'Customer' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_add_event', label: 'Work Order Event' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_address', label: 'Address' }),
            search.createColumn({ name: 'custrecord_esp_fop_wo_add_details', label: 'Address Details' }),
          ]
        });
        searchObj.run().each((result) => {
          addresses.push({
            id: result.id,
            workorder: {
              text: result.getText('custrecord_esp_fop_address_rel_wo'),
              value: result.getValue('custrecord_esp_fop_address_rel_wo')
            },
            customer: {
              text: result.getText('custrecord_esp_fop_wo_add_customer'),
              value: result.getValue('custrecord_esp_fop_wo_add_customer')
            },
            event: {
              text: result.getText('custrecord_esp_fop_wo_add_event'),
              value: result.getValue('custrecord_esp_fop_wo_add_event')
            },
            address: {
              text: result.getText('custrecord_esp_fop_wo_address'),
              value: result.getValue('custrecord_esp_fop_wo_address')
            },
            addressDetails: result.getValue('custrecord_esp_fop_wo_add_details'),
            get customerUrl() {
              return Url.customer(this.customer.value)
            }
          });
          return true;
        });
        // log.audit('***** Work Order Addresses *****', addresses);
        return addresses;
      }

      static _addEventToList(event) {
        const addresses = event.addresses;

        for (let address of addresses) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_address', 
              id: address.id, 
              columns: 'custrecord_esp_fop_wo_add_event' 
            });
            const events = (lookUp.custrecord_esp_fop_wo_add_event[0]?.value || '').split(',');
            events.push(event.id);

            record.submitFields({
              type: 'customrecord_esp_fop_wo_address',
              id: item.id,
              values: {
                custrecord_esp_fop_wo_add_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Updated Work Order Address Record *****', address.id);
          } catch (e) {
            log.error('Error on Work Order Address Update', { address: address.address.text, errorMsg: e.message });
            address.errorMsg = e.message;
          }
        }
      }

      static _createList(event) {
        const addresses = event.addresses;

        for (let address of addresses) {
          try {
            const rec = record.create({ type: 'customrecord_esp_fop_wo_address', isDynamic: true });
            const vars = {};
            vars.custrecord_esp_fop_wo_add_customer = address.customer.value;
            vars.custrecord_esp_fop_address_rel_wo = event.woRef.id;
            vars.custrecord_esp_fop_wo_add_event = event.id;
            vars.custrecord_esp_fop_wo_address = address.id;
            vars.custrecord_esp_fop_wo_add_details = address.addressDetails;

            for (let fieldId in vars) {
              rec.setValue({ fieldId, value: vars[fieldId] });
            }
            const newId = rec.save({ ignoreMandatoryFieds: true });
            log.audit('***** New Work Order Address Record *****', newId);
          } catch (e) {
            log.error('Error on Work Order Address Create', { id: address.id, errorMsg: e.message });
            address.errorMsg = e.message;
          }
        }
      }
    }

    class Event {
      
      static _getList(woIds) {
        const events = [];
        const searchObj = search.create({
          type: 'calendarevent',
          filters:
          [
            ['custevent_esp_fop_work_order', 'anyof', woIds],
            'AND',
            ['organizer', 'anyof', '@CURRENT@']
          ],
          columns:
          [
            search.createColumn({ 
              name: 'internalid', 
              label: 'Internal ID',
              sort: search.Sort.DESC
            }),
            search.createColumn({ name: 'title', label: 'Event'}),
            search.createColumn({ name: 'custevent_cfi_fsl_project', label: 'Project'}),
            search.createColumn({ name: 'location', label: 'Location'}),
            search.createColumn({ name: 'response', label: 'Response'}),
            search.createColumn({ name: 'status', label: 'Status'}),
            search.createColumn({ name: 'startdate', label: 'Start Date'}),
            search.createColumn({ name: 'starttime', label: 'Start Time'}),
            search.createColumn({ name: 'endtime', label: 'End Time'}),
            search.createColumn({ name: 'owner', label: 'Organiser'}),
            search.createColumn({ name: 'organizer', label: 'Organizer'}),
            search.createColumn({ name: 'markdone', label: 'Mark'}),
            search.createColumn({ name: 'custevent_esp_fop_work_order', label: 'Work Order'}),
            search.createColumn({ name: 'custevent_esp_fop_event_priority', label: 'Priority'}),
          ]
       });
       searchObj.run().each((result) => {
          events.push({
            id: result.id,
            title: result.getValue('title'),
            workorder: {
              text: result.getText('custevent_esp_fop_work_order'),
              value: result.getValue('custevent_esp_fop_work_order')
            },
            project: {
              text: result.getText('custevent_cfi_fsl_project'),
              value: result.getValue('custevent_cfi_fsl_project')
            },
            location: result.getValue('location'),
            status: {
              text: result.getText('status'),
              value: result.getValue('status'),
              get code() {
                switch (this.value) {
                  case 'TENTATIVE': // Low
                    return 'bg-secondary';
                  case 'CONFIRMED': // Mid
                    return 'bg-success';
                }
              }
            },
            date: {
              start: result.getValue('startdate'),
              end: result.getValue('startdate')
            },
            time: {
              start: result.getValue('starttime'),
              end: result.getValue('endtime')
            },
            priority: {
              text: result.getText('custevent_esp_fop_event_priority'),
              value: result.getValue('custevent_esp_fop_event_priority'),
              get code() {
                switch (this.value) {
                  case '1': // Low
                    return 'bg-secondary';
                  case '2': // Mid
                    return 'bg-warning';
                  case '3': // High
                  case '4': // Urgent
                    return 'bg-danger';
                }
              }
            },
            get url() {
              return Url.event(this.id)
            },
            color: '#1a6756',//,`#${Math.floor(Math.random()*16777215).toString(16)}`,
          });
          return true;
       });
       log.audit('***** Work Order Events *****', events);
       return events;
      }

      static createEventRecord(context) {
        const { request, response } = context;
        const user = runtime.getCurrentUser();
        let reqBody = request.body || '{}';
        const payload = JSON.parse(reqBody);
        const { eventData, woRef } = payload;

        log.audit('***** Create Work Order Event *****', { eventData });

        try {
          const vars = {};
          vars.title = woRef.title;
          vars.location = woRef.location.text;
          vars.custevent_cfi_fsl_project = woRef.project.value;
          vars.alldayevent = eventData.allDay;
          vars.custevent_esp_fop_work_order = eventData.woRef.id;
          vars.organizer = user.id;
          vars.status = 'CONFIRMED';
          vars.accesslevel = 'BUSY';
          vars.startdate = new Date(eventData.startDate);
          vars.enddate = new Date(eventData.endDate);
          vars.starttime = Utils.toDateTimez(eventData.startDate, eventData.startTime);
          vars.endtime = Utils.toDateTimez(eventData.startDate, eventData.endTime);
          vars.custevent_esp_fop_event_priority = eventData.priority;
          vars.custevent_esp_fop_memo = eventData.note;

          const rec = record.create({ type: 'calendarevent', isDynamic: true });
          for (let key in vars) {
            rec.setValue({ 
              fieldId: key, 
              value: vars[key] 
            });
          }
          eventData.id = rec.save({ ignoreMandatoryFieds: true });
          log.audit('***** Created Record *****', { recordId: eventData.id });

          // Add the newly event record to child related records (TBD)
          WorkOrderItem._addEventToList(eventData);
          WorkOrderContact._addEventToList(eventData);
          WorkOrderAddress._addEventToList(eventData);
          WorkOrderResource._addEventToList(eventData);
        } catch (e) {
          log.error('Error on Work Order Event Creation', { title: eventData.title, errorMsg: e.message, eventResources: eventData.resources });
          eventData.errorMsg = e.message;
        }

        if (eventData.id) {
          response.write(JSON.stringify({
            code: 200,
            status: 'ok',
            recordId: eventData.id
          }));
        } else {
          response.write(JSON.stringify({
            code: 400,
            status: 'Bad Request',
            message: eventData.errorMsg
          }));
        }
      }

      static _getLabourRateTypes = () => {
        const categories = [];
        const searchObj = search.create({
          type: 'customlist_esp_fop_labour_rate_cat',
          columns: [
            search.createColumn({
              name: 'internalid',
              sort: search.Sort.ASC
            }),
            'name'
          ]
        });
        searchObj.run().each((result) => {
          categories.push({
            id: result.id,
            name: result.getValue('name')
          });
          return true;
        });
        return categories;
      }

      static _getOrderPunchList = (woId) => {
        const punchList = [];
        const woLookUp = search.lookupFields({
          type: 'customrecord_esp_fop_work_order',
          id: woId,
          columns: 'custrecord_esp_cfi_wo_so'
        });
        let soId;
        if (woLookUp.custrecord_esp_cfi_wo_so && woLookUp.custrecord_esp_cfi_wo_so.length) {
          soId = woLookUp.custrecord_esp_cfi_wo_so[0].value;

          if (soId) {
            const searchObj = search.create({
              type: 'customrecord_esp_pp_punch',
              filters:
              [
                 ['custrecord_esp_pp_so', 'is', soId]
              ],
              columns:
              [
                 search.createColumn({ name: 'custrecord_esp_pp_status', label: 'Status' }),
                 search.createColumn({ name: 'custrecord_esp_pp_so', label: 'Sales Order' }),
                 search.createColumn({ name: 'custrecord_esp_pp_linked_tran_line', label: 'Linked Transaction Line' }),
                 search.createColumn({ name: 'custrecord_esp_pp_item', label: 'Item' }),
                 search.createColumn({ name: 'custrecord_esp_pp_qty', label: 'Qty' }),
                 search.createColumn({ name: 'custrecord_esp_pp_assign', label: 'Assigned To' }),
                 search.createColumn({ name: 'custrecord_esp_pp_reason', label: 'Reason' }),
                 search.createColumn({ name: 'custrecord_esp_pp_prod_loca', label: 'Product Location' }),
                 search.createColumn({ name: 'custrecord_esp_pp_laborhours', label: 'Labor Cost & Hours to Fix' }),
                 search.createColumn({ name: 'custrecord_esp_pp_intnotes', label: 'Resolutions Instructions' }),
                 search.createColumn({ name: 'custrecord_esp_pp_reasoncode', label: 'Reason Code:' }),
                 search.createColumn({ name: 'custrecord_esp_pp_hold_tillresolve', label: 'Do Not Invoice Till Resolved' }),
                 search.createColumn({ name: 'custrecord_esp_pp_refnumber', label: 'Reference #' }),
                 search.createColumn({ name: 'custrecord_esp_pp_descr', label: 'Description of Issue and CORRECT Part Number' }),
                 search.createColumn({ name: 'custrecord_esp_pp_ackno', label: 'Original Acknoweldgement #' }),
                 search.createColumn({ name: 'created', label: 'Date Created'})
              ]
            });
            searchObj.run().each((result) => {
              punchList.push({
                status: result.getText('custrecord_esp_pp_status'),
                reason: result.getText('custrecord_esp_pp_reason'),
                description: result.getValue('custrecord_esp_pp_descr'),
                resolution: result.getValue('custrecord_esp_pp_intnotes'),
                dateCreated: result.getValue('created'),
                enteredBy: result.getText('custrecord_esp_pp_assign')
              })
              return true;
            });
          }
        }
        log.debug('***** Punch List *****', punchList);
        return punchList;
      }

      static completeEventTemplateString = (id, woId) => {
        const fileName = 'completeEvent';
        
        // Load related files
        const template = file.load(`./src/${fileName}.html`);
        const js = file.load(`./src/js/${fileName}.js`);
        const css = file.load(`./src/css/${fileName}.css`);
        const domain = url.resolveDomain({
          hostType: url.HostType.APPLICATION,
          accountId: runtime.accountId
        });
        
        // Fetch needed data
        const events = this._getList([woId]);
        const eventRef = events.find((event) => event.id == id) || {};
        const resources = WorkOrderResource.getList(null, [id]);
        const items = WorkOrderItem.getList(woId);
        const punchList = this._getOrderPunchList(woId);
        const labourRateTypes = this._getLabourRateTypes();

        log.debug('Resources', resources);
        
        let htmlStr = template.getContents()
          .replace(`${fileName}.js`, `https://${domain}${js.url}`)
          .replace(`${fileName}.css`, `https://${domain}${css.url}`)
          .replace('{{resources}}', encodeURIComponent(JSON.stringify(resources)))
          .replace('{{items}}', encodeURIComponent(JSON.stringify(items)))
          .replace(/'/g, '"');
        
        const renderer = render.create();        
        renderer.addCustomDataSource({
          alias: 'data',
          format: render.DataSource.OBJECT,
          data: { eventRef, resources, items, punchList, labourRateTypes }
        });
        renderer.templateContent = htmlStr;
        const rendered = renderer.renderAsString();
  
        return rendered;
      }
      // TBD
      static fulfillOrderItems(context) {

      }
    }

    class Url {

      static suitelet() {
        return url.resolveScript({
          deploymentId: 'customdeploy_esp_sl_scheduler',
          scriptId: 'customscript_esp_sl_scheduler'
        })
      }
      
      static resource(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'employee',
          params: {
            selectedtab: 'custom336'
          }
        })
      }

      static workOrder(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'customrecord_esp_fop_work_order'
        })
      }

      static project(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'job'
        })
      }

      static event(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'calendarevent',
          params: {
            selectedtab: 'custom337'
          }
        })
      }

      /* static entity(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'entity'
        })
      } */

      static contact(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'contact'
        })
      }

      static customer(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: 'customer'
        })
      }
    }

    class Utils {

      static loadFiles = (name) => {
        const script = runtime.getCurrentScript();
        let fileObj = {
          template: file.load(`../src/${name}.html`),
          js: file.load(`../src/js/${name}.js`),
          css: file.load(`../src/css/${name}.css`),
          utils: file.load('../src/js/utils.js')
        };
        log.audit('***** Load File *****', fileObj);
        return fileObj;
      }

      static toDate = (dateStr) => dateStr ? moment(dateStr).format(this._dateFormat) : '';

      static toDateTimez = (dateStr, timeStr) => {
        const d = moment(`${dateStr} ${timeStr}`)._d;
        return d;
        // moment(`1/1/1999 ${timeStr}`).format('hh:mm a')
        /* return format.format({
          value: d,
          type: format.Type.DATETIMETZ
        }) */
      };

      static _dateFormat = () => {
        const user = runtime.getCurrentUser();
        return user.getPreference ({ name: 'DATEFORMAT' });
      }

      static _createRecord = (type, vars, isDynamic) => {
        // log.audit('Creating...', { type, vars });
        const rec = record.create({ type, isDynamic })
        for (let key in vars) {
          rec.setValue({ 
            fieldId: key, 
            value: vars[key] 
          });
        }
        const id = rec.save({ ignoreMandatoryFieds: true });
        log.audit('***** Created Record *****', { type, id });
        return id;
      }
      
      static createLogFile(name, contents, folderId) {
        try {
          const fileId = file.create({
            name,
            fileType: file.Type.PLAINTEXT,
            contents,
            folder: folderId
          }).save();
          log.audit('Log File ID', { name, fileId });
        } catch (e) {
          log.error('Log File Unexpected Error', e.message);
        }
      }
    }

    return {
      WorkOrderResource,
      WorkOrder,
      WorkOrderItem,
      WorkOrderContact,
      WorkOrderAddress,
      Event,
      Url,
      Utils
    }
  });