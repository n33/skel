<section id="setup" class="main container">
	<h2>Setting Up</h2>
	<section class="sub">
		<h3>Configuring skel.js</h3>
		<p>skel.js uses a JSON-like configuration format that can be applied in one of two ways:</p>
		<div class="row">
			<div class="6u">
				<header>
					<h4>A. Inline</h4>
				</header>
<pre>
&lt;script src="skel.js"&gt;
{
	option: value,
	option: value,
	option: value,
	option: {
		option: value,
		option: value,
		option: value,
		...
	}
	...
}
&lt;/script&gt;
</pre>
			</div>
			<div class="6u">
				<h4>B. Preconfigured</h4>
<pre>
&lt;script&gt;
	window._skel_config = {
		option: value,
		option: value,
		option: value,
		option: {
			option: value,
			option: value,
			...
		}
		...
	};
&lt;/script&gt;
&lt;script src="skel.js"&gt;&lt;/script&gt;
</pre>
			</div>
		</div>
		<p><strong>Inline</strong> is good for testing and smaller projects, whereas <strong>Preconfigured</strong> is better 
		for larger projects as it allows the configuration to live in a separate JS file. For
		demonstration purposes we'll just stick to the <strong>Inline</strong> approach, but know that either
		approach is fine.</p>
		<p>Once you've settled on a method, the next step is figuring out how you want to set up your configuration:</p>
		<section>
			<h4>Option 1: Use defaults</h4>
			<p>Simply load up skel.js and don't include a configuration, like so:</p>
			<pre>&lt;script src="skel.js"&gt;&lt;/script&gt;</pre>
			<p>Which will result in the following defaults:</p>
			<ul class="default">
				<li>No stylesheets</li>
				<li>No breakpoints</li>
				<li>2% <a href="#grid">gutters</a> on all grids</li>
				<li>960px <a href="#grid">container grids</a></li>
			</ul>
			<p>Not a bad choice if you just want to play with the <a href="#grid">grid system</a>.</p>
		</section>
		<section>
			<h4>Option 2: Use a preset</h4>
			<p>Presets are, as the name implies, premade configurations. You can use one like this:</p>
			<pre>&lt;script src="skel.js"&gt;{preset:<em>name_of_preset</em>}&lt;/script&gt;</pre>
			<p>Where <em>name_of_preset</em> is any of the following:</p>
			<dl class="default">
				<dt>standard</dt>
				<dd>
					<ul class="default">
						<li>Stylesheet <a href="#configuation-options-prefix">prefix</a> set to <em>"style"</em></li>
						<li><a href="#config-breakpoints">Breakpoints</a> set as <strong>mobile</strong> (-480), <strong>1000px</strong> (481-1000), and <strong>desktop</strong> (481-)</li>
						<li>2% gutters on all grids</li>
						<li>1200px container grids on <strong>desktop</strong>, 960px container grids on <strong>1000px</strong>, and fluid container grids on <strong>mobile</strong> (with <a href="#configuation-grid-collapse">collapse</a> enabled)</li>
					</ul>
				</dd>
			</dl>
			<p>(more to come later)</p>
		</section>
		<section>
			<h4>Option 3: Use your own (recommended)</h4>
			<p>Setting up breakpoints based on your content rather than arbitrary device widths is
			generally the best way to go, and rolling your own custom configuration allows you to do just that.
			For example, here's a configuration with 5 custom breakpoints:</p>
<pre>&lt;script src="skel.js"&gt;
{
	// Stylesheet prefix.
	prefix: "style",
	// Reset browser CSS.
	resetCSS: true,
	// Set global grid gutters to 1%.
	grid: { gutters: 1 },
	breakpoints: {
		// Applies at 1300px and up, uses 1280px containers, and 2% grid gutters.
		wide: { range: "1300-", containers: 1280, grid: { gutters: 2 } },
		// Applies at and below 1299px, uses fluid containers, and 2% gutters on grids.
		narrow: { range: "-1299", containers: "fluid", grid: { gutters: 2 } },
		// Applies at and below 960px.
		narrow960: { range: "-960" },
		// Applies at and below 740px.
		narrow740: { range: "-740" },
		// Applies at and below 460px, collapses grids.
		narrow460: { range: "-460", grid: { collapse: true } }
	}
}
&lt;/script&gt;</pre>
		</section>
		<p>And that's all there is to it. skel.js is now ready to go. Head on down to the Options, Breakpoint Options, and Grid Options references
		below to flesh out your configuration.</p>
	</section>
	<section class="sub">
		<h3>Options Reference</h3>
		<dl class="default">
			<dt id="configuation-options-prefix">prefix</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>String</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>null</em> (Disables stylesheet management)</td>
					</tr>
				</table>
				<p>Sets the stylesheet prefix. If set, skel.js will use this to figure out the names of your global and
				breakpoint-specific stylesheets. For example, setting it to <em>"style"</em> with the following breakpoints configured:</p>
				<ul class="default">
					<li><strong>wide</strong></li>
					<li><strong>narrow</strong></li>
					<li><strong>narrow960</strong></li>
					<li><strong>narrow720</strong></li>
					<li><strong>narrow480</strong></li>
				</ul>
				<p>Will result in skel.js looking for these stylesheets:</p>
				<ul class="default">
					<li><em>style.css</em> &ndash; global stylesheet (always applies)</li>
					<li><em>style-wide.css</em> &ndash; applies when <strong>wide</strong> is active</li>
					<li><em>style-narrow.css</em> &ndash; applies when <strong>narrow</strong> is active</li>
					<li><em>style-narrow960.css</em> &ndash; applies when <strong>narrow960</strong> is active</li>
					<li><em>style-narrow720.css</em> &ndash; applies when <strong>narrow720</strong> is active</li>
					<li><em>style-narrow480.css</em> &ndash; applies when <strong>narrow480</strong> is active</li>
				</ul>
				<p>A prefix can also include a path name. For example, setting it to <em>"/assets/css/style"</em> with the same breakpoints as above results in:</p>
				<ul class="default">
					<li><em>/assets/css/style.css</em> &ndash; global stylesheet (always applies)</li>
					<li><em>/assets/css/style-wide.css</em> &ndash; applies when <strong>wide</strong> is active</li>
					<li><em>/assets/css/style-narrow.css</em> &ndash; applies when <strong>narrow</strong> is active</li>
					<li><em>/assets/css/style-narrow960.css</em> &ndash; applies when <strong>narrow960</strong> is active</li>
					<li><em>/assets/css/style-narrow720.css</em> &ndash; applies when <strong>narrow720</strong> is active</li>
					<li><em>/assets/css/style-narrow480.css</em> &ndash; applies when <strong>narrow480</strong> is active</li>
				</ul>
				<p>Setting prefix to <em>null</em> (the default) disables stylesheet management entirely.</p>
			</dd>
			<dt>useResets</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>Boolean</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>false</em></td>
					</tr>
				</table>
				<p>If true, a block of handy <a href="http://meyerweb.com/eric/tools/css/reset/">CSS resets</a> will be applied before any other styles.</p>
			</dd>
			<dt>grid</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td><a href="#config-grid">Grid Options</a></td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>{ containers: 960, gutters: 2, collapse: false }</em></td>
					</tr>
				</table>
				<p>Sets global grid options.</p>
			</dd>
			<dt id="config-breakpoints">breakpoints</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td><a href="#config-breakpoint">Breakpoint Options</a></td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>{ "all": { range: "*", hasStyleSheet: false } }</em></td>
					</tr>
				</table>
				<p>The breakpoints list. Consists of an object in the following format:</p>
