import { NumberNodeInstance,BinaryOperation } from "./dst/dst";

const node = new BinaryOperation(new NumberNodeInstance(1), new NumberNodeInstance(3),"+");

console.log(JSON.stringify(node));