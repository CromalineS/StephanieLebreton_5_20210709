document.addEventListener('DOMContentLoaded', () => {	//pour que les scripts JS s'éxécutent après le cahrgement du DOM sans attendre la fin de ceux des feuilles de style, images ...

//Bouton de retour à la page d'accueil

document
	.getElementById('return')
	.innerHTML = 
	`
		<form action="index.html">
			<input type="submit" value="Retour au catalogue" class="button">
		</form>
	`;


	//récupération des données transmises dans l'URL par la page indx.html

	let sendId = location.search.substring(1).split('=')[1];	//la chaine des données envoyées via l'URL est transformée en 2 sous-chaine : premier membre du tableau (indice 0) = nom de la donnée, 2eme membre du tableau (indice 1) = valeur de la donnée
	console.log(sendId);
	console.log(typeof sendId);

	//appel des données correspondant à l'identifiant envoyé via l'URL

	function accessData () {										//fonction de récupération des données du serveur	
			fetch('http://localhost:3000/api/teddies/' + sendId)	//adresse de destination de la requête	
			.then(response => response.json())						//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
			.then(data => productDetails(data))
			.catch(error => alert('Request failed → ' + error))
		}

	//construction de la page "détail du produit et choix des options"

	function productDetails(data) {

		//contrôle réussite de la requête dans la console et affichage des données récupérées

		console.log('Request successful', data);					

		//nom de l'ours dans la balise "title"

		document
			.querySelector('head > title')
			.textContent = data.name + ' - Oripeluche';

		//style de l'article "page"

		document
			.getElementById('page')								
			.setAttribute('class', 'section');

		//affichage des données descriptives dans la div "details"
		
		const details = document.getElementById('details');			//cible l'élément dans lequel on insère les données
		details.setAttribute('class', 'details'); 					//attribue une classe à la div "details"
		details.innerHTML =											//littéraux gabarit pour ajouter les neuds (nom du produit, photo et descrptif)
		`
			<h4>${data.name} : ${data.price/100} €</h4>								
			<img src="${data.imageUrl}" class="photo">			
			<p>${data.description}</p>
		`;

		//affichage des données de personnalisation, prix et choix de l'article dans la div "choice"
		
		const choice =document.getElementById('choice');			//cible l'élément dans lequel on insère les données
		choice.setAttribute('class', 'choice');
		choice.innerHTML =
		`
			<form>
				<label for="colors">Choisissez la couleur</label>
				<select id="colors"></select>
			</form>
			<form>
				<label for="howMany">Combien en voulez-vous?</label>
				<input type="number" id="howMany" value='1'></input>
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
				document.getElementById('colors').append(option);							//ajoute les balises 'option' à la balise 'select' d'id 'colors'			
			}
		}
		addOptions();

		//ajout d'un bouton pour aller au panier

		document
			.getElementById('go')
			.innerHTML = 
		`
			<form action="shopping_bskt.html" class="button-center">
				<input type="submit" value="Voir le panier" class="button">
			</form>
		`;

		//stockage de la sélection

		const buyTeddie = document.getElementById('buyTeddie');
		buyTeddie.addEventListener('click', addShoppingBasket);
		function addShoppingBasket() {

			localStorage.setItem(data.name, data.price);

			/*localStorage.setItem('name', data.name);
			localStorage.setItem('price', data.price);*/
		}

	}

	accessData();

})

	/*
		const selectColors = document.getElementById('colors');		//Ajout des options à la liste déroulante du choix des couleurs
		let option = document.createElement('option');
		data.colors.forEach( x => { 
			option.setAttribute('value', x);
			option.textContent = x;
			selectColors.append(option);
		});									//ne fonctionne pas  : ne donne que le dernier choix ????
	*/