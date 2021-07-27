//récupération de panierStorage parce qu'on ne peut pas remplacer un élément de l'objet du localStorage directement
//→ il faut transformer panierStorage JSON en tableau manipulable (panier) dans le fichier JS
// le panier JS sera ensuite retranformé en objet JSON pour le localStorage

let panier = JSON.parse(localStorage.getItem('panierStorage')); //tableau des produits sélectionnés sous forme d'objets contenant les données : _id du produit, son nom et son prix

//CONSTRUCTION DU TABLEAU RÉCAPITULATIF DES PRODUITS SÉLECTIONNÉS ET ANNONCE PRIX TOTAL

let totalPrice = 0;												//initialisation de la variable qui contient le coût total du panier	

function recapProducts() {				
	for(let i in panier) {										//pour chaque produit du panier...
		const list = document.getElementById('list');			//dans la dic d'id 'list'...
		const line = document.createElement('p');				//créer une ligne pour afficher les données du produit
		line.setAttribute('class', 'table');					//style de la ligne (flex row wrap)
		const nameProduct = panier[i].name;						//variable qui stocke le nom de l'ours
		const priceProduct = panier[i].price / 100;				//variable qui stocke le prix de l'ours
		list.append(line);										//ajoute la ligne à la liste
		line.innerHTML =										//ajoute à la ligne les balises p qui contiennent le nom et le prix du produit, et un bouton de suppression
		`
			<p id="name">${nameProduct}</p>
			<p id="price">${priceProduct} €</p>
			<input id="delete-${i}" type="submit" value="Supprimer" class="button">
		`;
		totalPrice += priceProduct;								//calcule la somme totale du panier

		//suppression d'un produit
		
		let deleteBtn = document.getElementById('delete-' + i);	//désigne le bouton 'supprimer' du produit
		deleteBtn.onclick = function(){							//au clique sur le bouton d'id "delete-i"
			let productSuppress = panier.splice(i, 1);			//supprime le produit (d'indice i) du panier et la variable supressProduct stocke l'élément supprimé = tableau à un index (0)
			('Vous avez supprimé ' + productSuppress[0].name + ' du panier.');	//affiche le nom du produit supprimé dans la boite d'alerte
			localStorage.setItem('panierStorage', JSON.stringify(panier));		//met à jour de panierStorage pour le localStorage
			totalPrice -= priceProduct;							//déduction du prix du produit supprimé du prix total
			location.reload();									//recharge la page = panier à jour
			};
	}
	
	//écriture du prix total du panier
	
	const lineTotal = document.createElement('p');				//crée une balise p		
	lineTotal.textContent = totalPrice + ' €';					//écrit le prix dans la balise p
	document.getElementById('total').append(lineTotal);			//ajoute la balise p dans la div d'id 'total'

}

recapProducts();												//exécute la fonction de construction du tableau récapitulatif des produits 

//VALIDATION DU FORMULAIRE ET ENVOI DES DONNÉES
		
			//limiter le nombre de caractères saisis ?

//fonction pour validation des champs du formulaire au moment de l'envoi (clique sur le bouton de validation de la commande)

//création des regex pour tester les champs

