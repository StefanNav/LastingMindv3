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

### Categories & Modules

| Category | Module 1 | Module 2 | Star Awarded |
|---|---|---|---|
| Family | Who's in Your Family | Tell a Story About Someone | After Module 2 |
| Friends | Your Circle | A Friend Story | After Module 2 |
| Favorites | Slot Machine | Expand on Your Favorites _(questions TBD)_ | After Module 2 |
| Career | Career Journey | A Career Story | After Module 2 |
| Education | Where You Learned | A School Memory | After Module 2 |
| Core Values | Random Card | Expand on Your Values _(questions TBD)_ | After Module 2 |

### What Unlocks at Phase 1 Completion

- Phase 2: Tell Your Story
- Phase 3: Leave Your Legacy
- Voice Clone setup
- Invite first audience member
- Tree grows: Sapling → Young Tree (major animation — see demo_mode.md)

---

## 3. Phase 2: Tell Your Story

Unlocked when all 6 Foundation stars are earned. No internal locking — all Phase 2 categories are accessible once Phase 2 opens.

| Category | Modules | Success Artifact |
|---|---|---|
| Life Chapters | 1. Define Your Chapters → 2. Spark → Thread → Story per chapter | Generated biography paragraph per chapter |
| Wisdom & Advice | 1. Quick Wisdom Round → 2. Lessons Learned → 3. Keys to Life | Wisdom profile + shareable wisdom cards |
| Greatest Memories | 1. Define Your Moments → 2. Tell Each Story | Highlight reel |

### Phase 2 Milestone Unlocks (all 3 categories complete)

- Generated full biography
- Shareable wisdom cards
- Chat with Self (guided tutorial)
- Tree grows: Young Tree → Mature Tree

---

## 4. Phase 3: Leave Your Legacy

Unlocks alongside Phase 2. Can be worked on in parallel with Phase 2.

| Category | Modules | Success Artifact |
|---|---|---|
| Letters to Loved Ones | 1. Define recipients → 2. Write/record letters | Letter preview |
| Voice Messages | 1. Record messages | Playback preview |
| Life's Big Moments | 1. Define moments → 2. Write entries | Entry preview |
| How I Hope to Be Remembered | 1. AI-guided conversation → 2. Edit & refine | Formatted memoir |

### Phase 3 Milestone Unlocks (all 4 categories complete)

- Letters queued for delivery
- Full audience invite
- Generated tribute
- Tree reaches full maturity (flowers, fruit, seasonal elements)

---

## 5. Phase 4: Keep Growing

Always visible. Becomes the primary engagement mode after Phase 3 completes. Open-ended — no modules, no stars, no completion state. Driven by Open Journal, AI-suggested prompts, and audience questions.

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

Every completed module ends in one of three flows depending on star outcome. All flows share the same save prefix.

### Shared Prefix (all flows)
1. **Saving Indicator** — "Saving your story…" Never skippable.
2. **Save Confirmed** — "Saved. Your LastingMind is growing." Always appears before any celebration.

---

### Flow 1 — Module Complete, No Star
_Trigger: Module 1 of any category completed_

- Deliverable preview (partial artifact)
- Progress indicator: "1 of 2 modules complete"
- Faint empty star with label: "Complete [Category] Module 2 to earn your star"
- CTA: "Begin Module 2" (primary) / "Choose another category" (secondary)

---

### Flow 2 — Module Complete, Star Earned (Not Final)
_Trigger: Module 2 complete, total stars < 6_

- Full deliverable shown
- Animated star awarded for this category
- Running tally: "X of 6 stars earned"
- Tree pulses/glows briefly — reacts but does **not** grow yet
- All 6 star slots shown with ghost tree alongside: "Earn all 6 stars to unlock your tree's next stage"
- Next suggested category highlighted
- CTA: "Continue to [next category]" (primary) / "Return home" (secondary)

---

### Flow 3 — Final Star, Phase 1 Complete
_Trigger: 6th and final Foundation star earned_

- Full deliverable shown
- All 6 stars animate together — brief pause beat
- **Full-screen tree growth animation**: Sapling → Young Tree. No UI chrome.
- Phase 1 celebration screen — family-impact framing, stats
- Unlocks revealed one at a time: Voice Clone → Invite Audience → Phase 2 + Phase 3
- CTA: Enter Phase 2


_Last updated: March 2026. Companion file: `demo_mode.md`. Reference docs: LM2 UX Product Vision, LM2 Design Plan, LM2 Research & Design Implications._
