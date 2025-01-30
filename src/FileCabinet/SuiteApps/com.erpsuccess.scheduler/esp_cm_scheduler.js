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
  './lib/constants'
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
  (file, runtime, search, config, url, render, record, format, moment, env) => {

    // INITIAL RESOURCE
    // -------------------------
    class Resource {

      static getEmployees(events) {
        const filters = [
          ['isinactive', 'is', 'F'],
          'AND',
          ['custentity_esp_fop_is_wo_resource', 'is', 'T']
        ];

        const searchObj = search.create({
          type: 'employee',
          filters,
          columns: [
            search.createColumn({ name: 'custentity_esp_fop_resource_group', label: 'Resource Group' }),
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
            search.createColumn({ name: 'custentity_esp_fop_is_employee_active', label: 'Active' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_resource_type', label: 'Resource Type' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_resource_subtype', label: 'Resource Subtype' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_affiliation_type', label: 'Affiliation Type' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_affiliated_vendor', label: 'Affiliated Vendor' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_employment_type', label: 'Employment Type' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_contract_type', label: 'Contract Type' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_contract_duration', label: 'Contract Duration' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_rate_per_hr', label: 'Rate Per Hour' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_fixed_bid_rate', label: 'Fixed Bid Rate' }),
            search.createColumn({ name: 'custentity_esp_fop_labour_rate_matrix', label: 'Labour Rates' }),
            search.createColumn({ name: 'custentity_esp_fop_emp_resource_skill', label: 'Resource Skill' }),
            // search.createColumn({ name: 'custentity_esp_fop_events', label: 'Events' }),
            search.createColumn({ name: 'location', label: 'Location' }),
            search.createColumn({ name: 'department', label: 'Department' }),
          ]
        });

        const resources = [];
        searchObj.run().each(result => {
          resources.push({
            id: result.id,
            name: result.getValue(result.columns[2]),
            initials: result.getValue(result.columns[1]),
            email: result.getValue({ name: 'email' }),
            phone: result.getValue({ name: 'phone' }),
            location: {
              text: result.getText({ name: 'location' }),
              value: result.getValue({ name: 'location' }),
            },
            active: result.getValue('custentity_esp_fop_is_employee_active'),
            get employee() {
              return {
                text: this.name,
                value: this.id
              }
            },
            get resourceGroups() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custentity_esp_fop_resource_group')),
                values: Utils._stringToArray(result.getValue('custentity_esp_fop_resource_group')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            get types() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custentity_esp_fop_emp_resource_type')),
                values: Utils._stringToArray(result.getValue('custentity_esp_fop_emp_resource_type')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            get subTypes() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custentity_esp_fop_emp_resource_subtype')),
                values: Utils._stringToArray(result.getValue('custentity_esp_fop_emp_resource_subtype')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            rate: +result.getValue('custentity_esp_fop_emp_rate_per_hr'),
            vendor: {
              text: result.getText('custentity_esp_fop_emp_affiliated_vendor'),
              value: result.getValue('custentity_esp_fop_emp_affiliated_vendor'),
            },
            purchaseOrder: {
              text: '',
              value: '',
            },
            affiliationType: {
              text: result.getText('custentity_esp_fop_emp_affiliation_type'),
              value: result.getValue('custentity_esp_fop_emp_affiliation_type')
            },
            get url() {
              return encodeURIComponent(Url.resource(this.id))
            },
            events: events.filter(event => event.resources.map(resource => resource.employee.value).includes(result.id)).map(event => event.id),
            labRates: JSON.parse(result.getValue('custentity_esp_fop_labour_rate_matrix') || '[]'),
            time: {
              start: '',
              end: ''
            },
            get resourceSkills() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custentity_esp_fop_emp_resource_skill')),
                values: Utils._stringToArray(result.getValue('custentity_esp_fop_emp_resource_skill')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            location: {
              text: result.getText('location'),
              value: result.getValue('location')
            },
            department: {
              text: result.getText('department'),
              value: result.getValue('department')
            }
          });
          return true;
        });
        // log.audit('----- [Resources] -----', all);
        return resources;
      }

      static getResourceGroups(resources) {
        let resourceGroupIds = [];
        resources.map(resource => resourceGroupIds = [...resourceGroupIds, ...resource.resourceGroups.map(resourceGroup => resourceGroup.value)]);
        resourceGroupIds = Array.from(new Set(resourceGroupIds)).filter(Boolean);
        const resourceGroups = [];

        if (resourceGroupIds.length) {
          const searchObj = search.create({
            type: env.RecordType.RESOURCE_GROUP,
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
            let _resources = deepCopy(resources);
            _resources = _resources.filter(resource => resource.resourceGroups.map(resourceGroup => resourceGroup.value).includes(result.id));
            resourceGroups.push({
              text: result.getValue('name'),
              value: result.id,
              resources: _resources,
              resourceCount: _resources.length
            });
            return true;
          });
        }
        return resourceGroups;
      }

      static getVendors(events) {
        const searchObj = search.create({
          type: 'vendor',
          filters:
            [
              ['custentity_esp_fop_is_wo_vendor', 'is', 'T']
            ],
          columns:
            [
              search.createColumn({ name: 'entityid', label: 'Name' }),
              search.createColumn({ name: 'email', label: 'Email' }),
              search.createColumn({ name: 'url', label: 'Web Address' }),
              search.createColumn({ name: 'phone', label: 'Phone' }),
              search.createColumn({ name: 'altphone', label: 'Office Phone' }),
              search.createColumn({ name: 'fax', label: 'Fax' }),
              search.createColumn({ name: 'altemail', label: 'Alt. Email' }),
              search.createColumn({ name: 'custentity_esp_fop_ven_avail_resources', label: 'Available Resources' }),
              search.createColumn({ name: 'isinactive', label: 'Isinactive' })
            ]
        });

        const vendors = [];
        searchObj.run().each(result => {
          vendors.push({
            id: result.id,
            name: result.getValue('entityid'),
            get vendor() {
              return {
                text: this.name,
                value: this.id
              }
            },
            url: result.getValue('url'),
            email: result.getValue('email'),
            get initials() {
              let split = this.name.split(' ').map(name => name.replace(/[^a-zA-Z]/g, ''));
              split = split.filter(Boolean);
              if (split.length > 1) {
                return `${split[0][0]}${split[1][0] || ''}`;
              } else if (split.length == 1) {
                return split[0][0];
              } else {
                return this.name;
              }
            },
            quantityRequired: 0,
            quantityAvailable: +result.getValue('custentity_esp_fop_ven_avail_resources'),
            active: !result.getValue('isinactive'),
            purchaseOrder: {
              text: '',
              value: ''
            },
            woVendor: false,
            events: events.filter(event => event.vendors.map(vendor => vendor.vendor.value).includes(result.id)).map(event => event.id),
            memo: ''
          });
          return true;
        })
        // log.audit('----- [Vendors] -----', vendors);
        return vendors;
      }

      static getAssetsAndEquipments(events) {
        const searchObj = search.create({
          type: 'item',
          filters:
            [
              ['custitem_esp_fop_asset_owned', 'is', 'T'],
              'AND',
              ['custitem_esp_fop_resource_item_asset', 'is', 'T']
            ],
          columns:
            [
              search.createColumn({ name: 'itemid', label: 'Name' }),
              search.createColumn({ name: 'displayname', label: 'Display Name' }),
              search.createColumn({ name: 'salesdescription', label: 'Description' }),
              search.createColumn({ name: 'type', label: 'Type' }),
              // search.createColumn({ name: 'custitem_esp_fop_equipment_type', label: 'Equipment Type' }),
              search.createColumn({ name: 'vendor', label: 'Preferred Vendor' }),
              search.createColumn({ name: 'custitem_esp_fop_rental_duration', label: 'Rental Duration' }),
              search.createColumn({ name: 'custitem_esp_fop_rental_matrix', label: 'Rental Matrix' }),
              search.createColumn({ name: 'custitem_esp_fop_rental_unit', label: 'Rental Unit' }),
              search.createColumn({ name: 'location', label: 'Location' }),
              search.createColumn({ name: 'department', label: 'Department' })
            ]
        });

        const assets = [];
        searchObj.run().each(result => {
          assets.push({
            id: result.id,
            name: result.getValue('itemid'),
            displayname: result.getValue('displayname'),
            quantity: 0,
            description: result.getValue('salesdescription'),
            /* equipmentType: {
              text: result.getText('custitem_esp_fop_equipment_type'),
              value: result.getValue('custitem_esp_fop_equipment_type')
            }, */
            get item() {
              return {
                text: this.name,
                value: this.id
              }
            },
            vendor: {
              text: result.getText('vendor'),
              value: result.getValue('vendor')
            },
            rentalDuration: +result.getValue('custitem_esp_fop_rental_duration'),
            rentalMatrix: +result.getValue('custitem_esp_fop_rental_matrix'),
            rentalUnit: {
              text: result.getText('custitem_esp_fop_rental_unit'),
              value: result.getValue('custitem_esp_fop_rental_unit')
            },
            events: events.filter(event => event.assets.map(asset => asset.item.value).includes(result.id)).map(event => event.id),
            location: {
              text: result.getText('location'),
              value: result.getValue('location')
            },
            department: {
              text: result.getText('department'),
              value: result.getValue('department')
            }
          });
          return true;
        });
        // log.audit('----- [Assets & Equipments] -----', assets);
        return assets;
      }

      static getResourceSkills(resources) {
        let resourceSkillIds = [];
        resources.map(resource => resourceSkillIds = [...resourceSkillIds, ...resource.resourceSkills.map(resourceSkill => resourceSkill.value)]);
        resourceSkillIds = Array.from(new Set(resourceSkillIds)).filter(Boolean);
        const filters = [
          ['isinactive', 'is', 'F']
        ];
        if (resourceSkillIds.length) {
          filters.push('AND');
          filters.push(['internalid', 'anyof', resourceSkillIds]);
        }
        const searchObj = search.create({
          type: env.RecordType.RESOURCE_SKILL,
          filters,
          columns:
            [
              search.createColumn({ name: 'name', label: 'Name' })
            ]
        });
        const resourceSkills = [];
        searchObj.run().each(result => {
          resourceSkills.push({
            text: result.getValue('name'),
            value: result.id
          });
          return true;
        });
        // log.audit('----- [Resource Skills] -----', resourceSkills);
        return resourceSkills;
      }

      static getResourceLocations(resources, vendors, assets) {
        const locations = [
          ...resources.map(resource => resource.location),
          ...vendors.map(vendor => vendor.location),
          ...assets.map(asset => asset.location)
        ]
          .filter(Boolean)
          .filter(location => !!(location.value))
          .filter((x, i, arr) =>
            arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
          );
        // log.audit('RESOURCE LOCATIONS', locations);
        return locations;
      }

      static getResourceDepartments(resources, vendors, assets) {
        const departments = [
          ...resources.map(resource => resource.department),
          ...vendors.map(vendor => vendor.department),
          ...assets.map(asset => asset.department)
        ]
          .filter(Boolean)
          .filter(department => !!(department.value))
          .filter((x, i, arr) =>
            arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
          );
        // log.audit('RESOURCE DEPARTMENTS', departments);
        return departments;
      }
    }

    class WorkOrder {

      static getList() {
        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER,
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
              search.createColumn({ name: 'custrecord_esp_cfi_wo_so', label: 'Related Sales Order' }),
              search.createColumn({ name: 'custrecord_esp_cfi_wo_customer', label: 'Customer' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_resource_group', label: 'Resource Group' }),
              search.createColumn({ name: 'custrecord_esp_cfi_wo_memo', label: 'Work Order Memo' }),
              search.createColumn({ name: 'created', label: 'Date Created' }),
              search.createColumn({ name: 'custrecord_esp_cfi_wo_est_hours', label: 'Estimated Hours' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_location', label: 'Location' }),
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
              text: result.getText('custrecord_esp_cfi_wo_type'),
              value: result.getValue('custrecord_esp_cfi_wo_type')
            },
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
            vendors: [],
            assets: [],
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
            esthours: result.getValue('custrecord_esp_cfi_wo_est_hours'),
            location: {
              text: result.getText('custrecord_esp_fop_wo_location'),
              value: result.getValue('custrecord_esp_fop_wo_location'),
            }
          });
          return true;
        });

        // log.audit('----- [Work Orders] -----', workOrders);
        return workOrders;
      }

      static fullMap(workOrders, events, vendors, assets, items, contacts, addresses) {
        const woIds = workOrders.map(wo => wo.id);
        if (woIds.length) {
          // Push Events to related WO
          for (const event of events) {
            const woRef = workOrders.find(wo => wo.id == event.workorder.value);
            if (woRef) {
              const _event = deepCopy(event);
              woRef.events.push(_event);
            }
          }
          // Push Vendors to related WO
          for (const vendor of vendors) {
            const woRef = workOrders.find(wo => wo.id == vendor.workorder.value);
            if (woRef) {
              const _vendor = deepCopy(vendor);
              woRef.vendors.push(_vendor);
            }
          }
          // Push Assets to related WO
          for (const asset of assets) {
            const woRef = workOrders.find(wo => wo.id == asset.workorder.value);
            if (woRef) {
              const _asset = deepCopy(asset);
              woRef.assets.push(_asset);
            }
          }
          // Push Items to related WO
          for (const item of items) {
            const woRef = workOrders.find(wo => wo.id == item.workorder.value);
            if (woRef) {
              const _item = deepCopy(item);
              woRef.items.push(_item);
              if (!woRef.hasQuantityReceived) {
                woRef.hasQuantityReceived = !!_item.quantityReceived;
              }
            }
          }
          // Push Contacts to related WO
          for (const contact of contacts) {
            const woRef = workOrders.find(wo => wo.id == contact.workorder.value);
            if (woRef) {
              const _contact = deepCopy(contact);
              woRef.contacts.push(_contact);
            }
          }
          // Push Addresses to related WO
          for (const address of addresses) {
            const woRef = workOrders.find(wo => wo.id == address.workorder.value);
            if (woRef) {
              const _address = deepCopy(address);
              woRef.addresses.push(_address);
            }
          }
        }
      }

      static getCustomers(workOrders) {
        return workOrders
          .map(wo => wo.customer)
          .filter(customer => !!(customer.value))
          .filter((x, i, arr) =>
            arr.findIndex(y => (y.value === x.value)) === i // Merge duplicates
          );
      }

      static getWorkOrderLocations(workOrders) {
        return workOrders
          .map(wo => wo.location)
          .filter(location => !!(location.value))
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
            type: env.RecordType.WORK_ORDER,
            id: woId,
            values: {
              custrecord_esp_fop_wo_status: env.Status.ON_HOLD
            }
          });
          responseJson.status = 'success';
          responseJson.message = 'Updated Successfully';
        } catch (e) {
          responseJson.status = 'failed';
          responseJson.message = `Unexpected Error: ${e.message}`;
        }

        log.audit('----- [Hold Work Order] -----', { woId, responseJson });

        response.write(JSON.stringify(responseJson));
      }

      static cancel(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;
        let responseJson = {};

        try {
          record.submitFields({
            type: env.RecordType.WORK_ORDER,
            id: woId,
            values: {
              custrecord_esp_fop_wo_status: env.Status.CLOSED
            }
          });
          responseJson.status = 'success';
          responseJson.message = 'Updated Successfully';
        } catch (e) {
          responseJson.status = 'failed';
          responseJson.message = `Unexpected Error: ${e.message}`;
        }

        log.audit('----- [Cancel Work Order] -----', { woId, responseJson });

        response.write(JSON.stringify(responseJson));
      }

      static print(context) {
        const { request, response } = context;
        const { parameters: params } = request;
        const woId = params.woId;

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
    }

    class WorkOrderResource {

      static getList(workOrders, events) {
        const woIds = workOrders.map(wo => wo.id);
        const eventIds = events.map(event => event.id);
        const filters = [
          ['isinactive', 'is', 'F']
        ];
        /* if (woIds.length) {
          filters.push('AND');
          filters.push(['custrecord_esp_fop_res_rel_wo', 'anyof', woIds]);
        } */

        /* if (eventIds.length) {
          filters.pu1sh('AND');
          filters.push(['custrecord_esp_fop_res_rel_wo_event', 'anyof', eventIds]);
        } */
        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER_RESOURCE,
          filters,
          columns:
            [
              search.createColumn({ name: 'custrecord_esp_fop_res_employee', label: 'Resource Employee' }),
              search.createColumn({
                name: 'formulatext',
                formula: 'SUBSTR(TO_CHAR({custrecord_esp_fop_res_employee.firstname}), 0, 1) || SUBSTR(TO_CHAR({custrecord_esp_fop_res_employee.lastname}), 0, 1)',
                label: 'Formula (Text)'
              }),
              search.createColumn({
                name: 'formulatext',
                formula: "{custrecord_esp_fop_res_employee.firstname} || ' ' || {custrecord_esp_fop_res_employee.lastname}",
                label: 'Formula (Text)'
              }),
              search.createColumn({ name: 'email', join: 'custrecord_esp_fop_res_employee', label: 'Email' }),
              search.createColumn({ name: 'phone', join: 'custrecord_esp_fop_res_employee', label: 'Phone' }),
              search.createColumn({ name: 'location', join: 'custrecord_esp_fop_res_employee', label: 'Location' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_rel_wo', label: 'Work Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_rel_wo_event', label: 'Work Order Event' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_rel_resource_grp', label: 'Resource Group' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_resource_type', label: 'Resource Type' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_resource_subtype', label: 'Resource Subtype' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_rate', label: 'Rate' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_vendor', label: 'Vendor' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_rel_po', label: 'Purchase Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_aff_type', label: 'Affiliation Type' }),
              search.createColumn({ name: 'custentity_esp_fop_is_employee_active', join: 'custrecord_esp_fop_res_employee', label: 'Active' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_start_time', label: 'Start Time' }),
              search.createColumn({ name: 'custrecord_esp_fop_res_end_time', label: 'End Time' }),
              search.createColumn({ name: 'location', join: 'custrecord_esp_fop_res_employee', label: 'Location' }),
              search.createColumn({ name: 'department', join: 'custrecord_esp_fop_res_employee', label: 'Department' }),
            ]
        });
        const resources = [];
        searchObj.run().each(result => {
          resources.push({
            id: result.id,
            name: result.getValue(result.columns[2]),
            initials: result.getValue(result.columns[1]),
            email: result.getValue({ name: 'email', join: 'custrecord_esp_fop_res_employee' }),
            phone: result.getValue({ name: 'phone', join: 'custrecord_esp_fop_res_employee' }),
            location: {
              text: result.getText({ name: 'location', join: 'custrecord_esp_fop_res_employee' }),
              value: result.getValue({ name: 'location', join: 'custrecord_esp_fop_res_employee' }),
            },
            active: result.getValue({ name: 'custentity_esp_fop_is_employee_active', join: 'custrecord_esp_fop_res_employee' }),
            workorder: {
              text: result.getText('custrecord_esp_fop_res_rel_wo'),
              value: result.getValue('custrecord_esp_fop_res_rel_wo')
            },
            events: Utils._stringToArray(result.getValue('custrecord_esp_fop_res_rel_wo_event')),
            employee: {
              text: result.getText('custrecord_esp_fop_res_employee'),
              value: result.getValue('custrecord_esp_fop_res_employee')
            },
            get resourceGroups() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custrecord_esp_fop_res_rel_resource_grp')),
                values: Utils._stringToArray(result.getValue('custrecord_esp_fop_res_rel_resource_grp')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            get types() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custrecord_esp_fop_res_resource_type')),
                values: Utils._stringToArray(result.getValue('custrecord_esp_fop_res_resource_type')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            get subTypes() {
              const obj = {
                texts: Utils._stringToArray(result.getText('custrecord_esp_fop_res_resource_subtype')),
                values: Utils._stringToArray(result.getValue('custrecord_esp_fop_res_resource_subtype')),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            rate: +result.getValue('custrecord_esp_fop_res_rate'),
            vendor: {
              text: result.getText('custrecord_esp_fop_res_vendor'),
              value: result.getValue('custrecord_esp_fop_res_vendor'),
            },
            purchaseOrder: {
              text: result.getText('custrecord_esp_fop_res_rel_po'),
              value: result.getValue('custrecord_esp_fop_res_rel_po'),
            },
            affiliationType: {
              text: result.getText('custrecord_esp_fop_res_aff_type'),
              value: result.getValue('custrecord_esp_fop_res_aff_type')
            },
            get time() {
              const startTime = result.getValue('custrecord_esp_fop_res_start_time');
              const endTime = result.getValue('custrecord_esp_fop_res_end_time');
              return {
                start: startTime && moment(`1/1/1999 ${startTime}`).format(env.Format.EXPORT_TIME),
                end: endTime && moment(`1/1/1999 ${endTime}`).format(env.Format.EXPORT_TIME)
              }
            },
            get resourceSkills() {
              const obj = {
                texts: Utils._stringToArray(result.getText({ name: 'custentity_esp_fop_emp_resource_skill', join: 'custrecord_esp_fop_res_employee' })),
                values: Utils._stringToArray(result.getValue({ name: 'custentity_esp_fop_emp_resource_skill', join: 'custrecord_esp_fop_res_employee' })),
              };
              return obj.texts.map((text, index) => ({
                text,
                value: obj.values[index]
              }));
            },
            location: {
              text: result.getText({ name: 'location', join: 'custrecord_esp_fop_res_employee' }),
              value: result.getValue({ name: 'location', join: 'custrecord_esp_fop_res_employee' }),
            },
            department: {
              text: result.getText({ name: 'department', join: 'custrecord_esp_fop_res_employee' }),
              value: result.getValue({ name: 'department', join: 'custrecord_esp_fop_res_employee' }),
            }
          });
          return true;
        });
        // log.audit('----- [Work Order Resources] -----', resources);
        return resources;
      }

      // Employee to Work Order Resource
      static _createResources(event, woRef, copyEventTime) {
        const resources = event?.selectedResources || [];
        for (const resource of resources) {
          try {
            const rec = record.create({
              type: env.RecordType.WORK_ORDER_RESOURCE,
              isDynamic: false
            });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_wo', value: woRef?.id || '' });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_wo_event', value: event.id });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_employee', value: resource.employee.value });

            if (resource.resourceGroups.length) {
              rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_resource_grp', value: resource.resourceGroups.map(resourceGroup => resourceGroup.value) });
            }
            if (resource.types.length) {
              rec.setValue({ fieldId: 'custrecord_esp_fop_res_resource_type', value: resource.types.map(type => type.value) });
            }
            if (resource.subTypes.length) {
              rec.setValue({ fieldId: 'custrecord_esp_fop_res_resource_subtype', value: resource.subTypes.map(subType => subType.value) });
            }
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_rate', value: resource.rate });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_vendor', value: resource.vendor.value });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_rel_po', value: resource.purchaseOrder.value });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_aff_type', value: resource.affiliationType.value });
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_start_time', value: Utils._toDateTimez(event.date.start, !copyEventTime ? resource.time.start : event.time.start) }); // If no resource start time, use event start time instead
            rec.setValue({ fieldId: 'custrecord_esp_fop_res_end_time', value: Utils._toDateTimez(event.date.start, !copyEventTime ? resource.time.end : event.time.end) }); // If no resource end time, use event end time instead
            const newId = rec.save({ ignoreMandatoryFieds: true });
            log.audit('----- [Created WO Resource Record] -----', newId);
          } catch (e) {
            log.error('Error on WO Resource > Create', { resource: resource.employee, errorMsg: e.message });
            resource.errorMsg = e.message;
          }
        }
      }

      // Update existing resources start/end time etc
      static _updateResources(event, dataSrc, woRef) {
        const selectedResources = event.selectedResources;
        const selectedResourceIds = selectedResources.map(resource => resource.id);
        const srcResources = dataSrc.resources.filter(resource => !!(resource.selected));
        const srcResourcesIds = srcResources.map(resource => resource.id);
        const removedResources = srcResources.filter(resource => !!!(selectedResourceIds.includes(resource.id)));
        const newResources = selectedResources.filter(resource => !!!(srcResourcesIds.includes(resource.id)));

        log.audit('Updating WO Resource Event List', { selectedResources, removedResources, newResources });

        // If theres to start/end time to update
        for (const resource of selectedResources) {
          try {
            const lookUp = search.lookupFields({
              type: env.RecordType.WORK_ORDER_RESOURCE,
              id: resource.id,
              columns: ['custrecord_esp_fop_res_start_time', 'custrecord_esp_fop_res_end_time']
            });
            const values = {};
            const startTime = moment(`1/1/1999 ${resource.time.start}`).format(env.Format.IMPORT_TIME);
            if (lookUp.custrecord_esp_fop_res_start_time != startTime) {
              values.custrecord_esp_fop_res_start_time = startTime;
            }
            const endTime = moment(`1/1/1999 ${resource.time.end}`).format(env.Format.IMPORT_TIME);
            if (lookUp.custrecord_esp_fop_res_end_time != endTime) {
              values.custrecord_esp_fop_res_end_time = endTime;
            }
            if (Object.keys(values).length) {
              record.submitFields({
                type: env.RecordType.WORK_ORDER_RESOURCE,
                id: resource.id,
                values,
                options: {
                  ignoreMandatoryFieds: true
                }
              });
              log.audit('----- [Updated WO Resource Record] -----', { resource });
            }
          } catch (e) {
            log.error('Error on WO Resource > Update', { resource, errorMsg: e.message });
          }
        }
        // If theres to remove
        Utils._deleteRecords(env.RecordType.WORK_ORDER_RESOURCE, removedResources.map(resource => resource.id));

        // If theres to create
        const clonedEventObj = deepCopy(event);
        clonedEventObj.selectedResources = newResources;
        this._createResources(clonedEventObj, woRef);
      }
    }

    class WorkOrderVendor {

      static getList(workOrders, events) {
        const woIds = workOrders.map(wo => wo.id);
        const eventIds = events.map(event => event.id);
        const filters = [
          ['isinactive', 'is', 'F']
        ];
        // To include general events
        /* if (woIds.length) {
          filters.push('AND');
          filters.push(['custrecord_esp_fop_wo_sub_rel_wo', 'anyof', woIds]);
        
        }
        if (eventIds.length) {
          filters.push('AND');
          filters.push(['custrecord_esp_fop_wo_sub_event', 'anyof', eventIds]);
        } */
        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER_VENDOR,
          filters,
          columns:
            [
              search.createColumn({ name: 'name', label: 'Name' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_vendor', label: 'Vendor' }),
              search.createColumn({ name: 'url', join: 'custrecord_esp_fop_wo_sub_vendor', label: 'Web Address' }),
              search.createColumn({ name: 'email', join: 'custrecord_esp_fop_wo_sub_vendor', label: 'Email' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_rel_wo', label: 'Work Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_qty_rqd', label: 'Quantity Required' }),
              search.createColumn({
                name: 'custentity_esp_fop_ven_avail_resources',
                join: 'CUSTRECORD_ESP_FOP_WO_SUB_VENDOR',
                label: 'Available Resources'
              }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_event', label: 'Event' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_po', label: 'Purchase Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_amount', label: 'Amount' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_sub_comment', label: 'Comments' })
            ]
        });

        const vendors = [];
        searchObj.run().each(result => {
          vendors.push({
            id: result.id,
            name: result.getValue('name'),
            vendor: {
              text: result.getText('custrecord_esp_fop_wo_sub_vendor'),
              value: result.getValue('custrecord_esp_fop_wo_sub_vendor')
            },
            url: result.getValue(result.columns[2]),
            email: result.getValue(result.columns[3]),
            get initials() {
              let split = this.vendor.text.split(' ').map(name => name.replace(/[^a-zA-Z]/g, ''));
              split = split.filter(Boolean);
              if (split.length > 1) {
                return `${split[0][0]}${split[1][0] || ''}`;
              } else if (split.length == 1) {
                return split[0][0];
              } else {
                return this.vendor.text;
              }
            },
            workorder: {
              text: result.getText('custrecord_esp_fop_wo_sub_rel_wo'),
              value: result.getValue('custrecord_esp_fop_wo_sub_rel_wo')
            },
            event: result.getValue('custrecord_esp_fop_wo_sub_event'),
            quantityRequired: +result.getValue('custrecord_esp_fop_wo_sub_qty_rqd'),
            quantityAvailable: +result.getValue(result.columns[6]),
            purchaseOrder: {
              text: result.getText('custrecord_esp_fop_wo_sub_po'),
              value: result.getValue('custrecord_esp_fop_wo_sub_po')
            },
            amount: +result.getValue('custrecord_esp_fop_wo_sub_amount'),
            active: !!result.getValue(result.columns[6]),
            woVendor: true,
            memo: result.getValue('custrecord_esp_fop_wo_sub_comment') || ''
          });
          return true;
        });
        // log.audit('----- [Work Order Vendors] -----', vendors);
        return vendors;
      }

      static _createVendors(event, woRef) {
        const vendors = event?.selectedVendors || [];
        for (const vendor of vendors) {
          try {
            const rec = record.create({
              type: env.RecordType.WORK_ORDER_VENDOR,
              isDynamic: true
            });
            rec.setValue({ fieldId: 'name', value: vendor.name });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_vendor', value: vendor.id });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_rel_wo', value: woRef?.id || '' });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_event', value: event.id });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_qty_rqd', value: vendor.quantityRequired });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_sub_comment', value: vendor.memo });
            const newId = rec.save({ ignoreMandatoryFieds: true });
            log.audit('----- [Created WO Vendor Record] -----', newId);
          } catch (e) {
            log.error('Error on WO Vendor > Create', { vendor, errorMsg: e.message });
            vendor.errorMsg = e.message;
          }
        }
      }

      static _updateVendors(event, dataSrc, woRef) {
        const selectedVendors = event.selectedVendors;
        const selectedVendorIds = selectedVendors.map(vendor => vendor.id);
        const srcVendors = dataSrc.vendors.filter(vendor => !!(vendor.selected));
        const srcVendorIds = srcVendors.map(vendor => vendor.id);
        const removedVendors = srcVendors.filter(vendor => !!!(selectedVendorIds.includes(vendor.id)));
        const newVendors = selectedVendors.filter(vendor => !!!(srcVendorIds.includes(vendor.id)));

        log.audit('Updating WO Vendor Event List', { selectedVendors, removedVendors, newVendors });

        // If theres to quantity update
        for (const vendor of selectedVendors) {
          try {
            const lookUp = search.lookupFields({
              type: env.RecordType.WORK_ORDER_VENDOR,
              id: vendor.id,
              columns: ['custrecord_esp_fop_wo_sub_qty_rqd', 'custrecord_esp_fop_wo_sub_comment']
            });
            const values = {};
            if (lookUp.custrecord_esp_fop_wo_sub_qty_rqd != vendor.quantityRequired) {
              values.custrecord_esp_fop_wo_sub_qty_rqd = vendor.quantityRequired
            }
            if (lookUp.custrecord_esp_fop_wo_sub_comment != vendor.memo) {
              values.custrecord_esp_fop_wo_sub_comment = vendor.memo
            }

            if (Object.keys(values).length) {
              record.submitFields({
                type: env.RecordType.WORK_ORDER_VENDOR,
                id: vendor.id,
                values,
                options: {
                  ignoreMandatoryFieds: true
                }
              });
              log.audit('----- [Updated WO Vendor Record] -----', { vendor });
            }
          } catch (e) {
            log.error('Error on WO Vendor > Update', { vendor, errorMsg: e.message });
          }
        }
        // If theres to remove
        Utils._deleteRecords(env.RecordType.WORK_ORDER_VENDOR, removedVendors.map(vendor => vendor.id));

        // If theres to create
        const clonedEventObj = deepCopy(event);
        clonedEventObj.selectedVendors = newVendors;
        this._createVendors(clonedEventObj, woRef);
      }
    }

    class WorkOrderAsset {

      static getList(workOrders, events) {
        const woIds = workOrders.map(wo => wo.id);
        const eventIds = events.map(event => event.id);
        const filters = [
          ['isinactive', 'is', 'F']
        ];
        // To include general events
        /* if (woIds.length) {
          filters.push('AND');
          filters.push(['custrecord_esp_fop_ast_rel_wo', 'anyof', woIds]);
        
        }
        if (eventIds.length) {
          filters.push('AND');
          filters.push(['custrecord_esp_fop_ast_wo_event', 'anyof', eventIds]);
        } */
        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER_ASSET,
          filters,
          columns:
            [
              search.createColumn({ name: 'custrecord_esp_fop_ast_rel_wo', label: 'Work Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_wo_event', label: 'Work Order Event' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_quantity', label: 'Quantity' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_item_desc', label: 'Item Description' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_equipment', label: 'Equipment' }),
              search.createColumn({ name: 'custrecordesp_fop_ast_rental_unit', label: 'Rental Unit' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_rental_duration', label: 'Rental Duration' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_rental_rate', label: 'Rental Rate' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_rental_amount', label: 'Rental Amount' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_related_po', label: 'Related Purchase Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_primary_vendor', label: 'Vendor' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_equip_type', label: 'Equipment Type' }),
              search.createColumn({ name: 'custrecord_esp_fop_ast_is_owned', label: 'Is Owned' }),
            ]
        });
        const assets = [];
        searchObj.run().each(result => {
          assets.push({
            id: result.id,
            name: result.getText('custrecord_esp_fop_ast_equipment'),
            workorder: {
              text: result.getText('custrecord_esp_fop_ast_rel_wo'),
              value: result.getValue('custrecord_esp_fop_ast_rel_wo')
            },
            event: result.getValue('custrecord_esp_fop_ast_wo_event'),
            quantity: +result.getValue('custrecord_esp_fop_ast_quantity'),
            description: result.getValue('custrecord_esp_fop_ast_item_desc'),
            item: {
              text: result.getText('custrecord_esp_fop_ast_equipment'),
              value: result.getValue('custrecord_esp_fop_ast_equipment'),
            },
            equipmentType: {
              text: result.getText('custrecord_esp_fop_ast_equip_type'),
              value: result.getValue('custrecord_esp_fop_ast_equip_type'),
            },
            rentalUnit: {
              text: result.getText('custrecordesp_fop_ast_rental_unit'),
              value: result.getValue('custrecordesp_fop_ast_rental_unit'),
            },
            rentalDuration: +result.getValue('custrecord_esp_fop_ast_rental_duration'),
            rentalRate: +result.getValue('custrecord_esp_fop_ast_rental_rate'),
            rentalAmount: +result.getValue('custrecord_esp_fop_ast_rental_amount'),
            purchaseOrder: {
              text: result.getText('custrecord_esp_fop_ast_related_po'),
              value: result.getText('custrecord_esp_fop_ast_related_po'),
            },
            vendor: {
              text: result.getText('custrecord_esp_fop_ast_primary_vendor'),
              value: result.getValue('custrecord_esp_fop_ast_primary_vendor'),
            },
            owned: result.getValue('custrecord_esp_fop_ast_is_owned'),
            rentalMatrix: +result.getValue('custrecord_esp_fop_ast_rental_mtrx')
          });
          return true;
        });

        // log.audit('----- [Work Order Assets] -----', assets);
        return assets;
      }

      static _createAssets(event, woRef) {
        const assets = event?.selectedAssets || [];
        for (const asset of assets) {
          try {
            const rec = record.create({
              type: env.RecordType.WORK_ORDER_ASSET,
              isDynamic: true
            });
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_equipment', value: asset.id });
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_wo_event', value: event.id });
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_quantity', value: asset.quantity });
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rental_duration', value: asset.rentalDuration });
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rental_rate', value: asset.rentalRate });
            // rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rental_amount', value: asset. }); // TBD
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_is_owned', value: !!asset.owned });
            rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rental_mtrx', value: asset.rentalMatrix });
            if (woRef?.id) {
              rec.setValue({ fieldId: 'custrecord_esp_fop_ast_rel_wo', value: woRef?.id });
            }
            if (asset?.rentalUnit?.value) {
              rec.setValue({ fieldId: 'custrecordesp_fop_ast_rental_unit', value: asset?.rentalUnit?.value });
            }
            if (asset?.vendor?.value) {
              rec.setValue({ fieldId: 'custrecord_esp_fop_ast_primary_vendor', value: asset?.vendor?.value });
            }
            if (asset?.equipmentType?.value) {
              rec.setValue({ fieldId: 'custrecord_esp_fop_ast_equip_type', value: asset?.equipmentType?.value });
            }
            const newId = rec.save({ ignoreMandatoryFieds: true });
            log.audit('----- [Created WO Asset Record] -----', newId);
          } catch (e) {
            log.error('Error on WO asset > Create', { asset, errorMsg: e.message });
            asset.errorMsg = e.message;
          }
        }
      }

      static _updateAssets(event, dataSrc, woRef) {
        const selectedAssets = event.selectedAssets;
        const selectedassetIds = selectedAssets.map(asset => asset.id);
        const srcassets = dataSrc.assets.filter(asset => !!(asset.selected));
        const srcassetIds = srcassets.map(asset => asset.id);
        const removedAssets = srcassets.filter(asset => !!!(selectedassetIds.includes(asset.id)));
        const newAssets = selectedAssets.filter(asset => !!!(srcassetIds.includes(asset.id)));

        log.audit('Updating WO asset Event List', { selectedAssets, removedAssets, newAssets });

        // If theres to quantity update
        for (const asset of selectedAssets) {
          try {
            const lookUp = search.lookupFields({
              type: env.RecordType.WORK_ORDER_ASSET,
              id: asset.id,
              columns: 'custrecord_esp_fop_ast_quantity'
            });
            if (lookUp.custrecord_esp_fop_ast_quantity != asset.quantity) {
              record.submitFields({
                type: env.RecordType.WORK_ORDER_ASSET,
                id: asset.id,
                values: {
                  custrecord_esp_fop_ast_quantity: asset.quantity
                },
                options: {
                  ignoreMandatoryFieds: true
                }
              });
              log.audit('----- [Updated WO Asset Record] -----', { asset });
            }
          } catch (e) {
            log.error('Error on WO asset > Update', { asset, errorMsg: e.message });
          }
        }
        // If theres to remove
        Utils._deleteRecords(env.RecordType.WORK_ORDER_ASSET, removedAssets.map(asset => asset.id));

        // If theres to create
        const clonedEventObj = deepCopy(event);
        clonedEventObj.selectedAssets = newAssets;
        this._createAssets(clonedEventObj, woRef);
      }
    }

    class WorkOrderItem {

      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);
        if (!woIds.length) return [];

        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER_ITEM,
          filters:
            [
              ['isinactive', 'is', 'F'],
              'AND',
              ['custrecord_esp_fop_wo_item_rel_wo', 'anyof', woIds]
            ],
          columns:
            [
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_rel_wo', label: 'Work Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_so', label: 'Sales Order' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_event', label: 'Work Order Event' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_name', label: 'Item' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_description', label: 'Description' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_quantity', label: 'Quantity' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_memo', label: 'Memo' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_line_id', label: 'Line ID' }),
              search.createColumn({ name: 'custrecord_esp_fop_wo_item_uuid', label: 'UUID' }),
              search.createColumn({ name: 'custrecord_esp_fop_total_ir', label: 'Received Quantity' }),
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
            salesorder: {
              text: result.getText('custrecord_esp_fop_wo_item_so'),
              value: result.getValue('custrecord_esp_fop_wo_item_so')
            },
            event: result.getValue('custrecord_esp_fop_wo_item_event'),
            uuid: result.getValue('custrecord_esp_fop_wo_item_uuid'),
            line: result.getValue('custrecord_esp_fop_wo_item_line_id'),
            item: {
              text: result.getText('custrecord_esp_fop_wo_item_name'),
              value: result.getValue('custrecord_esp_fop_wo_item_name')
            },
            description: result.getValue('custrecord_esp_fop_wo_item_description'),
            quantity: +result.getValue('custrecord_esp_fop_wo_item_quantity'),
            availableQty: +result.getValue('custrecord_esp_fop_wo_item_quantity'),
            note: result.getValue('custrecord_esp_fop_wo_item_memo'),
            quantityReceived: +result.getValue('custrecord_esp_fop_total_ir')
          });
          return true;
        });

        // log.audit('----- [Work Order Items] -----', items);
        return items;
      }

      static _createItems(event) {
        const items = event?.selectedItems || [];
        for (const item of items) {
          try {
            const rec = record.copy({
              type: env.RecordType.WORK_ORDER_ITEM,
              id: item.id,
              isDynamic: true
            });
            rec.setValue({ fieldId: 'name', value: item.item.text });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_event', value: event.id });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_item_quantity', value: item.quantity });
            item.id = rec.save({ ignoreMandatoryFieds: true });
            log.audit('----- [Created WO Item Record] -----', item.id);
          } catch (e) {
            log.error('Error on WO Item > Create', { item: item.item, errorMsg: e.message });
            item.errorMsg = e.message;
          }
        }
      }

      static _updateItems(event, dataSrc) {
        const selectedItems = event.selectedItems;
        const selectedItemIds = selectedItems.map(item => item.id);
        const srcItems = dataSrc.items.filter(item => !!(item.selected));
        const srcItemIds = srcItems.map(item => item.id);
        const removedItems = srcItems.filter(item => !!!(selectedItemIds.includes(item.id)));
        const newItems = selectedItems.filter(item => !!!(srcItemIds.includes(item.id)));

        log.audit('Updating WO Item Event List', { selectedItems, removedItems, newItems });

        // If theres to quantity update
        for (const item of selectedItems) {
          try {
            const lookUp = search.lookupFields({
              type: env.RecordType.WORK_ORDER_ITEM,
              id: item.id,
              columns: 'custrecord_esp_fop_wo_item_quantity'
            });
            if (lookUp.custrecord_esp_fop_wo_item_quantity != item.quantity) {
              record.submitFields({
                type: env.RecordType.WORK_ORDER_ITEM,
                id: item.id,
                values: {
                  custrecord_esp_fop_wo_item_quantity: item.quantity
                },
                options: {
                  ignoreMandatoryFieds: true
                }
              });
              log.error('----- [Updated WO Item Record] -----', { item });
            }
          } catch (e) {
            log.error('Error on WO Item > Update', { item, errorMsg: e.message });
          }
        }

        // If theres to remove
        Utils._deleteRecords(env.RecordType.WORK_ORDER_ITEM, removedItems.map(item => item.id));

        // If theres to create
        const clonedEventObj = deepCopy(event);
        clonedEventObj.selectedItems = newItems;
        this._createItems(clonedEventObj);
      }
    }

    class WorkOrderContact {

      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);
        if (!woIds.length) return [];

        const contacts = [];
        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER_CONTACT,
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
            events: Utils._stringToArray(result.getValue('custrecord_esp_fop_wo_rel_event')), // TBD change to just list field
            get event() {
              return this.events[0] || '';
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
            primary: !!((result.getText('custrecord_esp_fop_wo_contact_role') || '').match(/primary contact/gi)),
            get url() {
              return Url.contact(this.contact.value)
            }
          });
          return true;
        });
        // log.audit('----- [Work Order Contacts] -----', contacts.filter(contact => contact.workorder.value == 1));
        return contacts;
      }

      static _createContacts(event) {
        const contacts = event?.selectedContacts || [];
        for (const contact of contacts) {
          try {
            const rec = record.copy({
              type: env.RecordType.WORK_ORDER_CONTACT,
              id: contact.id,
              isDynamic: true
            });
            rec.setValue({ fieldId: 'custrecord_esp_fop_wo_rel_event', value: event.id });
            contact.id = rec.save({ ignoreMandatoryFieds: true });
            log.audit('----- [Created WO Contact Record] -----', contact.id);
          } catch (e) {
            log.error('Error on WO Contact > Create', { id: contact.id, errorMsg: e.message });
            contact.errorMsg = e.message;
          }
        }
      }

      static _updateContacts(event, dataSrc) {
        const selectedContacts = event.selectedContacts;
        const selectedContactIds = selectedContacts.map(contact => contact.id);
        const srcContacts = dataSrc.contacts.filter(contact => !!(contact.selected));
        const srcContactIds = srcContacts.map(contact => contact.id);
        const removedContacts = srcContacts.filter(contact => !!!(selectedContactIds.includes(contact.id)));
        const newContacts = selectedContacts.filter(contact => !!!(srcContactIds.includes(contact.id)));

        log.audit('Updating WO Contact Event List', { selectedContacts, removedContacts, newContacts });

        // If theres to remove
        Utils._deleteRecords(env.RecordType.WORK_ORDER_CONTACT, removedContacts.map(contact => contact.id));

        // If theres to create
        const clonedEventObj = deepCopy(event);
        clonedEventObj.selectedContacts = newContacts;
        this._createContacts(clonedEventObj);
      }
    }

    class WorkOrderAddress {

      static getList(workOrders) {
        const woIds = workOrders.map(wo => wo.id);
        if (!woIds.length) return [];

        const addresses = [];
        const searchObj = search.create({
          type: env.RecordType.WORK_ORDER_ADDRESS,
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
        // log.audit('----- [Work Order Addresses] -----', addresses);
        return addresses;
      }

      static _appendEventToAddresses(event) {
        const addresses = event?.addresses || [];
        for (const address of addresses) {
          try {
            const lookUp = search.lookupFields({
              type: env.RecordType.WORK_ORDER_ADDRESS,
              id: address.id,
              columns: 'custrecord_esp_fop_wo_add_event'
            });
            let events = (lookUp.custrecord_esp_fop_wo_add_event[0]?.value || '').split(',');
            events.push(event.id);
            events = events.filter(Boolean);
            record.submitFields({
              type: env.RecordType.WORK_ORDER_ADDRESS,
              id: address.id,
              values: {
                custrecord_esp_fop_wo_add_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            });
            log.audit('----- [Added Event to WO Address Record] -----', address);
          } catch (e) {
            log.error('Error on WO Address > Add Events', { address: address.address.text, errorMsg: e.message });
            address.errorMsg = e.message;
          }
        }
      }

      static _removeEventFromAddresses(addresses, eventId) {
        for (const address of addresses) {
          try {
            const lookUp = search.lookupFields({
              type: env.RecordType.WORK_ORDER_ADDRESS,
              id: address.id,
              columns: 'custrecord_esp_fop_wo_add_event'
            });
            const idToRemove = eventId;
            let events = (lookUp.custrecord_esp_fop_wo_add_event[0]?.value || '').split(',');
            const index = events.indexOf(idToRemove);

            if (index > -1) {
              events.splice(index, 1);
            }

            record.submitFields({
              type: env.RecordType.WORK_ORDER_ADDRESS,
              id: address.id,
              values: {
                custrecord_esp_fop_wo_add_event: events
              },
              options: {
                ignoreMandatoryFieds: true
              }
            });
            log.audit('----- [Removed Event from WO Address Record] -----', address);
          } catch (e) {
            log.error('Error on WO Address > Remove Event', { address, errorMsg: e.message });
            address.errorMsg = e.message;
          }
        }
      }
    }

    class Event {

      // Includes standalone/general events
      static getList() {
        const filters = [
          // ['organizer', 'anyof', '@CURRENT@']
          ['response', 'is', 'ACCEPTED'], // To prevent duplicate results
          'AND',
          ['status', 'noneof', ['CANCELLED'/* , 'COMPLETE' */]]
        ];
        const events = [];
        const searchObj = search.create({
          type: record.Type.CALENDAR_EVENT,
          filters,
          columns:
            [
              search.createColumn({ name: 'internalid', label: 'Internal ID', sort: search.Sort.DESC }),
              search.createColumn({ name: 'title', label: 'Event' }),
              // search.createColumn({ name: 'custevent_cfi_fsl_project', label: 'Project'}),
              search.createColumn({ name: 'location', label: 'Location' }),
              search.createColumn({ name: 'response', label: 'Response' }),
              search.createColumn({ name: 'status', label: 'Status' }),
              search.createColumn({ name: 'startdate', label: 'Start Date' }),
              search.createColumn({ name: 'starttime', label: 'Start Time' }),
              search.createColumn({ name: 'endtime', label: 'End Time' }),
              search.createColumn({ name: 'owner', label: 'Organiser' }),
              search.createColumn({ name: 'organizer', label: 'Organizer' }),
              search.createColumn({ name: 'markdone', label: 'Mark' }),
              search.createColumn({ name: 'custevent_esp_fop_work_order', label: 'Work Order' }),
              search.createColumn({ name: 'custevent_esp_fop_event_priority', label: 'Priority' }),
              search.createColumn({ name: 'custevent_esp_fop_memo', label: 'Memo' }),
              search.createColumn({ name: 'recurrence', label: 'Recurrency' }), // Extract endbydate field. Ex. output "occurs every day from 9/10/2024 until 9/12/2024"
              // search.createColumn({ name: 'alldayevent', label: 'All Day'}) // Invalid search column
              search.createColumn({ name: 'custevent_esp_fop_event_contact', label: 'Selected Contact' }),
              search.createColumn({ name: 'custevent_esp_fop_event_address', label: 'Selected Address' }),
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
            location: result.getValue('location'),
            status: {
              text: result.getText('status'),
              get value() {
                let val = result.getValue('status');
                if (val === 'COMPLETE') {
                  val = 'COMPLETED';
                }
                return val;
              },
              get code() {
                switch (this.value) {
                  case 'TENTATIVE':
                    return env.EventCode.TENTATIVE;
                  case 'CONFIRMED':
                    return env.EventCode.CONFIRMED;
                  case 'COMPLETED':
                    return env.EventCode.COMPLETED;
                }
              }
            },
            date: {
              recurrence: result.getValue('recurrence') || '',
              get dates() {
                const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/g;
                return this.recurrence.match(dateRegex);
              },
              // start: moment(result.getValue('startdate')).format(env.Format.EXPORT_DATE), // Returns the main body field date
              get start() {
                if (this.dates.length) {
                  return moment(this.dates[0]).format(env.Format.EXPORT_DATE);
                } else {
                  return ''
                }
              },
              get end() {
                if (this.dates.length) {
                  return moment(this.dates[this.dates.length - 1]).format(env.Format.EXPORT_DATE);
                } else {
                  return this.start; // TBR
                }
              }
            },
            time: {
              start: moment(`1/1/1999 ${result.getValue('starttime')}`).format(env.Format.EXPORT_TIME),
              end: moment(`1/1/1999 ${result.getValue('endtime')}`).format(env.Format.EXPORT_TIME)
            },
            priority: {
              text: result.getText('custevent_esp_fop_event_priority'),
              value: result.getValue('custevent_esp_fop_event_priority'),
              get code() {
                switch (this.value) {
                  case '1':
                    return env.PriorityCode.LOW;
                  case '2':
                    return env.PriorityCode.MEDIUM;
                  case '3':
                    return env.PriorityCode.HIGH;
                  case '4':
                    return env.PriorityCode.URGENT;
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
            vendors: [],
            assets: [],
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
            },
            organizer: {
              text: result.getText('organizer'),
              value: result.getValue('organizer')
            }
          });
          return true;
        });
        //  log.audit('----- [Work Order Events] -----', events);
        return events;
      }

      static getOrganizers(events) {
        let organizers = events.map(event => event.organizer);
        organizers = organizers.filter((item, index, self) => index === self.findIndex(t => t.text === item.text && t.value === item.value));
        return organizers;
      }

      static fullMap(workOrders, events, resources, vendors, assets, items, contacts, addresses) {
        // Map WO dataset per Event
        for (const event of events) {
          const woRef = workOrders.find(wo => wo.id == event.workorder.value);
          if (woRef) {
            const _woRef = deepCopy(woRef)
            event.woRef = _woRef;
          }
        }
        // Push assigned resources to related Events.
        for (const resource of resources) {
          for (const event of events) {
            if (resource.events.includes(event.id)) {
              const _resource = deepCopy(resource);
              _resource.selected = true;
              event.resources.push(_resource)
            }
          }
        }
        // Push WO vendors to related Events
        for (const vendor of vendors) {
          for (const event of events) {
            if (vendor.event == event.id) {
              const _vendor = deepCopy(vendor);
              _vendor.selected = true;
              event.vendors.push(_vendor);
            }
          }
        }
        // Push Assets to related WO
        for (const asset of assets) {
          for (const event of events) {
            if (asset.event == event.id) {
              const _asset = deepCopy(asset);
              _asset.selected = true;
              event.assets.push(_asset);
            }
          }
        }
        // Push WO vendors to related Events
        for (const item of items) {
          for (const event of events) {
            if (item.event == event.id) {
              const _item = deepCopy(item);
              _item.selected = true;
              event.items.push(_item);
              if (!event.hasQuantityReceived) {
                event.hasQuantityReceived = !!_item.quantityReceived;
              }
            }
          }
        }
        // Push WO contacts to related Events
        for (const contact of contacts) {
          for (const event of events) {
            if (contact.event == event.id) {
              const _contact = deepCopy(contact);
              _contact.selected = true;
              event.contacts.push(_contact);
            }
          }
        }
        // Push WO addresses to related Events
        for (const address of addresses) {
          for (const event of events) {
            if (address.events.includes(event.id)) {
              const _address = deepCopy(address);
              _address.selected = true;
              event.addresses.push(_address);
            }
          }
        }

        // const logEvent = events.find(event => event.id == 516);
        // Utils.createLogFile(`logEventID516`, JSON.stringify(logEvent), -15);
      }

      static createEventRecord(context) {
        const { request, response } = context;
        const user = runtime.getCurrentUser();
        let reqBody = request.body || '{}';
        const payload = JSON.parse(reqBody);

        log.audit('----- [Create Work Order Event] -----', { payload });

        const { eventData, woRef, woResources } = payload;

        try {
          eventData.date.start = moment(eventData.date.start).format(env.Format.IMPORT_DATE);
          eventData.date.end = moment(eventData.date.end).format(env.Format.IMPORT_DATE);
          eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(env.Format.IMPORT_TIME);
          eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(env.Format.IMPORT_TIME);

          const fieldToSet = {};
          fieldToSet.title = eventData.title;
          fieldToSet.custevent_esp_fop_work_order = woRef?.id || '';
          fieldToSet.organizer = user.id;
          fieldToSet.status = eventData.status;
          fieldToSet.accesslevel = 'PUBLIC';
          fieldToSet.startdate = new Date(eventData.date.start);
          fieldToSet.starttime = Utils._toDateTimez(eventData.date.start, eventData.time.start);
          fieldToSet.endtime = Utils._toDateTimez(eventData.date.start, eventData.time.end);
          fieldToSet.custevent_esp_fop_event_priority = eventData.priority;
          fieldToSet.custevent_esp_fop_memo = eventData.note;
          fieldToSet.custevent_esp_fop_event_address = eventData.selectedAddress.id;

          const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;

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

          for (const key in fieldToSet) {
            rec.setValue({
              fieldId: key,
              value: fieldToSet[key]
            });
          }

          eventData.id = rec.save({ ignoreMandatoryFieds: true });
          log.audit('----- [Created Event Record] -----', { recordId: eventData.id });

          WorkOrderResource._createResources(eventData, woRef);
          WorkOrderVendor._createVendors(eventData, woRef);
          WorkOrderAsset._createAssets(eventData, woRef);
          WorkOrderItem._createItems(eventData);
          WorkOrderContact._createContacts(eventData);
          WorkOrderAddress._appendEventToAddresses(eventData);

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
        const { eventDataSrc, eventData, woRef, woResources, draggedResource } = payload;
        const eventDataProps = Object.keys(eventData);

        log.audit('----- [Update Work Order Event] -----', { eventDataProps, payload });
        // Utils.createLogFile(`updateEventRecord()`, JSON.stringify(payload), 2199);

        try {
          // Drag single resource scenario
          if (!!draggedResource) {
            switch (draggedResource) {
              case 'employee':
                WorkOrderResource._createResources(eventData, woRef, true);
                break;
              case 'vendor':
                WorkOrderVendor._createVendors(eventData, woRef);
              case 'asset':
                WorkOrderAsset._createAssets(eventData, woRef);
                break;
            }
          } else {
            eventData.date.start = moment(eventData.date.start).format(env.Format.IMPORT_DATE);
            eventData.date.end = moment(eventData.date.end).format(env.Format.IMPORT_DATE);
            eventData.time.start = moment(`1/1/1999 ${eventData.time.start}`).format(env.Format.IMPORT_TIME);
            eventData.time.end = moment(`1/1/1999 ${eventData.time.end}`).format(env.Format.IMPORT_TIME);

            const rec = record.load({
              type: record.Type.CALENDAR_EVENT,
              id: eventData.id
            });
            const _rec = {
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

            // log.audit('Field To Set > title field', { current: _rec.title, new : eventData.title, toSet: (_rec.title != eventData.title) });
            if (_rec.title != eventData.title) {
              fieldToSet.title = eventData.title;
            }
            // log.audit('Field To Set > datestart field', { current: _rec.date.start, new : eventData.date.start, toSet: (_rec.date.start != eventData.date.start) });
            if (_rec.date.start != eventData.date.start) {
              fieldToSet.startdate = new Date(eventData.date.start);
            }
            // log.audit('Field To Set > endbydate field', { current: _rec.date.end, new : eventData.date.end, toSet: (_rec.date.end != eventData.date.end) });
            if (_rec.date.end != eventData.date.end) {
              const numberOfDays = moment(eventData.date.end).diff(moment(eventData.date.start), 'days') + 1;
              if (numberOfDays > 1) {
                fieldToSet.frequency = 'DAY';
                fieldToSet.period = '1';
              }
              fieldToSet.endbydate = new Date(eventData.date.end);
            }
            // log.audit('Field To Set > starttime field', { current: _rec.time.start, new : eventData.time.start, toSet: (_rec.time.start != eventData.time.start) });
            if (_rec.time.start != eventData.time.start) {
              fieldToSet.starttime = Utils._toDateTimez(eventData.date.start, eventData.time.start);
            }
            // log.audit('Field To Set > endtime field', { current: _rec.time.end, new : eventData.time.end, toSet: (_rec.time.end != eventData.time.end) });
            if (_rec.time.end != eventData.time.end) {
              fieldToSet.endtime = Utils._toDateTimez(eventData.date.end, eventData.time.end);
            }
            // log.audit('Field To Set > note field', { current: _rec.note, new : eventData.note, toSet: (_rec.note != eventData.note) });
            if (_rec.note != eventData.note) {
              fieldToSet.custevent_esp_fop_memo = eventData.note;
            }
            if (eventData.priority) {
              // log.audit('Field To Set > priority field', { current: _rec.priority, new : eventData.priority, toSet: (_rec.priority != eventData.priority) });
              if (_rec.priority != eventData.priority) {
                fieldToSet.custevent_esp_fop_event_priority = eventData.priority;
              }
            }
            if (eventData.status) {
              // log.audit('Field To Set > status field', { current: _rec.status, new : eventData.status, toSet: (_rec.status != eventData.status) });
              if (_rec.status != eventData.status) {
                fieldToSet.status = eventData.status;
              }
            }
            if (eventData.selectedAddress) {
              // log.audit('Field To Set > selected address field', { current: _rec.address.id, new : eventData.selectedAddress.id, toSet: (eventData.selectedAddress.id != _rec.address.id) });
              if (eventData.selectedAddress.id != _rec.address.id) {
                fieldToSet.custevent_esp_fop_event_address = eventData.selectedAddress.id;
              }
            }
            log.audit('Fields to update', { _rec, fieldToSet });

            if (Object.keys(fieldToSet).length) {
              for (const key in fieldToSet) {
                rec.setValue({
                  fieldId: key,
                  value: fieldToSet[key]
                });
                log.debug('Setting field ' + key, fieldToSet[key]);
              }
              rec.save({ ignoreMandatoryFieds: true });
              log.audit('----- [Updated Event Record] -----', { recordId: eventData.id });
            } else {
              log.audit('----- [Update Event Record not needed!] -----', { recordId: eventData.id });
            }

            if (eventData.selectedResources) {
              WorkOrderResource._updateResources(eventData, eventDataSrc, woRef);
            }
            if (eventData.selectedVendors) {
              WorkOrderVendor._updateVendors(eventData, eventDataSrc, woRef);
            }
            if (eventData.selectedAssets) {
              WorkOrderAsset._updateAssets(eventData, eventDataSrc, woRef);
            }
            if (eventData.selectedItems) {
              WorkOrderItem._updateItems(eventData, eventDataSrc);
            }
            if (eventData.selectedContacts) {
              WorkOrderContact._updateContacts(eventData, eventDataSrc);
            }
          }

          response.write(JSON.stringify({
            code: 200,
            status: 'success'
          }));
        } catch (e) {
          log.error('updateEventRecord() Unexpected Error', e.message);

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
            type: env.RecordType.WORK_ORDER,
            id: woId,
            columns: 'custrecord_esp_cfi_wo_so'
          });
          let soId;
          if (woLookUp.custrecord_esp_cfi_wo_so && woLookUp.custrecord_esp_cfi_wo_so.length) {
            soId = woLookUp.custrecord_esp_cfi_wo_so[0].value;

            if (soId) {
              const searchObj = search.create({
                type: env.RecordType.PUNCH,
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
                    search.createColumn({ name: 'created', label: 'Date Created' })
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
        log.audit('----- [Punch List] -----', punchList);
        return response.write(JSON.stringify(punchList));
      }

      static completeEvent(context) {
        const { request, response } = context;
        let reqBody = request.body || '{}';
        const payload = JSON.parse(reqBody);
        let { eventDataSrc, timeSheets, fulfillItems } = payload;
        const eventId = eventDataSrc.id;
        const soId = eventDataSrc.woRef?.salesorder?.value;

        log.audit('----- [Complete Event] -----', { timeSheets, fulfillItems });

        try {
          Event._createTimeTracking(eventDataSrc, timeSheets);

          // Prevent blocker if something happens
          try {
            Event._fulfillOrderItems(soId, fulfillItems);
          } catch (e) {
            log.audit('Complete Event Fulfillment Unexpected Error', e.message);
          }

          record.submitFields({
            type: record.Type.CALENDAR_EVENT,
            id: eventId,
            values: {
              status: 'COMPLETE'
            },
            options: {
              ignoreMandatoryFieds: true
            }
          });

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
          timeSheet.startTime = moment(`1/1/1999 ${timeSheet.startTime}`).format(env.Format.IMPORT_TIME);
          timeSheet.endTime = moment(`1/1/1999 ${timeSheet.endTime}`).format(env.Format.IMPORT_TIME);

          const diffDate = Utils._diffDates(`1/1/1999 ${timeSheet.startTime}`, `1/1/1999 ${timeSheet.endTime}`);
          // timeSheet.hours = `${diffDate.hour}:${String(diffDate.minute).length == 1 ? `0${diffDate.minute}` : diffDate.minute}`;
          timeSheet.hours = Utils._convertTimeToDecimal(diffDate.hour, diffDate.minute);
          const _resource = eventDataSrc.resources.find(resource => resource.id == timeSheet.id);
          if (_resource) {
            timeSheet.location = _resource.location.value;
          }
          return timeSheet;
        });

        log.audit('Mapped Timesheets', timeSheets);

        timeSheets = timeSheets.filter(timeSheet => !!(timeSheet.location)); // Location is mandatory in the event record timetracking sublist

        if (timeSheets.length) {
          log.audit('----- [Creating Timesheets] -----', timeSheets);

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
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'custcol_time_act_cost',
                value: timeSheet.actualCost,
                line
              });
              rec.setSublistValue({
                sublistId: 'timeitem',
                fieldId: 'custcol_time_act_cost_data',
                value: timeSheet.actualCostData,
                line
              });
              log.audit('Timesheet Added', timeSheet);
            } catch (e) {
              log.error('Error Setting Timesheet', { errorMsg: e.message, timeSheet });
            }
          }
          rec.save({ ignoreMandatoryFields: true });
        } else {
          throw new Error('Time tracking location is required.');
        }
      }

      static _fulfillOrderItems(soId, items) {
        log.audit('----- [Fulfill Order Items] -----', { soId, items });

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
        let reqBody = request.body || '{}';
        const eventId = params.id;

        try {
          const eventData = JSON.parse(reqBody);
          // Unlink event from related child records before the deletion
          Utils._deleteRecords(env.RecordType.WORK_ORDER_RESOURCE, eventData.resources.map(el => el.id));
          Utils._deleteRecords(env.RecordType.WORK_ORDER_VENDOR, eventData.vendors.map(el => el.id));
          Utils._deleteRecords(env.RecordType.WORK_ORDER_ASSET, eventData.assets.map(el => el.id));
          Utils._deleteRecords(env.RecordType.WORK_ORDER_ITEM, eventData.items.map(el => el.id));
          Utils._deleteRecords(env.RecordType.WORK_ORDER_CONTACT, eventData.contacts.map(el => el.id));
          WorkOrderAddress._removeEventFromAddresses(eventData.addresses, eventData.id);

          // Remove timetracking lines
          const rec = record.load({
            type: record.Type.CALENDAR_EVENT,
            id: eventId,
            isDynamic: true
          });
          const lineCount = rec.getLineCount({ sublistId: 'timeitem' });
          for (let i = lineCount - 1; i >= 0; i--) {
            rec.removeLine({
              sublistId: 'timeitem',
              line: i
            });
          }
          rec.setValue({ fieldId: 'custevent_esp_fop_event_contact', value: '' });
          rec.setValue({ fieldId: 'custevent_esp_fop_event_address', value: '' });
          rec.setValue({ fieldId: 'custevent_esp_fop_sales_order', value: '' });
          rec.save({
            ignoreMandatoryFieds: true
          });
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
          recordType: env.RecordType.WORK_ORDER,
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

      static _stringToArray = str => (str || '').split(',').filter(Boolean);
      static _toDate = dateStr => dateStr ? moment(dateStr).format(this._dateFormat) : '';
      static _toDateTimez = (dateStr, timeStr) => moment(`${dateStr} ${timeStr}`)._d;

      static _dateFormat() {
        const user = runtime.getCurrentUser();
        return user.getPreference({ name: 'DATEFORMAT' });
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
            // name: `${name}_${moment().format('MMDDYYYY_hhmmss')}.json`,
            name: `${name}.json`,
            fileType: file.Type.PLAINTEXT,
            contents,
            folder: -15,//folderId
          }).save();
          log.audit('Log File ID', { name, fileId });
        } catch (e) {
          log.error('Log File Unexpected Error', e.message);
        }
      }

      static _deleteRecords(type, ids) {
        for (const id of ids) {
          try {
            record.delete({ type, id });
            log.audit('----- [Removed/Unlinked] -----', { type, id });
          } catch (e) {
            log.error('Error on Unlink > Delete', { type, id, errorMsg: e.message });
          }
        }
      }
    }

    function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    return {
      Resource,
      WorkOrder,
      WorkOrderResource,
      WorkOrderVendor,
      WorkOrderAsset,
      WorkOrderItem,
      WorkOrderContact,
      WorkOrderAddress,
      Event,
      Url,
      Utils
    }
  });