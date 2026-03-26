# Design Tokens

This directory is reserved for Figma-derived design tokens.

Once the Figma link is provided, the following will be extracted and injected:

## Where tokens are applied

- **Colors** → CSS variables in `src/index.css` `:root` block (overriding shadcn defaults)
- **Typography** → `@theme` block font families + Tailwind utility classes
- **Spacing** → `@theme` block spacing scale
- **Border radius** → `--radius` variable in `src/index.css`
- **Shadows** → Custom CSS variables or Tailwind `@theme` extensions

## Files to update

1. `src/index.css` — `:root` and `.dark` CSS variable blocks
2. `src/index.css` — `@theme inline` block for Tailwind mappings
3. Component files — Apply semantic color tokens (e.g. `bg-primary`, `text-muted-foreground`)
