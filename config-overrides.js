const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@api": path.resolve(__dirname, "src/api"),
    '@assets': path.resolve(__dirname, 'src/assets'),
    "@contexts": path.resolve(__dirname, "src/contexts"),
    "@commons": path.resolve(__dirname, "src/commons"),
    // '@hooks': path.resolve(__dirname, 'src/hooks'),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@games": path.resolve(__dirname, "src/games"),
    // '@store': path.resolve(__dirname, 'src/store'),
    // '@utils': path.resolve(__dirname, 'src/utils'),
  };

  // Add file extensions for resolution
  config.resolve.extensions = [
    ...config.resolve.extensions,
    ".tsx", // TypeScript React files
    ".ts", // TypeScript files
    ".jsx", // JavaScript React files
    ".js", // JavaScript files
    ".json", // JSON files
  ];

  return config;
};
