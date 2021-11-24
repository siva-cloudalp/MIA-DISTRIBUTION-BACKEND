define('BecomeA.ServiceController', ['ServiceController', 'BecomeAPartner.Model'], function(
    ServiceController,
    BecomeAPartnerModel
) {
    // @class GetIn.Touch.ServiceController Supports contact process
    // @extend ServiceController
    return ServiceController.extend({
        // @property {String} name Mandatory for all ssp-libraries model
        name: 'BecomeA.ServiceController',

        // @method post The call to Contact.Us.Service.ss with http method 'post' is managed by this function
        // @return {GetInTouch.Model.register.data} Object literal with registration related data
        post: function() {
            return BecomeAPartnerModel.register(this.data);
        }
    });
});
