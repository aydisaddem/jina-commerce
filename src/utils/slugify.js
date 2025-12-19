const slugify = (str) =>
  str
    .replace(/&/g, "and")       // normalize ampersand
    .replace(/\s+/g, "-");      // replace spaces with dash

const deslugify = (slug) =>
  slug
    .split("-")
    .join(" ")
    .replace(/\band\b/g, "&");  // convert "and" back to "&"

export { slugify, deslugify };