<pre>{
  "breakpointName": { <em>(<a href="#config-breakpoint">breakpoint options</a>)</em> },
  "breakpointName": { <em>(<a href="#config-breakpoint">breakpoint options</a>)</em> },
  "breakpointName": { <em>(<a href="#config-breakpoint">breakpoint options</a>)</em> },
  ...
}</pre>
							<p>You can also use the following shorthand format if you only need to specify a range for each breakpoint:</p>
<pre>{
  "breakpointName": "<em>(<a href="#config-breakpoint-range">range</a>)</em>",
  "breakpointName": "<em>(<a href="#config-breakpoint-range">range</a>)</em>",
  "breakpointName": "<em>(<a href="#config-breakpoint-range">range</a>)</em>",
  ...
}</pre>
				<p><strong>Note:</strong> breakpoint ranges can actually overlap (allowing for more than one to be active).
				When this happens, the options of each are combined (with the order in which they were defined (by you) dictating precedence).</p>
			</dd>
		</dl>
	</section>
	<section id="config-breakpoint" class="sub">
		<h3>Breakpoint Options Reference</h3>
		<dl class="default">
			<dt id="config-breakpoint-range">range</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>String</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>null</em> (all widths)</td>
					</tr>
				</table>
				<p>Sets the breakpoint's width range (in pixels). Can be any of the following:</p>
				<dl class="default">
					<dt>"*"</dt>
					<dd>Matches any viewport width.</dd>
					<dt>"X"</dt>
					<dd>Viewport width must be exactly X.</dd>
					<dt>"X-Y"</dt>
					<dd>Viewport width must be between X and Y (inclusive).</dd>
					<dt>"-X"</dt>
					<dd>Viewport width must be less than or equal to X.</dd>
					<dt>"X-"</dt>
					<dd>Viewport width must be greater than or equal to X.</dd>
				</dl>
			</dd>
			<dt>lockViewport</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>Boolean</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>false</em></td>
					</tr>
				</table>
				<p>If true, skel.js will attempt to disable viewport zooming and resizing (where applicable). Should only be enabled on breakpoints targeting mobile devices.</p>
			</dd>
			<dt>hasStyleSheet</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>Boolean</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>true</em></td>
					</tr>
				</table>
				<p>Determines if there's a stylesheet for this particular breakpoint. By default this is <em>true</em>, but there
				are times when setting this to <em>false</em> makes sense (for example, when a breakpoint exists only to alter a handful of options).</p>
			</dd>
			<dt>grid</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td><a href="#config-grid">Grid Options</a></td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>null</em></td>
					</tr>
				</table>
				<p>Sets grid options that apply when this breakpoint is active (overriding the global grid options).</p>
			</dd>
		</dl>
	</section>
	<section id="config-grid" class="sub">
		<h3>Grid Options Reference</h3>
		<dl class="default">
			<dt id="configuation-grid-containers">containers</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>Integer</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>960</em></td>
					</tr>
				</table>
				<p>Sets the container grid width. Can be a pixel value (eg. <em>960</em> or <em>"960px"</em>), a percentage value (eg. <em>"95%"</em>), or <em>"fluid"</em> (equivalent to <em>"100%"</em>).</p>
			</dd>
			<dt>gutters</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>Integer</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>2</em></td>
					</tr>
				</table>
				<p>Sets the gutter size. Can be <em>0</em> (for no gutters), <em>1</em>, <em>2</em>, <em>4</em>, or <em>6</em>. Anything else will tear reality asunder.</p>
			</dd>
			<dt id="configuation-grid-collapse">collapse</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>Boolean</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>false</em></td>
					</tr>
				</table>
				<p>If true, all cells are forced to occupy an entire row (except for those belonging to grids with the <a href="#grid-modifiers-persistent">persistent</a> modifier). Should only be enabled on breakpoints targeting mobile devices.</p>
			</dd>
		</dl>
	</section>
</section>