const express = () => {
 return `module.exports = {

  root(){
    return 'This is the Root';
  }

};
`
};

const flask = () => {
  return `def root():
    return 'ROOT'

def error(code):
    errors = {
        404: 'Route Not Found'
    }
    text = errors[code]
    return 'ERROR:  ' + str(code) + '  ' + text`
};

const Controllers = {
  express: express,
  flask: flask
}

module.exports = Controllers;
