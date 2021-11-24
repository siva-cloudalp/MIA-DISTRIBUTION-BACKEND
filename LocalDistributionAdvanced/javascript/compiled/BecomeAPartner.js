/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("BecomeAPartner", ["require", "exports", "BecomeAPart.View"], function (require, exports, BecomeAPartView) {
    "use strict";
    return {
        mountToApp: function (application) {
            //const homeCMSTemplate = home_cms_tpl;
            var pageType = application.getComponent('PageType');
            pageType.registerPageType({
                name: 'become-a-partner',
                routes: ['become-a-partner'],
                view: BecomeAPartView,
            });
        }
    };
});

//# sourceMappingURL=BecomeAPartner.js.map
