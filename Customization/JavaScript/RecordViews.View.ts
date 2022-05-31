/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="RecordViews.View"/>

import * as _ from 'underscore';

import * as record_views_tpl from 'recordviews.tpl';

import BackboneCompositeView = require('../../../Commons/Backbone.CompositeView/JavaScript/Backbone.CompositeView');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

// @class RecordViews.View @extend BackboneView
const RecordViewsView: any = BackboneView.extend({
    // @property {Function} template
    template: record_views_tpl,

    // @method initialize
    // @param {RecordViews.View.Initialize} options
    // @return {Void}
    initialize: function() {
        this.extendChildViews();

        BackboneCompositeView.add(this);
    },

    // @property {Object} childViews
    childViews: {},

    // @method extendChildViews Internal method that based on the list of columns that the current model has, extend the childViews property object by adding
    // each of the composite views specified in the columns. Notice here that each column is of type RecordViews.View.Column
    // @return {Void}
    extendChildViews: function() {
        const self = this;

        _.each(self.model.get('columns'), function(column: any) {
            if (column.compositeKey) {
                const childView = {};
                childView['' + column.compositeKey] = function() {
                    return column.composite;
                };
                self.addChildViewInstances(childView);
            }
        });
    },

    // @method normalizeColumns Add the properties showLabel and isComposite to each of the RecordViews.View.Column of the current model.
    // @return {Array<RecordViews.View.Column>}
    normalizeColumns: function() {
		
		var columns = _.filter(this.model.get('columns'), function(column: any) {return (column.compositeKey != "OrderHistoryListTrackingNumberView");});
        return _.map(columns, function(column: any) {
            column.showLabel = !!column.label;
            column.isComposite = !!column.compositeKey;

			return column;
        });
    },

    // @method getContext @return {RecordViews.View.Context}
    getContext: function() {
        // @class RecordViews.View.Context
        return {
            // @property {Backbone.Model} model
            model: this.model,
            // @property {String} id
            id: this.model.id,
            // @property {Boolean} isNavigable
            isNavigable: _.isBoolean(this.model.get('isNavigable'))
                ? this.model.get('isNavigable')
                : true,
            // @property {Boolean} showInModal
            showInModal: _.isBoolean(this.model.get('showInModal'))
                ? this.model.get('showInModal')
                : false,
            // @property {String} touchpoint
            touchpoint: this.model.get('touchpoint') || 'customercenter',
            // @property {String} detailsURL
            detailsURL: this.options.referrer
                ? this.model.get('detailsURL') + '/' + this.options.referrer
                : this.model.get('detailsURL'),
            // @property {String} title
            title: this.model.get('title'),
            // @property {Array<RecordViews.View.Column>} columns
            columns: this.normalizeColumns()
        };
    }
});

export = RecordViewsView;

// @class RecordViews.View.Initialize
// @property {RecordViews.View.Initialize.Model} model

// @class RecordViews.View.Initialize.Model @extends Backbone.Model
// @property {String} id
// @property {Boolean?} isNavigable The default value is true
// @property {Boolean?} showInModal The default value is false
// @property {String?} touchpoint The default value is 'customercenter'
// @property {String} detailsURL
// @property {String} title
// @property {Array<RecordViews.View.Column>} columns

// @class RecordViews.View.Column
// @property {String} label
// @property {Boolean} showLabel This field is calculated
// @property {Boolean} isComposite This field is calculated
// @property {String} type
// @property {String} name
// @property {String|Number|Boolean} value
// @property {String} compositeKey
// @property {Backbone.View} composite In instance of a view
