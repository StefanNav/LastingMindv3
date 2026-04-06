# LastingMind 2.0 — Reward System Flows
_Supplementary spec to `lastingmind_app_structure.md`. Defines the four reward flows, their trigger conditions, and screen sequences for Foundation phase module completions._

---

## Overview

Every time a user completes a module they enter one of four reward flows. Flows C and D are intentionally decoupled — Flow C handles the star earned moment for any category in any phase, and Flow D (tree growth) is appended to Flow C only when tree growth is triggered. This keeps both flows reusable independently.

**The four flows:**

| Flow | Name | Trigger |
|------|------|---------|
| A | Module Complete — No Star, No Teaser | Very first module ever completed |
| B | Module Complete — No Star, Star Teaser | Any Module 1 completion after the first |
| C | Star Earned | Any Module 2 completion that awards a star |
| D | Tree Growth | Appended after Flow C on first star and final Foundation star only |

Every flow begins with the same two shared screens.

---

## The Reward Card

Every time a user completes an input method — a guided conversation, a story, a slot machine session — they receive a **reward card**. The card is a visual artifact representing that specific capture.

- Each input completion = one card. A module requiring two stories produces two separate cards.
- Card content reflects what was shared (e.g. the Family module card shows the listed family members; a story card shows the subject of the story).
- The reward card is the first screen shown after the save confirmation prefix, in every flow.

---

## Shared Prefix — All Flows

These two screens open every flow. Design once, reuse everywhere.

**Screen 1: Saving Indicator**
- Content: `"Saving your story…"` with a loading animation
- Never skippable — duration matches actual save time
- This is a trust moment. Users' #1 pain point is losing recorded content.

**Screen 2: Save Confirmed**
- Content: `"Saved. Your LastingMind is growing."` 
- Always appears before the reward card or any celebration
- Reassurance before reward — ordering is non-negotiable

---

## Suggested Module Completion Order

The app suggests a default progression order. The next-step logic at the end of every flow identifies the first incomplete category in this order and surfaces it.

1. Family
2. Friends
3. Career
4. Education
5. Favorites
6. Core Values

> If a user completes a category out of sequence, the suggestion skips completed categories and points to the next incomplete one in the default order above.

---

## Flow A — Module Complete, No Star, No Teaser

**Trigger:** The very first module the user has ever completed. Shown exactly once per user lifetime.

**Purpose:** Orient the user. Help them understand what they just started and why it matters. No star teaser yet — they've only just begun.

**Screen sequence:**

1. Saving Indicator *(shared prefix)*
2. Save Confirmed *(shared prefix)*
3. **Reward Card** — shows the module artifact (e.g. family members listed). Header: `"Module Complete!"` Subheader: `"You've added this to your LastingMind"` 
4. **Encouragement Screen** — contextual message explaining the significance of what they just captured. Example: `"Knowing who's in your family is the foundation everything builds on."` Accompanied by a supporting image.
5. **Summary Screen** — two sections:
   - *Module completed*: shows the completed module with a checkmark and `"Step 1 of 2"` progress indicator for this category
   - *Up next*: the next module in this category — module name, brief description, estimated time. Primary CTA: `"Start This Module"`. Secondary CTA: `"Done for now"` 

---

## Flow B — Module Complete, No Star, Star Teaser

**Trigger:** Any Module 1 completion after the very first one. This is the standard Module 1 completion flow for the rest of Foundation.

**Purpose:** Acknowledge what the user captured and tease the star. They are one module away from earning it — the flow should build anticipation without overpromising.

**Screen sequence:**

1. Saving Indicator *(shared prefix)*
2. Save Confirmed *(shared prefix)*
3. **Reward Card** — shows the module artifact. Header and subheader are stage-specific (see copy doc). Example: `"First Family Story Complete!"` / `"You've added another meaningful piece to your LastingMind."` 
4. **Encouragement Screen** — contextual copy acknowledging progress. Example: `"What you share today becomes part of what your loved ones may one day ask about."` Accompanied by a supporting image.
5. **Star Teaser / Summary Screen** — combined screen:
   - Headline: `"You're one story away from your first star"` (or equivalent for the category)
   - Shows the category card with its star in a warming/unearned state — a visual indicator that the star is close but not yet earned
   - *Up next*: the Module 2 prompt for this category. Primary CTA: `"Tell Another [Category] Story"` or `"Start Module 2"`. Secondary CTA: `"Done for now"` 

---

## Flow C — Star Earned

**Trigger:** Any Module 2 completion that awards a star, in any category, in any phase.

**Purpose:** Celebrate the star earned and show the user where they stand across all Foundation categories. This flow is **reusable** — it works for any star in any category. It does not include tree growth (that is Flow D, appended separately when needed).

