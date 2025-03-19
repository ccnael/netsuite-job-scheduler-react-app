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
      `Another event overlaps with your selected date and time.<br/>Try adjusting the time or checking the calendar for availability.`,
      'warning'
    );
  },
  invalidResizedCalendarEvent() {
    Swal.fire({
      title: "Invalid Date/Time",
      html: `
        <ul style="text-align: left; margin-left: 20px;">
          <li>The resource start date/time cannot be earlier than event start date/time<br/></li>
          <li>The resource end time cannot exceed event end date/time</li>
        </ul>
        <p style="text-align: center;">Please adjust the event accordingly.</p>
      `,
      icon: "warning",
      customClass: {
        popup: "swal-wide", // Optional: Adjust width if needed
      }
    });
  }
}