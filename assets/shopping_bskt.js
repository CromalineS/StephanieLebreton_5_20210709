/**/ //Bouton de retour à la page d'accueil				////à revoir, pas besoin de JS

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
	.setAttribute('class', 'section section-horizontal-center');
document
	.getElementById('list')
	.setAttribute('class', 'recap');
document
	.getElementById('total')
	.setAttribute('class', 'total');

//style section command

const command = document.getElementById('command')
command.setAttribute('class', 'section');

//récup de panierStorage
/*	let panier = JSON.parse(localStorage.getItem('panierStorage'));*/
	/*console.log(panier);*/

//construction du tableau récapitulatif des produits

function recapProducts() {										//Liste les produits choisis nom et prix						
	let panier = JSON.parse(localStorage.getItem('panierStorage'));
	let totalPrice = 0;	//initialisation de la variable qui contient le coût total du panier	
	for(let i in panier) {					//parcourt le tableau localStorage
		
		const list = document.getElementById('list');			//cible la div d'id 'list'
		const line = document.createElement('p');				//crée une ligne pour afficher un élément du panier
		line.setAttribute('class', 'table');					//style de la ligne
		const nameProduct = panier[i].name;						//récupère le nom de l'ours
		const priceProduct = parseFloat(panier[i].price / 100);	//récupère le prix de l'ours → conversion chaine en nombre
		list.append(line);										//ajoute une ligne à la liste pour chaque élément du panier
		line.innerHTML =										//ajoute à la ligne les balises p qui contiennent le nom et le prix du produit, et un bouton de suppression
		`
			<p id="name">${nameProduct}</p>
			<p id="price">${priceProduct}€</p>
			<input id="delete-${i}" type="submit" value="Supprimer" class="button"></input>
		`;
		totalPrice += priceProduct;

		//suppression d'un produit
		
		let deleteBtn = document.getElementById('delete-' + i);	//losqu'on clique sur le bouton d'id "delete-i"
		deleteBtn.onclick = function(){							

			let productSuppress = panier.splice(i, 1);			//supprimer le membre d'indice i du panier
			localStorage.setItem('panierStorage', JSON.stringify(panier));	//mise à jour du panierStorage
			totalPrice -= priceProduct;							//prix total - pris du produit supprimé
			alert('Vous avez supprimé ' + productSuppress[i].name + ' du panier.');		//affiche le nom du produit supprimé dans la boite d'alerte
			location.reload();									//recharge la page
			};

	}
console.log(panier);
	
/*
	panier.splice(0, 1);
	console.log(panier);
*/
/*
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
			<input id="delete-${i}" type="submit" value="Supprimer" class="button"></input>
		`;
		totalPrice += price;									//addition des prix à chaque tour de la boucle	
*/		
		//suppression d'un produit
/*			
		let deleteBtn = document.getElementById('delete-' + i);	
		deleteBtn.onclick = function(){
			localStorage.removeItem(localStorage.key(i));
			totalPrice -= price;
			location.reload();
			};
	}
*/	
	//écrit le prix total
	
	const lineTotal = document.createElement('p');				
	lineTotal.textContent = totalPrice + ' €';
	document.getElementById('total').append(lineTotal);

}

const postData = {
	contact: {},
	products: []
}

function commandValid(){
	//vérifier la validité des champs des formulaires
	//si au moins un champ n'est pas valide : bloquer l'envoi → preventDefault()
	//si tous les champs sont valides : envoyer une requête fetch post contenant les informations des formulaires (créer un tableau ?)
	//redirection vers la page de confirmation de commande
}

recapProducts();
