'use strict';

function simulate(input, days){
	let ages = [0,0,0,0,0,0,0,0,0];
	input.trim().split(',').map(i=>parseInt(i)).forEach(f=>ages[f]++);
	let zilch = 0;
	while(days--){
		ages[(zilch+7)%ages.length] += ages[zilch];
		zilch = (zilch+1)%ages.length;
	}
	return ages.reduce((a,e)=>a+e,0);
}

export let part1 = async input=>simulate(input, 80);
export let part2 = async input=>simulate(input, 256);
