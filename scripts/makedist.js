
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var process = require('process');


var createdist = function(path_ocv4n, pathto_dist){
    console.log("starting dist creation");

    var dir = path.resolve(pathto_dist);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }


    dir = path.resolve(pathto_dist,'./lib');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    dir = path.resolve(pathto_dist,'./build');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    dir = path.resolve(pathto_dist,'./build/Release');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    dir = path.resolve(pathto_dist,'./scripts');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    dir = path.resolve(pathto_dist,'./faux-opencv-build');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    dir = path.resolve(pathto_dist,'./faux-opencv-build/opencv-build');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }


    var copycmd = 'cp ';
    if(process.platform === 'win32'){
        copycmd = 'copy ';
    }

    var cmd = copycmd + 
        path.resolve(path_ocv4n, './build/Release/opencv4nodejs.node') + ' ' +
        path.resolve(pathto_dist,'./build/Release/opencv4nodejs.node');


    // any problems - will throw    
    child_process.execSync( cmd );
    console.log('.node file copied');

    var cmd = copycmd + 
        path.resolve(__dirname,'../scripts/makedistscripts/postinstall.js') + ' ' +
        path.resolve(pathto_dist,'./scripts/postinstall.js');
    // any problems - will throw    
    child_process.execSync( cmd );
    console.log('postinstall.js file copied');

    var cmd = copycmd + 
        path.resolve(__dirname,'../faux-opencv-build/opencv-build/index.js') + ' ' +
        path.resolve(pathto_dist,'./faux-opencv-build/opencv-build/index.js');
    // any problems - will throw    
    child_process.execSync( cmd );
    console.log('faux-opencv-build/opencv-build/index.js file copied');

    if(process.platform === 'win32'){
        copycmd = 'robocopy ';
        cmd = copycmd + 
            path.resolve(path_ocv4n, './lib/') + ' ' +
            path.resolve(pathto_dist,'./lib/') + ' *.* /s';
        child_process.execSync( '('+cmd+') ^& IF %ERRORLEVEL% LEQ 4 exit /B 0' );
    } else {
        copycmd = 'cp -rd ';
        cmd = copycmd + 
            path.resolve( path_ocv4n,'./lib/') + ' ' +
            path.resolve(pathto_dist,'./lib/');
        child_process.execSync( cmd );
    }

        
    console.log('lib folder copied');

    if(process.platform === 'win32'){
        cmd = copycmd + 
            path.resolve(path_ocv4n,'./node_modules/opencv-build/opencv/build/bin/Release/') + ' ' +
            path.resolve(pathto_dist,'./build/Release/') + ' *.dll /s';
        child_process.execSync( '('+cmd+') ^& IF %ERRORLEVEL% LEQ 4 exit /B 0' );
    } else {
        cmd = copycmd + 
            path.resolve(path_ocv4n, './node_modules/opencv-build/opencv/build/lib/*') + ' ' +
            path.resolve(pathto_dist,'./build/Release/');
        child_process.execSync( cmd );
    }
        
    console.log('opencv folder copied');

    if(process.platform === 'win32'){
        copycmd = 'copy ';
    }

    cmd = copycmd + 
        path.resolve(__dirname,'./package.dist.json') + ' ' +
        path.resolve(pathto_dist,'./package.json');
    child_process.execSync( cmd );

    console.log('All done.  Now you can install using:');
    console.log('npm install '+path.resolve(pathto_dist));
    console.log('into other node projects');
    console.log('and require(\'opencv4nodejsdist\')');
    console.log(' - Note: it MUST be installed to operate post-install scripts');

}


if (process.argv.length > 2){
    if (process.argv.length == 3){
        var path_ocv4n = process.argv[2];
        var path_dist = path.resolve(__dirname, '../dist');
        createdist( path_ocv4n, path_dist );
        process.exit(0);
    } 
    if (process.argv.length == 4){
        var path_ocv4n = process.argv[2];
        var path_dist = process.argv[3];
        createdist( path_ocv4n, path_dist );
        process.exit(0);
    }
    console.log("please specify the path to opencv4nodejs, e.g. npm start c:/projects/opencv4nodejs")
    console.log("or the path to opencv4nodejs and destination, e.g. npm start c:/projects/opencv4nodejs c:/projects/dist");
} else {
    console.log("please specify the path to opencv4nodejs, e.g. npm start ../opencv4nodejs")
}

