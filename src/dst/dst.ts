import { DivisionByZeroError, InvalidOperatorError } from "../errors/errors";

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
  operator: "+" | "-" | "*" | "/";
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
  operator: "+" | "-" | "*" | "/";

  constructor(
    left: ASTNode,
    right: ASTNode,
    operator: "+" | "-" | "*" | "/"
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
        return leftVal + rightVal;
      case "-":
        return leftVal - rightVal;
      case "*":
        return leftVal * rightVal;
      case "/":
        if (rightVal === 0) {
          throw new DivisionByZeroError(
            leftVal,
            this.operator,
            rightVal,
          );
        }
        return leftVal / rightVal;
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



export { NumberNodeInstance, BinaryOperation };
