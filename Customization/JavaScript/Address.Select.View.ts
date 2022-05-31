
/// <amd-module name="Address.Select.View"/>

import * as _ from 'underscore';
import '../../../Commons/Utilities/JavaScript/Utils';
import * as address_select_tpl from 'address_select.tpl';

import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import Configuration = require('../../../Commons/Utilities/JavaScript/SC.Configuration');

// @class Address.View @extend Backbone.View
const AddressSelectView: any = BackboneView.extend({
    // @property {Function} template
    template: address_select_tpl,

    // @property {Object} attributes
    attributes: {
        class: 'AddressSelectView'
    },
	getAddressList: function() {
		
		var addressOptions = this.options.addressListOptions;
		var addressList = [];
		
		_.each(this.collection || [],function(address:any){
					
			const label = address.get('label');
			const company =
				Configuration.get('siteSettings.registration.displaycompanyfield') === 'T'
					? address.get('company')
					: null;
			const fullname = address.get('fullname');
			const countries = Configuration.get('siteSettings.countries', []);
			const country_object = countries[address.get('country')];
			const country = country_object ? country_object.name : address.get('country');
			const state_object = country_object && country_object.states ? <any>_.findWhere(
						  countries[address.get('country')].states,
						  {
							  code: address.get('state')
						  }
					  ) : null;
			const state = state_object ? state_object.name : address.get('state');
			const invalidAttributes = address.getInvalidAttributes() || [];
			// @class Address.View.Context
			var obj = {
				// @property {String} internalid
				internalid: address.get('internalid'),
				// @property {Boolean} isManageOptionsSpecified
				isManageOptionsSpecified: !!addressOptions.manage,
				// @property {String} manageOption
				manageOption: addressOptions.manage,
				// @property {Boolean} showMultiSelect
				showMultiSelect: addressOptions.showMultiSelect,
				// @property {Boolean} isAddressCheck
				isAddressCheck: !!address.get('check'),
				// @property {String} title
				title: label || company || fullname,
				// @property {Boolean} showCompanyAndFullName
				showCompanyAndFullName: !!(label && company),
				// @property {String} company
				company: company,
				// @property {String} fullname
				fullname: fullname,
				// @property {Boolean} showFullNameOnly
				showFullNameOnly: !!(label ? !company : company),
				// @property {String} addressLine1
				addressLine1: address.get('addr1'),
				// @property {Boolean} showAddressLine1
				showAddressLine1: !!address.get('addr2'),
				// @property {String} addressLine2
				addressLine2: address.get('addr2'),
				// @property {String} city
				city: address.get('city'),
				// @property {Boolean} showState
				showState: !!address.get('state'),
				// @property {String} state
				state: state,
				// @property {String} zip
				zip: address.get('zip'),
				// @property {String} country
				country: country,
				// @property {String} phone
				phone: address.get('phone'),
				// @property {Boolean} showDefaultLabels
				isSelected:
					addressOptions.hideSelector ||
					address.get('internalid') === addressOptions.selectedAddressId,
				// @property {Boolean} showSelector
				showSelector: !addressOptions.hideSelector,
				// @property {Boolean} isNewAddress
				isNewAddress: address.get('internalid') < 0
			};
		
			if(!obj.isNewAddress)
				addressList.push(obj);
		});
		return addressList;
    },

    // @method getContext @return Address.View.Context
    getContext: function() {
      var addressList = this.getAddressList();

        // @class Address.View.Context
        return {
			showSelect: addressList.length > 0,
            addressList: addressList
        };
    }
});
export = AddressSelectView;
