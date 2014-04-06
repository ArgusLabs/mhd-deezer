function getTrackObject(id, mood) {
    return {"id": id, "class": mood.toLowerCase()};
}

function getNewPlaylist(callback, differentMoodRequired) {
    previousMoodCode = currentMoodCode;
    getSentiment(function(transitionMoodCode, moodCode, transitionArgusMood, argusMood) {
        if (currentMoodCode == previousMoodCode && differentMoodRequired == true) {
            return;
        }
        clearPlaylist();

        if (transitionMoodCode) {
            getGraceNoteTracks(transitionMoodCode, function(ids) {
                transitionTrack = getTrackObject(ids[0], transitionArgusMood);
                getGraceNoteTracks(moodCode, function(ids) {
                    var tracks = new Array(ids.length);
                    for (var i = 0; i < ids.length; i++) {
                        tracks[i] = getTrackObject(ids[i], argusMood);
                    }
                    tracks.splice(0, 0, transitionTrack);
                    queuePlaylist(tracks, callback);
                });
            });
        } else {
            getGraceNoteTracks(moodCode, function(ids) {
                var tracks = new Array(ids.length);
                for (var i = 0; i < ids.length; i++) {
                    tracks[i] = getTrackObject(ids[i], argusMood);
                }
                queuePlaylist(tracks, callback);
            });
        }
    });
}

loading = false
function reloadMood() {
    if(loading == true) {
        console.log("Don't load when we are already loading")
        return
    }
    getNewPlaylist(function() {
        loading = false
        setTimeout(function() {reloadMood()}, 2500)
    }, (differentMoodRequired=true));
}