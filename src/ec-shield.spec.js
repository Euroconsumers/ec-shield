
var chai = require("chai");
var expect = chai.expect;

describe('ec-shield', () => {

	it('Empty test should succeed', function () {
        expect(true).be.true;
    });

    it('Chrome should google', function (done) {
		var webdriver = require('selenium-webdriver'),
			By = webdriver.By,
			until = webdriver.until;

		var caps = webdriver.Capabilities.chrome();
        caps.set('dns-prefetch-disable', '0');

		//ChromeOptions chromeOptions = new ChromeOptions();
		//chromeOptions.addArguments(Arrays.asList("--test-type"));
		//DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		//capabilities.setCapability("chrome.switches", Arrays.asList("--incognito"));
		//capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
		//        caps.set('test-type');

		var driver = new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(caps)
			.build();

		driver.get('https://www.google.com/ncr');
		driver.findElement(By.name('q')).sendKeys('webdriver');
		driver.findElement(By.name('btnG')).click();

		driver.wait(until.titleIs('webdriver - Google Search'), 1000)
			.then(() => {
		        driver.quit();
		        done();
		    })
			.catch(error => {
		        driver.quit();
				done(error);
		    });
    });

});

