# opencv4nodjejsdistcreate
Binary Dist creator for opencv4nodejs

**The ultimate goal of this project is to produce a local binary distribution of the excellent opencv4nodejs for use on the same of a very similar machine to the original build machine.  Note that OpenCV builds May not be compatible across machines.**

**usage:**

**build a local opencv4nodejs**

**install this project and run with**

**npm start ```pathtoopencv4nodejs```**

**or npm start ```pathtoopencv4nodejs``` ```pathtodestination```**

**if not destination is specified, then it will create the binary distribution in ```pathtoopenscv4nodejsdistcreate```/dist/**

**once the binary distribution is created, use npm install ```pathtodist``` to install the distribution into your project.  Your project may be on the same or a  very similar machine (depending on how opencv built).  The binary is ~115Mbytes, compared to a full opencv4nodejs install of ~4Gbytes.**

**note: you must ```cv = require('opencv4nodejsdist')``` in your project to use tthe dist verison. e.g.:**

```
try{
  cv = require('opencv4nodejsdist');
} catch(e) {
  cv = require('opencv4nodejs');
}
```

