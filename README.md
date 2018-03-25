# opencv4nodjejsdist
Binary Dist creator for opencv4nodejs

**The ultimate goal of this project is to produce a local binary distribution of the excellent opencv4nodejs for use on the same of a very similar machine to the original build machine.  Note that OpenCV builds May not be compatible across machines.

**usage:

**build a local opencv4nodejs

**install this project and run with

**npm start <path to opencv4nodejs>

**or npm start <path to opencv4nodejs> <path to destination>

**if not destination is specified, then it will create the binary distribution in <path to oopenscv4nodejsdistcreate>/dist/

** once the binary distribution is created, use npm install <path to dist> to install the distribution into your project.  Your project may be on the same or a  very similar machine (depending on how opencv built).  The binary is ~115Mbytes, compared to a full opencv4nodejs install of ~4Gbytes.