const regexText = /^[a-zA-Záàâäåãéèêêëíìîïóòôöõúùûüýÿçñ]+[-' ]?[a-zA-Záàâäåãéèêêëíìîïóòôöõúùûüýÿçñ]+$///commence par au moins une lettre / contient 0 ou 1 tiret, apostrophe ou espace / se termine par au moins une lettre
const regexMail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/;	//commence par au moins un [lettre, chiffre, point, underscore ou tiret] / @ / au moins deux [lettre, chiffre, point, underscore ou tiret] / un point / se termine par au moins 2 lettres minuscules et jusqu'à 6
const regexAddress = /^[0-9]+[ a-zA-Záàâäåãéèêêëíìîïóòôöõúùûüýÿçñ]+$/;	//commence par au moins un chiffre / se termine par au moins une lettre

//création d'un tableau vide pour contenir les résultats du tests des champs

let resultTest = [];										
	
//fonction test regex à appliquer aux champs du formulaire

function testRegex(regex, id, i){								//argument i pour remplir le tableau resultTest
	const input = document.getElementById(id);					//cible l'input
	const label = input.previousElementSibling;					//cible le label correspondant à l'input
	if(regex.test(input.value) === false){						//si la valeur du champ ne correspond pas à la regex
		input.setAttribute('class', 'error-input');				//le champ invalide est mis en évidence (fond rouge)
		label.lastChild.textContent = 'saisie incorrecte';		//écrit un message d'erreur dans un span dans le label du champ
		label.lastChild.setAttribute('class', 'error-label');	//le span est mit en évidence (texte rouge)
		resultTest[i] = 'invalide';							//donne la valeur 'invalide' à la cellule d'indice i du tableau resultTest
	}else{														//si la valeur du champ correspond à la regex
		input.removeAttribute('class', 'error-input');			//le champ valide a son aspect d'origine
		label.lastChild.textContent = '';						//le span dans le label du champ est vide
		resultTest[i] = 'valide';								//donne la valeur 'valide' à la cellule d'indice i du tableau resultTest
	}
	//contrôle (à supprimer)
	console.log(resultTest);									
}

//création de l'objet contenant les données à envoyer

const dataToPost = {											
	contact: {							//objet contact : contient les données du formulaire de contact
		firstName: document.getElementById('firstName').value,
		lastName: document.getElementById('lastName').value,
		address: document.getElementById('address').value,
		city: document.getElementById('city').value,
		email: document.getElementById('eMail').value
	},
	products: []						//objet products : tableau contenant les id des produits mis dans le panier
};		
							
for (let i in panier) {					//remplit le tableau products de l'objet dataToPost avec les id des produits du panier											
	dataToPost.products.push(panier[i]._id);
}

//contrôle (à supprimer)
console.log(panier);
console.log(dataToPost);

let formulaire = document.getElementById('formValid');

formulaire.addEventListener('submit', e => postData(e));
function postData(e){
	e.preventDefault();												//bloque la soumission du formulaire automatique au click sur le bouton submit pour pouvoir vérifier les données avant l'envoyer les données au serveur
	testRegex(regexText, 'firstName', 0);							//test champ prénom
	testRegex(regexText, 'lastName', 1);							//test champ nom
	testRegex(regexMail, 'eMail', 2);								//test champ email
	testRegex(regexAddress, 'address', 3);							//test champ adresse
	testRegex(regexText, 'city', 4);								//test champ ville
	if(resultTest.includes('invalide')) {							//si au moins un champ du formulaire n'est pas valide												
		document.getElementById('error-message').textContent = 'Veuillez corriger les saisies incorrectes'; //écrit un message d'erreur dans la balise d'id 'error-message'
	}else{															//sinon, si tous les champs du formulaire sont valides
		
		document.getElementById('error-message').textContent = '';
		fetch('http://localhost:3000/api/teddies/order/', {			//envoi des données au serveur = requête fetch à l'url du serveur
			method: 'POST',											//indique la méthode d'envoi des données
			headers: {'Content-Type': 'application/json'},			//indique le format des données envoyées (JSON)
			body: JSON.stringify(dataToPost)						//données converties au format JSON
		})
		.then(response => response.json())							//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
		.then(data => confirm(data))								//exécute la fonction qui envoie vers la page de confirmation et stocke les données dans le localStorage
		.catch(error => alert('Request failed → ' + error))			//signale un échec de la requête
	}
}

function confirm(data) {
	console.log('Request successful', data);						//contrôle réussite de la requête dans la console et affichage des données récupérées = tableau contenant un tableau par produit				
	localStorage.setItem('priceCommand', totalPrice);				//stocke le prix total de la commande dans le localStorage
	localStorage.setItem('idCommand', data.orderId);				//stocke le numéro de la commande dans le localStorage
	document.location.href = 'confirm.html';
}
			
/*			.then(console.log(response.orderId))					//contrôle (à supprimer)
/*			.then(function(numCommand){								  			
					console.log(numCommand.orderId)					//contrôle (à supprimer)
					localStorage.setItem('prix', prix);				//
					localStorage.setItem('orderId', numCommand.orderId);
					window.location = 'url'							//envoie vers la page de validation
			})								//exécute la fonction qui envoie vers la page de confirmation
*/			
															//envoyer les données au serveur et rediriger l'utilisateur vers la page de confimation qui affiche la réponse du serveur




	//si au moins un champ n'est pas valide : bloquer l'envoi → preventDefault()
	//si tous les champs sont valides : envoyer une requête fetch post contenant les informations des formulaires (créer un tableau ?)
	//redirection vers la page de confirmation de commande


/*juste pour voir les formulaires
	console.log(document.forms);
	console.log(document.forms[1]);
	console.log(document.forms[1][0]);
	console.log(document.forms[1][1]);
	console.log(document.forms[1][2]);
	console.log(document.forms[1][3]);
	console.log(document.forms[1][4]);
*/

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