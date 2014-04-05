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

			if(callback != undefined && typeof callback == 'function') {
				//console.log(data['current_mood_code']);
				currentMood = data['current_argus_mood']
				callback(data['current_mood_code']);
			}
		}
	});
	
	return 1;
}
