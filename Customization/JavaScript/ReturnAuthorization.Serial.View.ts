
/// <amd-module name="ReturnAuthorization.Serial.View"/>

import * as return_authorization_serial_tpl from 'return_authorization_serial.tpl';

import * as _ from 'underscore';
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

const ReturnAuthorizationSerialView: any = BackboneView.extend({
    template: return_authorization_serial_tpl,
	
	title: Utils.translate('Set Serial Numbers'),

    modalClass: 'global-views-modal-small',
    page_header: Utils.translate('Set Serial Numbers'),
	events: {
		'click [name="return_lines_serial_submit"]': 'setSerialNumber'
	},
	setSerialNumber: function(e){
		
		const layout = this.options.application.getComponent('Layout');
		const $inputs = this.$('[name="return_lines_serial"]');
		var serialNumbers = this.model.get('serialNumbers') || [];
		var returnQty = this.model.get('returnQty') || this.model.get('quantity');
		
		$inputs.each(function(){
			var $target = jQuery(this);
			console.log(jQuery(this));
			var slNo = $target.val();
			
			if($target.is(':checked') && slNo && serialNumbers.indexOf(slNo) == -1){
				serialNumbers.push(slNo);
				
			}
			if(!$target.is(':checked') && slNo && serialNumbers.indexOf(slNo) != -1){
				
				serialNumbers = _.filter(serialNumbers,function(sl){return sl != slNo;});
			}
		});
		
		this.$('[data-view="return_lines_serial_submit"]').html('');
			
		if(serialNumbers.length == returnQty){
			this.model.set('serialNumbers',serialNumbers);
			layout.showMessage({
				message: returnQty + ' serial numbers added',
				type: 'success',
				selector: 'return_lines_serial_submit',
				timeout: 3000
			});
		}
		else{
			layout.showMessage({
				message: 'please select ' + returnQty + ' serial numbers',
				type: 'error',
				selector: 'return_lines_serial_submit',
				timeout: 3000
			});
		}
		
	},
    getContext: function() {
        return {
			serialNumbers: this.options.serialNumbers,
			line_id: this.options.line_id
        };
    }
});

export = ReturnAuthorizationSerialView;
