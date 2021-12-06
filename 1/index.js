'use strict';

export async function part1(input){
	input = input.trim().split('\r\n');
	let count = 0;
	for(let i=1; i<input.length; i++){
		if(input[i]>input[i-1]) count++;
	}
	return count;
}

export async function part2(input){
	input = input.trim().split('\r\n').map(a=>parseInt(a));
	let count = 0;
	for(let i=3; i<input.length; i++){
		if(input[i]>input[i-3]) count++;
	}
	return count;
}
