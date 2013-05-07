<section id="config" class="main container">
	<header>
		<h2>Configuration Reference</h2>
	</header>
	<section class="sub" id="config-options">
		<h3>Options</h3>
		<dl class="default">
			<dt id="config-options-prefix">prefix</dt>
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
				breakpoint stylesheets. For example, setting it to <em>"style"</em> with the following breakpoints configured:</p>
				<ul class="default">
					<li><strong>wide</strong></li>
					<li><strong>narrow</strong></li>
					<li><strong>narrow960</strong></li>
					<li><strong>narrow720</strong></li>
					<li><strong>narrow480</strong></li>
				</ul>
				<p>will result in skel.js looking for these stylesheets:</p>
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
			<dt id="config-options-containers">containers</dt>
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
				<p>Sets the global <a href="#usage-containers">container</a> width. Can be a pixel value (eg. <em>960</em> or <em>"960px"</em>), a percentage value (eg. <em>"95%"</em>), or <em>"fluid"</em> (equivalent to <em>"100%"</em>).</p>
			</dd>
			<dt id="config-options-grid">grid</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td><a href="#config-grid">Grid Options</a></td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>{ gutters: 2, collapse: false }</em></td>
					</tr>
				</table>
				<p>Sets global grid options.</p>
			</dd>
			<dt id="config-options-breakpoints">breakpoints</dt>
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
				<p>Your breakpoints, listed in the following format:</p>
<pre>{
  "breakpointName": { <em>(<a href="#config-breakpoint">Breakpoint Options</a>)</em> },
  "breakpointName": { <em>(<a href="#config-breakpoint">Breakpoint Options</a>)</em> },
  "breakpointName": { <em>(<a href="#config-breakpoint">Breakpoint Options</a>)</em> },
  ...
}</pre>
							<p>You can also use the following shorthand format if you only need to specify a range for each breakpoint:</p>
<pre>{
  "breakpointName": "<em>(<a href="#config-breakpoint-range">range</a>)</em>",
  "breakpointName": "<em>(<a href="#config-breakpoint-range">range</a>)</em>",
  "breakpointName": "<em>(<a href="#config-breakpoint-range">range</a>)</em>",
  ...
}</pre>
				<p><strong>Note:</strong> Since breakpoint ranges are allowed to overlap, more than one can be active at any given time.
				When this happens, the options of each are combined in order with those defined <strong>last</strong> taking precedence.</p>
			</dd>
			<dt id="config-options-resetCSS">resetCSS</dt>
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
				<p>If <em>true</em>, default browser styles will be reset using Erik Meyer's <a href="http://meyerweb.com/eric/tools/css/reset/">CSS resets</a> (built in to skel.js).</p>
			</dd>
			<dt id="config-options-normalizeCSS">normalizeCSS</dt>
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
				<p>If <em>true</em>, default browser styles will be normalized using <a href="http://necolas.github.io/normalize.css/">normalize.css</a> (built in to skel.js).</p>
			</dd>
			<dt id="config-options-boxModel">boxModel</dt>
			<dd>
				<table>
					<tr>
						<th>Type</th>
						<td>String</td>
					</tr>
					<tr>
						<th>Default</th>
						<td><em>null</em></td>
					</tr>
				</table>
				<p>Sets the global CSS box model. Can be <em>"border"</em>, <em>"content"</em>, <em>"margin"</em>, or <em>"padding"</em>.</p>
			</dd>
			<dt id="config-options-useOrientation">useOrientation</dt>
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
				<p>For simplicity, skel.js ignores device orientation (where applicable) and always assumes it's being
				used in portrait mode. This results in the same viewport width regardless of actual orientation and greatly
				simplifies breakpoint configuration. However, if you do want orientation to be a factor, set this to <em>true</em>.</p>
			</dd>
			<dt id="config-options-preloadStyleSheets">preloadStyleSheets</dt>
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
				<p>By default, skel.js will dynamically load breakpoint stylesheets only when it needs them.
				Setting this option to <em>true</em> will instead preload them all ahead of time.</p>
			</dd>
			<dt id="config-options-pollOnce">pollOnce</dt>
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
				<p>If <em>true</em>, breakpoint checks will only be performed the first time the page is loaded, disabling
				breakpoint switching on resize.</p>
			</dd>
		</dl>
	</section>
	<section id="config-breakpoint" class="sub">
		<h3>Breakpoint Options</h3>
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
						<td><em>"*"</em> (any width)</td>
					</tr>
				</table>
				<p>Sets the breakpoint's active width range (in pixels). Can be any of the following:</p>
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
				<p><strong>Note:</strong> Ranges can overlap with that of other breakpoints.</p>
			</dd>
			<dt id="config-breakpoint-lockViewport">lockViewport</dt>
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
				<p>If <em>true</em>, skel.js will (where applicable) disable viewport zooming and resizing. Should only be enabled on mobile-oriented breakpoints.</p>
			</dd>
			<dt id="config-breakpoint-hasStyleSheet">hasStyleSheet</dt>
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
				<p>Determines if there's a stylesheet for the breakpoint. By default this is <em>true</em>, but there
				are times when setting this to <em>false</em> makes sense (for example, when a breakpoint exists only to change the container size).</p>
			</dd>
			<dt id="config-breakpoint-containers">containers</dt>
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
				<p>Sets the breakpoint's <a href="#usage-containers">container</a> width. Can be a pixel value (eg. <em>960</em> or <em>"960px"</em>), a percentage value (eg. <em>"95%"</em>), or <em>"fluid"</em> (equivalent to <em>"100%"</em>).
				Overrides the global container width.</p>
			</dd>
			<dt id="config-breakpoint-grid">grid</dt>
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
				<p>Sets the breakpoint's grid options. Overrides global grid options.</p>
			</dd>
		</dl>
	</section>
	<section id="config-grid" class="sub">
		<h3>Grid Options</h3>
		<dl class="default">
			<dt id="config-grid-gutters">gutters</dt>
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
				<p>Sets the gutter size. Can be <em>0</em> (for no gutters), <em>1</em> (for 1% gutters), <em>2</em> (for 2% gutters), <em>4</em> (for 4% gutters), or <em>6</em> (for 6% gutters). Anything else will tear reality asunder.</p>
			</dd>
			<dt id="config-grid-collapse">collapse</dt>
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
				<p>If <em>true</em>, all cells (except those in <a href="#usage-grid-modifiers-persistent">persistent</a> grids) are forced to be
				100% wide regardless of their actual unit size ("collapsing" the grid). 
				Should only be enabled on mobile-oriented breakpoints.</p>
			</dd>
		</dl>
	</section>
</section>