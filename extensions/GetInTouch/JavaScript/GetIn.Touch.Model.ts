/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="GetIn.Touch.Model"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts"/>
// @module Account.Register.Model

import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');

// @class Account.Register.Model
// Sends user input data to the register service
// validating fields before they are sent
// [Backbone.validation](https://github.com/thedersen/backbone.validation)
// @extend Backbone.Model
const GetInTouchModel: any = Backbone.Model.extend({
    // @property {String} urlRoot
    urlRoot: Utils.getAbsoluteUrl('services/GetIn.Touch.Service.ss'),

    // @property {Object} validation. Backbone.Validation attribute used for validating the form before submit.
    validation: {
        firstname: {
            required: true,
            // pattern:'string',
            msg: Utils.translate('First Name is required')
        },
        lastname: {
           
            required:true,
            
            msg: Utils.translate('Last Name is required')
            
        },
        email: {
            required: true,
            pattern: 'email',
            msg: Utils.translate('Valid Email is required')
        },
        phone: {
            required:true,
            fn: Utils.validatePhone,
        }
       
    }
});

export = GetInTouchModel;
