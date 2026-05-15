# UI_Design.md — DesignToCode Platform

> **Source of truth**: This document reflects the visual design shown in `UI_Prototype.png`. All colors, layout dimensions, typography, and component states are derived directly from that image.

---

## 1. Aesthetic Direction

**Tone**: Clean, light, professional SaaS tool. Bright white panels with very soft grey backgrounds. The feel is calm and focused — nothing competes with the user's uploaded design in the center.

**Theme**: **Light mode** (white/light grey base). Dark mode is a future enhancement only; do not implement it as default.

**Accent Color**: Purple — `#7c3aed` (violet-600 range). Used for: active tab underlines, "click to browse" links, the Get Code CTA button, the "React" active tab, checkmarks in the tips list, and the status indicator icon.

**Palette**:
```css
--bg-base: #f3f4f6;           /* overall page background — cool light grey */
--bg-panel: #ffffff;           /* left panel, right panel, nav */
--bg-surface: #f9fafb;         /* upload zone interior, camera card */
--bg-canvas: #ffffff;          /* preview canvas card */
--border-subtle: #e5e7eb;      /* panel borders, card borders, dividers */
--border-dashed: #d1d5db;      /* upload zone dashed border */
--accent-primary: #7c3aed;     /* purple — CTA, active tab, links, checkmarks */
--accent-light: #ede9fe;       /* light purple tint — upload zone hover bg */
--text-primary: #111827;       /* headings, panel titles */
--text-secondary: #6b7280;     /* body text, subtitles, tips */
--text-muted: #9ca3af;         /* format hints, placeholder text */
--success: #22c55e;            /* "Ready to generate" green dot + text */
--nav-link: #374151;           /* History, Projects, Pricing links */
--code-bg: #1e1e2e;            /* dark code editor area */
--code-text: #cdd6f4;          /* default code text colour */
```

**Typography**:
- Logo & App name: `"Inter"` or system sans, weight 700, text-gray-900. The `</>` icon before "DesignToCode" is in `--accent-primary` purple.
- Panel headings ("1. Upload your design", "2. Preview", "3. Your Code"): Inter, 15px, weight 600, `--text-primary`
- Panel subtitles: Inter, 13px, `--text-secondary`
- Nav links: Inter, 14px, weight 500, `--nav-link`
- Body / tip text: Inter, 13px, `--text-secondary`
- Code output: `"JetBrains Mono"` or `"Fira Code"`, 13px

**Motion Philosophy**: Subtle and fast. 150ms ease transitions on hover states, tab switches, and button interactions. No dramatic animations — this is a professional tool, not a marketing site.

---

## 2. Layout Structure

Three-column desktop layout. The page does **not** scroll — all scrolling is panel-internal. The three panels sit below a fixed top navigation bar.

```
┌─────────────────────────────────────────────────────────────────┐
│  TOP NAV: [</> DesignToCode]    History · Projects · Pricing    │
│                                              [☀] [DS ▾]         │
├───────────────────┬─────────────────────────┬───────────────────┤
│                   │                         │                   │
│   LEFT PANEL      │   CENTER PANEL          │   RIGHT PANEL     │
│   ~280px          │   flex: 1               │   ~370px          │
│                   │                         │                   │
│  1. Upload your   │  2. Preview             │  3. Your Code     │
│     design        │                         │                   │
│                   │  [Zoom controls]  100%  │  [HTML][React*]   │
│  [Upload Zone]    │                         │  [Tailwind]       │
│                   │  ┌─────────────────┐    │                   │
│  ─── OR ───       │  │                 │    │  [Code viewer]    │
│                   │  │  Canvas /       │    │                   │
│  [Take a photo]   │  │  Preview img    │    │  [Copy][↓][↺]     │
│                   │  │                 │    │                   │
│  💡 Tips          │  └─────────────────┘    │                   │
│   • tip 1         │                         │                   │
│   • tip 2         │                         │                   │
│   • tip 3         │                         │                   │
│                   │                         │                   │
├───────────────────┴─────────────────────────┴───────────────────┤
│  ✅ Ready to generate code    [✦✦ Get Code]                      │
│  We'll analyze your design and generate clean code.             │
└─────────────────────────────────────────────────────────────────┘
```

**Panel widths (approximate from prototype)**:
- Left panel: ~280px fixed
- Center panel: `flex: 1` (fills remaining horizontal space)
- Right panel: ~370px fixed

