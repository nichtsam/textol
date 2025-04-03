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

    if (!isSpace(char)) {
      stats.charsNoSpaces += 1;
    }

    if (!isWordBound(char, peek)) {
      word += char;
    }

    if (!isSentenceBound(char, peek)) {
      if (!isSpace(char) || sentence.length !== 0) {
        sentence += char;
      }
    }

    if (!isParagraphBound(char)) {
      paragraph += char;
    }

    if (word.length !== 0 && isWordBound(char, peek)) {
      word = word.replace(/[.!?。！？]*$/, ""); // strip away puntuations
      stats.words.push(word);
      word = "";
    }

    if (sentence.length !== 0 && isSentenceBound(char, peek)) {
      if (isPunctuation(char, peek)) {
        sentence = sentence + char; // sentences should include puntuations
      }
      stats.sentences.push(sentence);
      sentence = "";
    }

    if (paragraph.length !== 0 && isParagraphBound(char)) {
      stats.paragraphs.push(paragraph);
      paragraph = "";
    }
  }

  // if reaches the end without meeting any end
  if (word.length !== 0) {
    word = word.replace(/[.!?。！？]*$/, ""); // strip away puntuations
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

function isSpace(char: string) {
  return /\s/.test(char);
}

function isWesternPunctuation(char: string, peek: string) {
  return /[\.!?]/.test(char) && (isSpace(peek) || isParagraphBound(char));
}
function isCJKPunctuation(char: string, peek: string) {
  return /[。！？]/.test(char) && !/[。！？]/.test(peek);
}
function isPunctuation(char: string, peek: string) {
  return isWesternPunctuation(char, peek) || isCJKPunctuation(char, peek);
}

function isParagraphBound(char: string) {
  return /\n/.test(char);
}
function isSentenceBound(char: string, peek: string) {
  return isParagraphBound(char) || isPunctuation(char, peek);
}
function isWordBound(char: string, peek: string) {
  return isSentenceBound(char, peek) || isSpace(char);
}
