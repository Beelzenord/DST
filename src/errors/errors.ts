export class DivisionByZeroError extends Error {
    constructor(left?: number, operator?: string, right?: number) {
        super(`Division by zero: ${left} ${operator} ${right}`);
        this.name = "DivisionByZeroError";
    }
}
export class InvalidOperatorError extends Error {
    constructor(operator?: string) {
        super(`Operator: ${operator}`);
        this.name = "InvalidOperatorError";
    }
}