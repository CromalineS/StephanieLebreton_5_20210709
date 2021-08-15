//affichage du prix total et de l'identifiant de commande

document.getElementById('confirm').innerHTML = 
`
	<div class="frame frame-total">
	 	<h4>Montant de la commande</h4>
	 	<p class="nb-info">${localStorage.getItem('priceCommand')} €</p>
	</div>
	<div class="frame frame-total">
		<h4>Numéro de commande</h4>
		<p class="nb-info">${localStorage.getItem('idCommand')}</p>
	</div>
`;