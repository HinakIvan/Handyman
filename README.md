# Welcome to your AutoCoder.cc project

## Project info

- **Project ID:** PROJ_b23df7b6_snap_20261010_124454_705
- **Version:** Added handyman site
- **URL:** [AutoCoder.cc](https://www.autocoder.cc/platform/generate/2990405558?PROJECTID=PROJ_b23df7b6)
- **Test account (no registration required):**

**🔑 Recommended Test Access (No Registration Required):**

* Frontend: `stefan.weber@gmail.com`/`CustomerPass2026!`/`email` (CUSTOMER)

* Backend admin: `admin@vienna-handyman.at`/`ViennaAdmin2026!`/`email` (ADMIN)

**Note:** The test account and its data will be disabled upon official platform launch to ensure security.
## Getting Started

**Prerequisites:** Node.js (recommend [nvm](https://github.com/nvm-sh/nvm)) and [pnpm](https://pnpm.io/).

```bash
cd AutoCoder.cc

# Install dependencies
pnpm install

# Initialize the database and rebuild server actions
pnpm run init

# Run development
pnpm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The backend API runs at [http://localhost:3001](http://localhost:3001).

**Quick Links**
- **Website** — [http://localhost:3000/](http://localhost:3000/)
- **Backend** — [http://localhost:3000/adminoperationsdashboard](http://localhost:3000/adminoperationsdashboard)

---

## How can I edit this project?

You can work on this project in several ways:

### Use AutoCoder.cc

Visit [AutoCoder.cc](https://www.autocoder.cc/platform/generate/2990405558?PROJECTID=PROJ_b23df7b6) and use the editor. Changes are committed automatically to the connected repo.

### Use your IDE locally

Clone the repo, then from the project root:

1. Install dependencies
2. `pnpm run init` initializes the database and rebuilds the server action common bundle
3. Edit files
4. if you edit actions, run `pnpm run build:server` to rebuild
5. Start frontend: `pnpm run dev` (port 3000)

---



## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS
- Prisma
- shadcn/ui
