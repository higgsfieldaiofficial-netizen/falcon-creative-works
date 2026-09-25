import { createFileRoute, Link } from "@tanstack/react-router";
import { Ledger, LedgerRow, Section } from "@/components/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Untitled" },
      {
        name: "description",
        content:
          "The about page of a blank starter site: a short bio, a few facts about you, and a list of what this page could hold.",
      },
      { property: "og:title", content: "About — Untitled" },
      {
        property: "og:description",
        content:
          "A ready-made about page with a short bio block, a column of facts, and slots you can fill in.",
      },
    ],
  }),
  component: About,
});

const facts = [
  { key: "Founded", value: "20__" },
  { key: "Based", value: "Your city" },
  { key: "Working on", value: "Something new" },
  { key: "Status", value: "Open to work" },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="label rise">
          <span className="label-accent">00</span>
          <span className="mx-1.5">—</span>
          About
        </p>
        <h1 className="rise rise-1 mt-7 max-w-[22ch] font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.96] tracking-tight text-balance">
          About is the page people read right before{" "}
          <em className="text-primary">they decide.</em>
        </h1>
      </section>

      <Section index="01" label="Who you are">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <p className="max-w-[58ch] text-base leading-relaxed text-pretty">
              Write two paragraphs here. The first says who you are and what you
              make, in the plain words you would use if someone asked at a
              dinner table. The second says why it matters to the person on the
              other side of the screen.
            </p>
            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-pretty">
              Keep it shorter than feels comfortable. Nobody reads a third
              paragraph, and the fourth one is where a starter site starts to
              look like a template.
            </p>
            <p className="mt-8 max-w-[40ch] border-l border-primary pl-5 font-display text-2xl italic leading-snug">
              “One true sentence beats four careful ones.”
            </p>
          </div>

          <div className="md:col-span-4 md:pl-6">
            <p className="label">The facts</p>
            <dl className="mt-4 border-t border-border">
              {facts.map((fact) => (
                <div
                  key={fact.key}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3"
                >
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {fact.key}
                  </dt>
                  <dd className="text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              A column like this is the cheapest way to look real. Four lines, no
              images.
            </p>
          </div>
        </div>
      </Section>

      <Section index="02" label="What this page can hold">
        <Ledger>
          <LedgerRow
            n="01"
            title="A short bio"
            note="Two paragraphs and a photo if you have one you like. The layout works without the photo."
            slot="above"
          />
          <LedgerRow
            n="02"
            title="A timeline"
            note="Three or four dated lines: what you started, what you shipped, what you stopped doing."
            slot="new section"
          />
          <LedgerRow
            n="03"
            title="A few values"
            note="Only if you can say them out loud without wincing. Two is plenty."
            slot="new section"
          />
          <LedgerRow
            n="04"
            title="Where the work went"
            note="A list of clients, projects, or places, with the ones you are proud of first."
            slot="new section"
          />
        </Ledger>

        <p className="mt-8 text-sm text-muted-foreground">
          Done here?{" "}
          <Link
            to="/contact"
            className="text-foreground underline decoration-primary underline-offset-4"
          >
            Fix the contact page next
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
