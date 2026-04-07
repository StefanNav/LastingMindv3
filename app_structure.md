# LastingMind 2.0 — App Structure
_Developer reference for Windsurf. Use this to understand app progression logic, phase locking rules, data collection methods, and module structure._

---

## 1. App Progression Overview

LastingMind has four phases. The user's home screen reflects the current phase and their progress within it. The tree visualization grows as progress is made.

```
Phase 1: Foundation        ← always unlocked, starting state
Phase 2: Tell Your Story   ← locked until all 6 Foundation stars earned
Phase 3: Leave Your Legacy ← unlocks alongside Phase 2 (same trigger)
Phase 4: Keep Growing      ← always visible; open-ended ongoing mode
```

### Phase Locking Rules

| Phase | Lock Condition | Unlock Trigger |
|---|---|---|
| Phase 1: Foundation | Never locked | Available immediately |
| Phase 2: Tell Your Story | Locked at start | 1 star earned in every Phase 1 category (all 6) |
| Phase 3: Leave Your Legacy | Locked at start | Same trigger as Phase 2 |
| Phase 4: Keep Growing | Never locked | Always visible |

> **Phase 2 + Phase 3 unlock together** when the user has earned exactly 1 star in each of the 6 Foundation categories. A user with 5 complete categories and 1 incomplete cannot access Phase 2 or 3 yet.

> **Phase 3 does not require Phase 2 to be completed.** Once unlocked, Phase 2 and Phase 3 can be worked on in parallel.

---

## 2. Phase 1: Foundation

### Star Rules

- Each category has **2 modules**.
- Completing Module 1 → no star awarded. Module 2 unlocks.
- Completing Module 2 → **1 star awarded** for that category.
- All 6 stars must be earned to unlock Phase 2 and Phase 3.
- Modules within a category must be completed in order (Module 1 before Module 2).
- Categories can be completed in any order.

### Suggested Completion Order

The app suggests the following default order. Users can deviate, but the app's next-step suggestions always follow this sequence, skipping any already-completed categories:

1. Family
2. Friends
3. Career
4. Education
5. Favorites
6. Core Values

> If a user completes a category out of sequence, the next-step suggestion logic identifies the first incomplete category in the default order above and surfaces that.

### Categories & Modules

| Category | Module 1 | Module 2 | Star Awarded |
|---|---|---|---|
| Family | Who's in Your Family | Tell a Story About Someone | After Module 2 |
| Friends | Your Circle | A Friend Story | After Module 2 |
| Career | Career Journey | A Career Story | After Module 2 |
| Education | Where You Learned | A School Memory | After Module 2 |
| Favorites | Slot Machine | Expand on Your Favorites | After Module 2 |
| Core Values | Random Card | Expand on Your Values | After Module 2 |

### The Reward Card

Every time a user completes an input method — a guided conversation, a story, a slot machine session — they receive a **reward card**. The card is a visual artifact representing that specific interaction.

- Each input completion = one card. A module requiring two stories produces two separate cards.
- Cards are specific to what was shared (e.g. the Family module card shows the listed family members; a story card reflects the subject of the story told).
- The reward card appears in every success flow immediately after the save confirmation screens.

### Tree Growth in Phase 1

Tree growth happens at two points during Phase 1 — not one:

| Trigger | Tree Behaviour |
|---|---|
| Module 1 complete | No tree reaction |
| Stars 2–5 earned | Tree pulses or glows briefly — reacts but does not grow |
| **First star earned (star 1)** | **Tree grows — a contained, meaningful growth moment** |
| **Final star earned (star 6)** | **Tree grows dramatically — the full Phase 1 growth (Sapling → Young Tree)** |

> The first star triggers a visible but contained tree growth. The final star triggers the full dramatic Sapling → Young Tree animation. These are distinct moments with distinct animation scales.

### What Unlocks at Phase 1 Completion

- Phase 2: Tell Your Story
- Phase 3: Leave Your Legacy
- Voice Clone setup
- Invite first audience member
- Tree grows: Sapling → Young Tree (full-screen animation — see reward_system_flows.md)

---

## 3. Phase 2: Tell Your Story

Unlocked when all 6 Foundation stars are earned. No internal locking — all Phase 2 categories are accessible once Phase 2 opens.

| Category | Modules | Success Artifact |
|---|---|---|
| Life Chapters | 1. Define Your Chapters → 2. Spark → Thread → Story per chapter | Generated biography paragraph per chapter |
| Greatest Memories | 1. Define Your Moments → 2. Tell Each Story | Highlight reel |

### Phase 2 Milestone Unlocks (all 2 categories complete)

- Generated full biography
- Shareable wisdom cards
- Chat with Self (guided tutorial)
- Tree grows: Young Tree → Mature Tree

---

## 4. Phase 3: Leave Your Legacy

Unlocks alongside Phase 2. Can be worked on in parallel with Phase 2.

### Default Cards (always present once Phase 3 is unlocked)

| Card | Type | Behaviour |
|---|---|---|
| Wisdom & Advice | Standard category card (same design as Phase 1–2 cards) | Taps into the Wisdom & Advice module flow (Quick Wisdom Round → Lessons Learned → Keys to Life) |
| Leave Something Behind | Add-action card (horizontal layout, + icon) | Opens a bottom sheet listing 7 addable legacy items |

