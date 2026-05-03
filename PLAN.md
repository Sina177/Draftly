# Whiteboard to Code 🖊️➡️💻

> Upload a photo of a hand-drawn UI sketch and receive clean, working frontend code — instantly.

---

## Overview

**Whiteboard to Code** is a full-stack web application that bridges the gap between paper ideation and working UI. Users upload a photo of a hand-drawn sketch — on paper, a whiteboard, or a napkin — and Claude's vision AI interprets the layout, identifies components, and generates clean frontend code.

Targeted at **developers and founders** who think on paper and want to skip the design tool step entirely.

---

## The Problem It Solves

There's a significant gap between sketching an idea and producing working UI. Translating a rough drawing into code is tedious and slows down prototyping — especially for developers who aren't strong designers. Existing tools like Figma require structured digital inputs, not freehand sketches. **Whiteboard to Code collapses the idea-to-prototype cycle from hours to seconds.**

---

## Features

### MVP
- 📤 Upload or drag-and-drop an image (JPG, PNG)
- 🤖 Claude analyzes the sketch using vision AI and generates frontend code
- 👁️ Live preview of the generated UI side-by-side with the uploaded sketch
- 📋 Copy-to-clipboard for the generated code
- 🎛️ Choose output format: plain HTML, Tailwind CSS, or React

### Version 2
- 💬 Iterative refinement via chat — *"make the button blue"*, *"add a navbar"*
- 🔧 Multiple framework targets (Vue, React Native)
- 🧩 Component-level generation — draw one component, get just that piece
- 📦 Export as a downloadable ZIP file
- 🕓 History of past conversions (requires auth)

### Version 3 (Stretch Goals)
- 👤 User accounts and saved projects
- ✏️ Annotation tools — draw on top of the sketch to give Claude hints
- 🎨 Figma export
- 👥 Team sharing

---

## How Claude's API Is Used

This project uses the **multimodal vision pattern** — one of the most powerful Claude integration approaches:

1. The sketch image is **base64-encoded** and sent to Claude alongside an engineered system prompt
2. Claude **interprets the visual layout**, identifies UI components (buttons, forms, navbars, cards), infers hierarchy and spacing, and generates corresponding code
3. For iterative refinement, a **conversation history array** is maintained so Claude remembers the original sketch and previous edits
4. The **system prompt** instructs Claude to output only clean code, identify component names, and make reasonable assumptions about styling

### Starting System Prompt
```
You are a UI developer. The user will provide a hand-drawn sketch of a user interface.
Analyze the sketch carefully, identify all UI components, their layout, hierarchy, and
relationships. Generate clean, complete [HTML/Tailwind/React] code that faithfully
implements the sketched layout. Make reasonable assumptions about styling.
Output only the code, no explanation.
```

> ⚠️ Prompt engineering is a core skill in this project — expect to iterate on this significantly as you test with real sketches.

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React + Vite | Component structure suits a split-panel UI |
| Tailwind CSS | Fast styling |
| Monaco Editor | VS Code-style code display with syntax highlighting |
| react-dropzone | Drag-and-drop image upload |

### Backend
| Tool | Purpose |
|---|---|
| Next.js API Routes | Handles image upload and proxies Claude API calls |
| Multer | Multipart file upload handling |
| Sharp (optional) | Image preprocessing — resize/compress before sending to Claude |

### AI
| Tool | Purpose |
|---|---|
| Anthropic Node.js SDK | Claude API integration |
| claude-sonnet (vision) | Multimodal image + text understanding |
| Base64 encoding | Image format required by Claude API |

### Infrastructure
| Tool | Purpose |
|---|---|
| Vercel | Frontend + API routes deployment (free tier) |
| Supabase (optional) | Auth, database, and file storage for V2 features |

### Recommended Stack Summary
```
Frontend:   React + Vite + Tailwind + Monaco Editor
Backend:    Next.js API routes (single repo)
AI:         Anthropic SDK (claude-sonnet, vision)
Storage:    Supabase (for auth + history in V2)
Deploy:     Vercel
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)
- A Vercel account (for deployment)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/whiteboard-to-code.git
cd whiteboard-to-code

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# 4. Run the development server
npm run dev
```

### Environment Variables
```env
ANTHROPIC_API_KEY=your_api_key_here
```

> ⚠️ Never expose your API key on the frontend. Always proxy Claude API calls through a backend API route.

---

## Project Structure

```
whiteboard-to-code/
├── app/
│   ├── page.tsx              # Main upload + preview UI
│   └── api/
│       └── generate/
│           └── route.ts      # Claude API route (backend only)
├── components/
│   ├── ImageUploader.tsx     # Drag-and-drop upload zone
│   ├── CodeEditor.tsx        # Monaco Editor wrapper
│   ├── LivePreview.tsx       # iframe HTML preview pane
│   └── FormatSelector.tsx    # HTML / Tailwind / React toggle
├── lib/
│   └── claude.ts             # Anthropic SDK wrapper + prompt logic
├── public/
└── .env.local                # API keys (never commit this)
```

---

## Development Roadmap

### Week 1 — Core Pipeline
- [ ] Scaffold Next.js project with Tailwind
- [ ] Build image upload UI with drag-and-drop + preview
- [ ] Create API route that accepts image, encodes to base64, calls Claude
- [ ] Write and test initial system prompt with hand-drawn sketches
- [ ] Display raw code output on screen

### Week 2 — Make It Usable
- [ ] Integrate Monaco Editor for syntax-highlighted code display
- [ ] Add live HTML preview pane using `<iframe srcdoc>`
- [ ] Add output format selector (HTML / Tailwind / React)
- [ ] Polish the UI — the app itself should look good

### Week 3 — Iterative Refinement
- [ ] Add chat input below the result
- [ ] Maintain conversation history array and append follow-up messages
- [ ] Allow Claude to refine output based on user instructions

### Week 4 — Ship It
- [ ] Deploy to Vercel with a custom domain
- [ ] Write README with screenshots and a demo GIF
- [ ] Record a 60-second demo video

---

## Key Implementation Notes

### Image Upload → Claude API Flow
```typescript
// app/api/generate/route.ts
const base64Image = imageBuffer.toString('base64');

const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 4096,
  messages: [{
    role: 'user',
    content: [
      {
        type: 'image',
        source: { type: 'base64', media_type: 'image/jpeg', data: base64Image }
      },
      {
        type: 'text',
        text: `Generate ${format} code for this UI sketch.`
      }
    ]
  }],
  system: SYSTEM_PROMPT
});
```

### Live Preview with iframe
```tsx
// components/LivePreview.tsx
<iframe
  srcDoc={generatedHtml}
  sandbox="allow-scripts"
  className="w-full h-full border rounded-lg"
/>
```

### Iterative Refinement (Conversation History)
```typescript
const messages = [
  { role: 'user', content: [imageBlock, initialPrompt] },
  { role: 'assistant', content: previousCode },
  { role: 'user', content: refinementRequest }  // e.g. "make the button blue"
];
```

---

## Why This Project Stands Out

- **Visually demonstrable** in interviews — draw something live and show it working in real time
- Showcases **multimodal AI integration** (vision + code generation), not just text in/text out
- Involves real engineering decisions: image handling, prompt engineering, code rendering, live preview
- A polished-looking app demonstrates **frontend competence**
- The prompt engineering work shows **AI product thinking**, not just API calls

---

## Future Ideas
- Browser extension to sketch directly on a webpage and inject generated components
- Collaborative mode — multiple people annotating the same sketch
- Figma plugin version
- Mobile app (draw with your finger, get code instantly)

---

## License
MIT
