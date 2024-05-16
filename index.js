//#region Call
// Create prototype for the call function
Function.prototype.myCall = function (other) {
    // Ensure that other is not null or undefined
    // MDN says that it should be global if it is
    other = other || global;

    // Generate a unique id (to avoid the case that other already has the property)
    var uniqueID = "00" + Math.random();
    while (other.hasOwnProperty(uniqueID)) {
        uniqueID = "00" + Math.random();
    }

    other[uniqueID] = this;
    const args = [];

    // Get all the arguments
    for (var i = 1, length = arguments.length; i < length; i++) {
        args.push(arguments[i]);
    }

    // Evaluate the result with the arguments
    var result = other[uniqueID](...args);

    // Remove the created property to prevent modifying other
    delete other[uniqueID];
    return result;
};

function concatMe(arg1, arg2, ...args) {
    return arg1 + "" + arg2 + args;
}

const hello = {
    hello: "Hello",
    world: ", World"
}

concatMe.myCall(hello, hello.hello, hello.world, "!");
//#endregion

//#region Apply

Function.prototype.myApply = function (other, arr) {
    other = other || global;

    // Generate a unique id (to avoid the case that other already has the property)
    var uniqueID = "00" + Math.random();
    while (other.hasOwnProperty(uniqueID)) {
        uniqueID = "00" + Math.random();
    }

    other[uniqueID] = this;
    const args = [];

    var result = null;
    // Make arr optional
    if (!arr) {
        result = other[uniqueID]();
    } else {
        // Get all the arguments
        for (var i = 1, length = arguments.length; i < length; i++) {
            args.push(arr[i]);
        }
        result = other[uniqueID](args);
    }
    delete other[uniqueID];
    return result;
}

//#endregion
//#region Bind

Function.prototype.myBind = function(newThis) {
    if (typeof this !== "function") {
        throw new Error("Cannot be bound");
    }
    var bound = this;

    var boundArgs = Array.prototype.slice.call(arguments, 1);

    return function boundFunc() {
        var targetArgs = Array.prototype.slice.call(arguments);
        return bound.apply(newThis, boundArgs.concat(targetArgs));
    };
}

//#endregion