**Panel separation**: Panels are separated by a 1px border `--border-subtle`. The overall page background `--bg-base` (light grey `#f3f4f6`) is visible in narrow gaps around the panels, giving a subtle framing effect. Each panel has `background: --bg-panel` (white).

**Overall wrapper**: 100vh height. Top nav is fixed 56px. The three panels fill the remaining viewport height. Bottom action bar is fixed at the very bottom spanning the left and center panels. The right panel has its own independent bottom action section.

---

## 3. Top Navigation Bar

**Height**: 56px  
**Background**: `--bg-panel` (white)  
**Border**: 1px bottom border `--border-subtle`  
**Position**: fixed top, full width, `z-index: 50`  
**Padding**: 0 24px  
**Layout**: flex, space-between, align-center

### Components

| Element | Detail |
|---|---|
| **Logo** | `</>` icon in purple `--accent-primary`, followed by "DesignToCode" in Inter weight 700, `--text-primary`. No space in the brand name — it's one word. |
| **Nav links** | "History", "Projects", "Pricing" — 14px, weight 500, `--nav-link` (`#374151`). Spaced ~32px apart. Right-aligned group. Hover: underline or color darken. |
| **Theme toggle** | Sun icon (☀) button. 36px, rounded, light grey background on hover. Sits to the right of nav links. |
| **User avatar** | Circle avatar with initials "DS" on a purple `--accent-primary` background. 34px diameter. Followed by a dropdown chevron `▾`. Clicking shows account dropdown. |

---

## 4. Left Panel — Input & Upload Area

**Width**: ~280px fixed  
**Background**: `--bg-panel` (white)  
**Border-right**: 1px `--border-subtle`  
**Padding**: 24px  
**Internal scroll**: overflow-y auto  
**Panel number label**: "1. Upload your design" — 15px, weight 600, `--text-primary`  
**Panel subtitle**: "Upload a file or take a photo of your design." — 13px, `--text-secondary`

### 4.1 Upload Zone

**Position**: Below panel heading, ~16px gap  
**Visual design**:
- Rounded rectangle, `border-radius: 10px`
- Border: 2px dashed `--border-dashed` (`#d1d5db`)
- Background: `--bg-surface` (`#f9fafb`) — very slightly off-white
- Height: ~190px
- On hover or drag-over: border color → `--accent-primary` purple, background → `--accent-light` (`#ede9fe`)

**Content (vertically + horizontally centered)**:
```
      [☁ Upload cloud icon — 28px, purple outline style]

   Drag & drop your file here
    or click to browse

  Supports: PNG, JPG, JPEG, PDF, WebP
```
- Upload cloud icon: outlined style, `--accent-primary` purple
- "Drag & drop your file here": 14px, weight 500, `--text-primary`
- "or click to browse": 13px, `--accent-primary` purple, underline on hover, cursor pointer — this is a `<label>` wrapping a hidden `<input type="file">`
- "Supports: PNG, JPG, JPEG, PDF, WebP": 12px, `--text-muted`, below the link with ~8px gap

**On file selected**: Zone stays or collapses into a compact file card showing filename + ✕ remove button.

### 4.2 OR Divider

Between upload zone and camera button:
```
  ─────── OR ───────
```
- 1px horizontal rules on each side of "OR"
- "OR": 12px, `--text-muted`, centered
- Margin: 16px top and bottom

### 4.3 Camera / Take a Photo Card

