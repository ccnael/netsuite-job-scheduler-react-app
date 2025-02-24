import { userId, suiteletUrl, events, filterFields } from './dataSet';

export function cacheTabSwitch() {
  const sessionKey = /netsuite\.com/.test(window.location.href) ? `${userId}:lastClickedTab` : 'lastClickedTab';
  const lastTab = localStorage.getItem(sessionKey);
  if (lastTab) {
    $('.tab').removeClass('active');
    $(`div[data-target="${lastTab}"]`).closest(`.${lastTab.replace('Section', '')}`).addClass('active');
    $('.tab-content').hide();
    $(`#${lastTab}`).show();

    if (lastTab === 'calendarSection') {
      setTimeout(() => {
        hideCustomLoader();
        window.FullCalendar.render();
      }, 500);
    } else {
      setTimeout(() => {
        hideCustomLoader();
        $('#calendarSection').hide();
      }, 500);
    }
  } else {
    setTimeout(() => {
      hideCustomLoader();
      $('#calendarSection').hide();
    }, 500);
  }

  // Onchange tab
  $('header div.tab').on('click', function () {
    $('.tab').removeClass('active');
    $(this).addClass('active');

    const targetSectionId = $(this).data('target');
    localStorage.setItem(sessionKey, targetSectionId);
    $('.tab-content').hide();
    $(`#${targetSectionId}`).show();

    targetSectionId === 'calendarSection' && setTimeout(() => window.FullCalendar.render());
  });
}

export class Event {

  static validateResourcesOnLoad(tableId, resourceTblId, eventId) {
    resourceTblId.match(/resource/g) && this.validateResourcesAvailability(tableId, resourceTblId, eventId);
    // Initialize on page change
    const that = this;
    const table = $(resourceTblId).DataTable();

    table.on('draw', function () {
      that.validateResourcesAvailability(tableId, resourceTblId, eventId);
      const allDaySwitched = $('.alldayevent-switch').prop('checked');
      allDaySwitched && that.setAllDayResourceTime(resourceTblId);
    });
  }

  static validateOnHeaderFieldChange(tableId, resourceTblId, eventId, section) {
    const that = this;
    $(`${tableId} input.datefrom, ${tableId} input.dateto, ${tableId} input.starttime, ${tableId} input.endtime`).on('change', function () {
      section && that.unMarkAvailableResource(section);

      if (!that.validateEventDateTime(this, tableId)) {
        return;
      }
      that.validateResourcesAvailability(tableId, resourceTblId, eventId, true);
    });
  }

  static unMarkAvailableResource(section) {
    const modalId = filterFields[section].modalId;
    const el = $(`${modalId} .filter-fields .show-available-resource-field`);
    el && el.prop('checked', false).change();
  }

  static validateOnLineFieldChange(tableId, resourceTblId, eventId) {
    const that = this;
    // On resource check
    $(`${resourceTblId} input.dt-line-select`).on('change', function () {
      const time = {
        start: $(`${tableId} input.starttime`).val(),
        end: $(`${tableId} input.endtime`).val(),
      }
      // Copy header start/endto current line time fields
      $(this).parent().parent().parent().find('input.starttime-row').val(time.start);
      $(this).parent().parent().parent().find('input.endtime-row').val(time.end);
    });
    $(`${resourceTblId} input.starttime-row, ${resourceTblId} input.endtime-row`).on('change', function () {
      if (!that.validateResourceTime(this, tableId, resourceTblId)) {
        return;
      }
    });
  }

