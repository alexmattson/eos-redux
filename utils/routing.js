function getParams(routeMap, requestPath){
  const routes = Object.keys(routeMap);
  for (var i = 0; i < routes.length; i++) {
    let params = matchRoute(routes[i], requestPath);
    if(params){
      return {
        params: params,
        path: routes[i]
      }
    }
  }
  return null;
}

function matchRoute(route, requestPath){
  let params = {};
  const routeArr = removeWhitespace(route.split('/'));
  const requestArr = removeWhitespace(requestPath.split('/'));
  if(routeArr.length !== requestArr.length){ return null; }
  for(var i = 0; i < requestArr.length; i++){
    if(routeArr[i].match(/^{.*}$/)){
      params[routeArr[i].slice(1, -1)] = requestArr[i];
    } else if(routeArr[i] !== requestArr[i]){ return null; }
  }
  return params;
}

function removeWhitespace(arr){
  const length = arr.length - 1;
  const start = arr[0].length ? 0 : 1;
  const end = arr.slice(-1)[0].length ? arr.length : arr.length -1;
  return arr.slice(start, end);
}

module.exports = {
  getParams: getParams
}
