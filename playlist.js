var playlist = new Array();

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
function queuePlaylist(idlist){
	var trackId = idlist[0]
	$.ajax({
	    url: 'http://mhdapi-640468004.eu-west-1.elb.amazonaws.com/users/123/proxy?url=http://api.deezer.com/track/' + trackId,
	    type: 'GET',
	    data: null,
	    success: function( data ) { 
			playlist.push( data )
			if(idlist.length > 1){
				queuePlaylist(idlist.slice(1))
				renderPlaylist();
			}else{
				renderPlaylist();
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
		playlistElement.append('<li><div class="title">' + playlist[ i ][ "title" ] + '</div><div class="artist">' + playlist[ i ][ "artist" ][ "name" ] + '</div></li>');
	}
}