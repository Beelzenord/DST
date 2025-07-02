import { DivisionByZeroError, InvalidOperatorError } from "./errors/errors";

//Interfaces
interface ASTNode {
  evaluate(): number;
  print(): string;
}
interface NumberNode extends ASTNode {
  value: number;
}

interface BinaryOperationNode extends ASTNode {
  left: ASTNode;
  right: ASTNode;
  operator: "+" | "-" | "*" | "/" | "<" | ">";
}
//Classes
/**
 * Represents a numeric node in the AST.
 * Implements NumberNode and provides evaluate, print, and toJSON methods.
 */
class NumberNodeInstance implements NumberNode {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  evaluate(): number {
    return this.value;
  }
  print(): string {
    return this.value.toString();
  }

  toJSON() {
    return {
      value: this.value,
    };
  }
}

/**
 * Represents a binary operation node in the AST (e.g., +, -, *, /).
 * Recursively evaluates left and right AST nodes and applies the operator.
 */
class BinaryOperation implements BinaryOperationNode {
  left: ASTNode;
  right: ASTNode;
  operator: "+" | "-" | "*" | "/" | "<" | ">";

  constructor(
    left: ASTNode,
    right: ASTNode,
    operator: "+" | "-" | "*" | "/" | "<" | ">",
  ) {
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  evaluate(): number {
    //will execute recursively if it is nested expression
    const leftVal = this.left.evaluate();
    const rightVal = this.right.evaluate();

    switch (this.operator) {
      case "+":
        return (leftVal as number) + (rightVal as number);
      case "-":
        return (leftVal as number) - (rightVal as number);
      case "*":
        return (leftVal as number) * (rightVal as number);
      case "/":
        if (rightVal === 0) {
          throw new DivisionByZeroError(
            leftVal as number,
            this.operator,
            rightVal,
          );
        }
        return (leftVal as number) / (rightVal as number);
      default:
        throw new InvalidOperatorError("Invalid Operation");
    }
  }

  print(): string {
    return this.left.print() + " " + this.operator + " " + this.right.print();
  }
  toJSON() {
    return {
      operator: this.operator,
      left: this.left,
      right: this.right,
    };
  }
}

const thing2 = new BinaryOperation(
  new NumberNodeInstance(3),
  new NumberNodeInstance(4),
  "-",
);
const node2 = new BinaryOperation(
  new NumberNodeInstance(10),
  new NumberNodeInstance(10),
  "-",
);
const node1 = new BinaryOperation(new NumberNodeInstance(2), node2, "/");
const node3 = new BinaryOperation(node1, new NumberNodeInstance(3), "+");
const thing = new BinaryOperation(thing2, new NumberNodeInstance(1), "+");
console.log(JSON.stringify(node3.toJSON(), null, 2));
console.log(node3.evaluate());

export { NumberNodeInstance as NumberNodeClass, BinaryOperation };
