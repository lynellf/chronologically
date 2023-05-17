"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasNoAsyncJobs = void 0;
function hasNoAsyncJobs(context) {
    var _a, _b;
    return Boolean((_b = (_a = context === null || context === void 0 ? void 0 : context.config) === null || _a === void 0 ? void 0 : _a.jobs) === null || _b === void 0 ? void 0 : _b.find((job) => typeof job.waitOn !== "undefined"));
}
exports.hasNoAsyncJobs = hasNoAsyncJobs;
