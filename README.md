# QUOTELY — A Quote Discovery & Personal Collection Experience

QUOTELY is a responsive, client-side web application designed as a **digital literary lounge** with an editorial magazine aesthetic. It allows users to discover thoughtful quotations from an external API, curate a personal collection of favourites, and browse their reading history with complete persistence in the browser.

---

## 🎨 Visual Identity — Chromatic Nocturne

QUOTELY is built upon a dark-first, editorial aesthetic termed **Chromatic Nocturne**:

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Midnight Ink** | `#171528` | Main ambient background canvas |
| **Velvet Plum** | `#28233F` | Elevated cards, sidebars, and reading surfaces |
| **Electric Violet** | `#7167F8` | Primary interactive accent, active navigation, focus rings |
| **Ember Coral** | `#FF765E` | Primary discovery CTA (`Discover another`) |
| **Marigold** | `#F2C45B` | Decorative highlights, folios, and catalog indices |
| **Soft Mint** | `#9BE2C2` | Saved state, bookmarks, and success indicators |
| **Lavender Mist** | `#C9BDFB` | Secondary text accents and pill badges |
| **Cloud Lilac** | `#E8E3F2` | Subtle borders and divider lines |
| **Text Light** | `#F4F1FA` | High-contrast editorial display typography |
| **Text Muted** | `#B5B0C9` | Secondary descriptive copy and citations |

### Typography
- **Display & Quotes**: *Cormorant Garamond* & *DM Serif Display* (expressive, editorial, high-contrast serif).
- **Interface & Body**: *DM Sans* (clear, clean, highly readable modern grotesque).
- **Metadata & Folio Labels**: *DM Mono* & *Space Mono* (refined uppercase catalog labels).

---

## 🚀 Key Features

### 1. Home / Discover
- **Hero Quote Display**: Large serif quote typography with fluid `clamp()` sizing, oversized typographic quotation mark ornament, catalog index `#ID`, and author attribution.
- **Discover Another**: Fetches real random quotes from DummyJSON Quotes API with loading states and concurrent click protection.
- **Save / Bookmark**: Instantly toggles quote in personal favourites collection with persistent Soft Mint badge.
- **Copy & Share**: Copies quote and author to clipboard with toast notification, and invokes native Web Share API with clipboard fallback.
- **Collection Statistics Strip**: Real-time counter of total discovered quotes, saved favourites, and unique authors derived strictly from localStorage.
- **Recent Discoveries**: Carousel of the last 3 discovered quotes with one-click hero inspection.

### 2. Reading History (Archive)
- **Automatic Persistence**: Every successfully discovered quote is stored newest-first.
- **Deduplication**: Identical quote IDs are automatically deduplicated.
- **200 Item Bounded Cap**: History is safely capped at 200 items to protect storage quota.
- **Real-Time Search**: Instant local filtering by quote keywords and author name without unnecessary network traffic.
- **Item Deletion**: Remove individual quotes from the archive.
- **Clear All History**: Action with accessible confirmation modal (`ClearHistoryModal`) to prevent accidental deletion. Favourites are strictly protected.

### 3. Favourites (Anthology)
- **Curated Collection**: Dedicated space for bookmarked quotes.
- **Full Actions**: Copy, share, remove bookmark, or click to load onto the hero quote card.
- **Live Search**: Instant client-side search across saved favourites.
- **Persistent Storage**: Retains bookmarked quotes across browser refreshes and sessions.

---

## 🛠️ Technology Stack & Architecture

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom Chromatic Nocturne tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: Browser `localStorage` (Zero backend, zero database, zero external tracking)
- **Networking**: Fetch API with `AbortController` cancellation support

### Folder Structure
```
quotely/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ClearHistoryModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── FavouriteCard.jsx
│   │   ├── HistoryCard.jsx
│   │   ├── LoadingState.jsx
│   │   ├── Navbar.jsx
│   │   ├── QuoteActions.jsx
│   │   ├── QuoteCard.jsx
│   │   └── Toast.jsx
│   ├── hooks/
│   │   └── useQuotes.js
│   ├── pages/
│   │   ├── Favourites.jsx
│   │   ├── History.jsx
│   │   └── Home.jsx
│   ├── services/
│   │   └── quoteService.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── clipboard.js
│   │   ├── share.js
│   │   └── storage.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📦 Local Storage Schema

QUOTELY uses three isolated localStorage keys:

| Key | Type | Description |
| :--- | :--- | :--- |
| `quotely_history` | `Array<QuoteObject>` | Array of discovered quotes (newest first, max 200 items). |
| `quotely_favourites` | `Array<QuoteObject>` | Array of user-bookmarked quotes. |
| `quotely_preferences` | `Object` | Optional user preferences (e.g. reduced motion). |

### Normalized Quote Schema
```json
{
  "id": 62,
  "quote": "If you want to lift yourself up, lift up someone else.",
  "author": "Booker T. Washington",
  "savedAt": "2026-11-15T17:40:00.000Z"
}
```

---

## 🌐 External API Integration

- **Provider**: DummyJSON Quotes API
- **Endpoint**: `GET https://dummyjson.com/quotes/random`
- **Response Validation**: Enforces numeric `id`, non-empty string `quote`, and string `author`.
- **Honest Data**: DummyJSON does not supply quote categories; hence, no fabricated category tags are displayed.
- **Resilience**: If a network failure occurs, the previously rendered quote remains preserved on screen while displaying an error banner with a retry button.

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd QUOTELY

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` (or `http://127.0.0.1:3000`) in your browser.

### Production Build
```bash
# Compile and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## ⚠️ Known Limitations & Design Boundaries

1. **Client-Side Persistence Only**: Data is stored strictly within the user's browser via `localStorage`. Clearing browsing data or using incognito mode will reset history and favourites.
2. **Device Isolation**: Without a cloud database or authentication layer, saved quotes do not synchronize across different devices or browsers.
3. **Random API Repetition**: As with any pseudo-random endpoint, DummyJSON may occasionally return a previously seen quote ID. The application handles this gracefully by deduplicating and promoting the quote to the top of the history list rather than duplicating records.

