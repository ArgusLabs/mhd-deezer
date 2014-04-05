var playlist = new Array();

// get the first track in the playlist and pop it
function popTrack() {
	nextTrack = playlist.shift();
	renderPlaylist();
	return nextTrack;
}

// add a track to the playlist
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

// clear the playlist
function clearPlaylist() {
	playlist = [];
}

// render the playlist
function renderPlaylist() {
	playlistElement = $( "#playlist" );
	playlistElement.empty();
	for (var i = 0; i < playlist.length; i++) {
		playlistElement.append('<li><div class="artist">' + playlist[ i ][ "artist" ][ "name" ] + '</div><div class="title">' + playlist[ i ][ "title" ] + '</div></li>');
	}
}