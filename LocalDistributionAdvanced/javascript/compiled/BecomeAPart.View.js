/// <amd-module name="BecomeAPart.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>
define("BecomeAPart.View", ["require", "exports", "underscore", "become_a_partner.tpl", "Utils", "Loggers", "GlobalViews.Message.View", "Backbone.View", "BecomeA.Model", "Backbone.FormView", "Quote.ListExpirationDate.View"], function (require, exports, _, become_a_partner_tpl, Utils, Loggers_1, GlobalViews_Message_View_1, BackboneView, BecomeAModel, BackboneFormView) {
    "use strict";
    // @module Download.View @extends Backbone.View
    var BecomeAPartView = BackboneView.extend({
        template: become_a_partner_tpl,
        className: 'BecomeAPartner',
        title: Utils.translate('Become A Partner'),
        page_header: Utils.translate('Become A Partner'),
        attributes: {
            id: 'become-a-partner-landing-page',
            class: 'become-a-partner-landing-page'
        },
        events: {
            'click [data-action="validate"]': 'validateFields',
        },
        bindings: {
            '[name="firstname"]': 'firstname',
            '[name="lastname"]': 'lastname',
            // '[name="name"]': 'name',
            '[name="email"]': 'email',
            '[name="phone"]': 'phone',
            '[name="comments"]': 'comments',
            '[name="business"]': 'business'
        },
        initialize: function () {
            this.model = new BecomeAModel();
            this.model.on('save', _.bind(this.showSuccess, this));
            this.model.on('saveCompleted', _.bind(this.resetForm, this));
            BackboneFormView.add(this);
        },
        resetForm: function (event) {
            this.model.unset('firstname');
            this.model.unset('lastname');
            // this.model.unset('name');
            this.model.unset('email');
            this.model.unset('phone');
            this.model.unset('comments');
            this.model.unset('business');
            event && event.preventDefault();
        },
        showSuccess: function () {
            if (this.$savingForm) {
                var global_view_message = new GlobalViews_Message_View_1.GlobalViewsMessageView({
                    message: Utils.translate("Your's request is submitted and Thank you for contacting us"),
                    type: 'success',
                    closable: true
                });
            }
        },
        validateFields: function (e, model, props) {
            var self = this;
            var loggers = Loggers_1.Loggers.getLogger();
            var actionId = loggers.start('get-in-touch-submit form');
            var promise = self.saveForm(e, model, props);
            if (promise) {
                promise.done(function () {
                    loggers.end(actionId, {
                        operationIds: self.model.getOperationIds(),
                        status: 'success'
                    });
                });
                return promise && promise.then(function (success) {
                    if (success.successmessage) {
                        self.showMessage(success.successmessage, 'success');
                    }
                    else {
                        self.showMessage(success.message, 'error');
                    }
                }, function (fail) {
                    fail.preventDefault = true;
                    _.each(fail.responseJSON.errormessage, function (message, field) {
                        self.showMessage(message, 'error', field);
                    });
                });
            }
            else {
            }
        },
        showMessage: function (message, type, field) {
            if (type === 'error') {
                var global_view_message = new GlobalViews_Message_View_1.GlobalViewsMessageView({
                    message: message,
                    // message:message,
                    type: 'error',
                    closable: true
                });
                this.$('[data-type="alert-placeholder"]').append(global_view_message.render().$el.html());
            }
            else {
                var globa_view_message = new GlobalViews_Message_View_1.GlobalViewsMessageView({
                    message: message,
                    // message:message,
                    type: 'success',
                    closable: true
                });
                this.$('[data-type="alert-placeholder"]').append(globa_view_message.render().$el.html());
            }
        },
        // @method getContext @return Contact.View.Context
        getContext: function () {
            console.log("hello");
            return {};
        }
    });
    return BecomeAPartView;
});

//# sourceMappingURL=BecomeAPart.View.js.map
