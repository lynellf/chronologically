"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueid_1 = __importDefault(require("uniqueid"));
function uniqueID(size = 21) {
    return (0, uniqueid_1.default)()();
}
exports.default = uniqueID;
