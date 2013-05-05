window._skel_config = {
	prefix: 'assets/css/style',
	resetCSS: true,
	boxModel: 'border',
	containers: 1180,
	grid: {
		gutters: 6
	},
	breakpoints: {
		'wide': {
			range: '1660-',
		},
		'normal': {
			range: '-1659',
		},
		'narrow': {
			range: '-1200',
			containers: 960
		}
	}
};

$(function() {

	// Code areas
		$('pre').hicode({
			alwaysShowBlocks: true,
			blockStyles: 2,
			persistence: 0
		});

	// Example
		$('#example-stylesheets').selectorr({
			titleSelector: 'h4'
		});
		
		(function() {

			var t = $('#example-output'), titles = t.find('.titles li'), output = t.find('.output');
			var active = 'wide';

			titles
				.css('cursor', 'pointer')
				.click(function() {
					var t = $(this);
					
					// Title
						titles.removeClass('active');
						t.addClass('active');
						
					// Output
						output.attr('class', 'output');
						output.addClass(t.attr('class'));
				});

		})();
		
	// Top bar
		$.scrollzer([ 'top', 'how', 'example', 'setup', 'using' ]);

});