# pata je iwe ikama

[View Online](https://dictionary.kokanu.com)

A dictionary for the IAL Kokanu. Data is dynamically retrieved from the Google Sheets [here](https://docs.google.com/spreadsheets/d/1SiXXmQUrQ2KI7SRV3Hp_FP53HDteuuMF1ZJ_d_AwBr4/edit?gid=0#gid=0) and displayed in a more easily searchable format online.

A JSON of the data used can be found at [/data](https://dictionary.kokanu.com/data). It is a `Word` array, defined below.

```ts
type Word = {
	word: string;
	likanu: string;
	type: WordType;

	meaning: string;
	noun: string;
	verb: string;
	modifier: string;
	antonym: string;

	origin: string;
	ipa: string;
	family: string;
};

type WordType =
	| 'Connector'
	| 'Demonstrative'
	| 'Grammar'
	| 'Modifier'
	| 'Noun'
	| 'Preposition'
	| 'Pronoun'
	| 'Quantity'
	| 'Verb';
```
