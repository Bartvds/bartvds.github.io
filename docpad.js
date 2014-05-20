/* jshint -W014 */
/* jshint -W098 */

var markedOpts = require('./lib/marked');

var docpadConfig = {
	templateData: {
		site: {
			url: 'http://bartvds.github.io',
			github: 'https://github.com/bartvds/',
			npm: 'https://www.npmjs.org/~bartvds',
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
				'//fonts.googleapis.com/css?family=Open+Sans:400,700',
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
			markedOptions: markedOpts
		}
	},
	events: {
	}
};

module.exports = docpadConfig;
