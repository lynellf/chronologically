## Chronologically

### What is this?

`chronologically` is a task/process runner. A config file is interpreted as a series of jobs to perform. If a job needs to poll a server before starting, it will do that. 

### Motivation

Ran into a situation at work in which our development tooling doesn't behave as intended. 

`<script-name> run dev`

This command should:
- Start my development server
- Launch an Electron-based container

But instead it only performs the first job with no word as to what's happening with the second.

`chronologically` isn't meant to be a package for widespread use, but for personal use in places where I need to ensure tasks that impact my day-to-day development are in my control. 


### How to use

`npm install chronologically`

`chronologically <path-to-config-file>.json`

### Config

```typescript

type Message = 'default'|'warning'|'error'

type Job = {
  id?: string; // shall be autogenerated
  name: string; // name of the job
  command: string; // command of the job
  args?: string[]; // command args
  message?: string; // message emitted before running job
  options?: SpawnOptions; // options reference: https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
  // see options here: https://github.com/jeffbski/wait-on
  waitOn?: WaitOnOptions; // should the job wait for other dependencies before running?
  messageForwarding?: MessageType[]; // what messages shall emit to the user's console?
  saveLog?: boolean; // write log to disk?
};

type Config = {
  logOutDir?: string;
  jobs: Job[];
};
```