import { useState, type ChangeEvent, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Ledger, LedgerRow, Section } from "@/components/Section";

const EMAIL = "hello@yourdomain.com";

const messageSchema = z.object({
  name: z.string().trim().min(1, "Who is writing?"),
  email: z.string().trim().email("That address doesn't look right"),
  message: z.string().trim().min(12, "A sentence or two, please"),
});

type Values = { name: string; email: string; message: string };
type Field = keyof Values;

const empty: Values = { name: "", email: "", message: "" };

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Untitled" },
      {
        name: "description",
        content:
          "The contact page of a blank starter site: a message form, a real email address, and the links you keep.",
      },
      { property: "og:title", content: "Contact — Untitled" },
      {
        property: "og:description",
        content:
          "A ready-made contact page with a working message form and a clear place to put your email address.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [ready, setReady] = useState(false);

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `A note from ${values.name}`,
  )}&body=${encodeURIComponent(
    `${values.message}\n\n— ${values.name}\n${values.email}`,
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = messageSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Field;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setReady(false);
      return;
    }
    setErrors({});
    setReady(true);
  }

  function update(field: Field) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    };
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="label rise">
          <span className="label-accent">00</span>
          <span className="mx-1.5">—</span>
          Contact
        </p>
        <h1 className="rise rise-1 mt-7 font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.96] tracking-tight">
          Say <em className="text-primary">hello.</em>
        </h1>
      </section>

      <Section index="01" label="Two ways in">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="label">Direct</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 block max-w-[22ch] font-display text-3xl leading-tight break-words underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              {EMAIL}
            </a>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              Replies within two days, usually one. This is the address to
              replace first.
            </p>

            <p className="label mt-10">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              {["Instagram", "GitHub", "Newsletter"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-8 md:pl-6">
            {ready ? (
              <div className="rise border-t border-border pt-8">
                <p className="label label-accent">Ready to send</p>
                <h2 className="mt-4 font-display text-3xl leading-tight">
                  Your note is written and waiting.
                </h2>
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                  This form isn't connected to a server yet, so it hands the
                  message to your email app instead of storing it anywhere.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <a
                    href={mailto}
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Open it in your email app
                    <span aria-hidden="true">→</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(empty);
                      setReady(false);
                    }}
                    className="underline-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Write another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
                  <Field
                    id="name"
                    label="Your name"
                    placeholder="Jordan Rivera"
                    value={values.name}
                    error={errors.name}
                    onChange={update("name")}
                  />
                  <Field
                    id="email"
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={update("email")}
                  />
                </div>
                <div className="mt-8">
                  <Field
                    id="message"
                    label="Message"
                    placeholder="What are you working on?"
                    rows={5}
                    value={values.message}
                    error={errors.message}
                    onChange={update("message")}
                  />
                </div>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Send the note
                    <span aria-hidden="true">→</span>
                  </button>
                  <p className="label">Nothing is stored on this site</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section index="02" label="Before you write">
        <Ledger>
          <LedgerRow
            n="01"
            title="Say what you need"
            note="One honest paragraph beats a formal brief. If you can describe the outcome, the rest is a conversation."
            slot="message"
          />
          <LedgerRow
            n="02"
            title="Give a rough date"
            note="Even 'sometime this spring' is more useful than a deadline invented for the occasion."
            slot="message"
          />
          <LedgerRow
            n="03"
            title="Link what already exists"
            note="An old site, a screenshot, a half-finished document. Anything real helps, and messy is fine."
            slot="message"
          />
        </Ledger>
      </Section>
    </>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
  rows,
}: {
  id: Field;
  label: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  rows?: number;
}) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="mt-2 w-full resize-y border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-2 font-mono text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
