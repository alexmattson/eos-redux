export const fetchTemplates = function(success){
  $.ajax({
    method: 'GET',
    url: 'api/templates',
    success
  });
};

export const fetchTemplate = function(id, success){
  $.ajax({
    method: 'GET',
    url: `api/templates/${id}`,
    success
  });
};

export const createTemplate = function(template, success, error){
  $.ajax({
    method: 'POST',
    url: 'api/templates',
    data: template,
    success,
    error
  });
};

export const updateTemplate = function(template, success){
  $.ajax({
    method: 'PATCH',
    url: `api/templates/${template.id}`,
    data: {template},
    success
  });
};

export const destroyTemplate = function(template, success){
  $.ajax({
    method: 'DELETE',
    url: `api/templates/${template.id}`,
    success
  });
};
