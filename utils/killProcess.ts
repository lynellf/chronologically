export default function killProcess() {
  process.kill(process.pid, "SIGTERM");
}
