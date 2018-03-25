
const path = require('path');

module.exports = {
            isAutoBuildDisabled: function(){return false;},
            opencvBinDir: path.resolve(__dirname, '../../../build/Release/' )
};
