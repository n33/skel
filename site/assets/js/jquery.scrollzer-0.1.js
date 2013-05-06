/* scrollzer v0.1 | (c) n33 | n33.co @n33co | MIT + GPLv2 */

jQuery.scrollzer = function(ids, userSettings) {

	var top = jQuery(window);
	
	top.load(function() {

		// Settings
			var settings = jQuery.extend({
				activeClassName:	'active',
				suffix:				'-link',
				pad:				50
			}, userSettings);

		// Variables
			var k, x, o, l, pos;
			var lastId, elements = [], links = jQuery();

		// Build elements array
			for (k in ids)
			{
				o = jQuery('#' + ids[k]);
				l = jQuery('#' + ids[k] + settings.suffix);
			
				if (o.length < 1
				||	l.length < 1)
					continue;
				
				x = {};
				x.link = l;
				x.start = Math.ceil(o.offset().top);
				x.end = x.start + Math.ceil(o.innerHeight());
				
				elements[ids[k]] = x;
				links = links.add(l);
				//$('body').append('<div style="position: absolute; width: 100%; top: ' + x.start + 'px; left: 0; height: ' + (x.end - x.start) + 'px; box-shadow: inset 0px 0px 10px 0px red; z-index: 100000;"></div>');
			}

		// Set up scroll event
			top.scroll(function(e) {
				pos = top.scrollTop();
				
				for (k in elements)
				{
					if (k != lastId
					&&	pos + settings.pad >= elements[k].start
					&&	pos - settings.pad <= elements[k].end)
					{
						links.removeClass(settings.activeClassName);
						elements[k].link.addClass(settings.activeClassName);
						lastId = k;
						break;
					}
				}
			});

	});

};