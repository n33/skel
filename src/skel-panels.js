/* skelJS v0.3.3-dev | (c) n33 | n33.co @n33co | MIT + GPLv2 */

/*
	This is for development purposes only. Use the minified version instead.
*/

skel.registerPlugin('panels', (function() { var _ = {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Properties
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		config: {
			baseZIndex: 10000,						// Base z-index (should be well above anything else on the page)
			speed: 250,								// Animation speed (in ms)
			panels: {},								// Panels
			overlays: {}							// Overlays
		},

		cache: {
			panels: {},
			overlays: {},
			body: null,
			window: null,
			pageWrapper: null,
			defaultWrapper: null,
			fixedWrapper: null,
			activePanel: null
		},

		deviceType: null,
		eventType: 'click',
		isTouch: false,
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		presets: {
			'standard': {
				panels: {
					navPanel: {
						breakpoints: 'mobile',
						position: 'left',
						style: 'push',
						size: '80%',
						html: '<div data-action="navList" data-target="nav"></div>'
					}
				},
				overlays: {
					titleBar: {
						breakpoints: 'mobile',
						position: 'top-left',
						width: '100%',
						height: 44,
						html: '<span class="toggle" data-action="togglePanel" data-target="navPanel"></span>' +
							  '<span class="title" data-action="copyHTML" data-target="logo"></span>'
					}
				}
			}
		},
		defaults: {
			config: {
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

		/* Misc */

			recalcW: function(n) {
				var i = parseInt(n);

				if (typeof n == 'string'
				&& n.charAt(n.length - 1) == '%')
					i = Math.floor(jQuery(window).width() * (i / 100.00));

				return i;
			},
			
			recalcH: function(n) {
				var i = parseInt(n);

				if (typeof n == 'string'
				&& n.charAt(n.length - 1) == '%')
					i = Math.floor(jQuery(window).height() * (i / 100.00));

				return i;
			},
			
			getHalf: function(n) {
				var i = parseInt(n);

				if (typeof n == 'string'
				&& n.charAt(n.length - 1) == '%')
					return Math.floor(i / 2) + '%';
					
				return Math.floor(i / 2) + 'px';
			},

		/* Parse */

			parseSuspend: function(x) {
				
				var o = x.get(0);
				
				if (o.suspend_skel)
					o.suspend_skel();

			},

			parseResume: function(x) {

				var o = x.get(0);
				
				if (o.resume_skel)
					o.resume_skel();

			},

			parseInit: function(x) {

				var a,b;
				
				var	o = x.get(0),
					action = x.attr('data-action'),
					target = (x.attr('data-target') ? jQuery('#' + x.attr('data-target')) : null),
					targetHide = (x.attr('data-target-hide') == 1);
				
				switch (action)
				{
					// panelToggle (Opens/closes a panel)
					// target = panel
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
									_.cache.activePanel.close_skel();
									return false;
								}

								var t = jQuery(this), panel = _.cache.panels[t.attr('data-target')];
								
								if (panel.is(':visible'))
									panel.close_skel();
								else
									panel.open_skel();
							};

							// Workaround: Android doesn't seem to register touch events on fixed elements properly,
							// so if this panelToggle is on an overlay it needs to be a click.
							if (_.deviceType == 'android')
								x.bind('click', a);
							else
								x.bind(_.eventType, a);
						
							break;
				
					// navList (Builds a nav list using links from an existing nav)
					// target = existing nav
						case 'navList':
							a = target.find('a');
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
					// target = the element
						case 'copyText':
							x.html(target.text());
							break;

					// copyHTML (Copies HTML using jQuery.html() from an element)
					// target = the element
						case 'copyHTML':
							x.html(target.html());
							break;
						
					// moveHTML (Moves an element's (inner) HTML to this one)
					// target = the element
						case 'moveHTML':
						
							o.resume_skel = function() {
								console.log('moving HTML');
								target.children().each(function() {
									x.append(jQuery(this));
								});
								if (targetHide)
									target.hide();
							};
							
							o.suspend_skel = function() {
								console.log('returning HTML');
								x.children().each(function() {
									target.append(jQuery(this));
								});
								if (targetHide)
									target.show();
							};
							
							o.resume_skel();
						
							break;
						
					// moveElement (Moves an element to this one)
					// target = the element
						case 'moveElement':
						
							o.resume_skel = function() {
								console.log('moving element');
								
								// Insert placeholder before target
									jQuery('<div id="skel-panels-tmp-' + target.attr('id') + '" />').insertBefore(target);
								
								// Move target
									x.append(target);
							};
							
							o.suspend_skel = function() {
								console.log('returning HTML');
								
								// Replace placeholder with target
									jQuery('#skel-panels-tmp-' + target.attr('id')).replaceWith(target);
							};
							
							o.resume_skel();
						
							break;
						
					default:
						break;
				}
				
			},
		
		/* View */
		
			lockView: function(a) {

				_.cache.window.scrollPos_skel = _.cache.window.scrollTop();
			
				// Lock overflow
					_.cache.body.css('overflow-' + a, 'hidden');
				
				// Lock events
					_.cache.pageWrapper.bind('touchstart.lock', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (_.cache.activePanel)
							_.cache.activePanel.close_skel();
					});

					_.cache.pageWrapper.bind('click.lock', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (_.cache.activePanel)
							_.cache.activePanel.close_skel();
					});

					_.cache.pageWrapper.bind('scroll.lock', function(e) {
						e.preventDefault();
						e.stopPropagation();

						if (_.cache.activePanel)
							_.cache.activePanel.close_skel();
					});
						
					_.cache.window.bind('orientationchange.lock', function(e) {
						if (_.cache.activePanel)
							_.cache.activePanel.close_skel();
					});

					if (!_.isTouch)
					{
						_.cache.window.bind('resize.lock', function(e) {
							if (_.cache.activePanel)
								_.cache.activePanel.close_skel();
						});
						_.cache.window.bind('scroll.lock', function(e) {
							if (_.cache.activePanel)
								_.cache.activePanel.close_skel();
						});
					}

			},
			
			unlockView: function(a) {
				
				// Unlock overflow
					_.cache.body.css('overflow-' + a, 'visible');
				
				// Unlock events
					_.cache.pageWrapper.unbind('touchstart.lock');
					_.cache.pageWrapper.unbind('click.lock');
					_.cache.pageWrapper.unbind('scroll.lock');
					_.cache.window.unbind('orientationchange.lock');
					
					if (!_.isTouch)
					{
						_.cache.window.unbind('resize.lock');
						_.cache.window.unbind('scroll.lock');
					}

			},
		
		/* Element */
		
			resumeElement: function(o) {

				// Get object from cache
					var t = _.cache[o.type + 's'][o.id];
			
				// Parse (resume)
					t.find('*').each(function() { _.parseResume(jQuery(this)); });				
				
				console.log(o.id + ': ' + o.type + ' resumed');

			},
		
			suspendElement: function(o) {
			
				// Get object from cache
					var t = _.cache[o.type + 's'][o.id];

				// Reset translate
					t.css('transform', 'translate(0,0)');

				// Parse (suspend)
					t.find('*').each(function() { _.parseSuspend(jQuery(this)); });				
				
				console.log(o.id + ': ' + o.type + ' suspended');

			},
	
			initElement: function(o) {

				var	config = o.config, t = jQuery(o.object);

				// Cache object
					_.cache[o.type + 's'][o.id] = t;
				
				// Basic stuff
					t
						.applyTransition_skel()
						.accelerate_skel();
						
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
										.click(function(e) {
											e.preventDefault();
											e.stopPropagation();
											
											var href = jQuery(this).attr('href');
											
											_.cache.activePanel.close_skel();
											
											window.setTimeout(function() {
												window.location.href = href;
											}, _.config.speed + 10);
										});

								// Workaround: iOS zooms + scrolls on focus. Messes up panel stuff. This fix isn't perfect but it works.
									if (_.deviceType == 'ios')
									{
										t.find('input,select,textarea').focus(function(e) {
											var i = jQuery(this);
											
											e.preventDefault();
											e.stopPropagation();
											
											window.setTimeout(function() {
												var scrollPos = _.cache.window.scrollPos_skel;
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
												.css('height', _.recalcH(config.size))
												.scrollTop(0);
												
											if (_.isTouch)
											{
												t
													.css('overflow-y', 'scroll')
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
														t.open_skel = function() {
															
															// Place panel
																t
																	.promote_skel()
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
																	t.resetForms_skel();
															
															// Lock view
																_.lockView('x');
															
															// Move stuff
																window.setTimeout(function() {
																
																	t
																		.add(_.cache.fixedWrapper.children())
																		.add(_.cache.pageWrapper)
																		.css('transform', 'translate(0px,' + sign + _.recalcH(config.size) + 'px)');
																	
																	// Set active
																		_.cache.activePanel = t;
																
																}, 100);
														};
													
													// Close
														t.close_skel = function() {
														
															// Defocus panel
																t.find('*').blur();
														
															// Move stuff back
																t
																	.add(_.cache.pageWrapper)
																	.add(_.cache.fixedWrapper.children())
																	.css('transform', 'translate(0px,0px)');

															// Cleanup
																window.setTimeout(function() { 
																	
																	// Unlock view
																		_.unlockView('x');
																		
																	// Hide and demote panel
																		t
																			.demote_skel()
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
												.css('width', _.recalcW(config.size))
												.scrollTop(0);
												
											if (_.isTouch)
											{
												t
													.css('overflow-y', 'scroll')
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
																t.close_skel();
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
														t.open_skel = function() {
															
															// Place panel
																t
																	.promote_skel()
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
																	t.resetForms_skel();
															
															// Lock view
																_.lockView('x');
															
															// Move stuff
																window.setTimeout(function() {
																
																	t
																		.add(_.cache.fixedWrapper.children())
																		.add(_.cache.pageWrapper)
																		.css('transform', 'translate(' + sign + _.recalcW(config.size) + 'px,0px)');
															
																	// Set active
																		_.cache.activePanel = t;
																
																}, 100);
														};
													
													// Close
														t.close_skel = function() {
														
															// Defocus panel
																t.find('*').blur();
														
															// Move stuff back
																t
																	.add(_.cache.fixedWrapper.children())
																	.add(_.cache.pageWrapper)
																	.css('transform', 'translate(0px,0px)');
																
															// Cleanup
																window.setTimeout(function() { 
																	
																	// Unlock view
																		_.unlockView('x');
																		
																	// Hide and demote panel
																		t
																			.demote_skel()
																			.hide();
																			
																	// Clear active
																		_.cache.activePanel = null;
																
																}, _.config.speed + 50);
														};
													
													break;
													
												case 'reveal':
													
													// Open
														t.open_skel = function() {
															
															// Promote page and fixedWrapper
																_.cache.fixedWrapper.promote_skel(2);
																_.cache.pageWrapper.promote_skel(1);
															
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
																	t.resetForms_skel();

															// Lock view
																_.lockView('x');
															
															// Move stuff
																window.setTimeout(function() {
																
																	_.cache.pageWrapper
																		.add(_.cache.fixedWrapper.children())
																		.css('transform', 'translate(' + sign + _.recalcW(config.size) + 'px,0px)');
																	
																	// Set active
																		_.cache.activePanel = t;
																
																}, 100);
														};
													
													// Close
														t.close_skel = function() {
														
															// Defocus panel
																t.find('*').blur();

															// Move stuff back
															
																_.cache.pageWrapper
																	.add(_.cache.fixedWrapper.children())
																	.css('transform', 'translate(0px,0px)');

															// Cleanup
																window.setTimeout(function() { 
																	
																	// Unlock view
																		_.unlockView('x');
																		
																	// Hide panel
																		t.hide();
																		
																	// Demote page
																		_.cache.pageWrapper.demote_skel();
																		_.cache.pageWrapper.demote_skel();

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
							
							// Position
								switch (config.position)
								{
									case 'top-left':
									default:
										t.addClass('skel-panels-overlay-top-left').css('top', 0).css('left', 0);
										break;

									case 'top-right':
										t.addClass('skel-panels-overlay-top-right').css('top', 0).css('right', 0);
										break;

									case 'top':
									case 'top-center':
										t.addClass('skel-panels-overlay-top-center').css('top', 0).css('left', '50%').css('margin-left', '-' + _.getHalf(config.width));
										break;

									case 'bottom-left':
										t.addClass('skel-panels-overlay-bottom-left').css('bottom', 0).css('left', 0);
										break;

									case 'bottom':
									case 'bottom-center':
										t.addClass('skel-panels-overlay-bottom-center').css('bottom', 0).css('left', '50%').css('margin-left', '-' + _.getHalf(config.width));
										break;

									case 'bottom-right':
										t.addClass('skel-panels-overlay-bottom-right').css('bottom', 0).css('right', 0);
										break;

									case 'left':
									case 'middle-left':
										t.addClass('skel-panels-overlay-middle-left').css('top', '50%').css('left', 0).css('margin-top', '-' + _.getHalf(config.height));
										break;

									case 'right':
									case 'middle-right':
										t.addClass('skel-panels-overlay-middle-left').css('top', '50%').css('right', 0).css('margin-top', '-' + _.getHalf(config.height));
										break;
								}
							
							break;
							
						default:
							break;
					}

				console.log(o.id + ': ' + o.type + ' initialized!');

			},
			
		/* Init */
		
			initElements: function(type) {

				var c, k, o, a, b = [], i;
				
				for (k in _.config[type + 's'])
				{
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
						
						for (i in a)
						{
							z = _._.cacheBreakpointElement(a[i], k, o, (type == 'overlay' ? 'skel_panels_fixedWrapper' : 'skel_panels_defaultWrapper'), 2);
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
						}
				}
				
				// Deal with inline-defined elements
					_._.DOMReady(function() {
						var x, y, k;
						
						for (k in b)
						{
							x = jQuery('#' + k)
							y = jQuery(b[k]);
							x.children().appendTo(y);
							x.remove();
						}
					});

			},
			
			initHelpers: function() {
				
				jQuery.fn.promote_skel = function(n) {
					this._zIndex = this.css('z-index');
					this.css('z-index', _.config.baseZIndex + (n ? n : 1));
					return this;
				};
				
				jQuery.fn.demote_skel = function() {
					if (this._zIndex)
					{
						this.css('z-index', this._zIndex);
						this._zIndex = null;
					}
					return this;
				};

				jQuery.fn.accelerate_skel = function() {
					return jQuery(this)
							.css('backface-visibility', 'hidden')
							.css('perspective', '500'); 
				};

				jQuery.fn.xcssValue_skel = function(p,v) {
					return jQuery(this)
							.css(p, '-moz-' + v)
							.css(p, '-webkit-' + v)
							.css(p, '-o-' + v)
							.css(p, '-ms-' + v)
							.css(p, v);
				};

				jQuery.fn.xcssProperty_skel = function(p,v) {
					return jQuery(this)
							.css('-moz-' + p, v)
							.css('-webkit-' + p, v)
							.css('-o-' + p, v)
							.css('-ms-' + p, v)
							.css(p, v);
				};

				jQuery.fn.xcss_skel = function(p,v) {
					return jQuery(this)
							.css('-moz-' + p, '-moz-' + v)
							.css('-webkit-' + p, '-webkit-' + v)
							.css('-o-' + p, '-o-' + v)
							.css('-ms-' + p, '-ms-' + v)
							.css(p, v);
				};

				jQuery.fn.applyTransition_skel = function() {
					return jQuery(this).xcss_skel('transition', 'transform ' + (_.config.speed / 1000.00) + 's ease-in-out');
				};

				jQuery.fn.clearTransition_skel = function() {
					return jQuery(this).xcss_skel('transition', 'none');
				};
				
				jQuery.fn.resetForms_skel = function() {
					var t = jQuery(this);
					
					jQuery(this).find('form').each(function() {
						this.reset();
					});
					
					return t;
				};

			},

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
						.css('bottom', '0')
						.applyTransition_skel()
						.accelerate_skel();
						
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

				});

			},
		
			initDeviceType: function() {
				
				var k, a = {
					ios: '(iPad|iPhone|iPod)',
					android: 'Android'
				};
				
				for (k in a)
				{
					if (navigator.userAgent.match(new RegExp(a[k], 'g')))
					{
						_.deviceType = k;
						break;
					}
				}
				
				if (!_.deviceType)
					_.deviceType = 'other';

				_.isTouch = !!('ontouchstart' in window);
				_.eventType = (_.isTouch ? 'touchend' : 'click');

			},
		
			init: function() {

				// Device Type
					_.initDeviceType();

				// Helpers
					_.initHelpers();

				// Objects
					_.initObjects();

				// Elements
					_.initElements('overlay');
					_.initElements('panel');

				// Update state
					_._.updateState();
			
			}

	}

	return _;

})());