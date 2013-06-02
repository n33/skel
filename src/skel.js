/* skelJS v0.3 | (c) n33 | n33.co @n33co | MIT + GPLv2 */

/*
	This is for development purposes only. Use the minified version instead.

	Credits:
		
		CSS Resets (http://meyerweb.com/eric/tools/css/reset/ | v2.0 | 20110126 | License: none (public domain))
		Normalize (normalize.css v2.1.1 | MIT License | git.io/normalize) 
		DOMReady Method (adapted from jQuery, courtesy: jQuery project, Diego Perini, Lucent M., Addy Osmani)
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
			noConflict: false,						// If true, (almost) all skelJS classes will be prefixed
			noConflictPrefix: 'skel',				// Prefix to use when noConflict is true
			containers: 960,						// Width of container elements (px, %, or 'fluid')
			grid: {
				collapse: false,					// If true, collapse grid structures and force all cells to occupy a full row
				gutters: 2							// Size of gutters (1, 2, 4, 6, or 0 for no gutters)
			},
			breakpoints: {
				'all': {							// Breakpoint name
					range: '*',						// Range (x-y, x-, -x, *)
					hasStyleSheet: false			// If true, skelJS will assume there's a stylesheet for this breakpoint (prefix + breakpoint name)
				}
			},
			events: {}								// Events (eventName: function() { })
		},
		
		isLegacyIE: false,
		stateId: '',
		breakpoints: [],
		events: [],
		plugins: {},
		cache: {
			elements: {},
			states: {}
		},
		locations: {
			head: null,
			body: null
		},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		css: {
			r: 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}body{line-height:1;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none;}table{border-collapse:collapse;border-spacing:0;}body{-webkit-text-size-adjust:none}',
			n: 'article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{background:#fff;color:#000;font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em}pre{white-space:pre-wrap}q{quotes:"\201C" "\201D" "\2018" "\2019"}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}button,input{line-height:normal}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}',
			g0: '.\\31 2u{width:100%}.\\31 1u{width:91.6666666667%}.\\31 0u{width:83.3333333333%}.\\39 u{width:75%}.\\38 u{width:66.6666666667%}.\\37 u{width:58.3333333333%}.\\36 u{width:50%}.\\35 u{width:41.6666666667%}.\\34 u{width:33.3333333333%}.\\33 u{width:25%}.\\32 u{width:16.6666666667%}.\\31 u{width:8.3333333333%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:0;float:left}',
			g1: '.\\31 2u{width:100%}.\\31 1u{width:91.5833333333%}.\\31 0u{width:83.1666666667%}.\\39 u{width:74.75%}.\\38 u{width:66.3333333333%}.\\37 u{width:57.9166666667%}.\\36 u{width:49.5%}.\\35 u{width:41.0833333333%}.\\34 u{width:32.6666666667%}.\\33 u{width:24.25%}.\\32 u{width:15.8333333333%}.\\31 u{width:7.4166666667%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:.5% 0 .5% 1%;float:left}',
			g2: '.\\31 2u{width:100%}.\\31 1u{width:91.5%}.\\31 0u{width:83%}.\\39 u{width:74.5%}.\\38 u{width:66%}.\\37 u{width:57.5%}.\\36 u{width:49%}.\\35 u{width:40.5%}.\\34 u{width:32%}.\\33 u{width:23.5%}.\\32 u{width:15%}.\\31 u{width:6.5%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:1% 0 1% 2%;float:left}',
			g4: '.\\31 2u{width:100%}.\\31 1u{width:91.3333333333%}.\\31 0u{width:82.6666666667%}.\\39 u{width:74%}.\\38 u{width:65.3333333333%}.\\37 u{width:56.6666666667%}.\\36 u{width:48%}.\\35 u{width:39.3333333333%}.\\34 u{width:30.6666666667%}.\\33 u{width:22%}.\\32 u{width:13.3333333333%}.\\31 u{width:4.6666666667%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:2% 0 2% 4%;float:left}',
			g6: '.\\31 2u{width:100%}.\\31 1u{width:91.1666666667%}.\\31 0u{width:82.3333333333%}.\\39 u{width:73.5%}.\\38 u{width:64.6666666667%}.\\37 u{width:55.8333333333%}.\\36 u{width:47%}.\\35 u{width:38.1666666667%}.\\34 u{width:29.3333333333%}.\\33 u{width:20.5%}.\\32 u{width:11.6666666667%}.\\31 u{width:2.8333333333%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:3% 0 3% 6%;float:left}',
			//gF: '.flush>.row>.\\31 2u{width:100%!important}.flush>.row>.\\31 1u{width:91.6666666667%!important}.flush>.row>.\\31 0u{width:83.3333333333%!important}.flush>.row>.\\39 u{width:75%!important}.flush>.row>.\\38 u{width:66.6666666667%!important}.flush>.row>.\\37 u{width:58.3333333333%!important}.flush>.row>.\\36 u{width:50%!important}.flush>.row>.\\35 u{width:41.6666666667%!important}.flush>.row>.\\34 u{width:33.3333333333%!important}.flush>.row>.\\33 u{width:25%!important}.flush>.row>.\\32 u{width:16.6666666667%!important}.flush>.row>.\\31 u{width:8.3333333333%!important}.flush>.row>.\\31 u,.flush>.row>.\\32 u,.flush>.row>.\\33 u,.flush>.row>.\\34 u,.flush>.row>.\\35 u,.flush>.row>.\\36 u,.flush>.row>.\\37 u,.flush>.row>.\\38 u,.flush>.row>.\\39 u,.flush>.row>.\\31 0u,.flush>.row>.\\31 1u,.flush>.row>.\\31 2u{margin:0!important}',
			gF: '.flush>.row>.\\31 2u{width:100%!important}.flush>.row>.\\31 1u{width:91.6666666667%!important}.flush>.row>.\\31 0u{width:83.3333333333%!important}.flush>.row>.\\39 u{width:75%!important}.flush>.row>.\\38 u{width:66.6666666667%!important}.flush>.row>.\\37 u{width:58.3333333333%!important}.flush>.row>.\\36 u{width:50%!important}.flush>.row>.\\35 u{width:41.6666666667%!important}.flush>.row>.\\34 u{width:33.3333333333%!important}.flush>.row>.\\33 u{width:25%!important}.flush>.row>.\\32 u{width:16.6666666667%!important}.flush>.row>.\\31 u{width:8.3333333333%!important}.row.flush>.\\31 2u{width:100%!important}.row.flush>.\\31 1u{width:91.6666666667%!important}.row.flush>.\\31 0u{width:83.3333333333%!important}.row.flush>.\\39 u{width:75%!important}.row.flush>.\\38 u{width:66.6666666667%!important}.row.flush>.\\37 u{width:58.3333333333%!important}.row.flush>.\\36 u{width:50%!important}.row.flush>.\\35 u{width:41.6666666667%!important}.row.flush>.\\34 u{width:33.3333333333%!important}.row.flush>.\\33 u{width:25%!important}.row.flush>.\\32 u{width:16.6666666667%!important}.row.flush>.\\31 u{width:8.3333333333%!important}.row.flush>.\\31 u,.row.flush>.\\32 u,.row.flush>.\\33 u,.row.flush>.\\34 u,.row.flush>.\\35 u,.row.flush>.\\36 u,.row.flush>.\\37 u,.row.flush>.\\38 u,.row.flush>.\\39 u,.row.flush>.\\31 0u,.row.flush>.\\31 1u,.row.flush>.\\31 2u,.flush>.row>.\\31 u,.flush>.row>.\\32 u,.flush>.row>.\\33 u,.flush>.row>.\\34 u,.flush>.row>.\\35 u,.flush>.row>.\\36 u,.flush>.row>.\\37 u,.flush>.row>.\\38 u,.flush>.row>.\\39 u,.flush>.row>.\\31 0u,.flush>.row>.\\31 1u,.flush>.row>.\\31 2u{margin:0!important}',
			gR: '.row:after{content:\'\';display:block;clear:both;height:0}.row>:first-child{margin-left:0}.row:first-child>*{margin-top:0}.row:last-child>*{margin-bottom:0}',
			//gCo: ':not(.persistent)>.row{overflow-x:hidden}:not(.persistent)>.row>.\\31 u,:not(.persistent)>.row>.\\32 u,:not(.persistent)>.row>.\\33 u,:not(.persistent)>.row>.\\34 u,:not(.persistent)>.row>.\\35 u,:not(.persistent)>.row>.\\36 u,:not(.persistent)>.row>.\\37 u,:not(.persistent)>.row>.\\38 u,:not(.persistent)>.row>.\\39 u,:not(.persistent)>.row>.\\31 0u,:not(.persistent)>.row>.\\31 1u,:not(.persistent)>.row>.\\31 2u{float:none!important;width:100%!important;margin:5px 0 5px 0!important}:not(.persistent)>.row>:first-child{margin-top:0!important}:not(.persistent)>.row:last-child>:last-child{margin-bottom:0!important}'
			gCo: ':not(.persistent)>.row,.row:not(.persistent){overflow-x:hidden}:not(.persistent)>.row>.\\31 u,:not(.persistent)>.row>.\\32 u,:not(.persistent)>.row>.\\33 u,:not(.persistent)>.row>.\\34 u,:not(.persistent)>.row>.\\35 u,:not(.persistent)>.row>.\\36 u,:not(.persistent)>.row>.\\37 u,:not(.persistent)>.row>.\\38 u,:not(.persistent)>.row>.\\39 u,:not(.persistent)>.row>.\\31 0u,:not(.persistent)>.row>.\\31 1u,:not(.persistent)>.row>.\\31 2u,.row:not(.persistent)>.\\31 u,.row:not(.persistent)>.\\32 u,.row:not(.persistent)>.\\33 u,.row:not(.persistent)>.\\34 u,.row:not(.persistent)>.\\35 u,.row:not(.persistent)>.\\36 u,.row:not(.persistent)>.\\37 u,.row:not(.persistent)>.\\38 u,.row:not(.persistent)>.\\39 u,.row:not(.persistent)>.\\31 0u,.row:not(.persistent)>.\\31 1u,.row:not(.persistent)>.\\31 2u{float:none!important;width:100%!important;margin:1% 0 1% 0!important}:not(.persistent)>.row>:first-child,.row:not(.persistent)>:first-child{margin-top:0!important}:not(.persistent)>.row:last-child>:last-child,.row:not(.persistent):last-child>:last-child{margin-bottom:0!important}'
		},
		presets: {
			'standard': {
				breakpoints: {
					'mobile': {
						range: '-480',
						lockViewport: true,
						containers: 'fluid',
						grid: {
							collapse: true
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

			getViewportWidth: function() {
			
				var w, o, r;
				
				w = window.innerWidth || document.documentElement.clientWidth;
				o = (window.orientation ? Math.abs(window.orientation) : false);
				r = (window.devicePixelRatio ? window.devicePixelRatio : 1);
			
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
				
				return w;

			},
			
			isActive: function(k) {

				return (_.indexOf(_.stateId,'#' + k) !== -1);

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
			
			onStateChange: function(f) { _.bind('stateChange', f); },

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
							newStateId += '#' + k;
					}
			
				if (newStateId === '')
					newStateId = '#';
			
				// State changed?
					if (newStateId !== _.stateId)
						_.changeState(newStateId);
			
			},
		
			updateState: function() {

				var b, k, j, list = [], a = _.stateId.substring(1).split('#');
				
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

				var a, i, k, x, w, aX, aY;
				var location, state;
				
				_.stateId = newStateId;

				console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n" + 'new state detected (id: ' + _.stateId + ')');
				
				// 1. Get State
					if (!_.cache.states[_.stateId])
					{
						console.log('- not cached. building ...');

						// Build state
							_.cache.states[_.stateId] = { config: {}, elements: [] };
							state = _.cache.states[_.stateId];

						// Build composite configuration
							if (_.stateId === '#')
								a = [];
							else
								a = _.stateId.substring(1).split('#');

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
									if (typeof state.config.containers == 'string'
									&&	state.config.containers != w)
									{
										if (state.config.containers.charAt(state.config.containers.length - 1) == '%')
										{
											u ='%';
											w = Math.min(100, w);
										}
										else if (state.config.containers.substring(state.config.containers.length - 2) == 'px')
										{
											u = 'px';
										}
										else if (state.config.containers == 'fluid')
										{
											u = '%';
											w = 100;
										}
										else
											w = 0;
									}
									else
										u = 'px';
								
								// Invalid? Default to 960px
									if (w == 0)
									{
										w = 960;
										u = 'px';
									}

								if (!(x = _.getCachedElement('iC' + w + u)))
									x = _.cacheElement('iC' + w + u, _.newInline('.' + (_.config.noConflict ? _.config.noConflictPrefix + '-' : '') + 'container{width:' + w + u + ' !important;margin: 0 auto;}'), 'head', 3);
								
								console.log('- added inlineContainer' + w + u);
								state.elements.push(x);						

							// inlineGrid*
								switch (state.config.grid.gutters)
								{
									case 0:
										if (!(x = _.getCachedElement('iG0')))
											x = _.cacheElement( 'iG0', _.newInline(_.css.g0 + _.css.gF), 'head', 3); 
										
										console.log('- added inlineGrid0');
										state.elements.push(x);
										break;
										
									case 1:
										if (!(x = _.getCachedElement('iG1')))
											x = _.cacheElement( 'iG1', _.newInline(_.css.g1 + _.css.gF), 'head', 3); 

										console.log('- added inlineGrid1');
										state.elements.push(x);
										break;
										
									case 4:
										if (!(x = _.getCachedElement('iG4')))
											x = _.cacheElement( 'iG4', _.newInline(_.css.g4 + _.css.gF), 'head', 3); 

										console.log('- added inlineGrid4');
										state.elements.push(x);
										break;
										
									case 6:
										if (!(x = _.getCachedElement('iG6')))
											x = _.cacheElement( 'iG6', _.newInline(_.css.g6 + _.css.gF), 'head', 3); 

										console.log('- added inlineGrid6');
										state.elements.push(x);
										break;

									case 2:
									default:
										if (!(x = _.getCachedElement('iG2')))
											x = _.cacheElement( 'iG2', _.newInline(_.css.g2 + _.css.gF), 'head', 3); 

										console.log('- added inlineGrid2');
										state.elements.push(x);
										break;
								}
								
							// inlineGridCollapse
								if (state.config.grid.collapse)
								{
									if (!(x = _.getCachedElement('iGCo')))
										x = _.cacheElement('iGCo', _.newInline(_.css.gR + _.css.gCo), 'head', 3);
									
									console.log('- added inlineGridCollapse');
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
									
									var s = (aX.length > 0 ? aX.join(',') + '{display:none}' : '') + (aY.length > 0 ? aY.join(',') + '{display:none}' : '');
									
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
				_.initPluginConfig(id, o);
				o.init();

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
			
			initNoConflict: function() {
			
				/*
					.row			=> .noConflictPrefix-row
					.flush			=> .noConflictPrefix-flush
					.persistent		=> .noConflictPrefix-persistent
					.container		=> .noConflictPrefix-container
				*/
			
				_.css.gF = _.css.gF.replace(/\.flush>\.row/g, '.' + _.config.noConflictPrefix +  '-flush>\.' + _.config.noConflictPrefix + '-row');
				_.css.gR = _.css.gR.replace(/\.row/g, '.' + _.config.noConflictPrefix +  '-row');
				_.css.gCo = _.css.gCo.replace(/:not\(\.persistent\)>\.row/g, ':not(.' + _.config.noConflictPrefix + '-persistent)>\.' + _.config.noConflictPrefix + '-row');
			},
			
			init: function() {

				_.isLegacyIE = (navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 <= 8 ? true : false);

				// Initialize DOMReady method (adapted from jQuery, courtesy: jQuery project, Diego Perini, Lucent M., Addy Osmani)
					(function(){'use strict';var c=window,h=function(j){d=false;h.isReady=false;if(typeof j==='function'){i.push(j)}b()},f=c.document,d=false,i=[],e=function(){if(f.addEventListener){f.removeEventListener('DOMContentLoaded',e,false)}else{f.detachEvent('onreadystatechange',e)}g()},g=function(){if(!h.isReady){if(!f.body){return setTimeout(g,1)}h.isReady=true;for(var j in i){(i[j])()}i=[];}},b=function(){var j=false;if(d){return}d=true;if(f.readyState!=='loading'){g()}if(f.addEventListener){f.addEventListener('DOMContentLoaded',e,false);c.addEventListener('load',e,false)}else{if(f.attachEvent){f.attachEvent('onreadystatechange',e);c.attachEvent('onload',e);try{j=c.frameElement==null}catch(k){}if(f.documentElement.doScroll&&j){a()}}}},a=function(){if(h.isReady){return}try{f.documentElement.doScroll('left')}catch(j){setTimeout(a,1);return}g()};h.isReady=false;_.DOMReady=h})();

				// Workaround: Legacy IE shit
					var d = document;if (!d.getElementsByClassName) d.getElementsByClassName = function(className) { if (d.querySelectorAll) return d.querySelectorAll(('.' + className.replace(' ', ' .')).replace(/\.([0-9])/, '.\\3$1 ')); else return []; }
					if (Array.prototype.indexOf)_.indexOf=function(x,b){return x.indexOf(b)};else _.indexOf=function(x,b){if (typeof x=='string')x=x.split('');var a=x.length>>>0;var c=Number(arguments[1])||0;c=(c<0)?Math.ceil(c):Math.floor(c);if(c<0){c+=a}for(;c<a;c++){if(x instanceof Array&&c in x&&x[c]===b){return c}}return -1};
				
				// Initialize config
					_.initConfig();

				// No conflict?
					if (_.config.noConflict)
						_.initNoConflict();

				// Register locations
					_.registerLocation('head', document.getElementsByTagName('head')[0]);
					
					_.DOMReady(function() {
						_.registerLocation('body', document.getElementsByTagName('body')[0]);
					});

				// Init events
					_.initEvents();

				// Do initial poll
					_.poll();

			}
	}
	
	// Initialize
		_.init();

	return _;

})();