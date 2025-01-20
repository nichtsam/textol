import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { analyzeText } from "~/utils/text";

export function meta() {
  return [
    { title: "Word Counter | Textol" },
    { name: "description", content: "Count your words!" },
  ];
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = analyzeText(text);

  return (
    <main className="p-4 flex flex-col gap-4">
      <Card>
        <CardContent className="grid grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Characters</span>
            <span className="flex">{stats.chars}</span>
            <span className="flex">{stats.charsNoSpaces}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Words</span>
            <span>{stats.words.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Sentence</span>
            <span>{stats.sentences.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Paragraphs</span>
            <span>{stats.paragraphs.length}</span>
          </div>
        </CardContent>
      </Card>
      <Textarea
        onChange={(e) => setText(e.target.value)}
        className="resize-none h-[50vh]"
      />
    </main>
  );
}
