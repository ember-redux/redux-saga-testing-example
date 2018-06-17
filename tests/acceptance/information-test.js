import { test, module } from 'qunit';
import { visit, click, findAll, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | information', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('configure info columns available from detail route', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(findAll('[test-id=detailLink]').length, 3);

    await click('[test-id=detailLink]:nth-of-type(1)');

    assert.equal(currentURL(), '/detail/1');
    assert.equal(findAll('[test-id=configureLink]').length, 1);

    await click('[test-id=configureLink]');

    assert.equal(currentURL(), '/detail/1/configure');
    assert.equal(findAll('[test-id=configOption]').length, 2);
  });

});
