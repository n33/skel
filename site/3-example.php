<section id="example" class="main container">
	<h2>An Example</h2>
	<p>Using skel.js to build a simple responsive page.</p>
	<ol class="default">
		<li>
			<h3>The HTML</h3>
<pre>
&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;title&gt;skel.js Example&lt;/title&gt;
		// @@@ (skel.js Loader) Loads, configures, and initializes skel.js in one shot.
		&lt;script src="skel.min.js"&gt;
		// Starts an inline configuration (one of two ways to configure skel.js).
		{
			// Determines our stylesheet names. Used in conjunction with the breakpoint names below. In this case, we're telling skel.js to look for: "style.css", "style-wide.css", "style-narrow.css", and "style-mobile.css".
			prefix: "style",
			// Resets our browser CSS so we have a nice clean slate.
			resetCSS: true,
			// Sets the global box model to "border-box".
			boxModel: "border",
			// Sets global grid options. In this case we're just going to set the gutter size to 2%.
			grid: { gutters: 2 },
			// Sets up our breakpoints, which determine the stylesheets and options to apply when the viewport width is within a specified range. Any number of breakpoints can be created and their ranges can even overlap (allowing more than one to be active).
			breakpoints: {
				// A breakpoint. In this case it's called "wide", applies when the viewport width is at least 1200px, uses 1140px containers, and 4% gutters on grids.
				wide: { range: "1200-", containers: 1140, grid: { gutters: 4 } },
				// Another breakpoint. Kicks in between 481px and 1199px and uses 960px containers. Note that since we didn't drop any grid options here it'll just use the defaults (above).
				narrow: { range: "481-1199", containers: 960 },
				// Our final breakpoint (which we'll use to target mobile devices). Only applies at or below 480px, uses fluid width containers, locks the viewport (required for mobile devices), and collapses its grids (which forces each cell to take up a whole row).
				mobile: { range: "-480", containers: "fluid", lockViewport: true, grid: { collapse: true } }
			}
		}
		&lt;/script&gt;
		// @@@
	&lt;/head&gt;
	&lt;body&gt;
		// @@@ (The Page) The actual page, and a pretty good example of using containers and the grid system to put together a basic page layout.
		// A container element. Width is determined by the active breakpoint.
		&lt;div class="container"&gt;
			&lt;!-- Header --&gt;
				// A grid row. Holds up to 12 "units" (12u) of grid cells in any combination.
				&lt;div id="header" class="row"&gt;
					// A grid cell. Can be anywhere between 1u and 12u wide. In this case, it's 4u wide.
					&lt;div class="4u"&gt;
						&lt;h1&gt;Example&lt;/h1&gt;
					&lt;/div&gt;
					// Another cell. This time it's 8u, so combined with the previous 4u cell the row's now full (4u + 8u = 12u).
					&lt;nav id="nav" class="8u"&gt;
						&lt;a href="#"&gt;Home&lt;/a&gt;
						&lt;a href="#"&gt;About Me&lt;/a&gt;
						&lt;a href="#"&gt;Blog&lt;/a&gt;
						&lt;a href="#"&gt;Contact&lt;/a&gt;
					&lt;/nav&gt;
				&lt;/div&gt;
			&lt;!-- Hero --&gt;
				// Rows and non-rows (like this one) can be sibling elements. The grid system doesn't care.
				&lt;section id="hero"&gt;
					&lt;h2&gt;Hello world.&lt;/h2&gt;
					&lt;p&gt;Lorem ipsum dolor sit amet sed magna etiam adipiscing.&lt;/p&gt;
					&lt;a href="#" class="button"&gt;Get Started&lt;/a&gt;
				&lt;/section&gt;
			&lt;!-- Features --&gt;
				// Just another row.
				&lt;div class="row"&gt;
					// A 4u cell.
					&lt;section class="4u"&gt;
						&lt;h2&gt;Heading&lt;/h2&gt;
						&lt;p&gt;Lorem ipsum dolor sit amet sed magna etiam adipiscing elit.
						adipiscing elit nec fringilla urna tempor in. Cras et sodales
						consectetur viverra lorem ipsum.&lt;/p&gt;
					&lt;/section&gt;
					// Another 4u cell.
					&lt;section class="4u"&gt;
						&lt;h2&gt;Heading&lt;/h2&gt;
						&lt;p&gt;Lorem ipsum dolor sit amet sed magna etiam adipiscing elit.
						adipiscing elit nec fringilla urna tempor in. Cras et sodales
						consectetur viverra lorem ipsum.&lt;/p&gt;
					&lt;/section&gt;
					// And another 4u grid cell, rounding out this row (4u + 4u + 4u = 12u).
					&lt;section class="4u"&gt;
						&lt;h2&gt;Heading&lt;/h2&gt;
						&lt;p&gt;Lorem ipsum dolor sit amet sed magna etiam adipiscing elit.
						adipiscing elit nec fringilla urna tempor in. Cras et sodales
						consectetur viverra lorem ipsum.&lt;/p&gt;
					&lt;/section&gt;
				&lt;/div&gt;
			&lt;!-- Main --&gt;
				// Another row.
				&lt;div class="row"&gt;
					&lt;!-- Content --&gt;
						// An 8u cell.
						&lt;section class="8u"&gt;
							&lt;h2&gt;Heading&lt;/h2&gt;
							&lt;p&gt;Lorem ipsum dolor sit amet sed magna etiam adipiscing elit.
							adipiscing elit nec fringilla urna tempor in. Cras et sodales
							consectetur viverra lorem ipsum. Lorem ipsum dolor sit amet
							sed magna etiam adipiscing elit adipiscing elit nec fringilla
							urna tempor in. Cras et sodales consectetur viverra.&lt;/p&gt;
						&lt;/section&gt;
					&lt;!-- Sidebar --&gt;
						// And a 4u cell, which ends this row (8u + 4u = 12u).
						&lt;section class="4u"&gt;
							&lt;h2&gt;Heading&lt;/h2&gt;
							&lt;p&gt;Lorem ipsum dolor sit amet sed magna etiam adipiscing elit.
							adipiscing elit nec fringilla urna tempor in. Cras et sodales
							consectetur viverra lorem ipsum.&lt;/p&gt;
						&lt;/section&gt;
				&lt;/div&gt;
			&lt;!-- Footer --&gt;
				&lt;div id="footer"&gt;
					&copy; Example. All rights reserved.
				&lt;/div&gt;
		&lt;/div&gt;
		// @@@
	&lt;/body&gt;
