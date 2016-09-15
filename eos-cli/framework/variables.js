import React from 'react';

function makeGlobal(key, variable){
   if(typeof window !== 'undefined'){ window[key] = variable; }
   if(typeof global !== 'undefined'){ global[key] = variable; }
}

makeGlobal('react', React);
