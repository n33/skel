<section id="usage" class="main container">
	<header>
		<h2>Usage</h2>
	</header>
	<section class="sub">
		<h3>CSS Shortcuts</h3>
		<p>For convenience, skel.js includes a few shortcuts to tackle some of the most common CSS tasks:</p>
		<dl class="default">
			<dt>Set Global Box Model</dt>
			<dd>
				<p>Tells the browser what <a href="#">box model</a> to use for all elements. Handy
				if you're accustomed to working with a particular box model (like <a href="http://paulirish.com/2012/box-sizing-border-box-ftw/">border-box</a>).
				Note that this is handled in a cross browser-friendly way so it'll work anywhere the <code>box-sizing</code> property is supported.</p>
				<em>Usage: see the <a href="#">boxModel</a> option.</em>
			</dd>
			<dt>Reset CSS</dt>
			<dd>
				<p>Browsers will always give basic elements (<code>&lt;h1&gt;-&lt;h6&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;p&gt;</code>, etc.)
				default styling right off the bat. Unfortunately, this styling can vary from browser to browser so you end up with a relatively unpredictable
				foundation on which to build. This shortcut (courtesy of <a href="#">Erik Meyer</a>) eliminates <strong>all</strong> default styling,
				giving you a neutral starting point across all browsers.</p>
				<em>Usage: enable the <a href="#">resetCSS</a> option.</em>
			</dd>
			<dt>Normalize CSS</dt>
			<dd>
				<p>While <strong>Reset CSS</strong> works great, eliminating all default styling means you now have to restyle <strong>everything</strong>
				from scratch. If that sounds less than ideal, another approach is to simply normalize styling (courtesy of <a href="#">normalize.css</a>),
				which eliminates styling inconsistencies without eliminating the styling itself. The result is a consistent (but still minimally styled)
				starting point across all browsers.</p>
				<em>Usage: enable the <a href="#">normalizeCSS</a> option.</em>
			</dd>
		</dl>		
	</section>
	<section class="sub">
		<h3>Breakpoint Handler</h3>

		<p>The breakpoint handler is one of skel.js's major components, and rightly so: it's what makes
		the thing responsive. Replacing CSS3 media queries, the breakpoint handler takes over responsive 
		duties and brings with it some cool perks of its own:</p>

		<ul class="default">
			<li>Setup is streamlined and centralized with the rest of your configuration.</li>
			<li>Stylesheets are only downloaded when they're needed (unless you <a href="#">tell it otherwise</a>)</li>
			<li>Breakpoints have a lot more influence (for example, they can set <a href="#">container</a> widths and override global options).</li>
			<li>Plugins can tie stuff to specific breakpoints (particularly handy in the case of the <a href="/ui">UI</a> plugin).</li>
		</ul>

		<p>The breakpoint handler revolves around two important concepts: <strong>breakpoints</strong> and <strong>containers</strong>.</p>

		<section>
			<h4>Breakpoints</h4>
			<p>A <strong>breakpoint</strong> determines the stylesheet and (if specified) additional options to
			apply when the viewport width falls within a certain range. A single breakpoint's configuration
			is typically set up like this:</p>
			<pre>
...
// Breakpoint's name. Used in conjunction with the "prefix" configuration option to determine the stylesheet's filename.
name: {
	// Range at which the breakpoint applies.
	range: "(min)-(max)",
	// Width of containers (more on that below).
	containers: (value),
	// Optional grid overrides.
	grid: { ... },
	// Additional options.
	...
},
...
			</pre>
			<p>And a full breakpoint configuration is set up like this:</p>
			<pre>
breakpoints: {
	// First breakpoint.
	name: { range: "(min)-(max)", containers: (value), grid: { ... }, ... },
	// Second breakpoint.
	name: { range: "(min)-(max)", containers: (value), grid: { ... }, ... },
	// Third breakpoint.
	name: { range: "(min)-(max)", containers: (value), grid: { ... }, ... },
	// ... and so on.
	...
}
</pre>			
			<p>The breakpoint handler supports any number of breakpoints as well as overlapping ranges. For more
			on configuring breakpoints, check out the <a href="#">breakpoint options reference</a>.</p>
		</section>

		<section>
			<h4>Containers</h4>
			<p>A <strong>container</strong> is a special wrapper element with a width that's
			determined by whatever breakpoint happens to be active. 
			By assigning a container width to each breakpoint and wrapping the page in a
			container element, like so:</p>
			
			<pre>
&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;script src="skel.min.js"&gt;
		{
			prefix: "style",
			breakpoints: {
				// 1140px containers.
				wide: { range: "1200-", containers: 1140, grid: { gutters: 4 } },
				// 960px containers.
				narrow: { range: "481-1199", containers: 960 },
				// Fluid containers.
				mobile: { range: "-480", containers: "fluid", lockViewport: true, grid: { collapse: true } }
			}
		}
		&lt;/script&gt;
	&lt;/head&gt;
	&lt;body&gt;
		// The container element. Can be any block-level element.
		&lt;div class="container"&gt;
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus, 
				nisi sit amet feugiat elementum, est justo sapien, et pellentesque 
				sem dui eu nunc. Lorem ipsum dolor sit amet, consectetur adipiscing 
				elit. Sed tempus, nisi sit amet feugiat elementum, est justo sapien, 
				et pellentesque sem dui eu nunc. 
		&lt;/div&gt;
	&lt;/body&gt;
