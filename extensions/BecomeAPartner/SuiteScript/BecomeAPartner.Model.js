// @module Account
// ----------
// Handles account creation, login, logout and password reset
// module Account
define('BecomeAPartner.Model', [
    'Transaction.Model',
    'Application',
    'SC.Models.Init',
    'Profile.Model',
    'LiveOrder.Model',
    'Address.Model',
    'CreditCard.Model',
    'SiteSettings.Model',
    'underscore',
    'Utils',
    'Configuration'
], function(
    TransactionModel,    
    Application,
    ModelsInit,
    Profile,
    LiveOrder,
    Address,
    CreditCard,
    SiteSettings,  
    _,
    Utils,
    Configuration
) {
    // @class Account.Model Defines the model used by the all Account related services.
    // @extends SCModel

    return SCModel.extend({
        name: 'BecomeAPartner',
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
        register: function(becomeAPartner_data) {
            var jsondata=becomeAPartner_data;
            // var field ="subsidiary";
            var convert=JSON.stringify(jsondata);
            
            try {
                console.warn(convert);
                return {
                    successmessage:'thank you for Submit The Form We will get soon.'
                }
                
            } catch (error) {
                console.warn(error);
            }
           
            // try{
            //     // if ((field in jsondata) === true) {
            //         if(jsondata.hasOwnProperty(field)){
            //             if(jsondata[field] !== ''){
            //                 console.warn(convert);
            //                     return{
            //                         // success:true,
            //                         successmessage:'thank you for contacting us'
            //                     }
            //             }else{
            //                 return{
            //                     message:field+' is mandatory'
            //                 } 
            //             }

            //         }  
            //     else{
            //         return{
            //             message:field+' is not available'
            //         }      
            //     }
            // }catch(error){
            //     return{
            //         message:'try again later'
            //     }      
            // }    
        }     
    });
    
});
