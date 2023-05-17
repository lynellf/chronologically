"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLog = exports.printErrorMessage = exports.endJobs = exports.printMessage = exports.appendMessage = exports.setConfiguration = exports.setError = void 0;
const xstate_1 = require("xstate");
const appendLogItem_1 = __importDefault(require("./utils/appendLogItem"));
const printLogMessage_1 = __importDefault(require("./utils/printLogMessage"));
const printError_1 = __importDefault(require("./utils/printError"));
const killProcess_1 = __importDefault(require("./utils/killProcess"));
exports.setError = (0, xstate_1.assign)({
    error: (_context, event) => event.data,
});
exports.setConfiguration = (0, xstate_1.assign)({
    config: (_context, event) => event.data,
});
exports.appendMessage = (0, xstate_1.assign)({
    log: (context, event) => (0, appendLogItem_1.default)(context.log, event.data),
});
const printMessage = (context) => (0, printLogMessage_1.default)(context.log);
exports.printMessage = printMessage;
const endJobs = () => (0, killProcess_1.default)();
exports.endJobs = endJobs;
const printErrorMessage = (context) => (0, printError_1.default)(context.error);
exports.printErrorMessage = printErrorMessage;
const saveLog = (context) => {
};
exports.saveLog = saveLog;
