// setup to work with deezer player

$(document).ready(function(){
	$("#controlers input").attr('disabled', true);
	$("#slider_seek").click(function(evt,arg){
		var left = evt.offsetX;
		console.log(evt.offsetX, $(this).width(), evt.offsetX/$(this).width());
		DZ.player.seek((evt.offsetX/$(this).width()) * 100);
	});
    reloadMood();
});

// event listener, for now we display it for debugging purposes

function event_listener_append() {
/*	var pre = document.getElementById('event_listener');
	var line = [];
	for (var i = 0; i < arguments.length; i++) {
		line.push(arguments[i]);
	}
	pre.innerHTML += line.join(' ') + "\n";
*/
}
var playerLoaded = false;
function onPlayerLoaded() {
	$("#controlers input").attr('disabled', false);
	DZ.Event.subscribe('player_position', function(arg){
		$("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
	});

	DZ.Event.subscribe('track_end', function() {
		playNextTrack();
	});
	playerLoaded = true;
}

DZ.init({
	appId  : '135161',
	channelUrl : 'http://developers.deezer.com/examples/channel.php',
	player : {
		onload : onPlayerLoaded
	}
});

// our own functionality

function limitString( str, len ) {
	if( str.length > len )
		return str.substring( 0, len ) + "...";
	else
		return str;
}

function playNextTrack() {
	nextTrack = popTrack();
	$("#nowplayingcontainer").attr("class", nextTrack.class);
	element = $( "#nowplaying" );
	element.html( '<div dzid="' + nextTrack.id + '" id="track">' + limitString( nextTrack[ "title" ], 35 ) + '</div><div id="artist">' + limitString( nextTrack[ "artist" ][ "name" ], 35 ) + '</div>' );
	DZ.player.playTracks( [ nextTrack[ "id" ] ] );
}
