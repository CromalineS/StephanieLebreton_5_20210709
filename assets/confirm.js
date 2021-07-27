document.getElementById('confirm').innerHTML = 
`
	<div class="total">
	 	<h4>Montant de la commande</h4>
	 	<p>${localStorage.getItem('priceCommand')} €</p>
	</div>
	<div class="total">
		<h4>Numéro de commande</h4>
		<p>${localStorage.getItem('idCommand')}</p>
	</div>
`;