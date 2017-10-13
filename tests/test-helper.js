import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

import LinkComponent from '@ember/routing/link-component';

LinkComponent.reopen({
  attributeBindings: ['test-id']
});

setResolver(resolver);
start();
