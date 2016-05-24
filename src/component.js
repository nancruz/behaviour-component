(function (global) {
    'use strict';

    global.UIComponent = function (params, behaviour) {
        var state = null;
        var actions = {};
        var dom = null;
        var Component = function () {
            state = _initState(params.state);
            if (!params.root) {
                throw 'The root property is not defined in the parameters object.'
            }
        };
        Component.prototype = behaviour;
        Component.prototype.create = function (parentSelector, html) {
            if (!parentSelector) {
                throw 'Cannot create the the component. Missing parentSelector.'
            }
            var parentElem = document.querySelector(parentSelector);
            if (!parentElem) {
                throw 'Cannot create the component. Parent element does not exists.'
            }
            if (html) {
                var elem;
                if ((typeof html) === "string") {
                    elem = document.createRange().createContextualFragment(html);
                } else {
                    elem = html;
                }
                parentElem.appendChild(elem);
            }
            if(params.root === parentSelector){
                dom = parentElem;
            } else {
                dom = parentElem.querySelector(params.root);
                if (!dom) {
                    throw 'Could not find the root element inside the parent element.';
                }
            }            
            _addEventListeners.call(this, params.events);
            if (this.initialize) {
                this.initialize();
            }
            return this;
        };
        Component.prototype.dispose = function (isToRemoveDom) {
            while (dom.hasChildNodes()) {
                dom.removeChild(dom.firstChild);
            }
            state = {};
            actions = {};
            if (isToRemoveDom) {
                dom.remove();
            }
        }
        Component.prototype.triggerAction = function (actionName) {
            if (arguments.length == 0) {
                throw 'Could not trigger an action. A name should not be supplied.';
            }
            var actionName = arguments[0];
            var params = [].slice.call(arguments, 1);
            if (actions[actionName]) {
                actions[actionName].forEach(function (cb) {
                    cb.apply(null, params);
                });
            };
            return this;
        }
        Component.prototype.listenTo = function (actionName, cb) {
            if (!actions[actionName]) {
                actions[actionName] = [cb];
            } else {
                actions[actionName].push(cb);
            }
            return this;
        }
        Component.prototype.getElement = function (elem) {
            var elem = dom.querySelector("[data-ref='" + elem + "']");
            if (!elem) {
                throw 'Could not find ' + elem;
            }
            return elem;
        }
        Component.prototype.getElements = function (elem) {
            var elems = dom.querySelectorAll("[data-ref='" + elem + "']");
            if (!elem) {
                throw 'Could not find ' + elem;
            }
            return elems;
        }
        Component.prototype.getState = function () {
            return _cloneObject(state);
        }
        Component.prototype.setState = function (obj) {
            if (typeof obj !== 'object') {
                throw 'Could not set state. Expecting a parameter of type Object';
            }
            for (var attr in obj) {
                if (state.hasOwnProperty(attr)) {
                    state[attr] = _cloneObject(obj[attr]);
                }
            }
            return _cloneObject(state);
        }
        /* Auxiliary functions */
        function _addEventListeners(events) {
            events.forEach(function (event) {
                var elems = dom.querySelectorAll('[data-ref=' + event.el + ']');
                [].forEach.call(elems, function (elem) {
                    event.on.forEach(function (e) {
                        if (!this[e.handler]) {
                            throw 'The method ' + e.handler + 'is not implemented!';
                        }
                        elem.addEventListener(e.name, this[e.handler].bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
        function _initState(stateObj) {
            if (typeof stateObj !== 'object') {
                throw 'The state object is not an instance of Object';
            }
            return _cloneObject(stateObj);
        }
        function _cloneObject(obj) {
            if (obj === null || typeof obj !== 'object' || obj.nodeType) {
                return obj;
            }
            var newObj;
            if (obj instanceof Array) {
                newObj = [];
                obj.forEach(function (item) {
                    newObj.push(_cloneObject(item));
                });
            } else if (obj instanceof Object) {
                newObj = {};
                for (var attr in obj) {
                    newObj[attr] = _cloneObject(obj[attr]);
                }
            } else {
                throw 'Type not recognized for argument: ' + obj;
            }
            
            return newObj;
        }
        return Component;
    };

})(window || {})
