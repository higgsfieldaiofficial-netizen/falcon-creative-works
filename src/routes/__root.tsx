import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "../components/SiteShell";

function NotFoundComponent() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center px-6">
      <div className="max-w-md">
        <p className="label">
          <span className="label-accent">404</span>
          <span className="mx-1.5">—</span>
          Nothing at this address
        </p>
        <h1 className="mt-6 font-display text-5xl leading-[0.95]">
          This page was never written.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The link is wrong, or the page has been renamed. Either way, the rest
          of the site is still here.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center px-6">
      <div className="max-w-md">
        <p className="label">
          <span className="label-accent">500</span>
          <span className="mx-1.5">—</span>
          This page didn't load
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight">
          Something went wrong on our end.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          You can try again, or head back to the home page and start fresh.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Untitled — a blank starter website" },
      {
        name: "description",
        content:
          "A three-page starter site with a clear spine: a home page, an about page, and a contact page, all ready to be filled in.",
      },
      { name: "author", content: "Untitled" },
      { property: "og:title", content: "Untitled — a blank starter website" },
      {
        property: "og:description",
        content:
          "A three-page starter site with a clear spine, ready to be filled in with your own words.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Work+Sans:wght@300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
