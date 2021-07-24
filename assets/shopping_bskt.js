//récup de panierStorage
let panier = JSON.parse(localStorage.getItem('panierStorage'));		//parce qu'on ne peut pas remplacer un élément de l'objet du localStorage directement → il faut transformer panierStorage JSON en tableau manipulable (panier) dans le fichier JS / le panier JS sera ensuite retranformé en objet JSON pour le localStorage

//construction du tableau récapitulatif des produits

function recapProducts() {										//Liste les produits choisis nom et prix						
	
	
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
			<input id="delete-${i}" type="submit" value="Supprimer" class="button">
		`;
		totalPrice += priceProduct;

		//suppression d'un produit
		
		let deleteBtn = document.getElementById('delete-' + i);	//losqu'on clique sur le bouton d'id "delete-i"
		deleteBtn.onclick = function(){							

			let productSuppress = panier.splice(i, 1);			//supprime le membre d'indice i du panier et la variable supressProduct stocke l'élément supprimé (→ tableau à un index = 0)
			('Vous avez supprimé ' + productSuppress[0].name + ' du panier.');		//affiche le nom du produit supprimé dans la boite d'alerte
			localStorage.setItem('panierStorage', JSON.stringify(panier));	//mise à jour du panierStorage
			totalPrice -= priceProduct;							//prix total - pris du produit supprimé
			location.reload();								//recharge la page
			};

	}
	
	//écrit le prix total
	
	const lineTotal = document.createElement('p');				
	lineTotal.textContent = totalPrice + ' €';
	document.getElementById('total').append(lineTotal);

}

recapProducts();

//Envoi des données de la commande au serveur

//Préparation des données à envoyer dans un objet postData

const postData = {											
	contact: {							//objet contact : contient les données du formulaire de contact
		firtName: document.getElementById('clientFirstName').value,
		lastName: document.getElementById('clientLastName').value,
		adress: document.getElementById('clientAdress').value,
		city: document.getElementById('clientCity').value,
		mail: document.getElementById('clientMail').value
	},
	products: []						//objet products : tableau contenant les id des produits mis dans le panier
};		
							
for (let i in panier) {					//remplit le tableau products de l'objet postData avec les id des produits du panier											
	postData.products.push(panier[i]._id);
}

console.log(panier);
console.log(postData);

//validation des données et envoi

function commandValid(){

	//vérifier la validité des champs des formulaires

	document.getElementById('clientFirstName').addEventListener('onchange', testDataString);
	function testDataString(event) {
	/*	if() {

			alert('Saisie incorrecte');
			event.preventDefault();
		}*/
	}

	//si au moins un champ n'est pas valide : bloquer l'envoi → preventDefault()
	//si tous les champs sont valides : envoyer une requête fetch post contenant les informations des formulaires (créer un tableau ?)
	//redirection vers la page de confirmation de commande
}




/*

	//construction du tableau récapitulatif des produits

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