&lt;/html&gt;
</pre>
		</li>
		<li>
			<h3>The Stylesheets</h3>
			<ul id="example-stylesheets">
				<li>
					<h4>style.css</h4>
					<section class="hicode-wrapper">
						<header>
							Global styles. Gets loaded regardless of the active breakpoint.
						</header>
<pre>
body {
	background: #272B2D;
	color: #b2b9bC;
	font-family: sans-serif;
	line-height: 2em;
}

h1, h2, h3, h4, h5, h6 {
	color: #fff;
	font-weight: bold;
}

.button {
	background: #49825c;
	border-radius: 0.25em;
	color: #fff;
	display: inline-block;
	text-decoration: none;
}

#nav a {
	color: #fff;
	font-style: italic;
	text-decoration: none;
}

#hero {
	background: #32393C;
	text-align: center;
}

#footer {
	color: #62696C;
	text-align: center;
}
</pre>
					</section>
				</li>
				<li>
					<h4>style-wide.css</h4>
					<section class="hicode-wrapper">
						<header>
							Only applies when the <strong>wide</strong> breakpoint is active (1200px and up).
						</header>
<pre>
body {
	font-size: 15pt;
	letter-spacing: 0.035em;
	line-height: 1.75em;
}

h1 {
	font-size: 1.5em;
}

