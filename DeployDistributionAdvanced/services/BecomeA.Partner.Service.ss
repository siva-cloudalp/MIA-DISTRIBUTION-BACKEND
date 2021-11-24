function service(request, response)
{
	'use strict';
	try 
	{
		require('BecomeA.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('BecomeA.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}