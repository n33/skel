/* skel.js v0.1 | (c) n33 | n33.co @n33co | MIT + GPLv2 */

var d = document;if (!d.getElementsByClassName) d.getElementsByClassName = function(className) { return d.querySelectorAll(('.' + className.replace(' ', ' .')).replace(/\.([0-9])/, '.\\3$1 ')); }
var skel;

(function() { var _p = {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Properties
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		config: {
			prefix: null,
			preloadStyleSheets: false,
			pollOnce: false,
			useResets: false,
			useOrientation: false,
			grid: {
				containers: 960,
				collapse: false,
				gutters: 2
			},
			breakpoints: {
				'all': {
					range: null,
					hasStyleSheet: false
				}
			},
			events: {}
		},
		
		breakpoints: [],
		isLegacyIE: false,
		stateId: '',
		cache: {
			elements: {},
			states: {}
		},
		locations: {
			head: null,
			body: null
		},
		events: [],
		plugins: {},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Data
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		css: {
			r: 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}body{line-height:1;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none;}table{border-collapse:collapse;border-spacing:0;}body{-webkit-text-size-adjust:none}',
			//r: 'article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,video{display:inline-block}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{background:#fff;color:#000;font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:.67em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}mark{background:#ff0;color:#000}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em}pre{white-space:pre-wrap}q{quotes:"\201C" "\201D" "\2018" "\2019"}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}button,input{line-height:normal}button,select{text-transform:none}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}',
			g0: '.\\31 2u{width:100%}.\\31 1u{width:91.6666666667%}.\\31 0u{width:83.3333333333%}.\\39 u{width:75%}.\\38 u{width:66.6666666667%}.\\37 u{width:58.3333333333%}.\\36 u{width:50%}.\\35 u{width:41.6666666667%}.\\34 u{width:33.3333333333%}.\\33 u{width:25%}.\\32 u{width:16.6666666667%}.\\31 u{width:8.3333333333%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:0;float:left}',
			g1: '.\\31 2u{width:100%}.\\31 1u{width:91.5833333333%}.\\31 0u{width:83.1666666667%}.\\39 u{width:74.75%}.\\38 u{width:66.3333333333%}.\\37 u{width:57.9166666667%}.\\36 u{width:49.5%}.\\35 u{width:41.0833333333%}.\\34 u{width:32.6666666667%}.\\33 u{width:24.25%}.\\32 u{width:15.8333333333%}.\\31 u{width:7.4166666667%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:.5% 0 .5% 1%;float:left}',
			g2: '.\\31 2u{width:100%}.\\31 1u{width:91.5%}.\\31 0u{width:83%}.\\39 u{width:74.5%}.\\38 u{width:66%}.\\37 u{width:57.5%}.\\36 u{width:49%}.\\35 u{width:40.5%}.\\34 u{width:32%}.\\33 u{width:23.5%}.\\32 u{width:15%}.\\31 u{width:6.5%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:1% 0 1% 2%;float:left}',
			g4: '.\\31 2u{width:100%}.\\31 1u{width:91.3333333333%}.\\31 0u{width:82.6666666667%}.\\39 u{width:74%}.\\38 u{width:65.3333333333%}.\\37 u{width:56.6666666667%}.\\36 u{width:48%}.\\35 u{width:39.3333333333%}.\\34 u{width:30.6666666667%}.\\33 u{width:22%}.\\32 u{width:13.3333333333%}.\\31 u{width:4.6666666667%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:2% 0 2% 4%;float:left}',
			g6: '.\\31 2u{width:100%}.\\31 1u{width:91.1666666667%}.\\31 0u{width:82.3333333333%}.\\39 u{width:73.5%}.\\38 u{width:64.6666666667%}.\\37 u{width:55.8333333333%}.\\36 u{width:47%}.\\35 u{width:38.1666666667%}.\\34 u{width:29.3333333333%}.\\33 u{width:20.5%}.\\32 u{width:11.6666666667%}.\\31 u{width:2.8333333333%}.\\31 u,.\\32 u,.\\33 u,.\\34 u,.\\35 u,.\\36 u,.\\37 u,.\\38 u,.\\39 u,.\\31 0u,.\\31 1u,.\\31 2u{margin:3% 0 3% 6%;float:left}',
			gF: '.grid-flush>.row>.\\31 2u{width:100%!important}.grid-flush>.row>.\\31 1u{width:91.6666666667%!important}.grid-flush>.row>.\\31 0u{width:83.3333333333%!important}.grid-flush>.row>.\\39 u{width:75%!important}.grid-flush>.row>.\\38 u{width:66.6666666667%!important}.grid-flush>.row>.\\37 u{width:58.3333333333%!important}.grid-flush>.row>.\\36 u{width:50%!important}.grid-flush>.row>.\\35 u{width:41.6666666667%!important}.grid-flush>.row>.\\34 u{width:33.3333333333%!important}.grid-flush>.row>.\\33 u{width:25%!important}.grid-flush>.row>.\\32 u{width:16.6666666667%!important}.grid-flush>.row>.\\31 u{width:8.3333333333%!important}.grid-flush>.row>.\\31 u,.grid-flush>.row>.\\32 u,.grid-flush>.row>.\\33 u,.grid-flush>.row>.\\34 u,.grid-flush>.row>.\\35 u,.grid-flush>.row>.\\36 u,.grid-flush>.row>.\\37 u,.grid-flush>.row>.\\38 u,.grid-flush>.row>.\\39 u,.grid-flush>.row>.\\31 0u,.grid-flush>.row>.\\31 1u,.grid-flush>.row>.\\31 2u{margin:0!important}',
			gR: '.grid .row:after{content:\'\';display:block;clear:both;height:0}.grid .row>:first-child{margin-left:0}.grid .row:first-child>*{margin-top:0}.grid .row:last-child>*{margin-bottom:0}',
			gCo: '.grid:not(.grid-persistent){width:100%;margin:0}.grid:not(.grid-persistent)>.row{overflow-x:hidden}.grid:not(.grid-persistent)>.row>.\\31 u,.grid:not(.grid-persistent)>.row>.\\32 u,.grid:not(.grid-persistent)>.row>.\\33 u,.grid:not(.grid-persistent)>.row>.\\34 u,.grid:not(.grid-persistent)>.row>.\\35 u,.grid:not(.grid-persistent)>.row>.\\36 u,.grid:not(.grid-persistent)>.row>.\\37 u,.grid:not(.grid-persistent)>.row>.\\38 u,.grid:not(.grid-persistent)>.row>.\\39 u,.grid:not(.grid-persistent)>.row>.\\31 0u,.grid:not(.grid-persistent)>.row>.\\31 1u,.grid:not(.grid-persistent)>.row>.\\31 2u{float:none!important;width:100%!important;margin:1% 0 1% 0!important}.grid:not(.grid-persistent)>.row:first-child>:first-child{margin-top:0}.grid:not(.grid-persistent)>.row:last-child>:last-child{margin-bottom:0}'
		},
		presets: {
			legacy: {
				prefix: 'style',
				useResets: true,
				useOrientation: false,
				grid: {
					containers: 1200
				},
				breakpoints: {
					'mobile': {
						range: '-480',
						lockViewport: true,
						grid: {
							containers: 'fluid',
							collapse: true
						}
					},
					'desktop': {
						range: '481-',
						grid: {
							containers: 1200
						}
					},
					'1000px': {
						range: '481-1200',
						grid: {
							containers: 960
						}
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
				range: null,
				lockViewport: false,
				hasStyleSheet: true,
				grid: {}
			}
		},
		
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Methods
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/* Helper */

			DOMReady: null,

			extend: function(x,y) {
				var k;
				
				for (k in y)
				{
					if (typeof y[k] == 'object')
					{
						if (typeof x[k] != 'object')
							x[k] = {};
						
						_p.extend(x[k], y[k]);
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
							if (_p.config.useOrientation)
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
				return (_p.stateId.indexOf('#' + k) !== -1);
			},

		/* Events */

			bind: function(name, f) {
				if (!_p.events[name])
					_p.events[name] = [];
					
				_p.events[name].push(f);
			},
			
			trigger: function(name) {
				if (!_p.events[name] || _p.events[name].length == 0)
					return;
				
				var k;
				
				for (k in _p.events[name])
					(_p.events[name][k])();
			},
			
			onStateChange: function(f) { _p.bind('stateChange', f); },

		/* Locations */
		
			registerLocation: function(id,object) {
				_p.locations[id] = object;
			},

		/* Elements */

			cacheElement: function(id,object,location,priority) {
				console.log('(cached element ' + id + ')');
				return (_p.cache.elements[id] = {
					'id': id,
					'object': object,
					'location': location,
					'priority': priority
				});
			},

			cacheBreakpointElement: function(breakpointName,id,object,location,priority) {
				var o = _p.getCachedElement(id);
				
				if (!o)
					o = _p.cacheElement(id,object,location,priority); 
				
				if (_p.breakpoints[breakpointName])
				{
					console.log('- linked element ' + id + ' to breakpoint ' + breakpointName);
					_p.breakpoints[breakpointName].elements.push(o);
				}
				return o;
			},
		
			getCachedElement: function(id) {
				if (_p.cache.elements[id])
					return _p.cache.elements[id];
					
				return null;
			},
		
			detachAllElements: function() {
				var k, x;
				
				for (k in _p.cache.elements)
				{
					x = _p.cache.elements[k].object;
					
					if (!x.parentNode
					|| (x.parentNode && !x.parentNode.tagName))
						continue;

					console.log('-- detached ' + _p.cache.elements[k].id);
					
					x.parentNode.removeChild(x);

					if (_p.cache.elements[k].onDetach)
						(_p.cache.elements[k].onDetach)();
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
						l = _p.locations[ a[k][x].location ];
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
					_p.DOMReady(function() {
						for (var k in w)
						{
							_p.locations[ w[k].location ].appendChild(w[k].object);
							
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
					w = _p.getViewportWidth();
				
				// Determine new state
					for (k in _p.breakpoints)
					{
						if ((_p.breakpoints[k].test)(w))
							newStateId += '#' + k;
					}
			
				// State changed?
					if (newStateId !== _p.stateId)
						_p.changeState(newStateId);
			
			},
		
			updateState: function() {

				var b, k, j, list = [], a = _p.stateId.substring(1).split('#');
				
				// Step through active state's breakpoints
					for (k in a)
					{
						b = _p.breakpoints[a[k]];
						
						// If the breakpoint now has elements of its own, add them into the state's cache
							if (b.elements.length == 0)
								continue;
								
							for (j in b.elements)
							{
								console.log('- added new breakpoint element ' + b.elements[j].id + ' to state ' + _p.stateId);
								_p.cache.states[_p.stateId].elements.push(b.elements[j]);
								list.push(b.elements[j]);
							}
					}
				
				// If new elements were detected, go ahead and attach them
					if (list.length > 0)
					{
						console.log('- updating state ... ');
						_p.attachElements(list);
					}

			},
		
			changeState: function(newStateId) {
				var a, k, x, w;
				var location, state;
				
				_p.stateId = newStateId;

				console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n" + 'new state detected (id: ' + _p.stateId + ')');
				
				// 1. Get State
					if (!_p.cache.states[_p.stateId])
					{
						console.log('- not cached. building ...');

						// Build state
							_p.cache.states[_p.stateId] = { config: {}, elements: [] };
							state = _p.cache.states[_p.stateId];

						// Build composite configuration
							a = _p.stateId.substring(1).split('#');
							_p.extend(state.config, _p.defaults.config_breakpoint);
							for (k in a)
								_p.extend(state.config, _p.breakpoints[a[k]].config);

							// inlineResets
								if (_p.config.useResets)
								{
									if (!(x = _p.getCachedElement('iR')))
										x = _p.cacheElement('iR', _p.newInline(_p.css.r), 'head', 2);
									
									console.log('- added inlineResets');
									state.elements.push(x);
								}
							
							// styleSheetBase
								if (_p.config.prefix)
								{
									if (!(x = _p.getCachedElement('ssB')))
										x = _p.cacheElement( 'ssB', _p.newStyleSheet(_p.config.prefix + '.css'), 'head', 4);
									
									console.log('- added styleSheetBase');
									state.elements.push(x);
								}
								
							// metaViewport
								if (state.config.lockViewport)
								{
									if (!(x = _p.getCachedElement('mV')))
										x = _p.cacheElement('mV', _p.newMeta('viewport', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'), 'head', 1);
									
									console.log('- added metaViewport');
									state.elements.push(x);
								}
									
							// inlineGrid*
								switch (state.config.grid.gutters)
								{
									case 0:
										if (!(x = _p.getCachedElement('iG0')))
											x = _p.cacheElement( 'iG0', _p.newInline(_p.css.g0 + _p.css.gF), 'head', 3); 
										
										console.log('- added inlineGrid0');
										state.elements.push(x);
										break;
										
									case 1:
										if (!(x = _p.getCachedElement('iG1')))
											x = _p.cacheElement( 'iG1', _p.newInline(_p.css.g1 + _p.css.gF), 'head', 3); 

										console.log('- added inlineGrid1');
										state.elements.push(x);
										break;
										
									case 4:
										if (!(x = _p.getCachedElement('iG4')))
											x = _p.cacheElement( 'iG4', _p.newInline(_p.css.g4 + _p.css.gF), 'head', 3); 

										console.log('- added inlineGrid4');
										state.elements.push(x);
										break;
										
									case 6:
										if (!(x = _p.getCachedElement('iG6')))
											x = _p.cacheElement( 'iG6', _p.newInline(_p.css.g6 + _p.css.gF), 'head', 3); 

										console.log('- added inlineGrid6');
										state.elements.push(x);
										break;

									case 2:
									default:
										if (!(x = _p.getCachedElement('iG2')))
											x = _p.cacheElement( 'iG2', _p.newInline(_p.css.g2 + _p.css.gF), 'head', 3); 

										console.log('- added inlineGrid2');
										state.elements.push(x);
										break;
								}
								
							// inlineGridContainer*
								w = parseInt(state.config.grid.containers);
								
								// Figure out units
									if (typeof state.config.grid.containers == 'string'
									&&	state.config.grid.containers != w)
									{
										if (state.config.grid.containers.charAt(state.config.grid.containers.length - 1) == '%')
										{
											u ='%';
											w = Math.min(100, w);
										}
										else if (state.config.grid.containers.substring(state.config.grid.containers.length - 2) == 'px')
										{
											u = 'px';
										}
										else if (state.config.grid.containers == 'fluid')
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

								if (!(x = _p.getCachedElement('iGC' + w + u)))
									x = _p.cacheElement('iGC' + w + u, _p.newInline('.grid-container{width:' + w + u + ' !important;margin: 0 auto;}'), 'head', 3);
								
								console.log('- added inlineGridContainer' + w + u);
								state.elements.push(x);						

							// inlineGridCollapse
								if (state.config.grid.collapse)
								{
									if (!(x = _p.getCachedElement('iGCo')))
										x = _p.cacheElement('iGCo', _p.newInline(_p.css.gR + _p.css.gCo), 'head', 3);
									
									console.log('- added inlineGridCollapse');
									state.elements.push(x);						
								}
								else
								{
									if (!(x = _p.getCachedElement('iGNoCo')))
										x = _p.cacheElement('iGNoCo', _p.newInline(_p.css.gR), 'head', 3); 
									
									console.log('- added inlineGridNoCollapse');
									state.elements.push(x);
								}

							// Breakpoint-specific stuff
								for (k in a)
								{
									// styleSheet*
										if (_p.breakpoints[a[k]].config.hasStyleSheet && _p.config.prefix)
										{
											if (!(x = _p.getCachedElement('ss' + a[k])))
												x = _p.cacheElement('ss' + a[k], _p.newStyleSheet(_p.config.prefix + '-' + a[k] + '.css'), 'head', 5);
											
											console.log('- added styleSheet' + a[k]);
											state.elements.push(x);
										}
										
									// Elements
										if (_p.breakpoints[a[k]].elements.length > 0)
										{
											for (x in _p.breakpoints[a[k]].elements)
											{
												console.log('- added breakpoint element ' + _p.breakpoints[a[k]].elements[x].id);
												state.elements.push(_p.breakpoints[a[k]].elements[x]);
											}
										}
								}
					}
					else
					{
						state = _p.cache.states[_p.stateId];
						console.log('- found cached');
					}

				// 2. Detach all elements
					console.log('- detaching all attached elements ...');
					_p.detachAllElements();

				// 3. Apply state
					console.log('- applying state elements ... ');
					_p.attachElements(state.elements);
					
				// 4. Handle cell modifiers
					_p.DOMReady(function() {
						
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
					_p.trigger('stateChange');
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

				if (_p.isLegacyIE)
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
				var o;

				o = document.createElement('div');
				o.innerHTML = s;
				
				return o;
			},

		/* Plugins */

			registerPlugin: function(id, o) {
				_p.plugins[id] = o;
				o.parent = this;
				
				_p.initPluginConfig(id, o);
				
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
							_p.extend(o.config, o.presets[s.preset]);
							_p.extend(o.config, s);
						}
						else
							_p.extend(o.config, s);
					}
			},

		/* Init */

			initConfig: function() {

				var c, b, s, f, fArgs = [], preloads = [];
				
				function buildTest(k, s)
				{
					var f;

					if (typeof s != 'string')
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
					else if (s.indexOf('-') != -1)
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
							if (s.preset && _p.presets[s.preset])
							{
								// Drop default breakpoints
									_p.config.breakpoints = {};

								// Extend by preset
									_p.extend(_p.config, _p.presets[s.preset]);
								
								// Extend by object
									_p.extend(_p.config, s);
							}
						// No? Probably a full user config
							else
							{
								// Does the object have breakpoints defined?
									if (s.breakpoints)
									{
										// Drop default breakpoints
											_p.config.breakpoints = {};
									}
									
								// Extend by object
									_p.extend(_p.config, s);
							}
					}

					// Extend base breakpoint config's grid by config's grid
						_p.extend(_p.defaults.config_breakpoint.grid, _p.config.grid);
				
				// Process breakpoints config
					for (k in _p.config.breakpoints)
					{
						// Convert shortcut breakpoints to full breakpoints
							if (typeof _p.config.breakpoints[k] != 'object')
								_p.config.breakpoints[k] = { range: _p.config.breakpoints[k] };

						// Extend with defaults
							c = {};
							_p.extend(c, _p.defaults.config_breakpoint);
							_p.extend(c, _p.config.breakpoints[k]);
							_p.config.breakpoints[k] = c;
						
						// Build breakpoint
							b = {};
							_p.extend(b, _p.defaults.breakpoint);
								b.config = _p.config.breakpoints[k];
								b.test = buildTest(k, b.config.range);
								b.elements = [];
							
							_p.breakpoints[k] = b;

						// Preload stylesheet
							if (_p.config.preloadStyleSheets
							&&	b.config.hasStyleSheet)
								preloads.push(_p.newStyleSheet(_p.config.prefix + '-' + k + '.css'));
					}
					
				// Process events config
					for (k in _p.config.events)
						_p.bind(k, _p.config.events[k]);
					
				// Handle stylesheet preloads (if any)
					if (preloads.length > 0)
					{
						_p.DOMReady(function() {
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
				
				if (!_p.config.pollOnce)
				{
					// Resize
						window.onresize = function() {
							_p.poll();
						};
					
					// Orientation
						if (_p.config.useOrientation)
						{
							window.onorientationchange = function() {
								_p.poll();
							};
						}
				}
			},
			
			init: function() {

				_p.isLegacyIE = (navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 <= 8 ? true : false);

				// Initialize DOMReady method (adapted from jQuery, courtesy: jQuery project, Diego Perini, Lucent M., Addy Osmani)
					(function(){'use strict';var c=window,h=function(j){d=false;h.isReady=false;if(typeof j==='function'){i.push(j)}b()},f=c.document,d=false,i=[],e=function(){if(f.addEventListener){f.removeEventListener('DOMContentLoaded',e,false)}else{f.detachEvent('onreadystatechange',e)}g()},g=function(){if(!h.isReady){if(!f.body){return setTimeout(g,1)}h.isReady=true;for(var j in i){(i[j])()}i=[];}},b=function(){var j=false;if(d){return}d=true;if(f.readyState!=='loading'){g()}if(f.addEventListener){f.addEventListener('DOMContentLoaded',e,false);c.addEventListener('load',e,false)}else{if(f.attachEvent){f.attachEvent('onreadystatechange',e);c.attachEvent('onload',e);try{j=c.frameElement==null}catch(k){}if(f.documentElement.doScroll&&j){a()}}}},a=function(){if(h.isReady){return}try{f.documentElement.doScroll('left')}catch(j){setTimeout(a,1);return}g()};h.isReady=false;_p.DOMReady=h})();
				
				// Initialize config
					_p.initConfig();

				// Register locations
					_p.registerLocation('head', document.getElementsByTagName('head')[0]);
					
					_p.DOMReady(function() {
						_p.registerLocation('body', document.getElementsByTagName('body')[0]);
					});

				// Init events
					_p.initEvents();

				// Do initial poll
					_p.poll();

			}
	}
	
	// Initialize
		_p.init();

	// Expose _p
		skel = _p;

})();