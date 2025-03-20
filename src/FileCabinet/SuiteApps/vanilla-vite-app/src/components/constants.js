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

export const WarningMessage = {
  conflictSchedule() {
    Swal.fire(
      "Oops! There's a scheduling conflict.",
      `Another event overlaps with your selected date and time.<br/>
      <br/>
      Try adjusting the time or checking the calendar for availability.`,
      'warning'
    );
  },
  sameRowDraggedEventConflict() {
    Swal.fire({
      title: "Invalid Date/Time",
      html: `
        The resource start date/time should be within the event schedule.<br/>
        <br/>
        Please adjust the event accordingly.
      `,
      icon: "warning",
      customClass: {
        popup: "swal-wide", // Optional: Adjust width if needed
      }
    });
  },
  eventResizeConflict() {
    Swal.fire({
      title: "Invalid Date/Time",
      html: `
        The resource start date/time should be within the event schedule.<br/>
        <br/>
        Please adjust the event accordingly.
      `,
      icon: "warning",
      customClass: {
        popup: "swal-wide", // Optional: Adjust width if needed
      }
    });
  }
}