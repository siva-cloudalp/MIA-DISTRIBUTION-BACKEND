// @module Account
// ----------
// Handles account creation, login, logout and password reset
// module Account
define('Download.Model', [
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

    return TransactionModel.extend({

        name:'Download',

        getDownloadableItems: function(data)
        {           const self = this;
            console.warn(JSON.stringify(data));
            this.data = data;
            this.filters = {
                isinactive: ['isinactive', 'is', 'F']           
            };
            this.columns = {
                
                internalid: new nlobjSearchColumn('internalid'),
                custrecord_downloadable_item: new nlobjSearchColumn('custrecord_downloadable_item'),
                custrecord_download_expiry_date: new nlobjSearchColumn('custrecord_download_expiry_date')
            };

            if (this.data.from && this.data.to) {
                this.filters.date_operator = 'and';

                this.data.from = this.data.from.split('-');
                this.data.to = this.data.to.split('-');

                this.filters.date = [
                    'custrecord_download_expiry_date',
                    'within',
                    new Date(this.data.from[0], this.data.from[1] - 1, this.data.from[2]),
                    new Date(this.data.to[0], this.data.to[1] - 1, this.data.to[2])
                ];
            } else if (this.data.from) {
                this.filters.date_from_operator = 'and';

                this.data.from = this.data.from.split('-');

                this.filters.date_from = [
                    'custrecord_download_expiry_date',
                    'onOrAfter',
                    new Date(this.data.from[0], this.data.from[1] - 1, this.data.from[2])
                ];
            } else if (this.data.to) {
                this.filters.date_to_operator = 'and';

                this.data.to = this.data.to.split('-');

                this.filters.date_to = [
                    'custrecord_download_expiry_date',
                    'onOrBefore',
                    new Date(this.data.to[0], this.data.to[1] - 1, this.data.to[2])
                ];
            }


            
            if (this.data.sort) {
                _.each(this.data.sort.split(','), function(column_name) {
                    if (self.columns[column_name]) {
                        self.columns[column_name].setSort(self.data.order >= 0);
                    }
                });
            }

            
            if(this.data.search && this.data.search != null){
                // console.warn(JSON.stringify(this.data),"fulldata")

                // console.warn(JSON.stringify(this.data.search),"searchdata")
                //                this.search_results = Application.getAllSearchResults(
                //     'customrecord_downloadable_items',
                //     _.values(this.filters),
                //     _.values(this.columns)
                // );
                // console.warn(_.values(this.columns));

                //        this.search_results.filter(function() {
                //         this.data.toggle( Object.values(this.data).indexOf(this.data.search) > -1)
                //   })
            }
    
            console.warn(JSON.stringify(this.data.trigger),"trigger")


            if (this.data.page === 'all')   {
                console.warn(JSON.stringify(this.data),"all")
                this.search_results = Application.getAllSearchResults(
                    'customrecord_downloadable_items',
                    _.values(this.filters),
                    _.values(this.columns)
                );
            } else {
                this.search_results = Application.getPaginatedSearchResults({
                    record_type: 'customrecord_downloadable_items',
                    filters: _.values(this.filters),
                    columns: _.values(this.columns),
                    page: this.data.page || 1,
                    results_per_page: this.data.results_per_page
                });
            }
            const records = _.map(
                (this.data.page === 'all' ? this.search_results : this.search_results.records) || [],
                function(record) {
                    

                    // @class Transaction.Model.List.Result.Record
                    const result = {
                        // @property {String} recordtype
                        recordtype:'customrecord_downloadable_items',
                        // @property {String} internalid
                        internalid: record.getValue('internalid'),
                        // @property {String} tranid
                        custrecord_downloadable_item: record.getValue('custrecord_downloadable_item'),
                        // @property {String} trandate
                        custrecord_download_expiry_date: record.getValue('custrecord_download_expiry_date')
                        
                    };

                    return self.mapListResult(result, record);
                }
            );

            if (this.data.page === 'all') {
                this.results = records;
            } else {
                this.results = this.search_results;
                this.results.records = records;
            }

            return this.results;

        },


        
    //     getDownloaddata: function(){

    //         var resp = [
    //         {item:1234,description:"hello",amount:120},
    //         {item:1235,description:"this",amount:130},
    //         {item:1236,description:"is",amount:140},
    //         {item:1237,description:"Demo",amount:150},
    //         {item:1238,description:"dought",amount:160},
    //         {item:1239,description:"cloud",amount:170},
    //         {item:1240,description:"alp",amount:180},
    //         {item:1241,description:"dought",amount:190},
    //         {item:1242,description:"com",amount:200},
    //         {item:1243,description:"welcome",amount:210},
    //         {item:1244,description:"to",amount:220},
    //         {item:1245,description:"Cloudalp",amount:230}
    //     ];
    //         // return resp;
    //         this.search_results = Application.getPaginatedSearchResults({
    //             record_type: 'Download',
    //             // filters: _.values(this.filters),
    //             // columns: _.values(this.columns),
    //             page: resp.page || 1,
    //             results_per_page: resp.results_per_page
    //         });
    //         console.warn(this.search_results)
    //         return this.search_results;
    // },

   
        //  download:function(data){
            
        //     // const self = this;

        //     // this.data = data;


        //     this.search_results = Application.getPaginatedSearchResults({
        //         record_type: 'Download',
        //         // filters: _.values(this.filters),
        //         // columns: _.values(this.columns),
        //         page: this.data.page || 1,
        //         results_per_page: this.data.results_per_page
        //     });
        //  }
   
        })
    
});
