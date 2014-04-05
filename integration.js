function reloadPlayer() {
	// request mood from sentiment analysis
    clearPlaylist();
    getSentiment(getGraceNoteTracks);
}

function reloadMood() {
    previousMoodCode = currentMoodCode
    getSentiment(function(data) {
        if(currentMoodCode !== previousMoodCode) {
            console.log("MOOD_SERVICE: New mood detected, updating the player!")
            clearPlaylist();
            getGraceNoteTracks(currentMoodCode)
        }
    })
}