import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, findAll } from '@ember/test-helpers';
import { patchReducer } from 'testing-demo/tests/helpers/vnext-patch';
import { startMirage } from 'testing-demo/initializers/ember-cli-mirage';

const initState = {
  information: {
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
};

module('Integration | Component | info configure', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
    patchReducer(this, initState);
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('clicking checkbox will drive visible properties of selected item', async function(assert) {
    assert.expect(8);

    await render(hbs`{{info-configure}}`);

    assert.equal(findAll('[test-id=configOption] input[type=checkbox]').length, 2);
    assert.equal(find('[test-id=configOption]:nth-of-type(1) input[type=checkbox]').checked, true);
    assert.equal(find('[test-id=configOption]:nth-of-type(2) input[type=checkbox]').checked, false);

    this.server.post('/api/configuration/toggle/2', (db, request) => {
      assert.equal(request.method, 'POST');
    });

    await click('[test-id=configOption]:nth-of-type(2) input[type=checkbox]');

    assert.equal(find('[test-id=configOption]:nth-of-type(1) input[type=checkbox]').checked, true);
    assert.equal(find('[test-id=configOption]:nth-of-type(2) input[type=checkbox]').checked, true);

    const redux = this.owner.lookup('service:redux');
    const configuration = redux.getState()['information']['configuration'];
    assert.equal(configuration['1']['active'], true);
    assert.equal(configuration['2']['active'], true);
  });
});
