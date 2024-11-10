import { userId, suiteletUrl, events } from './dataSet';

export function initTabSwitch() {
  const sessionKey = /netsuite\.com/.test(window.location.href) ? `${userId}:lastClickedTab` : 'lastClickedTab';
  const lastTab = localStorage.getItem(sessionKey);

  if (lastTab) {
    $('.tab').removeClass('active');
    $(`div[data-target="${lastTab}"]`).closest(`.${lastTab.replace('Section', '')}`).addClass('active');
    $('.tab-content').hide();
    $(`#${lastTab}`).show();

    if (lastTab === 'calendarSection') {
      setTimeout(() => {
        window.FullCalendar.render();
      })
    } else {
      setTimeout(() => {
        $('#calendarSection').hide();
      }) 
    }
  } else {
    setTimeout(() => {
      $('#calendarSection').hide();
    })  
  }

  $('header div.tab').on('click', function() {
    $('.tab').removeClass('active');
    $(this).addClass('active');
    
    const targetSectionId = $(this).data('target');
    localStorage.setItem(sessionKey, targetSectionId);

    $('.tab-content').hide();
    $(`#${targetSectionId}`).show();

    if (targetSectionId === 'boardSection') {
      // Custom code for Board tab
    }

    if (targetSectionId === 'calendarSection') {
      setTimeout(() => {
        window.FullCalendar.render();
      })
    }
  });
}

export class Event {

  static validateResourcesOnLoad(tableId, resourceTblId, eventId) {
    this.validateResourceLines(tableId, resourceTblId, eventId);
  }

  static validateOnFieldChange(tableId, resourceTblId, eventId) {
    const that = this;

    $(`${tableId} input.datefrom, ${tableId} input.dateto, ${tableId} input.starttime, ${tableId} input.endtime`).on('change', function () {
      if (!that.validateDateAndTime(this, tableId)) {
        return;
      }
      // $('#resources tbody .dt-line-select').prop('checked', false);
      that.validateResourceLines(tableId, resourceTblId, eventId, true);
    });
  }

  static validateResourceLines(tableId, resourceTblId, eventId, onFieldChanged = false) {
    const start = moment(`${$(`${tableId} input.datefrom`).val()} ${$(`${tableId} input.starttime`).val()}`);
    const end = moment(`${$(`${tableId} input.dateto`).val()} ${$(`${tableId} input.endtime`).val()}`);
    
    $(`${resourceTblId} tbody tr`).each(function() {
      const checkbox = $(this).find('input.dt-line-select');
      const resourceId = checkbox.attr('employeeId');
      const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
      const conflictEvents = resourceEvents.filter(event => {
        const eventStart = `${event.date.start} ${event.time.start}`;
        const eventEnd = `${event.date.end} ${event.time.end}`;
        if (eventId) {
          return event.id != eventId && (moment(eventEnd).isBetween(start, end, null, '[]') ||  moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
        } else {
          return moment(eventEnd).isBetween(start, end, null, '[]') ||  moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end);
        }
      });
      // console.log(checkbox.prop('checked'))
      if (conflictEvents.length) {
        if (!eventId || (onFieldChanged && checkbox.prop('checked'))) {
          checkbox.prop('checked', false);
        }
        checkbox.prop('disabled', true);
        $(this).removeClass('row-available');
        $(this).addClass('row-unavailable');
      } else {
        checkbox.prop('disabled', false);
        $(this).removeClass('row-unavailable');
        $(this).addClass('row-available');
      }
    });
  }

  static validateDateAndTime(that, tableId) {
    const date = {
      start: $(`${tableId} input.datefrom`).val(),
      end: $(`${tableId} input.dateto`).val(),
    }
    const time = {
      start: $(`${tableId} input.starttime`).val(),
      end: $(`${tableId} input.endtime`).val(),
    }
    // console.log(date, time);
    
    if (!!date.start && !!date.end && moment(date.start).isAfter(moment(date.end))) {
      Swal.fire(
        'Invalid Date',
        'Start Date must not be greater than End Date',
        'warning'
      );
      $(that).val('');
      return false;
    } 
    
    if (!!time.start && !!time.end && moment(`1/1/1999 ${time.start}`).isAfter(moment(`1/1/1999 ${time.end}`))) {
      Swal.fire(
        'Invalid Time',
        'Start Time must not be greater than End Time',
        'warning'
      );
      $(that).val('');
      return false;
    }

    return true;
  }

