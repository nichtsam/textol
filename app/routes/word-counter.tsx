export function meta() {
  return [
    { title: "Word Counter | Textol" },
    { name: "description", content: "Count your words!" },
  ];
}

export default function WordCounter() {
  return (
    <main className="pt-9 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-foreground">
          Welcome to Textol
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your robust toolkit for text manipulation and analysis
        </p>
      </section>
    </main>
  );
}
