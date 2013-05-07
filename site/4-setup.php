<section id="setup" class="main container">
	<header>
		<h2>Setting Up</h2>
	</header>
	<section class="sub">
		<h3>1. Pick a Configuration Style</h3>
		<p>skel.js uses a JSON-like configuration that can be applied in one of two ways:</p>
		<div class="row">
			<div class="6u">
				<header>
					<h4>Inline</h4>
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
				<h4>Preconfigured</h4>
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
		<p><strong>Inline</strong> is good for testing and smaller projects, while <strong>Preconfigured</strong> is better 
		for larger projects as it allows the configuration to live in a separate JS file. For
		demonstration purposes we'll just stick to <strong>Inline</strong>, but know that either
		style is fine.</p>
	</section>
	<section class="sub">
		<h3>2. Get Configured</h3>
		<p>The next step is to build your configuration. Three ways to go about this:</p>
		<section>
			<h4>Option 1: Use defaults</h4>
			<p>Simply loading up skel.js without a configuration like so:</p>
			<pre>&lt;script src="skel.js"&gt;&lt;/script&gt;</pre>
			<p>Will result in the following defaults:</p>
			<ul class="default">
				<li>No stylesheets</li>
				<li>No breakpoints</li>
				<li>2% <a href="#usage-grid-overview">gutters</a> on all grids</li>
				<li>960px <a href="#usage-containers">containers</a></li>
			</ul>
			<p>Not a bad choice if you just want to play with the <a href="#usage-grid">grid system</a>.</p>
		</section>
		<section>
			<h4>Option 2: Use a preset</h4>
			<p>Presets are, as the name implies, preset configurations. You can use one like this:</p>
			<pre>&lt;script src="skel.js"&gt;{preset:<em>name_of_preset</em>}&lt;/script&gt;</pre>
			<p>Where <em>name_of_preset</em> is any of the following:</p>
			<dl class="default">
				<dt>standard</dt>
				<dd>
					<ul class="default">
						<li>Stylesheet <a href="#config-options-prefix">prefix</a> set to <em>"style"</em></li>
						<li><a href="#config-options-breakpoints">Breakpoints</a> set to <strong>mobile</strong> (480px and below), <strong>1000px</strong> (481px to 1000px), and <strong>desktop</strong> (481px and up)</li>
						<li>2% gutters on all grids</li>
						<li>1200px containers on <strong>desktop</strong>, 960px containers on <strong>1000px</strong>, and fluid containers on <strong>mobile</strong> (with <a href="#config-grid-collapse">collapse</a> enabled)</li>
					</ul>
				</dd>
			</dl>
			<p>(more to come later)</p>
		</section>
		<section>
			<h4>Option 3: Use your own (recommended)</h4>
			<p>While slightly more involved, this approach gives you far more control over how skel.js does its thing.
			For example, here's a configuration with 5 entirely custom breakpoints and a few additional options:</p>
<pre>&lt;script src="skel.js"&gt;
{
	// Stylesheet prefix.
	prefix: "style",
	// Resets default browser styles.
	resetCSS: true,
	// Sets the global box model to "border-box".
	boxModel: "border",
	// Sets global grid gutters to 1%.
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
		// Applies at and below 460px and collapses grids.
		narrow460: { range: "-460", grid: { collapse: true } }
	}
}
&lt;/script&gt;</pre>
			<p>If you go this route, be sure to read up on the many <a href="#config">configuration options</a> you have at your disposal.</p>
		</section>
		<section class="sub">
			<h3>3. Profit?</h3>
			<p>And with that, skel.js is fully configured and ready to go. Head on down to <a href="#usage">Usage</a> or hit the 
			<a href="#config">Configuration Reference</a> if you want to further flesh out your configuration.</p>
		</section>
	</section>
</section>