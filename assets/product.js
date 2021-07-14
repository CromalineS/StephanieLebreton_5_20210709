 //Bouton de retour à la page d'accueil
document.getElementById('addButton').innerHTML =		//ne fonctionne pas avec getElementsByTagName !!!???
`<input id="return" type="button" value="Retour au catalogue" class="button"></input>`;
let returnButton = document.getElementById('return');
returnButton.addEventListener('click', function(){
	window.location.replace('index.html');
});

//récupération des données transmises dans l'URL par la page indx.html
let sendId = location.search.substring(1).split('=')[1];	//la chaine des données envoyées via l'URL est transformée en 2 sous-chaine : premier membre du tableau (indice 0) = nom de la donnée, 2eme membre du tableau (indice 1) = valeur de la donnée
console.log(sendId);
console.log(typeof sendId);

//appel des données correspondant à l'identifiant envoyé via l'URL
function accessData () {							//fonction de récupération des données du serveur	
		fetch('http://localhost:3000/api/teddies/' + sendId)	//adresse de destination de la requête	
		.then(response => response.json())				//conversion de la réponse de la promesse au format JSON → nouvelle promesse qui renvoie les données sous forme de tableau
		.then(data => productDetails(data))
		.catch(error => alert('Request failed → ' + error))
	}


function productDetails(data) {

	console.log('Request successful', data);					//contrôle réussite de la requête dans la console et affichage des données récupérées

	const page = document.getElementById('page');				//pour style de l'article "page"
	page.setAttribute('class', 'page');							//style de l'article "page"
	
	//affichage des données descriptives dans la div "details"
	const details = document.getElementById('details');			//cible l'élément dans lequel on insère les données
	details.setAttribute('class', 'details'); 					//attribue une classe à la div "details"
	details.innerHTML =											//littéraux gabarit pour ajouter les neuds (nom du produit, photo et descrptif)
	`
		<h4>${data.name}</h4>								
		<img src="${data.imageUrl}" class="photo">			
		<p>${data.description}</p>
	`;

	//affichage des données de personnalisation, prix et choix de l'article dans la div "choice"
	const choice =document.getElementById('choice');			//cible l'élément dans lequel on insère les données
	const select = document.createElement('select');			//crée une "select" pour la personnalisation du produit (liste déroulante des options)
	const price = document.createElement('p');					//crée une "p" pour affichage du prix du produit
	price.innerText = data.price/100 + ' €';					//affiche le prix
	const achat = document.createElement('input');				//crée une input pour envoi vers le panier
	achat.setAttribute('type', 'submit');						//
	achat.setAttribute('class', 'button');						//
	achat.setAttribute('value', 'Je veux ' + data.name + ' ! ');//
	choice.append(select, price, achat);						//ajout des éléments créés dans le DOM
	for(const i of data.colors) {								//boucle pour ajouter les valeurs des options de personnalisation à la liste déroulante
		const option = document.createElement('option');		//crée l'élément "option" pou rchaque valeur du tableau
		option.setAttribute('value', i);						//
		option.textContent = i;									//écrit le texte de l'option
		select.append(option);									//ajoute l'option à la liste déroulante
	}


/*
	choice.innerHTML =
	`
		<select>
		${addOptions()}

		</select>
	`
*/
	
	

	
/*
	const x = document.getElementById('choice');
	let option = document.createElement('option');
	data.colors.forEach(element => { 
		x.append('option');
		option.setAttribute('value', element);
		option.textContent = element;

	});
*/

}

accessData();

/*
document
	.getElementsByTagName('title')
	.textContent();
*/
