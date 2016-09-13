export const REQUEST_TEMPLATES = "REQUEST_TEMPLATES";
export const REQUEST_TEMPLATE = "REQUEST_TEMPLATE";
export const RECEIVE_TEMPLATES = "RECEIVE_TEMPLATES";
export const RECEIVE_TEMPLATE = "RECEIVE_TEMPLATE";
export const REMOVE_TEMPLATE = "REMOVE_TEMPLATE";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const UPDATE_TEMPLATE = "UPDATE_TEMPLATE";
export const DESTROY_TEMPLATE = "DESTROY_TEMPLATE";
export const TEMPLATE_ERROR = "TEMPLATE_ERROR";

export const requestTemplates = () => ({
  type: REQUEST_TEMPLATES
});

export const requestTemplate = id => ({
  type: REQUEST_TEMPLATE,
  id
});

export const receiveTemplates = templates => ({
  type: RECEIVE_TEMPLATES,
  templates
});

export const receiveTemplate = template => ({
  type: RECEIVE_TEMPLATE,
  template
});

export const removeTemplate = template => ({
  type: REMOVE_TEMPLATE,
  template
});

export const createTemplate = template => ({
  type: CREATE_TEMPLATE,
  template
});

export const updateTemplate = template => ({
  type: UPDATE_TEMPLATE,
  template
});

export const destroyTemplate = template => ({
  type: DESTROY_TEMPLATE,
  template
});

export const templateError = error => ({
  type: TEMPLATE_ERROR,
  error
});
