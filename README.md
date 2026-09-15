# React + TypeScript + Vite

## Automated checks with GitHub Actions

The workflow in `.github/workflows/ci.yml` runs on every push and pull request.
You can also start it manually from the repository's **Actions** tab.
GitHub requires workflow files in `.github/workflows` at the repository root.

Each run uses an Ubuntu runner with Node.js 24 and performs these steps:

1. `npm ci --strict-peer-deps` installs the exact dependencies recorded in
   `package-lock.json` and fails on conflicting peer dependency requirements.
2. `npm ls --all` checks the installed dependency tree for missing or invalid
   dependencies, including peer dependencies.
3. `npm run lint` checks the code against the project's ESLint rules.
4. `npm run build` checks TypeScript types and creates the Vite production build.

A separate **Dependency security audit** job runs
`npm audit --package-lock-only --include=dev --audit-level=low`. It checks the
lockfile's production and development dependencies against npm's known security
advisories and reports low, moderate, high, or critical vulnerabilities.
The audit step uses `continue-on-error: true`: audit failures produce a warning
and job summary while allowing the job to succeed. This check is advisory.
It runs independently so peer dependency failures do not prevent the audit.
The audit requires access to the npm registry and does not automatically fix or
upgrade packages. Passing means no reported vulnerabilities at that time, not a
guarantee that all dependencies are secure.

Peer dependencies describe compatible packages a library expects its consumer to
provide. For example, an icon library may require a matching UI library version.
The peer checks catch incompatible versions; the audit catches known security issues.

These checks catch lint errors, type errors, and broken builds before changes
are merged. The npm download cache speeds up repeated installs. New runs cancel
older runs for the same branch and event, and jobs have a 10-minute timeout.
The workflow only needs read access to repository contents and no custom secrets.

Commit and push the workflow to see results in GitHub's **Actions** tab and on
pull requests. Merge blocking must also be configured in GitHub repository
settings; the workflow file alone cannot enforce it:

1. Open **Settings > Branches** and create or edit a branch protection rule for
   your merge target branch (for example, `main`).
2. Enable **Require a pull request before merging** and
   **Require status checks to pass before merging**.
3. Select **Lint and build** as a required status check. If it does not appear,
   push the workflow and let it run first.
4. Leave **Dependency security audit** out of the required checks; remove it if
   it was previously selected. Apply the same change to any matching rulesets.
5. Enable **Do not allow bypassing the above settings** if the checks should
   also apply to administrators, then save the rule.

With this protection active, ESLint or build failures block merging. Installation
and peer dependency failures also fail the required **Lint and build** job.
The security audit remains advisory and is not required for merging.
This workflow validates the app;
it does not deploy it. There is currently no automated test script in this project.

Run `npm run lint` and `npm run build` locally to check changes before pushing.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
