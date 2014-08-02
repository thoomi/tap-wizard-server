////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
module.exports = exports = EventBus;

////////////////////////////////////////////////////////////////////////////////
/// Code from https://github.com/krasimir/EventBus
/// Copyright (c) 2014 Krasimir Tsonev
/// The MIT License (MIT)
////////////////////////////////////////////////////////////////////////////////
function EventBus () {
    this.listeners = {};
}

EventBus.prototype = {
    on:function(type, callback, scope) {
        var args = [];
        var numOfArgs = arguments.length;

        for(var i=0; i<numOfArgs; i++)
        {
            args.push(arguments[i]);
        }  

        args = args.length > 3 ? args.splice(3, args.length-1) : [];

        if(typeof this.listeners[type] !== 'undefined') 
        {
            this.listeners[type].push({scope:scope, callback:callback, args:args});
        }
        else 
        {
            this.listeners[type] = [{scope:scope, callback:callback, args:args}];
        }
    },

    off:function(type, callback, scope) {
        if(typeof this.listeners[type] !== 'undefined') 
        {
            var numOfCallbacks = this.listeners[type].length;
            var newArray = [];

            for(var i=0; i<numOfCallbacks; i++) 
            {
                var listener = this.listeners[type][i];
                if(listener.scope === scope && listener.callback === callback) 
                {
                    
                } 
                else 
                {
                    newArray.push(listener);
                }
            }

            this.listeners[type] = newArray;
        }
    },

    hasEventListener:function(type, callback, scope) {
        if(typeof this.listeners[type] !== 'undefined')
        {
            var numOfCallbacks = this.listeners[type].length;
            if(callback === undefined && scope === undefined)
            {
                return numOfCallbacks > 0;
            }

            for(var i=0; i<numOfCallbacks; i++) 
            {
                var listener = this.listeners[type][i];
                if((scope ? listener.scope === scope : true) && listener.callback === callback) 
                {
                    return true;
                }
            }
        }
        return false;
    },

    dispatch:function(type, target) {
        var numOfListeners = 0;

        var event = {
            type:type,
            target:target
        };

        var args = [];
        var numOfArgs = arguments.length;

        for(var indexOfArgument = 0; indexOfArgument < numOfArgs; indexOfArgument++)
        {
            args.push(arguments[indexOfArgument]);
        }  

        args = args.length > 2 ? args.splice(2, args.length-1) : [];
        args = [event].concat(args);

        if(typeof this.listeners[type] !== 'undefined') 
        {
            var numOfCallbacks = this.listeners[type].length;

            for(var i = 0; i < numOfCallbacks; i++) 
            {
                var listener = this.listeners[type][i];

                if(listener && listener.callback) 
                {                 
                    var concatArgs = args.concat(listener.args);
                    listener.callback.apply(listener.scope, concatArgs);
                    numOfListeners += 1;
                }
            }
        }
    },

    getEvents:function() {
        var str = "";
        for(var type in this.listeners) 
        {
            var numOfCallbacks = this.listeners[type].length;

            for(var i=0; i<numOfCallbacks; i++) 
            {
                var listener = this.listeners[type][i];
                str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
                str += " listen for '" + type + "'\n";
            }
        }
        return str;
    }
};