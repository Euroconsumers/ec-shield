/**
 * More info on protractor can be found at http://www.protractortest.org/#/api
  */

'use strict';

describe('ec-shield Tests', function () {
    browser.ignoreSynchronization = true;

    beforeEach(function () {
        browser.get('/');
        //browser.pause();
    });

    it('Empty test should succeed', function () {
        expect(true).toBe(true);
    });
});