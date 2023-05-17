"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLog = exports.printErrorMessage = exports.endTasks = exports.printMessage = exports.appendErrorMessage = exports.appendMessage = exports.setConfiguration = exports.setError = void 0;
const xstate_1 = require("xstate");
const appendErrorItem_1 = __importDefault(require("./utils/appendErrorItem"));
const appendLogItem_1 = __importDefault(require("./utils/appendLogItem"));
const printLogMessage_1 = __importDefault(require("./utils/printLogMessage"));
const printError_1 = __importDefault(require("./utils/printError"));
const killProcess_1 = __importDefault(require("./utils/killProcess"));
const saveLog_1 = __importDefault(require("./utils/saveLog"));
exports.setError = (0, xstate_1.assign)({
    error: (_context, event) => event.data,
});
exports.setConfiguration = (0, xstate_1.assign)({
    config: (_context, event) => event.data,
});
exports.appendMessage = (0, xstate_1.assign)({
    log: (context, event) => (0, appendLogItem_1.default)(context.log, event.data),
});
exports.appendErrorMessage = (0, xstate_1.assign)({
    log: (context, event) => (0, appendErrorItem_1.default)(context.log, event.data),
});
const printMessage = (context) => (0, printLogMessage_1.default)(context.log);
exports.printMessage = printMessage;
const endTasks = () => (0, killProcess_1.default)();
exports.endTasks = endTasks;
const printErrorMessage = (context) => (0, printError_1.default)(context.error);
exports.printErrorMessage = printErrorMessage;
const saveLog = (context) => {
    (0, saveLog_1.default)(context);
};
exports.saveLog = saveLog;
