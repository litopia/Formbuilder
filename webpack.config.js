var path = require('path');
module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',
  entry: './src/scripts/app.js',
  output: {
    path: path.join(__dirname, "build"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.coffee']
  }
};
