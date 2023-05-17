"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = __importDefault(require("./uniqueID"));
const timestamp_1 = __importDefault(require("./timestamp"));
function appendLogItem(log, messageData) {
    if (!messageData) {
        return log;
    }
    const { message, jobName, emit } = messageData;
    return [...log, {
            id: (0, uniqueID_1.default)(),
            message,
            jobName,
            timestamp: (0, timestamp_1.default)(),
            emit,
        }];
}
exports.default = appendLogItem;
//# sourceMappingURL=appendLogItem.js.map