  static validateResourcesAvailability(tableId, resourceTblId, eventId, onFieldChanged = false) {
    const start = moment(`${$(`${tableId} input.datefrom`).val()} ${$(`${tableId} input.starttime`).val()}`);
    const end = moment(`${$(`${tableId} input.dateto`).val()} ${$(`${tableId} input.endtime`).val()}`);

    $(`${resourceTblId} tbody tr`).each(function () {
      const checkbox = $(this).find('input.dt-line-select');
      const resourceId = checkbox.attr('employeeId');
      const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
      const conflictEvents = resourceEvents.filter(event => {
        const eventStart = `${event.date.start} ${event.time.start}`;
        const eventEnd = `${event.date.end} ${event.time.end}`;
        if (eventId) {
          return event.id != eventId && (moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
        } else {
          return moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end);
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

  static validateEventDateTime(that, tableId) {
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

  static validateResourceTime(that, tableId, resourceTblId) {
    const eventTime = {
      start: $(`${tableId} input.starttime`).val(),
      end: $(`${tableId} input.endtime`).val(),
    }
    const resourceTime = {
      start: $(`${resourceTblId} input.starttime-row`).val(),
      end: $(`${resourceTblId} input.endtime-row`).val(),
    }
    if (!!resourceTime.start && moment(`1/1/1999 ${resourceTime.start}`).isBefore(moment(`1/1/1999 ${eventTime.start}`))) {
      Swal.fire(
        'Invalid Time',
        'Resource Start Time must be within the Event Start and End Time',
        'warning'
      );
      $(that).val('');
      return false;
    } else if (!!resourceTime.end && moment(`1/1/1999 ${resourceTime.end}`).isAfter(moment(`1/1/1999 ${eventTime.end}`))) {
      Swal.fire(
        'Invalid Time',
        'Resource End Time must be within the Event Start and End Time',
        'warning'
      );
      $(that).val('');
      return false;
    } else if (!!resourceTime.start && !!resourceTime.end && moment(`1/1/1999 ${resourceTime.start}`).isAfter(moment(`1/1/1999 ${resourceTime.end}`))) {
      Swal.fire(
        'Invalid Time',
        'Start Time must not be greater than End Time',
        'warning'
      );
      $(that).val('');
      return false;
    }
  }

  static switchAllDay(selector) {
    $(`${selector} .alldayevent-switch`).on('change', ev => {
      if (ev.target.checked) {
        $(`${selector} .starttime`).val('08:00'); // NS default starttime
        $(`${selector} .endtime`).val('18:00'); // NS default endtime
        $(`${selector} .starttime`).prop('disabled', true);
        $(`${selector} .endtime`).prop('disabled', true);
        this.setAllDayResourceTime(selector);
      } else {
        $(`${selector} .starttime`).prop('disabled', false);
        $(`${selector} .endtime`).prop('disabled', false);
      }
    });
  }

  static setAllDayResourceTime(selector) {
    $(`${selector} .starttime-row`).val('08:00');
    $(`${selector} .endtime-row`).val('18:00');
  }

  static draggedResourceHasConflictEvent(eventId, date, time, resourceId) {
    const start = moment(`${date.start} ${time.start}`);
    const end = moment(`${date.end} ${time.end}`);
    const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = `${event.date.start} ${event.time.start}`;
      const eventEnd = `${event.date.end} ${event.time.end}`;
      return event.id != eventId && (moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
    });
    return !!conflictEvents.length;
  }

  static draggedJobHasConflictEvent(startDateTime, elementId = '') {
    const resourceId = elementId.split('-').pop();
    const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = moment(`${event.date.start} ${event.time.start}`);
      const eventEnd = moment(`${event.date.end} ${event.time.end}`);
      return startDateTime.isSameOrAfter(eventStart) && startDateTime.isSameOrBefore(eventEnd);
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
      text: `Event Record [ID ${payload.eventData.id}]`,
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
            text: `Updating Event Record [ID ${payload.eventData.id}]...`
          });
        } else {
          if (eventInfo) {
            eventInfo.revert();
          }
        }
      });
  }

  static setupDeleteEventRecord() {
    window.deleteEventRecord = (ev, eventId) => {
      eventId = eventId || ev.target.closest('.card-item').getAttribute('id');
      console.log('deleteEventRecord() > Event ID', eventId);
      const payload = events.find(event => event.id == eventId) || {};
      console.log('PAYLOAD', payload);

      Swal.fire({
        title: `Delete Event Record [ID ${eventId}]?`,
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
                      text: `Event ${payload.eventData?.title || ''} [ID ${eventId}] has been deleted`,
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
              text: `Deleting Event Record [ID ${eventId}]...`
            });
          }
        });
    }
  }
}

export class Resource {

  static updateResourceAssignment(payload, eventInfo) {
    payload.newResource = eventInfo.newResource.extendedProps;
    console.log('----- [updateResourceAssignment() -> PAYLOAD] -----', { payload, eventInfo: eventInfo || '' });

    const eventId = eventInfo.event._def.publicId;
    const oldResourceName = eventInfo.oldResource.extendedProps.name;
    const newResourceName = payload.newResource.name;

    Swal.fire({
      title: `Event [ID ${eventId}] Resource Reassignment`,
      text: `Reassign ${oldResourceName} to ${newResourceName}?`,
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
                `${suiteletUrl}&mode=updateResourceAssignment`, {
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
                      text: `Reassigned to ${newResourceName}`,
                      icon: 'success'
                    })
                      .then(() => {
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
            text: `Updating Work Order Resource [ID ${payload.id}]...`
          });
        } else {
          if (eventInfo) {
            eventInfo.revert();
          }
        }
      });

    // alert('Update In Progress...');
    // eventInfo.revert();
  }

  static updateResourceDateTime(payload, eventInfo) {
    console.log('----- [updateResourceDateTime() -> PAYLOAD] -----', { payload, eventInfo: eventInfo || '' });

    Swal.fire({
      title: `Update Date/Time`,
      text: `Update to ${payload.date.start} ${payload.time.start} - ${payload.date.end} ${payload.time.end}?`,
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
                `${suiteletUrl}&mode=updateResourceDateTime`, {
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
                      text: `Date/Time has been updated to ${payload.date.start} ${payload.time.start} - ${payload.date.end} ${payload.time.end}`,
                      icon: 'success'
                    })
                      .then(() => {
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
            text: `Updating Work Order Resource [ID ${payload.id}] Date/Time...`
          });
        } else {
          if (eventInfo) {
            eventInfo.revert();
          }
        }
      });

    // alert('Update In Progress...');
    // eventInfo.revert();
  }
}

export function setupWorkOrderAction() {
  window.holdWorkOrder = ev => {
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
              text: `Work Order [ID ${woId}] Status has been set to Hold`,
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
      text: `Updating Work Order [ID ${woId}] Status to Hold`
    });
  }

  window.cancelWorkOrder = ev => {
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
              text: `Work Order [ID ${woId}] Status has been set to Closed`,
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
      text: `Updating Work Order [ID ${woId}] Status to Closed`
    });
  }

  window.printWorkOrder = ev => {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printWorkOrder&woId=${woId}`);
  }

  window.printPickList = ev => {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printPickList&woId=${woId}`);
  }
}

function hideCustomLoader() {
  $(`#calendarSection .spinner`).hide();
  $(`#calendarSection .main-container`).css('display', 'block');
}