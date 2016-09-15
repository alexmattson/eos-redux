import React from 'react';

function makeGlobal(key,var){
   if(typeof window !== 'undefined'){ window[key] = var; }
   if(typeof global !== 'undefined'){ global[key] = var; }
}

makeGlobal('react',React);
