/*jslint node: true */
"use strict";

const RpnStack = require("./rpn-stack");
const Registry = require("./operator-registry");
const _ = require("lodash");

class Calculator {
  constructor() {
    const self = this;

    function initializeRegistry() {
      const registry = new Registry();
      registry.registerHandler("+", require("./operators/addition-operator"));
      registry.registerHandler(
        "*",
        require("./operators/multiplication-operator")
      );
      registry.registerHandler(
        "x",
        require("./operators/multiplication-operator")
      );
      registry.registerHandler("/", require("./operators/division-operator"));
      registry.registerHandler(
        "-",
        require("./operators/subtraction-operator")
      );

      return registry;
    }

    self.numbers = new RpnStack();
    self.operatorRegistry = initializeRegistry();
  }

  peek() {
    const self = this;
    return self.numbers.peek();
  }

  enter(operand) {
    const self = this;

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (!isNumber(operand)) {
      throw new Error("Cannot enter non-numeric values");
    }

    self.numbers.push(operand);

    return operand;
  }

  perform(operatorCharacter) {
    const self = this;
    const operator = self.operatorRegistry.getOperatorMethod(operatorCharacter);

    if (!operator) {
      throw new Error("Unknown operator '" + operatorCharacter + "'");
    }

    let result = operator(self.numbers);
    return result;
  }

  calculate(buffer) {
    const self = this;
    let lastResult = 0;

    let bufferArray = buffer.split(" ");
    _.each(bufferArray, function (value) {
      lastResult = self.enterValue(value);
    });
    return lastResult;
  }

  enterValue(value) {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (value === "") {
      return 0;
    } else if (isNumber(value)) {
      return this.enter(Number(value));
    } else {
      return this.perform(value);
    }
  }
}

module.exports = Calculator;
