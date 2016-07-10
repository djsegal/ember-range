import Ember from 'ember';

export default Ember.Controller.extend({
  emberRangePoller: Ember.inject.service(),
  isBlanking: false,
  defaults: {},

  setDefaults: Ember.on('init', function() {
    let defaults = {
      isBlanking: this.get('isBlanking')
    };

    this.set('defaults', defaults);
  }),

  triggerUpdate: function() {
    // this.notifyPropertyChange('');
  },

  stopTimer: function() {
    let poller = this.get('emberRangePoller'),
        isBlanking = this.get('isBlanking');

    if ( !isBlanking ) { return false; }

    this.set('isBlanking', false);
    poller.stop();
    return true;
  },

  updateDelay: Ember.on('init', Ember.observer('delay', function() {
    let poller = this.get('emberRangePoller'),
        delay = this.get('delay') * 10;

    poller.setInterval(delay);
  })),

  actions: {
    restart: function() {
      this.stopTimer();

      let didUpdate = false;
      for ( let key of Object.keys(this.get('defaults')) ) {
        let oldValue = this.get(key),
            newValue = this.get('defaults')[key];

        if ( newValue === oldValue ) { continue; }
        if ( !didUpdate ) { didUpdate = true; }
        this.set(key, newValue);
      }

      if ( !didUpdate ) { this.triggerUpdate(); }
    },

    refresh: function() {
      this.stopTimer();
      this.triggerUpdate();
    },

    twinkle: function() {
      let poller = this.get('emberRangePoller'),
          stoppedBlanking = this.stopTimer();

      if ( stoppedBlanking ) { return; }
      this.set('isBlanking', true);

      poller.start(this, function() {
        this.triggerUpdate();
      });
    }
  }
});
