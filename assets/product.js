//Contrôle des données de l'URL

const control = JSON.parse(localStorage.getItem('controlStorage'));

function controlURL(){
	for(const x in control) {
		if(control.includes(location.search.substring(1))){				//si l'URL est conforme et que des données sont transmises
			//récupération de l'identifiant produit transmis dans l'URL par la page index.html = 
			let sendId = location.search.substring(1).split('=')[1];	//la chaine des données envoyées via l'URL est transformée en 2 sous-chaines : premier membre du tableau (indice 0) = nom de la donnée, 2eme membre du tableau (indice 1) = valeur de la donnée
			//appel des données correspondant à l'identifiant envoyé via l'URL
			fetch('http://localhost:3000/api/teddies/' + sendId)		//adresse de destination de la requête 	
			.then(response => response.json())							//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
			.then(data => productDetails(data))							//exécute la fonction qui affiche les détails du produit
			.catch(error => console.log('Request failed → ' + error))
		}else{
			document.location.href = 'erreur404.html';						//si l'URL n'est pas conforme ou qu'aucune donnée n'est transmise, l'utilisateur est renvoyé vers la page 'erreur404'
		}
	}
}
controlURL();

//récupération de "panierStorage" dans "panier" pour pouvoir le remplir avec les données du produits correspondant à l'identifiant transmit dans l'URL

let panier = JSON.parse(localStorage.getItem('panierStorage'));		//JSON.parse() construit un objet JavaScript à partir de la chaine JSON
console.log(panier);	//contrôle

//construction de la page "détails du produit et choix des options"

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
			<label for="colors">Choisissez une couleur</label>
			<select id="colors"></select>
		</form>
		<form class="ajust-button">
			<input id="buyTeddie" type="button" value="Ajouter ${data.name} au panier !" class="button">
		</form>
	`;

	//Ajout des options à la liste déroulante du choix des couleurs
	
	for(const x of data.colors) {
		const option = document.createElement('option');		//crée l'élément "option" pour chaque valeur du tableau
		option.setAttribute('value', x);						//pour pourvoir utiliser la valeur de la couleur peut-être ?
		option.textContent = x;									//écrit le texte de l'option
		document.getElementById('colors').append(option);		//ajoute les balises 'option' à la balise 'select' d'id 'colors'			
	}

	//stockage de la sélection dans la localStorage

	function addShoppingBasket() {
		panier.push(data);												//les données du produit sont placée dans le panier
		localStorage.setItem('panierStorage', JSON.stringify(panier));	//stockage du panier dans le local storage : paire clé(panierStorage)/valeur(objet panier converti en chaine JSON)
		location.reload();
	}
	const buyTeddie = document.getElementById('buyTeddie');				
	buyTeddie.addEventListener('click', addShoppingBasket);				//écouteur = permet d'exécuter la fonction addShoppingBasket au click sur le bouton
	const infoPanier = document.getElementById('info');
		infoPanier.textContent = panier.length;
		console.log(panier.length);
}



/*
		<form class="form-choice">
			<label for="howMany">Combien en voulez-vous?</label>
			<input type="number" id="howMany" value='1'>
		</form>
*/