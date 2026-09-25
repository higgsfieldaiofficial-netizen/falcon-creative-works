import type { ReactNode } from "react";

/**
 * A hairline-topped block with a numbered marker in the left gutter and
 * content in the right nine columns. Every section on every page uses it.
 */
export function Section({
  index,
  label,
  children,
  className = "",
}: {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-border ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-3">
          <p className="label">
            <span className="label-accent">{index}</span>
            <span className="mx-1.5">—</span>
            {label}
          </p>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/**
 * One line of the ledger: number, title, note, and the slot it lives in.
 * Stacked rows read as an editorial list rather than a grid of cards.
 */
export function LedgerRow({
  n,
  title,
  note,
  slot,
}: {
  n: string;
  title: string;
  note: string;
  slot: string;
}) {
  return (
    <div className="grid gap-2 border-t border-border py-6 first:border-t-0 sm:grid-cols-12 sm:items-baseline sm:gap-6">
      <p className="label sm:col-span-1">{n}</p>
      <h3 className="font-display text-2xl leading-tight sm:col-span-4">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-5">
        {note}
      </p>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground sm:col-span-2 sm:text-right">
        {slot}
      </p>
    </div>
  );
}

export function Ledger({ children }: { children: ReactNode }) {
  return <div className="border-b border-border">{children}</div>;
}
