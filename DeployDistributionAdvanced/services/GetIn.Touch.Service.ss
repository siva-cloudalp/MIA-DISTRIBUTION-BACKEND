function service(request, response)
{
	'use strict';
	try 
	{
		require('GetIn.Touch.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('GetIn.Touch.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}