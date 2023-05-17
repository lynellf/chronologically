import type { Context } from "./types";

export function hasNoAsyncJobs(context: Context) {
  return Boolean(
    context.config.jobs.find((job) => typeof job.waitOn !== "undefined"),
  );
}
