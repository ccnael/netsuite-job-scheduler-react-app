import { suiteletUrl, events, filterFields } from './dataSet';

// TODO: Move to separate constants file
export const SessionKey = {
  UPDATED_WO_STATUS: 'updatedWOStatus',
  NEW_EVENT: 'newEvent',
  UPDATED_EVENT: 'updatedEvent',
  DELETED_EVENT: 'deletedEvent',
  ACTIVE_TAB: 'activeTab'
}

export const DateFormat = {
  EXPORT_DATE: 'YYYY-MM-DD',
  IMPORT_DATE: 'M/D/YYYY',
  EXPORT_TIME: 'HH:mm',
  IMPORT_TIME: 'h:mm a'
}

export class Cache {

  static _get(key) {
    return localStorage.getItem(key);
  }

  static _clear(key) {
    localStorage.removeItem(key);
  }

  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static setDefaultTab() {
    const sessionKey = SessionKey.ACTIVE_TAB;
    const activeTab = this._get(sessionKey);

    if (activeTab) {
      $('.tab').removeClass('active');
      $(`div[data-target="${activeTab}"]`)
        .closest(`.${activeTab.replace('Section', '')}`)
        .addClass('active');

      $('.tab-content').hide();
      $(`#${activeTab}`).show();

      const rerenderCalendar = () => {
        setTimeout(() => {
          hideCustomLoader();
          window.FullCalendar.render();
        }, 500);
      }

      const hideCalendarSection = () => {
        setTimeout(() => {
          hideCustomLoader();
          $('#calendarSection').hide();
        }, 500);
      }

      if (activeTab === 'calendarSection') {
        rerenderCalendar();
      } else {
        hideCalendarSection();
      }
    } else {
      hideCalendarSection();
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

  static showLastAction() {
    const that = this;

    async function showToast() {
      for (const key in SessionKey) {
        if (key === "ACTIVE_TAB") continue;
        const message = that._get(SessionKey[key]);
        if (message) {
          await new Promise((resolve) => {
            Toastify({
              text: message,
              duration: 99999,
              close: true,
              gravity: "top",
              position: "right",
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
              callback: resolve
            }).showToast();
            setTimeout(resolve, 1000);
          });
          that._clear(SessionKey[key]);
        }
      }
    }
    showToast();
  }
}

export class Event {

  static validateResourcesOnLoad(tableId, resourceTblId, eventId) {
    resourceTblId.match(/resource|asset/g) && this._validateResourcesAvailability(tableId, resourceTblId, eventId);
    // Initialize on page change
    const that = this;
    const table = $(resourceTblId).DataTable();

    table.on('draw', function () {
      that._validateResourcesAvailability(tableId, resourceTblId, eventId);
      const allDaySwitched = $('.allday-switch').prop('checked');
      allDaySwitched && that._setAllDayResourceTime(resourceTblId);
    });
  }

  static validateOnHeaderFieldChange(tableId, resourceTblId, eventId, section) {
    const that = this;
    $(`${tableId} input.datefrom, ${tableId} input.dateto, ${tableId} input.starttime, ${tableId} input.endtime`).on('change', function () {
      section && that._unMarkAvailableResource(section);

      if (!that._validateEventDateTime(this, tableId)) {
        return;
      }
      that._validateResourcesAvailability(tableId, resourceTblId, eventId, true);
    });
  }

  static _unMarkAvailableResource(section) {
    const modalId = filterFields[section].modalId;
    const el = $(`${modalId} .filter-fields .show-available-resource-field`);
    el && el.prop('checked', false).change();
  }

  static validateOnLineFieldChange(tableId, resourceTblId) {
    const that = this;
    // On resource check
    $(`${resourceTblId} input.dt-line-select`).on('change', function () {
      const isChecked = $(this).prop('checked');
      const row = $(this).closest('tr');
      const classStr = row.prop('class');
      if (isChecked) {
        const time = {
          start: $(`${tableId} input.starttime`).val(),
          end: $(`${tableId} input.endtime`).val(),
        }
        that._copyHeaderTimeToResourceTime(row, time);
      }
      // Disable checkbox if row is unavailable
      // If the unavailable row is checked, allow to uncheck it and disable the checkbox after
      /* if (!isChecked && classStr.includes('row-unavailable')) {
        $(this).prop('disabled', true);
      } else {
        $(this).css('opacity', 2);
      } */
    });
    $(`${resourceTblId} input.starttime-row, ${resourceTblId} input.endtime-row`).on('change', function () {
      if (!that._validateResourceTime(this, tableId)) {
        return;
      }
    });
  }

  // Copy header start/endto current line time fields
  static _copyHeaderTimeToResourceTime(row, time) {
    row.find('input.starttime-row').val(time.start);
    row.find('input.endtime-row').val(time.end);
  }

  static _validateResourcesAvailability(tableId, resourceTblId, eventId, onFieldChanged = false) {
    const start = moment(`${$(`${tableId} input.datefrom`).val()} ${$(`${tableId} input.starttime`).val()}`);
    const end = moment(`${$(`${tableId} input.dateto`).val()} ${$(`${tableId} input.endtime`).val()}`);

    $(`${resourceTblId} tbody tr`).each(function () {
      const checkbox = $(this).find('input.dt-line-select');
      const resourceType = checkbox.attr('validate-datetime-resource-type');
      const resourceId = checkbox.attr('validate-datetime-resource-id');
      let resourceEvents = [];
      if (resourceType === 'employee') {
        resourceEvents = events
          .filter(event => event.resources.map(resource => resource.employee.value)
            .includes(resourceId));
        const conflictEvents = resourceEvents.filter(event => {
          const eventStart = `${event.date.start} ${event.time.start}`;
          const eventEnd = `${event.date.end} ${event.time.end}`;
          if (eventId) {
            return event.id != eventId && event.status.value !== 'COMPLETED' && (moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
          } else {
            return event.status.value !== 'COMPLETED' && moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end);
          }
        });
        // console.log(checkbox.prop('checked'))
        if (conflictEvents.length) {
          if (!eventId || (onFieldChanged && checkbox.prop('checked'))) {
            checkbox.prop('checked', false);
          }
          // checkbox.prop('disabled', true);
          $(this).removeClass('row-available');
          $(this).addClass('row-unavailable');
        } else {
          // checkbox.prop('disabled', false);
          $(this).removeClass('row-unavailable');
          $(this).addClass('row-available');
        }
      } else {
        // Set the asset assigned to unavailable on event edit mode
        /* resourceEvents = events
          .filter(event => event.assets
            .filter(asset => asset.onMaintenance)
            .map(asset => asset.asset.value)
            .includes(resourceId));
        if (resourceEvents.length) {
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
        } */
        $(this).addClass('row-available');
      }
    });
  }

  static _validateEventDateTime(that, tableId) {
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

  static _validateResourceTime(that, tableId) {
    const eventTime = {
      start: $(`${tableId} input.starttime`).val(),
      end: $(`${tableId} input.endtime`).val(),
    }
    const resourceTime = {
      start: $(that).closest('input.starttime-row').val(),
      end: $(that).closest('input.endtime-row').val(),
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

  static handleAllDayToggle(selector) {
    $(`${selector} .allday-toggle`).on('change', ev => {
      if (ev.target.checked) {
        $(`${selector} .starttime`).val('08:00'); // NS default starttime
        $(`${selector} .endtime`).val('18:00'); // NS default endtime
        $(`${selector} .starttime`).addClass('disabled');
        $(`${selector} .endtime`).addClass('disabled');
        this._setAllDayResourceTime(selector);
      } else {
        $(`${selector} .starttime`).removeClass('disabled');
        $(`${selector} .endtime`).removeClass('disabled');
      }
    });
  }

  static handleAssetMaintenanceToggle(selector, mode, dataTables) {
    const toggleEl = $(`${selector} .asset-maintenance-toggle`);
    if (mode === 'edit') {
      const isChecked = toggleEl.prop('checked');
      if (isChecked) {
        this.setAssetMaintenance(selector, true, dataTables);
        toggleEl.prop('disabled', true); // Do not allow toggle on edit if already checked
      } else {
        toggleEl.parent().css('display', 'none'); // Hide toggle on edit if unchecked
      }
    }
    toggleEl.on('change', ev => {
      const isChecked = ev.target.checked;
      this.setAssetMaintenance(selector, isChecked, dataTables);
    });
  }

  static setAssetMaintenance(selector, isChecked, dataTables) {
    const resourceAccordionCollapsed = $(`${selector} div[id*="2ndAccordion"] .accordion-button`).hasClass('collapsed');
    const vendorAccordionCollapsed = $(`${selector} div[id*="3rdAccordion"] .accordion-button`).hasClass('collapsed');
    let cssObj;

    if (isChecked) {
      !resourceAccordionCollapsed &&
        $(`${selector} div[id*="2ndAccordion"] button.accordion-button`).click();
      !vendorAccordionCollapsed &&
        $(`${selector} div[id*="3rdAccordion"] button.accordion-button`).click();
      cssObj = {
        'pointer-events': 'none',
        'cursor': 'not-allowed',
        'opacity': '0.6'
      };
      $(`${selector} div[id*="2ndAccordion"]`).css(cssObj); // Resources table
      $(`${selector} div[id*="3rdAccordion"]`).css(cssObj); // Vendors table
      // Deselect rows
      dataTables.map(dt => {
        if (dt) {
          const dt_tr = dt.rows({ search: 'applied' }).nodes();
          dt_tr.each(function (node) {
            const line = $(node).find('input.dt-line-select');
            line.prop('checked', false).change();
          });
        }
      });
      // Deselect header row 1st column checkbox
      $(`${selector} div[id*="2ndAccordion"] .dt-head-center input.form-check-input`).prop('checked', false);
      $(`${selector} div[id*="3rdAccordion"] .dt-head-center input.form-check-input`).prop('checked', false);
    } else {
      !!resourceAccordionCollapsed &&
        $(`${selector} div[id*="2ndAccordion"] button.accordion-button`).click();
      !!vendorAccordionCollapsed &&
        $(`${selector} div[id*="3rdAccordion"] button.accordion-button`).click();
      cssObj = {
        'pointer-events': 'auto',
        'cursor': 'auto',
        'opacity': ''
      };
      $(`${selector} div[id*="2ndAccordion"]`).css(cssObj);
      $(`${selector} div[id*="3rdAccordion"]`).css(cssObj);
    }
  }

  static _setAllDayResourceTime(selector) {
    $(`${selector} .starttime-row`).val('08:00');
    $(`${selector} .endtime-row`).val('18:00');
  }

  static draggedResourceHasConflictEvent(eventId, date, time, resourceId) {
    // console.log('draggedResourceHasConflictEvent args', arguments);
    const start = moment(`${date.start} ${time.start}`);
    const end = moment(`${date.end} ${time.end}`);
    const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = `${event.date.start} ${event.time.start}`;
      const eventEnd = `${event.date.end} ${event.time.end}`;
      return event.status.value !== 'COMPLETED' && event.id != eventId && (moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
    });
    // console.log('draggedResourceHasConflictEvent > conflictEvents', conflictEvents);
    return !!conflictEvents.length;
  }

  static draggedEventToNewResourceHasConflictEvent(date, time, resourceId) {
    const start = moment(`${date.start} ${time.start}`);
    const end = moment(`${date.end} ${time.end}`);
    const resourceEvents = events.filter(event => event.resources.map(resource => resource.employee.value).includes(resourceId));
    // console.log('>>>', { start: `${date.start} ${time.start}`, end: `${date.end} ${time.end}`, resourceEvents });
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = `${event.date.start} ${event.time.start}`;
      const eventEnd = `${event.date.end} ${event.time.end}`;
      const result = event.status.value !== 'COMPLETED' && (moment(eventStart).isBetween(start, end, null, '[]') || moment(eventEnd).isBetween(start, end, null, '[]'));
      /* console.log('EVENT', event, result, 'Check Conditions', {
        "event.status.value !== 'COMPLETED'": event.status.value !== 'COMPLETED',
        "moment(eventEnd).isBetween(start, end, null, '[]')": { eventEnd: `${event.date.end} ${event.time.end}`, start: `${date.start} ${time.start}`, end: `${date.end} ${time.end}`, result: moment(eventEnd).isBetween(start, end, null, '[]') },
        "moment(eventStart).isSameOrBefore(start)": { eventStart: `${event.date.start} ${event.time.start}`, start: `${date.start} ${time.start}`, result: moment(eventStart).isSameOrBefore(start) },
        "moment(eventEnd).isSameOrAfter(end)": { eventEnd: `${event.date.end} ${event.time.end}`, end: `${date.end} ${time.end}`, result: moment(eventEnd).isSameOrAfter(end) }
      }); */
      return result;
    });
    return !!conflictEvents.length;
  }

  static draggedAssetHasConflictEvent(eventId, date, time, resourceId) {
    // console.log('draggedAssetHasConflictEvent args', arguments);
    const start = moment(`${date.start} ${time.start}`);
    const end = moment(`${date.end} ${time.end}`);
    const resourceEvents = events.filter(event => event.assets.map(asset => asset.asset.value).includes(resourceId));
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = `${event.date.start} ${event.time.start}`;
      const eventEnd = `${event.date.end} ${event.time.end}`;
      return event.status.value !== 'COMPLETED' && event.id != eventId && (moment(eventEnd).isBetween(start, end, null, '[]') || moment(eventStart).isSameOrBefore(start) && moment(eventEnd).isSameOrAfter(end));
    });
    // console.log('draggedAssetHasConflictEvent > conflictEvents', conflictEvents);
    return !!conflictEvents.length;
  }

