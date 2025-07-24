/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 * 
 * Helper functions
 */
define(['N/runtime', './moment.min'], (runtime, moment) => {

  return {
    /**
     * Converts a comma-separated string into an array of non-empty values.
     *
     * @param {string} str - The comma-separated string input.
     * @returns {string[]} An array of trimmed, non-empty string values.
     */
    stringToArray(str) {
      return (str || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    },

    /**
     * Formats a date string using the current user's date format.
     *
     * @param {string} dateStr - The input date string.
     * @returns {string} The formatted date string or an empty string if input is invalid.
     */
    toDate(dateStr) {
      return dateStr ? moment(dateStr).format(this.dateFormat()) : '';
    },

    /**
     * Formats a date string with an optional time string using the current user's date format.
     *
     * @param {string} dateStr - The input date string.
     * @param {string} timeStr - The input time string (e.g., '14:30').
     * @returns {string} The formatted date-time string.
     */
    toDateTimez(dateStr, timeStr) {
      if (!dateStr) return '';
      return moment(`${dateStr} ${timeStr}`)._d;
    },

    /**
     * Gets the current NetSuite user's preferred date format.
     *
     * @returns {string} The user's date format (e.g., 'MM/DD/YYYY').
     */
    dateFormat() {
      const user = runtime.getCurrentUser();
      return user.getPreference({ name: 'DATEFORMAT' });
    },

    /**
     * Calculates the difference between two dates in various time units.
     *
     * @param {string|Date} start - The start date.
     * @param {string|Date} end - The end date.
     * @returns {Object} An object with year, month, week, day, hour, minute, and second differences.
     */
    diffDates(start, end) {
      start = new Date(start).getTime();
      end = new Date(end).getTime();
      let d = Math.abs(end - start) / 1000;
      const r = {};
      const s = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };
      Object.keys(s).forEach(function (key) {
        r[key] = Math.floor(d / s[key]);
        d -= r[key] * s[key];
      });
      return r;
    },

    /**
     * Converts hours and minutes into a decimal representation.
     *
     * @param {number} hours - The number of hours.
     * @param {number} minutes - The number of minutes.
     * @returns {number} Time in decimal hours.
     */
    convertTimeToDecimal(hours, minutes) {
      const totalMinutes = (hours * 60) + minutes;
      return totalMinutes / 60;
    },

    /**
     * Deep copies a given object.
     *
     * @param {Object} obj - The object to deep copy.
     * @returns {Object} A deep copy of the input object.
     */
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  };
});
