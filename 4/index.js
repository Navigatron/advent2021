'use strict';

function checkBoard(board){
	return board.reduce((ba, row,coli)=>{
		let rowChecked = row.reduce((a,e,i)=>e.c&&a,true);
		let colChecked = board.reduce((a,e,i)=>e[coli].c&&a,true);
		return rowChecked || colChecked || ba;
	}, false);
}

export async function part1(input){
	let boards = input.trim().split('\n\n');

	let nums = boards.shift();
	nums = nums.split(',');

	boards = boards.map(string=>{
		let b = string.split('\n').map(r=>r.trim()).map(r=>r.split(/[ ]+/));
		b = b.map(row=>row.map(v=>({v,c:false})));
		return b;
	});

	let result = 0;

	nums.forEach(callout=>{

		// If we alread found a winner, do not repeat.
		if(result !== 0) return;

		// Mark the callout
		boards.forEach((board, boardi)=>{
			// console.log(board);
			board.forEach(row=>{
				// console.log(row);
				row.forEach(item=>{
					if(item.v === callout){
						item.c = true;
					}
				})
			})
		});

		// Check each board
		let winningBoard = undefined;
		let winningNumber = undefined;
		boards.forEach((board, boardi)=>{
			if(checkBoard(board)){
				winningBoard = board;
				winningNumber = callout;
			}
		});

		// If there was a winner, set the result
		if(winningBoard){
			let unmarkedSum = winningBoard.reduce((ba, be, bi)=>{
				return ba + be.reduce((a, e, i)=>{
					return a + (e.c ? 0 : parseInt(e.v));
				}, 0);
			}, 0);
			result = callout * unmarkedSum;
		}
	});

	return result;
}

export async function part2(input){
	let boards = input.trim().split('\n\n');

	let nums = boards.shift();
	nums = nums.split(',');

	boards = boards.map(string=>{
		let b = string.split('\n').map(r=>r.trim()).map(r=>r.split(/[ ]+/));
		b = b.map(row=>row.map(v=>({v,c:false})));
		return {rows: b, won: false};
	});

	let result = 0;

	nums.forEach(callout=>{
		// Mark the callout
		boards.forEach((board, boardi)=>{
			board.rows.forEach(row=>{
				row.forEach(item=>{
					if(item.v === callout){
						item.c = true;
					}
				})
			})
		});

		// Check each board
		let winningBoard = undefined;
		let winningNumber = undefined;
		boards.forEach((board, boardi)=>{
			if(checkBoard(board.rows) && !board.won){
				winningBoard = board;
				winningNumber = callout;
				board.won = true;
			}
		});

		// If there was a new winner, find the updated result.
		if(winningBoard){
			let unmarkedSum = winningBoard.rows.reduce((ba, be, bi)=>{
				return ba + be.reduce((a, e, i)=>{
					return a + (e.c ? 0 : parseInt(e.v));
				}, 0);
			}, 0);
			result = callout * unmarkedSum;
		}
	});

	return result;
}
