/**
 * Horrendously simple routing logic.
 * If you need help understanding this
 * here: wdkjahkjdwqbuiqb21bei
 * kieranallen.com / @kieranjallen
 */

var Routr = (function() {

    /*
     * List of the beautiful routes that you've 
     * built up. Aw.
     * @type {Array}
     */
    var $routes = [];
    
    /*
     * The string to test the routes against.
     * Will most likely be something magical.
     * @type {String}
     */
    var $url;
    
    /**
     * This is da boss of the code.
     * It's works essentially like most good managers
     * Takes the work, then delegates it.
     * Got a problem? Tough.
     * @returns {Boolean}
     */
    function _process()
    {
        // Magical loopy goodness
        for (var i=0;i<$routes.length;i++) {
            var res = _singleTestCase($routes[i], $url, true);
            if (res) {
                return res;
            }
        }
        
        // no matches
        return false;
    }
    
    /**
     * Alright, let's test this string against the added routes.
     *
     * @param {String} expression
     * @param {String} victim
     * @param {Boolean} invoke_callback
     * @returns {Boolean}
     */
    function _singleTestCase(route, victim, invoke_callback)
    {
        // default please!
        invoke_callback = typeof invoke_callback !== 'undefined' ? invoke_callback : true;       
        
        // Is it a match?
        var matches = victim.match(new RegExp(route.expression,''));
        
        // Is this a valid route?
        if (matches) {
            // Throw off the first result.
            // Thats the original content the match was made against.
            matches.shift();

            // Have we been asked to hit up the callback? yo'
            if (invoke_callback) {
                // Slice this shit up
                var args = Array.prototype.slice.call(matches, 0);

                // Now, invoke the callback function with the params
                // discard the response, as we wont need it.
                route.callback.apply(route.callback, args);
            }
            
            // Alwayzzz
            return true;
        }
        
        // Default response
        return false;
    }
    
    /**
     * I HAVE MORE WORK FOR THE MANAGER.
     * Yep...
     * @param {String} route
     * @param {Closure} fn
     * @returns {undefined}
     */
    function _addRoute(route, fn)
    {
        // push it!
        $routes.push({
            expression: route, 
            callback: fn
        });
    }
    
    /**
     * The string to test against - most likely
     * a relative path.
     * @param {String} src
     * @returns {undefined}
     */
    function _setRouterSource(src)
    {
        $url = src;
    }
    
    /**
     * Oh - you beautiful publically facing functions.
     * 
     * @param {type} src
     * @returns {undefined}
     */

    return { // public interface
        init: function (src) {
            _setRouterSource(src);
            return _process();
        },

        route: function(expression, callback)
        {
            if (typeof callback !== 'function') {
                // tell the suer somehow>
            } else {
                _addRoute(expression, callback);
            }
        },
                
        clearAllRoutes: function()
        {
            $routes = [];
        }
    };
})();