import isFunction from "is-function";

export default class Container {
  constructor() {
    this.dependencies = {};
    return this;
  }

  /**
   * Get a dependency from the container.
   * @param {String} name The name of the registered dependency.
   */
  get(name) {
    const { dependencies } = this;

    if (dependencies[name] === undefined) {
      throw new Error(`Dependecy ${name} not exists in the container.`);
    }

    const dependency = dependencies[name];

    return dependency.factory ? dependency.value(this) : dependency.value;
  }

  /**
   * Registers a dependency in the container.
   * @param {String} name The name to use the dependency later.
   * @param {Object} value The function who returns the dependency.
   */
  add(name, value, factory) {
    const { dependencies } = this;

    if (name === undefined || value === undefined) {
      throw new Error(
        `You need to provide a name and a value/factory function to register a dependency.`
      );
    }

    if (
      name === "add" ||
      name === "addFactory" ||
      name === "remove" ||
      name === "update" ||
      name === "get"
    ) {
      throw new Error(
        `Can't register ${name} as dependency, it's a container reserved keword.`
      );
    }

    if (dependencies[name] !== undefined) {
      throw new Error(
        `Dependecy ${name} is already in the container. Use container method "udpate" to override the factory of ${name}.`
      );
    }

    if (isFunction(value) && value(this) === undefined) {
      throw new Error(
        `Dependecy ${name} anonymous function don't return nothing, or returns undefined. Avoid register useless dependencies.`
      );
    }

    dependencies[name] = {
      name,
      value:
        isFunction(value) && !factory
          ? value.call(value, this)
          : value.bind(value),
      factory: factory === true
    };
  }

  addFactory(name, value) {
    this.add(name, value, true);
  }

  /**
   * Removes a depedency from the container.
   * @param {String} name The name of the dependency to remove it.
   */
  remove(name) {
    const { dependencies } = this;

    if (dependencies[name] === undefined) {
      throw new Error(`Dependecy ${name} not exists in the container.`);
    }

    delete dependencies[name];
  }
}
