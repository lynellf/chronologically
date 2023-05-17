"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function killProcess() {
    process.kill(process.pid, "SIGTERM");
}
exports.default = killProcess;
