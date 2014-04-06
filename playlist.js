var playlist = new Array();
var hasPlayed = false;

// get the first track in the playlist and pop it
function popTrack() {
	nextTrack = playlist.shift();
	renderPlaylist();
	return nextTrack;
}

// add a track to the playlist
// now obsoloted by queuePlaylist
function queueTrackById( trackId ) {
	
	// get track metadata
	
	$.ajax({
	    url: 'http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/123/proxy?url=http://api.deezer.com/track/' + trackId,
	    type: 'GET',
	    data: null,
	    success: function( data ) { 
			playlist.push( data );
			renderPlaylist();
		}
	});

}

// Replace queueTrackById for sequantialness, much slower, but fixed order!
function queuePlaylist(tracklist){
	var track = tracklist[0];
	$.ajax({
	    url: 'http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/123/proxy?url=http://api.deezer.com/track/' + track.id,
	    type: 'GET',
	    data: null,
	    success: function( data ) {
	    	if (data.id != $('#track').attr('dzid') && data.error == null) {
	    		data.class = track.class;
	    		playlist.push( data )
	    	}

			if(!hasPlayed && playerLoaded){
				hasPlayed = true
				playNextTrack()
			}
			if(tracklist.length > 1){
				queuePlaylist(tracklist.slice(1))
				renderPlaylist();
			} else {
				renderPlaylist();
                ready();
			}
		}
	});
	
}

// clear the playlist
function clearPlaylist() {
	playlist = [];
}

// render the playlist
function renderPlaylist() {
	playlistElement = $( "#playlist" );
	playlistElement.empty();
	for (var i = 0; i < playlist.length; i++) {
		playlistElement.append('<li class="' + playlist[i].class + '"><div class="trackcontainer"><div class="title" class="' + playlist[ i ][ "id" ] + '">' + playlist[ i ][ "title" ] + '</div><div class="artist">' + playlist[ i ][ "artist" ][ "name" ] + '</div></li>');
	}
}