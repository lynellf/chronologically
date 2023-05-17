import { LogItem } from "../types";

export default function printLogMessage(log: LogItem[]) {
  const { message, jobName, emit } = log.slice(-1)[0];
  const shallEmit = emit;

  if (!shallEmit) {
    return undefined;
  }

  console.info(`[${jobName}] ${message}`);
}
