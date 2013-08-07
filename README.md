RwDebug
=======

Simple utilities functions for debugging purpose

Using the RwDebug in your project
---------------------------------
You need to create a Debug object in your file and use its functions:
```
// require the module
var Debug = require("RwDebug");

// create the debug object
var debug = new Debug();

// TODO use the dub functonalities

```
Log a string to console
-----------------------

To log a string to console the function `print()`. Along with the string or variables, the function writes the file and line of code where it is called.
```
// prints on console
debug.print(myVar);
```

Log a string to file
--------------------
To log a string to console the function `log()`. Along with the string or variables, the function writes the file and line of code where it is called.
```
// prints on console
debug.log(myVar);
```
The file is craeate in the folder `/tmp`. The file name is the username of the machine appended with `_log.txt`. For exemple, for the user _rewop_ the file name is `rewop_log.txt`.

You can change the file where the debug module logs when creating the object. It accept a file name and will use it to log, isntead of the default file:
```
/ require the module
var Debug = require("RwDebug");

// create the debug object
var debug = new Debug("/var/myPersonalFile.txt");

// log a string in the file /var/myPersonalFile.txt
debug.log("This is my test");
```

Print the stack trace to console
---------------------------------
To print to console the stack trace at a given line of code, the function `printStack()` can be used.
```
debug.printStack();
```

Print the stack trace to file
-----------------------------
To print the stack trace in afile at a given line of code, the function `logStack()` can be used.
```
debug.logStack();
```
The file where it is printed is the same as for the `log()` function. To change the file where the log is printed, you can pass it when constructing the object.


