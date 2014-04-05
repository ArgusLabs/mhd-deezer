function reloadPlayer() {

	// request mood from sentiment analysis

	graceNoteMoodId = getSentiment();
	
	// get gracenote tracks
	
	tracks = getGraceNoteTracks( graceNoteMoodId );
	
	// play tracks with deezer player
	
	DZ.player.playTracks( tracks ); return false;

}
