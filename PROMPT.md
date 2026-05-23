# Folio — Personal Book Library Web App
## Complete AI Prompt for Rebuilding This Project

---

## PROJECT OVERVIEW

Build a fully functional, elegant single-page personal book library web app called **"Folio"**. No backend required — use `localStorage` for persistence. The aesthetic should feel like a premium digital bookshelf: warm, editorial, sophisticated. Think Notion meets a physical library catalog.

---

## VISUAL DESIGN SPECIFICATION

### Color Palette (CSS variables)
```
--cream: #F7F4EF          (main background)
--cream-dark: #EDE8DF     (subtle surfaces)
--ink: #1A1610            (primary text / sidebar bg)
--ink-light: #3D3829      (secondary text)
--ink-muted: #7A7060      (muted labels)
--gold: #C9A84C           (accent / highlights)
--gold-light: #F0DFA0
--gold-pale: #FBF6E8
--forest: #2D4A3E         (status: read)
--terracotta: #C4553A     (status: lent)
--sky: #3A6B8A            (status: want to read)
```

### Typography
- **Display / Headings**: `Playfair Display` (Google Fonts) — serif, editorial, elegant
- **Body / UI**: `DM Sans` (Google Fonts) — clean, modern, highly readable
- Page title: Playfair Display 32px / 600 weight
- Body: DM Sans 14px / 400 weight
- Labels: DM Sans 11-12px / uppercase / 1.5–2px letter-spacing

### Book Cover Visual Style
Create 10 color themes for book covers (`bc-0` through `bc-9`) using CSS gradients:
- Each cover uses a CSS gradient background (dark, rich tones — forest greens, deep blues, burgundies, purples, warm browns)
- Cover has a realistic spine: left edge darkened strip (20px wide, rgba black overlay), subtle white highlight line at spine
- Bottom gradient overlay for title legibility
- Cover aspect ratio: 2:3
- Border radius: 4px on spine side, 12px on open side
- Box shadow: `-4px 4px 12px rgba(0,0,0,0.20)` to simulate depth

---

## LAYOUT STRUCTURE

### Fixed Sidebar (240px wide, dark ink background)
1. **Logo area** — "Folio" in Playfair Display gold, subtitle "Personal Library" uppercase tiny
2. **Stats panel** — 2×2 grid showing: Total Books, Read, Reading, Lent Out (live counts)
3. **Navigation** — icon + label items:
   - All Books (shows count badge)
   - Currently Reading
   - Want to Read
   - Lent Out
   - Activity (history)
   - Statistics
4. **Footer** — copyright line

Active nav item: gold color + gold tint background

### Sticky Top Bar
- **Search input** (pill shaped, left icon) — filters books in real time by title/author/genre
- **Layout toggle** — Grid / List view buttons
- **Sort dropdown** — Title / Author / Recently Added / Rating
- **Add Book button** — dark button with + icon

### Main Content Area
- Dynamic page title + subtitle
- Genre filter chips (All, Fiction, Non-Fiction, Mystery, Sci-Fi, Biography, History)
- Book grid or list (based on toggle)

---

## FEATURES TO IMPLEMENT

### 1. Book Grid View
- `repeat(auto-fill, minmax(170px, 1fr))` responsive grid
- Each card: 3D book cover + title/author/star rating below
- Status badge (top-right of cover): Read (forest green), Reading (gold), Want (translucent white), Lent Out (terracotta)
- Hover: lift with `translateY(-4px)` + stronger shadow

### 2. Book List View
- Horizontal rows with small cover, title/author/genre chip, and status/rating on right
- Hover: slide right + gold border

### 3. Genre Filter Chips
- Each genre has a color theme when active
- "All" chip is always available
- Selecting a chip instantly filters the grid

### 4. Book Detail Modal
Opens when clicking any book. Contains:
- **Header**: Large cover (80×112px) + title + author + genre/year/pages tags
- **Status selector**: 4 pill buttons (Read / Reading / Want to Read / Lent Out), each with distinct color when active
- **Star rating**: 5 interactive star buttons (gold when lit)
- **Description**: Book synopsis paragraph
- **Personal notes**: Resizable textarea
- **Lending section** (appears when status = Lent Out): text input for borrower name + date recorded
- **Footer buttons**: Delete (terracotta ghost), Cancel, Save Changes (dark primary)

