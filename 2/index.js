'use strict';

export async function part1(input){
	let commands = input.trim().split('\n');

	let horizontal = 0;
	let depth = 0;

	commands.forEach(command=>{
		let [dir, vel] = command.split(' ');
		vel = parseInt(vel);
		if(dir==='forward') horizontal += vel;
		if(dir==='down') depth += vel;
		if(dir==='up') depth -= vel;
	})

	return horizontal * depth;
}

export async function part2(input){
	let commands = input.trim().split('\n');

	let horizontal = 0;
	let depth = 0;
	let aim = 0;

	commands.forEach(command=>{
		let [dir, vel] = command.split(' ');
		vel = parseInt(vel);
		if(dir==='forward'){
			horizontal += vel;
			depth += aim*vel;
		}
		if(dir==='down') aim += vel;
		if(dir==='up') aim -= vel;
	})

	return horizontal * depth;
}
