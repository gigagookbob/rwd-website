# rwd Landing Page Design System

## 1. Visual Theme & Atmosphere

rwd uses a terminal-native dark interface designed for developer tooling. The visual style is minimal and content-first: deep zinc backgrounds, subtle 1px separators, and compact monochrome typography with small semantic accents.

The site should feel quiet and trustworthy rather than decorative. Interface depth comes from layered surfaces (`--bg-primary` and `--bg-secondary`) and border contrast (`--border`), not from heavy shadows or gradients.

Key characteristics:
- Single dark theme only (no light mode)
- Sticky translucent nav (`rgba(9, 9, 11, 0.85)`) with blur
- High contrast title text on near-black canvas
- Monospace usage for code/command context only
- Green accent reserved for success and positive states
- Soft entrance animation with `.fade-in` and IntersectionObserver

## 2. Color Palette & Roles

### Core Tokens
- **Background Primary** (`#09090b`): page background, sidebar surfaces
- **Background Secondary** (`#18181b`): cards, terminal, mockup containers
- **Border** (`#27272a`): separators, card outlines, controls
- **Text Primary** (`#fafafa`): headings, strong labels, active items
- **Text Secondary** (`#a1a1aa`): default body copy
- **Text Muted** (`#71717a`): captions, helper text, labels
- **Text Dim** (`#52525b`): inactive states, secondary chrome text

### Semantic Accent Tokens
- **Accent Green** (`#22c55e`): success states, copied state, active/positive indicators
- **Accent Red** (`#ef4444`): terminal dot (close)
- **Accent Yellow** (`#eab308`): terminal dot (minimize)
- **CTA Background** (`#fafafa`): primary button background
- **CTA Text** (`#09090b`): primary button text

### Role Guidelines
- Keep all layout/chrome colors on the zinc scale.
- Use green as the only broad semantic accent in content states.
- Use red/yellow only for macOS-style window dots.
- Avoid adding decorative neon/gradient palettes.

## 3. Typography Rules

### Font Family
- **Sans (default)**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Mono**: `'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace`

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Color |
|---|---:|---:|---:|---:|---|
| Hero Title (`.hero-title`) | 72px | 700 | 1.1 | -3px | `--text-primary` |
| Hero Title Mobile | 42px | 700 | 1.1 | -2px | `--text-primary` |
| Footer CTA Title (`.footer-cta-title`) | 28px | 600 | default | -0.5px | `--text-primary` |
| Showcase Title (`.showcase-title`) | 28px | 700 | 1.2 | -0.5px | `--text-primary` |
| Section Title (`.section-title`) | 24px | 600 | default | -0.5px | `--text-primary` |
| Nav Logo (`.nav-logo`) | 22px | 700 | default | -0.5px | `--text-primary` |
| Body Large (`.hero-subtitle`) | 16px | 400 | 1.6 | normal | `--text-muted` |
| Body (`body`, `.showcase-desc`) | 15-16px | 400 | 1.6 | normal | `--text-secondary` |
| UI Text (`.btn`, `.faq-question`) | 14-15px | 600/400 | ~1.4-1.6 | normal | token-based |
| Small Labels (`.comparison-label`, `.install-platform`) | 12px | 400 | default | 1px uppercase (where used) | `--text-muted` |
| Mono Command (`.install-cmd`, `.mockup-body`) | 12-13px | 400 | 1.6-1.8 | normal | `--text-secondary` |

### Principles
- Preserve tight tracking on key titles (`-3px`, `-2px`, `-0.5px`).
- Use sans for product copy; mono only for commands/terminal/note previews.
- Keep weight distribution simple (400/600/700).

## 4. Component Stylings

### Navigation
- Sticky top navigation with blur backdrop and bottom border.
- `max-width: 960px` container with `10px 24px` inner spacing.
- Right side contains docs link and GitHub button; button uses bordered ghost style.

### Buttons
- Base `.btn`: inline-flex, 10px x 24px, 8px radius, 14px/600.
- **Primary**: light background (`--cta-bg`) with dark text (`--cta-text`).
- **Secondary**: transparent with 1px border; hover fills `--bg-secondary`.

### Terminal & Mockup Window Pattern
- Shared shape language:
  - Background `--bg-secondary`
  - Border `1px solid --border`
  - Radius 10-12px
  - Header with three colored dots and dim title text
- Terminal screenshot uses `assets/terminal-output.png` as canonical demo frame.

### Comparison Cards
- 2-column grid desktop, single-column mobile.
- Card style: 24px padding, 10px radius, bordered dark surface.
- `comparison-rwd` has slightly brighter border emphasis.

