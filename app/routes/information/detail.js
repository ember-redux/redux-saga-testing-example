import { route } from 'ember-redux';

const model = (dispatch, { selected_id }) => {
  const selectedId = selected_id;
  dispatch({type: 'FETCH_CONFIG_ASYNC', selectedId});
  return selectedId;
}

export default route({model})();
