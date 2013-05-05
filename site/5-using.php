<section id="using" class="main container">
	<h2>Using skel.js</h2>
	<section class="sub">
		<h3>Overview</h3>
		<ul class="default">
			<li><strong>Grids</strong> are divided into 12 vertical columns of equal width, with <strong>gutters</strong>
			(also of equal width) separating each one. The width of a column is, in skel.js terminology, a <strong>unit</strong>.</li>
			<li><strong>Cells</strong> can be between 1 unit wide (1u) and 12 units wide (12u).</li>
			<li><strong>Rows</strong> can fit up to 12u worth of cells in any combination (4u+8u, 3u+3u+3u, 1u+12u, and so on). 
			Grids can have an unlimited number of rows.</li>
			<li>Grids can be infinitely nested.</li>
			<li>Grid widths are fluid by default, but adding a special <a href="#grid-modifiers">modifier class</a> will turn one into a <strong>container grid</strong>.
			Container grids are special in that they're locked to a <a href="#configuation-grid-containers">specific width</a> that can change depending on the active breakpoint.
			This property makes them ideal wrapper elements and is what gives the grid system its responsiveness.</li>
		</ul>
		<p>Here's how a grid is typically structured:</p>
<pre>
&lt;!-- Row 1 --&gt;
&lt;div class="row"&gt;
  &lt;div class="(width)u"&gt;
    ...
  &lt;/div&gt;
  &lt;div class="(width)u"&gt;
    ...
  &lt;/div&gt;
  ...
&lt;/div&gt;
&lt;!-- Row 2 --&gt;
&lt;div class="row"&gt;
  &lt;div class="(width)u"&gt;
    ...
  &lt;/div&gt;
  &lt;div class="(width)u"&gt;
    ...
  &lt;/div&gt;
  ...
&lt;/div&gt;
...
&lt;!-- Row (n) --&gt;
&lt;div class="row"&gt;
  &lt;div class="(width)u"&gt;
    ...
  &lt;/div&gt;
  &lt;div class="(width)u"&gt;
    ...
  &lt;/div&gt;
  ...
&lt;/div&gt;
</pre>
		<p>And here's how one actually looks (more samples <a href="#grid-samples">below</a>):</p>
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
	</section>
	<section id="grid-modifiers" class="sub">
		<h3>Modifier Classes</h3>
		<p>These classes modify a particular grid's behavior. To use one, simply add it <em>after</em> the grid's <code>5grid</code> class (eg. <code>&lt;div class="5grid 5grid-container"&gt;</code>).</p>
		<dl class="default">
			<dt>5grid-container</dt>
			<dd>
				Makes the grid a container, setting its width to the current <a href="#configuation-grid-containers">container grid width</a>.
			</dd>
			<dt>5grid-flush</dt>
			<dd>
				Removes the grid's gutters.
			</dd>
			<dt id="grid-modifiers-persistent">5grid-persistent</dt>
			<dd>
				Retains the grid's structure even if <a href="#configuation-grid-collapse">collapse</a> has been enabled.
			</dd>
		</dl>
	</section>
	<section id="grid-samples" class="sub">
		<h3>Sample Grids</h3>
		<section>
			<h4>1 Row (8u + 4u)</h4>
<pre>&lt;div class="5grid"&gt;
  &lt;!-- Row 1 --&gt;
    &lt;div class="row"&gt;
      &lt;div class="8u"&gt;8u&lt;/div&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
<div class="demo">
	<div class="5grid">
		<div class="row">
			<div class="8u">8u</div>
			<div class="4u">4u</div>
		</div>
	</div>
</div>
		</section>
		<section>
			<h4>2 Rows (3u+6u+3u, 4u+4u+4u)</h4>
<pre>&lt;div class="5grid"&gt;
  &lt;!-- Row 1 --&gt;
	&lt;div class="row"&gt;
	  &lt;div class="3u"&gt;3u&lt;/div&gt;
	  &lt;div class="6u"&gt;6u&lt;/div&gt;
	  &lt;div class="3u"&gt;3u&lt;/div&gt;
	&lt;/div&gt;
  &lt;!-- Row 2 --&gt;
	&lt;div class="row"&gt;
	  &lt;div class="4u"&gt;4u&lt;/div&gt;
	  &lt;div class="4u"&gt;4u&lt;/div&gt;
	  &lt;div class="4u"&gt;4u&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;</pre>
<div class="demo">
	<div class="5grid">
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
		</section>
		<section>
			<h4>4 Rows (12u, 3u+9u, 6u+6u, 6u+6u)</h4>
<pre>&lt;div class="5grid"&gt;
  &lt;!-- Row 1 --&gt;
	&lt;div class="row"&gt;
	  &lt;div class="12u"&gt;12u&lt;/div&gt;
	&lt;/div&gt;
  &lt;!-- Row 2 --&gt;
	&lt;div class="row"&gt;
	  &lt;div class="3u"&gt;3u&lt;/div&gt;
	  &lt;div class="9u"&gt;9u&lt;/div&gt;
	&lt;/div&gt;
  &lt;!-- Row 3 --&gt;
	&lt;div class="row"&gt;
	  &lt;div class="6u"&gt;6u&lt;/div&gt;
	  &lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;/div&gt;
  &lt;!-- Row 4 --&gt;
	&lt;div class="row"&gt;
	  &lt;div class="6u"&gt;6u&lt;/div&gt;
	  &lt;div class="6u"&gt;6u&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;</pre>
<div class="demo">
	<div class="5grid">
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
		</section>
		<section>
			<h4>3 Rows (3u+6u+3u, 4u+4u+4u, 6u+6u), flush</h4>
<pre>&lt;div class="5grid 5grid-flush"&gt;
  &lt;!-- Row 1 --&gt;
    &lt;div class="row"&gt;
      &lt;div class="3u"&gt;3u&lt;/div&gt;
      &lt;div class="6u"&gt;6u&lt;/div&gt;
      &lt;div class="3u"&gt;3u&lt;/div&gt;
    &lt;/div&gt;
  &lt;!-- Row 2 --&gt;
    &lt;div class="row"&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
    &lt;/div&gt;
  &lt;!-- Row 3 --&gt;
    &lt;div class="row"&gt;
      &lt;div class="6u"&gt;6u&lt;/div&gt;
      &lt;div class="6u"&gt;6u&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
<div class="demo">
	<div class="5grid 5grid-flush">
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
		</section>
		<section>
			<h4>1 Row (4u+4u+4u), nested in the cell of another grid (2 Rows (9u+3u, 6u+6u))</h4>
<pre>&lt;div class="5grid"&gt;
  &lt;!-- Row 1 --&gt;
  &lt;div class="row"&gt;
    &lt;div class="9u"&gt;
      &lt;div class="5grid"&gt;
        &lt;!-- Row 1 --&gt;
          &lt;div class="row"&gt;
            &lt;div class="4u"&gt;4u&lt;/div&gt;
            &lt;div class="4u"&gt;4u&lt;/div&gt;
            &lt;div class="4u"&gt;4u&lt;/div&gt;
          &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="3u"&gt;3u&lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Row 2 --&gt;
    &lt;div class="row"&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
      &lt;div class="4u"&gt;4u&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
<div class="demo">
	<div class="5grid">
		<div class="row">
			<div class="9u">
				<div class="5grid">
					<div class="row">
						<div class="4u">4u</div>
						<div class="4u">4u</div>
						<div class="4u">4u</div>
					</div>
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
		</section>
	</section>
</section>