# Eos Redux

![eos.png](https://s10.postimg.org/7hfcpvwpl/eos.png)


## How to install:

Install the npm package

```
npm install --save eos-redux
```
add the following code to your package.json file
```
"bin": {
    "eos": "node_modules/eos-redux/index.js"
  },
```
finally link the eos command by running
```
npm link
```
You're all set!

## How to use:

All commands are run through the following syntax:
```
eos <command>
```

### Start

```
eos start
```
Alternate syntax:
```
eos s
```

This is used to create the basic file structure for a redux application.

```
frontend
  + actions
  + components
    root.jsx
  + middleware
  	master_middleware.js
  + reducers
  	root_reducer.js
  + store
  	store.js
  + util
  index.jsx
```
Along with the creation of the file structure comes the instillation of all dependencies needed.

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

For ease of use we have also included a default webpack.config.js file that is structured correctly for this framework.  

### Generate

```
eos generate [name]
```
Alternate syntax:
```
eos g [name]
```


---
Developed by [Alex Mattson](http://www.alexmattson.com)
