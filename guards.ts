import type { Context } from "./types";

export function hasNoAsyncTasks(context: Context) {
  return context.config.jobs.filter((job) => typeof job.waitOn !== "undefined")
    .length === 0;
}
