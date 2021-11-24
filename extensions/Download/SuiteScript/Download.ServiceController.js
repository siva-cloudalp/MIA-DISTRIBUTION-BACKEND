/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// Download.ServiceController.js
// ----------------
// Service to submit a user request
define('Download.ServiceController', ['ServiceController', 'Download.Model'], function(
    ServiceController,
    DownloadModel
) {
    // @class Download.Us.ServiceController Supports Download process
    // @extend ServiceController
    try{
// console.warn('download service controller')

    return ServiceController.extend({
        // @property {String} name Mandatory for all ssp-libraries model
        name: 'Download.ServiceController',

        options: {
            common: {
                requireLogin: true,
                // requirePermissions: {
                //     list: ['transactions.tranEstimate.1', 'transactions.tranFind.1']
                // }
            }
        },

        // @method post The call to Download.Us.Service.ss with http method 'post' is managed by this function
        // @return {Download.Model.register.data} Object literal with registration related data
        
        // get:function(){
        //      // console.warn(DownloadModel.getDownloaddata(this.data));
        //         return     DownloadModel.getDownloaddata(this.data);
        // },
        
        get: function() {
            const recordtype = this.request.getParameter('recordtype');
            const id = this.request.getParameter('internalid');
            const search = this.request.getParameter('search');
            
            // If the id exist, sends the response of Order.get(id), else sends the response of (Order.list(options) || [])
            if (recordtype && id) {
                return   DownloadModel.get(recordtype, id);
            }
            return   DownloadModel.getDownloadableItems({
                filter: this.request.getParameter('filter'),
                order: this.request.getParameter('order'),   
                sort: this.request.getParameter('sort'),
                from: this.request.getParameter('from'),
                to: this.request.getParameter('to'),
                search: this.request.getParameter('search'),
                origin: this.request.getParameter('origin'),
                page: this.request.getParameter('page') || 1,
                results_per_page: this.request.getParameter('results_per_page')
            });
        },


  
  
        // get: function() {

        //     return DownloadModel.getDownloadableItems({                

        //         // filter: this.request.getParameter('filter'),
        //         // order: this.request.getParameter('order'),
        //         // sort: this.request.getParameter('sort'),
        //         // from: this.request.getParameter('from'),
        //         // to: this.request.getParameter('to'),
        //             //  types: this.request.getParameter('types'),
        //         // createdfrom: this.request.getParameter('createdfrom')
        //         page: this.request.getParameter('page') || 1,
        //         results_per_page: this.request.getParameter('results_per_page'),
        //     });
        // }
        
    });
}
catch(e){
    console.warn('DownloadPos.Service.ss' + e.name, e);
    this.sendError(e);
}
});
