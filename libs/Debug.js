/**
 * Debugging utility module.
 *
 * @module RwDebug
 */

var FileName = require("RwUtils").Types.FileName;
var winston = require("winston");
var stackTrace = require("traceback");

/**
 * Debug class. It provides debugging utility
 *
 * @class Debug
 * @constructor
 * @param {string} file     the absolute path of the file name
 */
function Debug (filename) {

    // get the file name
    filename = FileName.parse(filename) || FileName.parse(Debug.DEFAULT_FILE);

    // prepare the logger for the console
    var consoleLogger = new (winston.Logger)({
        transports: [new (winston.transports.Console)()]
    });

    // prepare the logger the file
    var fileLogger = new (winston.Logger)({
        transports: [new (winston.transports.File)({
            filename: filename.absolutePath(),
            json: false,
            timestamp: false
        })]
    });

    /**
     * Logs in the file the message. Interpolation can not be used.
     * Along with the messages, stores the file, and line where the log happened.
     *
     * @param {string} message
     */
    this.log = function __log(arg) {

        // log the message
        fileLogger.log('info', varToPrint(arg, stackTrace().slice(1)));
    }

    /**
     * Prints to console the message. Interpolation can be used.
     * Along with the messages, stores the file, and line where the log happened.
     *
     * @param {string} message
     */
    this.print = function __print(arg) {
        consoleLogger.log('info', varToPrint(arg, stackTrace().slice(1)));
    }

    /**
     * Logs in the FILE the stack trace at the moment this function is called.
     * Along with the messages, stores the file, and line where the log happened.
     */
    this.logStack = function __logStack() {
        fileLogger.log("info", stackToPrint(stackTrace().slice(1)));
    }

    /**
     * Prints to console the stack trace at the moment this function is called.
     * Along with the messages, stores the file, and line where the log happened.
     *
     */
    this.printStack = function __printStack() {
        consoleLogger.log("info", stackToPrint(stackTrace().slice(1)));
    }

}

/**
 * Private helper to create the string to print out.
 *
 * @param {*} arg the variable to print
 * @param {object} stack the stack trace to be used to printo info about the file
 * @return {string}
 */
function varToPrint(arg, stack) {

    // the file name
    var fileName = stack[0].file;

    // the line number
    var lineNumber = stack[0].line;

    // build and return the string
    return fileName+"@"+lineNumber+": "+type(arg)+" "+value(arg);
}

/**
 * Private helper to create the string from a stack trace
 *
 * @param {object} stack the stack to be printed
 * @returns {string}
 */
function stackToPrint(stack) {

    // the file name
    var fileName = stack[0].file;

    // the line number
    var lineNumber = stack[0].line;

    // construct the stack string
    var stackString = "Trace: debug trace \n";
    stack.forEach(function (stackItem) {

        // write the stack in teh variable
        stackString += "   at: "
        stackString += stackItem.name || "undefined";
        stackString += " ("+stackItem.path+":"+stackItem.line+":"+stackItem.col+")\n";
    });

    // build and return the string
    return fileName+"@"+lineNumber+": "+stackString;
}

/**
 * Private helper that returns the type of a variable between squared brackets. In case the variable is an object,
 * it returns the name of the object, prepended with the string Object.
 *
 * For example, if the Object is of type Function, it returns the string '[object Function]'.
 *
 * @param {*} arg the variable to check
 * @returns {string}
 */
function type(arg) {

    // is it undefined?
    if (arg === undefined) return "["+undefined+"]";

    // is the argument null?
    if (arg === null) return "[null]";

    // is it an object?
    if (typeof arg === "object") return "[object "+arg.constructor.name+"]";

    // we can return the primitive type
    return typeof arg;
}

/**
 * Private helper to get the value of a variable.
 *
 * @param {*} arg
 * @return {string}
 */
function value(arg) {

    // do we have an argument?
    if (arg === undefined || arg === null) return "";

    // is the argument an object?
    if (typeof arg === "object") return JSON.stringify(arg, null, 2);

    // return the value of the arg
    return new String(arg);
}

/**
 * Constant that stores the default file where the debug messags should be logged
 * @type {string} FILE
 */
Debug.DEFAULT_FILE = "/tmp/"+process.env["USER"]+"_log.txt";

// export the module
module.exports = Debug;

