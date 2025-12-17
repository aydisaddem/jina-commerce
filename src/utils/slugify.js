const slugify = (str) => str.replace(/\s+/g, "-");

const deslugify = (slug) => slug.split("-").join(" ");

export { slugify, deslugify };
