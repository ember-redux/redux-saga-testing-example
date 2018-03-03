import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { find } from '@ember/test-helpers';
import { patchReducer } from 'testing-demo/tests/helpers/vnext-patch';

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

module('Integration | Component | info detail', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    patchReducer(this, initState);
  });

  test('should render item with all fields provided', async function(assert) {
    await render(hbs`{{info-detail}}`);

    assert.equal(find('[test-id=idInfo]').textContent, 'id: 2');
    assert.equal(find('[test-id=nameInfo]').textContent, 'name: two');
    assert.equal(find('[test-id=configureLink]').textContent, 'configure');
  });

});
