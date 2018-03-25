console.log("doing postinstall");
var fs = require('fs');
var path = require('path');

if (process.platform !== 'win32'){
  // for linux, make links like .3.4 from files like .3.4.1
  var libfolder = path.resolve(__dirname, '../build/Release');
  var foldercontent = fs.readdirSync( libfolder );
  for (var i = 0; i < foldercontent.length; i++){
    var file = foldercontent[i];
    var filesplit = file.split('.');
    if (filesplit.length >= 5){
      filesplit = filesplit.slice(0, -1);
      var linkname = filesplit.join('.');
      console.log("linking " + file + " to "+ linkname);
      fs.symlinkSync( './'+file, libfolder+'/'+linkname);
    }
  }
}

var fauxfolder = path.resolve(__dirname, '../faux-opencv-build');
var newfolder = path.resolve(__dirname, '../node_modules');
console.log(fauxfolder, newfolder);

fs.renameSync(fauxfolder, newfolder);