### Addable Legacy Items (via Leave Something Behind bottom sheet)

| Item | Description |
|---|---|
| Letters to Loved Ones | Write a personal letter to someone who matters to you |
| Voice Messages | Record a message in your own words and voice |
| Video Messages | Capture yourself on camera for someone to watch one day |
| Milestone Messages | Leave a message to be opened at a specific life moment |
| Ethical Will | Share your values, hopes, and life lessons |
| Stories to Remember Me By | Tell the stories you want your family to always have |
| Build My Obituary | Write the story of your life in your own words |

When a user adds an item, it appears as a horizontal activity card in the Phase 3 section below the Leave Something Behind card. Each added item shows a status label: Not started / In progress / Complete.

### Phase 3 Milestone Unlocks

- Letters queued for delivery
- Full audience invite
- Generated tribute
- Tree reaches full maturity (flowers, fruit, seasonal elements)

---

## 5. Phase 4: Keep Growing

Always visible and always accessible — no lock condition, no completion state, no stars. Becomes the primary engagement mode after earlier phases are complete.

| # | Category | Subtitle |
|---|----------|----------|
| 1 | Open Journalling | Write or record whatever's on your mind |
| 2 | Open Reflection | Look back on a moment, a period, or a feeling |
| 3 | Capture a Conversation | Record a real conversation with someone you love |
| 4 | Fill in the Gaps | Answer questions your LastingMind doesn't know yet |
| 5 | Question of the Day | A fresh prompt every day to keep your story growing |
| 6 | Questions from Loved Ones | Answer what your family actually wants to know |

Phase 4 uses horizontal activity cards (image/icon left, title + subtitle right) distinct from the Phase 1–3 square grid cards. Cards stack vertically as a full-width list. If the user has previously used a category, a "Last entry X days ago" label appears.

---

## 6. Data Collection Methods

Every module uses one of the following four methods.

| # | Method | Used By |
|---|---|---|
| 1 | **Guided Conversation** | Foundation Module 1s: Family, Friends, Career, Education. Phase 2: Life Chapters (Spark → Story), Keys to Life. |
| 2 | **Reflection Question** | All Foundation Module 2s (the story/expand module for each of the 6 categories). |
| 3 | **Random Card** | Core Values Module 1, Phase 2: Quick Wisdom Round. |
| 4 | **Slot Machine** | Favorites Module 1, Phase 2: Lessons Learned. |

---

## 7. Success Screen Flows

Every completed module ends in one of four flows. Flows C and D are decoupled — C handles the star earned moment (reusable across any category or phase), and D is appended only when tree growth is triggered. Full screen-by-screen definitions are in `reward_system_flows.md`.

### Shared Prefix (all flows)
1. **Saving Indicator** — `"Saving your story…"` Never skippable.
2. **Save Confirmed** — `"Saved. Your LastingMind is growing."` Always before any celebration.

---

### Flow A — First Module Ever, No Star
_Trigger: The very first module the user has ever completed. Shown exactly once._

- Reward Card
- Encouragement Screen (orienting copy)
- Summary Screen (module completed + next module suggested)

---

### Flow B — Module 1 Complete, No Star, Star Teaser
_Trigger: Any Module 1 completion after the very first one._

- Reward Card
- Encouragement Screen (stage-specific copy)
- Star Teaser / Summary Screen (star warming up, Module 2 surfaced as next step)

---

### Flow C — Star Earned
_Trigger: Any Module 2 completion that awards a star, any category, any phase._

- Reward Card
- Star Earned Animation (multi-screen, star glows and fills with colour)
- Map Screen (all 6 Foundation category slots, current star status, stage-specific copy)

> Flow C is reusable for any star in any category or phase. Tree growth is not part of this flow — that is Flow D.

---

### Flow D — Tree Growth
_Trigger: Appended after Flow C for first star (stars = 1) and final Foundation star (stars = 6) only. Does not trigger for stars 2–5._

**First star variant:**
- Tree Growth Animation (TreeStage1 → TreeStage2)
- Progress / Summary Screen (tree shown, completed modules, suggested next module)

**Final star / Phase 1 complete variant:**
- Final Star Animation (all 6 stars together, pause beat)
- Full-Screen Tree Growth Animation (TreeStage2 → TreeStage3)
- Phase 1 Celebration Screen (family-impact framing, stats)
- Unlocks Revealed sequentially: Voice Clone → Invite Audience → Phase 2 + Phase 3
- Enter Phase 2 CTA

### Tree Stage Image Assets

| Asset Label | Stage | When Shown |
|-------------|-------|------------|
| `TreeStage1` | Seed / Sprout | New user, no stars earned |
| `TreeStage2` | Sapling | After first star earned |
| `TreeStage3` | Young Tree | After Phase 1 complete (6th star) |
| `TreeStage4` | Mature Tree | After Phase 2 complete |
| `TreeStage5`+ | Further stages | Subsequent phase completions |

---

_Companion files: `reward_system_flows.md` (full flow definitions), `reward_system_copy.md` (copy for each flow and stage)._