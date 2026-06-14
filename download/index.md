---
layout: base
title: Download NodeBox
section: download
---

<div class="sixteen columns">
  <h1>Download NodeBox</h1>


  <table id="download-table" class="sixteen columns">
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
      <td class="linux"><a href="javascript:showLinuxDownloadInstructions()" class="button">Instructions</a><br>&nbsp;</td>
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
  </table>

  <div id="nodebox-3-linux-instructions" style="display:none;" class="popup">
    <a class="close-button" href="javascript:hideLinuxDownloadInstructions();">x</a>
    <h3>Downloading NodeBox 3 for Linux</h3>
    <p>We don't have a package ready, but executing the following commands in the terminal will get you going:</p>
    <pre>
       sudo apt-get install git-core openjdk-7-jdk ant
       git clone git://github.com/nodebox/nodebox.git
       cd nodebox
       ant run
    </pre>
  </div>

  <h3>NodeBox 3 Documentation</h3>

  <ul id="bootcamp">
    <li class="three columns">
      <a href="/node/documentation/tutorial/getting-started">
        <img src="/media/node/documentation/index-getting-started.png">
        <span>Getting Started</span>
      </a>
    </li>
    <li class="three columns">
      <a href="/node/documentation/tutorial/exploring">
        <img src="/media/node/documentation/index-exploring.png">
        <span>Exploring</span>
      </a>
    </li>
    <li class="three columns">
      <a href="/node/documentation/tutorial/animation">
        <img src="/media/node/documentation/index-animation.png">
        <span>Basic Animation</span>
      </a>
    </li>
  </ul>

</div>

<script>
  var os = 'other';
  if (navigator.appVersion.indexOf('Win') != -1) os = 'windows';
  if (navigator.appVersion.indexOf('Mac') != -1) os = 'mac';
  if (navigator.appVersion.indexOf('Linux') != -1 || navigator.userAgent.indexOf('Linux') != -1 || navigator.userAgent.indexOf('Unix') != -1) os = 'linux';

  $('.' + os).addClass('highlight');

  function showLinuxDownloadInstructions() {
    $('#nodebox-3-linux-instructions').show();
  }

  function hideLinuxDownloadInstructions() {
    $('#nodebox-3-linux-instructions').hide();
  }


</script>
