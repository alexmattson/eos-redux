import { RECEIVE_TEMPLATES,
         RECEIVE_TEMPLATE,
         REMOVE_TEMPLATE,
         TEMPLATE_ERROR
       } from '../actions/template_actions';
import merge from 'lodash/merge';


const TemplatesReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_TEMPLATES:
      let newState = {};
      action.templates.forEach(template => {
        newState[template.id] = template;
      });
      return newState;
    case RECEIVE_TEMPLATE:
      const newTemplate = {[action.template.id]: action.template};
      return merge({}, state, newTemplate);
    case REMOVE_TEMPLATE:
      newState = merge({}, state);
      delete newState[action.template.id];
      return newState;
    case TEMPLATE_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default TemplatesReducer;
