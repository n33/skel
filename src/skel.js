/* skel.js v2.0.0 | (c) n33 | getskel.com | MIT licensed */

/*

	Credits:
		
		CSS Resets (meyerweb.com/eric/tools/css/reset | Eric Meyer | Public domain)
		DOMReady method (github.com/ded/domready | (c) Dustin Diaz 2014 | MIT license)
		matchMedia() polyfill (github.com/paulirish/matchMedia.js | (c) 2012 Scott Jehl, Paul Irish, Nicholas Zakas, David Knight | Dual MIT/BSD license)
		Normalize (git.io/normalize | Nicolas Gallagher, Jonathan Neal | MIT License)

*/

var skel = (function() {

	/**************************************************************************/
	/* skel Object                                                            */
	/**************************************************************************/

		var _ = {

		/******************************/
		/* Properties                 */
		/******************************/

			/**
			 * Breakpoints.
			 * @type {Array}
			 */
			breakpoints: [],
			
			/**
			 * List of breakpoint names.
			 * @type {Array}
			 */
			breakpointList: [],

			/**
			 * Object cache.
			 * @type {object}
			 */
			cache: {		
				
				// Elements.
					elements: {},
				
				// States.
					states: {},
					
				// State Elements.
					stateElements: {}
			
			},
							
			/**
			 * Config (don't edit this directly; override it).
			 * @type {object}
			 */
			config: {
				
				// Breakpoints.
					breakpoints: {

						// Placeholder breakpoint.
							'*': {
								
								// Stylesheet to load when this breakpoint is active (false = no stylesheet).
									href: false,
							
								// Media query ('' = always activate this breakpoint).
									media: ''

							}

					},

				// Width of container elements (N, 'Npx', 'Nem', etc).
					containers: 1140,

				// If specified, default to this state when we have to fall back on skel's own media query parser (eg. IE8).
					defaultState: null,

				// Events (eventName: function() { ... })
					events: {},
			
				// Grid.
					grid: {
						
						// Zoom.
							zoom: 1,
					
						// Sets collapse mode (false = don't collapse, true = collapse everything).
							collapse: false,
						
						// Size of [vertical, horizontal] gutters (N, 'Npx', 'Nem', etc).
						// Setting this to a non-array value will set both gutters to that value.
							gutters: [40, 0]
					
					},
					
				// Lock.
					lock: {
						
						// Path to which the lock applies (false = current path only, '/' = sitewide).
							path: false,
					
						// If true, makes the lock permanent. If false, clears lock at the end of client's session.
							permanent: true
						
					},
				
				// Plugins.
					plugins: {},
				
				// If true, only polls once (on first load).
					pollOnce: false,
				
				// If true, preloads all breakpoint stylesheets on init.
					preload: false,
				
				// CSS reset mode (false = don't reset, 'normalize' = normalize.css, 'full' = Eric Meyer's resets).
					reset: 'normalize',
				
				// If true, make adjustments for right-to-left (RTL) languages.
					RTL: false,
					
				// Viewport.
					viewport: {
						
						// Width.
							width: 'device-width',
							
						// Height.
							height: 'device-height',
							
						// Scalable?
							scalable: true

					}
					
			},

			/**
			 * CSS code (normalize, reset).
			 * @type {object}
			 */
			css: {

				// Box Sizing.
					bm: '*,*:before,*:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}',

				// Normalize.
				// normalize.css v3.0.2 | MIT License | git.io/normalize 
					n: 'html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}',

				// Reset.
				// http://meyerweb.com/eric/tools/css/reset/ v2.0 | 20110126 | License: none (public domain)
					r: 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}',
				
				// Grid cells.
					gc: function(x) {
						return	'.\\31 2u'+x+',.\\31 2u\\24'+x+'{width:100%;clear:none}' + 
								'.\\31 1u'+x+',.\\31 1u\\24'+x+'{width:91.6666666667%;clear:none}' + 
								'.\\31 0u'+x+',.\\31 0u\\24'+x+'{width:83.3333333333%;clear:none}' + 
								'.\\39 u'+x+',.\\39 u\\24'+x+'{width:75%;clear:none}' + 
								'.\\38 u'+x+',.\\38 u\\24'+x+'{width:66.6666666667%;clear:none}' + 
								'.\\37 u'+x+',.\\37 u\\24'+x+'{width:58.3333333333%;clear:none}' + 
								'.\\36 u'+x+',.\\36 u\\24'+x+'{width:50%;clear:none}' + 
								'.\\35 u'+x+',.\\35 u\\24'+x+'{width:41.6666666667%;clear:none}' + 
								'.\\34 u'+x+',.\\34 u\\24'+x+'{width:33.3333333333%; clear: none}' +
								'.\\33 u'+x+',.\\33 u\\24'+x+'{width:25%;clear:none}' + 
								'.\\32 u'+x+',.\\32 u\\24'+x+'{width:16.6666666667%;clear:none}' + 
								'.\\31 u'+x+',.\\31 u\\24'+x+'{width:8.3333333333%;clear:none}' + 
								'.\\31 2u\\24'+x+'+*,' +
								'.\\31 1u\\24'+x+'+*,' +
								'.\\31 0u\\24'+x+'+*,' +
								'.\\39 u\\24'+x+'+*,' +
								'.\\38 u\\24'+x+'+*,' +
								'.\\37 u\\24'+x+'+*,' +
								'.\\36 u\\24'+x+'+*,' +
								'.\\35 u\\24'+x+'+*,' +
								'.\\34 u\\24'+x+'+*,' +
								'.\\33 u\\24'+x+'+*,' +
								'.\\32 u\\24'+x+'+*' +
								'.\\31 u\\24'+x+'+*{' +
									'clear:left;' +
								'}' +
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
								'.\\-1u{margin-left:8.3333333333%}';

					}
				
			},

			/**
			 * Object defaults.
			 * @type {object}
			 */
			defaults: {
			
				// Breakpoint defaults.
					breakpoint: {
						
						// Config.
							config: null,
						
						// DOM elements linked to this breakpoint.
							elements: null,
						
						// Test function.
							test: null
					
					},
				
				// Breakpoint config defaults.
					config_breakpoint: {
						
						// Width of container elements (N, 'Npx', 'Nem', etc).
							containers: '100%',
						
						// Grid.
							grid: {},
							
						// Stylesheet to load when this breakpoint is active (false = no stylesheet).
							href: false,
							
						// Media query.
							media: '',
						
						// Viewport.
							viewport: {}
	
					}
			
			},

			/**
			 * Bound events.
			 * @type {Array}
			 */
			events: [],			
			
			/**
			 * Force default state?
			 * @type {bool}
			 */
			forceDefaultState: false,
			
			/**
			 * Are we initialized?
			 * @type {bool}
			 */
			isInit: false,
			
			/**
			 * Are we running in static mode?
			 * Enabled when the user hasn't defined any breakpoints, at which point:
			 * - Polling only happens on load
			 * - No events are attached to resize or orientationChange
			 * - Breakpoint classes aren't applied to <html>
			 * @type {bool}
			 */
			isStatic: false,

			/**
			 * Locations to insert stuff.
			 * @type {object}
			 */
			locations: {
				
				// <body>
					body: null,
			
				// <head>
					head: null,
				
				// <html>
					html: null
				
			},

			/**
			 * Lock cookie name.
			 * @type {string}
			 */
			lcn: '_skel_lock',
			
			/**
			 * Maximum grid zoom.
			 * @type integer
			 */
			maxGridZoom: 1,
			
			/**
			 * My <script> element.
			 * @type {DOMHTMLElement}
			 */
			me: null,
			
			/**
			 * Active plugins.
			 * @type {object}
			 */
			plugins: {},
			
			/**
			 * State ID delimiter (don't change this).
			 * @type {string}
			 */
			sd: '/',
				
			/**
			 * Current state ID.
			 * @type {string}
			 */
			stateId: '',
			
			/**
			 * Internal vars.
			 * @type {object}
			 */
			vars: {},

		/******************************/
		/* Methods                    */
		/******************************/

			/* Utility */

				/**
				 * Does stuff when the DOM is ready.
				 * @param {function} f Function.
				 */
				DOMReady: null,

				/**
				 * Wrapper/polyfill for document.getElementsByClassName.
				 * @param {string} className Space separated list of classes.
				 * @return {Array} List of matching elements.
				 */
				getElementsByClassName: null,
				
				/**
				 * Wrapper/polyfill for (Array.prototype|String).indexOf.
				 * @param {Array|string} search Object or string to search.
				 * @param {integer} from Starting index.
				 * @return {integer} Matching index (or -1 if there's no match).
				 */
				indexOf: null,

				/**
				 * Wrapper/polyfill for Array.isArray.
				 * @param {array} x Variable to check.
				 * @return {bool} If true, x is an array. If false, x is not an array.
				 */
				isArray: null,
				
				/**
				 * Safe replacement for "for..in". Avoids stuff that doesn't belong to the array itself (eg. properties added to Array.prototype).
				 * @param {Array} a Array to iterate.
				 * @param {function} f(index) Function to call on each element.
				 */
				iterate: null,
				
				/**
				 * Determines if a media query matches the current browser state.
				 * @param {string} query Media query.
				 * @return {bool} True if it matches, false if not.
				 */
				matchesMedia: null,

				/**
				 * Extends x by y.
				 * @param {object} x Target object.
				 * @param {object} y Source object.
				 */
				extend: function(x, y) {
					
					var k;
					
					_.iterate(y, function(k) {
					
						if (_.isArray(y[k])) {
							
							if (!_.isArray(x[k]))
								x[k] = [];
							
							_.extend(x[k], y[k]);
							
						}
						else if (typeof y[k] == 'object') {
							
							if (typeof x[k] != 'object')
								x[k] = {};
							
							_.extend(x[k], y[k]);
						
						}
						else
							x[k] = y[k];
					
					});
				
				},

				/**
				 * Returns a variable as a single element array (if it isn't already an array).
				 * @param {mixed} Variable.
				 * @return {Array} Array.
				 */
				getArray: function(x) {
				
					if (_.isArray(x))
						return x;
					
					return [x];

				},

				/**
				 * Parses a CSS measurement string (eg. 960, '960px', '313.37em') and splits it into its numeric and unit parts.
				 * @param {string} x CSS measurement.
				 * @return {Array} Results, where element 0 = (float) numeric part, and 1 = (string) unit part.
				 */
				parseMeasurement: function(x) { 

					var a, tmp;

					// Not a string? Just assume it's in px.
						if (typeof x !== 'string')
							a = [x,'px'];
					// Fluid shortcut?
						else if (x == 'fluid')
							a = [100,'%'];
					// Okay, hard way it is ...
						else {
							
							var tmp;
							
							tmp = x.match(/([0-9\.]+)([^\s]*)/);
							
							// Missing units? Assume it's in px.
								if (tmp.length < 3 || !tmp[2])
									a = [parseFloat(x),'px'];
							// Otherwise, we have a winrar.
								else
									a = [parseFloat(tmp[1]),tmp[2]];
						
						}
					
					return a;

				},

			/* API */

				/**
				 * Determines if a breakpoint applies to the current browser state.
				 * @param {string} k Breakpoint ID.
				 * @return {bool} Breakpoint applicability.
				 */
				canUse: function(k) {

					return (
						_.breakpoints[k]
						&& (_.breakpoints[k].test)()
					);
				
				},

				/**
				 * Determines if an array contains an active breakpoint ID.
				 * @param {Array} a Array of breakpoint IDs.
				 * @return {bool} Breakpoint state.
				 */
				hasActive: function(a) {
				
					var result = false;
				
					_.iterate(a, function(i) {
						result = result || _.isActive(a[i]);
					});
					
					return result;
				
				},
				
				/**
				 * Determines if a breakpoint is active.
				 * @param {string} k Breakpoint ID.
				 * @return {bool} Breakpoint state.
				 */
				isActive: function(k) {

					return (_.indexOf(_.stateId, _.sd + k) !== -1);

				},

				/**
				 * Determines if a lock is in effect.
				 */
				isLocked: function() {
					
					return (!!_.vars.lock && _.isArray(_.vars.lock));
				
				},

				/**
				 * Locks the viewport to a specific width and/or height and reloads the page.
				 * @param {integer} w Width.
				 * @param {integer} h Height.
				 */
				lock: function(w, h) {

					// Set var.
						_.vars.lock = [w, h];

					// Set cookie.
						document.cookie =	_.lcn + '=' + _.vars.lock.join('_') +
											(_.config.lock.path ? ';path=' + _.config.lock.path : '') +
											(_.config.lock.permanent ? ';expires=Tue, 19 Jan 2038 03:14:07 GMT' : '');
						
						console.log('[skel] locking to ' + _.vars.lock);
					
					// Reload.
						window.location.reload();

				},
				
				/**
				 * Removes a previously set viewport lock and reloads the page.
				 */
				unlock: function() {
					
					// Clear var.
						_.vars.lock = null;
					
					// Clear cookie.
						document.cookie =	_.lcn + '=' +
											(_.config.lock.path ? ';path=' + _.config.lock.path : '') +
											';expires=Thu, 01 Jan 1970 01:02:03 GMT';

						console.log('[skel] unlocking');

					// Reload.
						window.location.reload();

				},
				
				/**
				 * If provided an object, return the value of the first key that matches an active breakpoint. Otherwise, just return the argument.
				 * @param {object} x Object.
				 * @return mixed Value.
				 */
				useActive: function(x) {

					if (typeof x !== 'object')
						return x;
						
					var v = null;
					
					_.iterate(x, function(i) {
						
						if (v !== null)
							return;
						
						if (_.isActive(i))
							v = x[i];
						
					});
					
					return v;
					
				},

				/**
				 * Determines if a breakpoint was active before the last state change.
				 * @param {string} k Breakpoint ID.
				 * @return {bool} Breakpoint state.
				 */
				wasActive: function(k) {

					return (_.indexOf(_.vars.lastStateId, _.sd + k) !== -1);

				},

			/* Row Operations */

				/**
				 * Applies all row transforms.
				 */
				applyRowTransforms: function(state) {

					// RTL: Performs a few adjustments to get things working nicely on RTL.
						if (_.config.RTL) {

							// Unreverse all rows.
								_.unreverseRows();

							// Collapse enabled? Reverse rows.
								if (state.config.grid.collapse)
									_.reverseRows();
						
						}

					// Shifts cells marked as "important" to the front of their respective rows.
						var key = '_skel_important', cells = [],
							i, a;

						// Get "important" cells.
							
							// Via zoom.
								for (i=1; i <= _.maxGridZoom; i++) {
									
									a = _.getElementsByClassName('important(' + i + ')');
									
									_.iterate(a, function(k) {
										cells.push(a[k]);
									});
									
								}

							// Via collapse.
								a = _.getElementsByClassName('important(collapse)');
								
								_.iterate(a, function(k) {
									cells.push(a[k]);
								});
						
						// Step through cells.
							_.iterate(cells, function(i) {

								// Just in case.
									if (i === 'length')
										return;
								
								var cell = cells[i], parent = cell.parentNode,
									placeholder, mode = false, k, z;
								
								// No parent? Bail.
									if (!parent)
										return;
									
								// Not moved? Move it.
									if (!cell.hasOwnProperty(key) || cell[key] === false) {
										
										// Determine mode.
											
											// Collapse?
												if (state.config.grid.collapse && cell.className.match(/important\(collapse\)/))
													mode = 'c';
												
											// Zoom?
												else if (cell.className.match(/important\(([0-9])\)/) && (z = parseInt(RegExp.$1)) <= state.config.grid.zoom)
													mode = 'z';
										
										// No valid mode? Bail.
											if (!mode)
												return;
										
										// Get placeholder node (which will serve as our point of reference for when this cell needs to move back).
											k = (_.config.RTL ? 'nextSibling' : 'previousSibling');

											placeholder = cell[k];
											
											while ( placeholder && placeholder.nodeName == '#text' )
												placeholder = placeholder[k];
											
											// Couldn't find anything? Means this cell's already at the front, so bail.
												if (!placeholder)
													return;

										// Move cell to front.
											console.log('[skel] important: moving to front of row (' + i + ')');
											
											parent.insertBefore(
												cell,
												(_.config.RTL && mode == 'z') ? parent.lastChild : parent.firstChild
											);
											
										// Mark cell as moved.
											cell[key] = {
												placeholder: placeholder,
												mode: mode,
												zoom: z
											};

									}
								
								// Moved already?
									else {
										
										placeholder = cell[key].placeholder;
										mode = cell[key].mode;
										
										// Cell doesn't need to move? Bail.
											if (mode == 'c' && state.config.grid.collapse
											||	mode == 'z' && cell[key].zoom <= state.config.grid.zoom)
												return;

										// Move cell back to its original location (using our placeholder).
											console.log('[skel] important: moving back (' + i + ')');
											
											parent.insertBefore(
												cell,
												(_.config.RTL && mode == 'z') ? placeholder.previousSibling : placeholder.nextSibling
											);

										// Unmark cell as moved.
											cell[key] = false;

									}
							
							});

				},

				/**
				 * Reverses all rows.
				 */
				reverseRows: function() {
				
					var x = _.getElementsByClassName('row');
					
					_.iterate(x, function(i) {

						if (i === 'length')
							return;

						var	row = x[i];

						// If the row has already been reversed, bail.
							if (row._skel_isReversed)
								return;
						
						// Reverse the row.
							var children = row.children, j;
						
							for (j=1; j < children.length; j++)
								row.insertBefore(children[j], children[0]);

						// Mark it as reversed.
							row._skel_isReversed = true;
					
					});
				
				},

				/**
				 * Unreverses all reversed rows.
				 */
				unreverseRows: function() {

					var x = _.getElementsByClassName('row');
					
					_.iterate(x, function(i) {

						if (i === 'length')
							return;

						var	row = x[i];
						
						// If the row hasn't been reversed, bail.
							if (!row._skel_isReversed)
								return;
					
						// Unreverse the row.
							var children = row.children, j;
						
							for (j=1; j < children.length; j++)
								row.insertBefore(children[j], children[0]);

						// Mark it as unreversed.
							row._skel_isReversed = false;
					
					});

				},

			/* Events */

				/**
				 * Binds an event.
				 * @param {string} name Name.
				 * @param {function} f Function.
				 */
				bind: function(name, f) {

					if (!_.events[name])
						_.events[name] = [];
						
					_.events[name].push(f);

					// Hack: If binding a 'change' event *after* skel's been initialized,
					// manually call it right now.
						if (name == 'change' && _.isInit)
							(f)();

				},

				/**
				 * Shortcut to bind a "change" event.
				 * @param {function} f Function.
				 */
				change: function(f) {
					_.bind('change', f); 
				},
				
				/**
				 * Triggers an event.
				 * @param {string} name Name.
				 */
				trigger: function(name) {
					
					if (!_.events[name] || _.events[name].length == 0)
						return;
					
					var k;
					
					_.iterate(_.events[name], function(k) {
						(_.events[name][k])();
					});
					
				},

			/* Locations */
			
				/**
				 * Registers a location element.
				 * @param {string} id Location ID.
				 * @param {DOMHTMLElement} object Location element.
				 */
				registerLocation: function(id, object) {

					if (id == 'head')
						object._skel_attach = function(x, prepend) {

							if (prepend)
								this.insertBefore( x, this.firstChild );
							else {

								// If "me" is in <head>, insert x before "me".
									if (this === _.me.parentNode)
										this.insertBefore( x, _.me );
								// Otherwise, just append it.
									else
										this.appendChild( x );
									
							}

						};
					else
						object._skel_attach = function(x, prepend) {

							if (prepend)
								this.insertBefore( x, this.firstChild );
							else
								this.appendChild( x );
							
						};

					_.locations[id] = object;
				
				},

			/* Elements */

				/**
				 * Adds a cache entry to a breakpoint.
				 * @param {string} breakpointId Breakpoint ID.
				 * @param {object} o Cache entry.
				 */
				addCachedElementToBreakpoint: function(breakpointId, o) {
					
					if (_.breakpoints[breakpointId]) {
						
						console.log('[skel] ' + o.id + ': added to breakpoint (' + breakpointId + ')');
						_.breakpoints[breakpointId].elements.push(o);
					
					}

				},

				/**
				 * Adds a cache entry to a state.
				 * @param {string} stateId State ID.
				 * @param {object} o Cache entry.
				 */
				addCachedElementToState: function(stateId, o) {
					
					console.log('[skel] ' + o.id + ': added to state (' + stateId + ')');

					if (!_.cache.stateElements[stateId])
						_.cache.stateElements[stateId] = [o];
					else
						_.cache.stateElements[stateId].push(o);

				},

				/**
				 * Attaches an element.
				 * @param {object} e Element.
				 */
				attachElement: function(e) {

					var l,
						id = e.location,
						prepend = false;
					
					// Already attached? Bail.
						if (e.attached)
							return true;
					
					// Prepend?
						if (id[0] == '^') {
							id = id.substring(1)
							prepend = true;
						}
					
					// If the location doesn't exist, fail out.
						if (!(id in _.locations))
							return false;

					// Get the element's location.
						l = _.locations[ id ];

					// Attach object.
						l._skel_attach( e.object, prepend );

					// Mark as attached.
						e.attached = true;

					// Trigger onAttach.
						if (e.onAttach)
							(e.onAttach)();

					console.log('[skel] ' + e.id + ': attached');

					return true;
				},
			
				/**
				 * Attaches a list of cached elements to the DOM.
				 * @param {Array} list Cache entries to attach.
				 */
				attachElements: function(list) {

					var a = [], w = [], k, l, x;
					
					// Reorganize elements into priority "buckets".
						_.iterate(list, function(k) {

							if (!a[ list[k].priority ])
								a[ list[k].priority ] = [];
								
							a[ list[k].priority ].push(list[k]);

						});

					// Step through bucket list (heh).
						_.iterate(a, function(k) {
							
							// Nothing in this one? Skip it.
								if (a[k].length == 0)
									return;
							
							// Step through bucket contents.
								_.iterate(a[k], function(x) {
									
									// Attach the element. If doing so fails, save it in our DOMReady bucket.
										if (!_.attachElement(a[k][x])) {
											
											console.log('[skel] ' + a[k][x].id + ': postponing attachment');
											w.push(a[k][x]);
										
										}
								
								});
						
						});
					
					// Walk through our DOMReady bucket.
						if (w.length > 0) {
							
							_.DOMReady(function() {
								_.iterate(w, function(k) {
									_.attachElement(w[k]);
								});
							});
						
						}

				},

				/**
				 * Caches an element.
				 * @param {object} x Element.
				 * @return {object} Cache entry.
				 */
				cacheElement: function(x) {
					
					// Add to elements.
						_.cache.elements[x.id] = x;
					
					return x;
					
				},

				/**
				 * Caches a new element.
				 * @param {string} id ID.
				 * @param {DOMHTMLElement} object HTML element.
				 * @param {string} location Location ID.
				 * @param {integer} priority Priority.
				 * @return {object} Cache entry.
				 */
				cacheNewElement: function(id, object, location, priority) {

					var x;

					// Detach object if it's already attached.
						if (object.parentNode)
							object.parentNode.removeChild(object);

					// Create element.
						x = _.newElement(id, object, location, priority);

					return _.cacheElement(x);

				},
				
				/**
				 * Detaches all cached elements from the DOM.
				 * @param {array} exclude Elements to exclude.
				 */
				detachAllElements: function(exclude) {

					var k, x, l = {};
					
					// Build exclusion list (for faster lookups).
						_.iterate(exclude, function(k) {
							l[exclude[k].id] = true;
						});
					
					_.iterate(_.cache.elements, function(id) {

						// In our exclusion list? Bail.
							if (id in l)
								return;
						
						// Attempt to detach.
							_.detachElement(id);

					});

				},

				/**
				 * Detaches a cached element from the DOM.
				 * @param {string} id Cache entry ID.
				 */
				detachElement: function(id) {
					
					var e = _.cache.elements[id], x;

					// Detached already? Bail.
						if (!e.attached)
							return;

					// Get object.
						x = e.object;
					
					// No parent? Guess it's already detached so we can bail.
						if (!x.parentNode
						|| (x.parentNode && !x.parentNode.tagName))
							return;

					// Detach it.
						console.log('[skel] ' + id + ': detached');
						x.parentNode.removeChild(x);

					// Mark as detached.
						e.attached = false;

					// Trigger onDetach.
						if (e.onDetach)
							(e.onDetach)();

				},

				/**
				 * Gets a cache entry.
				 * @param {string} id Cache entry ID.
				 * @return {?object} Cache entry, or null if it doesn't exist.
				 */
				getCachedElement: function(id) {

					if (_.cache.elements[id])
						return _.cache.elements[id];
						
					return null;

				},

				/**
				 * Creates a new "element" object wrapper.
				 * @param {string} id ID.
				 * @param {DOMHTMLElement} object HTML element.
				 * @param {string} location Location ID.
				 * @param {integer} priority Priority.
				 * @return {object} Element.
				 */
				newElement: function(id, object, location, priority) {
					return {
						'id': id,
						'object': object,
						'location': location,
						'priority': priority,
						'attached': false
					};
				},

			/* Main */

				/**
				 * Switches to a different state.
				 * @param {string} newStateId New state ID.
				 */
				changeState: function(newStateId) {

					var	breakpointIds, location, state,
						a, x, i, id, s1, s2;

					// 1. Set last state var.
						_.vars.lastStateId = _.stateId;

					// 2. Change state ID.
						_.stateId = newStateId;

						console.log('[skel] new state detected (id: "' + _.stateId + '")');
					
					// 3. Get state.
						if (!_.cache.states[_.stateId]) {
							
							console.log('[skel] - not cached. building ...');

							// 3.1. Build state.
								_.cache.states[_.stateId] = { config: {}, elements: [], values: {} };
								state = _.cache.states[_.stateId];

							// 3.2. Build composite configuration.
								if (_.stateId === _.sd)
									breakpointIds = [];
								else
									breakpointIds = _.stateId.substring(1).split(_.sd);

								// Extend config by basic breakpoint config.
									_.extend(state.config, _.defaults.config_breakpoint);
								
								// Then layer on each active breakpoint's config.
									_.iterate(breakpointIds, function(k) {
										_.extend(state.config, _.breakpoints[breakpointIds[k]].config);
									});
								
							// 3.3. Add state-dependent elements.

								// ELEMENT: Viewport <meta> tag.

									id = 'mV' + _.stateId;
									
									// 'content' property set? Use it.
										if (state.config.viewport.content)
											s1 = state.config.viewport.content;
									
									// Lock in effect?
										else if (_.isLocked()) {

											a = [];

											// Scalable.
												a.push('user-scalable=yes');

											// Width.
												if (_.vars.lock[0])
													a.push('width=' + _.vars.lock[0]);
												
											// Height.
												if (_.vars.lock[1])
													a.push('height=' + _.vars.lock[1]);
											
											s1 = a.join(',');
											
											// Force a quick poll in case we didn't catch the locked width and/or height
											// the first time around.
												window.setTimeout(function() {
													_.poll();
												}, 0);
											
										}
									
									// Otherwise, parse individual options.
										else {

											a = [];

											// Scalable.
												a.push('user-scalable=' + (state.config.viewport.scalable ? 'yes' : 'no'));
											
											// Width.
												if (state.config.viewport.width)
													a.push('width=' + state.config.viewport.width);

											// Height.
												if (state.config.viewport.height)
													a.push('height=' + state.config.viewport.height);
											
											// Set initial scale if we're using device-width and device-height.
												if (state.config.viewport.width == 'device-width'
												&&	state.config.viewport.height == 'device-height')
													a.push('initial-scale=1');
											
											s1 = a.join(',');
											
										}
										
									// Get element
										if (!(x = _.getCachedElement(id)))
											x = _.cacheNewElement(
												id, 
												_.newMeta(
													'viewport',
													s1
												),
												'^head',
												4
											);
									
									// Push to state
										console.log('[skel] -- ' + id);
										state.elements.push(x);								

								// ELEMENT: (CSS) Containers.
									
									var C, Cu, CLocked = false;
										
									// Determine width, units, and id.

										// Split "containers" into width and units.
											a = _.parseMeasurement(state.config.containers);
											C = a[0];
											Cu = a[1];

										// Set "containers" state value (needed for later).
											state.values.containers = C + Cu;

										// Set id.
											id = 'iC' + state.values.containers;

										// Locked?
											if (Cu.substr(-1) == '!') {

												CLocked = true;
												Cu = Cu.substr(0, Cu.length - 1);
											
											}

									// Get element.
										if (!(x = _.getCachedElement(id))) {
											
											// Build element.
												x = _.cacheNewElement(
													id,
													_.newInline(
														'body{min-width:' + (C*1)+Cu +'}' +
														'.container{margin-left:auto;margin-right:auto;width:' + (C*1)+Cu +
														(
															CLocked
															?
																'!important;' +
																'max-width:none!important;' +
																'min-width:0!important' +
																'}'
															:
																'}' +
																'.container.\\31 25\\25{width:100%;max-width:' + (C*1.25)+Cu + ';min-width:' + C + '}' +
																'.container.\\37 5\\25{width:' + (C*0.75)+Cu + '}' +
																'.container.\\35 0\\25{width:' + (C*0.5)+Cu + '}' +
																'.container.\\32 5\\25{width:' + (C*0.25)+Cu + '}'
														)
													),
													'head',
													3
												);
										
										}

									// Push to state.
										console.log('[skel] -- ' + id);
										state.elements.push(x);

								// ELEMENT: (CSS) Grid / Rows / Gutters.
									
									id = 'iGG' + state.config.grid.gutters[0] + '_' + state.config.grid.gutters[1];

									// Get element.
										if (!(x = _.getCachedElement(id))) {
											
											// Vertical.
												var V, Vu;

												// Split into size and units.
													a = _.parseMeasurement(state.config.grid.gutters[0]);
													V = a[0];
													Vu = a[1];
												
											// Horizontal.
												var H, Hu;

												// Split into size and units.
													a = _.parseMeasurement(state.config.grid.gutters[1]);
													H = a[0];
													Hu = a[1];
												
											// Build element.
												x = _.cacheNewElement(
													'iGG' + state.config.grid.gutters[0] + '_' + state.config.grid.gutters[1], 
													_.newInline(
														
														// Normal.
															'.row>*{padding:' + (H*1)+Hu + ' 0 0 ' + (V*1)+Vu + '}' +
															'.row{margin:' + (H*-1)+Hu + ' 0 0 ' + (V*-1)+Vu + '}' +
															'.row.uniform>*{padding:' + (V*1)+Vu + ' 0 0 ' + (V*1)+Vu + '}' +
															'.row.uniform{margin:' + (V*-1)+Vu + ' 0 0 ' + (V*-1)+Vu + '}' +
														
														// 200%
															'.row.\\32 00\\25>*{padding:' + (H*2)+Hu + ' 0 0 ' + (V*2)+Vu + '}' +
															'.row.\\32 00\\25{margin:' + (H*-2)+Hu + ' 0 0 ' + (V*-2)+Vu + '}' +
															'.row.uniform.\\32 00\\25>*{padding:' + (V*2)+Vu + ' 0 0 ' + (V*2)+Vu + '}' +
															'.row.uniform.\\32 00\\25{margin:' + (V*-2)+Vu + ' 0 0 ' + (V*-2)+Vu + '}' +
														
														// 150%
															'.row.\\31 50\\25>*{padding:' + (H*1.5)+Hu + ' 0 0 ' + (V*1.5)+Vu + '}' +
															'.row.\\31 50\\25{margin:' + (H*-1.5)+Hu + ' 0 0 ' + (V*-1.5)+Vu + '}' +
															'.row.uniform.\\31 50\\25>*{padding:' + (V*1.5)+Vu + ' 0 0 ' + (V*1.5)+Vu + '}' +
															'.row.uniform.\\31 50\\25{margin:' + (V*-1.5)+Vu + ' 0 0 ' + (V*-1.5)+Vu + '}' +
														
														// 50%
															'.row.\\35 0\\25>*{padding:' + (H*0.5)+Hu + ' 0 0 ' + (V*0.5)+Vu + '}' +
															'.row.\\35 0\\25{margin:' + (H*-0.5)+Hu + ' 0 0 ' + (V*-0.5)+Vu + '}' +
															'.row.uniform.\\35 0\\25>*{padding:' + (V*0.5)+Vu + ' 0 0 ' + (V*0.5)+Vu + '}' +
															'.row.uniform.\\35 0\\25{margin:' + (V*-0.5)+Vu + ' 0 0 ' + (V*-0.5)+Vu + '}' +
														
														// 25%
															'.row.\\32 5\\25>*{padding:' + (H*0.25)+Hu + ' 0 0 ' + (V*0.25)+Vu + '}' +
															'.row.\\32 5\\25{margin:' + (H*-0.25)+Hu + ' 0 0 ' + (V*-0.25)+Vu + '}' +
															'.row.uniform.\\32 5\\25>*{padding:' + (V*0.25)+Vu + ' 0 0 ' + (V*0.25)+Vu + '}' +
															'.row.uniform.\\32 5\\25{margin:' + (V*-0.25)+Vu + ' 0 0 ' + (V*-0.25)+Vu + '}' +
														
														// 0%
															'.row.\\30 \\25>*{padding:0}' +
															'.row.\\30 \\25{margin:0}'
													
													), 
													'head', 
													3
												);

										}

									// Push to state.
										console.log('[skel] -- ' + id);
										state.elements.push(x);

								// ELEMENT: (CSS) Grid / Zoom.
								
									id = 'igZ' + state.config.grid.zoom;

									if (!(x = _.getCachedElement(id))) {

										// Generate CSS.
											s1 = '';

											for (i=1; i <= state.config.grid.zoom; i++)
												s1 += _.css.gc('\\28 ' + i + '\\29');
									
										// Build Element.
											x = _.cacheNewElement(
												id,
												_.newInline(
													s1
												),
												'head', 
												3
											);

									}

									// Push to state.
										console.log('[skel] -- ' + id);
										state.elements.push(x);

								// ELEMENT: (CSS) Grid / Collapse.

									if (state.config.grid.collapse) {

										id = 'igC' + state.config.containers;

										if (!(x = _.getCachedElement(id))) {

											// Build Element.
												x = _.cacheNewElement(
													id,
													_.newInline(
														'.row:not(.no-collapse)>*{' +
															'width:100%!important;' +
															'margin-left:0!important' +
														'}'
													),
													'head', 
													3
												);
										
										}

										// Push to state.
											console.log('[skel] -- ' + id);
											state.elements.push(x);						
									
									}
									
								// ELEMENT: Conditionals.

									id = 'iCd' + _.stateId;

									if (!(x = _.getCachedElement(id))) {
										
										s1 = [];
										s2 = [];

										// Get element.
											_.iterate(_.breakpoints, function(k) {
										
												if (_.indexOf(breakpointIds, k) !== -1)
													s1.push('.not-' + k);
												else
													s2.push('.only-' + k);
										
											});
											
											var s = (s1.length > 0 ? s1.join(',') + '{display:none!important}' : '') + (s2.length > 0 ? s2.join(',') + '{display:none!important}' : '');
										
											x = _.cacheNewElement(id,
												_.newInline(
													s.replace(/\.([0-9])/, '.\\3$1 ')
												),
												'head',
												3
											);
										
										// Push to state.
											console.log('[skel] -- ' + id);
											state.elements.push(x);
									
									}

								// ELEMENT: Breakpoint-specific.

									_.iterate(breakpointIds, function(k) {
										
										// styleSheet*
											if (_.breakpoints[breakpointIds[k]].config.href) {
												
												id = 'ss' + breakpointIds[k];

												// Get element.
													if (!(x = _.getCachedElement(id)))
														x = _.cacheNewElement(
															id, 
															_.newStyleSheet(_.breakpoints[breakpointIds[k]].config.href), 
															'head', 
															5
														);
												
												// Push to state.
													console.log('[skel] -- ' + id);
													state.elements.push(x);
											
											}
										
										// Elements.
											if (_.breakpoints[breakpointIds[k]].elements.length > 0) {
												
												// Push elements to state.
													_.iterate(_.breakpoints[breakpointIds[k]].elements, function(x) {
														console.log('[skel] -- ' + _.breakpoints[breakpointIds[k]].elements[x].id + ': added (via breakpoint)');
														state.elements.push(_.breakpoints[breakpointIds[k]].elements[x]);
													});
											
											}
									
									});

							// 3.4. Add pending state elements.
								if (_.cache.stateElements[_.stateId]) {
									
									// Add elements to state cache.
										_.iterate(_.cache.stateElements[_.stateId], function(i) {
											state.elements.push( _.cache.stateElements[_.stateId][i] );
										});
									
									// Empty bucket.
										_.cache.stateElements[_.stateId] = [];
									
								}

						}
						else {
							
							state = _.cache.states[_.stateId];
							console.log('[skel] - found cached');
						
						}

					// 4. Detach all elements (excluding the ones we're about to attach).
						console.log('[skel] - detaching all elements ...');
						_.detachAllElements(state.elements);

					// 5. Apply state.
						console.log('[skel] - attaching state elements ... ');
						_.attachElements(state.elements);
						
					// 6. Apply row transforms.
						_.DOMReady(function() {
							_.applyRowTransforms(state);
						});
						
					// 7. Set state and stateId vars.
						_.vars.state = _.cache.states[_.stateId];
						_.vars.stateId = _.stateId;
						
					// 8. Trigger change event.
						_.trigger('change');

				},

				/**
				 * Gets the current state ID.
				 * @return {string} State ID.
				 */
				getStateId: function() {

					if (_.forceDefaultState
					&&	_.config.defaultState)
						return _.config.defaultState;

					var stateId = '';

					_.iterate(_.breakpoints, function(k) {
						if ((_.breakpoints[k].test)())
							stateId += _.sd + k;
					});
					
					return stateId;

				},

				/**
				 * Polls for state changes.
				 */
				poll: function() {
				
					var newStateId = '';

					// Determine new state.
						newStateId = _.getStateId();
				
						if (newStateId === '')
							newStateId = _.sd;
				
					// State changed?
						if (newStateId !== _.stateId) {
							
							// Static mode? Just change state.
								if (_.isStatic)
									_.changeState(newStateId);
							// Otherwise, change state and apply <html> classes.
								else {

									// Remove previous breakpoint classes from <html>
										_.locations.html.className = _.locations.html.className.replace(_.stateId.substring(1).replace(new RegExp(_.sd, 'g'), ' '), '');

									// Change state.
										_.changeState(newStateId);
										
									// Apply new breakpoint classes to <html>
										_.locations.html.className = _.locations.html.className + ' ' + _.stateId.substring(1).replace(new RegExp(_.sd, 'g'), ' ');
								
									// Clean up className.
										if (_.locations.html.className.charAt(0) == ' ')
											_.locations.html.className = _.locations.html.className.substring(1);
								
								}

						}
				
				},
				
				/**
				 * Forces a state update. Typically called after the cache has been modified by something other than Skel (like a plugin).
				 */
				updateState: function() {

					var a, b, k, j, list = [];

					if (_.stateId == _.sd)
						return;

					// Breakpoint elements.
						
						// Get active breakpoint IDs.
							a = _.stateId.substring(1).split(_.sd)

						// Step through active state's breakpoints.
							_.iterate(a, function(k) {
								b = _.breakpoints[a[k]];
								
								// No elements? Skip it.
									if (b.elements.length == 0)
										return;
										
								// Add the breakpoint's elements to the state's cache.
									_.iterate(b.elements, function(j) {
										//console.log('- added new breakpoint element ' + b.elements[j].id + ' to state ' + _.stateId);
										_.cache.states[_.stateId].elements.push(b.elements[j]);
										list.push(b.elements[j]);
									});
							
							});

					// Pending state elements.
						if (_.cache.stateElements[_.stateId]) {
							
							// Add the pending elements to the state's cache.
								_.iterate(_.cache.stateElements[_.stateId], function(i) {
									_.cache.states[_.stateId].elements.push( _.cache.stateElements[_.stateId][i] );
									list.push( _.cache.stateElements[_.stateId][i] );
								});
							
							// Empty pending bucket.
								_.cache.stateElements[_.stateId] = [];
							
						}
							
					// If new elements were detected, go ahead and attach them.
						if (list.length > 0) {
							
							console.log('[skel] updating state ... ');
							_.attachElements(list);
						
						}

				},
			
			/* New */

				/**
				 * Creates a new div element.
				 * @param {string} s Inner HTML.
				 * @return {DOMHTMLElement} Div element.
				 */
				newDiv: function(s) {

					var o = document.createElement('div');
						o.innerHTML = s;
					
					return o;

				},

				/**
				 * Creates a new style element.
				 * @param {string} s Style rules.
				 * @return {DOMHTMLElement} Style element.
				 */
				newInline: function(s) {

					var o;

					o = document.createElement('style');
						o.type = 'text/css';
						o.innerHTML = s;
					
					return o;

				},

				/**
				 * Creates a new meta element.
				 * @param {string} name Name.
				 * @param {string} content Content.
				 * @return {DOMHTMLElement} Meta element.
				 */
				newMeta: function(name, content) {

					var o = document.createElement('meta');
						o.name = name;
						o.content = content;

					return o;

				},
				
				/**
				 * Creates a new link element set to load a given stylesheet.
				 * @param {string} href Stylesheet's href.
				 * @return {DOMHTMLElement} Link element.
				 */
				newStyleSheet: function(href) {
					
					var o = document.createElement('link');
						o.rel = 'stylesheet';
						o.type = 'text/css';
						o.href = href;
					
					return o;

				},
				
			/* Plugins */

				/**
				 * Initializes a plugin.
				 * @param {object} plugin Plugin.
				 * @param {object} config Config.
				 */
				initPlugin: function(plugin, config) {

					// Extend defaults with user config (if it exists).
						if (typeof config == 'object')
							_.extend(plugin.config, config);

					// Call init.
						if (plugin.init)
							plugin.init();
					
				},

				/**
				 * Registers a plugin (and, if we're already configured, initialize it).
				 * @param {string} id Plugin ID.
				 * @param {object} plugin Plugin.
				 */
				registerPlugin: function(id, plugin) {

					if (!plugin) {
						
						console.log('[skel] FAILED to register plugin ' + id);
						return false;
					
					}
					
					// Register this plugin.
						_.plugins[id] = plugin;
					
					// Attach skel object to plugin.
						plugin._ = this;

					// Log it.
						console.log('[skel] registered plugin ' + id);
						
					// Call register.
						if (plugin.register)
							plugin.register();

				},
				
			/* Init */

				/**
				 * Initializes skel.
				 * This has to be explicitly called by the user.
				 * @param {object} config Config.
				 * @param {object} pluginConfig Plugin config.
				 */
				init: function(config, pluginConfig) {

					console.log('[skel] starting init ...');

					// Initialize config.
						_.initConfig(config);

					// Initialize elements.
						_.initElements();
						
					// Initialize events.
						_.initEvents();

					// Do initial poll.
						_.poll();

					// Initializes plugins.
						
						// If pluginConfig is provided as a second param to init() (deprecated) and it's
						// an object, copy it to config.plugins (where plugin configs are supposed to go).
							if (pluginConfig
							&&	typeof pluginConfig == 'object')
								_.config.plugins = pluginConfig;
					
						_.iterate(_.plugins, function(id) {
							_.initPlugin(
								_.plugins[id],
								(id in _.config.plugins) ? _.config.plugins[id] : null
							);
						});

					// Mark as initialized.
						_.isInit = true;

				},

				/**
				 * Initializes the API.
				 */
				initAPI: function() {
					
					var x, a, ua = navigator.userAgent;
				
					// Vars.
						
						// IE version (set to 99 for non-IE).
							_.vars.IEVersion = 99;
						
						// Browser.
							x = 'other';
						
							if (ua.match(/Firefox/))
								x = 'firefox';
							else if (ua.match(/Chrome/))
								x = 'chrome';
							else if (ua.match(/Safari/) && !ua.match(/Chrome/))
								x = 'safari';
							else if (ua.match(/(OPR|Opera)/))
								x = 'opera';
							else if (ua.match(/MSIE ([0-9]+)/)) {
								
								x = 'ie';
								_.vars.IEVersion = RegExp.$1;
							
							}
							else if (ua.match(/Trident\/.+rv:([0-9]+)/)) {
								
								x = 'ie';
								_.vars.IEVersion = RegExp.$1;
								
							}
							
							_.vars.browser = x;
						
						// Device type.
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

						// Device version.
							switch (_.vars.deviceType) {
								
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

						// isTouch.
							_.vars.isTouch = (_.vars.deviceType == 'wp' ? (navigator.msMaxTouchPoints > 0) : !!('ontouchstart' in window));
						
						// isMobile.
							_.vars.isMobile = (_.vars.deviceType == 'wp' || _.vars.deviceType == 'android' || _.vars.deviceType == 'ios');
						
						// Lock.
							x = document.cookie.split(';');
							
							_.iterate(x, function(i) {
							
								var y = x[i].split('=');
								
								if (y[0].replace(/^\s+|\s+$/g, '') == _.lcn
								&&	y[1].length > 0) {
									
									_.vars.lock = y[1].split('_');
									return;
								
								}
							
							});
						
				},			
				
				/**
				 * Initializes the config.
				 */
				initConfig: function(config) {

					var fArgs = [], preloads = [];

					// If no config is provided, or if one is provided without any breakpoints defined,
					// switch to static mode.
						if (!config
						||	!('breakpoints' in config)) {
							
							_.isStatic = true;
						
							// Override viewport defaults. Prevents "width=device-width" and "height=device-height"
							// from being applied to the viewport (neither of which are needed in static mode).
								_.config.viewport.width = '';
								_.config.viewport.height = '';
								_.config.viewport.scalable = true;

						}

					// Set up config.

						// Check for a valid user config.
							if (typeof config == 'object') {
								
								// Clear default breakpoints.
									if (config.breakpoints)
										_.config.breakpoints = {};
									
								// Extend defaults with user config.
									_.extend(_.config, config);
							
							}

						// Grid config.

							// Gutters.
								if ('grid' in _.config
								&&	'gutters' in _.config.grid
								&&	!_.isArray(_.config.grid.gutters))
									_.config.grid.gutters = [_.config.grid.gutters, _.config.grid.gutters];
							
							// Extend base breakpoint config.
								_.extend(
									_.defaults.config_breakpoint.grid,
									_.config.grid
								);

							// Update maxGridZoom.
								_.maxGridZoom = Math.max(_.maxGridZoom, _.config.grid.zoom);

						// Viewport config.

							// Extend base breakpoint config.
								_.extend(
									_.defaults.config_breakpoint.viewport,
									_.config.viewport
								);
													
						// Set base breakpoint config's containers to config's containers.
							_.defaults.config_breakpoint.containers = _.config.containers;
					
					// Process breakpoints config.
						_.iterate(_.config.breakpoints, function(id) {
							
							var b, c = {}, s, m;
							
							// Apply defaults to non-inheritable options.
								_.extend(c, _.config.breakpoints[id]);
								
								// href.
									if (!('href' in c))
										c.href = _.defaults.config_breakpoint.href;
								
								// media.
									if (!('media' in c))
										c.media = _.defaults.config_breakpoint.media;
								
								// range.
								// Shortcut. Overrides 'media' if specified.
									if ('range' in c) {
										
										s = c.range;
										
										// Wildcard? Always succeed.
											if (s == '*')
												m = '';

										// Less than or equal (-X)
											else if (s.charAt(0) == '-')
												m = '(max-width: ' + parseInt(s.substring(1)) + 'px)';

										// Greater than or equal (X-)
											else if (s.charAt(s.length - 1) == '-')
												m = '(min-width: ' + parseInt(s.substring(0, s.length - 1)) + 'px)';

										// Range (X-Y)
											else if (_.indexOf(s,'-') != -1) {

												s = s.split('-');
												m = '(min-width: ' + parseInt(s[0]) + 'px) and (max-width: ' + parseInt(s[1]) + 'px)';
											
											}
											
										c.media = m;
										
									}

								// grid.
									if ('grid' in c) {
										
										// Gutters.
											if ('gutters' in c.grid
											&&	!_.isArray(c.grid.gutters))
												c.grid.gutters = [c.grid.gutters, c.grid.gutters];

										// Update maxGridZoom.
											if ('zoom' in c.grid)
												_.maxGridZoom = Math.max(_.maxGridZoom, c.grid.zoom);
											
									}
								
								_.config.breakpoints[id] = c;
							
							// Build breakpoint.
								b = {};
								_.extend(b, _.defaults.breakpoint);
									b.config = _.config.breakpoints[id];
									b.test = function() { return _.matchesMedia(c.media); };
									b.elements = [];
								
							// Preload stylesheet.
								if (_.config.preload
								&&	b.config.href)
									preloads.push(b.config.href);

							// Replace original.
								_.breakpoints[id] = b;
						
							// Add to list.
								_.breakpointList.push(id);

						});
						
					// Process events config.
						_.iterate(_.config.events, function(k) {
							_.bind(k, _.config.events[k]);
						});
						
					// Handle stylesheet preloads if we have them (and we're not working locally).
						if (preloads.length > 0
						&&	window.location.protocol != 'file:') {
							
							_.DOMReady(function() {
								
								var k, h = document.getElementsByTagName('head')[0], x = new XMLHttpRequest();
								
								_.iterate(preloads, function(k) {
								
									console.log('[skel] ' + preloads[k] + ': preloaded');
									x.open('GET', preloads[k], false);
									x.send('');
								
								});
							
							});
						
						}
						
				},
				
				/**
				 * Initializes various pre-generated (non-state-dependent) elements.
				 */
				initElements: function() {

					var a = [];
					
					// ELEMENT: Initial viewport META tag.
						
						a.push(_.newElement(
							'mV',
							_.newMeta(
								'viewport',
								'initial-scale=1'
							),
							'^head',
							1
						));

					// ELEMENT: Full reset -or- Normalize.
						
						switch (_.config.reset) {
						
							case 'full':
								a.push(_.newElement(
									'iR', 
									_.newInline(_.css.r), 
									'^head', 
									2
								));
									
								break;
						
							case 'normalize':
							
								a.push(_.newElement(
									'iN', 
									_.newInline(_.css.n), 
									'^head', 
									2
								));

								break;
								
						}
						
					// ELEMENT: Box Model.
						
						a.push(_.newElement(
							'iBM', 
							_.newInline(_.css.bm),
							'^head',
							1
						));

					// ELEMENT: (CSS) Grid.

						a.push(_.newElement(
							'iG', 
							_.newInline(
								'.row{border-bottom:solid 1px transparent}' +
								'.row>*{float:left}' +
								'.row:after,.row:before{content:"";display:block;clear:both;height:0}' +
								'.row.uniform>*>:first-child{margin-top:0}' +
								'.row.uniform>*>:last-child{margin-bottom:0}' +
								_.css.gc('')
							),
							'head', 
							3
						));

					_.attachElements(a);

				},
				
				/**
				 * Initializes browser events.
				 */
				initEvents: function() {
					
					var o;

					// pollOnce disabled *and* we're not in static mode? Set up polling events.
						if (!_.config.pollOnce && !_.isStatic) {
							
							// On resize.
								_.bind('resize', function() { _.poll(); });
							
							// On orientation change.
								_.bind('orientationChange', function() { _.poll(); });
						
						}

					// Hack: Fix stupid iOS orientation/input placeholder bug.
						if (_.vars.deviceType == 'ios') {
							
							_.DOMReady(function() {

								_.bind('orientationChange', function() {

									// Get all inputs.
										var inputs = document.getElementsByTagName('input');
									
									// Temporarily clear placeholders.
										_.iterate(inputs, function(i) {
											inputs[i]._skel_placeholder = inputs[i].placeholder;
											inputs[i].placeholder = '';
										});
									
									// Then, after a short delay, put them back.
										window.setTimeout(function() {
											_.iterate(inputs, function(i) {
												inputs[i].placeholder = inputs[i]._skel_placeholder;
											});
										}, 100);

								});
							
							});
						
						}
					
					// Non-destructively bind skel events to window.
						if (window.onresize)
							_.bind('resize', window.onresize);
						
						window.onresize = function() { _.trigger('resize'); };

						if (window.onorientationchange)
							_.bind('orientationChange', window.onorientationchange);

						window.onorientationchange = function() { _.trigger('orientationChange'); };

				},
				
				/**
				 * Initializes utility methods.
				 */
				initUtilityMethods: function() {

					// _.DOMReady (based on github.com/ded/domready by @ded; domready (c) Dustin Diaz 2014 - License MIT)
						
						// Hack: Use older version for browsers that don't support addEventListener (*cough* IE8).
							if (!document.addEventListener)
								!function(e,t){_.DOMReady = t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}});
						// And everyone else.
							else
								!function(e,t){_.DOMReady = t()}("domready",function(){function s(t){i=1;while(t=e.shift())t()}var e=[],t,n=document,r="DOMContentLoaded",i=/^loaded|^c/.test(n.readyState);return n.addEventListener(r,t=function(){n.removeEventListener(r,t),s()}),function(t){i?t():e.push(t)}});

					// _.getElementsByClassName

						// Wrap existing method if it exists.
							if (document.getElementsByClassName)
								_.getElementsByClassName = function(className) { return document.getElementsByClassName(className); }
						// Otherwise, polyfill.
							else
								_.getElementsByClassName = function(className) { var d = document; if (d.querySelectorAll) return d.querySelectorAll(('.' + className.replace(' ', ' .')).replace(/\.([0-9])/, '.\\3$1 ')); else return []; }
					
					// _.indexOf

						// Wrap existing method if it exists.
							if (Array.prototype.indexOf)
								_.indexOf = function(x,b) { return x.indexOf(b) };
						// Otherwise, polyfill.
							else
								_.indexOf = function(x,b){if (typeof x=='string') return x.indexOf(b);var c,a=(b)?b:0,e;if(!this){throw new TypeError()}e=this.length;if(e===0||a>=e){return -1}if(a<0){a=e-Math.abs(a)}for(c=a;c<e;c++){if(this[c]===x){return c}}return -1};

					// _.isArray
					
						// Wrap existing method if it exists.
							if (Array.isArray)
								_.isArray = function(x) { return Array.isArray(x) };
						// Otherwise, polyfill.
							else
								_.isArray = function(x) { return (Object.prototype.toString.call(x) === '[object Array]') };

					// _.iterate

						// Use Object.keys if it exists (= better performance).
							if (Object.keys)
								_.iterate = function(a, f) {

									if (!a)
										return [];
									
									var i, k = Object.keys(a);
									
									for (i=0; k[i]; i++)
										(f)(k[i]);

								};
						// Otherwise, fall back on hasOwnProperty (= slower, but works on older browsers).
							else
								_.iterate = function(a, f) {

									if (!a)
										return [];

									var i;
									
									for (i in a)
										if (Object.prototype.hasOwnProperty.call(a, i))
											(f)(i);

								};
					
					// _.matchesMedia

						// Default: Use matchMedia (all modern browsers)
							if (window.matchMedia)
								_.matchesMedia = function(query) {
									
									if (query == '')
										return true;
									
									return window.matchMedia(query).matches;
								
								};

						// Polyfill 1: Use styleMedia/media (IE9, older Webkit) (derived from github.com/paulirish/matchMedia.js)
							else if (window.styleMedia || window.media)
								_.matchesMedia = function(query) {

									if (query == '')
										return true;

									var styleMedia = (window.styleMedia || window.media);

									return styleMedia.matchMedium(query || 'all');

								};

						// Polyfill 2: Use getComputed Style (???) (derived from github.com/paulirish/matchMedia.js)
							else if (window.getComputedStyle)
								_.matchesMedia = function(query) {

									if (query == '')
										return true;

									var	style = document.createElement('style'),
										script = document.getElementsByTagName('script')[0],
										info = null;
									
									style.type = 'text/css';
									style.id = 'matchmediajs-test';
									script.parentNode.insertBefore(style, script);
									info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

									var text = '@media ' + query + '{ #matchmediajs-test { width: 1px; } }';
									
									if (style.styleSheet)
										style.styleSheet.cssText = text;
									else
										style.textContent = text;
				
									return info.width === '1px';

								};
							
						// Polyfill 3: Manually parse (IE<9)
							else {
								
								// Force default state (if one is specified).
									_.forceDefaultState = true;
								
								_.matchesMedia = function(query) {

									// Empty query? Always succeed.
										if (query == '')
											return true;

									// Parse query.
										var s, a, b, k, values = { 'min-width': null, 'max-width': null },
											found = false;

										a = query.split(/\s+and\s+/);
											
										for (k in a) {
											
											s = a[k];
											
											// Operator (key: value)
												if (s.charAt(0) == '(') {
													
													s = s.substring(1, s.length - 1);
													b = s.split(/:\s+/);
													
													if (b.length == 2) {
													
														values[ b[0].replace(/^\s+|\s+$/g, '') ] = parseInt( b[1] );
														found = true;
													
													}
													
												}

										}
										
									// No matches? Query likely contained something unsupported so we automatically fail.
										if (!found)
											return false;
										
									// Check against viewport.
										var w = document.documentElement.clientWidth,
											h = document.documentElement.clientHeight;
										
										if ((values['min-width'] !== null && w < values['min-width'])
										||	(values['max-width'] !== null && w > values['max-width'])
										||	(values['min-height'] !== null && h < values['min-height'])
										||	(values['max-height'] !== null && h > values['max-height']))
											return false;
										
									return true;

								};
							
							}

				},

				/**
				 * Preinitializes skel.
				 * This is called as soon as skel is loaded.
				 */
				preInit: function() {

					// Only needed when testing the unminified source on IE<9.
						//if (!window.console)
						//	window.console = { log: function() { } };

					console.log('[skel] preinitializing.');

					// Initialize 'me'.
						var x = document.getElementsByTagName('script');
						_.me = x[x.length - 1];

					// Initialize API.
						_.initUtilityMethods();
						_.initAPI();

					// Register locations.
						_.registerLocation('html', document.getElementsByTagName('html')[0]);
						_.registerLocation('head', document.getElementsByTagName('head')[0]);
						
						_.DOMReady(function() {
							_.registerLocation('body', document.getElementsByTagName('body')[0]);
						});

					// Hack: IE viewport fix.
						if (_.vars.IEVersion >= 10)
							_.attachElement(_.newElement(
								'msie-viewport-fix',
								_.newInline('@-ms-viewport{width:device-width;}'),
								'^head', 
								1
							));

				}

		}

		// Preinitialize.
			_.preInit();

		// Apply IE<9 fixes.
			if (_.vars.IEVersion < 9) {

				// applyRowTransforms.
				// Row transforms don't work (RTL stuff), so we eliminate them entirely.
					_.applyRowTransforms = function(state) { };

				// newInline.
				// Can't create <style> elements on the fly, but this <span> workaround does the trick.
					_.newInline = function(s) {

						var o;

						o = document.createElement('span');
							o.innerHTML = '&nbsp;<style type="text/css">' + s + '</style>';
									
						return o;

					};
			
			}

		// Expose object.
			return _;

})();

// UMD Wrapper
// Based on https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window) with the variable name `skel`
        root.skel = factory();
  }
}(this, function () {
	// factory function that just returns the skel object
    return skel;
}));