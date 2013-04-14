var Timeline = require('../timeline.js');

describe('timeline', function() {
	it('exists', function() {
		expect(Timeline).toBeTruthy();
	});
	
	var timeline = new Timeline();
	
	beforeEach(function() {
		timeline = new Timeline();
	});
	
	describe('timeline.position', function() {
		it('returns _position if it exists', function() {
			timeline._position = 100;
			expect(timeline.position()).toEqual(100);
		});
		
		it('sets _position if passed a positive number', function() {
			timeline.position(1000);
			expect(timeline._position).toEqual(1000);
		});
		
		it('sets _position if passed 0', function() {
			timeline.position(0);
			expect(timeline._position).toEqual(0);
		});
	});
	
	describe('timeline.add', function() {
		it('pushes an event into this.event', function() {
			expect(timeline.events.length === 0).toBeTruthy();
			timeline.add('hi');
			expect(timeline.events.length).toEqual(1);
		});
		
		it('accepts multiple arguments', function() {
			expect(timeline.events.length === 0).toBeTruthy();
			timeline.add(['hi','there']);
			expect(timeline.events.length).toEqual(2);
		});
	});
	
	describe('timeline.play', function() {
		
		var now = function() {
			return new Date().getTime();
		}
		
		var happened = false;
		
		beforeEach(function() {
			timeline = new Timeline();
		});
		
		it('will trigger an event no more than 105ms after 0 if started at 0 and an event exists at 100ms', function(done) {
			var checks = 0;
			var startTime;
			timeline.add({
				at: 100,
				fn: function() {
					happened = true;
					expect(happened).toBeTruthy();
					expect(checks).toBe(2);
					var duration = now() - startTime;
					expect(duration > 95 && duration < 105).toBeTruthy();
					done();
				}
			});
			timeline.run();
			startTime = new Date().getTime();
			expect(happened).toBeFalsy();
			checks++;
			setTimeout(function() {
				expect(happened).toBeFalsy();
				checks++;
			},50);
			
		});
		
		it('can handle multiple events', function(done) {
			var message = '';
			timeline.add([{
				at:100,
				fn: function() {
					message += 'tick';
				}
			}, {
				at:100,
				fn: function() {
					message += ' tock';
					expect(message).toEqual('tick tock');
					done();
				}
			}]);
			timeline.run();
		});
	});
	
	describe('timeline.stop', function() {
		it('cancels queued up events', function(done) {
			var message = '';
			timeline.add([{
				at: 100,
				fn: function() {
					message += 'tick';
				}
			},{
				at: 500,
				fn: function() {
					message += ' tock';
				}
			}]);
			timeline.run();
			setTimeout(function() {
				timeline.stop();
			},200);
			setTimeout(function() {
				expect(message).toBe('tick');
				done();
			},600);
		});
	});
});

