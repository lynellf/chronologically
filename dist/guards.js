"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasNoAsyncTasks = void 0;
function hasNoAsyncTasks(context) {
    return context.config.jobs.filter((job) => typeof job.waitOn !== "undefined")
        .length === 0;
}
exports.hasNoAsyncTasks = hasNoAsyncTasks;
//# sourceMappingURL=guards.js.map