'use strict';

export async function part1(input){
	let lines = input.trim().split('\n');

	let counts = [];

	lines.forEach(line=>{
		let chars = line.split('');
		console.log(chars);
		chars.forEach((char, i)=>{
			if(char==='1'){
				if(!counts[i]) counts[i]=0;
				counts[i]++;
			}
		});
	})

	counts = counts.map(pos=>{
		return pos > (lines.length/2) ? '1' : '0';
	});
	let gamma = parseInt(counts.join(''), 2);
	counts = counts.map(p=>parseInt(p)*-1+1);
	let epsilon = parseInt(counts.join(''), 2);
	return gamma * epsilon;
}

export async function part2(input){
	let lines = input.trim().split('\n'); // ['']

	// o2 generator
	let o2 = lines.map(l=>l.split('')); // [['']]
	for(let i = 0; o2.length > 1; i++){
		let sum = o2.reduce((a,e)=>a+parseInt(e[i]), 0);
		let common = sum*2 >= o2.length ? 1 : 0;
		console.log(`Most common bit at index ${i} is ${common}`);
		o2 = o2.filter(e=>parseInt(e[i])===common);
	}

	let o2rating = parseInt(o2.flat().join(''), 2);
	console.log(`o2 rating is ${o2.flat().join('')}, or ${o2rating} in decimal.`);

	// co2 scrubber
	let co2 = lines.map(l=>l.split(''));
	for(let i=0; co2.length > 1; i++){
		let sum = co2.reduce((a,e)=>a+parseInt(e[i]), 0);
		let uncommon = sum*2 >= co2.length ? 0 : 1;
		console.log(`Least common bit at index ${i} is ${uncommon}`);
		co2 = co2.filter(e=>parseInt(e[i])===uncommon);
	}

	let co2rating = parseInt(co2.flat().join(''), 2);
	console.log(`co2 rating is ${co2.flat().join('')}, or ${co2rating} in decimal.`);

	// That's all
	return o2rating * co2rating;

}
