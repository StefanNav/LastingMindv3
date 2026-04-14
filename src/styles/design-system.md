# LastingMind Design System

Reference spec derived from the mature patterns in **LovedOnesPage**, **MemoryProfilePage**, and aligned screens. All new and updated screens must follow these conventions.

---

## 1. Color Tokens

### Rules

- **Never** use raw `var(--lm-*)` in component/page files. Use Tailwind semantic mappings only.
- **Never** hardcode hex values in components. If a color is needed, add it to `index.css` and map it in the `@theme` block.

### Semantic Palette (Tailwind classes)

| Token                   | Usage                                   |
|-------------------------|-----------------------------------------|
| `text-foreground`       | Primary text                            |
| `text-muted-foreground` | Secondary / helper text                 |
| `text-primary`          | Green accent text, interactive labels   |
| `text-primary-foreground` | Text on primary backgrounds           |
| `text-lm-gold`          | Gold accent labels, section dividers    |
| `text-lm-green`         | Green accent (status badges)            |
| `bg-background`         | App background fallback                 |
| `bg-primary`            | Primary CTA background                  |
| `bg-primary/5`          | Hover tint on outlined buttons          |
| `bg-primary/10`         | Avatar placeholder fill                 |
| `bg-muted`              | Subtle surface / hover state            |
| `bg-lm-bg-card/40`      | Card background (with transparency)     |
| `bg-lm-green`           | Use `bg-primary` instead in CTAs        |
| `border-border`         | Default borders                         |
| `border-border/50`      | Subtle borders (footer separators)      |
| `border-lm-gold/30`     | Gold section divider lines              |

---

## 2. Typography

### Font Families

- **Display / Headings:** `font-display` (Playfair Display Variable)
- **Body / UI:** `font-sans` (Lato) — default, no class needed

### Heading Scale

| Level     | Classes                                              | Usage                        |
|-----------|------------------------------------------------------|------------------------------|
| Page H1   | `font-display text-2xl font-semibold text-foreground` | Page titles                  |
| Section H2 | `font-display text-lg font-semibold text-foreground`  | Modal / card headings        |
| Card Title | `font-display text-lg font-normal leading-tight text-foreground` | Card names (people, chapters) |
| Subtitle   | `text-sm leading-snug text-muted-foreground`          | Page descriptions            |

### Body Scale

| Level     | Classes                                              | Usage                        |
|-----------|------------------------------------------------------|------------------------------|
| Body      | `text-sm leading-snug text-foreground/80`             | Card prose, bios             |
| Caption   | `text-xs text-muted-foreground`                       | Metadata, timestamps         |
| Label     | `text-[11px] font-bold uppercase tracking-widest`     | Section divider labels       |
| Stat      | `text-sm font-bold text-foreground`                   | Numeric values               |
| Stat Label | `text-[11px] text-muted-foreground`                  | Below stats                  |

### Rules

- Prefer Tailwind text scale (`text-sm`, `text-lg`, `text-2xl`) over arbitrary `text-[Npx]`.
- Only use `text-[11px]` for the uppercase label pattern and `text-[10px]` for tiny metadata.
- Headings always use `font-display`. Body never does.

---

## 3. Card Pattern

### Standard Card

```
rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm
```

- All cards use this. No `rounded-xl`, no inline `boxShadow`, no raw `bg-[var(--lm-bg-card)]`.
- Cards with less content can use `px-5 py-4` instead of `p-5`.

### Compact Row Card

```
rounded-[10px] bg-lm-bg-card/40 px-5 py-4 shadow-card backdrop-blur-sm
```

Used for list items (audience members, chapter rows).

---

## 4. Section Dividers

Gold-line divider with centered uppercase label:

```tsx
<SectionDivider label="Section Name" variant="gold" />
```

Renders as:
```
<div className="flex items-center gap-3">
  <div className="h-px flex-1 bg-lm-gold/30" />
  <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
    {label}
  </p>
  <div className="h-px flex-1 bg-lm-gold/30" />
</div>
```

