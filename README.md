# EOS Redux

![eos.png](https://s10.postimg.org/7hfcpvwpl/eos.png)

## Table of contents
* [How to install](#how-to-install)
* [How to use](#how-to-use)
  - [Start](#action-start)
  - [Generate](#action-generate)
    * [cycle](#generate-cycle)
    * [component](#generate-component)
    * [action](#generate-action)
    * [middleware](#generate-middleware)
    * [reducer](#generate-reducer)
    * [api_util](#generate-api_util)
  - [Server](#action-server)
* [Development](#development)

## <a id="how-to-install"></a> How to install

Install EOS as a global npm package

```
npm install -g eos-redux
```

You're all set!

## <a id="how-to-use"></a> How to use

All commands are run through the following syntax:
```
eos <command> [args]
```

### <a id="action-start"></a> Start

```
eos start [name]
```
Alternate syntax:
```
eos s [name]
```

Creates a Redux app with the name specified and a Node.js Express server.

To skip backend generation, use:
```
eos start [name] --backend none
```

The following file tree is generated for the frontend:

```
[name]/
  + frontend/
    + actions/
    + components/
      app.jsx
      root.jsx
      router.jsx
    + middleware/
      master_middleware.js
    + reducers/
      root_reducer.js
    + store/
      store.js
    + util/
      index.jsx
    .gitignore
    index.html  
    package.json
    webpack.config.js
```
Along with the creation of the file structure comes the installation of all dependencies needed.
WARNING:  NVM users will need to run the following commands to install dependencies:
```Bash
cd [name]
npm install
```

All the first level dependencies included are:

* babel-loader
* babel-core
* babel-preset-es2015
* babel-preset-react
* lodash
* react-redux
* react
* react-dom
* react-router
* redux
* webpack

If a backend was generated on start, the following additional dependencies are included:

* body-parser
* cookie-parser
* debug
* express
* jade
* morgan
* serve-favicon
* ejs

For ease of use we have also included a default webpack.config.js file that is structured correctly for this framework.  

### <a id="action-generate"></a> Generate

```
eos generate [action] [name]
```
Alternate syntax:
```
eos g [action] [name]
```

Generates an individual element or a full cycle.

It is important how you format your name if it is more than one word. Currently it is required that you enter the name in one of the following formats:

```
sampleName
SampleName
```

This command will both generate pre-filled files and place the generated middleware or reducer into the master_middleware.js or root_reducer.js respectively.

#### Available Actions


##### <a id="generate-cycle"></a> cycle

```
eos generate cycle [name]
```

Generates a full redux cycle for a given name. The files that will be generated are as follows:

- frontend/components/[name]/
- frontend/components/[name]/[name].jsx
- frontend/components/[name]/[name]\_container.jsx
- frontend/actions/[name]\_actions.js
- frontend/middleware/[name]\_middleware.js
- frontend/reducer/[name]\_reducer.js
- frontend/util/[name]\_api_util.js

##### <a id="generate-component"></a> component

```
eos generate component [name]
```

Generates file structure for a single component:

```
components/
  + [name]/
    [name]_container.js
    [name].jsx
```

##### <a id="generate-action"></a> actions

```
eos generate actions [name]
```

Generates actions file.

```
actions/
  [name]_actions.js
```

##### <a id="generate-middleware"></a> middleware

```
eos generate middleware [name]
```

Generates middleware file.

```
middleware/
  [name]_middleware.js
```

##### <a id="generate-reducer"></a> reducer

```
eos generate reducer [name]
```

Generates reducer file.

```
reducer/
  [name]_reducer.js
```

##### <a id="generate-api_util"></a> api_util

```
eos generate api_util [name]
```

Generates api_util file.

```
util/
  [name]_api_util.js
```
### <a id="action-server"></a> Server

```
eos server
```

If a backend was generated on start, this command starts an Express server listening on port 8000.

## <a id="development"></a> Development

### How to Set Up Development Environment

To use a local copy of EOS Redux clone down the repo:
```Bash
git clone https://github.com/amattson21/eos-redux.git
```

Setup the local environment:
```Bash
cd eos-redux
npm install
```

To run commands with the local copy instead of `$ eos <command> [args]` use:
```Bash
[path to local copy]/eos-redux/eos-cli/eos-cli.js <command> [args]
```


---
Developed by [Alex Mattson](http://www.alexmattson.com) with the help of many great [contributors](https://github.com/amattson21/eos-redux/graphs/contributors)  
