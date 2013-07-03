/* skelJS v0.3.5-dev | (c) n33 | n33.co @n33co | MIT + GPLv2 */

/*
	This is for development purposes only. Use the minified version instead.

	Credits:
		
		CSS Resets (http://meyerweb.com/eric/tools/css/reset/ | v2.0 | 20110126 | License: none (public domain))
		Normalize (normalize.css v2.1.1 | MIT License | git.io/normalize) 
		DOMReady Method (adapted from jQuery, courtesy: The jQuery Foundation, Diego Perini, Lucent M., Addy Osmani)
*/

var skel = (function() { var _ = {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Properties
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		config: {
			prefix: null,							// Stylesheet prefix (null = disable stylesheet management)
			preloadStyleSheets: false,				// If true, preloads all breakpoint stylesheets ahead of time
			pollOnce: false,						// If true, only polls the viewport width on load (like 5grid)
			resetCSS: false,						// If true, inlines Erik Meyer's CSS resets
			normalizeCSS: false,					// If true, inlines normalize.css
			boxModel: null,							// Sets the CSS box model (border, content, margin, padding)
			useOrientation: false,					// If true, viewport width will be allowed to change based on orientation
			containers: 960,						// Width of container elements
			containerUnits: false,					// Container units (px, pt, %, vw)
			debug: false,
			grid: {
				collapse: false,					// Sets the collapse depth (1/true, 2, or 3; false = don't collapse)
				gutters: 40,						// Size of gutters
				gutterUnits: false					// Gutter units (px, pt, %, vw)
			},
			breakpoints: {
				'all': {							// Breakpoint name
					range: '*',						// Range (x-y, x-, -x, *)
					hasStyleSheet: false			// If true, skelJS will assume there's a stylesheet for this breakpoint (prefix + breakpoint name)
				}
			},
			events: {}								// Events (eventName: function() { })
		},
		
		isConfigured: false,
		isInit: false,
		isLegacyIE: false,
		stateId: '',
		breakpoints: [],
		breakpointList: [],
		events: [],
		plugins: {},
		cache: {
			elements: {},
			states: {}
		},
		locations: {
			html: null,
			head: null,
			body: null
		},
		values: [],

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		sd: ' ',
		css: {
			r: 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}',
			n: 'article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{background:#fff;color:#000;font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em}pre{white-space:pre-wrap}q{quotes:"\201C" "\201D" "\2018" "\2019"}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}button,input{line-height:normal}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}',
			g: '.\\31 2u{width:100%}.\\31 1u{width:91.6666666667%}.\\31 0u{width:83.3333333333%}.\\39 u{width:75%}.\\38 u{width:66.6666666667%}.\\37 u{width:58.3333333333%}.\\36 u{width:50%}.\\35 u{width:41.6666666667%}.\\34 u{width:33.3333333333%}.\\33 u{width:25%}.\\32 u{width:16.6666666667%}.\\31 u{width:8.3333333333%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{float:left;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.\\-11u{margin-left:91.6666666667%}.\\-10u{margin-left:83.3333333333%}.\\-9u{margin-left:75%}.\\-8u{margin-left:66.6666666667%}.\\-7u{margin-left:58.3333333333%}.\\-6u{margin-left:50%}.\\-5u{margin-left:41.6666666667%}.\\-4u{margin-left:33.3333333333%}.\\-3u{margin-left:25%}.\\-2u{margin-left:16.6666666667%}.\\-1u{margin-left:8.3333333333%}',
			gF: '.row.flush{margin-left:0}.row.flush>*{padding:0!important}',
			gR: '.row:after{content:\'\';display:block;clear:both;height:0}.row:first-child>*{padding-top:0}.row>*{padding-top:0}',
			gC: '.row@{overflow-x:hidden;margin-left:0}.row@>*{float:none!important;width:100%!important;padding:10px 0 10px 0!important;margin-left:0!important}',
			d: '.row>*{box-shadow:inset 0 0 0 1px red}'
		},
		presets: {
			'default': {
			},
			'standard': {
				breakpoints: {
					'mobile': {
						range: '-480',
						lockViewport: true,
						containers: 'fluid',
						grid: {
							collapse: 1
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
		defaults: {
			breakpoint: {
				test: null,
				config: null,
				elements: null
			},
			config_breakpoint: {
				range: '',
				containers: 960,
				containerUnits: false,
				lockViewport: false,
				viewportWidth: false,
				hasStyleSheet: true,
				grid: {}
			}
		},
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/* Helper */

			DOMReady: null,
			indexOf: null,

			extend: function(x,y) {
				
				var k;
				
				for (k in y)
				{
					if (typeof y[k] == 'object')
					{
						if (typeof x[k] != 'object')
							x[k] = {};
						
						_.extend(x[k], y[k]);
					}
					else
						x[k] = y[k];
				}
			
			},

			parseMeasurement: function(x) { 

				var a, tmp;

				// Not a string? Assume it's in px
				if (typeof x !== 'string')
					a = [x,'px'];
				// Fluid shortcut?
				else if (x == 'fluid')
					a = [100,'%'];
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

			getDevicePixelRatio: function() {
				
				// Hack: iOS and OS X both support devicePixelRatio but it factors it into width calculations ahead of
				// time. Which is nice I guess, but as this isn't consistent with other platforms we need to force a 1 here.
					if (navigator.userAgent.match(/(iPod|iPhone|iPad|Macintosh)/))
						return 1;

				// If DPR is available use it (Hack: But only if we're not using Firefox mobile, which appears to always report 1)
					if (window.devicePixelRatio !== undefined && !navigator.userAgent.match(/(Firefox)/))
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

			getViewportWidth: function() {
			
				var w, o, r;
				
				w = document.documentElement.clientWidth;
				o = (window.orientation ? Math.abs(window.orientation) : false);
				r = _.getDevicePixelRatio();
			
				// Screen width smaller than viewport width? Use screen width instead.
					if (screen.width < w)
						w = screen.width;

				// Device has orientation?
					if (o !== false)
					{
						// Orientation detection enabled? If yes, figure out which side we want to measure
							if (_.config.useOrientation)
							{
								if (o === 90)
									w = screen.height;
								else
									w = screen.width;
							}
						// Otherwise, default to the longest side
							else
							{
								if (screen.width > screen.height)
									w = screen.height;
								else
									w = screen.width;
							}
					}
				
				// Divide by pixel ratio
					w = w / r;

				// Set values
					_.values['viewportWidth'] = w;
					_.values['devicePixelRatio'] = r;

				return w;

			},
			
			isActive: function(k) {

				return (_.indexOf(_.stateId, _.sd + k) !== -1);

			},
			
			getValue: function(k) {
			
				if (k in _.values)
					return _.values[k];
			
				return null;
			
			},

		/* Events */

			bind: function(name, f) {

				if (!_.events[name])
					_.events[name] = [];
					
				_.events[name].push(f);

			},
			
			trigger: function(name) {
				if (!_.events[name] || _.events[name].length == 0)
					return;
				
				var k;
				
				for (k in _.events[name])
					(_.events[name][k])();
			},
			
			onStateChange: function(f) {
				_.bind('stateChange', f); 
				
				// If skel's already been initialized and we're just now binding this event,
				// we're late to the game so manually fire it once.
					if (_.isInit)
						(f)();
			},

		/* Locations */
		
			registerLocation: function(id,object) {
				
				_.locations[id] = object;
			
			},

		/* Elements */

			cacheElement: function(id,object,location,priority) {

				console.log('(cached element ' + id + ')');

				return (_.cache.elements[id] = {
					'id': id,
					'object': object,
					'location': location,
					'priority': priority
				});

			},

			cacheBreakpointElement: function(breakpointName,id,object,location,priority) {
				
				var o = _.getCachedElement(id);
				
				if (!o)
					o = _.cacheElement(id,object,location,priority); 
				
				if (_.breakpoints[breakpointName])
				{
					console.log('- linked element ' + id + ' to breakpoint ' + breakpointName);
					_.breakpoints[breakpointName].elements.push(o);
				}

				return o;

			},
		
			getCachedElement: function(id) {

				if (_.cache.elements[id])
					return _.cache.elements[id];
					
				return null;

			},
		
			detachAllElements: function() {

				var k, x;
				
				for (k in _.cache.elements)
				{
					x = _.cache.elements[k].object;
					
					if (!x.parentNode
					|| (x.parentNode && !x.parentNode.tagName))
						continue;

					console.log('-- detached ' + _.cache.elements[k].id);
					
					x.parentNode.removeChild(x);

					if (_.cache.elements[k].onDetach)
						(_.cache.elements[k].onDetach)();
				}

			},
		
			attachElements: function(list) {

				var a = [], w = [], k, l, x;
				
				for (k in list)
				{
					if (!a[ list[k].priority ])
						a[ list[k].priority ] = [];
						
					a[ list[k].priority ].push(list[k]);
				}
				
				for (k in a)
				{
					if (a[k].length == 0)
						continue;
					
					for (x in a[k])
					{
						l = _.locations[ a[k][x].location ];
						if (l)
						{
							console.log('-- attached (' + k + ') ' + a[k][x].id);
							l.appendChild( a[k][x].object );

							if (a[k][x].onAttach)
								(a[k][x].onAttach)();
						}
						else
						{
							console.log('-- DOMReady attached (' + k + ') ' + a[k][x].id);
							w.push(a[k][x]);
						}
					}
				}
				
				if (w.length > 0)
				{
					_.DOMReady(function() {
						for (var k in w)
						{
							_.locations[ w[k].location ].appendChild(w[k].object);
							
							if (w[k].onAttach)
								(w[k].onAttach)();
						}
					});
				}

			},

		/* Main */
	
			poll: function() {
			
				var k, w, newStateId = '';
				
				// Calculate width
					w = _.getViewportWidth();
				
				// Determine new state
					for (k in _.breakpoints)
					{
						if ((_.breakpoints[k].test)(w))
							newStateId += _.sd + k;
					}
			
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
		
			updateState: function() {

				var b, k, j, list = [], a = _.stateId.substring(1).split(_.sd);
				
				// Step through active state's breakpoints
					for (k in a)
					{
						b = _.breakpoints[a[k]];
						
						// If the breakpoint now has elements of its own, add them into the state's cache
							if (b.elements.length == 0)
								continue;
								
							for (j in b.elements)
							{
								console.log('- added new breakpoint element ' + b.elements[j].id + ' to state ' + _.stateId);
								_.cache.states[_.stateId].elements.push(b.elements[j]);
								list.push(b.elements[j]);
							}
					}
				
				// If new elements were detected, go ahead and attach them
					if (list.length > 0)
					{
						console.log('- updating state ... ');
						_.attachElements(list);
					}

			},
		
			changeState: function(newStateId) {

				var a, i, k, x, w, aX, aY, tmp, d;
				var g, gh, gd;
				var location, state;
				
				_.stateId = newStateId;

				console.log('new state detected (id: ' + _.stateId + ')');
				
				// 1. Get State
					if (!_.cache.states[_.stateId])
					{
						console.log('- not cached. building ...');

						// Build state
							_.cache.states[_.stateId] = { config: {}, elements: [] };
							state = _.cache.states[_.stateId];

						// Build composite configuration
							if (_.stateId === _.sd)
								a = [];
							else
								a = _.stateId.substring(1).split(_.sd);

							_.extend(state.config, _.defaults.config_breakpoint);
							for (k in a)
								_.extend(state.config, _.breakpoints[a[k]].config);

							// inlineBoxModel
								if (_.config.boxModel)
								{
									if (!(x = _.getCachedElement('iBM')))
										x = _.cacheElement('iBM', _.newInline(('*,*:before,*:after{-moz-@;-webkit-@;-o-@;-ms-@;@}').replace(/@/g,'box-sizing:' + _.config.boxModel + '-box')), 'head', 3);
									console.log('- added inlineBoxModel');
									state.elements.push(x);
								}

							// inlineReset
								if (_.config.resetCSS)
								{
									if (!(x = _.getCachedElement('iR')))
										x = _.cacheElement('iR', _.newInline(_.css.r), 'head', 2);
									
									console.log('- added inlineReset');
									state.elements.push(x);
								}
							// inlineNormalize
								else if (_.config.normalizeCSS)
								{
									if (!(x = _.getCachedElement('iN')))
										x = _.cacheElement('iN', _.newInline(_.css.n), 'head', 2);
									
									console.log('- added inlineNormalize');
									state.elements.push(x);
								}
							
							// styleSheetBase
								if (_.config.prefix)
								{
									if (!(x = _.getCachedElement('ssB')))
										x = _.cacheElement( 'ssB', _.newStyleSheet(_.config.prefix + '.css'), 'head', 4);
									
									console.log('- added styleSheetBase');
									state.elements.push(x);
								}
								
							// metaViewport
								if (state.config.lockViewport)
								{
									if (!(x = _.getCachedElement('mVL' + _.stateId)))
										x = _.cacheElement('mVL' + _.stateId, _.newMeta('viewport', 'width=' + (state.config.viewportWidth ? state.config.viewportWidth : 'device-width') + ',initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'), 'head', 1);
									
									console.log('- added metaViewportLock' + _.stateId);
									state.elements.push(x);
								}
								else if (state.config.viewportWidth)
								{
									if (!(x = _.getCachedElement('mV' + _.stateId)))
										x = _.cacheElement('mV' + _.stateId, _.newMeta('viewport', 'width=' + state.config.viewportWidth), 'head', 1);
									
									console.log('- added metaViewport' + _.stateId);
									state.elements.push(x);
								}
									
							// inlineContainer*
								w = parseInt(state.config.containers);
								
								// Figure out units
									// If explicit container units were provided, use legacy method
										if (state.config.containerUnits)
										{
											w = state.config.containers;
											u = state.config.containerUnits;
										}
									// Otherwise, use new method (parseMeasurement)
										else
										{
											tmp = _.parseMeasurement(state.config.containers);
											w = tmp[0];
											u = tmp[1];
										}

								if (!(x = _.getCachedElement('iC' + w + u)))
									x = _.cacheElement('iC' + w + u, _.newInline('.container{width:' + w + u + ' !important;margin: 0 auto}'), 'head', 3);
								
								console.log('- added inlineContainer' + w + u);
								state.elements.push(x);						

							// inlineGrid*
								if (!(x = _.getCachedElement('iG')))
									x = _.cacheElement( 'iG', _.newInline(_.css.g + _.css.gF), 'head', 3); 
								
								console.log('- added inlineGrid');
								state.elements.push(x);

								// Gutters
									// If explicit container units were provided, use legacy method
										if (state.config.grid.gutterUnits)
										{
											g = state.config.grid.gutters;
											u = state.config.grid.gutterUnits;
										}
									// Otheriwse, use new method (parseMeasurement)
										else
										{
											tmp = _.parseMeasurement(state.config.grid.gutters);
											g = tmp[0];
											u = tmp[1];
										}
									
									gh = g / 2;
									gd = g * 2;

									g = g + u;
									gh = gh + u;
									gd = gd + u;

									if (!(x = _.getCachedElement('iGG' + state.config.grid.gutters)))
										x = _.cacheElement(
											'iGG' + state.config.grid.gutters, 
											_.newInline(
												'.row>*{padding:' + g + ' 0 0 '+ g + '}.row+.row>*{padding-top:' + g + '}.row{margin-left:-' + g + '}' +
												'.row.half>*{padding:' + gh + ' 0 0 '+ gh + '}.row.half+.row.half>*{padding-top:' + gh + '}.row.half{margin-left:-' + gh + '}' +
												'.row.double>*{padding:' + gd + ' 0 0 '+ gd + '}.row.double+.row.double>*{padding-top:' + gd + '}.row.double{margin-left:-' + gd + '}'
											), 
											'head', 
											3
										); 

									console.log('- added inlineGrid' + state.config.grid.gutters);
									state.elements.push(x);

							// inlineGridCollapse
								if (state.config.grid.collapse)
								{
									d = parseInt(state.config.grid.collapse);
									
									if (isNaN(d))
										d = 1;
								
									if (!(x = _.getCachedElement('iGC' + d)))
									{
										g = _.css.gR + _.css.gC;
										tmp = ':not(.persistent):not(.no-collapse)';
										
										switch (d)
										{
											case 4:
												break;

											case 3:
												tmp += ':not(.no-collapse-3)';
												break;

											case 2:
												tmp += ':not(.no-collapse-2):not(.no-collapse-3)';
												break;

											case 1:
											default:
												tmp += ':not(.no-collapse-1):not(.no-collapse-2):not(.no-collapse-3)';
												break;
										}

										g = g.replace(/@/g, tmp);
										
										x = _.cacheElement('iGC' + d, _.newInline(g), 'head', 3);
									}
									
									console.log('- added inlineGridCollapse' + d);
									state.elements.push(x);						
								}
								else
								{
									if (!(x = _.getCachedElement('iGNoCo')))
										x = _.cacheElement('iGNoCo', _.newInline(_.css.gR), 'head', 3); 
									
									console.log('- added inlineGridNoCollapse');
									state.elements.push(x);
								}
								
							// Conditionals
								if (!(x = _.getCachedElement('iCd' + _.stateId)))
								{
									aX = [];
									aY = [];
									
									for (k in _.breakpoints)
									{
										if (_.indexOf(a,k) !== -1)
											aX.push('.not-' + k);
										else
											aY.push('.only-' + k);
									}
									
									var s = (aX.length > 0 ? aX.join(',') + '{display:none!important}' : '') + (aY.length > 0 ? aY.join(',') + '{display:none!important}' : '');
									
									x = _.cacheElement('icD' + _.stateId, _.newInline(
										s.replace(/\.([0-9])/, '.\\3$1 ')
									), 'head', 3);
									
									console.log('- added inlineConditionals' + _.stateId);
									state.elements.push(x);
								}

							// Breakpoint-specific stuff
								for (k in a)
								{
									// styleSheet*
										if (_.breakpoints[a[k]].config.hasStyleSheet && _.config.prefix)
										{
											if (!(x = _.getCachedElement('ss' + a[k])))
												x = _.cacheElement('ss' + a[k], _.newStyleSheet(_.config.prefix + '-' + a[k] + '.css'), 'head', 5);
											
											console.log('- added styleSheet' + a[k]);
											state.elements.push(x);
										}
									
									// Elements
										if (_.breakpoints[a[k]].elements.length > 0)
										{
											for (x in _.breakpoints[a[k]].elements)
											{
												console.log('- added breakpoint element ' + _.breakpoints[a[k]].elements[x].id);
												state.elements.push(_.breakpoints[a[k]].elements[x]);
											}
										}
								}
							
							// Debug
								if (_.config.debug)
								{
									if (!(x = _.getCachedElement('d')))
										x = _.cacheElement( 'd', _.newInline(_.css.d), 'head', 3); 
									
									console.log('- added debug');
									state.elements.push(x);
								}
					}
					else
					{
						state = _.cache.states[_.stateId];
						console.log('- found cached');
					}

				// 2. Detach all elements
					console.log('- detaching all attached elements ...');
					_.detachAllElements();

				// 3. Apply state
					console.log('- applying state elements ... ');
					_.attachElements(state.elements);
					
				// 4. Handle cell modifiers
					_.DOMReady(function() {
						
						var x, m, p;
						
						// mainContent
							m = 'skel-cell-mainContent';
							x = document.getElementsByClassName(m);

							if (x && x.length > 0)
							{
								x = x[0];
							
								if (state.config.grid.collapse)
								{
									console.log('mainContent: moving to top');

									// Create placeholder
										p = document.createElement('div');
											p.innerHTML = '';
											p.id = m + '-placeholder';
											x.parentNode.insertBefore(p, x.nextSibling);
								
									// Move x to top
										x.parentNode.insertBefore(x, x.parentNode.firstChild);
								}
								else
								{
									// Find placeholder
										p = document.getElementById(m + '-placeholder');
										
									// If it exists, move x back
										if (p)
										{
											console.log('mainContent: moving back to origin');
										
											// Move x above placeholder
												x.parentNode.insertBefore(x, p);
												
											// Delete placeholder
												x.parentNode.removeChild(p);
										}
								}
							}
					});
					
				// 5. Trigger stateChange event
					_.trigger('stateChange');

			},
		
		/* New */

			newMeta: function(name, content) {

				var o = document.createElement('meta');
					o.name = name;
					o.content = content;

				return o;

			},
			
			newStyleSheet: function(f) {
				
				var o = document.createElement('link');
					o.rel = 'stylesheet';
					o.type = 'text/css';
					o.href = f;
				
				return o;

			},
			
			newInline: function(s) {

				var o;

				if (_.isLegacyIE)
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

			newDiv: function(s) {

				var o = document.createElement('div');
					o.innerHTML = s;
				
				return o;

			},

		/* Plugins */

			registerPlugin: function(id, o) {
				
				_.plugins[id] = o;
				o._ = this;

				if (_.isConfigured)
				{
					_.initPluginConfig(id, _.plugins[id]);
					o.init();
				}
			},
			
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

			initConfig: function() {

				var c, b, s, f, fArgs = [], preloads = [];
				
				// Define the test building function
					function buildTest(k, s)
					{
						var f;

						if (typeof s != 'string')
							f = function(v) { return false; };
						
						if (s == '*')
							f = function(v) { return true; };
						else if (s.charAt(0) == '-')
						{
							fArgs[k] = parseInt(s.substring(1));
							f = function(v) { return (v <= fArgs[k]); };
						}
						else if (s.charAt(s.length - 1) == '-')
						{
							fArgs[k] = parseInt(s.substring(0, s.length - 1));
							f = function(v) { return (v >= fArgs[k]); };
						}
						else if (_.indexOf(s,'-') != -1)
						{
							s = s.split('-');
							fArgs[k] = [parseInt(s[0]), parseInt(s[1])];
							f = function(v) { return (v >= fArgs[k][0] && v <= fArgs[k][1]); };
						}
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
						s = document.getElementsByTagName('script');
						s = s[s.length - 1].innerHTML.replace(/^\s+|\s+$/g, '');
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
					for (k in _.config.breakpoints)
					{
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
								preloads.push(_.newStyleSheet(_.config.prefix + '-' + k + '.css'));
					
						// Add to list
							_.breakpointList.push(k);
					}
					
				// Process events config
					for (k in _.config.events)
						_.bind(k, _.config.events[k]);
					
				// Handle stylesheet preloads (if any)
					if (preloads.length > 0)
					{
						_.DOMReady(function() {
							var k, h = document.getElementsByTagName('head')[0];
							
							for (k in preloads)
							{
								h.appendChild(preloads[k]);
								h.removeChild(preloads[k]);
							}
						});
					}

			},
			
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
			
			init: function(config, pluginConfig) {

				console.log('starting init');

				_.isLegacyIE = (navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 <= 8 ? true : false);

				// Initialize DOMReady method (adapted from jQuery, courtesy: The jQuery Foundation, Diego Perini, Lucent M., Addy Osmani)
					(function(){'use strict';var c=window,h=function(j){d=false;h.isReady=false;if(typeof j==='function'){i.push(j)}b()},f=c.document,d=false,i=[],e=function(){if(f.addEventListener){f.removeEventListener('DOMContentLoaded',e,false)}else{f.detachEvent('onreadystatechange',e)}g()},g=function(){if(!h.isReady){if(!f.body){return setTimeout(g,1)}h.isReady=true;for(var j in i){(i[j])()}i=[];}},b=function(){var j=false;if(d){return}d=true;if(f.readyState!=='loading'){g()}if(f.addEventListener){f.addEventListener('DOMContentLoaded',e,false);c.addEventListener('load',e,false)}else{if(f.attachEvent){f.attachEvent('onreadystatechange',e);c.attachEvent('onload',e);try{j=c.frameElement==null}catch(k){}if(f.documentElement.doScroll&&j){a()}}}},a=function(){if(h.isReady){return}try{f.documentElement.doScroll('left')}catch(j){setTimeout(a,1);return}g()};h.isReady=false;_.DOMReady=h})();

				// Hack: Legacy IE shit
					var d = document;if (!d.getElementsByClassName) d.getElementsByClassName = function(className) { if (d.querySelectorAll) return d.querySelectorAll(('.' + className.replace(' ', ' .')).replace(/\.([0-9])/, '.\\3$1 ')); else return []; }
					if (Array.prototype.indexOf)_.indexOf=function(x,b){return x.indexOf(b)};else _.indexOf=function(x,b){if (typeof x=='string')x=x.split('');var a=x.length>>>0;var c=Number(arguments[1])||0;c=(c<0)?Math.ceil(c):Math.floor(c);if(c<0){c+=a}for(;c<a;c++){if(x instanceof Array&&c in x&&x[c]===b){return c}}return -1};
				
				// Initialize config
				
					if (config)
						window._skel_config = config;
						
					if (pluginConfig)
					{
						var id;
						
						for (id in pluginConfig)
							window['_skel_' + id + '_config'] = pluginConfig[id];
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

					for (id in _.plugins)
					{
						_.initPluginConfig(id, _.plugins[id]);
						_.plugins[id].init();
					}

				// Mark as initialized
					_.isInit = true;
			},
			
			preInit: function() {

				console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n");

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
			
			},
	}

	// Pre-init
		_.preInit();

	return _;

})();