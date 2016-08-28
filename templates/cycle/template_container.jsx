import { connect } from 'react-redux';
import TemplateList from './template_list';
// Actions
import { requestTemplates,
         createTemplate,
         toggleTemplate,
         destroyTemplate
       } from '../../actions/template_actions';
import { allTemplates } from '../../reducers/selectors';

const mapStateToProps = state => ({
  templates: allTemplates(state)
});

const mapDispatchToProps = dispatch => ({
  requestTemplates: () => dispatch(requestTemplates()),
  createTemplate: template => dispatch(createTemplate(template)),
  toggleTemplate: template => () =>	dispatch(toggleTemplate(template))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateList);
