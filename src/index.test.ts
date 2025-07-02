import { NumberNodeClass, BinaryOperation } from "./index";
import { DivisionByZeroError } from "./errors/errors";

describe("ASTNode evaluation", () => {
  test("NumberNodeClass returns its value", () => {
    const node = new NumberNodeClass(42);
    expect(node.evaluate()).toBe(42);
  });

  test("BinaryOperation adds two numbers", () => {
    const left = new NumberNodeClass(2);
    const right = new NumberNodeClass(3);
    const op = new BinaryOperation(left, right, "+");
    expect(op.evaluate()).toBe(5);
  });

  test("BinaryOperation subtracts two numbers", () => {
    const left = new NumberNodeClass(7);
    const right = new NumberNodeClass(4);
    const op = new BinaryOperation(left, right, "-");
    expect(op.evaluate()).toBe(3);
  });

  test("BinaryOperation multiplies two numbers", () => {
    const left = new NumberNodeClass(6);
    const right = new NumberNodeClass(7);
    const op = new BinaryOperation(left, right, "*");
    expect(op.evaluate()).toBe(42);
  });

  test("BinaryOperation divides two numbers", () => {
    const left = new NumberNodeClass(8);
    const right = new NumberNodeClass(2);
    const op = new BinaryOperation(left, right, "/");
    expect(op.evaluate()).toBe(4);
  });


  test("BinaryOperation throws DivisionByZeroError when dividing by zero", () => {
    const left = new NumberNodeClass(8);
    const right = new NumberNodeClass(0);
    const op = new BinaryOperation(left, right, "/");
    expect(() => op.evaluate()).toThrow(DivisionByZeroError);
  });
}); 