var currentMoodCode

function getSentiment(callback) {
	
	var currentMoodParams;
	if (currentMoodCode) {
		currentMoodParams = '?current_mood=' + currentMoodCode;
	} else {
		currentMoodParams = '';
	}
	// do a get request
	$.ajax({
	    url: 'http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/529c44edaae8a3071b000003/mood' + currentMoodParams,
	    type: 'GET',
	    // data: 'param1=value1&param2=value',
	    success: function(data) {
			if(data == undefined) {
				console.log("Data is null!!");
			}

			if(callback != undefined && typeof callback == 'function') {
				console.log(data)
				currentMood = data['current_argus_mood'];
				currentMoodCode = data['current_mood_code'];
				switchMood(currentMood);
				callback(data['transition_mood_code'], data['current_mood_code'], data['transition_argus_mood'], data['current_argus_mood']);
			}
		}
	});

}

