import { json } from '@sveltejs/kit';
import { GOOGLE_KEY } from '$env/static/private';
import type { Word } from '$lib/types';
import { sortAlphabetically } from '$lib/util.js';
import { sheets_v4 } from 'googleapis/build/src/apis/sheets/v4';

const SHEET_ID = '1SiXXmQUrQ2KI7SRV3Hp_FP53HDteuuMF1ZJ_d_AwBr4';

const keys: Record<string, keyof Word> = {
	Word: 'word',
	'xʃxƨſ ': 'likanu',
	Type: 'type',
	Meaning: 'meaning',
	Noun: 'noun',
	Verb: 'verb',
	Modifier: 'modifier',
	Antonym: 'antonym',
	Origin: 'origin',
	IPA: 'ipa',
	Family: 'family'
};

export async function GET({ fetch, setHeaders }) {
	const sheets = new sheets_v4.Sheets({
		auth: GOOGLE_KEY,
		fetchImplementation: fetch
	});
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID,
		range: 'Dictionary'
	});

	if (!res.data.values) {
		return json([]);
	}

	const firstRow = res.data.values.shift() as string[];

	const words = res.data.values
		.slice(1)
		.map(word => {
			const w = {} as Word;
			for (let i = 0; i < word.length; i++) {
				const key = keys[firstRow[i]];
				w[key] = word[i];
			}
			return w;
		})
		.sort(sortAlphabetically);

	setHeaders({
		'Cache-Control': 's-maxage=3600'
	});

	return json(words);
}
