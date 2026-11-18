# Pendo Demosite

## Getting Started

In order to get the project up and running you will need:

- Node JS
- NPM

To clone the app:

```
git clone https://github.com/pendo-sandbox/pendo-sandbox.github.io
```

Installation:

```
cd ./pendo-sandbox.github.io
nvm use 16.13.0
yarn install
```

Then to run locally at [http://localhost:3000/](http://localhost:3000/):

```
npm run start:dev
```

Or to test automation changes:

```
npm run automateusage
```

## Deploying to GitHub Pages

The Pendo API key is not stored in this repo; `public/index.html` keeps the
`YOUR-PENDO-API-KEY-HERE` placeholder. `predeploy` builds the app and then runs
`scripts/patch-pendo-key.js`, which swaps the placeholder in `build/index.html`
for the key in the `PENDO_API_KEY` environment variable before the build is
published to the `gh-pages` branch:

```
PENDO_API_KEY=<your-key> yarn deploy
```

The deploy stops with an error if `PENDO_API_KEY` is missing or the placeholder
is not found in the build.
