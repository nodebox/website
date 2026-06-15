module.exports = function (eleventyConfig) {
  // --- Markdown: allow raw HTML (kramdown-compatible). markdown-it ships with
  // html:false, which would escape the heavy inline HTML in our pages. ---
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.set({ html: true })
  );

  // --- Preserve current URLs. Jekyll output every `foo.md` to `foo.html` at the
  // same path; Eleventy defaults to "pretty" `foo/index.html`. The site has 400+
  // links that end in `.html`, so we map every template to <stem>.html. ---
  eleventyConfig.addGlobalData("permalink", () => (data) => `${data.page.filePathStem}.html`);

  // --- Layout aliases: lets content keep Jekyll's bare `layout: default` etc.,
  // without rewriting front matter across 180+ files. ---
  for (const name of ["base", "default", "page", "post", "blog", "gallery", "documentation", "reference", "redirect"]) {
    eleventyConfig.addLayoutAlias(name, `layouts/${name}.html`);
  }

  // --- Jekyll's `date_to_string` filter (e.g. "01 Jun 2018"). ---
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  eleventyConfig.addFilter("date_to_string", (date) => {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${day} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  // --- Collections replacing Jekyll's `site.categories.gallery` / `.blog`. ---
  const postsByCategory = (collectionApi, category) =>
    collectionApi
      .getFilteredByGlob("_posts/*.md")
      .filter((post) => post.data.categories === category)
      .reverse();
  eleventyConfig.addCollection("gallery", (api) => postsByCategory(api, "gallery"));
  eleventyConfig.addCollection("blog", (api) => postsByCategory(api, "blog"));

  // --- Static assets copied verbatim, preserving paths. ---
  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addPassthroughCopy("node/**/*.{png,jpg,jpeg,gif,ndbx,csv,pxm,py}");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("CNAME");
  // Phase 2: the legacy /code/ wiki is copied byte-for-byte for now.
  eleventyConfig.addPassthroughCopy("code");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    // Front matter has no extension info; default both .md and .html to Liquid,
    // matching the Jekyll templates we're porting.
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["md", "html", "liquid"],
  };
};
