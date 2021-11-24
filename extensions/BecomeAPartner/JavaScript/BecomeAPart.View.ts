/// <amd-module name="BecomeAPart.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import '../../../Commons/Quote/JavaScript/Quote.ListExpirationDate.View';

import * as _ from 'underscore';
// import * as get_in_touch_tpl from 'get_in_touch.tpl';
import * as become_a_partner_tpl from 'become_a_partner.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
// import ContactUsModel = require('./Contact.Us.Model');
import BecomeAModel = require('./BecomeA.Model');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');

// @module Download.View @extends Backbone.View
const BecomeAPartView: any = BackboneView.extend({
    template: become_a_partner_tpl,
   
    className: 'BecomeAPartner',

    title: Utils.translate('Become A Partner'),

    page_header: Utils.translate('Become A Partner'),

    attributes: {
        id: 'become-a-partner-landing-page',
        class: 'become-a-partner-landing-page'
    },
    events: {
        'click [data-action="validate"]': 'validateFields',
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

    initialize:function(){
        this.model = new BecomeAModel();
        this.model.on('save', _.bind(this.showSuccess, this));
        this.model.on('saveCompleted', _.bind(this.resetForm, this));
        BackboneFormView.add(this);
        
    },
    resetForm:function(event){
        this.model.unset('firstname');
        this.model.unset('lastname');
        // this.model.unset('name');
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
                   if (success.successmessage){
                     self.showMessage(success.successmessage, 'success');
                   }else{
                     self.showMessage(success.message, 'error')
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
          closable: true
        });
     
        this.$('[data-type="alert-placeholder"]').append(global_view_message.render().$el.html());
      }else{
        const globa_view_message = new GlobalViewsMessageView({
          message:message,
          // message:message,
          type: 'success',
          closable: true
        });
   
        this.$('[data-type="alert-placeholder"]').append(globa_view_message.render().$el.html());
      } 
  },    
   
    // @method getContext @return Contact.View.Context
    getContext: function() {
        console.log("hello");
        
      return {
            
      };
    }
});

export = BecomeAPartView;