  static draggedEventToNewAssetHasConflictEvent(date, time, resourceId) {
    const start = moment(`${date.start} ${time.start}`);
    const end = moment(`${date.end} ${time.end}`);
    const resourceEvents = events.filter(event => event.assets.map(asset => asset.asset.value).includes(resourceId));
    const conflictEvents = resourceEvents.filter(event => {
      const eventStart = `${event.date.start} ${event.time.start}`;
      const eventEnd = `${event.date.end} ${event.time.end}`;
      const result = event.status.value !== 'COMPLETED' && (moment(eventStart).isBetween(start, end, null, '[]') || moment(eventEnd).isBetween(start, end, null, '[]'));
      /* console.log('EVENT', event, result, 'Check Conditions', {
        "event.status.value !== 'COMPLETED'": event.status.value !== 'COMPLETED',
        "moment(eventEnd).isBetween(start, end, null, '[]')": moment(eventEnd).isBetween(start, end, null, '[]'),
        "moment(eventStart).isSameOrBefore(start)": moment(eventStart).isSameOrBefore(start),
        "moment(eventEnd).isSameOrAfter(end)": moment(eventEnd).isSameOrAfter(end)
      }); */
      return result;
    });
    return !!conflictEvents.length;
  }

  static draggedJobHasConflictEventToResource(startDateTime, resourceType, resourceId = '') {
    const conflictEvents = events => {
      return events.filter(event => {
        const eventStart = moment(`${event.date.start} ${event.time.start}`);
        const eventEnd = moment(`${event.date.end} ${event.time.end}`);
        return event.status.value !== 'COMPLETED' && startDateTime.isSameOrAfter(eventStart) && startDateTime.isSameOrBefore(eventEnd);
      });
    }
    let resourceEvents = [];
    switch (resourceType) {
      case 'employee':
        resourceEvents = events
          .filter(event => event.resources.map(resource => resource.employee.value)
            .includes(resourceId));
        // console.log('draggedJobHasConflictEventToResource > conflictEvents', conflictEvents(resourceEvents));
        return !!conflictEvents(resourceEvents).length;
      case 'vendor':
        resourceEvents = events
          .filter(event => event.vendors.map(vendor => vendor.vendor.value)
            .includes(resourceId));
        return !!conflictEvents(resourceEvents).length;
      case 'asset':
        resourceEvents = events
          .filter(event => event.assets.map(asset => asset.asset.value)
            .includes(resourceId));
        return !!conflictEvents(resourceEvents).length;
    }
    return false;
  }

