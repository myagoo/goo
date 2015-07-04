'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var cascade = function cascade(funcs) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return Promise.resolve(funcs.length ? funcs.shift().apply(undefined, args) : args[0]).then(function () {
        for (var _len2 = arguments.length, newArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            newArgs[_key2] = arguments[_key2];
        }

        return funcs.length ? cascade.apply(undefined, [funcs].concat(_toConsumableArray(newArgs || args))) : newArgs[0] || args[0];
    });
};

var Goo = (function () {
    function Goo(doFunction) {
        _classCallCheck(this, Goo);

        this.doFunction = doFunction;
        this.events = {};
    }

    _createClass(Goo, [{
        key: 'on',
        value: function on(eventName, eventHandler) {
            if (this.events[eventName] === undefined) {
                this.events[eventName] = [];
            }
            return this.events[eventName].push(eventHandler.bind(this));
        }
    }, {
        key: 'trigger',
        value: function trigger(eventName, eventData) {
            if (this.events[eventName] === undefined) {
                this.events[eventName] = [];
            }
            return cascade(this.events[eventName], eventData);
        }
    }, {
        key: 'before',
        value: function before(beforeFunction) {
            return this.on('beforeDo', beforeFunction);
        }
    }, {
        key: 'after',
        value: function after(afterFunction) {
            return this.on('afterDo', afterFunction);
        }
    }, {
        key: 'do',
        value: function _do() {
            var funcs = [this.trigger.bind(this, 'beforeDo'), this.doFunction, this.trigger.bind(this, 'afterDo')];

            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return cascade.apply(undefined, [funcs].concat(args));
        }
    }]);

    return Goo;
})();

exports['default'] = Goo;
module.exports = exports['default'];
