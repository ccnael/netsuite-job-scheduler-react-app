/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/runtime', 'N/file', 'N/url', './esp_cm_scheduler'],
  /**
   * @param{runtime} runtime
   * @param{file} file
   * @param{url} url
   */
  (runtime, file, url, mod) => {
    /**
     * Defines the function definition that is executed before record is loaded.
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
     * @param {Form} scriptContext.form - Current form
     * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
     * @since 2015.2
     */
    const beforeLoad = (scriptContext) => {
      try {
        const { form, newRecord: rec, type: eventType } = scriptContext;
        const { type, id } = rec;

        if (eventType == 'view') {
          const woId = rec.getValue({ fieldId: 'custevent_esp_fop_work_order' });
          const htmlStr = mod.Event.completeEventTemplateString(id, woId);

          form.addField({
            id: 'custpage_inlinehtml',
            label: ' ',
            type: 'inlinehtml'
          }).defaultValue = htmlStr;

          form.addButton({
            id: 'custpage_completeevent_button',
            label: 'Complete Event',
            functionName: `$('#event-modal').modal('toggle');`
          });
        }
      } catch (e) {
        log.error('beforeLoad Unexpected Error', e.message);
      }
    }

    /**
     * Defines the function definition that is executed before record is submitted.
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
     * @since 2015.2
     */
    const beforeSubmit = (scriptContext) => {

    }

    /**
     * Defines the function definition that is executed after record is submitted.
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
     * @since 2015.2
     */
    const afterSubmit = (scriptContext) => {

    }

    return {
      beforeLoad,
      beforeSubmit,
      afterSubmit
    }

  });