A card-style button (not a plain button — it's a full contained card):

**Visual design**:
- Background: `--bg-surface`
- Border: 1px solid `--border-subtle`
- Border-radius: 10px
- Padding: 16px
- Hover: border-color → `--accent-primary`, background → `--accent-light`

**Content**:
```
  [📷 camera icon]  Take a photo
                    Upload a photo of your
                    handwritten sketch or draft
```
- Camera icon: left-aligned, 20px, `--text-secondary`
- "Take a photo": 14px, weight 600, `--text-primary`
- Subtitle: 12px, `--text-secondary`, below title, wraps to 2 lines

### 4.4 Tips Panel

**Position**: Below camera card, 24px gap  
**No card border** — renders as open text with a section icon

**Visual design**:
```
  💡 Tips
  ─────────────────────────────
  ✓  For best results, upload high
     quality images

  ✓  Handwritten sketches work best
     with clear shapes and text

  ✓  We support landing pages, UI
     screens, and website layouts
```
- "💡 Tips" header: lightbulb icon in `--accent-primary`, "Tips" text in 13px weight 600 `--text-primary`
- Each item: checkmark ✓ in `--accent-primary` purple, body text 13px `--text-secondary`
- No card border or background — floats directly on the white panel
- Checkmarks are solid purple fill, not outlined

---

## 5. Center Panel — Preview Workspace

**Width**: `flex: 1`  
**Background**: `--bg-base` (`#f3f4f6`) — the light grey base shows as the canvas surround  
**Padding**: 20px 24px  
**Position**: relative

### 5.1 Panel Header

Top of panel, above the canvas:
```
  2. Preview
  Review your uploaded design. You can zoom and adjust the view.
```
- "2. Preview": 15px, weight 600, `--text-primary`
- Subtitle: 13px, `--text-secondary`
- These sit top-left; zoom controls are in the same row, top-right

### 5.2 Zoom Controls

**Position**: Top-right of center panel, same row as the "2. Preview" heading  
**Style**: Individual bordered buttons with a percentage display in the middle

```
  [ − ]  [ 100% ]  [ + ]   [ ↺ ]  [ ⤢ ]
```
- Each control: ~32px × 32px, white background (`--bg-panel`), 1px border `--border-subtle`, border-radius 6px
- "100%" text display: same visual styling as the buttons — non-interactive label, or click to reset
- Icons: minus, plus, circular reset arrow, fullscreen/expand
- Hover: background → `--bg-surface`

### 5.3 Canvas Area

Fills the remaining height of the center panel below the header row:
- Background: `--bg-canvas` (white)
- Border-radius: 10px
- Box-shadow: `0 2px 16px rgba(0,0,0,0.08)` — soft light shadow
- The interior shows the uploaded image or generated preview at the user's zoom level
- In the prototype, the canvas shows a rendered landing page (post-generation state)
- Canvas is scrollable internally if content is taller than the panel

### 5.4 Post-Generation State

The same canvas — transitions from showing the raw uploaded image to the fully rendered output (a live preview of the generated landing page). No separate toggle needed in MVP; the canvas content simply updates.

### 5.5 Loading State

- Canvas content dims to 40% opacity
- Centered loading spinner (`--accent-primary` purple) overlaid on canvas
- Status text in bottom bar updates in real time

---

## 6. Right Panel — Code Output

**Width**: ~370px fixed  
**Background**: `--bg-panel` (white)  
**Border-left**: 1px `--border-subtle`  
**Display**: flex column  
**Overflow**: hidden (code area scrolls internally)

### 6.1 Panel Header

```
  3. Your Code
  Copy, edit or download your code.
```
- "3. Your Code": 15px, weight 600, `--text-primary`
- Subtitle: 13px, `--text-secondary`
- Padding: 16px 20px 0 20px

### 6.2 Tab System

**Position**: Below panel header, ~12px gap  
**Height**: 40px  
**Background**: transparent (sits on white panel)  
**Border-bottom**: 1px `--border-subtle`

```
  [ HTML ]  [ React ]  [ Tailwind CSS ]
```
- Tab text: Inter, 14px, weight 500
- Inactive tab: `--text-secondary`, no underline
- **Active tab** ("React" in prototype): `--accent-primary` purple text, 2px solid bottom border in `--accent-primary`
- Tabs are left-aligned with 20px left padding, 16px gap between tabs
- Hover: text → `--text-primary`

### 6.3 Top-Right Code Icon Actions

Positioned in the same row as the tabs, right-aligned (or just above the code block):
```
                              [ 📋 ]  [ ↓ ]  [ ⤢ ]
```
- Three icon-only buttons: copy, download, fullscreen/expand
- Each: 32px, transparent background, icon in `--text-secondary`
- Hover: icon → `--text-primary`, light `--bg-surface` background
- Border-radius: 6px

### 6.4 Code Editor View

**Background**: `--code-bg` (`#1e1e2e`) — deep dark purple-black matching the prototype  
**Font**: JetBrains Mono, 13px, line-height 1.65  
**Padding**: 16px  
**Overflow-y**: auto (scrolls internally)  
**Flex**: 1 (takes all remaining height in the right panel)  
**Line numbers**: Left-side, `#45475a`, separated from code by ~12px

Syntax highlighting — Catppuccin Mocha theme (matches prototype exactly):
| Token | Color |
|---|---|
| Keywords (`import`, `export`, `function`, `return`, `default`) | `#cba6f7` (lavender) |
| JSX/HTML tags (`div`, `nav`, `section`, `button`, `a`) | `#89b4fa` (blue) |
| Strings (quoted values) | `#a6e3a1` (green) |
| Attribute names (`className`, `href`) | `#89dceb` (cyan/teal) |
| Comments | `#6c7086` (grey) |
| Punctuation / operators (`=`, `{`, `}`, `<`, `>`) | `#cdd6f4` |
| Default text | `#cdd6f4` (lavender-white) |
| Background | `#1e1e2e` |
| Line number gutter | `#45475a` |

### 6.5 Bottom Code Action Bar

**Position**: Fixed to the bottom of the right panel  
**Height**: 52px  
**Background**: `--bg-panel` (white)  
**Border-top**: 1px `--border-subtle`  
**Padding**: 0 16px  
**Layout**: flex, flex-start, gap 8px, align-center

```
  [ 📋 Copy Code ]   [ ↓ Download ]   [ ↺ Regenerate ]
```
- Each button: outlined style — 1px border `--border-subtle`, white background, border-radius 6px
- Height: 36px, padding: 0 12px
- Text: Inter, 13px, weight 500, `--text-primary`
- Icon: 14px, `--text-secondary`, 6px gap before label
- "Regenerate" button: outlined with `--accent-primary` purple border and purple text to distinguish it
- Hover for all: background → `--bg-surface`
- Copy: on click, icon → ✓ for 1.5s then reverts

---

## 7. Bottom Action Bar

**Spans**: left panel + center panel only (right panel has its own bottom action bar — section 6.5)  
**Height**: ~72px (accommodates two lines of content)  
**Background**: `--bg-panel` (white)  
**Border-top**: 1px `--border-subtle`  
**Padding**: 12px 24px  
**Layout**: flex, space-between, align-center

### 7.1 Left Side — Status Indicator

```
  ✅ Ready to generate code
     We'll analyze your design and generate clean code.
```
- Green circle checkmark icon: `--success` green, 18px
- "Ready to generate code": 13px, weight 500, `--success` green color
- Second line: "We'll analyze your design and generate clean code." — 12px, `--text-muted`

Status states:

| State | Icon | Text color | Primary text |
|---|---|---|---|
| Idle / ready | ✅ green circle checkmark | `--success` | "Ready to generate code" |
| Processing | ⟳ spinning purple | `--accent-primary` | "Analyzing design…" |
| Generating | ⟳ spinning purple | `--accent-primary` | "Generating React components…" |
| Finalizing | ⟳ spinning purple | `--accent-primary` | "Finalizing Tailwind styles…" |
| Done | ✅ green circle | `--success` | "Code generated successfully" |
| Error | ⚠ red | `#ef4444` | "Something went wrong. Try again." |

### 7.2 Right Side — Get Code Button

```
  [ ✦  Get Code ]
```
- Width: ~200px
- Height: 44px
- Background: `--accent-primary` (`#7c3aed`) — solid purple
- Text: "Get Code", Inter 15px weight 600, white
- Left of text: sparkles / magic wand icon (✦), white, 16px
- Border-radius: 8px
- No border
- Hover: brightness 110%, `box-shadow: 0 4px 12px rgba(124,58,237,0.35)`
- Active/click: scale 0.97
- **Disabled** (no upload yet): opacity 0.5, cursor not-allowed
- **Loading**: spinner replaces sparkle icon; text stays "Get Code"

---

## 8. Interaction & Micro-interaction Summary

| Interaction | Behavior |
|---|---|
| File drag over upload zone | Dashed border → solid purple, background tints `--accent-light` |
| File dropped | Upload zone shows file name; center canvas fades in uploaded image |
| Hover "click to browse" | Purple underline, cursor pointer |
| Camera card hover | Border → purple, background → `--accent-light` |
| Tab click (HTML / React / Tailwind) | Active tab: purple text + 2px bottom border slides in 150ms; code fades 150ms |
| Copy Code click | Icon → ✓ for 1.5s then reverts |
| Download click | File download triggers immediately |
| Regenerate click | Re-triggers generation; bottom status resets and progresses |
| Zoom −/+ | Canvas content scales; percentage display updates |
| Get Code click | Button shows spinner; status indicator progresses through states; canvas dims slightly |
| Generation complete | Canvas updates to rendered preview; code viewer populates |

---

## 9. Component Checklist for Implementation

- [ ] `<TopNav />` — `</>` logo + "DesignToCode", nav links, sun toggle, DS avatar with dropdown chevron
- [ ] `<LeftPanel />` — numbered heading + subtitle, upload zone, OR divider, camera card, tips list
- [ ] `<UploadZone />` — dashed border, cloud icon, "Drag & drop" + "click to browse" label, file-selected state
- [ ] `<OrDivider />` — horizontal rule + "OR" label
- [ ] `<CameraCard />` — card with camera icon + title + subtitle description text
- [ ] `<TipsList />` — lightbulb heading, three items each with purple ✓ checkmark
- [ ] `<CenterPanel />` — header row (heading + zoom controls), canvas card below
- [ ] `<ZoomControls />` — `−`, `100%` display, `+`, reset, fullscreen — all individually bordered
- [ ] `<CanvasCard />` — white rounded card with soft shadow; shows upload or generated preview
- [ ] `<RightPanel />` — header, tab bar, icon actions row, code viewer (flex:1), bottom action bar
- [ ] `<CodeTabs />` — HTML / React / Tailwind; active has purple text + underline
- [ ] `<CodeIconActions />` — copy, download, expand icon buttons (top-right of code area)
- [ ] `<CodeViewer />` — `#1e1e2e` bg, JetBrains Mono, Catppuccin Mocha syntax, line numbers, scrollable
- [ ] `<CodeActionBar />` — "Copy Code", "Download", "Regenerate" outlined buttons pinned to right panel bottom
- [ ] `<BottomActionBar />` — spans left + center; status indicator (left) + Get Code CTA (right)
- [ ] `<StatusIndicator />` — icon + primary text + subtitle line; transitions between states

---

## 10. File & Tech Stack Notes

This is a **Next.js** project (App Router). Implementation guidance:

- **Styling**: Tailwind CSS. Extend `tailwind.config.ts` with custom color tokens from section 1.
- **Fonts**: `next/font/google` — load `Inter` (weights 400, 500, 600, 700) and `JetBrains Mono` (400, 500). These match the prototype.
- **Icons**: `lucide-react` — key icons: `CloudUpload`, `Camera`, `Lightbulb`, `Check`, `Minus`, `Plus`, `RotateCcw`, `Maximize2`, `Copy`, `Download`, `Sparkles`, `ChevronDown`, `Code2`
- **Layout**: CSS Grid — `grid-cols-[280px_1fr_370px]`, `h-screen`, panels below a 56px fixed nav. Bottom action bar uses `position: sticky; bottom: 0` within the left+center column wrapper.
- **Code highlighting**: `shiki` with the `catppuccin-mocha` built-in theme to match prototype colours exactly.
- **Drag and drop**: `react-dropzone`
- **Panel overflow**: `overflow-hidden` on panels, `overflow-y-auto` on scrollable inner content (left panel, code viewer)

---

## 11. Key Differences from Initial Spec (Corrections After Viewing Prototype)

| Property | Initial Spec | Corrected to Match Prototype |
|---|---|---|
| **Color theme** | Dark mode (charcoal/black base) | **Light mode** (white panels, `#f3f4f6` page bg) |
| **Accent color** | Electric blue `#3b82f6` | **Purple `#7c3aed`** |
| **Page background** | `#0d0f12` | **`#f3f4f6`** (light cool grey) |
| **Panel background** | `#13161b` | **`#ffffff`** (white) |
| **Fonts** | Syne + DM Sans | **Inter** for all UI; JetBrains Mono for code only |
| **Logo icon** | Two overlapping squares | **`</>` angle bracket** in purple |
| **Left panel width** | 320px | **~280px** |
| **Right panel width** | 380px | **~370px** |
| **Code editor theme** | Custom dark | **Catppuccin Mocha** (`#1e1e2e` bg, specific token colours) |
| **Camera input style** | Plain outlined button | **Card with icon + 2-line description** |
| **Tips section** | Bordered card with `ℹ` icon | **Borderless list**, lightbulb icon heading, purple ✓ checkmarks |
| **Bottom bar scope** | Spans all 3 columns | **Spans left + center only**; right panel has its own independent bottom bar |
| **Get Code button width** | 160px | **~200px**, with sparkle icon prefix |
| **Zoom controls style** | Single pill-shaped cluster | **Individual separate buttons** each with own border; `100%` as a display between − and + |
| **Panel headings** | No step numbers | **Numbered: "1.", "2.", "3."** with subtitles beneath each |

---

## 12. Future UI Enhancements (Do Not Implement Now)

- Dark mode theme (toggle exists in nav but light mode is the only MVP theme)
- Side-by-side diff view (original sketch vs. generated output)
- Component-level inspection (click UI region → highlight corresponding code)
- Multi-page design support (tab strip above canvas)
- Figma plugin integration panel
- Real-time streaming code generation (token-by-token append in code viewer)
- Collaboration mode (live cursors, shared sessions)
- Responsive preview toggle (desktop / mobile) in center panel