h2 {
	font-size: 1.25em;
	margin-bottom: 0.75em;
}

.button {
	font-size: 1.25em;
	padding: 0.75em 2em 0.75em 2em;
}

#header {
	margin-top: 3em;
}

#nav {
	text-align: right;
}

#nav a {
	margin-left: 2em;
}

#hero {
	border-radius: 0.5em;
	margin: 1em 0 1em 0;
	padding: 4em 0 4em 0;
}

#hero h2 {
	font-size: 2.5em;
	margin-bottom: 1em;
}

#hero p {
	font-size: 1.25em;
	margin-bottom: 1.75em;
}

#footer {
	margin: 3em 0 3em 0;
}
</pre>
					</section>
				</li>
				<li>
					<h4>style-narrow.css</h4>
					<section class="hicode-wrapper">
						<header>
							Only applies when the <strong>narrow</strong> breakpoint is active (481px - 1199px).
						</header>
<pre>
body {
	font-size: 14pt;
	letter-spacing: 0.035em;
	line-height: 1.5em;
}

h1 {
	font-size: 1.25em;
}

h2 {
	font-size: 1.1em;
	margin-bottom: 0.5em;
}

.container {
	padding: 0 2em 0 2em;
}

.button {
	font-size: 1.25em;
	padding: 0.75em 2em 0.75em 2em;
}

#header {
	margin-top: 3em;
}

#nav {
	text-align: right;
}

#nav a {
	margin-left: 2em;
}

#hero {
	border-radius: 0.5em;
	margin: 2em 0 2em 0;
	padding: 3em 0 3em 0;
}

#hero h2 {
	font-size: 2.5em;
	margin-bottom: 0.75em;
}

#hero p {
	font-size: 1.25em;
	margin-bottom: 1.5em;
}

#footer {
	margin: 3em 0 3em 0;
}
</pre>
					</section>
				</li>
				<li>
					<h4>style-mobile.css</h4>
					<section class="hicode-wrapper">
						<header>
							Only applies when the <strong>mobile</strong> breakpoint is active (480px and below).
						</header>
<pre>
body {
	font-size: 12.5pt;
	line-height: 1.5em;
}

h1 {
	font-size: 1.5em;
	margin-bottom: 1em;
}

h2 {
	font-size: 1.25em;
	margin-bottom: 0.5em;
}

section {
	padding-bottom: 2em;
}

.container {
	padding: 0 1em 0 1em;
}

.button {
	font-size: 1.25em;
	padding: 0.75em 2em 0.75em 2em;
}

#header {
	margin-top: 2.5em;
	text-align: center;
}

#nav a {
	margin: 0 0.5em 0 0.5em;
}

#hero {
	border-radius: 0.5em;
	line-height: 2em;
	margin: 2em 0 2em 0;
	padding: 3em 2em 3em 2em;
}

#hero h2 {
	font-size: 2em;
	margin-bottom: 0.75em;
}

#hero p {
	font-size: 1.25em;
	margin-bottom: 1.5em;
}

#footer {
	margin-bottom: 2em;
}
</pre>
					</section>
				</li>
			</ul>
		</li>
		<li>
			<h3>The Output</h3>
			<div id="example-output">
				<ul class="titles">
					<li class="wide active">wide</li>
					<li class="narrow">narrow</li>
					<li class="mobile">mobile</li>
				</ul>
				<div class="output wide">
					<iframe src="example/index.html" scrolling="no"></iframe>
				</div>
				<div class="actions"><a href="example/index.html" target="_blank" class="button icon icon-external-link">Open in New Window</a></div>
				<p>And that's all there is to it. For a more in depth look, <a href="#">download</a> the example<br class="not-narrow" />
				or continue on to the <a href="#">Config Reference</a> and the <a href="#">Class Reference</a>.</p>
			</div>
		</li>
	</ol>
</section>