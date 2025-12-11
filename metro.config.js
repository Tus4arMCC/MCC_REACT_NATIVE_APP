const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Fix "SHA-1 error in nested node_modules"
config.resolver.unstable_enableSymlinks = false;

config.watchFolders = [
  // Allow Metro to watch the workspace root
  __dirname,
];

config.resolver.blockList = [
  /.*\/node_modules\/expo\/node_modules\/react-native\/.*/,
];

module.exports = config;
