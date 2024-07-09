module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: /node_modules/
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ]
    }
  };
  