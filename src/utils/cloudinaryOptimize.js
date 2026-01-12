export const cloudinaryOptimize = (url, width, options = {}) => {
  if (!url.includes("/upload/")) return url;

  const {
    aspectRatio = null, // e.g., { width: 200, height: 243 }
    crop = 'fit',
  } = options;

  // Request 2x for Retina displays
  const retinaWidth = width * 2;
  
  let transformation = `f_auto,q_auto,w_${retinaWidth},dpr_auto,c_${crop}`;
  
  // If aspect ratio provided, maintain it
  if (aspectRatio) {
    const retinaHeight = Math.round(retinaWidth * (aspectRatio.height / aspectRatio.width));
    transformation = `f_auto,q_auto,w_${retinaWidth},h_${retinaHeight},c_${crop}`;
  }

  return url.replace("/upload/", `/upload/${transformation}/`);
};