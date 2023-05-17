"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = __importDefault(require("./uniqueID"));
const timestamp_1 = __importDefault(require("./timestamp"));
function appendErrorItem(log, error) {
    return [
        ...log,
        {
            id: (0, uniqueID_1.default)(),
            message: error.message,
            jobName: "system",
            timestamp: (0, timestamp_1.default)(),
            emit: true,
        },
    ];
}
exports.default = appendErrorItem;
