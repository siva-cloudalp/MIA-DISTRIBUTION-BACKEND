/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("GetInTouch", ["require", "exports", "GetInTouch.View"], function (require, exports, GetInTouchView) {
    "use strict";
    return {
        mountToApp: function (application) {
            //const homeCMSTemplate = home_cms_tpl;
            var pageType = application.getComponent('PageType');
            pageType.registerPageType({
                name: 'landing-page',
                routes: ['get-in-touch'],
                view: GetInTouchView
            });
        }
    };
});

//# sourceMappingURL=GetInTouch.js.map