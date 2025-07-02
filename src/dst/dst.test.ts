import { NumberNodeInstance, BinaryOperation } from "./dst";
import { DivisionByZeroError } from "../errors/errors";

describe("ASTNode evaluation", () => {
  test("NumberNodeInstance returns its value", () => {
    const node = new NumberNodeInstance(42);
    expect(node.evaluate()).toBe(42);
  });

  test("BinaryOperation adds two numbers", () => {
    const left = new NumberNodeInstance(2);
    const right = new NumberNodeInstance(3);
    const op = new BinaryOperation(left, right, "+");
    expect(op.evaluate()).toBe(5);
  });

  test("BinaryOperation subtracts two numbers", () => {
    const left = new NumberNodeInstance(7);
    const right = new NumberNodeInstance(4);
    const op = new BinaryOperation(left, right, "-");
    expect(op.evaluate()).toBe(3);
  });

  test("BinaryOperation multiplies two numbers", () => {
    const left = new NumberNodeInstance(6);
    const right = new NumberNodeInstance(7);
    const op = new BinaryOperation(left, right, "*");
    expect(op.evaluate()).toBe(42);
  });

  test("BinaryOperation divides two numbers", () => {
    const left = new NumberNodeInstance(8);
    const right = new NumberNodeInstance(2);
    const op = new BinaryOperation(left, right, "/");
    expect(op.evaluate()).toBe(4);
  });


  test("BinaryOperation throws DivisionByZeroError when dividing by zero", () => {
    const left = new NumberNodeInstance(8);
    const right = new NumberNodeInstance(0);
    const op = new BinaryOperation(left, right, "/");
    expect(() => op.evaluate()).toThrow(DivisionByZeroError);
  });
});

describe("BinaryOperation with nested BinaryOperation nodes", () => {
  test("left and right are both BinaryOperation nodes", () => {
    // ((1 + 2) * (3 - 1)) = 6
    const left = new BinaryOperation(
      new NumberNodeInstance(1),
      new NumberNodeInstance(2),
      "+"
    );
    const right = new BinaryOperation(
      new NumberNodeInstance(3),
      new NumberNodeInstance(1),
      "-"
    );
    const root = new BinaryOperation(left, right, "*");
    expect(root.evaluate()).toBe(6);
  });

  test("right is a BinaryOperation node", () => {
    // 2 + (3 * 4) = 14
    const right = new BinaryOperation(
      new NumberNodeInstance(3),
      new NumberNodeInstance(4),
      "*"
    );
    const root = new BinaryOperation(new NumberNodeInstance(2), right, "+");
    expect(root.evaluate()).toBe(14);
  });

  test("left is a BinaryOperation node", () => {
    // (10 / 2) - 3 = 2
    const left = new BinaryOperation(
      new NumberNodeInstance(10),
      new NumberNodeInstance(2),
      "/"
    );
    const root = new BinaryOperation(left, new NumberNodeInstance(3), "-");
    expect(root.evaluate()).toBe(2);
  });

  test("print() with nested BinaryOperation nodes", () => {
    // (1 + 2) * (3 - 1)
    const left = new BinaryOperation(
      new NumberNodeInstance(1),
      new NumberNodeInstance(2),
      "+"
    );
    const right = new BinaryOperation(
      new NumberNodeInstance(3),
      new NumberNodeInstance(1),
      "-"
    );
    const root = new BinaryOperation(left, right, "*");
    expect(root.print()).toBe("1 + 2 * 3 - 1");
  });

  test("toJSON() with nested BinaryOperation nodes", () => {
    const left = new BinaryOperation(
      new NumberNodeInstance(1),
      new NumberNodeInstance(2),
      "+"
    );
    const right = new BinaryOperation(
      new NumberNodeInstance(3),
      new NumberNodeInstance(1),
      "-"
    );
    const root = new BinaryOperation(left, right, "*");
    const json = root.toJSON();
    expect(json).toHaveProperty("operator", "*");
    expect(json.left).toHaveProperty("operator", "+");
    expect(json.right).toHaveProperty("operator", "-");
  });
});