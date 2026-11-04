---
layout: base
title: Download NodeBox
section: download
templateEngineOverride: liquid
---

<div class="sixteen columns">
  <h1>Download NodeBox</h1>


  <div class="table-scroll" tabindex="0" role="region" aria-label="NodeBox downloads by platform"><table id="download-table">
    <tr class="platforms">
      <th class="version"></th>
      <th class="mac">Mac OS X</th>
      <th class="windows">Windows</th>
      <th class="linux">Linux</th>
    </tr>
    <tr>
      <td class="version"><a href="/node/">NodeBox 3</a><br><small>Version 3.1.0 — <a href="/node/release-notes.html">Release Notes</a></small></td>
      <td class="mac"><a href="https://github.com/nodebox/nodebox/releases/download/v3.1.0/NodeBox-3.1.0.dmg" class="button">Download</a><br><small>Apple Silicon only<br>Intel Mac: <a href="https://github.com/nodebox/nodebox/releases/download/v3.0.52/NodeBox-3.0.52.dmg">v3.0.52</a></small></td>
      <td class="windows"><a href="https://github.com/nodebox/nodebox/releases/download/v3.1.0/NodeBox-3.1.0.msi" class="button">Download</a><br>&nbsp;</td>
      <td class="linux"><button type="button" onclick="showLinuxDownloadInstructions()" class="button">Instructions</button><br>&nbsp;</td>
    </tr>
    <tr>
      <td class="version"><a href="https://nodebox.live/">NodeBox Live</a><br><small>Runs in your browser</small></td>
      <td colspan="3" class="mac windows linux"><a href="https://nodebox.live/" class="button">Open <span aria-hidden="true">↗</span></a><br><small>Nothing to download. <a href="https://nodebox.live/users/create">Sign up</a> to start a project.</small></td>
    </tr>
    <tr>
      <td class="version"><a href="/opengl/">NodeBox OpenGL</a><br><small>Version 1.7</small></td>
      <td colspan="3" class="mac windows linux"><a href="https://github.com/nodebox/nodebox-opengl/releases/download/v1.7/nodebox-gl-1.7.zip" class="button">Download</a></td>
    </tr>
    <tr>
      <td class="version"><a href="/code/">NodeBox 1</a><br><small>Version 1.9.7</small></td>
      <td class="mac"><a href="https://github.com/nodebox/nodebox-pyobjc/releases/download/1.9.7/NodeBox-1.9.7.zip" class="button">Download</a></td>
      <td><em>N/A</em></td>
      <td><em>N/A</em></td>
    </tr>
  </table></div>

  <dialog id="nodebox-3-linux-instructions" class="popup" aria-labelledby="linux-instructions-title">
    <button type="button" class="close-button" onclick="hideLinuxDownloadInstructions()" aria-label="Close Linux instructions">×</button>
    <h3 id="linux-instructions-title">Downloading NodeBox 3 for Linux</h3>
    <p>We don't have a package ready, but executing the following commands in the terminal will get you going:</p>
    <pre>
       sudo apt-get install git-core openjdk-7-jdk ant
       git clone git://github.com/nodebox/nodebox.git
       cd nodebox
       ant run
    </pre>
  </dialog>

  <section class="download-learning" aria-labelledby="download-learning-title">
    <h2 id="download-learning-title">Documentation</h2>
    {% assign learning_heading = "h3" %}
    {% include "learning-links.html" %}
  </section>

</div>

<script>
  var os = 'other';
  if (navigator.appVersion.indexOf('Win') != -1) os = 'windows';
  if (navigator.appVersion.indexOf('Mac') != -1) os = 'mac';
  if (navigator.appVersion.indexOf('Linux') != -1 || navigator.userAgent.indexOf('Linux') != -1 || navigator.userAgent.indexOf('Unix') != -1) os = 'linux';

  document.querySelectorAll('.' + os).forEach(function (cell) { cell.classList.add('highlight'); });

  function showLinuxDownloadInstructions() {
    document.getElementById('nodebox-3-linux-instructions').showModal();
  }

  function hideLinuxDownloadInstructions() {
    document.getElementById('nodebox-3-linux-instructions').close();
  }


</script>
