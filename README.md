This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/                # Authentication routes
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   ├── register/
│   │   │   │   └── page.jsx
│   │   │   └── layout.jsx         # Auth layout (centered card)
│   │   │
│   │   ├── (student)/             # Student dashboard
│   │   │   ├── dashboard/
│   │   │   │   └── page.jsx
│   │   │   ├── courses/
│   │   │   │   ├── page.jsx       # Browse enrolled/available courses
│   │   │   │   └── [id]/page.jsx  # Course details + lessons
│   │   │   ├── badges/
│   │   │   │   └── page.jsx
│   │   │   ├── streak/
│   │   │   │   └── page.jsx
│   │   │   └── layout.jsx         # Student sidebar layout
│   │   │
│   │   ├── (instructor)/          # Instructor dashboard
│   │   │   ├── dashboard/
│   │   │   │   └── page.jsx
│   │   │   ├── courses/
│   │   │   │   ├── page.jsx       # List + manage instructor courses
│   │   │   │   ├── new/page.jsx   # Create new course
│   │   │   │   └── [id]/page.jsx  # Edit single course + lessons
│   │   │   └── layout.jsx         # Instructor sidebar layout
│   │   │
│   │   ├── layout.jsx             # Global layout (navbar, provider)
│   │   └── page.jsx               # Landing page
│   │
│   ├── components/                # Shared components
│   │   ├── ui/                    # MUI/shadcn wrappers
│   │   ├── navbar.jsx
│   │   ├── sidebar.jsx
│   │   ├── course-card.jsx
│   │   ├── lesson-card.jsx
│   │   └── protected-route.jsx    # Role-based guard
│   │
│   ├── hooks/                     # React hooks
│   │   ├── useAuth.js
│   │   └── useApi.js
│   │
│   ├── lib/                       # Utilities
│   │   ├── api.js                 # axios instance w/ JWT
│   │   └── auth.js                # helpers (getRole, isLoggedIn)
│   │
│   ├── store/                     # State management (Zustand/Context)
│   │   └── authStore.js
│   │
│   └── styles/                    # Global styles (Tailwind config already)
│       └── globals.css
│
├── package.json
└── tailwind.config.js





{
  "name": "e-learning-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "@apollo/server": "^4.12.2",
    "@as-integrations/express4": "^1.1.2",
    "@graphql-tools/load-files": "^7.0.1",
    "@graphql-tools/merge": "^9.1.1",
    "@graphql-tools/schema": "^10.0.25",
    "apollo-server-express": "^3.13.0",
    "bcrypt": "^6.0.0",
    "body-parser": "^2.2.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^4.21.2",
    "graphql": "^16.11.0",
    "graphql-subscriptions": "^3.0.0",
    "graphql-ws": "^6.0.6",
    "helmet": "^8.1.0",
    "joi": "^18.0.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.0",
    "morgan": "^1.10.1",
    "ws": "^8.18.3"
  },
  "devDependencies": {
    "eslint": "^9.34.0",
    "nodemon": "^3.1.10"
  }
}
