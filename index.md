---
layout: base
title: NodeBox
section: home
---
<div class="hero row">
  <div class="sixteen columns">
    <div class="hero-text">
      <h1>Clever tools for curious creatives.</h1>
      <p>The NodeBox family of tools gives you the leverage to create generative design the way you want.</p>
    </div>
  </div>
</div>

<div class="summary row">
  <div class="sixteen columns">
    <p style="font-size: 120%; color: #666">Using our open-source tools we enable designers to automate boring production challenges, visualize large sets of data and access the raw power of the computer without thinking in ones and zeroes. Our tools integrate with traditional design applications and run on many platforms.</p>
  </div>
</div>

<div class="versions row">
  <div class="eight columns featured app">
    <a href="/node/">
      <img src="/media/homepage/nodebox-3.jpg" alt="NodeBox 3 screenshot">
    </a>
    <h2>NodeBox 3</h2>
    <small>Acquire, Transform, Visualize</small>
    <p>Cross-platform, node-based GUI for efficient data visualizations and generative design.</p>
    <a class="read-more" href="/node/">Read More</a>
  </div>
  <div class="four columns app">
    <a href="/code/index.php/Home.html">
      <img src="/media/homepage/nodebox-1.jpg" alt="NodeBox 1 screenshot">
    </a>
    <h2>NodeBox 1</h2>
    <small>Code, Iterate, Print</small>
    <p>Mac app for creating 2D visuals using Python programming code.</p>
    <a class="read-more" href="/code/index.php/Home.html">Read More</a>
  </div>
  <div class="four columns app">
    <a href="/opengl/">
      <img src="/media/homepage/nodebox-opengl.jpg" alt="NodeBox OpenGL screenshot">
    </a>
    <h2>NodeBox OpenGL</h2>
    <small>Code, Animate</small>
    <p>Fast cross platform graphics library.</p>
    <a class="read-more" href="/opengl/">Read More</a>
  </div>
</div>

<div class="gallery row">
  <div class="eight columns">
  <h2>Gallery</h2>
  {% for post in collections.gallery limit: 2 %}
    {% include "post.html" %}
  {% endfor %}
  </div>
  <div class="eight columns">
  <h2>Blog</h2>
  {% for post in collections.blog limit: 2 %}
    {% include "post.html" %}
  {% endfor %}
  </div>
</div>

<div class="connect row">
  <div class="eight columns">
    <h2>Newsletter</h2>
    <p>Sign up for our newsletter.</p>
      <form action="//nodebox.us7.list-manage.com/subscribe/post?u=18183e7289984568ad8565df3&amp;id=6b928876d6" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div>
          <input type="email" placeholder="E-mail" name="EMAIL" id="mce-EMAIL" />
          <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
        </div>

        <div id="mce-responses" class="clear">
          <div class="response" id="mce-error-response" style="display:none"></div>
          <div class="response" id="mce-success-response" style="display:none"></div>
        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;"><input type="text" name="b_18183e7289984568ad8565df3_6b928876d6" tabindex="-1" value=""></div>
      </form>
  </div>
  <div class="eight columns">
    <h2>Workshops</h2>
    <p>The creators of NodeBox have organized workshops internationally since 2004. These one-week sessions focus on learning the software combined with insights into the principles of generative art, data visualization and cognitive science.</p>
    <a class="read-more" href="http://www.emrg.be/teaching/">Read more</a>
  </div>
</div>

<div class="emrg row">
  <h2 class="fourteen columns offset-by-two">EMRG</h2>
  <div class="two columns">
    <a href="http://www.emrg.be/"><img src="/media/homepage/emrg-logo.png" alt="Logo of EMRG"></a>
  </div>
  <div class="six columns">
    <p>NodeBox is developed by the <strong>Experimental Media Research Group</strong>, a cross-domain research group associated with the <a href="http://www.sintlucasantwerpen.be/">Sint Lucas School of arts</a> of the <a href="http://www.kdg.be/">Karel de Grote-Hogeschool</a> (Antwerp, Belgium). </p>
    <p><strong>EMRG</strong> has been active since 2004 developing NodeBox and doing cutting-edge research in the domain of computer graphics, user experience, creativity, but also in artificial intelligence and natural language processing.</p>
    <p><a href="http://www.emrg.be/">www.emrg.be</a></p>
  </div>
</div>