**Screen sequence:**

1. Saving Indicator *(shared prefix)*
2. Save Confirmed *(shared prefix)*
3. **Reward Card** — shows the module artifact. Header and subheader are stage-specific. Example: `"Family Story Added!"` / `"You've added another meaningful piece to your LastingMind."` 
4. **Star Earned Animation** — a multi-step animation sequence showing the star for this category coming to life. The star glows, grows larger, and fills with colour to indicate it is now earned. This plays across 2–3 screens to give the animation room to breathe.
5. **Map Screen** — shows all 6 Foundation category slots in a 3×2 grid. Earned stars are shown filled. Unearned are shown as empty/ghost. Each category shows its status (`"Growing"`, `"Started"`, `"Not Started"`). Header copy is stage-specific (see copy doc). Example: `"Family now holds its first star"` / `"You've reached your first milestone in the growth of your LastingMind."` 

> **Flow C ends here.** If tree growth is triggered, Flow D follows immediately after the Map Screen.

---

## Flow D — Tree Growth

**Trigger:** Appended directly after Flow C in two specific cases only:
1. The **first star** ever earned (total Foundation stars = 1)
2. The **final star** earned (total Foundation stars = 6, Phase 1 complete)

Flow D does **not** trigger for stars 2–5. Those complete with Flow C only.

**Purpose:** Show the tree growing in response to a milestone star. This is the most emotionally significant moment in the reward system. The tree growth animation should feel earned.

**Tree Stage Images**

Tree growth stages are represented by static image assets. Reference the correct asset at each growth stage:

| Stage | Asset Label | When Used |
|-------|-------------|-----------|
| Stage 1 | `TreeStage1` | Seed / Sprout — new user, nothing earned |
| Stage 2 | `TreeStage2` | Sapling — first star earned |
| Stage 3 | `TreeStage3` | Young Tree — Phase 1 complete (6th star) |
| Stage 4 | `TreeStage4` | Mature Tree — Phase 2 complete |
| Stage 5+ | `TreeStage5`, etc. | Further growth stages as defined |

**Screen sequence — when triggered by first star (stars = 1):**

1. **Tree Growth Screen 1** — full-screen tree animation transitioning from `TreeStage1` to `TreeStage2`. Headline: `"Your first star sparked new growth!"` No nav chrome during the animation.
2. **Tree Growth Screen 2** — continued animation or a settled view of `TreeStage2` with the same or complementary headline.
3. **Progress / Summary Screen** — headline: `"Your first star is just the beginning"`. Shows:
   - Current tree image (`TreeStage2`)
   - *Your Progress* section: completed modules listed with checkmarks and entry counts
   - *Suggested* next module: the next incomplete category in the default order — module name, description, time estimate. Primary CTA: `"Start This Module"`. Secondary CTA: `"Done for now"` 

**Screen sequence — when triggered by final star (stars = 6, Phase 1 complete):**

1. **Final Star Animation** — all 6 stars animate on screen together. A deliberate pause beat after all 6 are shown — do not rush to the next screen.
2. **Tree Growth Screen** — full-screen transition from `TreeStage2` to `TreeStage3`. No nav chrome. Duration: 3–5 seconds. This is the most important animation in the app.
3. **Phase 1 Celebration Screen** — framed entirely around family impact. Example: `"Your family now knows who shaped your life, what you value, and where you've been."` Stats shown: stars earned, total entries.
4. **Unlocks Revealed** — three unlocks shown sequentially, one at a time:
   1. Voice Clone — `"Give your LastingMind your voice"` 
   2. Invite Audience — `"Your family is ready to meet your LastingMind"` 
   3. Phase 2 + Phase 3 — `"Now let's tell your story"` 
5. **Enter Phase 2 CTA** — single button that closes the loop and moves the user forward

---

## How Flows Combine

| Condition | Flows shown |
|-----------|-------------|
| First module ever (Module 1) | A |
| Any subsequent Module 1 | B |
| Module 2 complete, stars = 2–5 | C |
| Module 2 complete, stars = 1 (first star) | C → D (first star variant) |
| Module 2 complete, stars = 6 (final star) | C → D (Phase 1 complete variant) |

---

## Reusable Screens

| Screen | Used In |
|--------|---------|
| Saving Indicator | All flows |
| Save Confirmed | All flows |
| Reward Card | All flows |
| Encouragement Screen | A, B |
| Star Teaser / Summary Screen | B |
| Star Earned Animation | C |
| Map Screen | C |
| Tree Growth Animation | D |
| Progress / Summary Screen | D |

---

## Copy

Copy is stage-specific across all flows. See `reward_system_copy.md` for specific copy examples per flow and stage. Key principle: always use legacy language, never task language. Never say "you completed a module" — say "your family now knows…"
