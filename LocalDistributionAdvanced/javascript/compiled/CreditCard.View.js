/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("CreditCard.View", ["require", "exports", "underscore", "creditcard.tpl", "Configuration", "CreditCard.Edit.Form.SecurityCode.View", "Backbone.FormView", "Backbone.View"], function (require, exports, _, creditcard_tpl, Configuration_1, CreditCardEditFormSecurityCodeView, BackboneFormView, BackboneView) {
    "use strict";
    // @class CreditCard.View @extends Backbone.View
    var CreditCardView = BackboneView.extend({
        template: creditcard_tpl,
        initialize: function (options) {
            this.options = options;
            if (this.options.showSecurityCodeForm) {
                this.model.set('hasSecurityCode', true);
                this.bindings = {
                    '[name="ccsecuritycode"]': 'ccsecuritycode'
                };
                this.events = {
                    'submit form': 'doNothing'
                };
                BackboneFormView.add(this);
            }
        },
        childViews: {
            'CreditCard.Edit.Form.SecurityCode': function () {
                return new CreditCardEditFormSecurityCodeView({
                    error: this.options.securityNumberError,
                    showCreditCardHelp: this.options.showCreditCardHelp,
                    creditCardHelpTitle: this.options.creditCardHelpTitle
                });
            }
        },
        doNothing: function (e) {
            e.preventDefault();
        },
        // @method getContext @return CreditCard.View
        getContext: function () {
            var payment_methods = Configuration_1.Configuration.get('siteSettings.paymentmethods');
            var payment_method = this.model.get('paymentmethod').key
                ? _.findWhere(payment_methods, { key: this.model.get('paymentmethod').key })
                : _.findWhere(payment_methods, {
                    internalid: this.model.get('paymentmethod').internalid
                });
            var icon = payment_method && payment_method.imagesrc && payment_method.imagesrc[0];
            var expiration_month = this.model.get('expmonth');
            var expiration_year = !!this.model.get('expyear') && this.model.get('expyear').slice(2);
            var isSelected = this.options.hideSelector ||
                this.model.get('internalid') === this.options.selectedCreditCardId;
            // @class CreditCard.View
            return {
                // @property {String} creditCartId
                creditCartId: this.model.get('internalid'),
                // @property {Boolean} showSecurityCodeForm
                showSecurityCodeForm: !!this.options.showSecurityCodeForm && isSelected,
                // @property {String} showCreditCardImage
                showCreditCardImage: !!icon,
                // @property {String} creditCardImageUrl
                creditCardImageUrl: icon || '',
                // @property {String} paymentName
                paymentName: this.model.get('paymentmethod').name,
                // @property {String} ccnumber
                ccnumber: this.model.get('ccnumber').substring(this.model.get('ccnumber').length - 4),
                // @property {String} ccname
                ccname: this.model.get('ccname') || '',
                // @property {String} expirationDate
                expirationDate: (expiration_month < 10 ? '0' : '') + expiration_month + '/' + expiration_year,
                // @property {Boolean} showDefaults
                showDefaults: !!this.options.showDefaults,
                // @property {Boolean} isDefaultCreditCard
                isDefaultCreditCard: this.model.get('ccdefault') === 'T',
                // @property {Boolean} showSelect
                showSelect: !!this.options.showSelect,
                // @property {String} selectMessage
                selectMessage: this.options.selectMessage,
                // @property {Boolean} showActions
                showActions: !!this.options.showActions,
                // @property {Boolean} isSelected
                isSelected: isSelected,
                // @property {Boolean} showSelector
                showSelector: !this.options.hideSelector,
                // @property {Boolean} isNewPaymentMethod
                isNewPaymentMethod: this.model.get('internalid') < 0
            };
        }
    });
    return CreditCardView;
});

//# sourceMappingURL=CreditCard.View.js.map
