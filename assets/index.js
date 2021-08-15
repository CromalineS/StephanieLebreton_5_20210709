//Importation des données du catalogue depuis le serveur

function accessData() {											//fonction de récupération des données du serveur	
	fetch('http://localhost:3000/api/teddies' )					//adresse de destination de la requête
	.then(response => response.json())							//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
	.then(data => catalog(data))								//exécute la fonction qui crée le catalogue (en cas de succès de la requête)
	.catch(error => console.log('Request failed → ' + error))	//signale un échec de la requête
}

const control = [];												//création d'un objet array pour envoyer les _id dans le localStorage et les rendre disponibles à la page products.html → contrôle des données transmises dans l'URL et message d'erreur 404 si non conformes

function catalog(data) {										//fonction qui remplit le catalog avec les données récupérée
	
	console.log('Request successful', data);					//contrôle réussite de la requête dans la console et affichage des données récupérées = tableau contenant un tableau par produit				

	for(const i in data) {	//version avec indice pour gestion des animations 	//pour chaque cellule du tableau
		const catalog = document.getElementById('catalog');						//cible la div d'id 'catalog'
		const product = document.createElement('article');							//création d'une div pour afficher le produit
		product.setAttribute('class', 'section section-horizontal-center anim anim-' + i);	//style de la div qui affiche le produit (pour gérer les délais de l'animation)
		catalog.append(product);												//ajoute une ligne au catalogue pour chaque produit ( for chaque élément of tableau data)
		product.innerHTML =														//littéraux gabarit pour ajouter les infos de chaque produit = nom, vignette, une balide form contenant deux input (une cachée "contenant" l'id, une submit pour envoyer l'id dans l'url et aller à la page produit correspondante)
		`
			<div class="grid-1">
				<h3>${data[i].name}</h3>
			</div>
			<div class="grid-1">
				<img src="${data[i].imageUrl}" class="thumbnail-teddies">
			</div>
			<div class="grid-1">
				<form action="product.html" class="button-right">
					<input type="hidden" name="teddyId" value="${data[i]._id}">
					<input type="submit" value="Plus d'infos !" class="button">
				</form>
			</div>
		`;
		control.push('teddyId=' + data[i]._id);							//place les _id esd produits dans "control"
	}

	localStorage.setItem('controlStorage', JSON.stringify(control));	//envoi du tableau des _id dans le localStrorage (au format JSON)

}

accessData();

console.log(control);		//contrôle