const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const port = 3012;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'), {dotfiles: 'allow'}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	if (req.query.id === undefined)
		res.status(200).redirect('/creator');
	else {
		// is there poll with this id?
		// for now there isn't.
		res.redirect('/404');
	}
});

app.get('/creator', (req, res) => {
	res.render('creator');
});

app.post('/add', (req, res) => {
	console.log(req.body);
	
	res.status(200).send(JSON.stringify({link:'good.com'}));
});

app.get('/answers', (req, res) => {

});

app.get('/404', (req, res) => {
	res.status(404).render('404');
});

app.get('*', (req, res) => {
	res.redirect('/404');
});

app.listen(port, () => {
	console.log(`Poll service running on port ${port}`);
});
