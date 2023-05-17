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
  // job id
  id: string
  // job name
  name: string
  // command to run
  command: string
  // child_process.spawn options
  options: object
  // http address to poll before starting job
  pollHttp: string
  // how long shall the http address be polled before timing out
  pollTimeout: number
  // shall display emitted messages to the user's console?
  messageForwarding: Message[]
  // wait-on library configuration options
  waitOn: Object
}

type Config = {
  // list of job ids to have their logs written to disk
  logsToSave: string[]
  // disk location of log files
  logOutDir: string
  // list of jobs to run
  jobs: Job[]
}
```