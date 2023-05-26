"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Left = exports.Right = void 0;
class Right {
    constructor(value) {
        this.right = value;
    }
    static create(value) {
        return new Right(value);
    }
}
exports.Right = Right;
class Left {
    constructor(value) {
        this.left = value;
    }
    static create(value) {
        return new Left(value);
    }
}
exports.Left = Left;
//# sourceMappingURL=either.js.map