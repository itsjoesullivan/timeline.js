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
	});
	
});

