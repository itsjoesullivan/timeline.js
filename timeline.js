var _ = require('./lib/underscore');

var now = function() {
	return new Date().getTime();
}

var Timeline = function () {
	this._position = 0;
	this.events = [];
};

Timeline.prototype.position = function(pos) {
	if(pos || pos === 0) {
		return this._position = pos;
	}
	return this._position;
};

Timeline.prototype.add = function(event) {
	this.events.push(event);
};

Timeline.prototype.run = function() {
	var self = this;
	var startTime = now();
	var interval = 1000;
	//get anything that might happen in the next second
	var pos = this._position;
	var onDeck = _(this.events).select(function(ev) {
		return ev.at >= pos && ev.at < pos+interval;
	});
	//trigger it.
	onDeck.forEach(function(ev) {
		setTimeout(ev.fn,ev.at-pos);
	});
	var left = _(this.events).some(function(ev) {
		return ev.at > pos+interval;
	});
	if(left.length) {
		setTimeout(function() {
			self.position(self.position() + now() - startTime);
			self.run();
		},interval);
	}
}

module.exports = Timeline;