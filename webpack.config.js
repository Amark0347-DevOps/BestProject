const path = require('path');

module.exports = {
  // Other Webpack configuration options
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib")
    }
  }
};
