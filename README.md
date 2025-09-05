<p align="center">
  <a href="https://github.com/Pentulz/Pentulz">
    <img src="https://github.com/Pentulz/.github/blob/main/public/images/logo.png?raw=true" alt="Pentulz" width="200">
  </a>
</p>
<h1 align="center">Frontend</h1>

<p align="center">
  <img alt="Nuxt" src="https://img.shields.io/badge/Nuxt-4.1-00DC82?logo=nuxtdotjs&logoColor=white" />
  <img alt="Tailwindcss" src="https://img.shields.io/badge/tailwindcss-4.1-%2338B2AC.svg?logo=tailwind-css&logoColor=white" />
  <img alt="Vue.js" src="https://img.shields.io/badge/vuejs-3.5.21-%2335495e.svg?logo=vuedotjs&logoColor=%234FC08D" />
  <img alt="Vite" src="https://img.shields.io/badge/vite-7.x.x-%23646CFF.svg?logo=vite&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" />
</p>

<p align="center">
  <a href="#introduction">Introduction</a>
  ·
  <a href="#documentation">Documentation</a>
  ·
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="#testing">Testing</a>
  ·
  <a href="#linting">Linting</a>
</p>

<p align="center">
  Penetration testing orchestration: jobs, agents, and unified parsing.
</p>

## Introduction

Pentulz Frontend provides an intuitive UI and UX to interact with the pentulz API.

Important links:

- Official website: [https://pentulz.xyz](https://pentulz.xyz)
- Official repository: [https://github.com/Pentulz/Pentulz](https://github.com/Pentulz/Pentulz)
- Backend repository: [https://github.com/Pentulz/Backend](https://github.com/Pentulz/Backend)
- Agent repository: [https://github.com/Pentulz/Agent](https://github.com/Pentulz/Agent)

> [!NOTE]
> This repository is part of the Pentulz project. To see the full project, please visit the [Pentulz repository](https://github.com/Pentulz/Pentulz).

## Documentation

- [Project structure](https://nuxt.com/docs/4.x/guide/directory-structure/nuxt)
- Designed components: [Shadcn/vue](https://www.shadcn-vue.com/)
- Primitive components: [Reka](https://reka-ui.com/)
- Testing: [test-utils](https://nuxt.com/docs/4.x/getting-started/testing)

## Getting Started

### Prerequisites

- Node >= 22
- Pnpm >= 10 (recommended) or npm (bundled with node)
- Docker (when using the docker file)

### Configuration

Runtime configuration is configured through environment variables. If a .env
file is present it will be loaded automatically.

For a quick start, copying `.env.example` to `.env` should be enough.

Here are the environment variables used for this project specifically.

- `NUXT_PUBLIC_API_BASE`: The base api url. (e.g. http://localhost:8000)
- `NUXT_APP_BASE_URL`: Specify a different root path for static builds.

In order to communicate with the api it's important to configure the CORS correctly
on the API's side, otherwise the browser will withhold the response.

### Installation

Using pnpm:

```bash
pnpm install
pnpm run postinstall
```

Using npm:

```bash
npm install
npm run postinstall
```

### Running in dev mode

```bash
pnpm run dev
# or
npm run dev
```

### Building for production with server

```bash
# Build the server
pnpm run build
# or
npm run build

# Serve
node ./output/server/index.mjs
```

To use the server once built, all you need is NodeJs and the content of the `.output` directory

### Building for production with static output

```bash
pnpm dlx nuxt build --preset github_pages
# or
npx nuxt build --preset github_pages
```

The content of `.output/public` can be served with any webserver such as nginx or
apache2

### Docker

To run with Docker Compose:

```bash
docker compose up --build
```

## Testing

Run tests and coverage:

```bash
pnpm run test
# or
npm run test
```

## Linting

Run linting:

```bash
pnpm run lint
# or
npm run lint
```

---

Made with ❤️ by the Pentulz team.
