//Bouton de retour à la page d'accueil
document.getElementById('addButton').innerHTML =		//ne fonctionne pas avec getElementsByTagName !!!???
`<input id="return" type="button" value="Retour au catalogue" class="button"></input>`;
let returnButton = document.getElementById('return');

returnButton.addEventListener('click', function(){
	window.location.replace('index.html');
});