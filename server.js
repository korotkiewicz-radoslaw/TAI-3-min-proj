const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

app.use(express.static(path.join(__dirname, 'public'), {dotfiles: 'allow'}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	if (req.query.id === undefined)
		res.redirect('/creator');
	else {
		// is there poll with this id?
		// for now there isn't.
		res.redirect('/404');
	}
});

app.get('/creator', (req, res) => {
	res.render('creator');
});

app.post('add', (req, res) => {

});

app.get('answers', (req, res) => {

});

app.get('/404', (req, res) => {
	res.status(404).render('404');
});

app.get('*', (req, res) => {
	res.status(404).redirect('/404');
});

app.listen(3012, () => {
	console.log('Poll service running on port 3012');
});
