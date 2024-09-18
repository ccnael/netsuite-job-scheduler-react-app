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

    const EXPORT_DATE_FORMAT = 'YYYY-MM-DD', 
      IMPORT_DATE_FORMAT = 'M/D/YYYY', 
      EXPORT_TIME_FORMAT = 'HH:mm', 
      IMPORT_TIME_FORMAT = 'h:mm a';

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
        searchObj.run().each(result => {
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
            events: Utils._stringToArray(result.getValue('custentity_esp_fop_events'))
          });
          return true;
        });

        const active = all.filter(resource => Boolean(resource.active));
        // log.audit('***** Resources *****', all);

        return {
          all,
          active
        };
      }

      static getResourceGroups(resources) {
        const resourceGroupIds = resources.all
          .map(resource => resource.resourceGroup.value)
          .filter(resourceGroupId => Boolean(resourceGroupId));

        const resourceGroups = [];

        if (resourceGroupIds.length) {
          const searchObj = search.create({
            type: 'customrecord_esp_fop_wo_resources',
            filters:
            [
                ['internalid', 'anyof', resourceGroupIds]
            ],
            columns:
            [
              search.createColumn({ name: 'internalid', label: 'Internal ID', sort: search.Sort.ASC }),
              search.createColumn({ name: 'name', label: 'Name' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_grp_subsidiary', label: 'Subsidiary' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_grp_location', label: 'Location' }),
            ]
          });
          searchObj.run().each(result => {
            let _resources = JSON.parse(JSON.stringify(resources.all));
            _resources = _resources.filter(resource => resource.resourceGroup.value == result.id);
            resourceGroups.push({
              text: result.getValue('name'),
              value: result.id,
              resources: _resources,
              resourceCount: _resources.length
            });
            return true;
          });
        }

        // log.audit('Resource Groups', resourceGroups);
        return resourceGroups;
      }

      // Link newly created event to the employee resources
      static _appendEventToListValues(event) {
        const resources = event.selectedResources;
        for (let resource of resources) {
          try {
            const lookUp = search.lookupFields({
              type: 'employee', 
              id: resource.employee.value, 
              columns: 'custentity_esp_fop_events' 
            });
            let events = (lookUp.custentity_esp_fop_events[0]?.value || '').split(',');
            events.push(event.id);
            events = events.filter(event => Boolean(event));

            record.submitFields({
              type: 'employee',
              id: resource.employee.value,
              values: {
                custentity_esp_fop_events: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Added Event to Resource/Employee Record *****', resource.employee.value);
          } catch (e) {
            log.error('Error on Resource/Employee > Add Events', { resource: resource.employee.value, errorMsg: e.message });
            resource.errorMsg = e.messasge;
          }
        }
      }

      static _updateEventListValues(event, dataSrc) {
        const selectedResources = event.selectedResources;
        const selectedResourceIds = selectedResources.map(resource => resource.employee.value);
        const srcEvents = dataSrc.resources.filter(resource => Boolean(resource.selected));
        const srcEventIds = srcEvents.map(resource => resource.employee.value);
        const removedResources = srcEvents.filter(resource => !Boolean(selectedResourceIds.includes(resource.employee.value)));
        const newResources = selectedResources.filter(resource => !Boolean(srcEventIds.includes(resource.employee.value)));

        log.debug('Updating WO Resource Event List', { removedResources, newResources });

        for (const resource of removedResources) {
          try {
            const lookUp = search.lookupFields({
              type: 'employee', 
              id: resource.employee.value, 
              columns: 'custentity_esp_fop_events' 
            });
            const idToRemove = event.id;
            let events = (lookUp.custentity_esp_fop_events[0]?.value || '').split(',');
            const index = events.indexOf(idToRemove);

            if (index > -1) {
              events.splice(index, 1);
            }

            record.submitFields({
              type: 'employee',
              id: resource.employee.value,
              values: {
                custentity_esp_fop_events: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Updated Events of Resource/Employee Record *****', resource.employee.value);
          } catch (e) {
            log.error('Error on Resource/Employee > Update Events', { resource: resource.employee.value, errorMsg: e.message });
            resource.errorMsg = e.messasge;
          }
        }

        const clonedEventObj = JSON.parse(JSON.stringify(event));
        clonedEventObj.selectedResources = newResources;
        this._appendEventToListValues(clonedEventObj);
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
            search.createColumn({ name: 'custrecord_esp_cfi_wo_est_hours', label: 'Estimated Hours' })
          ]
        });

        const workOrders = [];
        searchObj.run().each(result => {
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
              value: result.getValue('custrecord_esp_fop_wo_status'),
              get code() {
                switch (this.text.toLowerCase()) {
                  case 'not started':
                    return '#026adf';
                  case 'in progress':
                    return '#026adf';
                  case 'completed':
                    return '#28a745';
                  case 'hold':
                    return '#6c757d';
                  case 'closed':
                    return '#6c757d';
                }
              }
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
            resources: [],
            items: [],
            addresses: [],
            contacts: [],
            events: [],
            get projectUrl() {
              return Url.project(this.project.value)
            },
            get woUrl() {
              return Url.workOrder(this.id)
            },
            get soUrl() {
              return Url.salesOrder(this.salesorder.value)
            },
            esthours: result.getValue('custrecord_esp_cfi_wo_est_hours')
          });
          return true;
        });

        // log.audit('***** Work Orders *****', workOrders);
        return workOrders;
      }

      static fullMap(workOrders, events, items, contacts, addresses) {
        const woIds = workOrders.map(wo => wo.id);
        if (woIds.length) {
          // Push Events to related WO
          for (let event of events) {
            const woRef = workOrders.find(wo => wo.id == event.workorder.value);
            if (woRef) {
              const _event = JSON.parse(JSON.stringify(event));
              woRef.events.push(_event);
            }
          }
          // Push Items to related WO
          for (let item of items) {
            const woRef = workOrders.find(wo => wo.id == item.workorder.value);
            if (woRef) {
              const _item = JSON.parse(JSON.stringify(item));
              woRef.items.push(_item);
            }
          }
          // Push Contacts to related WO
          for (let contact of contacts) {
            const woRef = workOrders.find(wo => wo.id == contact.workorder.value);
            if (woRef) {
              const _contact = JSON.parse(JSON.stringify(contact));
              woRef.contacts.push(_contact);
            }
          }
          // Push Addresses to related WO
          for (let address of addresses) {
            const woRef = workOrders.find(wo => wo.id == address.workorder.value);
            if (woRef) {
              const _address = JSON.parse(JSON.stringify(address));
              woRef.addresses.push(_address);
            }
          }
        }
      }

      static getCustomers(wokrOrders) {
        return wokrOrders
        .map(wo => wo.customer)
        .filter(customer => Boolean(customer.value))
        .filter((x, i, arr) => 
          arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
        );
      }
      
      static hold(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;
        let responseJson = {};

        try {
          record.submitFields({
            type: 'customrecord_esp_fop_work_order',
            id: woId,
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

        log.audit('***** Hold Work Order *****', { woId, responseJson });

        response.write(JSON.stringify(responseJson));
      }

      static cancel(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;
        let responseJson = {};

        try {
          record.submitFields({
            type: 'customrecord_esp_fop_work_order',
            id: woId,
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

        log.audit('***** Cancel Work Order *****', { woId, responseJson });

        response.write(JSON.stringify(responseJson));
      }

      static print(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;

        const woRec = record.load({
          type: 'customrecord_esp_fop_work_order',
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
          scriptId: 'CUSTTMPL_FOP_WORK_ORDER'
        });

        const pdfFile = renderer.renderAsPdf();
        pdfFile.name = `WorkOrder_${woId}`;

        response.writeFile({
          file: pdfFile,
          isInline: true
        });
      }

      static printPickList(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;

        const woLookUp = search.lookupFields({
          type: 'customrecord_esp_fop_work_order',
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
    }

    class WorkOrderItem {
      
      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);
        if (!woIds.length) return [];

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
        searchObj.run().each(result => {
          items.push({
            id: result.id,
            workorder: {
              text: result.getText('custrecord_esp_fop_wo_item_rel_wo'),
              value: result.getValue('custrecord_esp_fop_wo_item_rel_wo')
            },
            events: Utils._stringToArray(result.getValue('custrecord_esp_fop_wo_item_event')),
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

      static _appendEventToListValues(event) {
        const items = event.selectedItems;
        for (let item of items) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_item', 
              id: item.id, 
              columns: 'custrecord_esp_fop_wo_item_event' 
            });
            let events = (lookUp.custrecord_esp_fop_wo_item_event[0]?.value || '').split(',');
            events.push(event.id);
            events = events.filter(event => Boolean(event));

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
            log.audit('***** Added Event to WO Item Record *****', item.id);
          } catch (e) {
            log.error('Error on WO Item > Add Events', { item: item.item, errorMsg: e.message });
            item.errorMsg = e.message;
          }
        }
      }

      static _updateEventListValues(event, dataSrc) {
        const selectedItems = event.selectedItems;
        const selectedItemIds = selectedItems.map(item => item.id);
        const srcItems = dataSrc.items.filter(item => Boolean(item.selected));
        const srcItemIds = srcItems.map(item => item.id);
        const removedItems = srcItems.filter(item => !Boolean(selectedItemIds.includes(item.id)));
        const newItems = selectedItems.filter(item => !Boolean(srcItemIds.includes(item.id)));

        log.audit('Updating WO Item Event List', { removedItems, newItems });

        for (const item of removedItems) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_item', 
              id: item.id, 
              columns: 'custrecord_esp_fop_wo_item_event' 
            });
            const idToRemove = event.id;
            let events = (lookUp.custrecord_esp_fop_wo_item_event[0]?.value || '').split(',');
            const index = events.indexOf(idToRemove);

            if (index > -1) {
              events.splice(index, 1);
            }

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
            log.audit('***** Updated Events of WO Item Record *****', item.id);
          } catch (e) {
            log.error('Error on WO Item > Update Events', { item: item.item, errorMsg: e.message });
            item.errorMsg = e.messasge;
          }
        }

        const clonedEventObj = JSON.parse(JSON.stringify(event));
        clonedEventObj.selectedItems = newItems;
        this._appendEventToListValues(clonedEventObj);
      }
    }

    class WorkOrderContact {

      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);
        if (!woIds.length) return [];

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
            search.createColumn({ name: 'custrecord_esp_fop_wo_contact_role', label: 'Role' }),
          ]
        });
        searchObj.run().each(result => {
          contacts.push({
            id: result.id,
            workorder: {
              text: result.getText('custrecord_esp_fop_rel_wo'),
              value: result.getValue('custrecord_esp_fop_rel_wo')
            },
            events: Utils._stringToArray(result.getValue('custrecord_esp_fop_wo_rel_event')),
            contact: {
              text: result.getText('custrecord_esp_fop_wo_contact_rec'),
              value: result.getValue('custrecord_esp_fop_wo_contact_rec')
            },
            name: result.getValue('custrecord_esp_fop_wo_contact_name'),
            email: result.getValue('custrecord_esp_fop_wo_contact_email'),
            jobTitle: result.getValue('custrecord_esp_fop_wo_contact_jobtitle'),
            mobilePhone: result.getValue('custrecord_esp_fop_wo_mobile_no'),
            phone: result.getValue('custrecord_esp_fop_wo_phone_number'),
            primary: Boolean((result.getText('custrecord_esp_fop_wo_contact_role') || '').match(/primary contact/gi)) ? 'checked' : '',
            get url() {
              return Url.contact(this.contact.value)
            }
          });
          return true;
        });
        // log.audit('***** Work Order Contacts *****', contacts.filter(contact => contact.workorder.value == 1));
        return contacts;
      }

      static _appendEventToListValues(event) {
        const contacts = event.contacts;
        for (let contact of contacts) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_contact', 
              id: contact.id, 
              columns: 'custrecord_esp_fop_wo_rel_event' 
            });
            let events = (lookUp.custrecord_esp_fop_wo_rel_event[0]?.value || '').split(',');
            events.push(event.id);
            events = events.filter(event => Boolean(event));
  
            record.submitFields({
              type: 'customrecord_esp_fop_wo_contact',
              id: contact.id,
              values: {
                custrecord_esp_fop_wo_rel_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Added Event to WO Contact Record *****', contact.id);
          } catch (e) {
            log.error('Error on WO Item > Add Events', { item: item.item, errorMsg: e.message });
            item.errorMsg = e.message;
          }
        }
      }
    }

    class WorkOrderAddress {

      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);
        if (!woIds.length) return [];

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
        searchObj.run().each(result => {
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
            events: Utils._stringToArray(result.getValue('custrecord_esp_fop_wo_add_event')),
            address: {
              text: result.getText('custrecord_esp_fop_wo_address'),
              value: result.getValue('custrecord_esp_fop_wo_address')
            },
            addressDetails: (result.getValue('custrecord_esp_fop_wo_add_details') || '').replace(/\n/g, '<br/>'),
            get customerUrl() {
              return Url.customer(this.customer.value)
            }
          });
          return true;
        });
        // log.audit('***** Work Order Addresses *****', addresses);
        return addresses;
      }

      static _appendEventToListValues(event) {
        const addresses = event.addresses;
        for (let address of addresses) {
          try {
            const lookUp = search.lookupFields({
              type: 'customrecord_esp_fop_wo_address', 
              id: address.id, 
              columns: 'custrecord_esp_fop_wo_add_event' 
            });
            let events = (lookUp.custrecord_esp_fop_wo_add_event[0]?.value || '').split(',');
            events.push(event.id);
            events = events.filter(event => Boolean(event));
  
            record.submitFields({
              type: 'customrecord_esp_fop_wo_address',
              id: address.id,
              values: {
                custrecord_esp_fop_wo_add_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            }); 
            log.audit('***** Added Event to WO Address Record *****', address.id);
          } catch (e) {
            log.error('Error on WO Address > Add Events', { address: address.address.text, errorMsg: e.message });
            address.errorMsg = e.message;
          }
        }
      }
    }

    class Event {
      
       // Includes standalone/general events
      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);

        const filters = [ 
          // ['organizer', 'anyof', '@CURRENT@']
        ];
        if (woIds.length) {
          // filters.push('AND');
          filters.push(['custevent_esp_fop_work_order', 'anyof', woIds]);
        }
        const events = [];
        const searchObj = search.create({
          type: record.Type.CALENDAR_EVENT,
          filters,
          columns:
          [
            search.createColumn({ 
              name: 'internalid', 
              label: 'Internal ID',
              sort: search.Sort.ASC
            }),
            search.createColumn({ name: 'title', label: 'Event'}),
            // search.createColumn({ name: 'custevent_cfi_fsl_project', label: 'Project'}),
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
            search.createColumn({ name: 'custevent_esp_fop_memo', label: 'Memo'}),
            search.createColumn({ name: 'recurrence', label: 'Recurrency'}), // Extract endbydate field. Ex. output "occurs every day from 9/10/2024 until 9/12/2024"
            // search.createColumn({ name: 'alldayevent', label: 'All Day'}) // Invalid search column
            search.createColumn({ name: 'custevent_esp_fop_event_contact', label: 'Selected Contact'}),
            search.createColumn({ name: 'custevent_esp_fop_event_address', label: 'Selected Address'}),
          ]
       });
       searchObj.run().each(result => {
          events.push({
            id: result.id,
            title: result.getValue('title'),
            workorder: {
              text: result.getText('custevent_esp_fop_work_order'),
              value: result.getValue('custevent_esp_fop_work_order')
            },
            /* project: {
              text: result.getText('custevent_cfi_fsl_project'),
              value: result.getValue('custevent_cfi_fsl_project')
            }, */
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
              recurrence: result.getValue('recurrence') || '',
              start: moment(result.getValue('startdate')).format(EXPORT_DATE_FORMAT),
              get end() {
                const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/g;
                const dates = this.recurrence.match(dateRegex);
                if (dates.length) {
                  return moment(dates[dates.length - 1]).format(EXPORT_DATE_FORMAT);
                } else {
                  return this.start; // TBR
                }
              }
            },
            time: {
              start: moment(`1/1/1999 ${result.getValue('starttime')}`).format(EXPORT_TIME_FORMAT),
              end: moment(`1/1/1999 ${result.getValue('endtime')}`).format(EXPORT_TIME_FORMAT)
            },
            priority: {
              text: result.getText('custevent_esp_fop_event_priority'),
              value: result.getValue('custevent_esp_fop_event_priority'),
              get code() {
                // switch (this.value) {
                //   case '1': // Low
                //     return 'bg-secondary';
                //   case '2': // Mid
                //     return 'bg-warning';
                //   case '3': // High
                //   case '4': // Urgent
                //     return 'bg-danger';
                // }
                switch (this.value) {
                  case '1': // Low
                    return '#026adf';
                  case '2': // Mid
                    return '#dfcf02';
                  case '3': // High
                    return '#ca6621';
                  case '4': // Urgent
                    return '#9a2407';
                }
              }
            },
            note: result.getValue('custevent_esp_fop_memo'),
            get url() {
              return Url.event(this.id)
            },
            color: '#1a6756',//,`#${Math.floor(Math.random()*16777215).toString(16)}`,
            /* get woRef() {
              return workOrders.find(wo => this.workorder.value == wo.id)
            }, */
            woRef: {},
            resources: [],
            items: [],
            contacts: [],
            addresses: [],
            contact: { // Selected contact
              text: result.getText('custevent_esp_fop_event_contact'),
              value: result.getValue('custevent_esp_fop_event_contact')
            },
            address: { // Selected address
              text: result.getText('custevent_esp_fop_event_address'),
              value: result.getValue('custevent_esp_fop_event_address')
            }
          });
          return true;
       });
      //  log.audit('***** Work Order Events *****', events);
       return events;
      }

      static fullMap(workOrders, events, resources, items, contacts, addresses) {
        if (events.length) {
          // Map WO dataset per Event
          for (let event of events) {
            const woRef = workOrders.find(wo => wo.id == event.workorder.value);
            if (woRef) {
              const _woRef = JSON.parse(JSON.stringify(woRef))
              event.woRef = _woRef;
            }
          }
          // Push assigned resources to related Events.
          for (let resource of resources.all) {
            for (let event of events) {
              if (resource.events.includes(event.id)) {
                const _resource = JSON.parse(JSON.stringify(resource));
                _resource.selected = true;
                event.resources.push(_resource);
              } 
            }
          }
          // Push WO items to related Events
          for (let item of items) {
            for (let event of events) {
              if (item.events.includes(event.id)) {
                const _item = JSON.parse(JSON.stringify(item));
                _item.selected = true;
                event.items.push(_item);
              } 
            }
          }
          // Push WO contacts to related Events
          for (let contact of contacts) {
            for (let event of events) {
              if (contact.events.includes(event.id)) {
                const _contact = JSON.parse(JSON.stringify(contact));
                _contact.selected = true;
                event.contacts.push(_contact);
              } 
            }
          }
          // Push WO addresses to related Events
          for (let address of addresses) {
            for (let event of events) {
              if (address.events.includes(event.id)) {
                const _address = JSON.parse(JSON.stringify(address));
                _address.selected = true;
                event.addresses.push(_address);
              } 
            }
          }

          // Utils.createLogFile(`logEvent()`, JSON.stringify(events.find(event => event.id == 100792) || {}), 2199);
          // Utils.createLogFile(`items()`, JSON.stringify(items.find(item => item.workorder.value == 1) || {}), 2199);
          // Utils.createLogFile(`contacts()`, JSON.stringify(contacts.find(contact => Boolean(contact.events.includes('100792'))) || {}), 2199);
        }
      }

      static createEventRecord(context) {
        const { request, response } = context;
        const user = runtime.getCurrentUser();
        let reqBody = request.body || '{}';
        const payload = JSON.parse(reqBody);

        log.audit('***** Create Work Order Event *****', { payload });
        
        const { eventData, woRef } = payload;

        try {
          eventData.date.start = moment(eventData.date.start).format(IMPORT_DATE_FORMAT);
          eventData.date.end = moment(eventData.date.end).format(IMPORT_DATE_FORMAT);
          eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(IMPORT_TIME_FORMAT);
          eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(IMPORT_TIME_FORMAT);

          const fieldToSet = {};
          fieldToSet.title = eventData.title;
          // fieldToSet.custevent_cfi_fsl_project = woRef?.project?.value || '';
          // fieldToSet.alldayevent = eventData.allDay;
          fieldToSet.custevent_esp_fop_work_order = woRef?.id || '';
          fieldToSet.organizer = user.id;
          fieldToSet.status = eventData.status;
          fieldToSet.accesslevel = 'BUSY';
          fieldToSet.startdate = new Date(eventData.date.start);
          // fieldToSet.endbydate = new Date(eventData.date.end);
          fieldToSet.starttime = Utils._toDateTimez(eventData.date.start, eventData.time.start);
          fieldToSet.endtime = Utils._toDateTimez(eventData.date.start, eventData.time.end);
          fieldToSet.custevent_esp_fop_event_priority = eventData.priority;
          fieldToSet.custevent_esp_fop_memo = eventData.note;
          fieldToSet.custevent_esp_fop_event_contact = eventData.selectedContact.id;
          fieldToSet.custevent_esp_fop_event_address = eventData.selectedAddress.id;

          const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;
          // log.audit('Number of Days', numberOfDays);

          if (numberOfDays > 1) {
            fieldToSet.frequency = 'DAY';
            fieldToSet.period = '1'; // Repeat every 1 day(s) / Daily
          } else {
            // Default > Single Day Event (value->NONE)
          }

          fieldToSet.endbydate = new Date(eventData.date.end);

          const rec = record.create({ 
            type: record.Type.CALENDAR_EVENT, 
            isDynamic: true 
          });
          
          for (let key in fieldToSet) {
            rec.setValue({ 
              fieldId: key, 
              value: fieldToSet[key] 
            });
          }

          eventData.id = rec.save({ ignoreMandatoryFieds: true });
          log.audit('***** Created Event Record *****', { recordId: eventData.id });

          WorkOrderResource._appendEventToListValues(eventData);
          WorkOrderItem._appendEventToListValues(eventData);
          WorkOrderContact._appendEventToListValues(eventData);
          WorkOrderAddress._appendEventToListValues(eventData);

          response.write(JSON.stringify({
            code: 200,
            recordId: eventData.id,
            status: 'success'
          }));
        } catch (e) {
          log.audit('createEventRecord() Unexpected Error', e.message);

          response.write(JSON.stringify({
            code: 401,
            status: 'fail',
            errorMsg: e.message
          }));
        }
      }

      static updateEventRecord(context) {
        const { request, response } = context;
        const user = runtime.getCurrentUser();
        let reqBody = request.body || '{}';
        const payload = JSON.parse(reqBody);
        const { eventDataSrc, eventData } = payload;

        log.audit('***** Update Work Order Event *****', { payload });
        Utils.createLogFile(`updateEventRecord()`, JSON.stringify(payload), 2199);

        try {
          eventData.date.start = moment(eventData.date.start).format(IMPORT_DATE_FORMAT);
          eventData.date.end = moment(eventData.date.end).format(IMPORT_DATE_FORMAT);
          eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(IMPORT_TIME_FORMAT);
          eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(IMPORT_TIME_FORMAT);
          
          const rec = record.load({ 
            type: record.Type.CALENDAR_EVENT, 
            id: eventData.id 
          });
          const dataSrc = {
            title: rec.getValue('title'),
            date: {
              start: rec.getText('startdate'),
              end: rec.getText('endbydate')
            },
            time: {
              start: rec.getText('starttime'),
              end: rec.getText('endtime')
            },
            note: rec.getValue('custevent_esp_fop_memo'),
            status: rec.getValue('status'),
            priority: rec.getValue('custevent_esp_fop_event_priority'),
            contact: {
              text: rec.getText('custevent_esp_fop_event_contact'),
              value: rec.getText('custevent_esp_fop_event_contact')
            },
            address: {
              text: rec.getText('custevent_esp_fop_event_address'),
              value: rec.getText('custevent_esp_fop_event_address')
            }
          };

          const fieldToSet = {};

          log.audit('Field To Set > title field', { current: dataSrc.title, new : eventData.title, toSet: (dataSrc.title != eventData.title) });
          if (dataSrc.title != eventData.title) {
            fieldToSet.title = eventData.title;
          }

          log.audit('Field To Set > datestart field', { current: dataSrc.date.start, new : eventData.date.start, toSet: (dataSrc.date.start != eventData.date.start) });
          if (dataSrc.date.start != eventData.date.start) {
            fieldToSet.startdate = new Date(eventData.date.start);
          }

          log.audit('Field To Set > endbydate field', { current: dataSrc.date.end, new : eventData.date.end, toSet: (dataSrc.date.end != eventData.date.end) });
          if (dataSrc.date.end != eventData.date.end) {
            const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;

            if (numberOfDays > 1) {
              fieldToSet.frequency = 'DAY';
              fieldToSet.period = '1';
            }
            fieldToSet.endbydate = new Date(eventData.date.end);
          }

          log.audit('Field To Set > starttime field', { current: dataSrc.time.start, new : eventData.time.start, toSet: (dataSrc.time.start != eventData.time.start) });
          if (dataSrc.time.start != eventData.time.start) {
            fieldToSet.starttime = Utils._toDateTimez(eventData.date.start, eventData.time.start);
          }

          log.audit('Field To Set > endtime field', { current: dataSrc.time.end, new : eventData.time.end, toSet: (dataSrc.time.end != eventData.time.end) });
          if (dataSrc.time.end != eventData.time.end) {
            fieldToSet.endtime = Utils._toDateTimez(eventData.date.start, eventData.time.end);
          }

          log.audit('Field To Set > note field', { current: dataSrc.note, new : eventData.note, toSet: (dataSrc.note != eventData.note) });
          if (dataSrc.note != eventData.note) {
            fieldToSet.custevent_esp_fop_memo = eventData.note;
          }

          log.audit('Field To Set > priority field', { current: dataSrc.priority, new : eventData.priority, toSet: (dataSrc.priority != eventData.priority) });
          if (dataSrc.priority != eventData.priority) {
            fieldToSet.custevent_esp_fop_event_priority = eventData.priority;
          }

          log.audit('Field To Set > selected contact field', { current: dataSrc.contact.id, new : eventData.selectedContact.id, toSet: (eventData.selectedContact.id != dataSrc.contact.id) });
          if (eventData.selectedContact.id != dataSrc.contact.id) {
            fieldToSet.custevent_esp_fop_event_contact = eventData.selectedContact.id;
          }

          log.audit('Field To Set > selected address field', { current: dataSrc.address.id, new : eventData.selectedAddress.id, toSet: (eventData.selectedAddress.id != dataSrc.address.id) });
          if (eventData.selectedAddress.id != dataSrc.address.id) {
            fieldToSet.custevent_esp_fop_event_address = eventData.selectedAddress.id;
          }

          log.audit('Fields to update', { dataSrc, fieldToSet });

          if (Object.keys(fieldToSet).length) {
            for (const key in fieldToSet) {
              rec.setValue({ 
                fieldId: key, 
                value: fieldToSet[key] 
              });
              log.debug('Setting field ' + key, fieldToSet[key]);
            }
            rec.save({ ignoreMandatoryFieds: true });
            log.audit('***** Updated Event Record *****', { recordId: eventData.id });
          } else {
            log.audit('***** Update Event Record not needed! *****', { recordId: eventData.id });
          }
          
          WorkOrderResource._updateEventListValues(eventData, eventDataSrc);
          WorkOrderItem._updateEventListValues(eventData, eventDataSrc);
          
          response.write(JSON.stringify({
            code: 200,
            status: 'success'
          }));
        } catch (e) {
          response.write(JSON.stringify({
            code: 401,
            status: 'fail',
            errorMsg: e.message
          }));
        }
      }

      static getOrderPunchList = context => {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;

        const punchList = [];
        if (woId) {
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
              searchObj.run().each(result => {
                punchList.push({
                  status: {
                    text: result.getText('custrecord_esp_pp_status'),
                    value: result.getValue('custrecord_esp_pp_status')
                  },
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
        }
        log.debug('***** Punch List *****', punchList);
        return response.write(JSON.stringify(punchList));
      }

      static completeEvent(context) {
        const { request, response } = context;
        let reqBody = request.body || '{}';
        const payload = JSON.parse(reqBody);
        let { eventDataSrc, timeSheets, fulfillItems } = payload;
        const eventId = eventDataSrc.id;
        const soId = eventDataSrc.woRef?.salesorder?.value;

        log.audit('***** Complete Event *****', { timeSheets, fulfillItems });

        try {
          Event._createTimeTracking(eventDataSrc, timeSheets);
          Event._fulfillOrderItems(soId, fulfillItems);
          
          /* record.submitFields({
            type: record.Type.CALENDAR_EVENT,
            id: eventId,
            values: {
              custevent_esp_fop_event_completed: true
            },
            options: {
              ignoreMandatoryFieds: true
            }
          }); */
          
          response.write(JSON.stringify({
            code: 200,
            recordId: eventId,
            status: 'success'
          }));
        } catch (e) {
          log.audit('Complete Event Unexpected Error', e.message);

          response.write(JSON.stringify({
            code: 401,
            status: 'fail',
            errorMsg: e.message
          }));
        }
      }

      static _createTimeTracking(eventDataSrc, timeSheets) {
        const eventId = eventDataSrc.id;

        // Map hours and location
        timeSheets = timeSheets.map(timeSheet => {
          timeSheet.startTime = moment(`1/1/1999 ${timeSheet.startTime}`).format(IMPORT_TIME_FORMAT);
          timeSheet.endTime = moment(`1/1/1999 ${timeSheet.endTime}`).format(IMPORT_TIME_FORMAT);

          const diffDate = Utils._diffDates(`1/1/1999 ${timeSheet.startTime}`, `1/1/1999 ${timeSheet.endTime}`);
          // timeSheet.hours = `${diffDate.hour}:${String(diffDate.minute).length == 1 ? `0${diffDate.minute}` : diffDate.minute}`;
          timeSheet.hours = Utils._convertTimeToDecimal(diffDate.hour, diffDate.minute);
          const _resource = eventDataSrc.resources.find(resource => resource.employee.value == timeSheet.id);
          if (_resource) {
            timeSheet.location = _resource.location.value;
          }
          return timeSheet;
        });

        log.audit('Mapped Timesheets', timeSheets);

        timeSheets = timeSheets.filter(timeSheet => Boolean(timeSheet.location)); // Location is mandatory in the event record timetracking sublist

        if (timeSheets.length) {
          log.audit('***** Creating Timesheets *****', timeSheets);

          const rec = record.load({
            type: record.Type.CALENDAR_EVENT,
            id: eventId
          });
          const lineCount = rec.getLineCount({ sublistId: 'timeitem' });
          
          for (let i in timeSheets) {
            const timeSheet = timeSheets[i];
            const line = +i + lineCount;
            try {
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'employee',
                value: timeSheet.id,
                line
              });
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'trandate',
                value: new Date(),
                line
              });
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'hours',
                value: timeSheet.hours,
                line
              });
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'location',
                value: timeSheet.location,
                line
              });
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'memo',
                value: timeSheet.notes,
                line
              });
              log.audit('Timesheet Added', timeSheet);
            } catch (e) {
              log.error('Error Setting Timesheet', { errorMsg: e.message, timeSheet });
            }
          }
          rec.save({ ignoreMandatoryFields: true });
        }
      }

      static _fulfillOrderItems(soId, items) {
        log.audit('***** Fulfill Order Items *****', { soId, items });
        
        if (soId) {
          const rec = record.transform({
            fromType: record.Type.SALES_ORDER,
            fromId: soId,
            toType: record.Type.ITEM_FULFILLMENT,
            isDynamic: true
          });
          for (const item of items) {
            const idx = rec.findSublistLineWithValue({
              sublistId: 'item',
              fieldId: 'orderline',
              value: item.lineId
            });
            log.audit('Fulfilling item', { idx, item })
            if (idx > -1) {
              rec.selectLine({ sublistId: 'item', line: idx });
              rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'itemreceive',
                value: true
              });
              rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: item.completeQty
              });
              rec.commitLine({ sublistId: 'item' });
            }
          }
          rec.save({ ignoreMandatoryFieds: true });
          log.audit('Fulfilled Items!', items);
        }
      }

      static deleteEventRecord(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const eventId = params.id;

        try {
          record.delete({
            type: record.Type.CALENDAR_EVENT,
            id: eventId
          });
          response.write(JSON.stringify({
            code: 200,
            status: 'success'
          }));
        } catch (e) {
          log.audit('deleteRecord() Unexpected Error', e.message);
          
          response.write(JSON.stringify({
            code: 401,
            status: 'fail',
            errorMsg: e.message
          }));
        }
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

      static salesOrder(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: record.Type.SALES_ORDER
        })
      }

      static project(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: record.Type.JOB
        })
      }

      static event(recordId = '') {
        return url.resolveRecord({
          isEditMode: false,
          recordId,
          recordType: record.Type.CALENDAR_EVENT,
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
        let fileObj = {
          template: file.load(`./src (To Be Removed)/${name}.html`),
          js: file.load(`./src (To Be Removed)/${name}.js`),
          css: file.load(`./src (To Be Removed)/${name}.css`),
          utils: file.load('./src (To Be Removed)/components/utils.js'),
          eventForm: file.load('./src (To Be Removed)/components/eventForm.html'),
          generalEventForm: file.load('./src (To Be Removed)/components/generalEventForm.html'),
          completeEventForm: file.load('./src (To Be Removed)/components/completeEventForm.html')
        };
        log.audit('***** Load File *****', fileObj);
        return fileObj;
      }

      static _stringToArray = str => (str || '').split(',').filter(el => Boolean(el));

      static _toDate = dateStr => dateStr ? moment(dateStr).format(this._dateFormat) : '';

      static _toDateTimez = (dateStr, timeStr) => moment(`${dateStr} ${timeStr}`)._d;

      static _dateFormat() {
        const user = runtime.getCurrentUser();
        return user.getPreference ({ name: 'DATEFORMAT' });
      }

      static _diffDates(start, end) {
        start = new Date(start).getTime()
        end = new Date(end).getTime()
        var d = Math.abs(end - start) / 1000 // delta
        var r = {} // result
        var s = { // structure
            year: 31536000,
            month: 2592000,
            week: 604800, // uncomment row to ignore
            day: 86400, // feel free to add your own row
            hour: 3600,
            minute: 60,
            second: 1
        }
        Object.keys(s).forEach(function (key) {
            r[key] = Math.floor(d / s[key])
            d -= r[key] * s[key]
        });
        // Sample return
        /* {
          "year": 0,
          "month": 0,
          "week": 0,
          "day": 0,
          "hour": 0,
          "minute": 30,
          "second": 0
        } */
        return r;
      }

      static _convertTimeToDecimal(hours, minutes) {
        const totalMinutes = (hours * 60) + minutes;
        return totalMinutes / 60;
      }
      
      static createLogFile(name, contents, folderId) {
        try {
          // Already throwing error "This record already exists" ????
          const fileId = file.create({
            name: `${name}_${moment().format('MMDDYYYY_hhmmss')}.json`,
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