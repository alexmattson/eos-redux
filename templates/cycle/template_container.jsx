import { connect } from 'react-redux';
import Template from './template';
// Actions
import { requestTemplates,
         createTemplate,
         destroyTemplate
       } from '../../actions/template_actions';
import { allTemplates } from '../../reducers/selectors';

const mapStateToProps = state => ({
  templates: allTemplates(state)
});

const mapDispatchToProps = dispatch => ({
  requestTemplates: () => dispatch(requestTemplates()),
  createTemplate: temPlate => dispatch(createTemplate(temPlate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);
