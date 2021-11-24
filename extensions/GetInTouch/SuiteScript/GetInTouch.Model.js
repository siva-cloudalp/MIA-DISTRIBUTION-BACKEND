/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/





// @module contact
// ----------
// Handles form submit for customer
// module contact
define('GetInTouch.Model', [
    'SC.Model',
    'Utils',
    'SC.Models.Init',
    'Profile.Model',
    'LiveOrder.Model',
    'Address.Model',
    'CreditCard.Model',
    'SiteSettings.Model',
    'underscore'
], function(
    SCModel,
    Utils,
    Application,
    ModelsInit,
    Profile,
    LiveOrder,
    Address,
    CreditCard,
    SiteSettings,
    _
) {
    // @class Contact.Model Defines the model used by the all contact related services.
    // @extends SCModel
    return SCModel.extend({
        name: 'GetInTouch',
        validation: {
            firstname: {
                required: true,
                msg: 'First Name is required'
            },

            // This code is commented temporally, because of the inconsistences between Checkout and My Account regarding the require data from profile information (Checkout can miss last name)
            lastname: {
                required: true,
                msg: 'Last Name is required'
            },

            email: {
                required: true,
                pattern: 'email',
                msg: 'Email is required'
            },
        },
        // @method register
        // @param {ContactUs Data} contactus_data
        // @param {Contact.Model.Attributes} contactus_data
        register: function(contactFields) {
            // var jsondata=contactFields;
       
            var convert=JSON.stringify(contactFields);
            console.warn(convert);
           
           
           
            
            
            var firstname = contactFields['firstname']
			,  lastname = contactFields['lastname']
			,  email = contactFields['email']
			,  phone = contactFields['phone']|| ''
			,  comments = contactFields['comments']|| ''
			,  companyname = contactFields['company']|| ''
		
			var returnString = {};

			if(firstname != null && firstname != '' && lastname != null && lastname != '' && email != null && email != '')
			{
				try{
					var filters = [];
					filters.push(new nlobjSearchFilter('email',null,'is',email));

					var search = nlapiSearchRecord('customer',null,filters,null);
					if(search != null)
					var record = nlapiLoadRecord('lead',search[0].getId());
					else
					var record = nlapiCreateRecord('lead');
					record.setFieldValue('entityid',firstname+" "+lastname);
					record.setFieldValue('firstname',firstname);
					record.setFieldValue('lastname',lastname);
					record.setFieldValue('email',email);
					record.setFieldValue('phone',phone);
					
					if(comments != null && comments != '')
					record.setFieldValue('comments',comments);
					

					var recId =  nlapiSubmitRecord(record,true,true);
					returnString.id = recId;
				
				}
				catch(e){
					returnString.error = e.toString();
				}
			}
			return returnString;


        }     
    });
});

// @class ContactUsData
// @property {String} firstname
// @property {String} lastname
// @property {String} email
// @property {String} phone
// @property {String} comments

