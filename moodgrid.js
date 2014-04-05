var currentMood;

function switchMood(mood) {
	if (mood == currentMood) {
		return;
	}

	if (currentMood == null) {
		$('.moodgriditem').addClass(mood, 1000);
	} else {
		$('.moodgriditem').switchClass(currentMood, mood, 1000);
	}

	$('.moodgriditem').each(function() {
		if (this.id == mood) {
			$(this).find('img').fadeTo(1000, 1);
		} else {
			$(this).find('img').fadeTo(1000, 0);
		};
	});
	currentMood = mood;
};

function moodgridInit() {
	switchMood("neutral", 1000);
	$('.moodgriditem').click(function() {
		switchMood(this.id);
	});
}
