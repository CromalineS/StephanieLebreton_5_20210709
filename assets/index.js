//Importation des données du catalogue depuis le serveur

document.addEventListener('DOMContentLoaded', () => {	//pour que les scripts JS s'éxécutent après le cahrgement du DOM sans attendre la fin de ceux des feuilles de style, images ...
	
	function accessData () {							//fonction de récupération des données du serveur	
		fetch('http://localhost:3000/api/teddies')					//adresse de destination de la requête
		.then(response => response.json())				//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
		.then(data => createCatalog(data))
		.catch(error => alert('Request failed → ' + error))
	}
	
	function createCatalog(data) {						//fonction qui remplit le catalog avec les données récupérée
		console.log('Request successful', data);		//contrôle réussite de la requête dans la console et affichage des données récupérées				
		for(const i of data) {							//pour chaque cellule du tableau
			//création des éléments du DOM
			const catalog = document.getElementById('catalog'); //selectionne l'élément dans lequel on insère les données
			const catalogLine = document.createElement('li');	//création de l'élément ligne
			const name = document.createElement('p');				//création de l'élément p
			const thumbnail = document.createElement('img');	//création l'élément img pour la vignette
			const choiceButton = document.createElement('input');	//création du bouton de validation du choix de l'article	
			//insertion des données dans les éléments crées
			name.innerText = i.name;						//écrit le nom du produit dans la ligne créée
			thumbnail.src = i.imageUrl;							//télécharge l'image du produit dans la balise img
			//assignation attributs
			catalogLine.setAttribute('id', i._id);				//attribue l'id de la cellule du taleau à la ligne du catalogue créée
			choiceButton.setAttribute('type', 'button');		//définition du boutton de choix
			choiceButton.setAttribute('value', 'Je veux ' + i.name + ' ! '); //définition du boutton de choix
			//styles
			name.classList.add('ajust-name');
			choiceButton.classList.add('ajust-button');
			thumbnail.classList.add('thumbnail-teddies');
			//ajout des éléments créés au DOM
			catalog.append(catalogLine);						//ajout de li dans ul
			catalogLine.append(name);								//ajout de p dans li
			catalogLine.append(thumbnail);						//ajout de img dans li
			catalogLine.append(choiceButton);
		}
	};
	
	accessData();
})
