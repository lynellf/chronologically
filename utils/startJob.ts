import type { Job } from "../types";
import { spawn } from "node:child_process";

export default function startJob(job: Job) {
  return spawn(job.command, job.args ?? [], job.options ?? {});
}
