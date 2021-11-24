/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="GetInTouch.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import * as _ from 'underscore';
import * as get_in_touch_tpl from 'get_in_touch.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
// import ContactUsModel = require('./Contact.Us.Model');
import GetInTouchModel =require('./GetIn.Touch.Model');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');

// @module Contact.View @extends Backbone.View
const GetInTouchView: any = BackboneView.extend({
    template: get_in_touch_tpl,

    title: Utils.translate('Get in Touch'),

    page_header: Utils.translate('Get in Touch'),

    attributes: {
        id: 'get-in-touch-landing-page',
        class: 'get-in-touch-landing-page'
    },

    events: {
        'submit form': 'submitForm',
        'click [data-action="validate"]': 'validateFields',
    },
    
    bindings:{
        '[name="firstname"]': 'firstname',
        '[name="lastname"]': 'lastname',
        '[name="email"]': 'email',
        '[name="phone"]': 'phone',
        '[name="comments"]': 'comments',
        '[name="business"]':'business'
    },

    initialize:function(){
        this.model = new GetInTouchModel();
        this.model.on('save', _.bind(this.showSuccess, this));
        this.model.on('saveCompleted', _.bind(this.resetForm, this));
        BackboneFormView.add(this);
        
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

    validateFields: function(e, model, props) {
        const self =  this;
        const loggers = Loggers.getLogger();
        const actionId = loggers.start('get-in-touch-submit form');

        const promise = self.saveForm(e, model, props);

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
   
    // @method getContext @return Contact.View.Context
    getContext: function() {
        
      return {
             
      };
    }
});

export = GetInTouchView;


