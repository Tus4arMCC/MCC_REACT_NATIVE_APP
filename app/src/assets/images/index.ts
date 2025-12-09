/*
  Central image registry
  ----------------------
  ✅ Metro bundler can statically analyze images
  ✅ Prevents require() duplication
  ✅ Easy to scale & maintain
*/

export const Images = {
  banner1: require("./1half.png"),
  banner2: require("./2half.png"),
  promoGif: require("./gif.gif"),
};
