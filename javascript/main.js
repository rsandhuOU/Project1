import { getKey } from "./config.js";

var key = getKey();
console.log(key)

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};


const userInput = document.querySelector('input');
const btn = document.querySelector('button');
	
let params =''
const callParams = () => {
	params = userInput.value
		fetch(`https://api-nba-v1.p.rapidapi.com/players?search=${params}`, options)
		.then(response => response.json())
		.then(response => {
			console.log(response);
			console.log("\n");
			let output = '';
			response.response.forEach(c => {
				if (c?.height?.feets !== null) {
					output += `<h1>${c?.height?.feets}'${c?.height?.inches}" `
				} else {
					output += `<h1>`;
				}
				if (c?.leagues?.standard?.pos != null) {
					output += `${c?.leagues?.standard?.pos} `;
				} 
				output += `${c.firstname} ${c.lastname}`;
				if (c.affiliation !== null) {
					output += ` from ${c.affiliation}`;
				} else if (c.college !== null) {
					output += ` from ${c.college}`;
				}
				if (c?.nba?.start !== 0) {
					output += `: ${c?.nba?.pro} years of NBA experience starting in ${c?.nba.start}`
				}
				output += `</h1>`;
			});
				
			
			document.querySelector('.result').innerHTML = output;
		})
		.catch(err => console.error(err));
		userInput.value = '';
	}
	
	btn.addEventListener('click', callParams)
