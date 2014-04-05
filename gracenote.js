function getGraceNoteTracks (graceNoteMoodId) {
	function fetchDeezerID(album){
		var deezid = 0;

		var xid = album['TRACK'][0]['XID']
		if(typeof(xid) == undefined){
			return 0;
		}
		
		deezid = album['TRACK'][0]['XID'][0]['VALUE']
		return 	deezid;
	}
	var moodparam = "?mood_code="
	var idString = graceNoteMoodId.toString()
	var tempurl = "http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/123/playlist"
	
	moodparam = moodparam.concat(idString)
	moodparam = moodparam.concat("return_count=25")
	tempurl = tempurl.concat(moodparam)

     jQuery.ajax({
         type: "GET",
         url: tempurl,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) {
         	var albumlist =data['RESPONSE'][0].ALBUM
         	var deezidlist = new Array();
         	var tmpid = 0;
         	for(var i = 0;i<albumlist.length;i++){
					tmpid = fetchDeezerID(albumlist[i])
					if(tmpid != 0){
						queueTrackById(tmpid);
					}
				
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
