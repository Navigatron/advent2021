'use strict';

export async function part1(input){

	// Split the input blob into text lines
	let lines = input.trim().split('\n');

	// Turn input text lines into line objects
	lines = lines.map(line=>{
		let [x1, y1, x2, y2] = line.split(' -> ').map(p=>p.split(',')).flat().map(s=>parseInt(s));
		return {x1, y1, x2, y2};
	})

	// Filter for orthagonals
	let orthagonals = lines.filter(line=>line.x1===line.x2 || line.y1===line.y2);

	// Populate the field
	let field = [];

	orthagonals.forEach(line=>{
		let x = line.x1;
		let y = line.y1;
		while(x!==line.x2 || y!==line.y2){
			// Mark
			// console.log(`X: ${x}, Y: ${y}, Line: ${line}`);
			if(!field[y]) field[y] = [];
			if(!field[y][x]) field[y][x] = 0;
			field[y][x]++;
			// Iterate
			x += Math.max(Math.min(line.x2-x, 1), -1);
			y += Math.max(Math.min(line.y2-y, 1), -1);
		}

		// Mark Again
		// console.log(`X: ${x}, Y: ${y}, Line: ${line}`);
		if(!field[y]) field[y] = [];
		if(!field[y][x]) field[y][x] = 0;
		field[y][x]++;
	});

	// Find the largest X value, for processing purposes.
	let biggestX = 0;

	for(let i=0; i<field.length; i++){
		biggestX = Math.max(biggestX, field[i]?.length || 0);
	}
	// console.log(`Biggest X is ${biggestX}, and ymax is ${field.length}`);

	// Debug: Print the visual.
	// for(let y = 0; y<field.length; y++){
	// 	for(let x = 0; x<biggestX; x++){
	// 		process.stdout.write(`${field?.[y]?.[x] || '.'}`);
	// 	}
	// 	console.log();
	// }

	// Reduce to a count of all things two or greater
	return field.reduce((a,e)=>a+e.reduce((b, f)=>b+(f>=2?1:0), 0), 0);
}

export async function part2(input){
	// Split the input blob into text lines
	let lines = input.trim().split('\n');

	// Turn input text lines into line objects
	lines = lines.map(line=>{
		let [x1, y1, x2, y2] = line.split(' -> ').map(p=>p.split(',')).flat().map(s=>parseInt(s));
		return {x1, y1, x2, y2};
	})

	// Populate the field
	let field = [];

	lines.forEach(line=>{
		let x = line.x1;
		let y = line.y1;
		while(x!==line.x2 || y!==line.y2){
			// Mark
			// console.log(`X: ${x}, Y: ${y}, Line: ${line}`);
			if(!field[y]) field[y] = [];
			if(!field[y][x]) field[y][x] = 0;
			field[y][x]++;
			// Iterate
			x += Math.max(Math.min(line.x2-x, 1), -1);
			y += Math.max(Math.min(line.y2-y, 1), -1);
		}

		// Mark Again
		// console.log(`X: ${x}, Y: ${y}, Line: ${line}`);
		if(!field[y]) field[y] = [];
		if(!field[y][x]) field[y][x] = 0;
		field[y][x]++;
	});

	// Find the largest X value, for processing purposes.
	let biggestX = 0;

	for(let i=0; i<field.length; i++){
		biggestX = Math.max(biggestX, field[i]?.length || 0);
	}
	// console.log(`Biggest X is ${biggestX}, and ymax is ${field.length}`);

	// Debug: Print the visual.
	// for(let y = 0; y<field.length; y++){
	// 	for(let x = 0; x<biggestX; x++){
	// 		process.stdout.write(`${field?.[y]?.[x] || '.'}`);
	// 	}
	// 	console.log();
	// }

	// Reduce to a count of all things two or greater
	return field.reduce((a,e)=>a+e.reduce((b, f)=>b+(f>=2?1:0), 0), 0);
}
