function service(request, response)
{
	'use strict';
	try 
	{
		require('Download.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Download.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}