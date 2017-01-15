$(document).ready(function() {
	$('#fullpage').fullpage({
		sectionsColor: ['#BD1A3B', '#1bbc9b', '#ccddff', '#7BAABE', '#4BBFC3'],
		css3: true,
		navigation: true,
		navigationPosition: 'right',
		scrollBar: true,
		slidesNavigation: true,
		afterRender: function() {
			// show page on ready
			$("#loadingMask").fadeOut("slow");
		}
	});

});
