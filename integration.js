function reloadPlayer() {

	// request mood from sentiment analysis

	graceNoteMoodId = getSentiment();
	
	// get gracenote tracks
	
	getGraceNoteTracks( graceNoteMoodId );
	
	// play tracks with deezer player
	
	DZ.player.playTracks([60978718,18232696,60978718]); return false;

}
