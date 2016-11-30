const errors = {
  404: '404 Route Not Found',
  500: 'Internal Server Error'
}

function code(errorCode){
  return errors[errorCode];
}

module.exports = {
  code: code
}
