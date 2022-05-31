
/// <amd-module name="FacetsSideBar.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>
import * as _ from 'underscore';
import * as facets_sidebar_tpl from 'facets_sidebar.tpl';

import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import BackboneModel = require('../../../Commons/BackboneExtras/JavaScript/Backbone.Model');

// @module FacetsSideBar.View @extends Backbone.View
const FacetsSideBarView: any = BackboneView.extend({
    template: facets_sidebar_tpl,

    attributes: {
        id: 'facets_sidebar',
        class: 'facets_sidebar'
    },

    events: {
		'click .nav-list-item-wrapper': 'toggleList'
    },
	toggleList:function(e:any)
	{
		if(jQuery(e.currentTarget).next('ul'))
		{
		  jQuery(e.currentTarget).find('.arrow-icons').toggleClass('active');
		}
		jQuery(e.currentTarget).next('ul').slideToggle();


	},
    initialize: function() {
        
    },
	getCategories: function(){
		
		var categories = (SC.CATEGORIES && SC.CATEGORIES.length >0)?SC.CATEGORIES[0].categories: [];
		var self = this;
		_.each(categories,function(lv1:any){
				
			lv1.extLink = self.assignExternalLink(lv1.internalid);
			
			_.each(lv1.categories,function(lv2:any){
				
				lv2.extLink = self.assignExternalLink(lv2.internalid);
				
				_.each(lv2.categories,function(lv3:any){
					
					lv3.extLink = self.assignExternalLink(lv3.internalid);
					
					_.each(lv3.categories,function(lv4:any){
						
						lv4.extLink = self.assignExternalLink(lv4.internalid);
						
					});
				});
			});	
		});
		
		return categories;
	},
	assignExternalLink: function(internalid){
		var externalLinks = SC.CONFIGURATION.categoryext.array;
		var foundResults:any = _.findWhere(externalLinks, {'id': internalid});
		
		return (foundResults && _.has(foundResults,'link'))? foundResults['link']: false;
	},
    getContext: function() {
        return {
            categories: this.getCategories()
        };
    }
});

export = FacetsSideBarView;
