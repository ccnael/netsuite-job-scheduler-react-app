/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(['N/search'], (search) => {
  /**
   * Get the list of assets
   * @param {Object} context Suitelet object
   */
  function getAssets(context) {
    const { request, response } = context;
    const { parameters: params } = request;
    const { start, end } = params;

    const searchObj = search.create({
      type: 'customrecord_esp_fop_asset',
      filters:
        [
          ['isinactive', 'is', 'F']
        ],
      columns:
        [
          search.createColumn({ name: 'name', label: 'Name' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_type', label: 'Asset Type' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_description', label: 'Description' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_quantity', label: 'Quantity' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_quantity_remain', label: 'Quantity Remaining' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_owned', label: 'Asset Owned' }),
          search.createColumn({ name: 'custrecord_erp_fop_asset_is_consumable', label: 'Consumable' }),
          search.createColumn({ name: 'custrecord_esp_fop_is_maintenance', label: 'Asset on Maintenance' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_qty_used', label: 'Quantity Used' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_start_date', label: 'Start Date' }),
          search.createColumn({ name: 'custrecord_esp_fop_asset_end_date', label: 'End Date' }),
        ]
    });

    const searchResult = searchObj
      .run()
      .getRange({
        start: +start,
        end: +end
      });

    const assets = searchResult.map((map) => ({
      id: map.id,
      name: map.getValue('name'),
      get initials() {
        return this.name[0]
      },
      get asset() {
        return {
          text: this.name,
          value: this.id
        }
      },
      onMaintenance: map.getValue('custrecord_esp_fop_is_maintenance'),
      description: map.getValue('custrecord_esp_fop_asset_description'),
      type: {
        text: map.getText('custrecord_esp_fop_asset_type'),
        value: map.getValue('custrecord_esp_fop_asset_type')
      },
      quantity: 0,
      maxQuantity: +map.getValue('custrecord_esp_fop_asset_quantity'),
      quantityRemaining: +map.getValue('custrecord_esp_fop_asset_quantity_remain'),
      quantityUsed: +map.getValue('custrecord_esp_fop_asset_qty_used'),
      owned: map.getValue('custrecord_esp_fop_asset_owned'),
      consumable: map.getValue('custrecord_erp_fop_asset_is_consumable'),
      events: [], // Will be updated in the front end side once events data is fetched
      time: {
        start: '',
        end: ''
      },
      get active() {
        return this.quantityRemaining > 0;
      }
    }));

    response.setHeader({
      name: 'Content-Type',
      value: 'application/json'
    });

    log.audit('----- [Assets & Equipments] -----', assets.length);
    response.write(JSON.stringify(assets));
  }

  return {
    getAssets
  }
})