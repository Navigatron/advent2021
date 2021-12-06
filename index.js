'use strict';

import * as fs from 'fs/promises';
import fetch from 'node-fetch';
import esMain from 'es-main';

// Key is in a separate file for git tracking
import {key} from './key.js';

// Tells the status of a given day:
// - Is the day initialized?
// - Is the input downloaded?
async function getStatus(day){
	let initialized = false;
	let input = false;

	let check = path => fs.access(path).then(x=>true).catch(x=>false);

	if(await check(`./${day}`)){
		if(await check(`./${day}/index.js`)){
			initialized = true;
			if (await check(`./${day}/input`)) {
				input = true;
			}
		}
	}
	return {initialized, input};
}

function dayIsValid(day){
	day = parseInt(day);
	return day >= 1 && day <= 25;
}

// Download the input for a given day, if applicable.
async function downloadInput(day){

	// Do not check if it already exists.
	// - If we're being called explicitly, they want this.
	// - Modules should act responsibly.

	// Time check. If the puzzle isn't open, don't get it.
	if((new Date()).getDate() < day){
		console.log(`[dl] The input for that day isn't unlocked yet!`);
		return;
	}

	// Download the puzzle data
	console.log(`[dl] Downloading input for day ${day}...`);
	await fetch(
		`https://adventofcode.com/2021/day/${day}/input`,
		{headers:{cookie: `session=${key}`}}
	)
	.then(response=>response.text())
	.then(text=>fs.writeFile(`./${day}/input`, text));
	console.log(`[dl] Input for day ${day} downloaded!`);
}

// Initialize a day, and optionally download its input
// args: day as int
async function init(day){

	// Get the current status of that day's files
	let status = await getStatus(day);

	// Do we need to setup the directory?
	if(!status.initialized){
		// do the folder shits
		await fs.mkdir(`./${day}`).catch(e=>null);
		await fs.copyFile(`./template/index.js`, `./${day}/index.js`);
		console.log(`[init] Day ${day} initialized!`);
	}else{
		console.log(`[init] Day ${day} is already initialized.`);
	}

	// Do we need to download the input?
	if(!status.input){
		await downloadInput(day);
	}else{
		console.log(`[init] Day ${day}'s input is already downloaded.`);
	}

	console.log(`[init] Good luck!`);
}

async function run(filename, day, part){
	console.log(`[run] Running day ${day}, part ${part}...`);

	let parts = await import( new URL(`${day}/index.js`, import.meta.url));

	const inputf = await fs.readFile(new URL(`${day}/${filename}`, import.meta.url), 'utf8');

	let result;
	if(part===1){
		result = await parts.part1(inputf);
	}else{
		result = await parts.part2(inputf);
	}

	console.log(`[run] Results are in! Result is: ${result}`);
}

// For CLI usage
async function main(args){

	// Init
	if(args[0]==='init'){
		let day = parseInt(args[1]);

		if(!dayIsValid(day)){
			console.log(`[advent] Usage: advent init <day:int>`);
			console.log(`[advent] <day> must be between 1 and 25 inclusive`);
			return;
		}

		init(day);
	}else if(args[0]==='dl'){
		let day = parseInt(args[1]);

		if(!dayIsValid(day)){
			console.log(`[advent] Usage: advent dl <day:int>`);
			console.log(`[advent] <day> must be between 1 and 25 inclusive`);
			return;
		}

		downloadInput(day);
	}else if(args[0]==='run'){
		let day = parseInt(args[1]);

		if(!dayIsValid(day)){
			console.log(`[advent] Usage: advent run <day:int> <part:int>`);
			console.log(`[advent] <day> must be between 1 and 25 inclusive`);
			return;
		}

		let part = parseInt(args[2]);
		if(!(part === 1 || part === 2)){
			console.log(`[advent] Usage: advent run <day:int> <part:int>`);
			console.log(`[advent] <part> must be either 1 or 2`);
			return;
		}

		run('input', day, part);
	}else if(args[0]==='test'){
		let day = parseInt(args[1]);

		if(!dayIsValid(day)){
			console.log(`[advent] Usage: advent test <day:int> <part:int>`);
			console.log(`[advent] <day> must be between 1 and 25 inclusive`);
			return;
		}

		let part = parseInt(args[2]);
		if(!(part === 1 || part === 2)){
			console.log(`[advent] Usage: advent test <day:int> <part:int>`);
			console.log(`[advent] <part> must be either 1 or 2`);
			return;
		}

		console.log(`[TESTING] testing day ${day} part ${part} - make sure the 'sample' file exists!`);

		run('sample', day, part);
	}else{
		console.log(`[advent] Usage: advent <init|dl|run|test>`);
		console.log(`[advent]     advent init <day:int>`);
		console.log(`[advent]     advent dl <day:int>`);
		console.log(`[advent]     advent test <day:int> <part:int>`);
		console.log(`[advent]     advent run <day:int> <part:int>`);
	}
}

// If being called from CLI, call main
if(esMain(import.meta)){
	main(process.argv.slice(2));
}
