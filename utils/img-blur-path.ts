export function getBlurPath(url: string) {
  const startPath = "https://res.cloudinary.com/romexviii/image/upload/";
  const blurSetting = "c_scale,e_blur:100,q_54,w_379/";
  const endPath = url?.split("/upload/")[1];
  const blurPath = startPath + blurSetting + endPath;
  return blurPath;
}
