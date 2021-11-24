/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="BecomeAPartner"/>

// import DownloadView = require('./Download.View');
import BecomeAPartView =require('./BecomeAPart.View');
// @class Home @extends ApplicationModule
export = {
    mountToApp: function(application) {
        //const homeCMSTemplate = home_cms_tpl;
        const pageType = application.getComponent('PageType');

        pageType.registerPageType({
            name: 'become-a-partner',
            routes: ['become-a-partner'],
            view: BecomeAPartView,

            
        });

    }
};
