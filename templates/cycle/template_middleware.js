// Template API Util
import { fetchTemplates,
         fetchTemplate,
         createTemplate,
         updateTemplate,
         destroyTemplate
       } from '../util/template_api_util';
// Template Action
import { requestTemplates,
         receiveTemplate,
         receiveTemplates,
         removeTemplate,
         templateError,
// Template Constants
         REQUEST_TEMPLATES,
         REQUEST_TEMPLATE,
         CREATE_TEMPLATE,
         UPDATE_TEMPLATE,
         DESTROY_TEMPLATE
       } from '../actions/template_actions';

 export default ({getState, dispatch}) => next => action => {
   const temPlatesSuccess = data => dispatch(receiveTemplates(data));
   const temPlateSuccess = data => dispatch(receiveTemplate(data));
   const temPlateRemoved = data => dispatch(removeTemplate(data));
   const temPlateErrored = data => dispatch(templateError(data.responseJSON));
   switch(action.type){
     case REQUEST_TEMPLATES:
       fetchTemplates(temPlatesSuccess);
       return next(action);
     case REQUEST_TEMPLATE:
       fetchTemplate(action.id, temPlateSuccess);
       return next(action);
     case CREATE_TEMPLATE:
       createTemplate(action.template, temPlateSuccess, temPlateErrored);
       return next(action);
     case UPDATE_TEMPLATE:
       updateTemplate(action.template, temPlateSuccess);
       return next(action);
     case DESTROY_TEMPLATE:
       destroyTemplate(action.template, temPlateRemoved);
       return next(action);
     default:
       return next(action);
   }
 };
