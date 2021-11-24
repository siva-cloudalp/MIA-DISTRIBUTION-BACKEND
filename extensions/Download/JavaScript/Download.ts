/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Download"/>
//import * as home_cms_tpl from 'home_cms.tpl';
//import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import DownloadView = require('./Download.View');
import { MyAccountMenu } from '../../../Advanced/Header/JavaScript/MyAccountMenu';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
// @class Home @extends ApplicationModule
export = {
    mountToApp: function(application) {
        //const homeCMSTemplate = home_cms_tpl;
        const pageType = application.getComponent('PageType');

        pageType.registerPageType({
            name: 'Download',
            routes: ['Download'],
            view: DownloadView,

            defaultTemplate: {
                name:'Download.tpl',
                displayName: 'Download Default',
                
            }
        });

        const myAccountMenu = MyAccountMenu.getInstance();

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
