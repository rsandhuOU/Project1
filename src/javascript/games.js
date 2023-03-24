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

const today = new Date()
const yesterday = new Date(today)
const tomorrow = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)
tomorrow.setDate(tomorrow.getDate() + 1)

today.toDateString()
yesterday.toDateString()
tomorrow.toDateString()

var dd = String(yesterday.getDate()).padStart(2, '0');
var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); 
var yyyy = yesterday.getFullYear();
let yday = `${yyyy}-${mm}-${dd}`;

var dd2 = String(tomorrow.getDate()).padStart(2, '0');
var mm2 = String(tomorrow.getMonth() + 1).padStart(2, '0'); 
var yyyy2 = tomorrow.getFullYear();
let tmrw = `${yyyy2}-${mm2}-${dd2}`;

console.log(today);
console.log(yesterday);
console.log(yday);
console.log(tomorrow)
console.log(tmrw)

fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${yday}`, options)
.then(response => response.json())
.then(response => {
    console.log(response)
    let output ='';
    response.response.forEach(c => {
        output += `<h1>${c?.teams?.visitors?.name} ${c?.scores?.visitors?.points} @ ${c?.teams?.home?.name} ${c?.scores?.home?.points}</h1>`;
    });
    document.querySelector('.result').innerHTML = output;
});

fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${tmrw}`, options)
.then(response => response.json())
.then(response => {
    console.log(response)
    let output ='';
    response.response.forEach(c => {
        if (c.length === 0) {
            output += 'NO GAMES';
        } else {
            output += `<h1>${c?.teams?.visitors?.name} @ ${c?.teams?.home?.name}</h1>`;
        }
    });
    document.querySelector('.result2').innerHTML = output;
});

	// .catch(err => console.error(err));