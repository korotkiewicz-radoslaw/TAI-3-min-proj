const max_answers = 12;
let current_answers_count = 2;

window.addEventListener("DOMContentLoaded", () => {
	let entriesArea = document.getElementById('entries');
	let addEntryButton = document.getElementById('add');

	current_answers_count = document.getElementsByClassName('entry').length;

	addEntryButton.addEventListener('click', () => {
		if (current_answers_count < max_answers)
			addEntry(entriesArea);
		else
			alert(`You've reached max ${max_answers} answers!`);
	});
});

let addEntry = (container) => {
	let entry = document.createElement('div');
	entry.classList.add("entry");

	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('name', 'ans');

	let button = document.createElement('button');
	button.setAttribute('type', 'button');
	button.setAttribute('class', 'add');
	button.innerText = 'X';

	entry.appendChild(input);
	entry.appendChild(button);

	container.appendChild(entry);
	current_answers_count++;
}
