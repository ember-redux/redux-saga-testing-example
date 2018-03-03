import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import { deepFreeze } from 'ember-redux-freeze';
import reducer from 'testing-demo/reducers/information';

module('Unit | Reducers | information', function(hooks) {
  setupTest(hooks);

  test('toggle configuration will flip the boolean value for active', function(assert) {
    const previous = {
      configuration: {
        1: {
          id: '1',
          column: 'id',
          active: true
        }
      }
    };

    deepFreeze(previous);

    const result = reducer(previous, {type: 'TOGGLE_CONFIG', id: '1'});

    assert.deepEqual(result, {
      configuration: {
        1: {
          id: '1',
          column: 'id',
          active: false
        }
      }
    });

    const nextResult = reducer(result, {type: 'TOGGLE_CONFIG', id: '1'});

    assert.deepEqual(nextResult, {
      configuration: {
        1: {
          id: '1',
          column: 'id',
          active: true
        }
      }
    });
  });

  test('fetch configuration will persist each config option from the array', function(assert) {
    const previous = {
      selectedItem: undefined,
      configuration: undefined
    };

    deepFreeze(previous);

    const result = reducer(previous, {
      type: 'FETCH_CONFIG',
      selectedId: 2,
      payload: {
        configurations: [
          {
            id: '1',
            column: 'id',
            active: true
          },
          {
            id: '2',
            column: 'name',
            active: false
          }
        ]
      }
    });

    assert.deepEqual(result, {
      selectedItem: 2,
      configuration: {
        1: {
          id: '1',
          column: 'id',
          active: true
        },
        2: {
          id: '2',
          column: 'name',
          active: false
        }
      }
    });
  });

  test('fetch information will persist each item from the array', function(assert) {
    const previous = {
      all: undefined
    };

    deepFreeze(previous);

    const result = reducer(previous, {
      type: 'FETCH_INFO',
      payload: {
        information: [
          {
            id: '1',
            name: 'one'
          },
          {
            id: '2',
            name: 'two'
          }
        ]
      }
    });

    assert.deepEqual(result, {
      all: {
        1: {
          id: '1',
          name: 'one'
        },
        2: {
          id: '2',
          name: 'two'
        }
      }
    });
  });

});
