import { json } from '@sveltejs/kit';
// import { GOOGLE_KEY } from '$env/static/private';
import type { Word } from '$lib/types';
import { sortAlphabetically } from '$lib/util.js';

const GOOGLE_KEY = 'AIzaSyCjQVz242YwBGpsR8S64BKi0p4grBz_tGI';
const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';
const SHEET_NAME = 'Dictionary';
const SHEET_ID = '1IcDbxBUb7Ll2vu4zezW9iw0mPvZ_dUqYzc5dhc1VDaQ';

const keys: Record<string, keyof Word> = {
	Word: 'word',
	Cyrillic: 'cyrillic',
	Type: 'type',
	Meaning: 'meaning',
	Adjective: 'adjective',
	Noun: 'noun',
	Verb: 'verb',
	Adverb: 'adverb',
	Preposition: 'preposition',
	Origin: 'origin',
	Language: 'language',
	Antonym: 'antonym'
};

export async function GET({ fetch, setHeaders }) {
	const url = `${SHEETS_API_BASE}/${SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_KEY}`;
	const response = await fetch(url);

	if (!response.ok) {
		console.error(
			'Google Sheets API error:',
			response.status,
			response.statusText
		);
		return json([]);
	}

	const data = await response.json();

	if (!data.values) {
		return json([]);
	}

	const firstRow = data.values.shift() as string[];

	const words = data.values
		.map((row: string[]) => {
			const w = {} as Word;
			for (let i = 0; i < row.length; i++) {
				const key = keys[firstRow[i]];
				// @ts-expect-error: WordType should always be correct
				w[key] = row[i];
			}
			return w;
		})
		.sort(sortAlphabetically);

	setHeaders({
		'Cache-Control': 's-maxage=3600'
	});

	return json(words);
}
