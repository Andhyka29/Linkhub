# Link Hub - Bookmark Manager Web App

## 1. Project Overview

- **Project Name**: Link Hub
- **Type**: Full-stack Web Application (Next.js)
- **Core Functionality**: A minimalist bookmark manager to save, organize, and open URLs with category organization and search
- **Target Users**: General users seeking a clean, personal link management tool

---

## 2. Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MySQL |
| ORM | Prisma |
| Animation | Framer Motion |

---

## 3. UI/UX Specification

### Layout Structure

- **Header**: Fixed top, logo + action buttons
- **Main Content**: Search bar + category filter + link grid
- **Responsive Breakpoints**:
  - Mobile: < 640px (1 column)
  - Tablet: 640px - 1024px (2 columns)
  - Desktop: > 1024px (3-4 columns)

### Visual Design

#### Color Palette (Dark Theme)

| Role | Color | Hex |
|------|-------|-----|
| Background Primary | Deep Charcoal | `#0f0f0f` |
| Background Secondary | Soft Black | `#1a1a1a` |
| Surface / Card | Dark Gray | `#252525` |
| Surface Hover | Lighter Gray | `#2f2f2f` |
| Accent Primary | Electric Violet | `#8b5cf6` |
| Accent Hover | Bright Violet | `#a78bfa` |
| Text Primary | White | `#ffffff` |
| Text Secondary | Gray | `#a1a1aa` |
| Text Muted | Dark Gray | `#71717a` |
| Border | Subtle Gray | `#333333` |
| Success | Emerald | `#10b981` |
| Danger | Rose | `#f43f5e` |

#### Typography

- **Font Family**: `"Plus Jakarta Sans"` (Google Fonts)
- **Logo**: Bold 24px
- **Headings**: Semi-bold 20px
- **Body**: Regular 14px
- **Small**: 12px

#### Spacing System

- Base unit: 4px
- Card padding: 20px
- Grid gap: 24px
- Section margin: 32px

#### Visual Effects

- Card border-radius: `16px`
- Button border-radius: `12px`
- Card shadow: `0 4px 20px rgba(0, 0, 0, 0.3)`
- Hover shadow: `0 8px 30px rgba(139, 92, 246, 0.15)`
- Transitions: `all 0.2s ease`

### Components

#### Header
- Logo "Link Hub" on left
- "Add Link" button on right (accent color)
- Sticky position

#### SearchBar
- Icon + input field
- Placeholder: "Search links..."
- Real-time filtering

#### CategoryFilter
- Horizontal scrollable pills
- "All" + dynamic categories from DB
- Active state with accent background

#### LinkCard
- Favicon (32x32) from Google S2
- Title (bold, truncate at 2 lines)
- URL (muted, truncate at 1 line)
- Category badge (pill)
- Actions: Edit + Delete icons on hover

#### LinkForm (Modal)
- Title input
- URL input
- Category select/input
- Save + Cancel buttons

#### EmptyState
- Icon + message
- "Add your first link" CTA

---

## 4. Database Schema (Prisma)

```prisma
model Link {
  id        Int      @id @default(autoincrement())
  title     String
  url       String   @unique
  category  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 5. API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/links` | Get all links |
| POST | `/api/links` | Create new link |
| PUT | `/api/links/:id` | Update link |
| DELETE | `/api/links/:id` | Delete link |

---

## 6. Functionality Specification

### Core Features

1. **Add Link**
   - Title (required)
   - URL (required, validated)
   - Category (optional)
   - Auto-fetch favicon from: `https://www.google.com/s2/favicons?domain={domain}`
   - If title empty, extract from URL

2. **Display Links**
   - Grid layout, responsive
   - Show favicon, title, URL, category
   - Click URL to open in new tab

3. **Edit Link**
   - Modal with prefilled data
   - Update title, URL, category

4. **Delete Link**
   - Confirmation on delete
   - Optimistic UI update

5. **Search**
   - Filter by title or URL (case-insensitive)
   - Debounced input (300ms)

6. **Filter by Category**
   - Click category pill to filter
   - "All" shows everything

### Data Handling

- Invalid URLs: Show error toast
- Empty title: Auto-generate from URL hostname
- Category empty: Store as null

---

## 7. Project Structure

```
/linkhub
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── links/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── LinkCard.tsx
│   ├── LinkForm.tsx
│   ├── EmptyState.tsx
│   └── Toast.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── package.json
└── .env
```

---

## 8. Acceptance Criteria

- [x] Dark theme UI with violet accents
- [x] Add link with title, URL, category
- [x] Display links in responsive grid
- [x] Edit existing link
- [x] Delete link with confirmation
- [x] Search filters in real-time
- [x] Category filter pills
- [x] Favicon auto-fetched
- [x] Empty state UI
- [x] Toast notifications
- [x] Smooth hover animations
- [x] Mobile responsive

---

## 9. Setup Instructions

### Prerequisites
- Node.js 18+
- MySQL running locally or remote

### Setup

```bash
# 1. Create Next.js app
npx create-next-app@latest linkhub --typescript --tailwind --eslint
cd linkhub

# 2. Install dependencies
npm install prisma @prisma/client framer-motion

# 3. Initialize Prisma
npx prisma init

# 4. Configure .env
# DATABASE_URL="mysql://user:password@localhost:3306/linkhub"

# 5. Create schema in prisma/schema.prisma

# 6. Run migration
npx prisma migrate dev --name init

# 7. Run dev server
npm run dev
```