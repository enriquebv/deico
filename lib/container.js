"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isFunction = require("is-function");

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    this.dependencies = {};

    return new Proxy(this, {
      get: function get(target, name) {
        return name in target ? target[name] : target.get(name);
      }
    });
  }

  /**
   * Get a dependency from the container.
   * @param {String} name The name of the registered dependency.
   */


  _createClass(Container, [{
    key: "get",
    value: function get(name) {
      var dependencies = this.dependencies;


      if (dependencies[name] === undefined) {
        throw new Error("Dependecy " + name + " not exists in the container.");
      }

      var dependency = dependencies[name];

      return dependency.factory ? dependency.value(this) : dependency.value;
    }

    /**
     * Registers a dependency in the container.
     * @param {String} name The name to use the dependency later.
     * @param {Object} value The function who returns the dependency.
     */

  }, {
    key: "add",
    value: function add(name, value, factory) {
      var dependencies = this.dependencies;


      if (name === undefined || value === undefined) {
        throw new Error("You need to provide a name and a value/factory function to register a dependency.");
      }

      if (name === "add" || name === "addFactory" || name === "remove" || name === "update" || name === "get") {
        throw new Error("Can't register " + name + " as dependency, it's a container reserved keword.");
      }

      if (dependencies[name] !== undefined) {
        throw new Error("Dependecy " + name + " is already in the container. Use container method \"udpate\" to override the factory of " + name + ".");
      }

      if ((0, _isFunction2.default)(value) && value(this) === undefined) {
        throw new Error("Dependecy " + name + " anonymous function don't return nothing, or returns undefined. Avoid register useless dependencies.");
      }

      dependencies[name] = {
        name: name,
        value: (0, _isFunction2.default)(value) && !factory ? value(this) : value,
        factory: factory === true
      };
    }
  }, {
    key: "addFactory",
    value: function addFactory(name, value) {
      this.add(name, value, true);
    }

    /**
     * Removes a depedency from the container.
     * @param {String} name The name of the dependency to remove it.
     */

  }, {
    key: "remove",
    value: function remove(name) {
      var dependencies = this.dependencies;


      if (dependencies[name] === undefined) {
        throw new Error("Dependecy " + name + " not exists in the container.");
      }

      delete dependencies[name];
    }
  }]);

  return Container;
}();

exports.default = Container;