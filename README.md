# My Best Life

## Links

- Staging: [https://my-best-life.vercel.app/](https://my-best-life.vercel.app/)
- CMS: [https://my-best-life.vercel.app/admin](https://my-best-life.vercel.app/admin)

## Development

This project was created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using the [`with-typescript-styled-components`](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-styled-components) template.

### ⚠ Prerequisites

- nvm [Linux/macOS](https://github.com/nvm-sh/nvm), [Windows](https://github.com/coreybutler/nvm-windows)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- For Windows machines ensure the [VC_redist.x64](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022) which is helpful with ensuring issues aren't encountered when trying to run project locally

### ⚛ Install and Develop

- Clone the repository
- Run `yarn`
- Run `nvm ls` (for Windows to list all currently node versions currently installed)
- Run `nvm install 16.0.0` (for Windows if node version 16.0.0 hasn't already been previously installed)
- Run `nvm use` (or manually add a node version argument when using Windows e.g. `nvm use 16.0.0`)
- Run `yarn dev`
- Browse to [http://localhost:3000](http://localhost:3000)

### 🔧 Maintenance

- Committing to repo will throw a warning message if the structure isn't inline with the [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint)

## 📃 Useful Information

### Global styles

The MBL app uses styled components with each component consisting of their own set and a global default theme with set variables such as colour scheme, font sizes and gutter sizes which are held separately and acessed globally. This provides conistency and allows each component to reference these variables in ./src/Theme.ts.

### App Wrapper

The MBL app is wrapped which can be seen in ./pages/_app.tsx. This structure keeps a styling and semantic consistency across the entire app.

### Creating Tests

When creating new tests it's important to keep a similar structure otherwise Jest will thrown an error as the props passed to component via the global theme will appear undefined. The best way around this is the following:

- import { ThemeProvider } from 'styled-components'
- import { MyBestLifeTheme, GlobalStyle } from '../src/Theme'
- When using the render method ensure to wrap the component with the following render( [COMPONENT HERE] )

### The Services

The services functions are located ./cms/services.ts. The getServices() function returns all the services based on the .md (markdown files) held within ./cms/content/services

## 📃 License

This program is distributed under the GNU GPLv3 licence, see the [LICENSE](/LICENSE) file for details.

Copyright (c) 2021 New Philanthropy Capital
