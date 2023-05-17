"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printLogMessage(log) {
    const hasItems = log.length > 0;
    if (!hasItems) {
        return undefined;
    }
    const { message, jobName, emit } = log.slice(-1)[0];
    const shallEmit = emit;
    if (!shallEmit) {
        return undefined;
    }
    console.info(`[${jobName}] ${message}`);
}
exports.default = printLogMessage;
//# sourceMappingURL=printLogMessage.js.map