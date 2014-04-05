var playlist = new Array();

// get the first track in the playlist and pop it
function popTrack() {
	return playlist.shift();
}

// add a track to the playlist
function queueTrack( track ) {
	playlist.push( track );
}

// add tracks to the playlist
function queueTracks( tracks ) {
	for (var i = 0; i < tracks.length; i++) {
		queueTrack( track );
	}
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
		playlistElement.append('<li>' + playlist[ i ] + '</li>');
	}
}