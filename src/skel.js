/* skelJS v0.4.9 | (c) n33 | skeljs.org | MIT licensed */

/*

	skelJS is a lightweight frontend framework for building responsive sites and apps. Learn more at http://skeljs.org

	This is the uncompressed version of skelJS. For actual projects, please use the minified version (skel.min.js).

	Credits:
		
		CSS Resets (http://meyerweb.com/eric/tools/css/reset/ | v2.0 | 20110126 | License: none (public domain))
		Normalize (normalize.css v2.1.1 | MIT License | git.io/normalize) 
		DOMReady method (based on github.com/ded/domready by @ded; domready (c) Dustin Diaz 2014 - License MIT)

*/

var skel = (function() { var _ = {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Properties
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		config: {					// Config (don't edit this directly; override it per skeljs.org/docs#setup)
			prefix: null,				// Stylesheet prefix (null = disable stylesheet management)
			preloadStyleSheets: false,		// If true, preloads all breakpoint stylesheets on init
			pollOnce: false,			// If true, only polls the viewport width on first load
			resetCSS: false,			// If true, inlines Erik Meyer's CSS resets
			normalizeCSS: false,			// If true, inlines normalize.css
			boxModel: null,				// Sets the CSS box model (border, content, margin, padding)
			useOrientation: false,			// If true, device orientation will be factored into viewport width calculations
			useRTL: false,				// If true, make adjustments for right-to-left (RTL) languages
			pollOnLock: false,			// If true, poll after locking instead of refreshing (= good for testing locally)
			usePerpetualLock: true,			// If true, locking will last until the user says otherwise (not just this session)
			useDomainLock: true,			// If true, locking will apply to the whole domain (not just the current path)
			containers: 960,			// Width of container elements
			grid: {					// Grid
				collapse: false,		// If true, all grids will be collapsed
				gutters: 40,			// Size of gutters
			},
			breakpoints: {				// Breakpoints
				'all': {			// Breakpoint name
					range: '*',		// Range (x-y, x-, -x, *)
					hasStyleSheet: false	// If true, skelJS will assume there's a stylesheet for this breakpoint (prefix + breakpoint name)
				}
			},
			events: {}				// Events (eventName: function() { ... })
		},
		
		isConfigured: false,				// Are we configured?
		isInit: false,					// Are we initialized?
		lockState: null,				// Current lock state
		stateId: '',					// Current state ID
		me: null,					// My <script> element
		breakpoints: [],				// Breakpoints
		breakpointList: [],				// List of breakpoint names
		events: [],					// Bound events
		plugins: {},					// Active plugins
		cache: {					// Object cache
			elements: {},				// Elements
			states: {}				// States
		},
		locations: {					// Locations to insert stuff
			html: null,				// <html>
			head: null,				// <head>
			body: null				// <body>
		},
		vars: {},					// Internal vars

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		lsc: '_skel_lock',				// Lock state cookie name (don't change this)
		sd: ' ',					// State ID delimiter (don't change this)
		css: {						// CSS code blocks (reset, normalize)
			r: 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}',
			n: 'article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{background:#fff;color:#000;font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em}pre{white-space:pre-wrap}q{quotes:"\201C" "\201D" "\2018" "\2019"}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}button,input{line-height:normal}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}',
		},
		presets: {					// Presets
			'default': {				// Default (placeholder)
			},
			'standard': {				// Standard (mobile/desktop/standard)
				breakpoints: {
					'mobile': {
						range: '-480',
						lockViewport: true,
						containers: 'fluid',
						grid: {
							collapse: 1,
							gutters: 10
						}
					},
					'desktop': {
						range: '481-',
						containers: 1200
					},
					'1000px': {
						range: '481-1200',
						containers: 960
					}
				}
			}
		},
		defaults: {					// Defaults for various things
			breakpoint: {				// Breakpoint defaults
				test: null,
				config: null,
				elements: null
			},
			config_breakpoint: {			// Breakpoint *config* defaults
				range: '',
				containers: 960,
				lockViewport: false,
				viewportWidth: false,
				viewport: '',
				hasStyleSheet: true,
				grid: {}
			}
		},
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/* Utility */

			// Does stuff when the DOM is ready.
			// Args: function f (Function)
			DOMReady: null,

			// Wrapper/polyfill for document.getElementsByClassName
			// Args: string className (Space separated list of classes)
			// Return: array (List of matching elements)
			getElementsByClassName: null,
			
			// Wrapper/polyfill for (Array.prototype|String).indexOf
			// Args: array search (Object to search), optional integer from (Starting index)
			// Args: string s (String to search), optional integer from (Starting index)
			// Return: integer (Matching index)
			// Return: -1 (No match)
			indexOf: null,
			
			// Safe replacement for "for..in". Avoids stuff that doesn't belong to the array itself (eg. properties added to Array.prototype).
			// Args: array a (Array to iterate), function f(index) (Function to call on each element)
			iterate: null,

			// Extends x by y
			// Args: object x (Target object), object y (Source object)
			extend: function(x, y) {
				
				var k;
				
				_.iterate(y, function(k) {
					if (typeof y[k] == 'object')
					{
						if (typeof x[k] != 'object')
							x[k] = {};
						
						_.extend(x[k], y[k]);
					}
					else
						x[k] = y[k];
				});
			
			},

			// Parses a CSS measurement string (eg. 960, '960px', '313.37em') and splits it into its numeric and unit parts
			// Args: string x (CSS measurement)
			// Returns: array (0 = (float) numeric part, 1 = (string) unit part)
			parseMeasurement: function(x) { 

				var a, tmp;

				// Not a string? Just assume it's in px
					if (typeof x !== 'string')
						a = [x,'px'];
				// Fluid shortcut?
					else if (x == 'fluid')
						a = [100,'%'];
				// Okay, hard way it is ...
					else
					{
						var tmp;
						
						tmp = x.match(/([0-9\.]+)([^\s]*)/);
						
						// Missing units? Assume it's in px
							if (tmp.length < 3 || !tmp[2])
								a = [parseFloat(x),'px'];
						// Otherwise, we have a winrar
							else
								a = [parseFloat(tmp[1]),tmp[2]];
					}
				
				return a;

			},

			// Figures out the client's device pixel ratio.
			// Returns: float (Device pixel ratio)
			getDevicePixelRatio: function() {

				var ua = navigator.userAgent;

				// Hack: iOS, OS X (retina), Chrome/Blink, and Windows automatically factor the DPR into screen measurements
					if (_.vars.deviceType == 'ios'
					||	_.vars.deviceType == 'mac'
					||	_.vars.deviceType == 'windows'
					||	(_.vars.deviceType == 'android' && ua.match(/Safari\/([0-9]+)/) && parseInt(RegExp.$1) >= 537))
						return 1;
						
				// If DPR is available, use it (Hack: But only if we're not using Firefox mobile, which appears to always report 1)
					if (window.devicePixelRatio !== undefined && !ua.match(/(Firefox; Mobile)/))
						return window.devicePixelRatio;

				// If matchMedia is available, attempt to use that instead
					if (window.matchMedia)
					{
						if (window.matchMedia('(-webkit-min-device-pixel-ratio: 2),(min--moz-device-pixel-ratio: 2),(-o-min-device-pixel-ratio: 2/1),(min-resolution: 2dppx)').matches)
							return 2;
						else if (window.matchMedia('(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)').matches)
							return 1.5;
					}
				
				return 1;
			},
			
			// Converts a "level" setting (like collapse) to an integer.
			// Returns: integer
			getLevel: function(x) {
				
				if (typeof x == 'boolean')
					return (x ? 1 : 0);
					
				return parseInt(x);

			},

			// Calculates the viewport width used for all breakpoint stuff.
			// Returns: integer (Viewport width)
			getViewportWidth: function() {
			
				var w, o, r;
				
				w = document.documentElement.clientWidth;
				o = (window.orientation !== undefined ? Math.abs(window.orientation) : false);
				r = _.getDevicePixelRatio();
			
				// Screen width smaller than viewport width? Use screen width instead.
					if (screen.width < w)
						w = screen.width;

				// Device has orientation?
					if (o !== false)
					{
						// If orientation detection is enabled, figure out the side we want to use as our "width"
							if (_.config.useOrientation)
							{
								// If we're in landscape, use longest side
									if (o === 90)
										w = Math.max(screen.width, screen.height);
								// Otherwise we're in portrait, so use the shortest side
									else
										w = Math.min(screen.width, screen.height);
							}
						// Otherwise, always default to the *shortest* side
							else
								w = Math.min(screen.width, screen.height);
					}
				
				// Divide by pixel ratio
					w = w / r;

				return w;

			},
			
		/* API  */

			// Unlocks width
			unlock: function() {
				
				// Clear the lock state
					_.lockState = null;
					document.cookie = _.lsc + '=;expires=Thu, 1 Jan 1970 12:00:00 UTC; path=' + (_.config.useDomainLock ? '/' : window.location.pathname);
					console.log('api: unlocking width');
				
				// Poll or reload
					if (_.config.pollOnLock)
						_.poll();
					else
						window.location.reload();

			},
			
			// Locks to a given width
			// Args: integer w (Width)
			lock: function(w) {

				// Set the lock state
					_.lockState = w;
					document.cookie = _.lsc + '=' + w + ';expires=' + (_.config.usePerpetualLock ? 'Thu, 1 Jan 2077 12:00:00 UTC' : 0) + '; path='  + (_.config.useDomainLock ? '/' : window.location.pathname);
					console.log('api: locking width to ' + w);
				
				// Poll or reload
					if (_.config.pollOnLock)
						_.poll();
					else
						window.location.reload();

			},

			// Gets the current lock state
			// Returns: integer (Lock state value)
			// Returns: null (Not locked)
			getLock: function() {

				return _.lockState;

			},
			
			// Determines if we're locked to a width
			// Returns: bool (Lock state)
			isLocked: function() {

				return !!(_.lockState);

			},

			// Determines if an array contains an active breakpoint ID
			// Args: array a (Array of breakpoint IDs)
			// Returns: bool (Breakpoint state)
			hasActive: function(a) {
			
				var result = false;
			
				_.iterate(a, function(i) {
					result = result || _.isActive(a[i]);
				});
				
				return result;
			
			},
			
			// Determines if a given breakpoint is active
			// Args: string k (Breakpoint ID)
			// Returns: bool (Breakpoint state)
			isActive: function(k) {

				return (_.indexOf(_.stateId, _.sd + k) !== -1);

			},
			
			// Determines if a given breakpoint was active before the last state change
			// Args: string k (Breakpoint ID)
			// Returns: bool (Breakpoint state)
			wasActive: function(k) {

				return (_.indexOf(_.vars.lastStateId, _.sd + k) !== -1);

			},
			
			// Determines if a given breakpoint applies to the current viewport width
			// Args: string k (Breakpoint ID)
			// Returns: bool (Breakpoint applicability)
			canUse: function(k) {

				return (_.breakpoints[k] && (_.breakpoints[k].test)(_.getViewportWidth()));
			
			},
			
		/* Row Operations */

			// Unreverses all reversed rows
			unreverseRows: function() {

				var x = _.getElementsByClassName('row');
				
				_.iterate(x, function(i) {

					// Hack: Webkit seems to pass along an explicit 'length' property with getElementsByClassName. Screws stuff up.
						if (i === 'length')
							return;

					var	row = x[i];
					
					// If the row hasn't been reversed, bail
						if (!row._skel_isReversed)
							return;
				
					// Unreverse the row
						var children = row.children, j;
					
						for (j=1; j < children.length; j++)
							row.insertBefore(children[j], children[0]);

					// Mark it as unreversed
						row._skel_isReversed = false;
				
				});

			},

			// Reverses all rows
			// Arg: integer collapseLevel (If specified, only reverse rows with a no-collapse level below this level)
			reverseRows: function(collapseLevel) {
			
				var x = _.getElementsByClassName('row');
				
				_.iterate(x, function(i) {

					// Hack: Webkit seems to pass along an explicit 'length' property with getElementsByClassName. Screws stuff up.
						if (i === 'length')
							return;

					var	row = x[i];

					// If the row has already been reversed, or it falls below a given no-collapse level, bail
						if (row._skel_isReversed
						||	(collapseLevel > 0 && row.className.match(/\bno-collapse-([0-9])\b/) && parseInt(RegExp.$1) >= collapseLevel))
							return;
					
					// Reverse the row
						var children = row.children, j;
					
						for (j=1; j < children.length; j++)
							row.insertBefore(children[j], children[0]);

					// Mark it as reversed
						row._skel_isReversed = true;
				
				});
			
			},

		/* Events */

			// Binds an event
			// Args: string name (Name), function f (Function)
			bind: function(name, f) {

				if (!_.events[name])
					_.events[name] = [];
					
				_.events[name].push(f);

			},
			
			// Triggers an event
			// Args: string name (Name)
			trigger: function(name) {
				
				if (!_.events[name] || _.events[name].length == 0)
					return;
				
				var k;
				
				_.iterate(_.events[name], function(k) {
					(_.events[name][k])();
				});
			},

			// Shortcut to bind a "stateChange" event
			// Args: function f (Function)
			onStateChange: function(f) {

				_.bind('stateChange', f); 
				
				// If skelJS has already been initialized and we're just now binding this event,
				// we're late to the game so manually fire it once.
					if (_.isInit)
						(f)();

			},

		/* Locations */
		
			// Registers a location element
			// Args: string id (Location ID), DOMHTMLElement object (Location element)
			registerLocation: function(id, object) {

				if (id == 'head')
					object._skel_attach = function(x) {
						
						// If "me" is in <head>, insert x before "me"
							if (this === _.me.parentNode)
								this.insertBefore( x, _.me );
						// Otherwise, just append it
							else
								this.appendChild( x );
					
					};
				else
					object._skel_attach = function(x) {
						this.appendChild( x );
					};

				_.locations[id] = object;
			
			},

		/* Elements */

			// Caches an HTML element
			// Args: string id (ID), DOMHTMLElement object (HTML element), string location (Location ID), integer priority (Priority)
			// Returns: object (Cache entry)
			cacheElement: function(id, object, location, priority) {

				console.log('(cached element ' + id + ')');

				return (_.cache.elements[id] = {
					'id': id,
					'object': object,
					'location': location,
					'priority': priority
				});

			},

			// Caches an HTML element and links it to a specific breakpoint
			// Args: string breakpointId (Breakpoint ID), string id (ID), DOMHTMLElement object (HTML element), string location (Location ID), integer priority (Priority)
			// Returns: object (Cache entry)
			cacheBreakpointElement: function(breakpointId, id, object, location, priority) {
				
				var o = _.getCachedElement(id);
				
				// Not cached yet? Go ahead and take care of that.
					if (!o)
						o = _.cacheElement(id, object, location, priority); 
				
				// Link it to the specified breakpoint (assuming it exists)
					if (_.breakpoints[breakpointId])
					{
						console.log('- linked element ' + id + ' to breakpoint ' + breakpointId);
						_.breakpoints[breakpointId].elements.push(o);
					}

				return o;

			},

			// Gets a cache entry
			// Args: string id (Cache entry ID)
			// Return: object (Cache entry)
			// Return: null (Cache entry doesn't exist)
			getCachedElement: function(id) {

				if (_.cache.elements[id])
					return _.cache.elements[id];
					
				return null;

			},
		
			// Detaches all cached HTML elements from the DOM
			detachAllElements: function() {

				var k, x;
				
				_.iterate(_.cache.elements, function(k) {
					x = _.cache.elements[k].object;
					
					// No parent? Guess it's already detached so we can skip it.
						if (!x.parentNode
						|| (x.parentNode && !x.parentNode.tagName))
							return;

					// Detach it
						console.log('-- detached ' + _.cache.elements[k].id);
						x.parentNode.removeChild(x);

					// Trigger onDetach
						if (_.cache.elements[k].onDetach)
							(_.cache.elements[k].onDetach)();
				});

			},
		
			// Attaches a list of cached elements to the DOM
			// Args: array list (Cache entries to attach)
			attachElements: function(list) {

				var a = [], w = [], k, l, x;
				
				// Reorganize elements into priority "buckets"
					_.iterate(list, function(k) {
						if (!a[ list[k].priority ])
							a[ list[k].priority ] = [];
							
						a[ list[k].priority ].push(list[k]);
					});

				// Step through bucket list (heh)
					_.iterate(a, function(k) {
						// Nothing in this one? Skip it.
							if (a[k].length == 0)
								return;
						
						// Step through bucket contents.
							_.iterate(a[k], function(x) {
								// Get the element's location.
									l = _.locations[ a[k][x].location ];
							
								// If the location exists, go ahead and attach the element.
									if (l)
									{
										console.log('-- attached (' + k + ') ' + a[k][x].id);

										l._skel_attach( a[k][x].object );

										// Trigger onAttach
											if (a[k][x].onAttach)
												(a[k][x].onAttach)();
									}
								// However, if the location doesn't exist, that means either a) the location
								// is invalid (which is weird), or b) it doesn't exist *yet* because the
								// rest of the DOM hasn't been loaded (which is more likely). Assuming (b)
								// is indeed the case, we'll just put the element in a separate "DOMReady"
								// bucket for now.
									else
									{
										console.log('-- DOMReady attached (' + k + ') ' + a[k][x].id);
										w.push(a[k][x]);
									}
							});
					});
				
				// If our DOMReady bucket isn't empty, bind an event that triggers when the DOM is
				// actually ready. When that happens, we'll go through our DOMReady bucket and finally
				// sort out those elements.
					if (w.length > 0)
					{
						_.DOMReady(function() {
							_.iterate(w, function(k) {
								// Get the element's location
									l = _.locations[ w[k].location ];
								
								// If the location exists (which by now it should), attach the element.
									if (l)
									{
										l._skel_attach(w[k].object);
										
										// Trigger onAttach
											if (w[k].onAttach)
												(w[k].onAttach)();
									}
							});
						});
					}

			},

		/* Main */
	
			// Polls for state changes
			poll: function() {
			
				var k, w, newStateId = '';
				
				// If we're locked to a width, use that as the viewport width
					if (_.lockState)
						w = _.lockState;
				// Otherwise, calculate the actual viewport width
					else
						w = _.getViewportWidth();

				// Set vars
					_.vars.viewportWidth = w;
					_.vars.devicePixelRatio = _.getDevicePixelRatio();
				
				// Determine new state
					_.iterate(_.breakpoints, function(k) {
						if ((_.breakpoints[k].test)(w))
							newStateId += _.sd + k;
					});
			
				if (newStateId === '')
					newStateId = _.sd;
			
				// State changed?
					if (newStateId !== _.stateId)
					{
						// Remove previous state classes from <html>
							_.locations.html.className = _.locations.html.className.replace(_.stateId, '');

						// Change state
							_.changeState(newStateId);
							
						// Apply new state classes to <html>
							_.locations.html.className = _.locations.html.className + _.stateId;
					}
			
			},
		
			// Forces a state update. Typically called after the cache has been modified by something other than skelJS (like a plugin).
			updateState: function() {

				var b, k, j, list = [], a = _.stateId.substring(1).split(_.sd);
				
				// Step through active state's breakpoints
					_.iterate(a, function(k) {
						b = _.breakpoints[a[k]];
						
						// No elements? Skip it.
							if (b.elements.length == 0)
								return;
								
						// Add the breakpoint's elements to the state's cache
							_.iterate(b.elements, function(j) {
								console.log('- added new breakpoint element ' + b.elements[j].id + ' to state ' + _.stateId);
								_.cache.states[_.stateId].elements.push(b.elements[j]);
								list.push(b.elements[j]);
							});
					});
				
				// If new elements were detected, go ahead and attach them
					if (list.length > 0)
					{
						console.log('- updating state ... ');
						_.attachElements(list);
					}

			},
		
			// Switches to a different state.
			// Args: string newStateId (New state ID)
			changeState: function(newStateId) {

				var	breakpointIds, location, state,
					a, x, id, s1, s2;

				// 1. Set last state var
					_.vars.lastStateId = _.stateId;

				// 2. Change state ID
					_.stateId = newStateId;

					console.log('new state detected (id: ' + _.stateId + ')');
				
				// 3. Get state
					if (!_.cache.states[_.stateId])
					{
						console.log('- not cached. building ...');

						// 3.1. Build state
							_.cache.states[_.stateId] = { config: {}, elements: [], values: {} };
							state = _.cache.states[_.stateId];

						// 3.2. Build composite configuration
							if (_.stateId === _.sd)
								breakpointIds = [];
							else
								breakpointIds = _.stateId.substring(1).split(_.sd);

							// Extend config by basic breakpoint config
								_.extend(state.config, _.defaults.config_breakpoint);
							
							// Then layer on each active breakpoint's config
								_.iterate(breakpointIds, function(k) {
									_.extend(state.config, _.breakpoints[breakpointIds[k]].config);
								});
							
						// 3.3. Add state elements

							// ELEMENT: Box Model

								if (_.config.boxModel)
								{
									id = 'iBM';
									
									// Get element
										if (!(x = _.getCachedElement(id)))
											x = _.cacheElement(
												id, 
												_.newInline(('*,*:before,*:after{-moz-@;-webkit-@;@}').replace(/@/g,'box-sizing:' + _.config.boxModel + '-box')),
												'head',
												3
											);

									// Push to state
										console.log('- added ' + id);
										state.elements.push(x);
								}

							// ELEMENT: Reset -or- Normalize

								if (_.config.resetCSS)
								{
									id = 'iR';
									
									// Get element
										if (!(x = _.getCachedElement(id)))
											x = _.cacheElement(
												id, 
												_.newInline(_.css.r), 
												'head', 
												2
											);
									
									// Push to state
										console.log('- added ' + id);
										state.elements.push(x);
								}
								else if (_.config.normalizeCSS)
								{
									id = 'iN';
									
									// Get element
										if (!(x = _.getCachedElement(id)))
											x = _.cacheElement(
												id, 
												_.newInline(_.css.n), 
												'head', 
												2
											);

									// Push to state
										console.log('- added ' + id);
										state.elements.push(x);
								}
								
							// ELEMENT: Base Stylesheet

								if (_.config.prefix)
								{
									id = 'ssB';

									// Get element
										if (!(x = _.getCachedElement(id)))
											x = _.cacheElement(
												id, 
												_.newStyleSheet(_.config.prefix + '.css'), 
												'head', 
												4
											);
									
									// Push to state
										console.log('- added ' + id);
										state.elements.push(x);
								}
								
							// ELEMENT: Viewport <meta> tag

								s1 = state.config.viewport;
								
								// viewportWidth / lockViewport
									if (state.config.viewportWidth)
										s1 += (s1 != '' ? ',' : '') + 'width=' + state.config.viewportWidth;
									else if (state.config.lockViewport)
										s1 += (s1 != '' ? ',' : '') + 'width=device-width';
										
								// lockViewport
									if (state.config.lockViewport)
										s1 += (s1 != '' ? ',' : '') + 'initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0';
								
								// Have at least something for viewport? Set it up.
									if (s1 != '')
									{
										id = 'mV' + _.stateId;
										
										// Get element
											if (!(x = _.getCachedElement(id)))
												x = _.cacheElement(
													id, 
													_.newMeta(
														'viewport',
														s1
													),
													'head',
													1
												);
										
										// Push to state
											console.log('- added ' + id);
											state.elements.push(x);
									}

								// Hack: IE10 (metro and WP) needs -ms-viewport to work properly.
									if (_.vars.IEVersion >= 10)
									{
										id = 'mVIE' + _.stateId;

										// Get element
											if (!(x = _.getCachedElement(id)))
												x = _.cacheElement(
													id, 
													_.newInline('@-ms-viewport{width: device-width}'),
													'head', 
													2
												);

										// Push to state
											console.log('- added ' + id);
											state.elements.push(x);
									}
								
							// ELEMENT: (CSS) Containers
								
								var containerWidth, containerUnits;
									
								// Determine width, units, and id
									
									// Split "containers" into width and units
										a = _.parseMeasurement(state.config.containers);
										containerWidth = a[0];
										containerUnits = a[1];

									// Set "containers" state value (needed for later)
										state.values.containers = containerWidth + containerUnits;
								
									// Set id
										id = 'iC' + containerWidth + containerUnits;
										
								// Get element
									if (!(x = _.getCachedElement(id)))
									{
										var	cs, cn, cb;

										// Set up values
											
											// Small
												cs = (containerWidth * 0.75) + containerUnits;
											
											// Normal
												cn = containerWidth + containerUnits;
											
											// Big
												cb = (containerWidth * 1.25) + containerUnits;

										// Build element
											x = _.cacheElement(
												id,
												_.newInline(
													'body{min-width:' + cn +'}' +
													'.container{margin-left:auto;margin-right:auto;width:' + cn + '}' +
													'.container.small{width:' + cs + '}' + 
													'.container.big{width:100%;max-width:' + cb + ';min-width:' + cn + '}'
												),
												'head',
												3
											);
									}

								// Push to state
									console.log('- added ' + id);
									state.elements.push(x);						

							// ELEMENT: (CSS) Grid

								id = 'iG';

								// Get element
									if (!(x = _.getCachedElement(id)))
										x = _.cacheElement(
											id, 
											_.newInline(
												'.\\31 2u{width:100%}' +
												'.\\31 1u{width:91.6666666667%}' +
												'.\\31 0u{width:83.3333333333%}' +
												'.\\39 u{width:75%}' +
												'.\\38 u{width:66.6666666667%}' +
												'.\\37 u{width:58.3333333333%}' +
												'.\\36 u{width:50%}' +
												'.\\35 u{width:41.6666666667%}' +
												'.\\34 u{width:33.3333333333%}' +
												'.\\33 u{width:25%}' +
												'.\\32 u{width:16.6666666667%}' +
												'.\\31 u{width:8.3333333333%}' +
												'.\\-11u{margin-left:91.6666666667%}' +
												'.\\-10u{margin-left:83.3333333333%}' +
												'.\\-9u{margin-left:75%}' +
												'.\\-8u{margin-left:66.6666666667%}' +
												'.\\-7u{margin-left:58.3333333333%}' +
												'.\\-6u{margin-left:50%}' +
												'.\\-5u{margin-left:41.6666666667%}' +
												'.\\-4u{margin-left:33.3333333333%}' +
												'.\\-3u{margin-left:25%}' +
												'.\\-2u{margin-left:16.6666666667%}' +
												'.\\-1u{margin-left:8.3333333333%}'
											),
											'head', 
											3
										); 
								
								// Push to state
									console.log('- added ' + id);
									state.elements.push(x);

							// ELEMENT: (CSS) Grid / Rows

								id = 'iGR';

								// Get element
									if (!(x = _.getCachedElement(id)))
										x = _.cacheElement(
											id, 
											_.newInline(
												'.row>*{float:left;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}' +
												'.row:after{content:\'\';display:block;clear:both;height:0}' +
												'.row:first-child>*{padding-top:0!important}'
											),
											'head', 
											3
										); 
								
								// Push to state
									console.log('- added ' + id);
									state.elements.push(x);

							// ELEMENT: (CSS) Grid / Rows / Gutters
								
								id = 'iGG' + state.config.grid.gutters;

								// Get element
									if (!(x = _.getCachedElement(id)))
									{
										var gutterSize, gutterUnits,
											gn, gh, gq, goh, gd;

										// Split "gutters" into size and units
											a = _.parseMeasurement(state.config.grid.gutters);
											gutterSize = a[0];
											gutterUnits = a[1];
										
										// Set up values
											gn = (gutterSize) + gutterUnits;
											gh = (gutterSize / 2) + gutterUnits;
											gq = (gutterSize / 4) + gutterUnits;
											goh = (gutterSize * 1.5) + gutterUnits;
											gd = (gutterSize * 2) + gutterUnits;

										// Build element
											x = _.cacheElement(
												'iGG' + state.config.grid.gutters, 
												_.newInline(
													
													// Flush
														'.row.flush{margin-left:0}' +
														'.row.flush>*{padding:0!important}' +
													
													// Normal
														'.row>*{padding-left:' + gn + '}' +
														'.row+.row>*{padding:' + gn + ' 0 0 ' + gn + '}' +
														'.row{margin-left:-' + gn + '}' +
													
													// Half
														'.row.half>*{padding-left:' + gh + '}' +
														'.row+.row.half>*{padding:' + gh + ' 0 0 ' + gh + '}' +
														'.row.half{margin-left:-' + gh + '}' +
													
													// Quarter
														'.row.quarter>*{padding-left:' + gq + '}' +
														'.row+.row.quarter>*{padding:' + gq + ' 0 0 ' + gq + '}' +
														'.row.quarter{margin-left:-' + gq + '}' +
													
													// One and (a) Half
														'.row.oneandhalf>*{padding-left:' + goh + '}' +
														'.row+.row.oneandhalf>*{padding:' + goh + ' 0 0 ' + goh + '}' +
														'.row.oneandhalf{margin-left:-' + goh + '}' +
													
													// Double
														'.row.double>*{padding-left:' + gd + '}' +
														'.row+.row.double>*{padding:' + gd + ' 0 0 ' + gd + '}' +
														'.row.double{margin-left:-' + gd + '}'
												
												), 
												'head', 
												3
											); 
									}

								// Push to state
									console.log('- added ' + id);
									state.elements.push(x);

							// ELEMENT: (CSS) Grid / Collapse

								if (state.config.grid.collapse)
								{
									var	collapseLevel = _.getLevel(state.config.grid.collapse);
									
									id = 'iGC' + collapseLevel;
								
									// Get element
										if (!(x = _.getCachedElement(id)))
										{

											// Collapse
												s1 = ':not(.no-collapse)';
												
												switch (collapseLevel)
												{
													case 4:
														break;

													case 3:
														s1 += ':not(.no-collapse-3)';
														break;

													case 2:
														s1 += ':not(.no-collapse-2):not(.no-collapse-3)';
														break;

													case 1:
													default:
														s1 += ':not(.no-collapse-1):not(.no-collapse-2):not(.no-collapse-3)';
														break;
												}

											// Gutters
												a = _.parseMeasurement(state.config.grid.gutters);
												s2 = (a[0] / 2) + a[1];
											
											// Build Element
												x = _.cacheElement(
													id,
													_.newInline(
														'.row' + s1 + '{margin-left:0}' + 
														'.row' + s1 + '>*{float:none!important;width:100%!important;margin-left:0!important}' + 
														'.row:not(.flush)' + s1 + '>*{padding:' + s2 + ' 0 ' + s2 + ' 0!important;}' +
														'.container{max-width:none!important;min-width:0!important;width:' + state.values.containers + '!important}'
													),
													'head', 
													3
												);
										}
									
									// Push to state
										console.log('- added ' + id);
										state.elements.push(x);						
								}
								
							// ELEMENT: Conditionals

								id = 'iCd' + _.stateId;

								if (!(x = _.getCachedElement(id)))
								{
									s1 = [];
									s2 = [];

									// Get element										
										_.iterate(_.breakpoints, function(k) {
											if (_.indexOf(breakpointIds, k) !== -1)
												s1.push('.not-' + k);
											else
												s2.push('.only-' + k);
										});
										
										var s = (s1.length > 0 ? s1.join(',') + '{display:none!important}' : '') + (s2.length > 0 ? s2.join(',') + '{display:none!important}' : '');
									
										x = _.cacheElement(id,
											_.newInline(
												s.replace(/\.([0-9])/, '.\\3$1 ')
											),
											'head',
											3
										);
									
									// Push to state
										console.log('- added ' + id);
										state.elements.push(x);
								}

							// ELEMENT: Breakpoint-specific

								_.iterate(breakpointIds, function(k) {
									// styleSheet*
										if (_.breakpoints[breakpointIds[k]].config.hasStyleSheet && _.config.prefix)
										{
											id = 'ss' + breakpointIds[k];

											// Get element
												if (!(x = _.getCachedElement(id)))
													x = _.cacheElement(
														id, 
														_.newStyleSheet(_.config.prefix + '-' + breakpointIds[k] + '.css'), 
														'head', 
														5
													);
											
											// Push to state
												console.log('- added ' + id);
												state.elements.push(x);
										}
									
									// Elements
										if (_.breakpoints[breakpointIds[k]].elements.length > 0)
										{
											// Push elements to state
												_.iterate(_.breakpoints[breakpointIds[k]].elements, function(x) {
													console.log('- added breakpoint element ' + _.breakpoints[breakpointIds[k]].elements[x].id);
													state.elements.push(_.breakpoints[breakpointIds[k]].elements[x]);
												});
										}
								});
					}
					else
					{
						state = _.cache.states[_.stateId];
						console.log('- found cached');
					}

				// 4. Detach all elements
					console.log('- detaching all attached elements ...');
					_.detachAllElements();

				// 5. Apply state
					console.log('- applying state elements ... ');
					_.attachElements(state.elements);
					
				// 6. DOMReady stuff
					_.DOMReady(function() {
						
						var x, m, p,
							collapseLevel = _.getLevel(state.config.grid.collapse);
						
						// RTL: Performs a few adjustments to get things working nicely on RTL.
							if (_.config.useRTL)
							{
								_.unreverseRows();

								if (collapseLevel > 0)
									_.reverseRows(collapseLevel);
							}
						
						// important: When collapsed, shifts cells marked as "important" to the top of their respective rows.
						// Not supported on IE<9.
							if (_.vars.IEVersion > 8) {
								m = '_skel_cell_important_placeholder';
								x = _.getElementsByClassName('skel-cell-important');
								
								if (x && x.length > 0)
									_.iterate(x, function(i) {

										if (i === 'length')
											return;
										
										var e = x[i],
											p = e.parentNode,
											pc;
										
										// No parent? Bail.
											if (!p)
												return;
										
										// Figure out the point at which this cell's row collapses.
											if (!p.className.match(/no-collapse-([0-9])/))
											{
												if (p.className.match(/no-collapse/))
													pc = 100;
												else
													pc = 0;
											}
											else
												pc = parseInt(RegExp.$1);
										
										// Row's going to collapse? Proceed with moving cell.
											if (pc < collapseLevel)
											{
												if (e.hasOwnProperty(m) && e[m] !== false)
													return;

												console.log('important: moving to top of row (' + i + ')');

												// Create placeholder.
													p = document.createElement('div');
														p.innerHTML = '';
														p.style.display = 'none';
														e.parentNode.insertBefore(p, e.nextSibling);
											
												// Move cell to top.
													e.parentNode.insertBefore(e, e.parentNode.firstChild);
													
												// Attach placeholder to cell.
													e[m] = p;
											}
										// Otherwise, undo the move (if one was performed previously).
											else
											{
												// If the cell hasn't been moved before it won't have a placeholder, so just set it to false.
													if (!e.hasOwnProperty(m))
														e[m] = false;

												// Get placeholder.
													p = e[m];
												
												// If it's not false, move cell back.
													if (p !== false)
													{
														console.log('important: moving back (' + i + ')');

														// Move e above placeholder.
															e.parentNode.insertBefore(e, p);
															
														// Delete placeholder.
															e.parentNode.removeChild(p);

														// Clear property.
															e[m] = false;
													}
											}
									});
							}

					});
					
				// 7. Set state and stateId vars
					_.vars.state = _.cache.states[_.stateId];
					_.vars.stateId = _.stateId;
					
				// 8. Trigger stateChange event
					_.trigger('stateChange');

			},
		
		/* New */

			// Creates a new meta element
			// Args: string name (Name), string content (Content)
			// Return: DOMHTMLElement (Meta element)
			newMeta: function(name, content) {

				var o = document.createElement('meta');
					o.name = name;
					o.content = content;

				return o;

			},
			
			// Creates a new link element set to load a given stylesheet
			// Args: string href (Stylesheet's href)
			// Return: DOMHTMLElement (Link element)
			newStyleSheet: function(href) {
				
				var o = document.createElement('link');
					o.rel = 'stylesheet';
					o.type = 'text/css';
					o.href = href;
				
				return o;

			},
			
			// Creates a new style element
			// Args: string s (Style rules)
			// Return: DOMHTMLElement (Style element)
			newInline: function(s) {

				var o;

				if (_.vars.IEVersion <= 8)
				{
					o = document.createElement('span');
						o.innerHTML = '&nbsp;<style type="text/css">' + s + '</style>';
				}
				else
				{
					o = document.createElement('style');
						o.type = 'text/css';
						o.innerHTML = s;
				}
				
				return o;

			},

			// Creates a new div element
			// Args: string s (Inner HTML)
			// Return: DOMHTMLElement (Div element)
			newDiv: function(s) {

				var o = document.createElement('div');
					o.innerHTML = s;
				
				return o;

			},

		/* Plugins */

			// Registers a plugin (and, if we're already configured, initialize it)
			// Args: string id (Plugin ID), object o (Plugin)
			registerPlugin: function(id, o) {
				
				_.plugins[id] = o;
				o._ = this;

				if (_.isConfigured)
				{
					_.initPluginConfig(id, _.plugins[id]);
					o.init();
				}
			},
			
			// Initializes a plugin's config
			// Args: string id (Plugin ID), object o (Plugin)
			initPluginConfig: function(id, o) {

				var s, k = '_skel_' + id + '_config';
				
				// Get user config
					if (window[k])
						s = window[k];
					else
					{
						s = document.getElementsByTagName('script');
						s = s[s.length - 1].innerHTML.replace(/^\s+|\s+$/g, '');
						if (s)
							s = eval('(' + s + ')');
					}

				// User config
					if (typeof s == 'object')
					{
						if (s.preset && o.presets[s.preset])
						{
							_.extend(o.config, o.presets[s.preset]);
							_.extend(o.config, s);
						}
						else
							_.extend(o.config, s);
					}

			},

		/* Init */

			// Initializes the config
			initConfig: function() {

				var c, b, s, f, fArgs = [], preloads = [];
				
				// Define the test building function
					function buildTest(k, s)
					{
						var f;

						// Invalid? Always fail.
							if (typeof s != 'string')
								f = function(v) { return false; };
						
						// Wildcard? Always succeed.
							if (s == '*')
								f = function(v) { return true; };
						// Less than or equal (-X)
							else if (s.charAt(0) == '-')
							{
								fArgs[k] = parseInt(s.substring(1));
								f = function(v) { return (v <= fArgs[k]); };
							}
						// Greater than or equal (X-)
							else if (s.charAt(s.length - 1) == '-')
							{
								fArgs[k] = parseInt(s.substring(0, s.length - 1));
								f = function(v) { return (v >= fArgs[k]); };
							}
						// Range (X-Y)
							else if (_.indexOf(s,'-') != -1)
							{
								s = s.split('-');
								fArgs[k] = [parseInt(s[0]), parseInt(s[1])];
								f = function(v) { return (v >= fArgs[k][0] && v <= fArgs[k][1]); };
							}
						// Exact match (X)
							else
							{
								fArgs[k] = parseInt(s);
								f = function(v) { return (v == fArgs[k]); };
							}
						
						return f;
					}

				// Get user config
					if (window._skel_config)
						s = window._skel_config;
					else
					{
						s = _.me.innerHTML.replace(/^\s+|\s+$/g, '');
						if (s)
							s = eval('(' + s + ')');
					}

				// User config
					if (typeof s == 'object')
					{
						// Was a valid preset specified?
							if (s.preset && _.presets[s.preset])
							{
								// Drop default breakpoints
									_.config.breakpoints = {};

								// Extend by preset
									_.extend(_.config, _.presets[s.preset]);
								
								// Extend by object
									_.extend(_.config, s);
							}
						// No? Probably a full user config
							else
							{
								// Does the object have breakpoints defined?
									if (s.breakpoints)
									{
										// Drop default breakpoints
											_.config.breakpoints = {};
									}
									
								// Extend by object
									_.extend(_.config, s);
							}
					}

					// Extend base breakpoint config's grid by config's grid
						_.extend(_.defaults.config_breakpoint.grid, _.config.grid);
						
					// Set base breakpoint config's containers to config's containers
						_.defaults.config_breakpoint.containers = _.config.containers;
				
				// Process breakpoints config
					_.iterate(_.config.breakpoints, function(k) {
						// Convert shortcut breakpoints to full breakpoints
							if (typeof _.config.breakpoints[k] != 'object')
								_.config.breakpoints[k] = { range: _.config.breakpoints[k] };

						// Extend with defaults
							c = {};
							_.extend(c, _.defaults.config_breakpoint);
							_.extend(c, _.config.breakpoints[k]);
							_.config.breakpoints[k] = c;
						
						// Build breakpoint
							b = {};
							_.extend(b, _.defaults.breakpoint);
								b.config = _.config.breakpoints[k];
								b.test = buildTest(k, b.config.range);
								b.elements = [];
							
							_.breakpoints[k] = b;

						// Preload stylesheet
							if (_.config.preloadStyleSheets
							&&	b.config.hasStyleSheet)
								preloads.push(_.config.prefix + '-' + k + '.css');
					
						// Add to list
							_.breakpointList.push(k);
					});
					
				// Process events config
					_.iterate(_.config.events, function(k) {
						_.bind(k, _.config.events[k]);
					});
					
				// Handle stylesheet preloads if we have them (and we're not working locally)
					if (preloads.length > 0
					&&	window.location.protocol != 'file:')
					{
						_.DOMReady(function() {
							var k, h = document.getElementsByTagName('head')[0], x = new XMLHttpRequest();
							
							_.iterate(preloads, function(k) {
								console.log('preloading ' + preloads[k]);
								x.open('GET', preloads[k], false);
								x.send('');
							});
						});
					}

			},
			
			// Initializes browser events
			initEvents: function() {
				
				var o;
				
				if (!_.config.pollOnce)
				{
					// Resize
						window.onresize = function() {
							_.poll();
						};
					
					// Orientation
						if (_.config.useOrientation)
						{
							window.onorientationchange = function() {
								_.poll();
							};
						}
				}

			},
			
			initUtilityMethods: function() {

				// _.DOMReady (based on github.com/ded/domready by @ded; domready (c) Dustin Diaz 2014 - License MIT)
					
					// Hack: Use older version for browsers that don't support addEventListener (*cough* IE8).
						if (!document.addEventListener)
							!function(e,t){_.DOMReady = t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}});
					// And everyone else.
						else
							!function(e,t){_.DOMReady = t()}("domready",function(){function s(t){i=1;while(t=e.shift())t()}var e=[],t,n=document,r="DOMContentLoaded",i=/^loaded|^c/.test(n.readyState);return n.addEventListener(r,t=function(){n.removeEventListener(r,t),s()}),function(t){i?t():e.push(t)}});
				
				// _.getElementsByClassName

					// Wrap existing method if it exists
						if (document.getElementsByClassName)
							_.getElementsByClassName = function(className) { return document.getElementsByClassName(className); }
					// Otherwise, polyfill
						else
							_.getElementsByClassName = function(className) { var d = document; if (d.querySelectorAll) return d.querySelectorAll(('.' + className.replace(' ', ' .')).replace(/\.([0-9])/, '.\\3$1 ')); else return []; }
				
				// _.indexOf

					// Wrap existing method if it exists
						if (Array.prototype.indexOf)
							_.indexOf = function(x,b) { return x.indexOf(b) };
					// Otherwise, polyfill
						else
							_.indexOf = function(x,b){if (typeof x=='string') return x.indexOf(b);var c,a=(b)?b:0,e;if(!this){throw new TypeError()}e=this.length;if(e===0||a>=e){return -1}if(a<0){a=e-Math.abs(a)}for(c=a;c<e;c++){if(this[c]===x){return c}}return -1};

				// _.iterate

					// Use Object.keys if it exists (= better performance)
						if (Object.keys)
							_.iterate = function(a, f) {

								if (!a)
									return [];
								
								var i, k = Object.keys(a);
								
								for (i=0; k[i]; i++)
									(f)(k[i]);

							};
					// Otherwise, fall back on hasOwnProperty (= slower, but works on older browsers)
						else
							_.iterate = function(a, f) {

								if (!a)
									return [];

								var i;
								
								for (i in a)
									if (Object.prototype.hasOwnProperty.call(a, i))
										(f)(i);

							};

			},

			// Initializes the API
			initAPI: function() {
				
				var x, a, ua = navigator.userAgent;
			
				// Vars
					
					// IE version
						_.vars.IEVersion = (ua.match(/MSIE ([0-9]+)\./) ? RegExp.$1 : 99);
					
					// Device type
						_.vars.deviceType = 'other';

						a = {
							ios: '(iPad|iPhone|iPod)',
							android: 'Android',
							mac: 'Macintosh',
							wp: 'Windows Phone',
							windows: 'Windows NT'
						};
				
						_.iterate(a, function(k) {
							if (ua.match(new RegExp(a[k], 'g')))
								_.vars.deviceType = k;
						});
					
					// Device version
						switch (_.vars.deviceType)
						{
							case 'ios':
								
								ua.match(/([0-9_]+) like Mac OS X/);
								x = parseFloat(RegExp.$1.replace('_', '.').replace('_', ''));
								
								break;
								
							case 'android':
							
								ua.match(/Android ([0-9\.]+)/);
								x = parseFloat(RegExp.$1);
							
								break;
								
							case 'mac':
							
								ua.match(/Mac OS X ([0-9_]+)/);
								x = parseFloat(RegExp.$1.replace('_', '.').replace('_', ''));
							
								break;
							
							case 'wp':

								ua.match(/IEMobile\/([0-9\.]+)/);
								x = parseFloat(RegExp.$1);
							
								break;
							
							case 'windows':
							
								ua.match(/Windows NT ([0-9\.]+)/);
								x = parseFloat(RegExp.$1);
							
								break;
								
							default:
								x = 99;
								break;
						}
						
						_.vars.deviceVersion = x;

					// isTouch
						_.vars.isTouch = (_.vars.deviceType == 'wp' ? (navigator.msMaxTouchPoints > 0) : !!('ontouchstart' in window));
					
				// Init lock state
					x = document.cookie.split(';');
					
					_.iterate(x, function(i) {
						var y = x[i].split('=');
						
						if (y[0].replace(/^\s+|\s+$/g, '') == _.lsc)
						{
							_.lockState = y[1];
							return;
						}
					});
					
					console.log('api: width lock is ' + _.lockState);

			},			
			
			// Initializes skelJS
			init: function(config, pluginConfig) {

				console.log('starting init');

				// Init utility methods
					_.initUtilityMethods();

				// Init API
					_.initAPI();

				// Init config
					if (config)
						window._skel_config = config;
						
					if (pluginConfig)
					{
						var id;
						
						_.iterate(pluginConfig, function(id) {
							window['_skel_' + id + '_config'] = pluginConfig[id];
						});
					}
				
					_.initConfig();

				// Register locations
					_.registerLocation('html', document.getElementsByTagName('html')[0]);
					_.registerLocation('head', document.getElementsByTagName('head')[0]);
					
					_.DOMReady(function() {
						_.registerLocation('body', document.getElementsByTagName('body')[0]);
					});

				// Init events
					_.initEvents();

				// Do initial poll
					_.poll();

				// Init plugins
					var id;

					_.iterate(_.plugins, function(id) {
						_.initPluginConfig(id, _.plugins[id]);
						_.plugins[id].init();
					});

				// Mark as initialized
					_.isInit = true;

			},
			
			// Determines if skelJS has been preconfigured (meaning we can call skel.init() as soon as we load) or if
			// a configuration has yet to be provided (in which case we need to hold off and wait for the user to
			// manually call skel.init() with a configuration).
			preInit: function() {

				console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n");

				// Initialize 'me'
					var x = document.getElementsByTagName('script');
					_.me = x[x.length - 1];

				// Are we preconfigured?
					if (window._skel_config)
					{
						console.log('detected configuration (type: preconfigured), performing automatic init');
						_.isConfigured = true;
					}
				// Are we inline configured?
					else
					{
						s = document.getElementsByTagName('script');
						s = s[s.length - 1].innerHTML.replace(/^\s+|\s+$/g, '');
						
						if (s)
						{
							console.log('detected configuration (type: inline), performing automatic init');
							_.isConfigured = true;
						}
					}
				
				// If we're configured, run init now
					if (_.isConfigured)
						_.init();
				// Otherwise, wait for user to manually init later
					else
					{
						console.log('no configuration detected, waiting for manual init');
					}
			
			}
	}

	// Pre-init
		_.preInit();

	return _;

})();