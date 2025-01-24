import { ClipboardPaste } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { analyzeText } from "~/utils/text";

export function meta() {
  return [
    { title: "Word Counter | Textol" },
    { name: "description", content: "Count your words!" },
  ];
}

export default function WordCounter() {
  const [text, setText] = useState("");

  return (
    <main className="py-4 sm:px-4 gap-4 flex flex-col">
      <div className="relative">
        <Textarea
          placeholder="Enter or Paste"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="peer resize-none h-[50vh]"
        />
        <Button
          variant="outline"
          className="absolute top-8 left-3 hidden md:peer-placeholder-shown:inline-flex"
          onClick={async () => {
            try {
              const copied = await navigator.clipboard.readText();
              setText(copied);
            } catch (err) {
              alert("Clipboard access denied!");
            }
          }}
        >
          <ClipboardPaste className="h-4 w-4" />
          Paste
        </Button>
      </div>

      <Analysis text={text} />
    </main>
  );
}

function Analysis({ text }: { text: string }) {
  const stats = analyzeText(text);
  const speakingTime = Math.round(stats.words.length / (150 / 60));
  const readingTime = Math.round(stats.words.length / (200 / 60));

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-evenly lg:order-first">
        <AnalysisItem
          className="basis-32"
          label="Characters"
          content={stats.chars}
        />
        <AnalysisItem
          label={
            <span className="inline-flex flex-col text-center">
              Characters<span className="text-xs">Without Spaces</span>
            </span>
          }
          content={stats.charsNoSpaces}
        />
        <AnalysisItem
          className="basis-32"
          label="Words"
          content={stats.words.length}
        />
        <AnalysisItem
          className="basis-32"
          label="Sentences"
          content={stats.sentences.length}
        />
        <AnalysisItem
          className="basis-32"
          label="Paragraphs"
          content={stats.paragraphs.length}
        />
      </div>

      <div className="flex gap-2 justify-center flex-col sm:flex-row">
        <AnalysisItem label="Reading Time" content={`${readingTime} seconds`} />
        <AnalysisItem
          label="speakingTime"
          content={`${speakingTime} seconds`}
        />
      </div>
    </>
  );
}

function AnalysisItem({
  label,
  content,
  className,
}: {
  label: ReactNode;
  content: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border bg-card text-card-foreground shadow p-2 grow",
        className,
      )}
    >
      <span>{content}</span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  );
}
