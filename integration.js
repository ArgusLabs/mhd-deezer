function reloadPlayer() {

	// request mood from sentiment analysis

	graceNoteMoodId = getSentiment();
	
	// get gracenote tracks
	
	tracks = getGraceNoteTracks( graceNoteMoodId );
	
	// play tracks with deezer player
	
	for (var i = 0; i < tracks.length; i++) {
		queueTrackById( tracks[ i ] );
	}

}
