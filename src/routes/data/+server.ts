import { json } from '@sveltejs/kit';
import type { Word } from '$lib/types';
import parser from 'papaparse';

const SHEET_URL =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVGXFd17kcvfu__zjshqiV3kW360IclOEfEdWda_K6ZCg4TY6nW2Gwn4_bs1yQeFLwrZI1_xEvSuP0/pub?gid=0&single=true&output=csv';

const keys: Record<string, keyof Word> = {
	Word: 'word',
	'xʃxƨſ ': 'likanu',
	Type: 'type',
	Meaning: 'meaning',
	Noun: 'noun',
	Verb: 'verb',
	Modifier: 'modifier',
	Origin: 'origin',
	IPA: 'ipa',
	Family: 'family'
};

export async function GET({ fetch, setHeaders }) {
	const text = await fetch(SHEET_URL).then(res => res.text());

	const { data } = parser.parse(text, { header: true }) as {
		data: Record<string, string>[];
	};

	const words = data.map(word => {
		const w = {} as Word;
		for (const key of Object.keys(keys)) {
			w[keys[key] as 'word'] = word[key];
		}
		return w;
	});

	setHeaders({
		'Cache-Control': 's-maxage=3600'
	});

	return json(words);
}
