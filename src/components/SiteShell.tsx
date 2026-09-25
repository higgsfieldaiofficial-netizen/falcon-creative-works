import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

function Wordmark() {
  return (
    <Link to="/" className="flex items-baseline gap-2.5">
      <span className="font-display text-2xl leading-none">Untitled</span>
      <span className="label hidden sm:inline">v0.1</span>
    </Link>
  );
}

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <Wordmark />
          <nav className="flex items-center gap-5 sm:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="underline-sweep text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-2xl leading-none">Untitled</p>
            <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
              Three pages, one shell, nothing here you are not allowed to delete.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label">Reach</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                >
                  hello@yourdomain.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label">Pages</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="label">© 2026 Untitled</p>
            <p className="label">Swap this line for yours</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
