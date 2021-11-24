/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("Home.View", ["require", "exports", "underscore", "home.tpl", "Utils", "jQuery", "Backbone.View", "GetIn.Touch.Model", "Backbone.FormView", "GlobalViews.Message.View", "Loggers"], function (require, exports, _, home_tpl, Utils, jQuery, BackboneView, GetInTouchModel, BackboneFormView, GlobalViews_Message_View_1, Loggers_1) {
    "use strict";
    // @module Home.View @extends Backbone.View
    var HomeView = BackboneView.extend({
        template: home_tpl,
        title: Utils.translate('Welcome to the store'),
        page_header: Utils.translate('Welcome to the store'),
        attributes: {
            id: 'home-page',
            class: 'home-page'
        },
        events: {
            'submit form': 'submitForm',
            'click [data-action=slide-carousel]': 'carouselSlide',
            'click [data-action="submitcontent"]': 'homeForm'
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
            this.model = new GetInTouchModel();
            this.model.on('save', _.bind(this.showSuccess, this));
            this.model.on('saveCompleted', _.bind(this.resetForm, this));
            BackboneFormView.add(this);
        },
        homeForm: function (e, model, prop) {
            var self = this;
            var loggers = Loggers_1.Loggers.getLogger();
            var actionId = loggers.start('get-in-touch-submit form');
            var promise = self.saveForm(e, model, prop);
            // console.log(promise);
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
        destroy: function () {
            BackboneView.prototype.destroy.apply(this, arguments);
            jQuery(window).off('resize', this._windowResizeHandler);
            this.options.application.getLayout().off('afterAppendView', this.initSlider, this);
        },
        // @method getContext @return Home.View.Context
        getContext: function () {
            return {
                imageHomeSize: Utils.getViewportWidth() < 768 ? 'homeslider' : 'main',
                // @property {String} imageHomeSizeBottom
                imageHomeSizeBottom: Utils.getViewportWidth() < 768 ? 'homecell' : 'main',
            };
        }
    });
    return HomeView;
});

//# sourceMappingURL=Home.View.js.map
