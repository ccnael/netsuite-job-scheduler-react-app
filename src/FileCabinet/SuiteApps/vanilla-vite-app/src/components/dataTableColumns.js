export const resourcesDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" validate-datetime-resource-type="employee" validate-datetime-resource-id="${row.employee.value}" type="checkbox" class="form-check-input dt-line-select" ${row.selected ? 'checked' : ''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center',
    data: 'name',
    title: 'Name'
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `${row.resourceGroups.reduce((x, y) => x += `<span class="badge bg-info">${y.text}</span> `, '')}`,
    title: 'Group'
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `${row.resourceSkills.reduce((x, y) => x += `<span class="badge bg-info">${y.text}</span> `, '')}`,
    title: 'Skill'
  },
  {
    className: 'dt-head-center',
    data: 'email',
    title: 'Email'
  },
  {
    className: 'dt-head-center',
    data: 'phone',
    title: 'Phone'
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `<input type="time" class="form-control starttime-row" value="${row?.time?.start}" required>`,
    title: 'Start Time <span class="required"></span>',
    orderable: false
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `<input type="time" class="form-control endtime-row" value="${row?.time?.end}" required>`,
    title: 'End Time <span class="required"></span>',
    orderable: false
  }
];

export const vendorsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected ? 'checked' : ''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => row?.vendor?.text || row.name,
    title: 'Vendor'
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => `<input type="number" class="quantity quantityRequired" value="${row.quantityRequired || 0}" min="0" required />`,
    title: 'Manpower Required'
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => `<textarea class="form-control note" rows="3">${row.memo}</textarea>`,
    title: 'Comments'
  },
];

export const assetsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" validate-datetime-resource-type="asset" validate-datetime-resource-id="${row.asset.value}" type="checkbox" class="form-check-input dt-line-select" ${row.selected ? 'checked' : ''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'name',
    title: 'Name'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'description',
    title: 'Description'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'type.text',
    title: 'Type'
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => `<input type="number" class="quantity" value="${row?.quantity || 0}" max="${row?.maxQuantity || 0}" min="0" required />`,
    title: 'Quantity'
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => addCommas(row?.quantityRemaining),
    title: 'Quantity Remaining'
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `<input type="time" class="form-control starttime-row" value="${row?.time?.start}" required>`,
    title: 'Start Time <span class="required"></span>',
    orderable: false
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `<input type="time" class="form-control endtime-row" value="${row?.time?.end}" required>`,
    title: 'End Time <span class="required"></span>',
    orderable: false
  }
];

export const itemsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected ? 'checked' : ''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'item.text',
    title: 'Item'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'description',
    title: 'Description'
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => `<input type="number" class="quantity" value="${row.quantity}" min="0" max="${row.quantity}" required />`,
    title: 'Quantity'
  }
];

export const contactsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected ? 'checked' : ''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'name',
    title: 'Name'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'email',
    title: 'Email'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'jobTitle',
    title: 'Job Title'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'phone',
    title: 'Phone #'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'mobilePhone',
    title: 'Mobile #'
  }
];

export const addressesDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: ``,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
         <input recordId="${row.id}" type="radio" class="form-check-input dt-line-select" style="left: 30px" name='woAddress' ${row.selected ? 'checked' : ''}>
      </div>
      `,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'customer.text',
    title: 'Customer'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'address.text',
    title: 'Address'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'addressDetails',
    title: 'Full Address'
  }
];

// COMPLETE EVENT
// -----------------
export const ceTimeSheetsDtColumns = [
  {
    className: 'dt-head-center resourceName',
    render: (_data, _type, row, _meta) => `<p recordId="${row.employee.value}" locationId="${row.location.value}">${row.name}</p>`,
    title: 'Name'
  },
  {
    className: 'dt-head-center',
    data: 'location.text',
    title: 'Location <span class="required"></span>'
  },
  {
    className: 'dt-head-center',
    render: () => `<input type="time" class="form-control starttime" required>`,
    title: 'Start Time <span class="required"></span>'
  },
  {
    className: 'dt-head-center',
    render: () => `<input type="time" class="form-control endtime" required>`,
    title: 'End Time <span class="required"></span>'
  },
  {
    className: 'dt-head-center',
    render: () => `
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="away-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="away-mins" min="0" max="60" />
      </div>
    `,
    title: 'Away'
  },
  {
    className: 'dt-head-center',
    render: () => `
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="st-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="st-mins" min="0" max="60" />
      </div>
    `,
    title: 'ST'
  },
  {
    className: 'dt-head-center',
    render: () => `
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="ot-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="ot-mins" min="0" max="60" />
      </div>
    `,
    title: 'OT'
  },
  {
    className: 'dt-head-center',
    render: () => `
      <div class="ts-input-container">
        <input type="number" placeholder="hrs" class="dt-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="dt-mins" min="0" max="60" />
      </div>
    `,
    title: 'DT'
  },
  {
    className: 'dt-head-center',
    render: () => `<input type="text" class="form-control note">`,
    title: 'Note'
  }
];

export const ceItemsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected ? 'checked' : ''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center lineId',
    data: 'line',
    title: 'Line #'
  },
  {
    className: 'dt-head-center',
    data: 'item.text',
    title: 'Item'
  },
  {
    className: 'dt-head-center',
    data: 'description',
    title: 'Description'
  },
  {
    className: 'dt-head-center dt-body-center itemQty',
    data: 'quantity',
    title: 'Quantity'
  },
  {
    className: 'dt-head-center dt-body-center',
    render: (_data, _type, row, _meta) => `<input type="number" class="quantity completeQty" value="${row.quantity}" required />`,
    title: 'Complete Qty'
  }
];

export const cePunchItemsDtColumns = [
  {
    className: 'dt-head-center dt-body-center',
    data: 'status.text',
    title: 'Status'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'reason',
    title: 'Reason'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'description',
    title: 'Description'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'resolution',
    title: 'Resolution'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'dateCreated',
    title: 'Date Created'
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'enteredBy',
    title: 'Entered By'
  }
];

function addCommas(num) {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}