/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Home.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import * as _ from 'underscore';
import * as home_tpl from 'home.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';

import Tracker = require('../../../Commons/Tracker/JavaScript/Tracker');

import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import GetInTouchModel = require('../../GetInTouch/JavaScript/GetIn.Touch.Model');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import { lastIndexOf } from 'underscore';
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';

// @module Home.View @extends Backbone.View
const HomeView: any = BackboneView.extend({
    template: home_tpl,

    title: Utils.translate('Welcome to the store'),

    page_header: Utils.translate('Welcome to the store'),

    attributes: {
        id: 'home-page',
        class: 'home-page'
    },

    events: {
      'submit form': 'submitForm',
        'click [data-action=slide-carousel]': 'carouselSlide',
        'click [data-action="submitcontent"]':'homeForm'
    },
    
    
    bindings:{
        '[name="firstname"]': 'firstname',
        '[name="lastname"]': 'lastname',
        // '[name="name"]': 'name',
        '[name="email"]': 'email',
        '[name="phone"]': 'phone',
        '[name="comments"]': 'comments',
        '[name="business"]':'business'
    },


    initialize: function() {
        
        this.model = new GetInTouchModel();
        this.model.on('save', _.bind(this.showSuccess, this));
        this.model.on('saveCompleted', _.bind(this.resetForm, this));
        BackboneFormView.add(this);
      
    },
    homeForm:function(e,model,prop){
    
        const self =  this;
        const loggers = Loggers.getLogger();
        const actionId = loggers.start('get-in-touch-submit form');

        const promise = self.saveForm(e, model, prop);
        // console.log(promise);
        if (promise) {
            promise.done(() => {
                loggers.end(actionId, {
                    operationIds: self.model.getOperationIds(),
                    status: 'success'
                });
            });
            return promise && promise.then
               (
                 function(success){
                  //  console.log(success);
                   if (success.id){
                     
                     self.showMessage(Utils.translate("Your form has been submitted"), 'success');
                   }else{
                     self.showMessage(Utils.translate("Something went wrong try later"), 'error')
                    }
                  }
                  , function(fail){
                      fail.preventDefault = true;
              
                      _.each(fail.responseJSON.errormessage, function(message, field){
                        self.showMessage(message, 'error', field);
                      });
                   
                    }
                );
              
        }else{
          
            }
               
    },     
     showMessage: function(message, type, field){

     if(type === 'error'){  
        const global_view_message = new GlobalViewsMessageView({
          message:message,
          // message:message,
          type: 'error',
          closable: true,
          
        });
     
        this.$('[data-type="alert-placeholder"]').html(global_view_message.render().$el.html());
      }else{
        const globa_view_message = new GlobalViewsMessageView({
          message:message,
          // message:message,
          type: 'success',
          closable: true,
          
        });
   
        this.$('[data-type="alert-placeholder"]').html(globa_view_message.render().$el.html());
      } 
  },    
   
        
        
        
    
    resetForm:function(event){
        this.model.unset('firstname');
        this.model.unset('lastname');
        this.model.unset('email');
        this.model.unset('phone');
        this.model.unset('comments');
        this.model.unset('business');
        event && event.preventDefault();
    },
    showSuccess: function() {
        if (this.$savingForm) {
          const global_view_message = new GlobalViewsMessageView({
            message: Utils.translate("Your's request is submitted and Thank you for contacting us"),
            type: 'success',
            closable: true
          });
        }
      },

    destroy: function() {
        BackboneView.prototype.destroy.apply(this, arguments);
        jQuery(window).off('resize', this._windowResizeHandler);
        this.options.application.getLayout().off('afterAppendView', this.initSlider, this);
    },
   

    // @method getContext @return Home.View.Context
    getContext: function() {
      

        return {
           
            imageHomeSize: Utils.getViewportWidth() < 768 ? 'homeslider' : 'main',
            // @property {String} imageHomeSizeBottom
            imageHomeSizeBottom: Utils.getViewportWidth() < 768 ? 'homecell' : 'main',
          
        };
    }
});

export = HomeView;