  static createEventRecord(payload, modalId) {
    console.log('----- [createEventRecord() -> PAYLOAD] -----', payload);
    Swal.fire({
      title: 'Create Event Record?',
      text: payload.woRef?.name ? `Create Event for Work Order : ${payload.woRef.name}` : '',
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
                    const messageTxt = `Event ${payload.eventData.title} [ID ${result.recordId}] has been created`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.NEW_EVENT, messageTxt);
                    $(`#${modalId}`).modal('hide');
                    window.location.reload();
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
                    const messageTxt = `Event ${payload.eventData.title} [ID ${payload.eventData.id}] has been updated`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.UPDATED_EVENT, messageTxt);
                    $(`#${modalId}`).modal('hide');
                    window.location.reload();
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

  static handleDeleteEventRecord() {
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
                    const messageTxt = `Event ${payload.eventData?.title || ''} [ID ${eventId}] has been deleted`;
                    Swal.fire({
                      title: 'Deleted!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.DELETED_EVENT, messageTxt);
                    window.location.reload();
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

  static completeEvent(payload, eventId) {
    Swal.fire({
      title: 'Complete Event?',
      text: `Complete Event [ID ${eventId}]`,
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
                `${suiteletUrl}&mode=completeEvent`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
              })
                .then(response => response.json())
                .then(result => {
                  if (result.code == 200) {
                    const messageTxt = `Event [ID ${eventId}] has been completed`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.UPDATED_EVENT, messageTxt);
                    window.location.reload();
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
            text: `Completing Event [ID ${eventId}]...`
          });
        }
      });
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
      title: `Event [ID ${eventId}] Reassign Resource?`,
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
                    const messageTxt = `Event [ID ${eventId}] has been reassigned from ${oldResourceName} to ${newResourceName}`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.UPDATED_EVENT, messageTxt);
                    window.location.reload();
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
  }

