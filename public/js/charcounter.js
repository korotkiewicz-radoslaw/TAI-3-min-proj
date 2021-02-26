window.onload = () => {
	let textarea = document.getElementById('question');
	let charCounter = document.getElementById('char-counter');
	let maxCharacters = 1000;

	charCounter.textContent = `0/${maxCharacters}`;

	textarea.addEventListener('input', () => {
		charCounter.innerHTML = `${textarea.value.length}/${maxCharacters}`;
	});
}
