# Avot

Avot automates the creation of microservices in your project. It's is fully customizable.

- It asks the questions you define.
- Runs your pre scripts. (eg. create git repo and build pipeline)
- Scaffolds your template files by copying them to your preferred location and replacing variable words.
- Running your post scripts. (eg. commit and push to git)

## The Vision

The goal is to create a microservice creator. It should be customizable and it should also have defaults for google cloud, aws and alike.

Avot has served it's purpose when it is as easy as "avot service hello-world", to create a microservice with built in:

- repository setup
- build pipeline setup
- template scaffolding
- after scripts

## How To

### Install

`npm i -g @avot/avot`

### Overview

- To your project structure create an avot configuration file
- To your project structure create a template directory for avot to scaffold a new service
- Run `avot new` if you have avot.json in the root of your project or `avot new --path path/to/avot.json`

### Configuration File

```json
{
  "variableQuestions": [
    {
      "name": "SERVICE_NAME",
      "message": "Service name:"
    }
  ],
  "preCommands": [
    {
      "command": "echo",
      "args": ["'SERVICE_NAME'"]
    }
  ],
  "paths": {
    "fromDirectory": "../files",
    "toDirectory": "../services"
  },
  "postCommands": [
    {
      "command": "echo",
      "args": ["'hello world'"]
    }
  ]
}
```

#### variableQuestions

- The value of property `"name"` will be replaced everywhere in your scaffold files and commands. The value of property `"message"` will be displayed as the question in the cli. `"SERVICE_NAME"` is reserved for file and folder naming purposes.

#### preCommands & postCommands

- You can run any commands pre and post scaffolding your template files. The property `"command"` is the command to be executed. The property `"args"` are the arguments passed to the command. You can add flags and anything else to the args property.

#### paths

- The property `"fromDirectory"` should point to your service template directory. The property `"toDirectory"` should point to your services root directory.

## Done

- A working version with customization only
- A how to guide
- A small contribution guide

## Upcoming

- `avot init` to create basic folder and files to current directory.
- A working version with a default for google cloud + nodejs.

## Contribution

- Fork
- Hack
- Run `node index.js new --path example/config/avot.json` to try it out
- Pull request
