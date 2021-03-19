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
	if (req.query.id === undefined || req.query.id == '')
		res.status(200).redirect('/creator');
	else {
		// is there poll with this id?
		// for now there isn't.
		if (!fs.existsSync('./polls/' + req.query.id)) {
			res.redirect('/404');
			return;
		}

		let json = JSON.parse(fs.readFileSync('./polls/' + req.query.id).toString());

		let generateAnswer = (text, id) => {
			return `<button type="button" class="answer" id="${id}">${text}</button>`
		} 

		let answersHtml = '';

		for (let i = 0; i < json.answers.length; i++) {
			answersHtml += generateAnswer(json.answers[i], i) + '\n';
		}

		res.render('vote', {
			question: json.question,
			answers: answersHtml
		});
	}
});

app.get('/creator', (req, res) => {
	res.render('creator');
});

app.post('/add', (req, res) => {
	console.log(req.body);

	if (!fs.existsSync('./polls'))
		fs.mkdirSync('./polls');

	let id = makeid(8);

	fs.writeFileSync('./polls/' + id, JSON.stringify(req.body), (err) => {
		if (err) throw err;
		console.log(`Saved new poll (${id})`);
	});
	
	res.status(200).send(JSON.stringify({ link: 'http://localhost:' + port + '/?id=' + id }));
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

let makeid = (length) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++)
		result += characters.charAt(Math.floor(Math.random() * characters.length));

	return result;
}
