import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend({
  page: service(),
  model() {
    let { version, currentVersion } = this.modelFor('version');

    return hash({
      content: this.store.findRecord('content', 'index', {
        adapterOptions: {
          version,
        }
      }),
      pages: this.store.findAll('page', {
        adapterOptions: {
          version: version
        }
      }),
      version,
      currentVersion,
    });
  },

  afterModel(model) {
    let content = get(model, 'content');
    set(this.page, 'content', content);
    let version = get(model, 'version');
    set(this.page, 'currentVersion', version);
  }
});
