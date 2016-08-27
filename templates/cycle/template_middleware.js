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
   const templatesSuccess = data => dispatch(receiveTemplates(data));
   const templateSuccess = data => dispatch(receiveTemplate(data));
   const templateRemoved = data => dispatch(removeTemplate(data));
   const templateErrored = data => dispatch(templateError(data.responseJSON));
   switch(action.type){
     case REQUEST_TEMPLATES:
       fetchTemplates(templatesSuccess);
       return next(action);
     case REQUEST_TEMPLATE:
       fetchTemplate(action.id, templateSuccess);
       return next(action);
     case CREATE_TEMPLATE:
       createTemplate(action.template, templateSuccess, templateErrored);
       return next(action);
     case UPDATE_TEMPLATE:
       updateTemplate(action.template, templateSuccess)
       return next(action);
     case DESTROY_TEMPLATE:
       destroyTemplate(action.template, templateRemoved);
       return next(action);
     default:
       return next(action);
   }
 };
