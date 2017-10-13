import { connect } from 'ember-redux';

const stateToComputed = state => ({
  configuration: state.information.configuration
});

const dispatchToActions = dispatch => ({
  toggle: (id) => dispatch({type: 'TOGGLE_CONFIG_ASYNC', 'id': id})
});

export default connect(stateToComputed, dispatchToActions)();
