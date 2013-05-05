/* selectorr v0.1 | (c) n33 | n33.co @n33co | MIT + GPLv2 */

(function($) {

	$.fn.selectorr = function(userSettings) {

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Settings
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			var settings = $.extend({
				titleSelector: '.title'
			}, userSettings);

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Loop
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			for (var i=0; i < this.length; i++)
				$.selectorr($(this[i]), settings);

	};
	
	$.selectorr = function(src, settings) {

		var srcItems = src.find('li');
		
		var t = $('<div class="selectorr"><ul class="titles"></ul><div class="panels"></div></div>');

		t.insertAfter(src);

		var	titlesContainer = t.find('.titles'),
			panelsContainer = t.find('.panels'),
			titles,
			panels;
		
		// Process src
			srcItems.each(function(i) {
				var t = $(this), title, panel;
				
				// Title
					x = t.find(settings.titleSelector);
					title = $('<li class="title">' + x.text() + '</li>');
					titlesContainer.append(title);
					x.remove();
					title.css('cursor', 'pointer');
					
				// Panel
					t.wrapInner('<div class="panel" />');
					panel = t.children('div');
					panel
						.appendTo(panelsContainer);

				// Events
					title.click(function(e) {
						
						// Title
							titles.removeClass('active');
							title.addClass('active');
						
						// Panel
							panels.filter(':visible').hide();
							panel.show();
						
						return false;
					});
				
				// Init
					if (i == 0)
						title.addClass('active');
					else
						panel.hide();
			});
			
			src.remove();
			
		// Set titles, panels
			titles = titlesContainer.find('.title');
			panels = panelsContainer.find('.panel');

	};

})(jQuery);