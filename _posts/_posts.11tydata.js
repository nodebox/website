// Reproduces Jekyll's default post permalink (/:categories/:year/:month/:day/:title.html)
// so existing gallery/blog post URLs don't move. Overrides the site-wide .html
// permalink set in .eleventy.js (directory data outranks global data).
module.exports = {
  permalink: (data) => {
    const d = data.page.date;
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    return `/${data.categories}/${yyyy}/${mm}/${dd}/${data.page.fileSlug}.html`;
  },
};
