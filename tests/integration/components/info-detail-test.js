import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { patchReducer, unpatchReducer } from 'testing-demo/tests/helpers/patch-reducer';

moduleForComponent('info-detail', 'Integration | Component | info detail', {
  integration: true,
  beforeEach() {
    const initState = {
      information: {
        selectedItem: 2,
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
            active: true
          }
        }
      }
    };
    patchReducer(initState);
    this.inject.service('redux');
  },
  afterEach() {
    unpatchReducer();
  }
});

test('should render item with all fields provided', function(assert) {
  this.render(hbs`{{info-detail}}`);

  assert.equal(this.$('[test-id=idInfo]').text().trim(), 'id: 2');
  assert.equal(this.$('[test-id=nameInfo]').text().trim(), 'name: two');
  assert.equal(this.$('[test-id=configureLink]').text().trim(), 'configure');
});
