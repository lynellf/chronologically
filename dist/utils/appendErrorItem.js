"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = __importDefault(require("./uniqueID"));
const timestamp_1 = __importDefault(require("./timestamp"));
function appendErrorItem(log, error) {
    var _a;
    return [
        ...log,
        {
            id: (0, uniqueID_1.default)(),
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "An unknown error has occured.",
            jobName: "system",
            timestamp: (0, timestamp_1.default)(),
            emit: true,
        },
    ];
}
exports.default = appendErrorItem;
//# sourceMappingURL=appendErrorItem.js.map