window.addEventListener("DOMContentLoaded", () => {
	let submitButton = document.getElementById('submit');
	let can_submit = true;
	let request_data = {
		question: '',
		answers: []
	}

	submitButton.addEventListener('click', () => {
		if (!can_submit) return;
		can_submit = false;

		let addButton = document.getElementById('add');
		addButton.remove(); 

		let question = document.getElementById('question');
		let answers = document.getElementsByClassName('entry');

		request_data.question = question.value;

		for (let i = 0; i < answers.length; i++) {
			request_data.answers[i] = answers[i].childNodes[1].value;
		}

		let json = JSON.stringify(request_data);
		console.log(json);

		let form = document.getElementById('form');

		let xhr = new XMLHttpRequest();
		let url = window.location.origin + '/add';

		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let response = JSON.parse(xhr.responseText);

				let link = document.createElement('input');
				link.setAttribute('type', 'text');
				link.value = response.link;
				link.readOnly = true;

				form.appendChild(link);
				
				console.log(response.link);
			}
		}
		xhr.send(json);

		submitButton.remove();

	});
});