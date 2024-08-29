const modUrl = decodeURIComponent($('#modUrl').val());
// import { Board } from 'https://tstdrv2617106.app.netsuite.com/c.TSTDRV2617106/suiteapp/com.erpsuccess.scheduler/src/js/utils.js';
// import { Board } from modUrl;

import(modUrl)
.then(mod => {

  mod.Board.showBanners();
  mod.Board.initLayoutHandlers();
  mod.Event.initFormHandlers();
  
  // Global functions
  window.holdWorkOrder = mod.Board.holdWorkOrder;
  window.printWorkOrder = mod.Board.printWorkOrder;
  window.cancelWorkOrder = mod.Board.cancelWorkOrder;
  window.printPickList = mod.Board.printPickList;
  
  // *************** Drag WO > Events ***************
  
  window.dragFunctions = ev => {
    switch (ev.type) {
      case 'dragstart':
        thirdColumn.style.border = '5px dashed #26CC4E';
        const el = ev.target;
        const woId = el.querySelector('.card-content-woId')?.getAttribute('woId');
        ev.dataTransfer.setData('text/plain', woId);
        return;
  
      case 'drop':
        openEventForm(ev);
        break;
  
      case 'dragend':
        thirdColumn.style.border = '';
        break;
  
      default:
        // console.log('Skip Reading Event.');
        break;
    }
    ev.stopPropagation();
    ev.preventDefault();
  }
  
  window.openEventForm = ev => {
    const woId = ev.dataTransfer.getData('text');
    $('#eventModal').attr('woId', woId);
    $('#eventModal').modal('toggle');
  }
  
  // openEventForm -> onLoad
  $('#eventModal').on('shown.bs.modal', ev => {
    const woId = $('#eventModal').attr('woId');
    const woRef = mod.Board.workOrders.find(wo => wo.id == woId);
    console.log('Work Order Data', woId, woRef);

    // mod.Board.setEventFormDefaultValues(woRef);
  
    const { woUrl, project, projectUrl, title, items, contacts, addresses } = woRef;
    // Set primary info
    $('#project').html(`Project: <a href="${projectUrl}" target="_blank"><i>${project.text}</i></a>`);
    $('#title').html(`WO Title: <a href="${woUrl}" target="_blank"><i>${title}</i></a>`);
    
    $.fn.dataTable.ext.errMode = 'none';
  
    mod.Board.temp_woResourcesDataTable = $('#woResources_dt').DataTable({
      processing: true,
      retrieve: true,
      ajax(data, callback, settings) {
        callback({
          data: mod.Board.resources.active
        })
      },
      columns: [
        {
          className: 'dt-head-center dr-body-center',
          orderable: false,
          title: `<div class="form-group form-check container d-flex justify-content-center">
            <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
          </div>` ,
          // data: null,
          render: (data, type, row, meta) => `<div class="form-group form-check container d-flex justify-content-center">
            <input recordId="${row.employee.value}" type="checkbox" class="form-check-input dt-line-select" ${row.selected?'checked':''}>
          </div>`,
          // defaultContent: '',
          width: "5%"
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
      ],
      initComplete: () => {
  
      }
    });
  
    mod.Board.temp_woItemsDataTable = $('#woItems_dt').DataTable({
      processing: true,
      retrieve: true,
      ajax(data, callback, settings) {
        callback({
          data: items
        })
      },
      columns: [
        {
          className: 'dt-head-center dr-body-center',
          orderable: false,
          title: `<div class="form-group form-check container d-flex justify-content-center">
            <input type="checkbox" class="form-check-input" style="left: 30px" onclick="markAll(event);">
          </div>` ,
          // data: null,
          render: (data, type, row, meta) => `<div class="form-group form-check container d-flex justify-content-center">
            <input recordId="${row.id}" type="checkbox" class="form-check-input dt-line-select" ${row.selected?'checked':''}>
          </div>`,
          // defaultContent: '',
          width: "5%"
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
      ],
      initComplete: () => {
        let contactRows = '', addressRows = '';
        for (let contact of contacts) {
          contactRows += `<tr>
            <td class="align-top">
              <div class="form-group form-check container d-flex justify-content-center">
                <input recordId="${contact.id}" type="radio" class="form-check-input" style="left: 30px" checked>
              </div>
            </td>
            <td><a href="${contact.url}" target="_blank">${contact.name}</a></td>
            <td><a href="#">${contact.email}</a></td>
            <td>${contact.jobTitle}</td>
            <td>${contact.phone}</td>
            <td>${contact.mobilePhone}</td>
          </tr>`;
        }
        $('table#contacts tbody').append(contactRows);
  
        for (let address of addresses) {
          addressRows += `<tr>
            <td class="align-top">
              <div class="form-group form-check container d-flex justify-content-center">
                <input recordId="${address.id}" type="radio" class="form-check-input" style="left: 30px" checked>
              </div>
            </td>
            <td><a href="${address.customerUrl}">${address.customer.text}</a></td>
            <td>${address.address.text}</td>
            <td>${address.addressDetails.replace(/\n/g, '<br/>')}</td>
          </tr>`;
        }
        $('table#addresses tbody').append(addressRows);
      }
    });
  });

  $('#submitForm').on('submit', ev => {
    // LOADER (TBD)
    ev.preventDefault();
    
    const woId = $('#eventModal').attr('woId');
    const woRef = mod.Board.workOrders.find(wo => wo.id == woId);
    const resources = mod.Board.resources;
    const payload = {
      eventData: {},
      woRef
    };
    payload.eventData.startDate = $('#wo-primaryinfo #datefrom').val();
    payload.eventData.endDate = $('#wo-primaryinfo #dateto').val();
    payload.eventData.startTime = $('#wo-primaryinfo #starttime').val();
    payload.eventData.endTime = $('#wo-primaryinfo #endtime').val();
    payload.eventData.note = $('#wo-primaryinfo #note').val();
    payload.eventData.allDay = $('#wo-primaryinfo #alldayevent-switch')[0].checked;
    payload.eventData.status = $('#wo-primaryinfo #status').val();
    payload.eventData.priority = $('#wo-primaryinfo #priority').val();
    payload.eventData.selectedResources = [];
    payload.eventData.selectedItems = [];

    const resourceIds = [];
    const woResources_dt_tr = document.querySelectorAll('#woResources_dt tbody .dt-line-select');
    for (const line of woResources_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          resourceIds.push(id);
        }
      }
    }

    const itemIds = [];
    const woItems_dt_tr = document.querySelectorAll('#woItems_dt tbody .dt-line-select');
    for (const line of woItems_dt_tr) {
      if (line.checked) {
        const id = line.getAttribute('recordid');
        if (id) {
          itemIds.push(id);
        }
      }
    }

    payload.eventData.selectedResources = resources.active.filter(resource => Boolean(resourceIds.includes(resource.employee.value)));
    payload.eventData.selectedItems = woRef.items.filter(item => Boolean(itemIds.includes(item.id)));

    console.log('PAYLOAD', payload);

    mod.Event.createEventRecord(payload)
    mod.Event.clearFieldValues();
  });
})
.catch(error => {
  console.error('Error on loading module', error);
});