"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timestamp() {
    const now = new Date();
    return now.toISOString();
}
exports.default = timestamp;
