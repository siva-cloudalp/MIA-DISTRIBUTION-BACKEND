/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="ValueAddServices"/>
//import * as home_cms_tpl from 'home_cms.tpl';
//import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import ValueAddServicesView = require('./ValueAdd.View');

// @class Home @extends ApplicationModule
export = {
    mountToApp: function(application) {
        //const homeCMSTemplate = home_cms_tpl;
        const pageType = application.getComponent('PageType');

        pageType.registerPageType({
            name: 'landing-page',
            routes: ['values-added-services'],
            view: ValueAddServicesView
        });

    }
};
