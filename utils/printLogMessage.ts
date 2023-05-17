import { LogItem } from "../types";

export default function printLogMessage(log: LogItem[]) {
  const hasItems = log.length > 0;

  if (!hasItems) {
    return undefined;
  }

  const { message, jobName, emit } = log.slice(-1)[0];
  const shallEmit = emit;

  if (!shallEmit) {
    return undefined;
  }

  console.info(`[${jobName}] ${message}`);
}
