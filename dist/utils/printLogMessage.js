"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printLogMessage(log) {
    const { message, jobName, emit } = log.slice(-1)[0];
    const shallEmit = emit;
    if (!shallEmit) {
        return undefined;
    }
    console.info(`[${jobName}] ${message}`);
}
exports.default = printLogMessage;
