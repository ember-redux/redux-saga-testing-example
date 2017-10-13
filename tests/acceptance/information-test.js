import { test } from 'qunit';
import moduleForAcceptance from 'testing-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | information');

test('configure info columns available from detail route', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('[test-id=detailLink]').length, 3);
  });

  click('[test-id=detailLink]:eq(0)');

  andThen(function() {
    assert.equal(currentURL(), '/detail/1');
    assert.equal(find('[test-id=configureLink]').length, 1);
  });

  click('[test-id=configureLink]');

  andThen(function() {
    assert.equal(currentURL(), '/detail/1/configure');
    assert.equal(find('[test-id=configOption]').length, 2);
  });
});
