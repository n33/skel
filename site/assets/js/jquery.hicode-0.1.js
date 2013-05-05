/* hicode v0.1 | (c) n33 | n33.co @n33co | MIT + GPLv2 */

(function($) {

	$.fn.hicode = function(userSettings) {

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Settings
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			var settings = $.extend({
				commentPrefix:		'//',
				blockPrefix:		'// @@@',
				tabWidth:			2,
				blockStyles:		0,
				interactive:		true,
				alwaysShowBlocks:	false,
				persistence:		0
			}, userSettings);

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Loop
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			for (var i=0; i < this.length; i++)
				$.hicode($(this[i]), settings);
		
	};
	
	$.hicode = function(t, settings) {

		if (navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 <= 8)
			return;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Variables
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			var a, b, i, j, k, n, x, y;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 1. Convert <pre> element into useful markup
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			var title, comment, blockOpen = false, tab = '', lastLine = 0;

			a = t.text().split('\n');
			b = [];
			n = 0;
			k = 1;
			
			for (i=0; i < settings.tabWidth; i++)
				tab = tab + '&nbsp;';
			
			for (i in a)
			{
				x = a[i].trim();

				// Blank line? Skip it
					if (x.length === 0)
						continue;
				
				// Block?
					if (x.substring(0, settings.blockPrefix.length) == settings.blockPrefix)
					{
						if (blockOpen)
						{
							b.push('</div>');

							blockOpen = false;
						}
						else
						{
							x = x.substring(settings.blockPrefix.length).trim();
							
							if (x.charAt(0) == '(' && (j = x.indexOf(')')) !== -1)
							{
								title = x.substring(1, j);
								comment = x.substring(j + 1).trim();
							}
							else
								comment = x;
								
							y = '<div class="block style' + k + '">';
							
							if (title || comment)
								y += '<div class="block-comment style' + k + '">' + (title ? '<div class="title">' + title + '</div>' : '') + (comment ? '<div class="text">' + comment + '</div>' : '') + '</div>'

							title = comment = null;
							
							b.push(y);
							
							blockOpen = true;

							k++;

							if (settings.blockStyles > 0 && k > settings.blockStyles)
								k = 1;
						}
						
						continue;
					}
				
				// Comment?
					if (x.substring(0, settings.commentPrefix.length) == settings.commentPrefix)
					{
						x = x.substring(settings.commentPrefix.length).trim();
						
						if (x.charAt(0) == '(' && (j = x.indexOf(')')) !== -1)
						{
							title = x.substring(1, j);
							comment = x.substring(j + 1).trim();
						}
						else
							comment = x;
						
						continue;
					}
				
					y = '<div class="line' + (n == 0 ? ' first' : '') + (n++ % 2 !== 0 ? ' even' : ' odd') + (title || comment ? ' notification' : '') + '">' + a[i].replace(/\s+$/g, '').replace(/ /g, '&nbsp;').replace(/\t/g, tab).replace(/>/g, '&gt;').replace(/</g, '&lt') + '</div>';
					
					if (title || comment)
						y += '<div class="line-comment">' + (title ? '<div class="title">' + title + '</div>' : '') + (comment ? '<div class="text">' + comment + '</div>' : '') + '</div>'
				
				title = comment = null;
				
				b.push(y);
				
				lastLine = b.length - 1;
			}
			
			// Close unclosed blocks
				if (blockOpen)
					b.push('</div>');

			// Add "last" class to last line
				if (b[lastLine])
					b[lastLine] = b[lastLine].replace(/"line/, '"line last');
			
			y = $('<div class="hicode" id="' + t.attr('id') + '">' + b.join('') + '</div>');
			y.insertAfter(t);
			t.remove();
			t = y;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 2. The Fun Part
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			var	blocks = t.find('.block'),
				blockComments = t.find('.block-comment'),
				lines = t.find('.line'),
				lineComments = t.find('.line-comment');

			if (settings.interactive)
			{
				lineComments.hide();
				
				var i = 0;
				
				lines.each(function() {
					var t = $(this), c = t.next();
					
					if (c.hasClass('line-comment'))
					{
						if (settings.persistence > 0)
						{
							t
								.mouseenter(function() {
									lines.removeClass('active');
									lineComments.hide();
									t.addClass('active');
									c.show();
								});

							if (i == 0 && settings.persistence > 1)
								t.trigger('mouseenter');
						}
						else
							t
								.mouseenter(function() {
									t.addClass('active');
									c.show();
								})
								.mouseleave(function() {
									t.removeClass('active');
									c.hide();
								});
								
						i++;
					}
				});

				if (settings.alwaysShowBlocks)
					blocks.addClass('active');
				else
				{
					i = 0;
					
					blockComments.hide();
					blocks.each(function() {
						var t = $(this), c = t.children().first();

						if (c.hasClass('block-comment'))
						{
							if (settings.persistence > 0)
							{
								t
									.mouseenter(function() {
										blocks.removeClass('active');
										blockComments.hide();
										t.addClass('active');
										c.show();
									});

								if (i == 0 && settings.persistence > 1)
									t.trigger('mouseenter');
							}
							else
							{
								t
									.mouseenter(function() {
										t.addClass('active');
										c.show();
									})
									.mouseleave(function() {
										t.removeClass('active');
										c.hide();
									});
							}

							i++;
						}
					});
				}
			}
			else
			{
				lines.each(function(i) {
					var t = $(this), c = t.next();
					
					if (c.hasClass('line-comment'))
						t.addClass('active');
				});

				blocks.each(function() {
					var t = $(this), c = t.children().first();

					if (c.hasClass('block-comment'))
						t.addClass('active');
				});
			}
	};

})(jQuery);