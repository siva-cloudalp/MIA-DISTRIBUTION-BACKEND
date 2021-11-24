/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="BecomeA.Model"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts"/>
// @module Account.Register.Model

import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import TransactionModel = require('../../../Commons/Transaction/JavaScript/Transaction.Model');

// @class Account.Register.Model
// Sends user input data to the register service
// validating fields before they are sent
// [Backbone.validation](https://github.com/thedersen/backbone.validation)
// @extend Backbone.Model
const BecomeAModel: any = TransactionModel.extend({
    // @property {String} urlRoot
    urlRoot: Utils.getAbsoluteUrl('services/BecomeA.Partner.Service.ss'),

    // @property {Object} validation. Backbone.Validation attribute used for validating the form before submit.
    validation: {
        
    }
});

export = BecomeAModel;
