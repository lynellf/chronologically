"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasNoAsyncJobs = void 0;
function hasNoAsyncJobs(context) {
    return Boolean(context.config.jobs.find((job) => typeof job.waitOn !== "undefined"));
}
exports.hasNoAsyncJobs = hasNoAsyncJobs;
