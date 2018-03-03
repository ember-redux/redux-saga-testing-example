import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('information', { path: '/' }, function() {
    this.route('detail', {path: 'detail/:selected_id'}, function() {
      this.route('configure');
    });
  });
});

export default Router;
