/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("GetInTouch.View", ["require", "exports", "underscore", "get_in_touch.tpl", "Utils", "Loggers", "GlobalViews.Message.View", "Backbone.View", "GetIn.Touch.Model", "Backbone.FormView"], function (require, exports, _, get_in_touch_tpl, Utils, Loggers_1, GlobalViews_Message_View_1, BackboneView, GetInTouchModel, BackboneFormView) {
    "use strict";
    // @module Contact.View @extends Backbone.View
    var GetInTouchView = BackboneView.extend({
        template: get_in_touch_tpl,
        title: Utils.translate('Get in Touch'),
        page_header: Utils.translate('Get in Touch'),
        attributes: {
            id: 'get-in-touch-landing-page',
            class: 'get-in-touch-landing-page'
        },
        events: {
            'submit form': 'submitForm',
            'click [data-action="validate"]': 'validateFields',
        },
        bindings: {
            '[name="firstname"]': 'firstname',
            '[name="lastname"]': 'lastname',
            '[name="email"]': 'email',
            '[name="phone"]': 'phone',
            '[name="comments"]': 'comments',
            '[name="business"]': 'business'
        },
        initialize: function () {
            this.model = new GetInTouchModel();
            this.model.on('save', _.bind(this.showSuccess, this));
            this.model.on('saveCompleted', _.bind(this.resetForm, this));
            BackboneFormView.add(this);
        },
        resetForm: function (event) {
            this.model.unset('firstname');
            this.model.unset('lastname');
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
                    //  console.log(success);
                    if (success.id) {
                        self.showMessage(Utils.translate("Your form has been submitted"), 'success');
                    }
                    else {
                        self.showMessage(Utils.translate("Something went wrong try later"), 'error');
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
                    closable: true,
                });
                this.$('[data-type="alert-placeholder"]').html(global_view_message.render().$el.html());
            }
            else {
                var globa_view_message = new GlobalViews_Message_View_1.GlobalViewsMessageView({
                    message: message,
                    // message:message,
                    type: 'success',
                    closable: true,
                });
                this.$('[data-type="alert-placeholder"]').html(globa_view_message.render().$el.html());
            }
        },
        // @method getContext @return Contact.View.Context
        getContext: function () {
            return {};
        }
    });
    return GetInTouchView;
});

//# sourceMappingURL=GetInTouch.View.js.map