&lt;/html&gt;
			</pre>
			<p>The page will automatically adjust to the active breakpoint's container width.
			In this case, when <strong>narrow</strong> is active, the page will become
			960px wide, whereas when <strong>wide</strong> is active it'll become 1140px wide.</p>
		</section>
		<p>For more on setting up the breakpoint handler, check out the <a href="#">configuration reference</a>.</p>
	</section>
	<section class="sub">
		<h3>CSS Grid System</h3>
		<p>The other major component of skel.js is its CSS grid system. In case you've never used one before, it's
		essentially an elegant way to build page layouts (even complex ones) without developing an unbridled hatred for CSS.</p>
		<section>
			<h4>Overview</h4>
			<p>The skel.js grid system is based around 12 vertical columns of equal width, with <strong>gutters</strong>
			(also of equal width) separating each one. The width of a column is, in skel.js terminology, a <strong>unit</strong>.
			The system uses two types of elements:</p>
			<dl class="default">
				<dt>Cell</dt>
				<dd>
					<ul class="default">
						<li>Basic building block of the grid system.</li>
						<li>Used to contain your content.</li>
						<li>Can be between 1 unit wide (1u) and 12 units wide (12u).</li>
					</ul>
				</dd>
				<dt>Row</dt>
				<dd>
					<ul class="default">
						<li>All you need to start a grid (no parent "grid" element is required).</li>
						<li>Fits up to 12u worth of cells in any combination (4u+8u, 3u+3u+3u, 1u+12u, and so on).</li>
						<li>Fluid width (so it'll fit anywhere you need it).</li>
						<li>Can be wrapped by other elements (including <a href="#">containers</a>).</li>
						<li>Can be placed <em>inside</em> cells to form complex nested grids.</li>
					</ul>
				</dd>
			</dl>
			<p>And here's how one actually looks:</p>
			<div class="row">
				<div class="5u">
<pre>
&lt;div class="row"&gt;
  &lt;div class="12u"&gt;12u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
  &lt;div class="8u"&gt;8u&lt;/div&gt;
  &lt;div class="4u"&gt;4u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
  &lt;div class="2u"&gt;2u&lt;/div&gt;
  &lt;div class="4u"&gt;4u&lt;/div&gt;
  &lt;div class="4u"&gt;4u&lt;/div&gt;
  &lt;div class="2u"&gt;2u&lt;/div&gt;
&lt;/div&gt;
</pre>
				</div>
				<div class="7u">
					<div class="demo-grid">
						<div class="row">
							<div class="12u">12u</div>
						</div>
						<div class="row">
							<div class="8u">8u</div>
							<div class="4u">4u</div>
						</div>
						<div class="row">
							<div class="2u">2u</div>
							<div class="4u">4u</div>
							<div class="4u">4u</div>
							<div class="2u">2u</div>
						</div>
					</div>
				</div>
			</div>
			<p>More examples <a href="#">below</a>.</p>
		</section>
		<section>
			<h4>Configuration</h4>
			<p>Certain aspects of the grid system's behavior (such as gutter size) can be configured on a <a href="#">global level</a> as well as <a href="#">per-breakpoint</a>.
			Check out the <a href="#">configuration reference</a> for more details.</p>
		</section>
		<section>
			<h4>Modifiers</h4>
			<p>These are classes that alter the behavior of a particular row or a group of rows (when applied to their immediate parent element).</p>
			<dl class="default">
				<dt>flush</dt>
				<dd>
					Removes the gutters between each cell (equivalent to setting gutters to <em>0</em> in your configuration, only more localized).
				</dd>
				<dt id="grid-modifiers-persistent">persistent</dt>
				<dd>
					Retains structure even if <a href="#">collapse</a> has been enabled.
				</dd>
			</dl>
		</section>
		<section id="usage-grids-examples">
			<h4>Examples</h3>
			<dl class="default">
				<dt>1 Row (8u + 4u)</dt>
				<dd class="row">
					<div class="5u">
<pre>
&lt;div class="row"&gt;
	&lt;div class="8u"&gt;8u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
&lt;/div&gt;
</pre>
					</div>
					<div class="7u">
						<div class="demo-grid">
							<div class="row">
								<div class="8u">8u</div>
								<div class="4u">4u</div>
							</div>
						</div>
					</div>
				</dd>
				<dt>2 Rows (3u+6u+3u, 4u+4u+4u)</dt>
				<dd class="row">
					<div class="5u">
<pre>
&lt;div class="row"&gt;
	&lt;div class="3u"&gt;3u&lt;/div&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;div class="3u"&gt;3u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
&lt;/div&gt;
</pre>
					</div>
					<div class="7u">
						<div class="demo-grid">
							<div class="row">
								<div class="3u">3u</div>
								<div class="6u">6u</div>
								<div class="3u">3u</div>
							</div>
							<div class="row">
								<div class="4u">4u</div>
								<div class="4u">4u</div>
								<div class="4u">4u</div>
							</div>
						</div>
					</div>
				</dd>
				<dt>4 Rows (12u, 3u+9u, 6u+6u, 6u+6u)</dt>
				<dd class="row">
					<div class="5u">
<pre>
&lt;div class="row"&gt;
	&lt;div class="12u"&gt;12u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
	&lt;div class="3u"&gt;3u&lt;/div&gt;
	&lt;div class="9u"&gt;9u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
&lt;/div&gt;
</pre>
					</div>
					<div class="7u">
						<div class="demo-grid">
							<div class="row">
								<div class="12u">12u</div>
							</div>
							<div class="row">
								<div class="3u">3u</div>
								<div class="9u">9u</div>
							</div>
							<div class="row">
								<div class="6u">6u</div>
								<div class="6u">6u</div>
							</div>
							<div class="row">
								<div class="6u">6u</div>
								<div class="6u">6u</div>
							</div>
						</div>
					</div>
				</dd>
				<dt>3 Rows (3u+6u+3u, 4u+4u+4u, 6u+6u), flush modifier (applied to rows)</dt>
				<dd class="row">
					<div class="5u">
<pre>
&lt;div class="row flush"&gt;
	&lt;div class="3u"&gt;3u&lt;/div&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;div class="3u"&gt;3u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row flush"&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row flush"&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;div class="6u"&gt;6u&lt;/div&gt;
&lt;/div&gt;
</pre>
					</div>
					<div class="7u">
						<div class="demo-grid">
							<div class="row flush">
								<div class="3u">3u</div>
								<div class="6u">6u</div>
								<div class="3u">3u</div>
							</div>
							<div class="row flush">
								<div class="4u">4u</div>
								<div class="4u">4u</div>
								<div class="4u">4u</div>
							</div>
							<div class="row flush">
								<div class="6u">6u</div>
								<div class="6u">6u</div>
							</div>
						</div>
					</div>
				</dd>
				<dt>3 Rows (3u+6u+3u, 4u+4u+4u, 6u+6u), flush modifier (applied to parent)</dt>
				<dd class="row">
					<div class="5u">
<pre>&lt;div class="flush"&gt;
	&lt;div class="row"&gt;
		&lt;div class="3u"&gt;3u&lt;/div&gt;
		&lt;div class="6u"&gt;6u&lt;/div&gt;
		&lt;div class="3u"&gt;3u&lt;/div&gt;
	&lt;/div&gt;
	&lt;div class="row"&gt;
		&lt;div class="4u"&gt;4u&lt;/div&gt;
		&lt;div class="4u"&gt;4u&lt;/div&gt;
		&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;/div&gt;
	&lt;div class="row"&gt;
		&lt;div class="6u"&gt;6u&lt;/div&gt;
		&lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;</pre>
					</div>
					<div class="7u">
						<div class="demo-grid flush">
							<div class="row">
								<div class="3u">3u</div>
								<div class="6u">6u</div>
								<div class="3u">3u</div>
							</div>
							<div class="row">
								<div class="4u">4u</div>
								<div class="4u">4u</div>
								<div class="4u">4u</div>
							</div>
							<div class="row">
								<div class="6u">6u</div>
								<div class="6u">6u</div>
							</div>
						</div>
					</div>
				</dd>
				<dt>1 Row (4u+4u+4u), inside cell of another row (2 Rows (9u+3u, 6u+6u))</dt>
				<dd class="row">
					<div class="5u">
<pre>
&lt;div class="row"&gt;
	&lt;div class="9u"&gt;
		&lt;div class="row"&gt;
			&lt;div class="4u"&gt;4u&lt;/div&gt;
			&lt;div class="4u"&gt;4u&lt;/div&gt;
			&lt;div class="4u"&gt;4u&lt;/div&gt;
		&lt;/div&gt;
	&lt;/div&gt;
	&lt;div class="3u"&gt;3u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;div class="4u"&gt;4u&lt;/div&gt;
&lt;/div&gt;</pre>
					</div>
					<div class="7u">
						<div class="demo-grid">
							<div class="row">
								<div class="9u">
									<div class="row">
										<div class="4u">4u</div>
										<div class="4u">4u</div>
										<div class="4u">4u</div>
									</div>
								</div>
								<div class="3u">3u</div>
							</div>
							<div class="row">
								<div class="6u">6u</div>
								<div class="6u">6u</div>
							</div>
						</div>
					</div>
				</dd>
			</dl>
		</section>
	</section>
	<section class="sub">
		<h3>Plugin Support</h3>
		<p>Extends skel.js's capabilities to do even more cool stuff. Not much to see here just yet, but for now there's this: <a href="/ui">UI</a></p>
	</section>
</section>