function getGraceNoteTracks (graceNoteMoodId, callback) {
	function fetchDeezerID(album){
		var deezid = 0;

		var xid = album['TRACK'][0]['XID']
		if(xid == undefined){
			return 0;
		}
		
		deezid = album['TRACK'][0]['XID'][0]['VALUE']
		return 	deezid;
	}
    if(graceNoteMoodId == undefined) {
        console.log("Gracenote mood ID is NULL!!")
        ready()
        return
    }
	var moodparam = "?seed=mood_" + graceNoteMoodId.toString()
	var fixedparams = "&client=14035968-3A7531B15EDA931973B63304828033EE&user=262144737596677836-7E07E310AB2C52F7872B8F77488F853F&select_extended=link&return_count=25"
	moodparam = moodparam.concat(fixedparams)

	var tempurl = "https://c14035968.web.cddbp.net/webapi/json/1.0/radio/create"
	
	tempurl = tempurl.concat(moodparam)

     jQuery.ajax({
         type: "GET",
         url: "http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/gracenote_cors_proxy?url=" + encodeURIComponent(tempurl),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) {
         	var albumlist =data['RESPONSE'][0].ALBUM
         	if(albumlist == undefined){
         		console.log("No album data from gracenote")
         		return;
         	}
         	//var deezidlist = new Array();
         	var tmpid = 0;
         	var allids = new Array();
         	for(var i = 0;i<albumlist.length;i++){
					tmpid = fetchDeezerID(albumlist[i])
					if(tmpid != 0){
						allids.push(tmpid)
						//queueTrackById(tmpid);
					}
         	}
            callback(allids)
  	

         },

         error: function (jqXHR, status) {
             // error handler
         }
	})
};
