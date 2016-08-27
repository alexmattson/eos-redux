export const REQUEST_TEMPLATES = "REQUEST_TEMPLATES";
export const REQUEST_TEMPLATE = "REQUEST_TEMPLATE";
export const RECEIVE_TEMPLATES = "RECEIVE_TEMPLATES";
export const RECEIVE_TEMPLATE = "RECEIVE_TEMPLATE";

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
