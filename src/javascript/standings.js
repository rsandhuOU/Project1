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
let year = 2023
const callParams = () => {
    params = userInput.value
    year = userInput.valueAsNumber
    fetch(`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${params}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response);
        console.log("\n");
		
		let output = `<h1 class="resulttitle">${year} Standings </h1><BR>`;
		output += `<table> 
					<thead> 
						<tr> 
							<th style="width:15%"></th>
							<th style="width:15%">TEAM</th>
							<th style="width:15%">RECORD</th>
							<th style="width:15%">GAMES BEHIND</th>
						</tr>
					</thead>`;
		response.response.forEach(c => {
			output += `<tr>`;
			output += `<td style="width:20%">
							<img src="${c?.team?.logo}" class="h-14 mr-7 sm:h-18" >
						</td>`;
			output += `<td style="width:20%">${c?.team?.name} </td>`
			output += `<td style="width:20%">
						${c?.win?.total}-${c?.loss?.total} 
						</td>`;
			output += `<td style="width:20%">${c?.gamesBehind}</td></tr>`;
			
			
        });
		output += "</table>";
        document.querySelector('.result').innerHTML = output;
    })
    .catch(err => console.error(err));
    userInput.value = '';
}

btn.addEventListener('click', callParams)


