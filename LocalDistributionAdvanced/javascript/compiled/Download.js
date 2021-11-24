/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define("Download", ["require", "exports", "Download.View", "MyAccountMenu", "Utils"], function (require, exports, DownloadView, MyAccountMenu_1, Utils) {
    "use strict";
    return {
        mountToApp: function (application) {
            //const homeCMSTemplate = home_cms_tpl;
            var pageType = application.getComponent('PageType');
            pageType.registerPageType({
                name: 'Download',
                routes: ['Download'],
                view: DownloadView,
                defaultTemplate: {
                    name: 'Download.tpl',
                    displayName: 'Download Default',
                }
            });
            var myAccountMenu = MyAccountMenu_1.MyAccountMenu.getInstance();
            myAccountMenu.addSubEntry({
                entryId: 'orders',
                id: 'Download',
                name: Utils.translate('Downloadable Content'),
                url: 'Download',
                index: 7,
                permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
            });
        }
    };
});

//# sourceMappingURL=Download.js.map
