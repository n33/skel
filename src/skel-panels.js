/* skelJS v0.4.9 | (c) n33 | skeljs.org | MIT licensed */

/*

	Panels is a skelJS plugin that adds sliding panels and persistent viewport overlays. It requires both skelJS and jQuery, so be
	sure to load those first (otherwise things will fail quite miserably). Learn more about skelJS and Panels at http://skeljs.org

	This is the uncompressed version of Panels. For actual projects, please use the minified version (skel-panels.min.js).

*/

skel.registerPlugin('panels', (function() { var _ = {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Properties
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		config: {					// Config (don't edit this directly; override it per skeljs.org/panels/docs#setup)
			baseZIndex: 10000,			// Base z-index (should be well above anything else on the page)
			useTransform: true,			// Determines if we should use CSS transforms for animations (= much faster/smoother than CSS)
			transformBreakpoints: null,		// If defined, a list of breakpoints at which CSS transforms are allowed
			speed: 250,				// Animation speed (in ms)
			panels: {},				// Panels
			overlays: {}				// Overlays
		},

		cache: {					// Object cache
			panels: {},				// Panels
			overlays: {},				// Overlays
			body: null,				// <body>
			window: null,				// window
			pageWrapper: null,			// Page Wrapper (the original page)
			defaultWrapper: null,			// Default Wrapper (where panels live)
			fixedWrapper: null,			// Fixed Wrapper (where overlays live)
			activePanel: null			// Active Panel
		},

		eventType: 'click',				// Interaction event type
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		positions: {
			panels: {
				'top': [ 'top', 'left' ],
				'right': [ 'top', 'right' ],
				'bottom': [ 'bottom', 'left' ],
				'left': [ 'top', 'left' ]
			},
			overlays: {
				'top-left':	{ 'top': 0, 'left': 0 },
				'top-right': { 'top': 0, 'right': 0 },
				'top': { 'top': 0, 'left': '50%' },
				'top-center': { 'top': 0, 'left': '50%' },
				'bottom-left':	{ 'bottom': 0, 'left': 0 },
				'bottom-right': { 'bottom': 0, 'right': 0 },
				'bottom': { 'bottom': 0, 'left': '50%' },
				'bottom-center': { 'bottom': 0, 'left': '50%' },
				'left': { 'top': '50%', 'left': 0 },
				'middle-left': { 'top': '50%', 'left': 0 },
				'right': { 'top': '50%', 'right': 0 },
				'middle-right': { 'top': '50%', 'right': 0 }
			}
		},
		presets: {					// Presets
			'standard': {				// Standard (usually used in conjunction with skelJS's "standard" preset)
				panels: {
					navPanel: {
						breakpoints: 'mobile',
						position: 'left',
						style: 'push',
						size: '80%',
						html: '<div data-action="navList" data-args="nav"></div>'
					}
				},
				overlays: {
					titleBar: {
						breakpoints: 'mobile',
						position: 'top-left',
						width: '100%',
						height: 44,
						html: '<span class="toggle" data-action="togglePanel" data-args="navPanel"></span>' +
							  '<span class="title" data-action="copyHTML" data-args="logo"></span>'
					}
				}
			}
		},
		defaults: {					// Defaults for various things
			config: {				// Config defaults
				panel: {
					breakpoints: '',
					position: null,
					style: null,
					size: '80%',
					html: '',
					resetScroll: true,
					resetForms: true,
					swipeToClose: true
				},
				overlay: {
					breakpoints: '',
					position: null,
					width: 0,
					height: 0,
					html: ''
				}
			}
		},
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/* Utility */

			// Converts a percentage-based CSS measurement to a pixel value (relative to viewport width)
			// Args: string n (CSS measurement)
			// Returns: integer (Pixel value)
			recalcW: function(n) {
				var i = parseInt(n);

				if (typeof n == 'string'
				&& n.charAt(n.length - 1) == '%')
					i = Math.floor(jQuery(window).width() * (i / 100.00));

				return i;
			},
			
			// Converts a percentage-based CSS measurement to a pixel value (relative to viewport height)
			// Args: string n (CSS measurement)
			// Returns: integer (Pixel value)
			recalcH: function(n) {
				var i = parseInt(n);

				if (typeof n == 'string'
				&& n.charAt(n.length - 1) == '%')
					i = Math.floor(jQuery(window).height() * (i / 100.00));

				return i;
			},
			
			// Gets half of a CSS measurement (px or %) while preserving its units
			// Args: string n (CSS measurement)
			// Returns: string (Half of the original CSS measurement)
			getHalf: function(n) {
				var i = parseInt(n);

				if (typeof n == 'string'
				&& n.charAt(n.length - 1) == '%')
					return Math.floor(i / 2) + '%';
					
				return Math.floor(i / 2) + 'px';
			},

		/* Parse */

			// Tells a child element to suspend
			// Args: jQuery x (Child element)
			parseSuspend: function(x) {
				
				var o = x.get(0);
				
				if (o._skel_panels_suspend)
					o._skel_panels_suspend();

			},

			// Tells a child element to resume
			// Args: jQuery x (Child element)
			parseResume: function(x) {

				var o = x.get(0);
				
				if (o._skel_panels_resume)
					o._skel_panels_resume();

			},

			// Parses a child element for Panels actions
			// Args: jQuery x (Child element)
			parseInit: function(x) {

				var a,b;
				
				var	o = x.get(0),
					action = x.attr('data-action'),
					args = x.attr('data-args'),
					arg1, arg2;
				
				if (action && args)
					args = args.split(',');
				
				switch (action)
				{
					// panelToggle (Opens/closes a panel)
					// arg1 = panel
						case 'togglePanel':
						case 'panelToggle':
						
							x
								.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
								.css('cursor', 'pointer');

							a = function(e) {
								e.preventDefault();
								e.stopPropagation();
						
								if (_.cache.activePanel)
								{
									_.cache.activePanel._skel_panels_close();
									return false;
								}

								var t = jQuery(this), panel = _.cache.panels[args[0]];
								
								if (panel.is(':visible'))
									panel._skel_panels_close();
								else
									panel._skel_panels_open();
							};

							// Hack: Android and WP don't register touch events on fixed elements properly,
							// so if this panelToggle is on an overlay it needs to be a click.
								if (_._.vars.deviceType == 'android'
								||	_._.vars.deviceType == 'wp')
									x.bind('click', a);
								else
									x.bind(_.eventType, a);
						
							break;
				
					// navList (Builds a nav list using links from an existing nav)
					// arg1 = existing nav
						case 'navList':
							arg1 = jQuery('#' + args[0]);
							
							a = arg1.find('a');
							b = [];
							
							a.each(function() {
								var t = jQuery(this), indent;
								indent = Math.max(0,t.parents('li').length - 1);
								b.push(
									'<a class="link depth-' + indent + '" href="' + t.attr('href') + '"><span class="indent-' + indent + '"></span>' + t.text() + '</a>'
								);
							});
							
							if (b.length > 0)
								x.html('<nav>' + b.join('') + '</nav>');
						
							x.find('.link')
								.css('cursor', 'pointer')
								.css('display', 'block');
						
							break;

					// copyText (Copies text using jQuery.text() from an element)
					// arg1 = the element
						case 'copyText':
							arg1 = jQuery('#' + args[0]);
							x.html(arg1.text());
							break;

					// copyHTML (Copies HTML using jQuery.html() from an element)
					// arg1 = the element
						case 'copyHTML':
							arg1 = jQuery('#' + args[0]);
							x.html(arg1.html());
							break;
						
					// moveElementContents (Moves an element's (inner) HTML to this one)
					// arg1 = the element
						case 'moveElementContents':

							arg1 = jQuery('#' + args[0]);
						
							o._skel_panels_resume = function() {
								console.log('moving element contents');
								arg1.children().each(function() {
									x.append(jQuery(this));
								});
							};
							
							o._skel_panels_suspend = function() {
								console.log('returning element contents');
								x.children().each(function() {
									arg1.append(jQuery(this));
								});
							};
							
							o._skel_panels_resume();
						
							break;
						
					// moveElement (Moves an element to this one)
					// arg1 = the element
						case 'moveElement':
							arg1 = jQuery('#' + args[0]);
						
							o._skel_panels_resume = function() {
								console.log('moving element');
								
								// Insert placeholder before arg1
									jQuery('<div id="skel-panels-tmp-' + arg1.attr('id') + '" />').insertBefore(arg1);
								
								// Move arg1
									x.append(arg1);
							};
							
							o._skel_panels_suspend = function() {
								console.log('returning element');
								
								// Replace placeholder with arg1
									jQuery('#skel-panels-tmp-' + arg1.attr('id')).replaceWith(arg1);
							};
							
							o._skel_panels_resume();
						
							break;

					// moveCell (Moves a grid cell to this element)
					// arg1 = the cell
						case 'moveCell':

							arg1 = jQuery('#' + args[0]);
							arg2 = jQuery('#' + args[1]);
							
							o._skel_panels_resume = function() {
								console.log('moving cell');

								// Insert placeholder before arg1
									jQuery('<div id="skel-panels-tmp-' + arg1.attr('id') + '" />').insertBefore(arg1);
								
								// Move arg1
									x.append(arg1);

								// Override arg1 width
									arg1.css('width', 'auto');

								// Override arg2 width
									if (arg2)
										arg2._skel_panels_expandCell();
							};
							
							o._skel_panels_suspend = function() {
								console.log('returning cell');
								
								// Replace placeholder with arg1
									jQuery('#skel-panels-tmp-' + arg1.attr('id')).replaceWith(arg1);
									
								// Restore arg1 override
									arg1.css('width', '');
									
								// Restore arg2 width
									if (arg2)
										arg2.css('width', '');
							};
							
							o._skel_panels_resume();
						
							break;

					/*
					// moveCellContents (Moves a grid cell's contents to this element)
					// arg1 = the cell
						case 'moveCellContents':
						
							Resume:
								- Move cell element contents
								- Disable cell element
									- move element from source row
									- disable width class
									- redistribute width to source row cells
									
							Suspend:
								- Move back cell element contents 
								- Enable cell element
									- move element back to soruce row
									- enable width class
									- restore original widths to source row cells
						
							break;
					*/
					
					default:
						break;
				}
				
			},
		
		/* View */
		
			// Locks the viewport. Usually called when a panel is opened.
			// Args: string a (Orientation)
			lockView: function(a) {

				_.cache.window._skel_panels_scrollPos = _.cache.window.scrollTop();
			
				// Lock overflow
					if (_._.vars.isTouch)
						_.cache.body.css('overflow-' + a, 'hidden');
				
				// Lock events
					_.cache.pageWrapper.bind('touchstart.lock', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (_.cache.activePanel)
							_.cache.activePanel._skel_panels_close();
					});

					_.cache.pageWrapper.bind('click.lock', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (_.cache.activePanel)
							_.cache.activePanel._skel_panels_close();
					});

					_.cache.pageWrapper.bind('scroll.lock', function(e) {
						e.preventDefault();
						e.stopPropagation();

						if (_.cache.activePanel)
							_.cache.activePanel._skel_panels_close();
					});
						
					_.cache.window.bind('orientationchange.lock', function(e) {
						if (_.cache.activePanel)
							_.cache.activePanel._skel_panels_close();
					});

					if (!_._.vars.isTouch)
					{
						_.cache.window.bind('resize.lock', function(e) {
							if (_.cache.activePanel)
								_.cache.activePanel._skel_panels_close();
						});
						_.cache.window.bind('scroll.lock', function(e) {
							if (_.cache.activePanel)
								_.cache.activePanel._skel_panels_close();
						});
					}

			},
			
			// Unlocks the viewport. Usually called when a panel is closed.
			// Args: string a (Orientation)
			unlockView: function(a) {
				
				// Unlock overflow
					if (_._.vars.isTouch)
						_.cache.body.css('overflow-' + a, 'visible');
				
				// Unlock events
					_.cache.pageWrapper.unbind('touchstart.lock');
					_.cache.pageWrapper.unbind('click.lock');
					_.cache.pageWrapper.unbind('scroll.lock');
					_.cache.window.unbind('orientationchange.lock');
					
					if (!_._.vars.isTouch)
					{
						_.cache.window.unbind('resize.lock');
						_.cache.window.unbind('scroll.lock');
					}

			},
		
		/* Element */
		
			// Resumes an element.
			// Args: jQuery o (Element)
			resumeElement: function(o) {

				// Get object from cache
					var t = _.cache[o.type + 's'][o.id];
			
				// Parse (resume)
					t.find('*').each(function() { _.parseResume(jQuery(this)); });				
				
				console.log(o.id + ': ' + o.type + ' resumed');

			},
		
			// Suspends an element.
			// Args: jQuery o (Element)
			suspendElement: function(o) {
			
				// Get object from cache
					var t = _.cache[o.type + 's'][o.id];

				// Reset translate
					t._skel_panels_translateOrigin();

				// Parse (suspend)
					t.find('*').each(function() { _.parseSuspend(jQuery(this)); });				
				
				console.log(o.id + ': ' + o.type + ' suspended');

			},
	
			// Initializes an element.
			// Args: jQuery o (Element)
			initElement: function(o) {

				var	config = o.config, t = jQuery(o.object), x;

				// Cache object
					_.cache[o.type + 's'][o.id] = t;
				
				// Basic stuff
					t._skel_panels_init();
						
				// Parse (init)
					t.find('*').each(function() { _.parseInit(jQuery(this)); });

				// Configure
					switch (o.type)
					{
						case 'panel':

							// Basic stuff
								t
									.addClass('skel-panels-panel')
									.css('z-index', _.config.baseZIndex)
									.css('position', 'fixed')
									.hide();
									
							// Change how child elements behave
							
								// Links
									t.find('a')
										.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
										.bind('click.skel-panels', function(e) {
											var	t = jQuery(this);

											if (_.cache.activePanel
											&&	!t.hasClass('skel-panels-ignore'))
											{
												e.preventDefault();
												e.stopPropagation();
												
												var href = t.attr('href'),
													target = t.attr('target');
												
												_.cache.activePanel._skel_panels_close();
												
												if (!t.hasClass('skel-panels-ignoreHref'))
													window.setTimeout(function() {
														if (target == '_blank'
														&&	_._.vars.deviceType != 'wp') // Hack: WP doesn't allow window.open()
															window.open(href);
														else
															window.location.href = href;
													}, _.config.speed + 10);
											}
										});

								// Hack: iOS zooms + scrolls on input focus. Messes up panel stuff. This fix isn't perfect but it works.
									if (_._.vars.deviceType == 'ios')
									{
										t.find('input,select,textarea').focus(function(e) {
											var i = jQuery(this);
											
											e.preventDefault();
											e.stopPropagation();
											
											window.setTimeout(function() {
												var scrollPos = _.cache.window._skel_panels_scrollPos;
												var diff = _.cache.window.scrollTop() - scrollPos;
												
												// Reset window scroll to what it was when the view was locked
													_.cache.window.scrollTop(scrollPos);
												
												// Scroll the panel by what the browser tried to scroll the window
													_.cache.activePanel.scrollTop(_.cache.activePanel.scrollTop() + diff);
												
												// Hide/show the field to reset the position of the cursor (fixes a Safari bug)
													i.hide();
													window.setTimeout(function() { i.show(); }, 0);
											}, 100);
										});
									}
								
							// Position
								switch (config.position)
								{
									case 'top':
									case 'bottom':
									
										var sign = (config.position == 'bottom' ? '-' : '');
									
										// Basic stuff
											t
												.addClass('skel-panels-panel-' + config.position)
												.data('skel-panels-panel-position', config.position)
												.css('height', _.recalcH(config.size))
												.scrollTop(0);
												
											if (_._.vars.isTouch)
											{
												t
													.css('overflow-y', 'scroll')
													.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
													.css('-webkit-overflow-scrolling', 'touch')
													.bind('touchstart', function(e) {
														t._posY = e.originalEvent.touches[0].pageY;
														t._posX = e.originalEvent.touches[0].pageX;
													})
													.bind('touchmove', function(e) {
														var	diffX = t._posX - e.originalEvent.touches[0].pageX,
															diffY = t._posY - e.originalEvent.touches[0].pageY,
															th = t.outerHeight(),
															ts = (t.get(0).scrollHeight - t.scrollTop());
														
														// Prevent vertical scrolling past the top or bottom
															if (	(t.scrollTop() == 0 && diffY < 0)
															||		(ts > (th - 2) && ts < (th + 2) && diffY > 0)	)
															{
																return false;
															}
													});
											}
											else
												t.css('overflow-y', 'auto');
												
										// Style
											switch (config.style)
											{
												case 'reveal':
												case 'push':
												default:
													
													// Open
														t._skel_panels_open = function() {
															
															// Place panel
																t
																	._skel_panels_promote()
																	.scrollTop(0)
																	.css('left', '0px')
																	.css(config.position, '-' + _.recalcH(config.size) + 'px')
																	.css('height', _.recalcH(config.size))
																	.css('width', '100%')
																	.show();

															// Reset scroll
																if (config.resetScroll)
																	t.scrollTop(0);
															
															// Reset fields
																if (config.resetForms)
																	t._skel_panels_resetForms();
															
															// Lock view
																_.lockView('y');
															
															// Move stuff
																window.setTimeout(function() {
																
																	t
																		.add(_.cache.fixedWrapper.children())
																		.add(_.cache.pageWrapper)
																		._skel_panels_translate(0, sign + _.recalcH(config.size));
																	
																	// Set active
																		_.cache.activePanel = t;
																
																}, 100);
														};
													
													// Close
														t._skel_panels_close = function() {
														
															// Defocus panel
																t.find('*').blur();
														
															// Move stuff back
																t
																	.add(_.cache.pageWrapper)
																	.add(_.cache.fixedWrapper.children())
																	._skel_panels_translateOrigin();

															// Cleanup
																window.setTimeout(function() { 
																	
																	// Unlock view
																		_.unlockView('y');
																		
																	// Hide and demote panel
																		t
																			._skel_panels_demote()
																			.hide();
																			
																	// Clear active
																		_.cache.activePanel = null;
																
																}, _.config.speed + 50);
														};
													
													break;
											}

										break;

									case 'left':
									case 'right':
									
										var sign = (config.position == 'right' ? '-' : '');
									
										// Basic stuff
											t
												.addClass('skel-panels-panel-' + config.position)
												.data('skel-panels-panel-position', config.position)
												.css('width', _.recalcW(config.size))
												.scrollTop(0);
												
											if (_._.vars.isTouch)
											{
												t
													.css('overflow-y', 'scroll')
													.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
													.css('-webkit-overflow-scrolling', 'touch')
													.bind('touchstart', function(e) {
														t._posY = e.originalEvent.touches[0].pageY;
														t._posX = e.originalEvent.touches[0].pageX;
													})
													.bind('touchmove', function(e) {
														var	diffX = t._posX - e.originalEvent.touches[0].pageX,
															diffY = t._posY - e.originalEvent.touches[0].pageY,
															th = t.outerHeight(),
															ts = (t.get(0).scrollHeight - t.scrollTop());
														
														// Swipe to close?
															if (config.swipeToClose
															&&	diffY < 20
															&&	diffY > -20
															&&	((config.position == 'left' && diffX > 50)
															||	(config.position == 'right' && diffX < -50)))
															{
																t._skel_panels_close();
																return false;
															}
														
														// Prevent vertical scrolling past the top or bottom
															if (	(t.scrollTop() == 0 && diffY < 0)
															||		(ts > (th - 2) && ts < (th + 2) && diffY > 0)	)
															{
																return false;
															}
													});
											}
											else
												t.css('overflow-y', 'auto');
												
										// Style
											switch (config.style)
											{
												case 'push':
												default:
													
													// Open
														t._skel_panels_open = function() {
															
															// Place panel
																t
																	._skel_panels_promote()
																	.scrollTop(0)
																	.css('top', '0px')
																	.css(config.position, '-' + _.recalcW(config.size) + 'px')
																	.css('width', _.recalcW(config.size))
																	.css('height', '100%')
																	.show();

															// Reset scroll
																if (config.resetScroll)
																	t.scrollTop(0);
															
															// Reset fields
																if (config.resetForms)
																	t._skel_panels_resetForms();
															
															// Lock view
																_.lockView('x');
															
															// Move stuff
																window.setTimeout(function() {
																
																	t
																		.add(_.cache.fixedWrapper.children())
																		.add(_.cache.pageWrapper)
																		._skel_panels_translate(sign + _.recalcW(config.size), 0);
															
																	// Set active
																		_.cache.activePanel = t;
																
																}, 100);
														};
													
													// Close
														t._skel_panels_close = function() {
														
															// Defocus panel
																t.find('*').blur();
														
															// Move stuff back
																t
																	.add(_.cache.fixedWrapper.children())
																	.add(_.cache.pageWrapper)
																	._skel_panels_translateOrigin();
																
															// Cleanup
																window.setTimeout(function() { 
																	
																	// Unlock view
																		_.unlockView('x');
																		
																	// Hide and demote panel
																		t
																			._skel_panels_demote()
																			.hide();
																			
																	// Clear active
																		_.cache.activePanel = null;
																
																}, _.config.speed + 50);
														};
													
													break;
													
												case 'reveal':
													
													// Open
														t._skel_panels_open = function() {
															
															// Promote page and fixedWrapper
																_.cache.fixedWrapper._skel_panels_promote(2);
																_.cache.pageWrapper._skel_panels_promote(1);
															
															// Place panel
																t
																	.scrollTop(0)
																	.css('top', '0px')
																	.css(config.position, '0px')
																	.css('width', _.recalcW(config.size))
																	.css('height', '100%')
																	.show();
															
															// Reset scroll
																if (config.resetScroll)
																	t.scrollTop(0);

															// Reset fields
																if (config.resetForms)
																	t._skel_panels_resetForms();

															// Lock view
																_.lockView('x');
															
															// Move stuff
																window.setTimeout(function() {
																
																	_.cache.pageWrapper
																		.add(_.cache.fixedWrapper.children())
																		._skel_panels_translate(sign + _.recalcW(config.size), 0);
																	
																	// Set active
																		_.cache.activePanel = t;
																
																}, 100);
														};
													
													// Close
														t._skel_panels_close = function() {
														
															// Defocus panel
																t.find('*').blur();

															// Move stuff back
																_.cache.pageWrapper
																	.add(_.cache.fixedWrapper.children())
																	._skel_panels_translateOrigin();

															// Cleanup
																window.setTimeout(function() { 
																	
																	// Unlock view
																		_.unlockView('x');
																		
																	// Hide panel
																		t.hide();
																		
																	// Demote page
																		_.cache.pageWrapper._skel_panels_demote();
																		_.cache.pageWrapper._skel_panels_demote();

																	// Clear active
																		_.cache.activePanel = null;
																
																}, _.config.speed + 50);
														};
													
													break;
											}

										break;
										
									default:
										break;
								}
							
							break;
					
						case 'overlay':
							
							// Basic stuff
								t
									.css('z-index', _.config.baseZIndex)
									.css('position', 'fixed')
									.addClass('skel-panels-overlay');
							
							// Width/height
								t
									.css('width', config.width)
									.css('height', config.height);
							
							// Get position
								if (!(x = _.positions.overlays[config.position]))
								{
									config.position = 'top-left';
									x = _.positions.overlays[config.position];
								}
								
							// Apply position
								t
									.addClass('skel-panels-overlay-' + config.position)
									.data('skel-panels-overlay-position', config.position);
								
								_._.iterate(x, function(i) {
									t.css(i, x[i]);

									if (x[i] == '50%')
									{
										if (i == 'top')
											t.css('margin-top', '-' + _.getHalf(config.height));
										else if (i == 'left')
											t.css('margin-left', '-' + _.getHalf(config.width));
									}
								});

							break;
							
						default:
							break;
					}

				console.log(o.id + ': ' + o.type + ' initialized!');

			},
			
		/* Init */
		
			// Initializes elements
			// Args: string type (Type of element to initialize)
			initElements: function(type) {

				var c, k, o, a, b = [], i;
				
				_._.iterate(_.config[type + 's'], function(k) {

					// Extend with defaults
						c = {};
						_._.extend(c, _.defaults.config[type]);
						_._.extend(c, _.config[type + 's'][k]);
						_.config[type + 's'][k] = c;

					// Build element
						o = _._.newDiv(c.html);
							o.id = k;
							o.className = 'skel-panels-' + type;

						// If no HTML was defined, add it to our list of inline-defined elements (which we'll initialize
						// later when the DOM is ready to mess with)
							if (!c.html)
								b[k] = o;
					
					// Cache it
						if (c.breakpoints)
							a = c.breakpoints.split(',');
						else
							a = _._.breakpointList;
						
						_._.iterate(a, function(i) {
							var z = _._.cacheBreakpointElement(a[i], k, o, (type == 'overlay' ? 'skel_panels_fixedWrapper' : 'skel_panels_defaultWrapper'), 2);
								z.config = c;
								z.initialized = false;
								z.type = type;
								z.onAttach = function() {
									if (!this.initialized)
									{
										_.initElement(this);
										this.initialized = true;
									}
									else
										_.resumeElement(this);
								};
								z.onDetach = function() {
									_.suspendElement(this);
								};
						});
				});
				
				// Deal with inline-defined elements
					_._.DOMReady(function() {
						var x, y, k;
						
						_._.iterate(b, function(k) {
							x = jQuery('#' + k)
							y = jQuery(b[k]);
							x.children().appendTo(y);
							x.remove();
						});
					});

			},
			
			// Initializes jQuery utility functions
			initJQueryUtilityFuncs: function() {
				
				jQuery.fn._skel_panels_promote = function(n) {
					this._zIndex = this.css('z-index');
					this.css('z-index', _.config.baseZIndex + (n ? n : 1));
					return this;
				};
				
				jQuery.fn._skel_panels_demote = function() {
					if (this._zIndex)
					{
						this.css('z-index', this._zIndex);
						this._zIndex = null;
					}
					return this;
				};

				jQuery.fn._skel_panels_xcssValue = function(p, v) {
					return jQuery(this)
							.css(p, v)
							.css(p, '-moz-' + v)
							.css(p, '-webkit-' + v)
							.css(p, '-o-' + v)
							.css(p, '-ms-' + v);
				};

				jQuery.fn._skel_panels_xcssProperty = function(p, v) {
					return jQuery(this)
							.css(p, v)
							.css('-moz-' + p, v)
							.css('-webkit-' + p, v)
							.css('-o-' + p, v)
							.css('-ms-' + p, v);
				};

				jQuery.fn._skel_panels_xcss = function(p, v) {
					return jQuery(this)
							.css(p, v)
							.css('-moz-' + p, '-moz-' + v)
							.css('-webkit-' + p, '-webkit-' + v)
							.css('-o-' + p, '-o-' + v)
							.css('-ms-' + p, '-ms-' + v);
				};

				jQuery.fn._skel_panels_resetForms = function() {
					var t = jQuery(this);
					
					jQuery(this).find('form').each(function() {
						this.reset();
					});
					
					return t;
				};
				
				jQuery.fn._skel_panels_initializeCell = function() {
					var t = jQuery(this);
					
					if (t.attr('class').match(/(\s+|^)([0-9]+)u(\s+|$)/))
						t.data('cell-size', parseInt(RegExp.$2));
				};

				jQuery.fn._skel_panels_expandCell = function() {
					var t = jQuery(this);
					var p = t.parent();
					var diff = 12;
					
					p.children().each(function() {
						var t = jQuery(this), c = t.attr('class');
						
						if (c && c.match(/(\s+|^)([0-9]+)u(\s+|$)/))
							diff -= parseInt(RegExp.$2);
					});
					
					if (diff > 0)
					{
						t._skel_panels_initializeCell();
						
						t.css(
							'width',
							(((t.data('cell-size') + diff) / 12) * 100.00) + '%'
						);
					}
				};

				// If useTransform is enabled ...
					if (_.config.useTransform
				// and if we're using IE, it's >= 10 ...
					&&	_._.vars.IEVersion >= 10
				// and no transformBreakpoints were specified *or* if they were, one of them is active ...
					&&	(!_.config.transformBreakpoints || _._.hasActive(_.config.transformBreakpoints.split(',')) ))
				// ... use CSS transforms for animations
					{
						// Translate an element back to its point of origin
							jQuery.fn._skel_panels_translateOrigin = function() {
								return jQuery(this)._skel_panels_translate(0, 0);
							};				

						// Translate an element to specific coordinates
							jQuery.fn._skel_panels_translate = function(x, y) {
								return jQuery(this).css('transform', 'translate(' + x + 'px, ' + y + 'px)');
							};

						// Initialize an element for animation
							jQuery.fn._skel_panels_init = function() {
								return jQuery(this)
										.css('backface-visibility', 'hidden')
										.css('perspective', '500')
										._skel_panels_xcss('transition', 'transform ' + (_.config.speed / 1000.00) + 's ease-in-out');
							};
					}
				// Otherwise, revert to the slower (but still functional) CSS positioning for animations
					else
					{
						var f, origins = [];

						// Forced resets
							_.cache.window
								.resize(function() {

									if (_.config.speed != 0)
									{
										var t = _.config.speed;
										
										_.config.speed = 0;
										
										window.setTimeout(function() {
											
											// Restore animation speed
												_.config.speed = t;
											
											// Wipe origins
												origins = [];
										
										}, t);
									}
								});

						// Translate an element back to its point of origin
							jQuery.fn._skel_panels_translateOrigin = function() {

								for (var i=0; i < this.length; i++)
								{
									var	e = this[i], t = jQuery(e);
									
									if (origins[e.id])
										t.animate(origins[e.id], _.config.speed, 'swing', function() {
										
											// Make sure element is back to its true origin
												_._.iterate(origins[e.id], function(i) {
													t.css(i, origins[e.id][i]);
												});

											// Reset stuff an animation might've changed
												_.cache.body
													.css('overflow-x', 'visible');
												_.cache.pageWrapper
													.css('width', 'auto')
													.css('padding-bottom', 0);
										
										});
								}
								
								return jQuery(this);
							};
						
						// Translate an element to specific coordinates
							jQuery.fn._skel_panels_translate = function(x, y) {

								var i, j, fx, fy;
								
								// Fix x, y
									x = parseInt(x);
									y = parseInt(y);

								// If we're changing X, change some stuff
									if (x != 0)
									{
										_.cache.body
											.css('overflow-x', 'hidden');
										_.cache.pageWrapper
											.css('width', _.cache.window.width());
									}
								// Otherwise, set things back to normal (once we're done moving)
									else
									{
										fx = function() {
											_.cache.body
												.css('overflow-x', 'visible');
											_.cache.pageWrapper
												.css('width', 'auto');
										};
									}
								
								// If we're moving everything *up*, temporarily pad the bottom of the page wrapper
									if (y < 0)
									{
										_.cache.pageWrapper
											.css('padding-bottom', Math.abs(y));
									}
								// Otherwise, lose the page wrapper's bottom padding (once we're done moving)
									else
									{
										fy = function() {
											_.cache.pageWrapper
												.css('padding-bottom', 0);
										};
									}

								// Step through selector's elements
									for (i=0; i < this.length; i++)
									{
										var	e = this[i],
											t = jQuery(e),
											p;
										
										// Calculate and cache origin (if it hasn't been set yet)
											if (!origins[e.id])
											{
												// If an overlay position was set on the element, use that
													if ((p = _.positions.overlays[t.data('skel-panels-overlay-position')]))
														origins[e.id] = p;
												// If a panel position was set on the element, use that to determine its correct anchors (t/r/b/l)
													else if ((p = _.positions.panels[t.data('skel-panels-panel-position')]))
													{
														origins[e.id] = {};
														
														for (j=0; p[j]; j++)
															origins[e.id][p[j]] = parseInt(t.css(p[j]));
													}
												// Otherwise, calculate it based on the element's current position
													else
													{
														p = t.position();
														origins[e.id] = { top: p.top, left: p.left };
													}
											}

										// Calculate new position
											a = {};
											
											_._.iterate(origins[e.id], function(i) {
												var v;
												
												switch (i)
												{
													case 'top':
														v = _.recalcH(origins[e.id][i]) + y;
														break;

													case 'bottom':
														v = _.recalcH(origins[e.id][i]) - y;
														break;

													case 'left':
														v = _.recalcW(origins[e.id][i]) + x;
														break;

													case 'right':
														v = _.recalcW(origins[e.id][i]) - x;
														break;
												}
												
												a[i] = v;
											});
										
										// Move
											t.animate(a, _.config.speed, 'swing', function() {
												
												// Run functions (if they're set)
													if (fx)
														(fx)();
														
													if (fy)
														(fy)();

											});
									}
								
								return jQuery(this);
							};

						// Initialize an element for animation
							jQuery.fn._skel_panels_init = function() {
								return jQuery(this)
									.css('position', 'absolute');
							};
					}

			},

			// Initializes objects
			initObjects: function() {
				
				// window
					_.cache.window = jQuery(window);

						_.cache.window.load(function() {
							if (_.cache.window.scrollTop() == 0)
								window.scrollTo(0, 1);
						});

				_._.DOMReady(function() {

				// body
					_.cache.body = jQuery('body');
				
				// pageWrapper
					_.cache.body.wrapInner('<div id="skel-panels-pageWrapper" />');
					_.cache.pageWrapper = jQuery('#skel-panels-pageWrapper');
					_.cache.pageWrapper
						.css('position', 'relative')
						.css('left', '0')
						.css('right', '0')
						.css('top', '0')
						//.css('bottom', '0')
						._skel_panels_init();
						
				// defaultWrapper
					_.cache.defaultWrapper = jQuery('<div id="skel-panels-defaultWrapper" />').appendTo(_.cache.body);
					_.cache.defaultWrapper
						.css('height', '100%');

				// fixedWrapper
					_.cache.fixedWrapper = jQuery('<div id="skel-panels-fixedWrapper" />').appendTo(_.cache.body);
					_.cache.fixedWrapper
						.css('position', 'relative');
				
					// Move elements with the "skel-panels-fixed" class to fixedWrapper
						jQuery('.skel-panels-fixed').appendTo(_.cache.fixedWrapper);
				
				// Register locations
					_._.registerLocation('skel_panels_defaultWrapper', _.cache.defaultWrapper[0]);
					_._.registerLocation('skel_panels_fixedWrapper', _.cache.fixedWrapper[0]);
					_._.registerLocation('skel_panels_pageWrapper', _.cache.pageWrapper[0]);

				// Hack: "autofocus" attribute stops working on webkit when we wrap stuff, so go ahead and force focus here.
					jQuery('[autofocus]').focus();

				});

			},
		
			// Initializes includes
			initIncludes: function() {
			
				_._.DOMReady(function() {
					jQuery('.skel-panels-include').each(function() { _.parseInit(jQuery(this)); });
				});
			
			},
		
			// Initializes Panels
			init: function() {

				_.eventType = (_._.vars.isTouch ? 'touchend' : 'click');

				// Hack: Disable transforms on devices that lack proper support for them
					if ((_._.vars.deviceType == 'android' && _._.vars.deviceVersion < 4)
					||	_._.vars.deviceType == 'wp')
						_.config.useTransform = false;

				// Objects
					_.initObjects();

				// jQuery Utility functions
					_.initJQueryUtilityFuncs();

				// Elements
					_.initElements('overlay');
					_.initElements('panel');

				// Includes
					_.initIncludes();

				// Force a state update
					_._.updateState();
			
			}

	}

	return _;

})());