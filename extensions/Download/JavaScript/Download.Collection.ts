/// <amd-module name="Download.Collection"/>
   
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import TransactionCollection = require('../../../Commons/Transaction/JavaScript/Transaction.Collection');
import DownloadModel = require('./Download.Model');

// @class Download.Collection @extend Transaction.Collection
const DownloadCollection: any = TransactionCollection.extend({
    // @property {Download.Model} model
    model: DownloadModel,
    // @property {Boolean} cacheSupport enable or disable the support for cache (Backbone.CachedModel)
    cacheSupport: false,
    // @property {String} url
    url: Utils.getAbsoluteUrl('services/Download.Service.ss'),

    initialize: function(models, options) {
        TransactionCollection.prototype.initialize.apply(this, arguments);

        this.customFilters = options && options.filters;
    },

    // @method parse Handle the response from the back-end to properly manage total records found value
    // @param {Object} response JSON Response from the back-end service
    // @return {Array<Object>} List of returned records from the back-end
    parse: function(response) {
        this.totalRecordsFound = response.totalRecordsFound;
        this.recordsPerPage = response.recordsPerPage;

        return response.records;
    },

    // @method update Method called by ListHeader.View when applying new filters and constrains
    // @param {Collection.Filter} options
    // @return {Void}
    update: function(options) {
        console.log(options)
        console.log("collection file")

        const range = options.range || {};
        const data = {
            filter: this.customFilters || (options.filter && options.filter.value),
            sort: options.sort.value,
            order: options.order,
            from: range.from,
            to: range.to,
            page: options.page
        };

        this.fetch({
            data: data,
            reset: true,
            killerId: options.killerId
        });

        console.log(this)
    }
});

export = DownloadCollection;


