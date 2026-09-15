# WeChat

Chat frontend built with React, TypeScript, Vite, Material UI, and Socket.IO.

## Getting started

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

The backend defaults to `http://localhost:5000` in development. Set
`VITE_API_URL` in a `.env.local` file to use a different backend.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Check TypeScript types and build for production |
| `npm run preview` | Preview the production build locally |

## CI

[GitHub Actions](.github/workflows/ci.yml) runs on pushes and pull requests:

- **Lint and build:** validates dependencies, runs ESLint, and builds the app.
- **Dependency security audit:** reports known npm vulnerabilities with a failed
  check and warning summary when issues are found.

To block merges on lint or build failures, require **Lint and build** in GitHub
branch protection. Leave **Dependency security audit** optional so findings
remain visible without blocking merges.
