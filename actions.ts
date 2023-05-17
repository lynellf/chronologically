import { assign } from "xstate";
import type {
  ConfigImportEvent,
  Context,
  ErrorEvent,
  Events,
  MessageEvent,
  WarningEvent,
} from "./types";
import appendLogItem from "./utils/appendLogItem";
import printLogMessage from "./utils/printLogMessage";
import printError from "./utils/printError";
import killProcess from "./utils/killProcess";

export const setError = assign<Context, Events>({
  error: (_context, event) => (event as ErrorEvent).data,
});

export const setConfiguration = assign<Context, Events>({
  config: (_context, event) => (event as ConfigImportEvent).data,
});

export const appendMessage = assign<Context, Events>({
  log: (context, event) =>
    appendLogItem(context.log, (event as MessageEvent | WarningEvent).data),
});

export const printMessage = (context: Context) => printLogMessage(context.log);

export const endJobs = () => killProcess();

export const printErrorMessage = (context: Context) =>
  printError(context.error as Error);

export const saveLog = (context: Context) => {
};
