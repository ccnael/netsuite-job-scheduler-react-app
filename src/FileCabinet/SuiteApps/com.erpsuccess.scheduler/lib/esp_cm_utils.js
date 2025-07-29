/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 *
 * Utility module providing URL resolvers and NetSuite record helpers.
 */
define([
  'N/runtime',
  'N/url',
  'N/file',
  'N/record',
  'N/config',
  './esp_cm_constants'
], (runtime, url, file, record, config, env) => {
  /**
   * Class containing methods to generate NetSuite record and script URLs.
   */
  class Url {
    /**
     * Returns the resolved URL of the ESP Scheduler Suitelet.
     * @returns {string} Suitelet URL
     */
    static suiteletUrl() {
      const script = runtime.getCurrentScript();
      return url.resolveScript({
        deploymentId: script.deploymentId,
        scriptId: script.id
      });
    }

    /**
     * Returns the resolved view URL for an Employee record.
     * @param {string} [recordId=''] - Employee internal ID
     * @returns {string} Record view URL
     */
    static resourceUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: record.Type.EMPLOYEE,
      });
    }

    /**
     * Returns the resolved view URL for a Work Order record.
     * @param {string} [recordId=''] - Work Order internal ID
     * @returns {string} Record view URL
     */
    static workOrderUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: env.RecordType.WORK_ORDER,
      });
    }

    /**
     * Returns the resolved view URL for a Sales Order record.
     * @param {string} [recordId=''] - Sales Order internal ID
     * @returns {string} Record view URL
     */
    static salesOrderUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: record.Type.SALES_ORDER
      });
    }

    /**
     * Returns the resolved view URL for a Project (Job) record.
     * @param {string} [recordId=''] - Job internal ID
     * @returns {string} Record view URL
     */
    static projectUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: record.Type.JOB
      });
    }

    /**
     * Returns the resolved view URL for a Calendar Event record.
     * @param {string} [recordId=''] - Event internal ID
     * @returns {string} Record view URL
     */
    static eventUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: record.Type.CALENDAR_EVENT
      });
    }

    /**
     * Returns the resolved view URL for a Contact record.
     * @param {string} [recordId=''] - Contact internal ID
     * @returns {string} Record view URL
     */
    static contactUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: record.Type.CONTACT
      });
    }

    /**
     * Returns the resolved view URL for a Customer record.
     * @param {string} [recordId=''] - Customer internal ID
     * @returns {string} Record view URL
     */
    static customerUrl(recordId = '') {
      return url.resolveRecord({
        isEditMode: false,
        recordId,
        recordType: record.Type.CUSTOMER
      });
    }
  }

  /**
   * Creates a log file from given contents and saves it to the same folder as a mockup file.
   * @param {Object} contents - The data to log
   */
  function createLogFile(contents) {
    try {
      const fileObj = file.load(env.AppFilePath.MOCKUP);
      const { name, folder } = fileObj;
      const fileId = file.create({
        name,
        fileType: file.Type.PLAINTEXT,
        contents: JSON.stringify(contents),
        folder,
      }).save();

      log.audit('Log File ID', fileId);
    } catch (e) {
      log.error('Log File Unexpected Error', e.message);
    }
  }

  /**
   * Deletes NetSuite records of a given type by internal ID.
   * Logs each deletion or error.
   *
   * @param {string} type - NetSuite record type
   * @param {string[]} ids - Array of internal IDs to delete
   */
  function deleteRecords(type, ids) {
    for (const id of ids) {
      try {
        record.delete({ type, id });
        log.audit('----- [Removed/Unlinked] -----', { type, id });
      } catch (e) {
        log.error('Error on Unlink > Delete', { type, id, errorMsg: e.message });
      }
    }
  }

  /**
   * Parses a date string and forces the time to 12:00 noon (local time),
   * to avoid timezone shifting issues (e.g., when storing in NetSuite).
   *
   * @param {string} dateStr - An ISO date string (e.g., "2025-07-09T00:00:00.000Z")
   * @returns {Date} A local Date object set to 12:00 noon on the same calendar day
   */
  function parseDate(dateStr) {
    return new Date(`${dateStr.split('T')[0]}T12:00:00`);
  }

  return {
    Url,
    createLogFile,
    deleteRecords,
    parseDate
  };
});
