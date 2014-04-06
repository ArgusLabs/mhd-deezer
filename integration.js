function getTrackObject(id, mood) {
    return {"id": id, "class": mood.toLowerCase()};
}

function getNewPlaylist() {
    previousMoodCode = currentMoodCode;
    getSentiment(function(transitionMoodCode, moodCode, transitionArgusMood, argusMood) {
        if (currentMoodCode == previousMoodCode) { 
            return;
        }

        if (transitionMoodCode) {
            getGraceNoteTracks(transitionMoodCode, function(ids) {
                transitionTrack = getTrackObject(ids[0], transitionArgusMood);
                getGraceNoteTracks(moodCode, function(ids) {
                    var tracks = new Array(ids.length);
                    for (var i = 0; i < ids.length; i++) {
                        tracks[i] = getTrackObject(ids[i], argusMood);
                    }
                    tracks.splice(0, 0, transitionTrack);
                    queuePlaylist(tracks);
                });
            });
        } else {
            getGraceNoteTracks(moodCode, function(ids) {
                var tracks = new Array(ids.length);
                for (var i = 0; i < ids.length; i++) {
                    tracks[i] = getTrackObject(ids[i], argusMood);
                }
                queuePlaylist(tracks);
            });
        }
    });
}

function reloadPlayer() {
    clearPlaylist();
    getNewPlaylist();
}

function reloadMood() {
    clearPlaylist();
    getNewPlaylist();
}