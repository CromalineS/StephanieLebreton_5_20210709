//récupération de l'identifiant produit transmis dans l'URL par la page indx.html = 

let sendId = location.search.substring(1).split('=')[1];	//la chaine des données envoyées via l'URL est transformée en 2 sous-chaine : premier membre du tableau (indice 0) = nom de la donnée, 2eme membre du tableau (indice 1) = valeur de la donnée
/*console.log(sendId);
console.log(typeof sendId);*/

//appel des données correspondant à l'identifiant envoyé via l'URL

function accessData () {										//fonction de récupération des données du serveur	
		fetch('http://localhost:3000/api/teddies/' + sendId)	//adresse de destination de la requête 	
		.then(response => response.json())						//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
		.then(data => productDetails(data))
		.catch(error => alert('Request failed → ' + error))
	}

//initialisation du local storage = création de l'objet panierStorage pour contenir les données d'un produit

if(localStorage.getItem('panierStorage')){
	//console.log('Le panier existe déjà');
}else{
	//console.log('Création du panier');
	const init = [];												//création d'un objet array
	localStorage.setItem('panierStorage', JSON.stringify(init));	//stockage de l'objet 'init' dans le local storage / JSON.stringify() = conversion de l'objet JavaScript en chaine JSON interprétable par le navigateur
}

//récupération de "panierStorage" dans "panier" pour pouvoir le remplir avec les données du produits correspondant à l'identifiant transmit dans l'URL

let panier = JSON.parse(localStorage.getItem('panierStorage'));		//JSON.parse() construit un objet JavaScript à partir de la chaine JSON
console.log(panier);

//construction de la page "détail du produit et choix des options"

function productDetails(data) {
	
	console.log('Request successful', data);						//contrôle réussite de la requête dans la console et affichage des données récupérées
	
	document.querySelector('head > title').textContent = data.name + ' - Oripeluche';	//nom du produit dans la balise "title"
		
	//affichage des données descriptives dans la div "details"
	
	const details = document.getElementById('details');			//cible l'élément dans lequel on insère les données
	details.innerHTML =											//littéraux gabarit pour ajouter les neuds (nom du produit, photo et descrptif)
	`
		<h4>${data.name} : ${data.price/100} €</h4>								
		<img src="${data.imageUrl}" class="photo">			
		<p>${data.description}</p>
	`;

	//affichage des données de personnalisation et envoie de l'article dans le panier de l'article (dans la div "choice")
	
	const choice =document.getElementById('choice');			//cible l'élément dans lequel on insère les données
/**/choice.innerHTML =											//à revoir, pas besoin de JS sauf pour le bouton qui mentionne le nom du produit
	`
		<form class="form-choice">
			<label for="colors">Choisissez la couleur</label>
			<select id="colors"></select>
		</form>
		<form class="form-choice">
			<label for="howMany">Combien en voulez-vous?</label>
			<input type="number" id="howMany" value='1'>
		</form>
		<form class="ajust-button">
			<input id="buyTeddie" type="button" value="Ajouter ${data.name} au panier !" class="button">
		</form>
	`;

	function addOptions(){											//Ajout des options à la liste déroulante du choix des couleurs
		for(const x of data.colors) {
			const option = document.createElement('option');		//crée l'élément "option" pour chaque valeur du tableau
			option.setAttribute('value', x);						//pour pourvoir utiliser la valeur de la couleur peut-être ?
			option.textContent = x;									//écrit le texte de l'option
			document.getElementById('colors').append(option);		//ajoute les balises 'option' à la balise 'select' d'id 'colors'			
		}
	}
	addOptions();

	//stockage de la sélection dans la localStorage

	function addShoppingBasket() {
		panier.push(data);												//les données du produit sont placée dans le panier
		localStorage.setItem('panierStorage', JSON.stringify(panier));	//stockage du panier dans le local storage : paire clé(panierStorage)/valeur(objet panier converti en chaine JSON)
		alert('Produit ajouté : ' + data.name);
		location.reload();
	}

	const buyTeddie = document.getElementById('buyTeddie');				
	buyTeddie.addEventListener('click', addShoppingBasket);				//écouteur = permet d'exécuter la fonction addShoppingBasket au click sur le bouton

}

accessData();
