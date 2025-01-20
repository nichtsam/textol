export type Stats = {
	chars: number;
	charsNoSpaces: number;
	words: string[];
	sentences: string[];
	paragraphs: string[];
};

export function analyzeText(text: string) {
	const stats: Stats = {
		chars: 0,
		charsNoSpaces: 0,
		words: [],
		sentences: [],
		paragraphs: [],
	};

	let word = "";
	let sentence = "";
	let paragraph = "";

	for (let i = 0; i < text.length; i += 1) {
		stats.chars += 1;

		const char = text[i]!;
		const peek = text[i + 1] ?? "\0";

		if (/\S/.test(char)) {
			stats.charsNoSpaces += 1;
			word += char;
		}

		if (/[^\n\0]/.test(char)) {
			if (char !== " " || sentence.length !== 0) {
				sentence += char;
			}
			paragraph += char;
		}

		if (word.length !== 0 && /[\s\0]/.test(peek)) {
			word = word.replace(/\.*$|[!?]*$/, "");
			stats.words.push(word);
			word = "";
		}

		if (sentence.length !== 0 && /[.!?]/.test(char) && /[\s\0]/.test(peek)) {
			stats.sentences.push(sentence);
			sentence = "";
		}

		if (sentence.length !== 0 && /\n/.test(char)) {
			stats.sentences.push(sentence);
			sentence = "";
		}

		if (paragraph.length !== 0 && /\n/.test(char)) {
			stats.paragraphs.push(paragraph);
			paragraph = "";
		}
	}

	if (word.length !== 0) {
		stats.words.push(word);
		word = "";
	}

	if (sentence.length !== 0) {
		stats.sentences.push(sentence);
		sentence = "";
	}

	if (paragraph.length !== 0) {
		stats.paragraphs.push(paragraph);
		paragraph = "";
	}

	return stats;
}
