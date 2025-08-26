const path = require('path');  // Import the 'path' module

module.exports = {
  webpack: {
    configure: {
      output: {
        path: path.resolve(__dirname, 'simroXibo'),  // Replace with your target folder
      },
    },
  },
};
