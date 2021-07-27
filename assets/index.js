//Importation des données du catalogue depuis le serveur

function accessData() {										//fonction de récupération des données du serveur	
	fetch('http://localhost:3000/api/teddies' )				//adresse de destination de la requête
	.then(response => response.json())						//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
	.then(data => catalog(data))							//exécute la fonction qui crée le catalogue (en cas de succès de la requête)
	.catch(error => alert('Request failed → ' + error))		//signale un échec de la requête
}

function catalog(data) {									//fonction qui remplit le catalog avec les données récupérée
	
	console.log('Request successful', data);				//contrôle réussite de la requête dans la console et affichage des données récupérées = tableau contenant un tableau par produit				
	
	for(const x of data) {									//pour chaque cellule du tableau

		const catalog = document.getElementById('catalog');					//cible la div d'id 'catalog'
		const product = document.createElement('div');						//création d'une div pour afficher le produit
		product.setAttribute('class', 'section section-horizontal-center');	//style de la div qui affiche le produit
		catalog.append(product);											//ajoute une ligne au catalogue pour chaque produit ( for chaque élément of tableau data)
		product.innerHTML =													//littéraux gabarit pour ajouter les infos de chaque produit = nom, vignette, une balide form contenant deux input (une cachée "contenant" l'id, une submit pour envoyer l'id dans l'url et aller à la page produit correspondante)
		`
			<div class="tiers">
				<h3>${x.name}</h3>
			</div>
			<div class="tiers">
				<img src="${x.imageUrl}" class="thumbnail-teddies">
			</div>
			<div class="tiers">
				<form action="product.html" class="button-right">
					<input type="hidden" name="teddyId" value="${x._id}">
					<input type="submit" value="Plus d'infos !" class="button">
				</form>
			</div>
		`;
	}
}
/*
	//Syntaxe classique
		//création des éléments du DOM
		const catalog = document.getElementById('catalog'); 	//selectionne l'élément dans lequel on insère les données
		const catalogLine = document.createElement('li');		//crée l'élément li
		const name = document.createElement('p');				//crée l'élément p
		const thumbnail = document.createElement('img');		//crée l'élément img pour la vignette
		const selectId = document.createElement('form');		//crée un formulaire pour envoi de l'id de l'ours choisi à la page product.html
		const wrapId = document.createElement('input');			//crée une input (à rendre invisible) pour contenir l'id de l'ours choisi
		const sendId = document.createElement('input');			//crée le bouton visible de sélection de l'ours	
		//insertion des données dans les éléments créés
		name.innerText = i.name;								//écrit le nom du produit dans la ligne créée
		thumbnail.src = i.imageUrl;								//télécharge l'image du produit dans la balise img
		//assignation attributs et valeurs au formulaire pour l'envoi de données vers la page product.html
		selectId.setAttribute('action', 'product.html');		//indiquer la cible
		selectId.setAttribute('method', 'GET');					//indique la méthode de transmission des données vers la cible
		wrapId.setAttribute('type', 'hidden')					//cache l'input du formulaire qui contient la donnée à envoyer vers la cible
		wrapId.setAttribute('name', 'teddyId');					//permet de donner un nom à la donnée à envoyer vers la cible (nom de variable)
		wrapId.setAttribute('value', i._id);					//indique la valeur de la donnée 
		sendId.setAttribute('type', 'submit');					//le click sur le bouton charge la page product.html avec la donnée dans l'URL
		sendId.setAttribute('value', 'Je veux voir ' + i.name + ' ! '); //texte du bouton de sélection
		//styles
		name.classList.add('ajust-name');
		selectId.classList.add('ajust-button');
		thumbnail.classList.add('thumbnail-teddies');
		//ajout des éléments créés au DOM
		catalog.append(catalogLine);							//ajout de li dans ul
		catalogLine.append(name);								//ajout de p dans li
		catalogLine.append(thumbnail);							//ajout de img dans li
		catalogLine.append(selectId);							//ajout de form dans li
		selectId.append(sendId, wrapId);						//ajout des 2 input dans form
*/





accessData();
