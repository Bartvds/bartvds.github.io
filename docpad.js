/* jshint -W014 */


var hljs;
function highlightCode(code, lang) {
	if (!hljs) {
		hljs = require('highlight.js');
		hljs.configure({tabReplace: '    '}); // 4 spaces
		hljs.registerLanguage('typescript', require('./lib/highlight/typescript'));
	}
	if (lang) {
		return hljs.highlight(lang, code).value;
	}
	return hljs.highlightAuto(code).value;
}

var docpadConfig = {
	templateData: {
		site: {
			url: 'http://bartvds.github.io',
			github: 'https://github.com/bartvds/bartvds.github.io',
			ref: 'bartvds.github.io',
			home: '/',
			gh: {
				user: 'bartvds',
				repo: 'bartvds.github.io'
			},
			oldUrls: [],
			title: 'Bartvds',
			description: 'Content for Bart van der Schoor.',
			keywords: 'bart van der schoor',
			styles: [
				'/styles/semantic.min.css',
				'/styles/style.css'
			],
			scripts: [
				'//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js',
				'/scripts/semantic.min.js',
				'/scripts/script.js'
			],
			analytics: {
				id: 'UA-9726051-3',
				site: 'bartvds.github.io'
			}
		},
		getPreparedTitle: function() {
			if (this.document.title) {
				return '' + this.document.title + ' | ' + this.site.title;
			} else {
				return this.site.title;
			}
		},
		getPreparedDescription: function() {
			return this.document.description || this.site.description;
		},
		getPreparedKeywords: function() {
			return this.site.keywords.concat(this.document.keywords || []).join(', ');
		}
	},
	collections: {
		projects: function() {
			return this.getCollection('documents').findAllLive({
				relativeOutDirPath: 'projects'
			});
		}
	},
	environments: {
		development: {
			templateData: {
				site: {
					url: false
				}
			}
		}
	},
	plugins: {
		marked: {
			markedOptions: {
				gfm: true,
				highlight: highlightCode
			}
		}
	},
	events: {
		serverExtend: function(opts) {
			var server = opts.server;
			var docpad = this.docpad;
			var latestConfig = docpad.getConfig();
			var oldUrls = latestConfig.templateData.site.oldUrls || [];
			var newUrl = latestConfig.templateData.site.url;
			return server.use(function(req, res, next) {
				if (oldUrls.indexOf(req.headers.host) >= 0) {
					return res.redirect(newUrl + req.url, 301);
				} else {
					return next();
				}
			});
		}
	}
};

module.exports = docpadConfig;
