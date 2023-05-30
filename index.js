let form = document.getElementById('form');
let p1 = document.getElementById('product1');
let p2 = document.getElementById('product2');
let p3 = document.getElementById('product3');
let p4 = document.getElementById('product4');
let p5 = document.getElementById('product5');
let highestbtn = document.getElementById('highestbtn');
let nearzerobtn = document.getElementById('nearzerobtn');
let lowestbtn = document.getElementById('lowestbtn');





let result = document.getElementById('result');

result.style.display = "none";

let products = [];
let highest=-999;
let nearzero;
let nearpositive;
let nearnegative;
let lowest=999;



form.addEventListener('submit',(event)=>{

	highestbtn.removeAttribute('disabled');
	nearzerobtn.removeAttribute('disabled');
	lowestbtn.removeAttribute('disabled');

	event.preventDefault();
	// console.log(typeof p1.value);


	if (!isNaN(p1.value)&&!isNaN(p2.value)&&!isNaN(p3.value)&&!isNaN(p4.value)&&!isNaN(p5.value)){
		
		if(p1.value != "" && p1.value != undefined){
			products.push(['Product 1',parseInt(p1.value)]);
		}

		if(p2.value != "" && p2.value != undefined){
			products.push(['Product 2',parseInt(p2.value)]);
		}

		if(p3.value != "" && p3.value != undefined){
			products.push(['Product 3',parseInt(p3.value)]);
		}

		if(p4.value != "" && p4.value != undefined){
			products.push(['Product 4',parseInt(p4.value)]);
		}

		if(p5.value != "" && p5.value != undefined){
			products.push(['Product 5',parseInt(p5.value)]);
		}


		products.forEach(product => {
			if(product[1] > highest){
				highest = product[0];
			}
		});

		let nearestZeroProduct = products.reduce((prev, curr) => {
			let absValue = Math.abs(curr[1]);
			if (absValue < Math.abs(prev[1])) {
			return curr;
			} else {
			return prev;
			}
		});
	
		nearzero = nearestZeroProduct[0];
	
		products.forEach(product => {
			if(product[1] < lowest){
				lowest = product[0];
			}
		});
	}

	else{
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Must fill all and Numeric!',
			footer: '<a href="">Why do I have this issue?</a>'
		})
	}



	// if(p1.value typeof != Num)





	// console.log(p1,p2,p3,p4,p5);

	

	// products.forEach(product => {
	// 	if(0 > nearpositive && nearpositive < product){
	// 		nearpositive = product;
	// 	}

	// 	if(0 < nearnegative && nearnegative > product){
	// 		nearnegative = product;
	// 	}


	// 	if((0 - nearnegative)<(0 - nearpositive)){
	// 		nearzero = nearnegative;
	// 	}
	// 	else{
	// 		nearzero = nearpositive;
	// 	}
	// });

	// nearzero = Math.min(...products.map(num => Math.abs(num)));

	

	console.log(products);

});


function returnhighest(){
	console.log(highest);
	result.innerHTML = "";
	highestbtn.setAttribute('disabled', '');
	nearzerobtn.setAttribute('disabled', '');
	lowestbtn.setAttribute('disabled', '');

	result.style.display = "block"
	products.forEach(product => {
			result.innerHTML += product[0] +" = "+ product[1]+"<br>";		
	});
	result.innerHTML += "<br><br>Highest product is "+highest;
	form.reset();
}

function returnlowest(){
	console.log(lowest);
	result.innerHTML = "";
	highestbtn.setAttribute('disabled', '');
	nearzerobtn.setAttribute('disabled', '');
	lowestbtn.setAttribute('disabled', '');

	result.style.display = "block"
	products.forEach(product => {
			result.innerHTML += product[0] +" = "+ product[1]+"<br>";		
	});
	result.innerHTML += "<br><br>Lowest product is "+lowest;
	form.reset();
}

function returnnearzero(){
	console.log(nearzero);
	result.innerHTML = "";
	highestbtn.setAttribute('disabled', '');
	nearzerobtn.setAttribute('disabled', '');
	lowestbtn.setAttribute('disabled', '');

	result.style.display = "block"
	products.forEach(product => {
			result.innerHTML += product[0] +" = "+ product[1]+"<br>";		
	});
	result.innerHTML += "<br><br>Near zero produxt is "+nearzero;
	form.reset();
}