/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="ValueAdd.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import * as _ from 'underscore';
import * as value_add_services from 'value_add_services.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');

// @module Contact.View @extends Backbone.View
const ValueAddServicesView: any = BackboneView.extend({
    template: value_add_services,

    title: Utils.translate('Value Add Services'),

    page_header: Utils.translate('Value Add Services'),

    attributes: {
        id: 'value-add-services-landing-page',
        class: 'value-add-services-landing-page'
    },

    events: {
        
    },
    // @method getContext @return Contact.View.Context
    getContext: function() {
        // console.log("hello-world");
        
      return {
             
      };
    }
});

export = ValueAddServicesView;


