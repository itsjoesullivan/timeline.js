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

module.exports = Timeline;