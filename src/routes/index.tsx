import { createFileRoute, Link } from "@tanstack/react-router";
import { Ledger, LedgerRow, Section } from "@/components/Section";
import paperFold from "@/assets/paper-fold.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Untitled — start from an honest blank page" },
      {
        name: "description",
        content:
          "A blank starter website: home, about and contact pages already built, with the four things you need to swap written out for you.",
      },
      { property: "og:title", content: "Untitled — start from an honest blank page" },
      {
        property: "og:description",
        content:
          "A blank starter website with three real pages and a short list of what to fill in first.",
      },
    ],
  }),
  component: Home,
});

const swaps = [
  {
    n: "01",
    title: "The name",
    note: "The wordmark in the header and footer is the first thing anyone reads. Put yours there and the site stops being generic.",
    slot: "header · footer",
  },
  {
    n: "02",
    title: "The sentence",
    note: "One line under the headline that says what you do, written for the person who arrived here by accident.",
    slot: "home page",
  },
  {
    n: "03",
    title: "The email",
    note: "A real address in two places: the contact page and the footer. Everything else on this site is decoration until that works.",
    slot: "contact · footer",
  },
  {
    n: "04",
    title: "The links",
    note: "Instagram, GitHub, a shop, a newsletter — wherever your work actually lives. Delete the ones that don't apply.",
    slot: "footer",
  },
];

function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:gap-6 md:py-24">
        <div className="md:col-span-7">
          <p className="label rise">
            <span className="label-accent">00</span>
            <span className="mx-1.5">—</span>
            A starting point
          </p>
          <h1 className="rise rise-1 mt-7 font-display text-[clamp(2.75rem,7.5vw,5.25rem)] leading-[0.94] tracking-tight text-balance">
            Nothing here yet.{" "}
            <em className="text-primary">That's the best part.</em>
          </h1>
          <p className="rise rise-2 mt-8 max-w-[46ch] text-lg leading-relaxed text-pretty text-muted-foreground">
            Three pages are standing, the type is set, and every block is
            labelled so you know what to change first. Write your own words into
            it and the site is yours.
          </p>
          <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start with the about page
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/contact"
              className="underline-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              or say hello
            </Link>
          </div>
        </div>

        <figure className="rise rise-2 md:col-span-5">
          <div className="overflow-hidden rounded-sm border border-border bg-muted">
            <img
              src={paperFold}
              alt="A single sheet of folded paper marked with one thin red ink line"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="label mt-3">
            A blank sheet, one line on it
          </figcaption>
        </figure>
      </section>

      <Section index="01" label="Swap these four things">
        <Ledger>
          {swaps.map((row) => (
            <LedgerRow key={row.n} {...row} />
          ))}
        </Ledger>
      </Section>

      <Section index="02" label="The shell">
        <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
          Three routes, one shared header and footer. Nothing is buried inside
          anything else, so a page can be renamed or removed without pulling the
          rest apart.
        </p>
        <div className="mt-8 border-t border-border">
          {[
            {
              path: "/",
              name: "Home",
              holds: "The headline, the four swaps, and the shape of the site.",
            },
            {
              path: "/about",
              name: "About",
              holds: "A short bio, the facts about you, and what the page could hold.",
            },
            {
              path: "/contact",
              name: "Contact",
              holds: "A message form, an email address, and the links you keep.",
            },
          ].map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group grid gap-1 border-b border-border py-5 transition-colors hover:bg-muted/60 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-xs text-primary sm:col-span-2">
                {page.path}
              </span>
              <span className="font-display text-xl leading-tight sm:col-span-3">
                {page.name}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground sm:col-span-7">
                {page.holds}
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
