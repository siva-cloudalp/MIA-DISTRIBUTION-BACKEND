/// <amd-module name="Download.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>
define("Download.View", ["require", "exports", "underscore", "download.tpl", "Utils", "Download.Collection", "Backbone.View", "GlobalViews.Pagination.View", "GlobalViews.ShowingCurrent.View", "Quote.ListExpirationDate.View"], function (require, exports, _, download_tpl, Utils, DownloadCollection, BackboneView, GlobalViews_Pagination_View_1, GlobalViews_ShowingCurrent_View_1) {
    "use strict";
    /*import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
    import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';*/
    //import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';
    //import AddressModel = require('../../../Commons/Address/JavaScript/Address.Model');
    //import { template } from 'underscore';*/
    //import Tracker = require('../../../Commons/Tracker/JavaScript/Tracker');
    //import AccountRegisterModel = require('../../../Advanced/Account/JavaScript/Account.Register.Model');
    // @module Download.View @extends Backbone.View
    var DownloadView = BackboneView.extend({
        template: download_tpl,
        className: 'DownloadView',
        title: Utils.translate('Downloads'),
        page_header: Utils.translate('Download'),
        attributes: {
            id: 'landing-page',
            class: 'landing-page'
        },
        events: {},
        bindings: {},
        initialize: function () {
            console.log(this);
            //     var mymodel = new DownloadModel();
            this.collection = new DownloadCollection();
            // var getting = this.collection.fetch();
            console.log(this.collection);
            // console.log(mymodel)
            // console.log(getting)
            //    collection : this.collection
            // console.log(mymodel);
            //  this.modeldata = null;
            // //  this.modeldata = [];
            // var self = this;
            // mymodel.fetch().then(function(element){
            //     // element.map((x)=>{
            //     //     self.modeldata.push(x);
            //     //     // console.log(x)
            //     // })
            //      self.modeldata = element;
            //    console.log(self.modeldata);
            // });
            // this.collection = new DownloadCollection();
        },
        getBreadcrumbPages: function () {
            return {
                text: this.title,
                href: '/Download'
            };
        },
        childViews: {
            'Download.Items': function () {
                return this._resultsView;
            },
            'List.Header': function () {
                return this.listHeader;
            },
            'GlobalViews.Pagination': function () {
                return new GlobalViews_Pagination_View_1.GlobalViewsPaginationView(_.extend({
                    totalPages: Math.ceil(12 / 5 //total records / records per page
                    )
                }, this.options.application.getConfig().defaultPaginationSettings));
            },
            'GlobalViews.ShowCurrentPage': function () {
                return new GlobalViews_ShowingCurrent_View_1.GlobalViewsShowingCurrentView({
                    items_per_page: 5,
                    total_items: 12,
                    total_pages: Math.ceil(12 / 5)
                }
                // _.extend(
                //     {
                //         totalPages: Math.ceil(
                //             this.collection.totalRecordsFound / this.collection.recordsPerPage
                //         )
                //     },
                //     this.options.application.getConfig().defaultPaginationSettings
                // )
                );
            }
        },
        //     _buildResultsView: function() {
        //         const self = this;
        //   console.log(this)
        //         let selectedColumns = [];
        //         if (!Configuration.get().transactionListColumns.enableOrderHistory) {
        //             selectedColumns.push({ label: 'Date', id: 'trandate', type: 'date' });
        //             selectedColumns.push({
        //                 label: 'Amount',
        //                 name: 'amount',
        //                 id: 'amount_formatted',
        //                 type: 'currency'
        //             });
        //             if (self.isSCISIntegrationEnabled) {
        //                 selectedColumns.push({ label: 'Origin', id: 'origin' });
        //             } else {
        //                 selectedColumns.push({ label: 'Status', id: 'status', type: 'status' });
        //             }
        //         } else {
        //             selectedColumns = Configuration.get().transactionListColumns.orderHistory;
        //         }
        //         const records_collection = new Backbone.Collection(
        //             this.collection.map(function(order) {
        //                 const model = new Backbone.Model({
        //                     title: new Handlebars.SafeString(
        //                         Utils.translate('<span class="tranid">$(0)</span>', order.get('tranid'))
        //                     ),
        //                     touchpoint: 'customercenter',
        //                     detailsURL: `/purchases/view/${order.get('recordtype')}/${order.get(
        //                         'internalid'
        //                     )}`,
        //                     recordType: order.get('recordtype'),
        //                     id: order.get('internalid'),
        //                     internalid: order.get('internalid'),
        //                     trackingNumbers: order.get('trackingnumbers'),
        //                     columns: self._buildColumns(selectedColumns, order)
        //                 });
        //                 return model;
        //             })
        //         );
        //         return new BackboneCollectionView({
        //             childView: RecordViewsActionableView,
        //             collection: records_collection,
        //             viewsPerRow: 1,
        //             childViewOptions: {
        //                 actionView: OrderHistoryListTrackingNumberView,
        //                 actionOptions: {
        //                     showContentOnEmpty: true,
        //                     contentClass: '',
        //                     collapseElements: true
        //                 }
        //             }
        //         });
        //     },
        getContext: function () {
            // this._resultsView = this._buildResultsView();
            // let columns = [];
            // if (this._resultsView.collection.length > 0) {
            //     columns = this._resultsView.collection.at(0).get('columns');
            // }
            // this._resultsView = this._buildResultsView();
            // var self = this;
            // console.log(this.showCurrentPage)
            // console.log(self.modeldata);
            // var tpl = JSON.stringify(self.modeldata);
            // var tpldata = JSON.parse(tpl)
            console.log(this);
            // console.log('tpldata',tpldata);
            // console.log('tpl',tpl);
            // console.log('modeldata', self.modeldata.length);
            // this.collection.models = tpldata;
            // console.log(this.collection)
            return {
                message: 'Hello world! 🌍👋',
                // data:tpldata,
                // @property {String} pageHeader
                pageHeader: this.page_header,
                //    showPagination: !!(12 && 5),
                //    showCurrentPage: this.showCurrentPage,
                //    collectionLength: self.modeldata.length,
                showPagination: !!(this.collection.totalRecordsFound && this.collection.recordsPerPage),
            };
        }
    });
    return DownloadView;
});

//# sourceMappingURL=Download.View.js.map
