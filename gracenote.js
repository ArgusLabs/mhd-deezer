function getGraceNoteTracks (graceNoteMoodId) {
	function fetchDeezerID(album){
		var deezid = 0;

		deezid = album['TRACK'][0]['XID'][0]['VALUE']
		return 	deezid;
	}
	var moodparam = "?mood_code="
	var idString = graceNoteMoodId.toString()
	var tempurl = "http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/123/playlist"
	
	moodparam = moodparam.concat(idString)
	tempurl = tempurl.concat(moodparam)

     jQuery.ajax({
         type: "GET",
         url: tempurl,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) {
         	var albumlist =data['RESPONSE'][0].ALBUM
         	var deezidlist = new Array();
         	for(var i = 0;i<albumlist.length;i++){

					queueTrackById(fetchDeezerID(albumlist[i]));
				
         		//deezidlist.push(fetchDeezerID(albumlist[i]))
         	}
         	//return(deezidlist)
             // do something
             //alert(data.length)
             //alert(data.response[0].status)

         },

         error: function (jqXHR, status) {
             // error handler
         }
	})
};