### Install Blocks
- Vertical stack of command rows.
- Each row has platform label + mono command + icon-only copy button.
- Copy states:
  - Default: dim border/text
  - Hover: brighter border/text
  - Copied: green border/text (`.copy-btn.copied`)

### FAQ
- Top/bottom border list with accordion interaction.
- Clicking one item opens it and closes others.
- Open state rotates plus icon by 45 degrees.

### Showcase Sections
- Desktop: 45/55 text/mockup split (`.showcase-inner`).
- Alternating layout uses `.showcase-inner--reversed` with `direction: rtl` technique.
- Includes terminal-like, note-like, code-like, and Obsidian-like mockup variants.

### Footer
- Top CTA strip with border-top and centered call-to-action.
- Final footer uses compact muted metadata with subtle hover brightening.

## 5. Layout Principles

### Containers & Width
- Global content container max width: `960px`.
- Horizontal page padding baseline: `24px`.

### Section Rhythm
- Default section padding: `80px 24px`.
- Hero: `80px 24px 40px`.
- Terminal section: `0 24px 80px`.
- Major sections separated with 1px divider line using `--border`.

### Grid Usage
- Comparison: `grid-template-columns: 1fr 1fr`.
- Showcase: `grid-template-columns: 45fr 55fr`.
- Obsidian mockup split: sidebar 35% / preview 65%.

### Spacing Behavior
- Frequent spacing values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 80.
- Keep spacing conservative and consistent; avoid introducing unrelated spacing scales.

## 6. Depth & Elevation

Depth model is intentionally flat and controlled.

| Level | Treatment | Use |
|---|---|---|
| L0 | `--bg-primary` | Base page background |
| L1 | `--bg-secondary` + 1px border | Cards, terminal, mockups, install blocks |
| L2 | Sticky translucent layer + blur | Top navigation only |

Rules:
- No drop shadows in default component system.
- Use border contrast and surface layering for separation.
- Keep radii in a narrow set: 4px, 6px, 8px, 10px, 12px.

## 7. Do's and Don'ts

### Do
- Keep the zinc dark theme and existing token names.
- Preserve terminal-inspired chrome (dot header + bordered surfaces).
- Use `--accent-green` for successful/positive state feedback.
- Reuse existing component classes before adding new abstractions.
- Maintain concise copy density and readable line-height around 1.6.

### Don't
- Do not add light mode, gradients, or colorful backgrounds without explicit product direction.
- Do not replace the system font stack with decorative web fonts.
- Do not use strong shadows/glows as primary separation.
- Do not use red/yellow accents outside terminal dot metaphors.
- Do not add dense animation beyond existing fade-in/reveal patterns.

## 8. Responsive Behavior

Primary breakpoint: `max-width: 640px`

Behavior at mobile:
- Hide GitHub button text label in nav (`.nav-github-btn span`).
- Hero title scales to 42px and CTA stack becomes vertical.
- Comparison grid collapses to one column.
- Showcase grid collapses to one column; mockup appears above text.
- Reversed showcase resets to normal reading order.
- Obsidian mockup switches sidebar/preview split to vertical.
- Footer CTA title scales down to 22px.
- Mockup content allows horizontal scroll where needed.

Touch and readability:
- Keep interactive controls at current comfortable sizes (buttons and FAQ rows).
- Preserve mono command legibility in install blocks and mockups.

## 9. Agent Prompt Guide

### Quick Style Reference
- Page background: `#09090b`
- Surface background: `#18181b`
- Border: `#27272a`
- Primary text: `#fafafa`
- Body text: `#a1a1aa`
- Muted text: `#71717a`
- Success accent: `#22c55e`
- Primary CTA: background `#fafafa`, text `#09090b`

### Prompt Snippets
- "Build a dark developer landing section for rwd using zinc tones only. Use background #09090b, bordered surface cards on #18181b, and 1px #27272a separators."
- "Create a hero with 72px bold heading, letter-spacing -3px, centered layout, muted 16px subtitle, and two CTAs (solid light primary + outlined secondary)."
- "Design a terminal-style mockup window with a 12px radius, 1px border, macOS red/yellow/green dots, and monospace 13px body text."
- "Add an install command row: platform label (12px muted), monospace command, and icon-only copy button with green copied state."
- "Implement FAQ accordion behavior: single-open-item pattern, smooth max-height transition, and icon rotation on open."

### Iteration Checklist
1. Check whether new style values already exist in `css/00-tokens.css`.
2. Prefer updating existing component classes in `css/03-components.css` and `css/04-showcase.css`.
3. Keep mobile behavior aligned with `css/06-responsive.css` at 640px breakpoint.
4. If visual rules change materially, update this `DESIGN.md` in the same change.
