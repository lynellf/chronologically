"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
const constants_1 = require("./utils/constants");
const guards_1 = require("./guards");
const actions_1 = require("./actions");
const services_1 = require("./services");
const defaultConfig = {
    logOutDir: constants_1.CWD,
    jobs: [],
};
const chronosMachine = (0, xstate_1.createMachine)({
    id: "Chronos Machine",
    context: {
        config: defaultConfig,
        log: [],
    },
    initial: "Init",
    states: {
        "Starting Sync Jobs": {
            entry: "setConfiguration",
            invoke: {
                src: "startSyncJobs",
                onDone: [
                    {
                        target: "Running",
                        cond: "hasNoAsyncTasks",
                    },
                    {
                        target: "Polling Servers",
                    },
                ],
                onError: [
                    {
                        target: "Error",
                    },
                ],
            },
        },
        "Starting Async Jobs": {
            entry: ["appendMessage", "printMessage"],
            invoke: {
                src: "startAsyncJobs",
                onDone: [
                    {
                        target: "Running",
                    },
                ],
                onError: [
                    {
                        target: "Error",
                    },
                ],
            },
            on: {
                TASK_MESSAGE: {},
                TASK_WARNING: {},
                TASK_CLOSE: {
                    target: "Closed",
                },
            },
        },
        Error: {
            entry: ["appendErrorMessage", "printErrorMessage", "saveLog", "endTasks"],
            type: "final",
        },
        "Polling Servers": {
            entry: ["appendMessage", "printMessage"],
            invoke: {
                src: "pollServers",
                onDone: [
                    {
                        target: "Starting Async Jobs",
                    },
                ],
                onError: [
                    {
                        target: "Error",
                    },
                ],
            },
            on: {
                TASK_MESSAGE: {
                    target: "Polling Servers",
                    internal: false,
                },
                TASK_WARNING: {
                    target: "Polling Servers",
                    internal: false,
                },
                TASK_CLOSE: {
                    target: "Closed",
                },
            },
        },
        Init: {
            description: "Load and parse the configuration file",
            invoke: {
                src: "importConfig",
                onDone: [
                    {
                        target: "Starting Sync Jobs",
                    },
                ],
                onError: [
                    {
                        target: "Error",
                    },
                ],
            },
        },
        Running: {
            entry: ["appendMessage", "printMessage"],
            on: {
                TASK_MESSAGE: {},
                TASK_WARNING: {},
                TASK_CLOSE: {
                    target: "Error",
                },
            },
        },
        Closed: {
            entry: ["saveLog", "endTasks"],
            type: "final",
        },
    },
    schema: {
        context: {},
        events: {},
    },
}, {
    actions: {
        setError: actions_1.setError,
        setConfiguration: actions_1.setConfiguration,
        appendMessage: actions_1.appendMessage,
        printMessage: actions_1.printMessage,
        endJobs: actions_1.endJobs,
        printErrorMessage: actions_1.printErrorMessage,
    },
    guards: {
        hasNoAsyncJobs: guards_1.hasNoAsyncJobs,
    },
    services: {
        startSyncJobs: (0, services_1.startJobs)("sync"),
        startAsyncJobs: (0, services_1.startJobs)("async"),
        pollResources: services_1.pollResources,
        importConfig: services_1.importConfig,
    },
});
(0, xstate_1.interpret)(chronosMachine).start();
