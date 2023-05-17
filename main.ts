#!/usr/bin/env node
import type { Context, Events } from "./types";
import { createMachine, interpret } from "xstate";
import { CWD } from "./utils/constants";
import { hasNoAsyncTasks } from "./guards";
import {
  appendErrorMessage,
  appendMessage,
  endTasks,
  printErrorMessage,
  printMessage,
  saveLog,
  setConfiguration,
  setError,
} from "./actions";
import { importConfig, pollResources, startJobs } from "./services";

const defaultConfig = {
  logOutDir: CWD,
  jobs: [],
};

const chronosMachine = createMachine({
  predictableActionArguments: true,
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
        JOB_MESSAGE: {
          target: "Starting Sync Jobs",
          internal: false,
          actions: ["appendMessage", "printMessage"],
          cond: () => false,
        },
        JOB_WARNING: {
          target: "Starting Sync Jobs",
          internal: false,
          actions: ["appendMessage", "printMessage"],
          cond: () => false,
        },
        JOB_CLOSE: {
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
        src: "pollResources",
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
        JOB_MESSAGE: {
          target: "Polling Servers",
          internal: false,
          actions: ["appendMessage", "printMessage"],
          cond: () => false,
        },
        JOB_WARNING: {
          target: "Polling Servers",
          internal: false,
          actions: ["appendMessage", "printMessage"],
          cond: () => false,
        },
        JOB_CLOSE: {
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
        JOB_MESSAGE: {
          target: "Running",
          internal: false,
        },
        JOB_WARNING: {
          target: "Running",
          internal: false,
        },
        JOB_CLOSE: {
          target: "Closed",
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
    endTasks,
    printErrorMessage,
    appendErrorMessage,
    saveLog,
  },
  guards: {
    hasNoAsyncTasks,
  },
  services: {
    startSyncJobs: startJobs("sync"),
    startAsyncJobs: startJobs("async"),
    pollResources,
    importConfig,
  },
});

interpret(chronosMachine).start();
