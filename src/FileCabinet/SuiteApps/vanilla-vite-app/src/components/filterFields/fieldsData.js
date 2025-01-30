import * as dataSet from '../dataSet';

export default {
  "resource": {
    "modalId": "#filterFieldResource",
    "fields": [
      {
        "label": "Resource Name",
        "className": "multiple-resource-field",
        "type": "multiselect",
        "display": true,
        "options": [
          ...dataSet.resources.map(resource => ({ value: resource.id, text: resource.name })),
          ...dataSet.vendors.map(vendor => ({ value: vendor.id, text: vendor.name })),
          ...dataSet.assets.map(asset => ({ value: asset.id, text: asset.name })),
        ]
      },
      {
        "label": "Resource Group",
        "className": "multiple-resource-group-field",
        "type": "multiselect",
        "display": true,
        "options": dataSet.resourceGroups
      },
      {
        "label": "Resource Skill",
        "className": "multiple-resource-skill-field",
        "type": "multiselect",
        "display": true,
        "options": dataSet.resourceSkills
      },
      {
        "label": "Status",
        "className": "multiple-status-field",
        "type": "multiselect",
        "display": true,
        "options": [
          {
            value: "1",
            text: "Active"
          },
          {
            value: "0",
            text: "Inactive"
          }
        ]
      },
      {
        "label": "Location",
        "className": "multiple-location-field",
        "type": "multiselect",
        "display": false,
        "options": dataSet.resourceLocations
      },
      {
        "label": "Department",
        "className": "multiple-department-field",
        "type": "multiselect",
        "display": false,
        "options": dataSet.resourceDepartments
      },
      {
        "label": "Email",
        "className": "email-field",
        "type": "email",
        "display": false
      },
      {
        "label": "Phone",
        "className": "phone-field",
        "type": "phone",
        "display": false
      }
    ]
  }
}