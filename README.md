# My Best Life

## Links

- Staging: [https://my-best-life.vercel.app/](https://my-best-life.vercel.app/)

- CMS: [https://my-best-life.vercel.app/admin](https://my-best-life.vercel.app/admin)

- Live: [https://mybestlife.app/](https://mybestlife.app/)

## Content Workflow

We use [Netlify CMS](https://www.netlifycms.org/) to manage content entry. Netlify provides a CMS interface which we configure with various input widgets in [config.js](./cms/config.js). Content entries are saved into the content directory as Markdown files, ready for use in the app.

The CMS targets the `development` branch regardless of where it's accessed from. This is so that updates always move in one direction from `development`(staging) -> `main`(live), and the two branches shouldn't have conflicting sets of content.

## Development

This project was created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using the [`with-typescript-styled-components`](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-styled-components) template.

### ⚠ Prerequisites

- nvm [Linux/macOS](https://github.com/nvm-sh/nvm), [Windows](https://github.com/coreybutler/nvm-windows)
- [yarn](https://classic.yarnpkg.com/en/docs/install)

### ⚛ Install and Develop

- Clone the repository
- Run `yarn`
- Run `nvm use` (or manually add a node version argument when using Windows e.g. `nvm use 14.15.0`)
- Run `yarn dev`
- Browse to [http://localhost:3000](http://localhost:3000)

### Working with CMS Data Locally

The site content is managed by Netlify CMS. The admin UI provided by Netlify stores content inside this git repository by creating branches and merging them into into staging. This happens whether the admin UI is being used locally or on the staging site. To use the CMS locally without affecting the staging site:

- Add `local_backend: true` as a top level property to [config.js](./cms/config.js)
- In a separate terminal run `npx netlify-cms-proxy-server`

For more information, check out Netlify's docs on [working with a local git repository](https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository).

## 📃 License

This program is distributed under the GNU GPLv3 licence, see the [LICENSE](/LICENSE) file for details.

Copyright (c) 2022 New Philanthropy Capital
