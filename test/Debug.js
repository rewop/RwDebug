// crete the debug objects
var Debug = require("../libs/Debug.js");
var debug = new Debug();

// try to log
debug.log({obj: "prova", test : ["prova", "prova"]});

// try to log a stack
debug.logStack();

// try to print
debug.print({obj: "prova", test : ["prova", "prova"]});

// try to print a trace
debug.printStack();