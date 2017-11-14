const express = require('express');
const hbs = require('hbs');
fs = require('fs');

var app = express();

// handlebars

// defaults to 'views' directory
app.set('view engine', 'hbs');


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

// express
app.use( express.static( __dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log =  `${now} :: ${req.method} :: ${req.url}` ;
	console.log( log   );
	fs.appendFile('server.log.txt', log + '\n', (err) => {
		if (err) {
			console.log( 'Unable to append to server log\n\n' + err   );
			}
	}); // log fs append
	next();

});

app.use((req, res, next) => {

	res.render('mainenance.hbs');

	// next();
})

// app.get('/', (req, res) => {
//
// 	// res.send('<h1>hello eexpress</h1>');
//
// 	res.type('json');
//
// 	res.send ({
// 		name: 'e',
// 		likes: ['read', 'stuff']
// 	})
// });

app.get('/about', (req, res) => {

	// res.send('About page.');

		res.render('about.hbs', {
		pageTitle: 'Abouttt page Title',
		currentYear: new Date().getFullYear(),
		message: 'Lousy message test.'
	});
});

app.get('/', (req, res) => {

	// res.send('About page.');

		res.render('home.hbs', {
		pageTitle: 'HOme page Title',
		currentYear: new Date().getFullYear(),
		welcome: 'Welcome mmessages'
	});  // close render
});  // close get

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to handle request.'
	});
});

app.listen(3000, () => {
	console.log( 'server is up and running'   );
});

