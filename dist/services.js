"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importConfig = exports.pollResources = exports.startJobs = void 0;
const wait_on_1 = __importDefault(require("wait-on"));
const promises_1 = require("node:fs/promises");
const path_1 = require("path");
const startJob_1 = __importDefault(require("./utils/startJob"));
const timestamp_1 = __importDefault(require("./utils/timestamp"));
function startJobs(type = "sync") {
    return (context, _event) => (sendEvent) => __awaiter(this, void 0, void 0, function* () {
        const jobs = type === "sync"
            ? context.config.jobs.filter((job) => !Boolean(job.waitOn))
            : context.config.jobs.filter((job) => Boolean(job.waitOn));
        jobs.forEach((job) => {
            var _a, _b;
            const jobProcess = (0, startJob_1.default)(job);
            const jobName = job.name;
            (_a = jobProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", (data) => {
                var _a;
                return sendEvent({
                    type: "JOB_MESSAGE",
                    data: {
                        message: data.toString(),
                        jobName,
                        emit: (_a = job.messageForwarding) === null || _a === void 0 ? void 0 : _a.includes("message"),
                        timestamp: (0, timestamp_1.default)(),
                    },
                });
            });
            (_b = jobProcess.stderr) === null || _b === void 0 ? void 0 : _b.on("data", (data) => {
                var _a;
                return sendEvent({
                    type: "JOB_WARNING",
                    data: {
                        message: data.toString(),
                        jobName,
                        emit: (_a = job.messageForwarding) === null || _a === void 0 ? void 0 : _a.includes("warning"),
                        timestamp: (0, timestamp_1.default)(),
                    },
                });
            });
            jobProcess.on("close", () => sendEvent({ type: "JOB_CLOSE" }));
        });
    });
}
exports.startJobs = startJobs;
function pollResources(context, _event) {
    return __awaiter(this, void 0, void 0, function* () {
        const asyncJobs = context.config.jobs.filter((job) => Boolean(job.waitOn));
        return yield Promise.allSettled(asyncJobs.map((job) => (0, wait_on_1.default)(job.waitOn)));
    });
}
exports.pollResources = pollResources;
function importConfig(_context, _event) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const configPath = (_a = process.argv.slice(2)) === null || _a === void 0 ? void 0 : _a.at(0);
        if (!configPath) {
            throw new Error("No configuration file path defined as an argument!");
        }
        try {
            const configRaw = yield (0, promises_1.readFile)((0, path_1.join)(process.cwd(), configPath), "utf-8");
            return JSON.parse(configRaw);
        }
        catch (error) {
            throw new Error("Unable to load configuration file. Ensure it is a json file.");
        }
    });
}
exports.importConfig = importConfig;
