const webdriver = require('selenium-webdriver')
const chai = require("chai");
const expect = chai.expect;

const By = webdriver.By;
const until = webdriver.until;

describe('ec-shield', () => {

	it('Empty test should succeed', function () {
        expect(true).be.true;
    });

    it('Chrome should google', function (done) {
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

		driver.get('https://www.google.com/ncr').then(() => {
			driver.findElement(By.name('q')).then(element => {
				element.sendKeys('webdriver').then(() => {
					driver.findElement(By.name('btnG')).click();

					driver.wait(until.titleIs('webdriver - Google Search'), 1000)
						.then(() => {
							expect(true).be.true
						})
						.catch(() => {
							expect(true).be.false
						})
						// .then(() => {
						// 	driver.quit();
						// 	done();
						// })
						// .catch(error => {
						// 	driver.quit();
						// 	done(error);
						// });
				})
			})
			
		})

    });

});

