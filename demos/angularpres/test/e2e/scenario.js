/*global browser sleep element describe beforeEach it expect */

(function() {


describe('My Application', function() {
	beforeEach(function() {
		browser().navigateTo('/');
		sleep(1);
	});


	it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
		expect(browser().location().url()).toBe("/di");
	});

	describe('View 1', function() {
		beforeEach(function() {
			browser().navigateTo('#/di');
			sleep(1);
		});

		it('should...', function() {
			//...
		});
	});
});

})();