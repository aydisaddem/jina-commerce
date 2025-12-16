const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-");

const deslugify = (slug) =>
  slug
    .split("-")                
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(" ");  


    export {slugify, deslugify};
