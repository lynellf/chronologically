"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
function startJob(job) {
    var _a, _b;
    return (0, node_child_process_1.spawn)(job.command, (_a = job.args) !== null && _a !== void 0 ? _a : [], (_b = job.options) !== null && _b !== void 0 ? _b : {});
}
exports.default = startJob;
//# sourceMappingURL=startJob.js.map