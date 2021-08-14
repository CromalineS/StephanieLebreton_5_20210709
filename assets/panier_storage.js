//initialisation du panier dans le localStorage = création de l'objet panierStorage pour contenir les données d'un produit

if(localStorage.getItem('panierStorage')){
	console.log('Le panier existe');
}else{
	console.log('Création du panier');
	const init = [];												//création d'un objet array
	localStorage.setItem('panierStorage', JSON.stringify(init));	//stockage de l'objet 'init' dans le local storage / JSON.stringify() = conversion de l'objet JavaScript en chaine JSON interprétable par le navigateur
}