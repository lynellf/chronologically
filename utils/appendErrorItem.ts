import type { LogItem } from "../types";
import uniqueID from "./uniqueID";
import timestamp from "./timestamp";

export default function appendErrorItem(log: LogItem[], error: Error) {
  return [
    ...log,
    {
      id: uniqueID(),
      message: error?.message ?? "An unknown error has occured.",
      jobName: "system",
      timestamp: timestamp(),
      emit: true,
    },
  ];
}
