export type WordType =
	| 'Prefix'
	| 'Suffix'
	| 'Content'
	| 'Pronoun'
	| 'Number'
	| 'Grammer'
	| 'Compound';

export type Word = {
	word: string;
	cyrillic: string;
	type: WordType;

	meaning: string;
	adjective: string;
	noun: string;
	verb: string;
	adverb: string;
	preposition: string;
	origin: string;
	language: string;
	malroot: string;
};

export const wordTypeBackgroundColors: Record<WordType, string> = {
	Prefix: 'bg-rose-500 dark:bg-rose-600',
	Suffix: 'bg-red-700 dark:bg-red-800',
	Content: 'bg-orange-400 dark:bg-orange-600',
	Pronoun: 'bg-yellow-400 dark:bg-yellow-600',
	Number: 'bg-emerald-400 dark:bg-emerald-600',
	Grammer: 'bg-cyan-400 dark:bg-cyan-600',
	Compound: 'bg-fuchsia-400 dark:bg-fuchsia-600'
};

export const wordTypeTextColors: Record<WordType, string> = {
	Prefix: 'text-rose-600 dark:text-rose-400',
	Suffix: 'text-red-800 dark:text-red-600',
	Content: 'text-orange-600 dark:text-orange-400',
	Pronoun: 'text-yellow-600 dark:text-yellow-400',
	Number: 'text-emerald-600 dark:text-emerald-400',
	Grammer: 'text-cyan-600 dark:text-cyan-400',
	Compound: 'bg-fuchsia-400 dark:bg-fuchsia-600'
};

export const wordTypeBorderColors: Record<WordType, string> = {
	Prefix: 'border-rose-500 dark:border-rose-600',
	Suffix: 'border-red-700 dark:border-red-800',
	Content: 'border-orange-400 dark:border-orange-600',
	Pronoun: 'border-yellow-400 dark:border-yellow-600',
	Number: 'border-emerald-400 dark:border-emerald-600',
	Grammer: 'border-cyan-400 dark:border-cyan-600',
	Compound: 'bg-fuchsia-400 dark:bg-fuchsia-600'
};