### 5. Add Book Modal
Form fields:
- Title (required), Author (required)
- Year, Genre (dropdown), Pages
- Description (textarea)
- Initial Status (dropdown)

On submit: assign random cover color, add to library, log to activity history.

### 6. Activity / History View
Chronological feed of events:
- Book added, Started reading, Finished reading, Lent out, Returned
- Each item: colored icon square + event description + date
- Icon colors: terracotta for borrowed, forest for returned/finished, gold for started, gray for added

### 7. Statistics View
- **4 metric cards**: Total Books, Books Read, Pages Read, Average Rating
- Numbers in Playfair Display 48px (the "big number" style)
- **Genre bar chart**: horizontal bar for each genre, colored bars, count on right

### 8. Data Persistence
- Use `localStorage` with key `folio_library_v2`
- Separate `folio_history_v2` key for activity log
- `save()` function called after every mutation
- Preload with 10 sample books if localStorage is empty

---

## MODAL BEHAVIOR

- Background: `rgba(26,22,16,0.7)` with `backdrop-filter: blur(4px)`
- Modal: white, `border-radius: 20px`, max-width 560px
- Entry animation: `translateY(20px) + scale(0.97)` → normal on open (CSS transition)
- Close on: Escape key, clicking overlay background, Cancel button
- No jank: use CSS transitions, not JS animation loops

---

## SAMPLE DATA (10 books)

Include these as fallback data:
1. The Great Gatsby — F. Scott Fitzgerald (1925, Fiction, Read, ★★★★)
2. Sapiens — Yuval Noah Harari (2011, Non-Fiction, Read, ★★★★★)
3. Dune — Frank Herbert (1965, Sci-Fi, Reading, ★★★★★)
4. Gone Girl — Gillian Flynn (2012, Mystery, Lent to Emma, ★★★★)
5. Educated — Tara Westover (2018, Biography, Read, ★★★★★)
6. 1984 — George Orwell (1949, Fiction, Read, ★★★★★)
7. The Name of the Wind — Patrick Rothfuss (2007, Fiction, Want to Read)
8. Thinking, Fast and Slow — Daniel Kahneman (2011, Non-Fiction, Want to Read)
9. The Silk Roads — Peter Frankopan (2015, History, Reading, ★★★★)
10. The Girl with the Dragon Tattoo — Stieg Larsson (2005, Mystery, Read, ★★★★)

---

## TOAST NOTIFICATIONS

- Fixed bottom-right position
- Dark background (var(--ink)), white text
- Bounce-in animation using cubic-bezier(0.34,1.56,0.64,1)
- Auto-dismiss after 2.8 seconds
- Triggered on: add, save, delete, lend recorded

---

## TECHNICAL REQUIREMENTS

- **Single HTML file** — no external dependencies except Google Fonts
- **Vanilla JS** — no frameworks needed
- **Responsive** — sidebar collapses on mobile (<768px)
- Custom scrollbar styling (6px, rounded, subtle)
- All state in memory + localStorage — no server
- Clean separation: data layer (books array), render functions, event handlers

---

## GENRE COLOR SYSTEM

Each genre gets a pill badge color class:
- Fiction → forest green tones
- Non-Fiction → sky blue tones
- Mystery → terracotta/rust tones
- Sci-Fi → purple tones
- Biography → warm brown tones
- History → teal tones
- Romance → pink tones
- Thriller → dark amber tones

Same color logic applies to the active genre filter chips.

---

## QUALITY CHECKLIST

- [ ] Real book-spine 3D illusion with CSS
- [ ] Smooth modal open/close transitions
- [ ] Real-time search filtering
- [ ] All 4 statuses functional with distinct visual treatment
- [ ] Star rating interactive in modal, persists on save
- [ ] Lending records borrower name + date
- [ ] Activity feed logs all mutations
- [ ] Stats page shows live calculations
- [ ] Toast confirms every user action
- [ ] Sample data loads when localStorage is empty
- [ ] Keyboard shortcut (Escape) closes modals
- [ ] No layout breaks at common viewport sizes
