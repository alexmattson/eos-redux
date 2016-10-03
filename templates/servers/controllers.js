const express = () => {
 return `module.exports = {

  root(){
    return 'This is the Root';
  }

};
`
};

const flask = () => {
  //TODO: implement default flask controller
};

const Controllers = {
  express: express,
  flask: flask
}

module.exports = Controllers;
