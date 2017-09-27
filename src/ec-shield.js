window.EC = (function ($, ns) {
	ns.ResourceLocator = ns.ResourceLocator || {};

	ns.ResourceLocator.getBase = function(urlObject, isTestReport) {
		var result;
		if ((typeof urlObject === 'undefined' ? 'undefined' : typeof(urlObject)) !== 'object') throw new Error("ArgumentException: urlObject");
		if (null == urlObject) throw new Error("ArgumentNullException: urlObject");
		if (isTestReport) {
			if (urlObject.hostname === 'localhost') {
				result = { baseUrl: 'https://cdn-tst.euroconsumers.org/html/guidelines' };
			} else {
				result = { baseUrl: urlObject.protocol + '//' + urlObject.hostname.replace('design', 'cdn') + '/html/guidelines' };
			}
		} else if (urlObject.hostname === 'localhost') {
			result = {
				baseUrl: urlObject.protocol + '//' + urlObject.hostname + ':' + urlObject.port + '/Common/widgets',
				src: 'src',
				ext: '.js'
			};
		} else if (urlObject.hostname.includes('design')) {
			result = {
				baseUrl: urlObject.protocol + '//' + urlObject.hostname.replace('design', 'cdn') + '/vendor/euroconsumers',
				src: 'dist',
				ext: '.min.js'
			};
		} else {
			result = {
				baseUrl: urlObject.protocol + '//' + urlObject.hostname + '/~/resource/javascript/common/vendor/euroconsumers',
				src: 'dist',
				ext: '.min.js'
			};
		}
		return result;
	};

	return ns;
} (window.jQuery, window.EC || {}));


(function ($, ec) {
    $.widget('ec.shield', {
        options: {
            widgetName: 'ecShield',
            type: 'test',
            color: 'red'
        },
        _create: function() {
            if (this.options.type === 'test') {
                var locatedResource = ec.ResourceLocator.getBase(new URL(document.URL), true).baseUrl;
                var url = locatedResource + '/' + this.options.widgetName;
                var element = this.element;
                $.get(url)
                    .done(function(data) {
                        if (data.includes('<li>Failures: <strong>0</strong></li>'))
                            element.addClass('shield--tests-green');
                        else
                            element.addClass('shield--tests-red');
                    }).fail(function() {
                        element.addClass('shield--tests-red');
                    });
            } else {
                this.element.addClass('shield--' + this.options.type + '-' + this.options.color);
            }
        }
    });
})(window.jQuery, window.EC);