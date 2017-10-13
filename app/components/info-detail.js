import { connect } from 'ember-redux';
import { activeItem } from '../reducers/information';

const stateToComputed = state => ({
  item: activeItem(state)
});

export default connect(stateToComputed)();
