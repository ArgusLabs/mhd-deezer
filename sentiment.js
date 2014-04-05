function getSentiment(callback) {
	
	// do a get request
	$.ajax({
	    url: 'http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/529c44edaae8a3071b000003/mood',
	    type: 'GET',
	    // data: 'param1=value1&param2=value',
	    success: function(data) { 
			if(data == undefined) {
				console.log("Data is null!!");
			}
			console.log(data);
			if(callback != undefined && typeof callback == 'function') {
				callback(data);
			}
		}
	});
	
	return 1;
}
