# About

This is a simple currency converter, written in Typescript, NodeJS and React. The front-end and back-end are two separate packages within a single NodeJS monorepo.
Currency exchange rates are obtained from the [Currency Beacon](https://currencybeacon.com) API.

# Installation

- Install the [pnpm](https://pnpm.io/) package manager: `npm install -g pnpm`
- Install the repository dependencies: `pnpm install`
- Define the `API_KEY` env variable for the currency beacon API (using an env file or any other way of defining en env variable)
- The currency converter can be launched locally using either `pnpm run dev` or `turbo run dev`

# Notable libraries

- Frameworks: [React](https://react.dev/) and [Express](https://expressjs.com/)
- Query management: [Tanstack Query](https://tanstack.com/query/latest)
- CSS: [Tailwind](https://tailwindcss.com/)
- Typechecking: [Zod](https://zod.dev/)
- Monorepo management: [Turbo](https://turbo.build/)
