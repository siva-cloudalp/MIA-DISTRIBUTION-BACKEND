/// <amd-module name="AboutUs.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>
define("AboutUs.View", ["require", "exports", "aboutus.tpl", "Utils", "Backbone.View"], function (require, exports, aboutus_tpl, Utils, BackboneView) {
    "use strict";
    // @module Download.View @extends Backbone.View
    var AboutUsView = BackboneView.extend({
        template: aboutus_tpl,
        className: 'AboutView',
        title: Utils.translate('Aboutus'),
        page_header: Utils.translate('Aboutus'),
        attributes: {
            id: 'Aboutus-page',
            class: 'About-page'
        },
        events: {},
        bindings: {},
        getContext: function () {
            console.log('Hello world! 🌍👋');
            return {
                message: 'Hello world! 🌍👋',
            };
        }
    });
    return AboutUsView;
});

//# sourceMappingURL=AboutUs.View.js.map
