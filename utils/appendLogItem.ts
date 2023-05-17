import { LogItem, MessageData } from "../types";
import uniqueID from "./uniqueID";
import timestamp from "./timestamp";

export default function appendLogItem(
  log: LogItem[],
  messageData: MessageData,
) {
  const { message, jobName, emit } = messageData;

  return [...log, {
    id: uniqueID(),
    message,
    jobName,
    timestamp: timestamp(),
    emit,
  }];
}
