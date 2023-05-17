import { writeFile } from "node:fs/promises";
import { Context } from "../types";

export default async function saveLog(context: Context) {
  const { config: { logOutDir }, log } = context;

  if (logOutDir) {
    await writeFile(logOutDir, JSON.stringify(log), "utf-8");
  }
}
