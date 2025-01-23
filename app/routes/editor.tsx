import Editor from "@monaco-editor/react";
import { ClientOnly } from "remix-utils/client-only";
import { Card, CardContent } from "~/components/ui/card";

export function meta() {
  return [
    { title: "Editor | Textol" },
    { name: "description", content: "Edit your text!" },
  ];
}

export default function EditorPage() {
  return (
    <div className="p-4 h-full">
      <Card className="h-full">
        <CardContent className="h-full">
          <ClientOnly>
            {() => (
              <Editor
                className="h-full w-full"
                width="95%"
                options={{ minimap: { enabled: false } }}
              />
            )}
          </ClientOnly>
        </CardContent>
      </Card>
    </div>
  );
}
