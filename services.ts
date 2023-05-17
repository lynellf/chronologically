import { Sender } from "xstate";
import waitOn from "wait-on";
import { readFile } from "node:fs/promises";
import type {
  CloseEvent,
  Context,
  Events,
  MessageEvent,
  WarningEvent,
} from "./types";
import startJob from "./utils/startJob";
import timestamp from "./utils/timestamp";

export function startJobs(type: "sync" | "async" = "sync") {
  return (context: Context, _event: Events) =>
  async (sendEvent: Sender<Events>) => {
    const jobs = type === "sync"
      ? context.config.jobs.filter((job) => !Boolean(job.waitOn))
      : context.config.jobs.filter((job) => Boolean(job.waitOn));

    jobs.forEach((job) => {
      const jobProcess = startJob(job);
      const jobName = job.name;

      jobProcess.stdout?.on(
        "data",
        (data) =>
          sendEvent({
            type: "JOB_MESSAGE",
            data: {
              message: data.toString(),
              jobName,
              emit: job.messageForwarding?.includes("message"),
              timestamp: timestamp(),
            },
          } as MessageEvent),
      );

      jobProcess.stderr?.on("data", (data) =>
        sendEvent({
          type: "JOB_WARNING",
          data: {
            message: data.toString(),
            jobName,
            emit: job.messageForwarding?.includes("warning"),
            timestamp: timestamp(),
          },
        } as WarningEvent));

      jobProcess.on(
        "close",
        () => sendEvent({ type: "JOB_CLOSE" } as CloseEvent),
      );
    });
  };
}

export async function pollResources(context: Context, _event: Events) {
  const asyncJobs = context.config.jobs.filter((job) => Boolean(job.waitOn));

  return await Promise.allSettled(
    asyncJobs.map((job) => waitOn(job.waitOn as waitOn.WaitOnOptions)),
  );
}

export async function importConfig(_context: Context, _event: Events) {
  const configPath = process.argv.slice(2)?.at(0);

  if (!configPath) {
    throw new Error("No configuration file path defined as an argument!");
  }

  try {
    const configRaw = await readFile(configPath, "utf-8");
    return JSON.parse(configRaw) as Context["config"];
  } catch (error) {
    throw new Error(
      "Unable to load configuration file. Ensure it is a json file.",
    );
  }
}
