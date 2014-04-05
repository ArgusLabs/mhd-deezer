$(document).ready(function(){
	$("#controlers input").attr('disabled', true);
	$("#slider_seek").click(function(evt,arg){
		var left = evt.offsetX;
		DZ.player.seek((evt.offsetX/$(this).width()) * 100);
	});
});

function onPlayerLoaded() {
	$("#controlers input").attr('disabled', false);
}

DZ.init({
	appId  : '135161',
	channelUrl : 'http://developers.deezer.com/examples/channel.php',
	player : {
		container : 'player',
		cover : true,
		playlist : true,
		width : 650,
		height : 300,
		onload : onPlayerLoaded
	}
});
