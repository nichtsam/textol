import { expect, test } from "bun:test";
import { type Stats, analyzeText } from "./text";

test.each([
  [
    "Lorem ipsum dolor sit amet.",
    {
      chars: 27,
      charsNoSpaces: 23,
      words: ["Lorem", "ipsum", "dolor", "sit", "amet"],
      sentences: ["Lorem ipsum dolor sit amet."],
      paragraphs: ["Lorem ipsum dolor sit amet."],
    },
  ],
  [
    "I have a dream.\nI have a dream.\n\nI have a dream.",
    {
      chars: 48,
      charsNoSpaces: 36,
      words: [
        "I",
        "have",
        "a",
        "dream",
        "I",
        "have",
        "a",
        "dream",
        "I",
        "have",
        "a",
        "dream",
      ],
      sentences: ["I have a dream.", "I have a dream.", "I have a dream."],
      paragraphs: ["I have a dream.", "I have a dream.", "I have a dream."],
    },
  ],
  [
    "aijsfoiasfgÉÉasjifajo.\\n\naskgoaskgoasg\nWo wo @%*@*  @*%92058)@%!? sdsd??? sdsd lll",
    {
      chars: 82,
      charsNoSpaces: 73,
      words: [
        "aijsfoiasfgÉÉasjifajo.\\n",
        "askgoaskgoasg",
        "Wo",
        "wo",
        "@%*@*",
        "@*%92058)@%",
        "sdsd",
        "sdsd",
        "lll",
      ],
      sentences: [
        "aijsfoiasfgÉÉasjifajo.\\n",
        "askgoaskgoasg",
        "Wo wo @%*@*  @*%92058)@%!?",
        "sdsd???",
        "sdsd lll",
      ],
      paragraphs: [
        "aijsfoiasfgÉÉasjifajo.\\n",
        "askgoaskgoasg",
        "Wo wo @%*@*  @*%92058)@%!? sdsd??? sdsd lll",
      ],
    },
  ],
  [
    "這樣子算一句話。這樣子也算一句話？這樣子也算一句話！！",
    {
      chars: 27,
      charsNoSpaces: 27,
      words: ["這樣子算一句話", "這樣子也算一句話", "這樣子也算一句話"],
      sentences: [
        "這樣子算一句話。",
        "這樣子也算一句話？",
        "這樣子也算一句話！！",
      ],
      paragraphs: ["這樣子算一句話。這樣子也算一句話？這樣子也算一句話！！"],
    },
  ],
])('analyze text correctly:\n"%s"', (text, expected) => {
  const stats = analyzeText(text);
  expect(stats).toEqual(expected);
});
