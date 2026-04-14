# Link Hub - Bookmark Manager

A minimalist bookmark manager web app built with Next.js, Tailwind CSS, Prisma, and MySQL.

## Features

- Add, edit, and delete links
- Organize links with categories
- Real-time search filtering
- Category filtering
- Auto-fetch favicons
- Dark mode UI
- Responsive design

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **ORM**: Prisma
- **Animation**: Framer Motion

## Setup Instructions

### Prerequisites

- Node.js 18+
- MySQL (local or remote)

### Installation

```bash
# Install dependencies
npm install --ignore-scripts

# Generate Prisma Client
npx prisma generate
```

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE linkhub;
```

2. Update `.env` with your MySQL credentials:
```
DATABASE_URL="mysql://username:password@localhost:3306/linkhub"
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

### Running the App

```bash
# Development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/linkhub
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Main page
├── components/            # React components
├── lib/                 # Prisma client
├── prisma/              # Prisma schema
└── types/              # TypeScript types
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/links` | Get all links |
| POST | `/api/links` | Create new link |
| PUT | `/api/links/[id]` | Update link |
| DELETE | `/api/links/[id]` | Delete link |