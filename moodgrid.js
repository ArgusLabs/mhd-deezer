var currentMood;

// More or less the same as currentMood, but this one is only meant for use internal to this class.
// currentMood gets overwritten when the detected mood changes, and then we cant properly perform the
// background color transitions.
var internalCurrentMood;

function switchMood(mood) {
	mood = mood.toLowerCase();
	if (mood == internalCurrentMood) {
		return;
	}

	if (internalCurrentMood == null) {
		$('.moodgriditem').addClass(mood, 1000);
	} else {
		$('.moodgriditem').switchClass(internalCurrentMood, mood, 1000);
	}

	$('.moodgriditem').each(function() {
		if (this.id == mood) {
			$(this).find('img').fadeTo(1000, 1);
		} else {
			$(this).find('img').fadeTo(1000, 0);
		};
	});

	$('.argusmood').text(mood);

	currentMood = mood;
	internalCurrentMood = mood;
};

function moodgridInit() {
	$('.moodgriditem').click(function() {
		switchMood(this.id);
	});
}
