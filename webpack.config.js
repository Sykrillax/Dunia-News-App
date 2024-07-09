const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  ignoreWarnings: [
    {
      module: /swiper\/swiper-bundle\.css/,
      message: /export '.*' was not found in/,
    },
  ],
};
