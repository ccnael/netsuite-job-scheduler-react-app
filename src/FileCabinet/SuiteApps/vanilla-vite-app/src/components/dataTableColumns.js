export const woResourcesDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.employee.value}" type="checkbox" class="form-check-input dt-line-select" ${row.selected?'checked':''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center',
    data: 'employee.text',
    title: 'Name'
  },
  {
    className: 'dt-head-center',
    data: 'type.text',
    title: 'Type'
  },
  {
    className: 'dt-head-center',
    data: 'resourceGroup.text',
    title: 'Group'
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
  }
];

export const woItemsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: `<div class="form-group form-check container d-flex justify-content-center">
        <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
      </div>`,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected?'checked':''}>
      </div>`,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
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
    className: 'dt-head-center dt-body-center',
    data: 'quantity',
    title: 'Quantity'
  }
];

export const woContactsDtColumns = [
  {
    className: 'dt-head-center dr-body-center',
    title: ``,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
        <input recordId="${row.id}" type="radio" class="form-check-input dt-line-select" style="left: 30px" name='woContact' ${row.selected?'checked':''}>
      </div>
      `,
    width: "5%",
    orderable: false
  },
  {
    className: 'dt-head-center dt-body-center',
    data: 'name',
    title: 'Name'
  },
  {
    className: 'dt-head-center',
    data: 'email',
    title: 'Email'
  },
  {
    className: 'dt-head-center',
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

export const woAddressesDtColumns = [{
    className: 'dt-head-center dr-body-center',
    title: ``,
    render: (_data, _type, row, _meta) => `<div class="form-group form-check container d-flex justify-content-center">
         <input recordId="${row.id}" type="radio" class="form-check-input dt-line-select" style="left: 30px" name='woAddress' ${row.selected?'checked':''}>
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
    className: 'dt-head-center',
    data: 'address.text',
    title: 'Address'
  },
  {
    className: 'dt-head-center',
    data: 'addressDetails',
    title: 'Full Address'
  }
];

export const ceTimeSheetsDtColumns = [
  {
    className: 'dt-head-center resourceName',
    render: (_data, _type, row, _meta) => `<p recordId="${row.employee.value}" locationId="${row.location.value}">${row.employee.text}</p>`,
    title: 'Name'
  },
  {
    className: 'dt-head-center',
    render: (_data, _type, row, _meta) => `<input type="time" class="form-control starttime" required>`,
    title: 'Start Time'
  },
  {
    className: 'dt-head-center',
    render: () => `<input type="time" class="form-control endtime" required>`,
    title: 'End Time'
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
        <input type="number" placeholder="hrs" class="reg-hrs" min="0" max="12" />
        <input type="number" placeholder="min" class="reg-mins" min="0" max="60" />
      </div>
    `,
    title: 'Reg'
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
        <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected?'checked':''}>
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
    render: (_data, _type, row, _meta) => `<input type="number" class="completeQty" value="${row.quantity}" required />`,
    title: 'Complete Qty'
  }
];

export const cePunchItemsDtColumns = [
  {
    className: 'dt-head-center dt-body-left',
    data: 'status.text',
    title: 'Status'
  },
  {
    className: 'dt-head-center',
    data: 'reason',
    title: 'Reason'
  },
  {
    className: 'dt-head-center',
    data: 'description',
    title: 'Description'
  },
  {
    className: 'dt-head-center',
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