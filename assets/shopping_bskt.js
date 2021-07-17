//Bouton de retour à la page d'accueil
document.getElementById('addButton').innerHTML =		//ne fonctionne pas avec getElementsByTagName !!!???
`<input id="return" type="button" value="Retour au catalogue" class="button"></input>`;
let returnButton = document.getElementById('return');

returnButton.addEventListener('click', function(){
	window.location.replace('index.html');
});


//Tableau récapitulatif des produits

//style section récap

document
	.getElementById('shopBskt')
	.setAttribute('class', 'section');
document
	.getElementById('list')
	.setAttribute('class', 'recap');
document
	.getElementById('total')
	.setAttribute('class', 'recap');


console.log(localStorage);

function recapProducts2() {										//Liste les produits choisis nom et prix
	let totalPrice = 0;											//initialisation de la variable qui contient le coût total du panier
	for(let i=0; i<localStorage.length; i++) {					//parcourt le tableau localStorage
		const line = document.createElement('p');				//créé l'élément ligne
		line.setAttribute('class', 'table');
		const name = localStorage.key(i);						//récupère le nom de l'ours
		const price = parseFloat(localStorage.getItem(localStorage.key(i)) / 100);	//récupère le prix de l'ours → conversion chaine en nombre
		document												//ajoute la ligne à la div d'id 'list' 
			.getElementById('list')
			.append(line);
		line.innerHTML =										//ajoute à la ligne les balises p qui contiennent le nom et le prix de l'ours
		`
			<p id="name">${name}</p>
			<p id="price">${price} €</p>
		`;
		totalPrice += price;									//addition des prix à chaque tour de la boucle	
	}
	const lineTotal = document.createElement('p');
	lineTotal.textContent = totalPrice + ' €';
	document.getElementById('total').append(lineTotal);
}
recapProducts2();