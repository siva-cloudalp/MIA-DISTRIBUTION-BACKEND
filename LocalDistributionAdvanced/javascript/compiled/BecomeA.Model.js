/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("BecomeA.Model", ["require", "exports", "Utils", "Transaction.Model"], function (require, exports, Utils, TransactionModel) {
    "use strict";
    // @class Account.Register.Model
    // Sends user input data to the register service
    // validating fields before they are sent
    // [Backbone.validation](https://github.com/thedersen/backbone.validation)
    // @extend Backbone.Model
    var BecomeAModel = TransactionModel.extend({
        // @property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl('services/BecomeA.Partner.Service.ss'),
        // @property {Object} validation. Backbone.Validation attribute used for validating the form before submit.
        validation: {}
    });
    return BecomeAModel;
});

//# sourceMappingURL=BecomeA.Model.js.map
