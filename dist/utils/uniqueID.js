"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
function uniqueID(size = 21) {
    return (0, nanoid_1.nanoid)(size);
}
exports.default = uniqueID;
