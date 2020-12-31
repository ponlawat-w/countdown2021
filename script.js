new Vue({
  el: '#app',
  data: {
    goal: new Date(1609455600000),
    remaining: null,
    interval: null
  },
  computed: {
    remainingText: function() {
      if (typeof this.remaining !== 'number') {
        return '';
      }
      let remaining = this.remaining;
      const hour = Math.floor(remaining / 3600000);
      remaining -= hour * 3600000;
      const minute = Math.floor(remaining / 60000);
      remaining -= minute * 60000;
      const second = Math.floor(remaining / 1000);
      return `${hour.toString().padStart(2, '0')}:`
        + `${minute.toString().padStart(2, '0')}:`
        + `${second.toString().padStart(2, '0')}`;
    },
    finished: function() {
      return this.remaining < 1000;
    }
  },
  methods: {
    update: function() {
      this.remaining = this.goal - new Date().getTime();
      if (this.finished) {
        clearInterval(this.interval);
      }
    }
  },
  mounted: function() {
    this.interval = setInterval(function() {
      this.update();
    }.bind(this), 50);
  }
});