  static draggedResourceHasConflicEvent(eventData, resourceId) {
    const eventId = eventData.id;
    const start = moment(`${eventData.date.start} ${eventData.time.start}`);
    const end = moment(`${eventData.date.end} ${eventData.time.end}`);
    const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = `${event.date.start} ${event.time.start}`;
      const eventEnd = `${event.date.end} ${event.time.end}`;
      return event.id != eventId && (moment(eventEnd).isBetween(start, end, null, '[]') ||  moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
    });
    return !!conflictEvents.length;
  }

  static createEventRecord(payload, modalId) {
    console.log('----- [createEventRecord() -> PAYLOAD] -----', payload);

    Swal.fire({
      title: 'Create Event Record?',
      text: payload.woRef?.name ? `Create Event for Work Order : ${payload.woRef.name}` : 'Create Event',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(
              `${suiteletUrl}&mode=createEventRecord`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(result => {
               if (result.code == 200) {
                Swal.fire({
                  title: 'Success!',
                  text: `Event ${payload.eventData.title} [ID ${result.recordId}] has been created`,
                  icon: 'success'
                })
                .then(() => {
                  $(`#${modalId}`).modal('hide');
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Unexpected Error',
                  text: `Error: ${result.errorMsg}`,
                  icon: 'error'
                });
              }
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          text: 'Creating Event Record...'
        });
      }
    });
  }

  static updateEventRecord(payload, modalId, eventInfo) {
    console.log('----- [updateEventRecord() -> PAYLOAD] -----', { payload, eventInfo: eventInfo || '' });

    Swal.fire({
      title: `Update Event Record?`,
      text: `Event Record ID ${payload.eventData.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(
              `${suiteletUrl}&mode=updateEventRecord`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(result => {
              if (result.code == 200) {
                Swal.fire({
                  title: 'Success!',
                  text: `Event ${payload.eventData.title} [ID ${payload.eventData.id}] has been updated`,
                  icon: 'success'
                })
                .then(() => {
                  $(`#${modalId}`).modal('hide');
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Unexpected Error',
                  text: `Error: ${result.errorMsg}`,
                  icon: 'error'
                });
                if (eventInfo) {
                  eventInfo.revert();
                }
              }
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
              if (eventInfo) {
                eventInfo.revert();
              }
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          text: `Updating Event Record ID ${payload.eventData.id}...`
        });
      } else {
        if (eventInfo) {
          eventInfo.revert();
        }
      }
    });
  }

  static deleteEventRecord(ev, eventId) {
    eventId = eventId || ev.target.closest('.card-item').getAttribute('id');
    console.log('deleteEventRecord() > Event ID', eventId);

    const payload = events.find(event => event.id == eventId) || {};
    console.log('PAYLOAD', payload);

    Swal.fire({
      title: `Delete Event Record ID ${eventId}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(`${suiteletUrl}&mode=deleteEventRecord&id=${eventId}`, { 
              body: JSON.stringify(payload),
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json())
            .then(result => {
              Swal.fire({
                title: 'Deleted!',
                text: `Event ${payload.eventData.title} [ID ${eventId}] has been deleted`,
                icon: 'success'
              })
              .then(() => {
                window.location.reload();
              });
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: true,
          text: `Deleting Event Record ID ${eventId}...`
        });
      }
    });
  }
}

export class WorkOrderAction {
  
  static holdWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;

    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`${suiteletUrl}&mode=holdWorkOrder&woId=${woId}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          Swal.fire({
            title: 'Success!',
            text: `Work Order Status has been set to Hold`,
            icon: 'success'
          });
          Swal.hideLoading();
          window.location.reload();
        })
        .catch(error => {
          Swal.fire(
            'Unexpected Error',
            error.message,
            'error'
          );
          Swal.hideLoading();
        });
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      text: 'Updating Work Order Status to Hold'
    });
  }
  
  static cancelWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`${suiteletUrl}&mode=cancelWorkOrder&woId=${woId}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          Swal.fire({
            title: 'Success!',
            text: `Work Order Status has been set to Closed`,
            icon: 'success'
          });
          Swal.hideLoading();
          window.location.reload();
        })
        .catch(error => {
          Swal.fire(
            'Unexpected Error',
            error.message,
            'error'
          );
          Swal.hideLoading();
        });
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      text: 'Updating Work Order Status to Closed'
    });
  }
  
  static printWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printWorkOrder&woId=${woId}`);
  }
  
  static printPickList(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printPickList&woId=${woId}`);
  }
}