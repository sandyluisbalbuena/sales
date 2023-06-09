let form = document.getElementById('form');
let p1 = document.getElementById('product1');
let p2 = document.getElementById('product2');
let p3 = document.getElementById('product3');
let p4 = document.getElementById('product4');
let p5 = document.getElementById('product5');
let highestbtn = document.getElementById('highestbtn');
let nearzerobtn = document.getElementById('nearzerobtn');
let lowestbtn = document.getElementById('lowestbtn');
let submitbtn = document.getElementById('submitbtn');





let result = document.getElementById('result');

result.style.display = "none";

let products = [];
let highest=-Infinity;
let nearzero;
let nearpositive;
let nearnegative;
let lowest=Infinity;

let highestname = "";
let lowestname = "";

// let distanceZero = Infinity;
// let items = [];



form.addEventListener('submit',(event)=>{

	highestbtn.removeAttribute('disabled');
	nearzerobtn.removeAttribute('disabled');
	lowestbtn.removeAttribute('disabled');
	submitbtn.setAttribute('disabled', '');



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
				highest = product[1];
				highestname = product[0];
			}
		});

		// let nearestZeroProduct = products.reduce((prev, curr) => {
		// 	let absValue = Math.abs(curr[1]);

		// 		if (absValue < Math.abs(prev[1])) {
		// 			console.log(curr)
		// 			return curr;
		// 		} else {
		// 			console.log(prev)
		// 			return prev;
		// 		}
		// });

		let result;

		let nearestZeroProduct = getItemsWithSameDistanceZero(products);

		if(nearestZeroProduct.length>1){
			result = getPositiveItemsWithSameDistanceZero(nearestZeroProduct);
		}else{
			result = nearestZeroProduct[0];
		}


		nearzero = result[0];

		

		// for (let item of arr) {
		// 	if (Math.abs(item[1]) < distanceZero) {
		// 		distanceZero = Math.abs(item[1]);
		// 	}
		// }

		// for (let item of arr) {
		// 	if (Math.abs(item[1]) === distanceZero) {
		// 		items.push(item[0]);
		// 	}
		// }
	
	
		products.forEach(product => {
			if(product[1] < lowest){
				lowest = product[1];
				lowestname = product[0];
			}
		});

		


        const dataRadarChart = {
            labels: [
                'Product 1',
                'Product 2',
                'Product 3',
                'Product 4',
                'Product 5',
            ],
            datasets: [{
                label: 'Products Sales',
                data: [products[0][1], products[1][1], products[2][1], products[3][1], products[4][1]],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        };

        // Get a reference to the existing chart instance
        let existingChart = Chart.getChart("pokemonStatscanvas");

        // Destroy the existing chart instance
        if (existingChart) {
            existingChart.destroy();
        }

        var options = {
			indexAxis:'y',
            scale: {
                // min:-1000,
                // max:1000,
                ticks: {
                    beginAtZero: true,
                    // min: 0,
                    // max: 100,
                    stepSize: 100,
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            },
            animation: {
                duration: 2000, 
                delay: 500,
                // tension: {
                //     duration: 1000,
                    // easing: 'linear',
                    // from: -0.2,
                    // to: 0,
                    // loop: true
                // }
            }
        };

		document.getElementById("pokemonStatscanvas").style.width = '100%';


		var ctx = document.getElementById("pokemonStatscanvas").getContext("2d");
        new Chart(ctx, {
            type: 'bar',
            data: dataRadarChart,
            options: options
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

	

	// console.log(products);

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
	result.innerHTML += "<br><br>Highest product is "+highestname;
	// form.reset();

	products = [];
	submitbtn.removeAttribute('disabled');

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
	result.innerHTML += "<br><br>Lowest product is "+lowestname;
	// form.reset();

	products = [];
	submitbtn.removeAttribute('disabled');
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

	
	result.innerHTML += "<br><br>Near zero product is "+nearzero;

	// nearzero.forEach(near => {
	// 	result.innerHTML += near+"<br>";
	// });
	// form.reset();
	products = [];
	submitbtn.removeAttribute('disabled');

}

function getItemsWithSameDistanceZero(arr) {
	let distanceZero = Infinity;
	let items = [];

	for (let item of arr) {
		if (Math.abs(item[1]) < distanceZero) {
			distanceZero = Math.abs(item[1]);
		}
	}

	for (let item of arr) {
		if (Math.abs(item[1]) === distanceZero) {
			items.push([item[0],item[1]]);
		}
	}

	console.log(items);

	return items;
}


function getPositiveItemsWithSameDistanceZero(arr) {
	let distanceZero = Infinity;
	let positiveItems = [];

	// Find the minimum positive distance from zero
	for (let item of arr) {
		if (item[1] >= 0 && item[1] < distanceZero) {
			distanceZero = item[1];
		}
	}

	// Find positive items with the same distance from zero
	for (let item of arr) {
		if (item[1] === distanceZero) {
			positiveItems.push(item[0]);
		}
	}

	return positiveItems;
}
  