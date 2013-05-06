<section id="usage" class="main container">
	<h2>Usage</h2>
	<section class="sub">
		<h3>Breakpoint Handler</h3>
		<p>...</p>
	</section>
	<section class="sub">
		<h3>CSS Shortcuts</h3>
		<p>...</p>
	</section>
	<section class="sub">
		<h3>Grid System</h3>
		<p>A cornerstone of skel.js is its sophisticated grid system. If you've never used a grid system before, here's
		a one line summary: it's a way to rapidly build page layouts without hating yourself and everything around you.
		Here's a rundown of its specifics:</p>
		<ul class="default">
			<li><strong>Grids</strong> are divided into 12 vertical columns of equal width, with <strong>gutters</strong>
			(also of equal width) separating each one. The width of a column is, in skel.js terminology, a <strong>unit</strong>.</li>
			<li><strong>Cells</strong> can be between 1 unit wide (1u) and 12 units wide (12u).</li>
			<li><strong>Rows</strong> can fit up to 12u worth of cells in any combination (4u+8u, 3u+3u+3u, 1u+12u, and so on). 
			Grids can have an unlimited number of rows.</li>
			<li>Grids can be infinitely nested.</li>
			<li>Grid widths are fluid by default and can be wrapped in elements of any width (including <a href="#">containers</a>).</li>
		</ul>
		<p>And here's how one actually looks (more examples <a href="#grid-examples">below</a>):</p>
<pre>
&lt;div class="row"&gt;
  &lt;div class="8u"&gt;8u&lt;/div&gt;
  &lt;div class="4u"&gt;4u&lt;/div&gt;
&lt;/div&gt;
&lt;div class="row"&gt;
  &lt;div class="2u"&gt;2u&lt;/div&gt;
  &lt;div class="4u"&gt;4u&lt;/div&gt;
  &lt;div class="4u"&gt;4u&lt;/div&gt;
  &lt;div class="2u"&gt;2u&lt;/div&gt;
&lt;/div&gt;</pre>
		<section>
			<h4>Modifiers</h4>
			<p>These classes modify a grid's behavior. To use one, apply it to the parent element of your rows.</p>
			<dl class="default">
				<dt>flush</dt>
				<dd>
					Removes the grid's gutters.
				</dd>
				<dt id="grid-modifiers-persistent">persistent</dt>
				<dd>
					Retains the grid's structure even if <a href="#configuation-grid-collapse">collapse</a> has been enabled.
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
				<dt>3 Rows (3u+6u+3u, 4u+4u+4u, 6u+6u), flush</dt>
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
				<dt>1 Row (4u+4u+4u), nested in the cell of another grid (2 Rows (9u+3u, 6u+6u))</dt>
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
</section>