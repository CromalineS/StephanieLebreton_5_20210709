document.addEventListener('DOMContentLoaded', () => {	//pour que les scripts JS s'éxécutent après le cahrgement du DOM sans attendre la fin de ceux des feuilles de style, images ...

	//Bouton de retour à la page d'accueil

	const returnBtn = document.getElementById('return')
	returnBtn.innerHTML = 
		`
			<form action="index.html">
				<input type="submit" value="Retour au catalogue" class="button"></input>
			</form>
		`;

	//style section shopBskt

	document
		.getElementById('shopBskt')
		.setAttribute('class', 'section');
	document
		.getElementById('list')
		.setAttribute('class', 'recap');
	document
		.getElementById('total')
		.setAttribute('class', 'total');

	//Tableau récapitulatif des produits

	let totalPrice = 0;	//initialisation de la variable qui contient le coût total du panier

	function recapProducts() {										//Liste les produits choisis nom et prix						
		
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
				<p class="button-right">
					<input type="hidden" value="${price}"></input>
					<input id="delete-${i}" type="submit" value="Supprimer" class="button"></input>
				</p>
			`;
			totalPrice += price;									//addition des prix à chaque tour de la boucle	
		
			//suppression d'un produit
			
			let deleteBtn = document.getElementById('delete-' + i);	
			deleteBtn.onclick = function(){
								localStorage.removeItem(localStorage.key(i));
								totalPrice -= price;
								location.reload();
								};
		
		}
		
		//écrit le prix total
		
		const lineTotal = document.createElement('p');				
		lineTotal.textContent = totalPrice + ' €';
		document.getElementById('total').append(lineTotal);
	
	}
	recapProducts();

})