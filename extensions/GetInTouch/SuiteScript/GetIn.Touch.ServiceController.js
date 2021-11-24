/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// GetIn.Touch.ServiceController.js
// ----------------
// Service to submit a user request
define('GetIn.Touch.ServiceController', ['ServiceController', 'GetInTouch.Model'], function(
    ServiceController,
    GetInTouchModel
) {
    // @class GetIn.Touch.ServiceController Supports contact process
    // @extend ServiceController
    return ServiceController.extend({
        // @property {String} name Mandatory for all ssp-libraries model
        name: 'GetIn.Touch.ServiceController',

        // @method post The call to Contact.Us.Service.ss with http method 'post' is managed by this function
        // @return {GetInTouch.Model.register.data} Object literal with registration related data
        post: function() {
            return GetInTouchModel.register(this.data);
        }
    });
});
