# Eos Redux

![eos.png](https://s10.postimg.org/7hfcpvwpl/eos.png)


## How to install:

Install the npm package through the command line

```
npm install --save eos-redux
```
add the following code to your package.json file
```
"bin": {
    "eos": "node_modules/eos-redux/index.js"
  },
```
You're all set.

## How to use:

All commands are run through the following syntax:
```
eos <command>
```

### Generate

```
eos generate
```

```
eos g
```
This is used to create the basic file structure for a redux application.

```
frontend
  + actions
  + components
  + middleware
  	master_middleware.js
  + reducers
  	root_reducer.js
  + store
  	store.js
  + util
  todo_redux.jsx
```

---
Developed by [Alex Mattson](http://www.alexmattson.com)
