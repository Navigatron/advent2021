'use strict';

export async function part1(input){
	let lines = input.trim().split('\n');

	lines = lines.map(line=>{
		let [ins, outs] = line.split(' | ');
		return {
			ins: ins.split(' '),
			outs: outs.split(' ')
		};
	})

	let total = 0;

	lines.forEach(line=>{
		line.outs.forEach(dig=>{
			if(dig.length===2||dig.length===3||dig.length===4||dig.length===7) total++;
		});
	})

	return total;
}

export async function part2(input){
	let lines = input.trim().split('\n');

	lines = lines.map(line=>{
		let [ins, outs] = line.split(' | ');
		return {
			ins: ins.split(' '),
			outs: outs.split(' ')
		};
	})

	// Convert each line into its decoded number
	lines = lines.map(line=>{

		// Number -> signal set that generates it
		let signals = [];

		// Find 1 - it has two segments
		signals[1] = line.ins.filter(ss=>ss.length===2)[0];

		// Find 4 - it has 4 segments
		signals[4] = line.ins.filter(ss=>ss.length===4)[0];

		// Find 7 - it has 3 segments
		signals[7] = line.ins.filter(ss=>ss.length===3)[0];

		// Find 8 - it has all 7 segments
		signals[8] = line.ins.filter(ss=>ss.length===7)[0];

		// Find 3 - it has 5 segments, and shares two segments with 1
		signals[3] = line.ins.filter(ss=>{
			if(ss.length!==5) return false;
			let onesigs = signals[1].split('');
			if(ss.includes(onesigs[0]) && ss.includes(onesigs[1])) return true;
			return false;
		})[0];

		// Find 5 - It has 5 segments, 3 of which are in common with 4, 1 is in common with 1
		signals[5] = line.ins.filter(ss=>{
			if(ss.length!==5) return false;
			let inCommon = ss.split('').reduce((a,e)=>a+signals[4].includes(e),0);
			if(inCommon !== 3) return false;
			inCommon = ss.split('').reduce((a,e)=>a+signals[1].includes(e),0);
			if(inCommon !== 1) return false;
			return true;
		})[0];

		// Find 2 - It has 5 segments, 2 of which are in common with 4
		signals[2] = line.ins.filter(ss=>{
			if(ss.length!==5) return false;
			let inCommon = ss.split('').reduce((a,e)=>a+signals[4].includes(e),0);
			if(inCommon === 2) return true;
			return false;
		})[0];

		// Find 6 - It has 6 segments, and does NOT overlap perfectly with 7
		signals[6] = line.ins.filter(ss=>{
			if(ss.length!==6) return false;
			let inCommon = ss.split('').reduce((a,e)=>a+signals[7].includes(e),0);
			if(inCommon === 2) return true;
			return false;
		})[0];

		// Find 9 - it has 6 segments, and overlaps perfectly with 4
		signals[9] = line.ins.filter(ss=>{
			if(ss.length!==6) return false;
			let inCommon = ss.split('').reduce((a,e)=>a+signals[4].includes(e),0);
			if(inCommon === 4) return true;
			return false;
		})[0];

		// Find 0 - it has 6 segments, and it's not 6 or 9
		signals[0] = line.ins.filter(ss=>{
			if(ss.length!==6) return false;
			if(ss===signals[6]) return false;
			if(ss===signals[9]) return false;
			return true;
		})[0];

		// Turn each output puzzle into its matching input number
		// And also concat them together in the same step lol
		let answer = parseInt(line.outs.map(mystery=>{
			// Iterate over the signalset indices
			for(let i=0; i<=9; i++){
				let c = signals[i];
				// If C matches mystery, return i
				if(c.length !== mystery.length) continue;
				let match = mystery.split('').reduce((a,e)=>{
					return a && signals[i].includes(e)
				}, true);
				if(match) return i;
			}
		}).join(''));

		return answer;

	});

	// Add up all the outputs
	return lines.reduce((a,e)=>a+e,0)
}
