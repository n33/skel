<section id="usage" class="main container">
	<header>
		<h2>Usage</h2>
	</header>
	<section class="sub" id="usage-containers">
		<h3>Containers</h3>
		<p>Containers are special wrapper elements whose widths are determined by whatever breakpoint happens to be active. 
		By setting a container width on each breakpoint (using the <a href="#config-options-containers">containers</a> option) and wrapping stuff 
		in a container, like so:</p>
		
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
		// The container. Can be any block-level element (div, form, etc).
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
		<p>Said stuff will automatically adjust to the active breakpoint's container width.
		In this case, it'll become 1140px wide when <strong>wide</strong> is active,
		960px wide when <strong>narrow</strong> is active, and fluid when <strong>mobile</strong>
		is active. Containers also work great with the ...</p>
	</section>
	<section class="sub" id="usage-grid">
		<h3>Grid System</h3>
		<p>One of the cornerstones of skel.js is its grid system. In case you've never used one before, it's
		basically a simple way to build page layouts (even complex ones) without developing an unbridled hatred for CSS.</p>
		<section id="usage-grid-overview">
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
						<li>Can be wrapped by other elements (including <a href="#usage-containers">containers</a>).</li>
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
			<p>More examples <a href="#usage-grid-examples">below</a>.</p>
		</section>
		<section id="usage-grid-configuration">
			<h4>Configuration</h4>
			<p>Certain aspects of the grid system's behavior (such as gutter size) can be configured on a <a href="#config-options-grid">global level</a> as well as <a href="#config-breakpoint-grid">per-breakpoint</a>.
			Check out the <a href="#config">configuration reference</a> for more details.</p>
		</section>
		<section id="usage-grid-modifiers">
			<h4>Modifiers</h4>
			<p>These are classes that alter the behavior of a particular row or a group of rows (when applied to their immediate parent element).</p>
			<dl class="default">
				<dt>flush</dt>
				<dd>
					Removes the gutters between each cell (equivalent to setting gutters to <em>0</em> in your configuration, only more localized).
				</dd>
				<dt id="usage-grid-modifiers-persistent">persistent</dt>
				<dd>
					Retains structure even if <a href="#config-grid-collapse">collapse</a> has been enabled.
				</dd>
			</dl>
		</section>
		<section id="usage-grid-examples">
			<h4>Examples</h4>
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
	<section class="sub" id="usage-noscript">
		<h3>&lt;noscript&gt; Fallback</h3>
		<p>skel.js needs JS to do its thing, so clients who have it disabled will be greeted with an experience
		reminiscent of the WWW circa 1993. To counter this:</p>
		<ol class="default">
			<li>Download <a href="#">skel-noscript.css</a>.</li>
			<li>Decide on which of your breakpoints best represents your site (hint: most likely the one targeting desktops).</li>
			<li>Go through the stylesheet and comment/uncomment stuff to match your breakpoint.</li>
			<li>
				<p>Add this to your <code>&lt;head&gt;</code> element:</p>
				<pre>
&lt;noscript&gt;&lt;link rel="stylesheet" href="skel-noscript.css" /&gt;&lt;/noscript&gt;
				</pre>
			</li>
		</ol>
		<p>And there you go. Clients with JS disabled will now have an experience almost identical to that of their
		JS-enabled counterparts (minus a few things like responsiveness).</p>
	</section>
</section>