Muted variant uses `bg-border` and `text-muted-foreground`.

---

## 5. Buttons

### Primary CTA (full-width)

```tsx
<PrimaryCTA onClick={handler}>Label</PrimaryCTA>
```

Renders as:
```
rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground
transition-colors hover:bg-primary/90 active:scale-[0.98]
```

- **Always** `bg-primary`, never `bg-lm-green`.
- **Always** `rounded-lg`, never `rounded-[4px]` or `rounded-[10px]`.
- Full-width via `w-full` on the parent or button itself.

### Secondary CTA

```
rounded-lg border border-border bg-transparent px-6 py-3 text-[15px] font-medium
text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]
```

- Never use hardcoded `bg-[#e7ebd9]` or `text-[#283227]`.

### Outlined Action Button (small, in cards)

```
rounded-lg border border-border bg-transparent px-3 py-2.5 text-xs font-medium
text-primary transition-colors hover:bg-primary/5 active:scale-[0.97]
```

---

## 6. Back Button

Ghost style, top-left of page:

```tsx
<BackButton onClick={handler} />
```

Renders as:
```
rounded-full p-1 text-foreground transition-colors hover:bg-muted
```

With `<ArrowLeft className="size-5" />` inside.

- **Never** use `bg-lm-neutral-warm rounded-[4px]` solid back buttons.

---

## 7. Page Layout

### Standard Page with Background

```tsx
<PageShell>
  <div className="relative z-10 flex flex-col gap-5 p-6 pt-14">
    {/* page content */}
  </div>
</PageShell>
```

`PageShell` provides:
1. `<PageTransition>` wrapper
2. Sticky background image (`OnboardingBackground.png`) at `z-0`
3. Content rendered at `z-10`

### Scrollable Page with Sticky Footer

Use `<StickyFooter>` for pinned bottom CTAs:
```
border-t border-border/50 bg-[var(--lm-bg-primary)]/95 px-5 pb-8 pt-4 backdrop-blur-sm
```

---

## 8. Shadows

| Token          | Value                              | Usage            |
|----------------|------------------------------------|------------------|
| `shadow-card`  | `0px 4px 12px rgba(0,0,0,0.15)`   | Cards            |
| `shadow-toggle`| `0px 4px 4px rgba(0,0,0,0.11)`    | Toggle switches  |

- Never use inline `style={{ boxShadow: '...' }}`. Use the Tailwind shadow tokens.

---

## 9. Spacing Conventions

- Page padding: `p-6 pt-14` (accounts for status bar / header)
- Card internal padding: `p-5` or `px-5 py-4`
- Gap between cards: `gap-3` to `gap-4`
- Section gap: `gap-5`
- Sticky footer padding: `px-5 pb-8 pt-4`

---

## 10. Banned Patterns

| Pattern | Replacement |
|---------|-------------|
| `var(--lm-text-secondary)` in className | `text-muted-foreground` |
| `var(--lm-text-primary)` in className | `text-foreground` |
| `var(--lm-border)` in className | `border-border` |
| `var(--lm-border-subtle)` in className | `border-border/50` |
| `var(--lm-bg-card)` in className | `bg-lm-bg-card` (via Tailwind mapping) |
| `bg-lm-green` on CTAs | `bg-primary` |
| `rounded-[4px]` on buttons | `rounded-lg` |
| `bg-[#e7ebd9]` | `bg-muted` or `bg-secondary` |
| `text-[#283227]` | `text-foreground` |
| Inline `boxShadow` | `shadow-card` |
| `text-[16px]` | `text-base` |
| `text-[14px]` | `text-sm` |
| `text-[15px]` | `text-sm` or `text-base` (context-dependent) |
| `text-[26px]` | `text-2xl` |
| `text-[32px]` | `text-3xl` |
