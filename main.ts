import type { Context, Events } from "./types";
import { createMachine, interpret } from "xstate";
import { CWD } from "./utils/constants";
import { hasNoAsyncJobs } from "./guards";
import {
  appendMessage,
  endJobs,
  printErrorMessage,
  printMessage,
  setConfiguration,
  setError,
} from "./actions";
import { importConfig, pollResources, startJobs } from "./services";

const defaultConfig = {
  logOutDir: CWD,
  jobs: [],
};

const chronosMachine = createMachine({
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
    context: {} as Context,
    events: {} as Events,
  },
}, {
  actions: {
    setError,
    setConfiguration,
    appendMessage,
    printMessage,
    endJobs,
    printErrorMessage,
  },
  guards: {
    hasNoAsyncJobs,
  },
  services: {
    startSyncJobs: startJobs("sync"),
    startAsyncJobs: startJobs("async"),
    pollResources,
    importConfig,
  },
});

interpret(chronosMachine).start();