  static updateAssetAssignment(payload, eventInfo) {
    payload.newResource = eventInfo.newResource.extendedProps;
    console.log('----- [updateAssetAssignment() -> PAYLOAD] -----', { payload, eventInfo: eventInfo || '' });

    const eventId = eventInfo.event._def.publicId;
    const oldResourceName = eventInfo.oldResource.extendedProps.name;
    const newResourceName = payload.newResource.name;

    Swal.fire({
      title: `Event [ID ${eventId}] Asset Reassignment`,
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
                `${suiteletUrl}&mode=updateAssetAssignment`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
              })
                .then(response => response.json())
                .then(result => {
                  if (result.code == 200) {
                    const messageTxt = `Event [ID ${eventId}] has been reassigned from ${oldResourceName} to ${newResourceName}`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.UPDATED_EVENT, messageTxt);
                    window.location.reload();
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
            text: `Updating Work Order Asset [ID ${payload.id}]...`
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
    const eventId = eventInfo.event.extendedProps.id;
    const dateStart = moment(payload.date.start).format(DateFormat.IMPORT_DATE);
    const dateEnd = moment(payload.date.end).format(DateFormat.IMPORT_DATE);
    const timeStart = moment(`1/1/1999 ${payload.time.start}`).format(DateFormat.IMPORT_TIME);
    const timeEnd = moment(`1/1/1999 ${payload.time.end}`).format(DateFormat.IMPORT_TIME);

    Swal.fire({
      title: `Update Date/Time?`,
      text: `Update to ${dateStart} ${timeStart} - ${dateEnd} ${timeEnd}?`,
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
                    const messageTxt = `Event [ID ${eventId}] Date/Time has been updated to ${dateStart} ${timeStart} - ${dateEnd} ${timeEnd}`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.UPDATED_EVENT, messageTxt);
                    window.location.reload();
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

  static updateAssetDateTime(payload, eventInfo) {
    console.log('----- [updateAssetDateTime() -> PAYLOAD] -----', { payload, eventInfo: eventInfo || '' });
    const eventId = eventInfo.event.extendedProps.id;
    const dateStart = moment(payload.date.start).format(DateFormat.IMPORT_DATE);
    const dateEnd = moment(payload.date.end).format(DateFormat.IMPORT_DATE);
    const timeStart = moment(`1/1/1999 ${payload.time.start}`).format(DateFormat.IMPORT_TIME);
    const timeEnd = moment(`1/1/1999 ${payload.time.end}`).format(DateFormat.IMPORT_TIME);

    Swal.fire({
      title: `Update Date/Time`,
      text: `Update to ${dateStart} ${timeStart} - ${dateEnd} ${timeEnd}?`,
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
                `${suiteletUrl}&mode=updateAssetDateTime`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
              })
                .then(response => response.json())
                .then(result => {
                  if (result.code == 200) {
                    const messageTxt = `Event [ID ${eventId}] Date/Time has been updated to ${dateStart} ${timeStart} - ${dateEnd} ${timeEnd}`;
                    Swal.fire({
                      title: 'Success!',
                      text: messageTxt,
                      icon: 'success',
                      showConfirmButton: false,
                      allowOutsideClick: false
                    });
                    Cache.set(SessionKey.UPDATED_EVENT, messageTxt);
                    window.location.reload();
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
            text: `Updating Work Order Asset [ID ${payload.id}] Date/Time...`
          });
        } else {
          if (eventInfo) {
            eventInfo.revert();
          }
        }
      });
  }
}

export function handleDropDownOptions() {
  // Toggle dropdown on click
  $(document).on('click', '.dropdown', function (event) {
    event.stopPropagation(); // Prevent immediate closing
    $('.dropdown-content').not($(this).find('.dropdown-content')).hide(); // Hide other dropdowns
    $(this).find('.dropdown-content').toggle(); // Show/Hide current dropdown
  });
  // Close dropdown when clicking outside
  $(document).on('click', function () {
    $('.dropdown-content').hide();
  });
}

export function handleWorkOrderAction() {
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
            const messageTxt = `Work Order [ID ${woId}] Status has been set to Hold`;
            Swal.fire({
              title: 'Success!',
              text: messageTxt,
              icon: 'success',
              showConfirmButton: false,
              allowOutsideClick: false
            });
            Cache.set(SessionKey.UPDATED_WO_STATUS, messageTxt);
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
            const messageTxt = `Work Order [ID ${woId}] Status has been set to Closed`;
            Swal.fire({
              title: 'Success!',
              text: messageTxt,
              icon: 'success',
              showConfirmButton: false,
              allowOutsideClick: false
            });
            Cache.set(SessionKey.UPDATED_WO_STATUS, messageTxt);
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

export class ToolTip {
  static setup() {
    this.remove();
    $('[data-bs-toggle="tooltip"]').each(function () {
      new bootstrap.Tooltip(this, {
        html: true,
        placement: 'right'
      });
    });
  }
  static remove() {
    $('.tooltip').remove();
  }
}

export class WarningAlert {
  static conflictSchedule() {
    Swal.fire(
      "Oops! There's a scheduling conflict.",
      `Another event overlaps with your selected date and time. Try adjusting the time or checking the calendar for availability.`,
      'warning'
    );
  }
  // TBD
}

function hideCustomLoader() {
  $(`#calendarSection .spinner`).hide();
  $(`#calendarSection .main-container`).css('display', 'block');
}