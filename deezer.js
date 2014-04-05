// setup to work with deezer player

$(document).ready(function(){
	$("#controlers input").attr('disabled', true);
	$("#slider_seek").click(function(evt,arg){
		var left = evt.offsetX;
		console.log(evt.offsetX, $(this).width(), evt.offsetX/$(this).width());
		DZ.player.seek((evt.offsetX/$(this).width()) * 100);
	});
	
	reloadPlayer();
});

// event listener, for now we display it for debugging purposes

function event_listener_append() {
	var pre = document.getElementById('event_listener');
	var line = [];
	for (var i = 0; i < arguments.length; i++) {
		line.push(arguments[i]);
	}
	pre.innerHTML += line.join(' ') + "\n";
}
var playerLoaded = false;
function onPlayerLoaded() {
	$("#controlers input").attr('disabled', false);
	event_listener_append('player_loaded');
	DZ.Event.subscribe('current_track', function(arg){
		event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
	});
	DZ.Event.subscribe('player_position', function(arg){
		event_listener_append('position', arg[0], arg[1]);
		$("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
	});

	DZ.Event.subscribe('track_end', function() {
		event_listener_append('track_end');
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
	element = $( "#nowplaying" );
	console.log(element.html());
	element.html( '<div id="track">' + limitString( nextTrack[ "title" ], 25 ) + '</div><div id="artist">' + limitString( nextTrack[ "artist" ][ "name" ], 25 ) + '</div>' );
	DZ.player.playTracks( [ nextTrack[ "id" ] ] );
}
