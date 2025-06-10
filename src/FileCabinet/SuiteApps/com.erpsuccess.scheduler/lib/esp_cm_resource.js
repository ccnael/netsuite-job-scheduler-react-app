/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 * 
 * TBD - to be done in the frontend
 * 
 * events
 *  .filter(event => event.resources.map(resource => resource.employee.value).includes(result.id))
 *  .map(event => event.id)
 */
define([
  'N/search',
  './esp_cm_helper',
  './esp_cm_utils'
], (search, helper, utils) => {
  /**
   * Get the list of employees
   * @param {Object} context Suitelet object
   */
  function getEmployees(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const filters = [
      ['isinactive', 'is', 'F'],
      'AND',
      ['custentity_esp_fop_is_wo_resource', 'is', 'T']
    ]

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
        search.createColumn({ name: 'name', join: 'location', label: 'Location Name' }),
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
        search.createColumn({ name: 'location', label: 'Location' }),
        search.createColumn({ name: 'department', label: 'Department' }),
      ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const resources = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue(map.columns[2]),
      initials: map.getValue(map.columns[1]),
      email: map.getValue({ name: 'email' }),
      phone: map.getValue({ name: 'phone' }),
      location: {
        text: map.getText({ name: 'location' }),
        value: map.getValue({ name: 'location' }),
      },
      active: map.getValue('custentity_esp_fop_is_employee_active'),
      get employee() {
        return {
          text: this.name,
          value: this.id
        }
      },
      get resourceGroups() {
        const obj = {
          texts: helper.stringToArray(map.getText('custentity_esp_fop_resource_group')),
          values: helper.stringToArray(map.getValue('custentity_esp_fop_resource_group')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      get types() {
        const obj = {
          texts: helper.stringToArray(map.getText('custentity_esp_fop_emp_resource_type')),
          values: helper.stringToArray(map.getValue('custentity_esp_fop_emp_resource_type')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      get subTypes() {
        const obj = {
          texts: helper.stringToArray(map.getText('custentity_esp_fop_emp_resource_subtype')),
          values: helper.stringToArray(map.getValue('custentity_esp_fop_emp_resource_subtype')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      rate: +map.getValue('custentity_esp_fop_emp_rate_per_hr'),
      vendor: {
        text: map.getText('custentity_esp_fop_emp_affiliated_vendor'),
        value: map.getValue('custentity_esp_fop_emp_affiliated_vendor'),
      },
      purchaseOrder: {
        text: '',
        value: '',
      },
      affiliationType: {
        text: map.getText('custentity_esp_fop_emp_affiliation_type'),
        value: map.getValue('custentity_esp_fop_emp_affiliation_type')
      },
      get url() {
        return encodeURIComponent(utils.NSUrl.resourceUrl(this.id))
      },
      events: []/* events
        .filter(event => event.resources.map(resource => resource.employee.value).includes(result.id))
        .map(event => event.id) */,
      labRates: JSON.parse(map.getValue('custentity_esp_fop_labour_rate_matrix') || '[]'),
      time: {
        start: '',
        end: ''
      },
      get resourceSkills() {
        const obj = {
          texts: helper.stringToArray(map.getText('custentity_esp_fop_emp_resource_skill')),
          values: helper.stringToArray(map.getValue('custentity_esp_fop_emp_resource_skill')),
        };
        return obj.texts.map((text, index) => ({
          text,
          value: obj.values[index]
        }));
      },
      department: {
        text: map.getText('department'),
        value: map.getValue('department')
      }
    }));

    // log.audit('----- [Resources] -----', all);
    response.write(JSON.stringify(resources));
  }

  return {
    getEmployees
  }
})