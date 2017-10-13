import { test, module } from 'qunit';
import { activeItem } from 'testing-demo/reducers/information';

module('Unit | Selectors | information');

test('activeItem should filter out any inactive column', function(assert) {
  const result = activeItem({
      information: {
        selectedItem: 1,
        all: {
          1: {
            id: '1',
            name: 'one'
          },
          2: {
            id: '2',
            name: 'two'
          }
        },
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
      }
  });

  assert.deepEqual(result, {
    id: '1'
  });
});
