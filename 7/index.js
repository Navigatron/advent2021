'use strict';

export async function part1(input){
	let positions = input.trim().split(',').map(e=>parseInt(e));

	let minPos = positions.reduce((a,e)=>Math.min(a,e), Infinity);
	let maxPos = positions.reduce((a,e)=>Math.max(a,e), 0);

	let minFuel = Infinity;
	let bestPos = 0;

	for(let p = minPos; p<=maxPos; p++){
		let fuelCost = positions.reduce((a,e)=>a+Math.abs(p-e), 0);
		if(fuelCost < minFuel){
			minFuel = fuelCost;
			bestPos = p;
		}
	}

	console.log(`Move the crabs to position ${bestPos}`);

	return minFuel;

}

export async function part2(input){
	let positions = input.trim().split(',').map(e=>parseInt(e));

	let minPos = positions.reduce((a,e)=>Math.min(a,e), Infinity);
	let maxPos = positions.reduce((a,e)=>Math.max(a,e), 0);

	let minFuel = Infinity;
	let bestPos = 0;

	for(let p = minPos; p<=maxPos; p++){
		let fuelCost = positions.reduce((a,e)=>{
			let n = Math.abs(p-e);
			// console.log(`Moving from ${e} to ${p} costs ${n+(n*(n-1))/2}`);
			return a+(n+(n*(n-1))/2);
		}, 0);
		if(fuelCost < minFuel){
			minFuel = fuelCost;
			bestPos = p;
		}
	}

	console.log(`Move the crabs to position ${bestPos}`);

	return minFuel;
}
