const defaultJSON = () => {
  return `{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "app"
  },
  "scripts": {
    "test": "echo Error: no test specified && exit 1",
    "start": "node ./bin/www",
    "build": "webpack --config webpack_prod.config.js --progress -p"

  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-core": "^6.13.2",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.13.2",
    "babel-preset-react": "^6.11.1",
    "body-parser": "~1.15.1",
    "css-loader": "^0.23.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "ejs": "~2.5.2",
    "express": "^4.13.4",
    "express-generator": "4.13.4",
    "jade": "~1.11.0",
    "lodash": "^4.15.0",
    "morgan": "~1.7.0",
    "react": "^15.3.0",
    "react-dom": "^15.3.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.6.1",
    "redux": "^3.5.2",
    "serve-favicon": "~2.3.0",
    "style-loader": "^0.13.0",
    "webpack": "^1.13.1"
  }
}
`
};

const PackageJSONSetup = (type, framework) => {
  return defaultJSON();
}

module.exports = PackageJSONSetup;
