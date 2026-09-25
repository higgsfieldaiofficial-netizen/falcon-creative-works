<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Structure

- The header and footer live in `src/components/SiteShell.tsx`, rendered once around `<Outlet />` in `src/routes/__root.tsx`; routes never repeat nav or footer markup. Why: the owner renames the wordmark and email in one place.
- Page blocks use `Section`, `Ledger` and `LedgerRow` from `src/components/Section.tsx` instead of ad hoc markup, and colours come from the tokens in `src/styles.css`. Why: a new block matches the numbered-gutter rhythm without restyling, and the site stays editable for someone who isn't a designer.
