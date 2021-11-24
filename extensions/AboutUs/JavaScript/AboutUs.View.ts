/// <amd-module name="AboutUs.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>


import * as _ from 'underscore';
import * as aboutus_tpl from 'aboutus.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import { Configuration } from '../../../Commons/Utilities/JavaScript/Configuration';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

// @module Download.View @extends Backbone.View
const AboutUsView: any = BackboneView.extend({
    template: aboutus_tpl,
   
    className: 'AboutView',

    title: Utils.translate('Aboutus'),

    page_header: Utils.translate('Aboutus'),

    attributes: {
        id: 'Aboutus-page',
        class: 'About-page'
    },

    events: {},
    
    bindings:{},  


    getContext: function() {
     

        console.log('Hello world! 🌍👋')
      
        return {
            message: 'Hello world! 🌍👋',
          
        // columns: columns
        };
    }
});

export = AboutUsView;
