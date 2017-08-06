$(document).ready(function() {
	$('#fullpage').fullpage({
		sectionsColor: ['#BD1A3B', '#1bbc9b', '#3F51B5', '#00BCD4', '#4BBFC3'],
		css3: true,
		navigation: true,
		navigationPosition: 'right',
		scrollBar: true,
		controlArrows:false,
		slidesNavigation: true,
		afterRender: function() {
			// show page on ready
			$("#loadingMask").fadeOut("slow");
		}
	});

});
