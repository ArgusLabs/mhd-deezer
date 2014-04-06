function getTrackObject(id, mood) {
    return {"id": id, "class": mood.toLowerCase()};
}

function getNewPlaylist(differentMoodRequired) {
    previousMoodCode = currentMoodCode;
    getSentiment(function(transitionMoodCode, moodCode, transitionArgusMood, argusMood) {
        if (currentMoodCode == previousMoodCode && differentMoodRequired == true) {
            ready();
            return;
        }
        clearPlaylist();

        if (transitionMoodCode && transitionMoodCode != moodCode) {
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

loading = false
function reloadMood() {
    if(loading == true) {
        return
    }
    getNewPlaylist(differentMoodRequired=true);
}

function ready() {
    loading = false
    setTimeout(function() {
        reloadMood()
    }, 1000)
}