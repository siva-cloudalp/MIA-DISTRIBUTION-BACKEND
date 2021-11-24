/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("ValueAdd.View", ["require", "exports", "value_add_services.tpl", "Utils", "Backbone.View"], function (require, exports, value_add_services, Utils, BackboneView) {
    "use strict";
    // @module Contact.View @extends Backbone.View
    var ValueAddServicesView = BackboneView.extend({
        template: value_add_services,
        title: Utils.translate('Value Add Services'),
        page_header: Utils.translate('Value Add Services'),
        attributes: {
            id: 'value-add-services-landing-page',
            class: 'value-add-services-landing-page'
        },
        events: {},
        // @method getContext @return Contact.View.Context
        getContext: function () {
            // console.log("hello-world");
            return {};
        }
    });
    return ValueAddServicesView;
});

//# sourceMappingURL=ValueAdd.View.js.map
