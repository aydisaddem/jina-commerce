export const cloudinaryOptimize = (url, width) => {
  if (!url.includes("/upload/")) return url;

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},dpr_auto/`
  );
};

