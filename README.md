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
- For Windows machines ensure the [VC_redist.x64](https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022). This is helpful with installing 3rd party software such as Microsoft Build Tools which can be necessary for certain node packages and can help avoid running into errors when running scripts. There is a Yarn package windows-build-tools that can installed but it has been reported as buggy and gets stuck when trying to install. [See stackoverflow issue which mentions and solves this](https://stackoverflow.com/questions/70902056/installing-global-windows-build-tools-never-completes)

### ⚛ Install and Develop

- Clone the repository
- Run `yarn`
- Run `nvm ls` (for Windows to list all currently node versions currently installed)
- Run `nvm install 16 latest` (for Windows if node version 16.0.0 hasn't already been previously installed)
- Run `nvm use` (or manually add a node version argument when using Windows e.g. `nvm use 16.16.0` replace 16.16.0 with the version that was installed)
- Run `yarn dev`
- Browse to [http://localhost:3000](http://localhost:3000)

### 🔧 Maintenance

- Committing to repo will throw a warning message if the structure isn't inline with the [commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint)

## Deploying to Live

Our hosting provider Vercel will automatically build and redeploy the live site when any changes are detected on the `main` branch of this repo. Therefore, to deploy from staging to live we need to merge our changes from the `development` branch into `main`. We can do this by making and merging a pull request.

- Click the [Pull requests](https://github.com/neontribe/my-best-life/pulls) tab at the top of the page
- From here, choose `New pull request` to reach the [Compare changes](https://github.com/neontribe/my-best-life/compare) page.

This is where we can make a new pull request.

- Using the dropdowns, select:
- base: main
- compare: development

This sets which branches we are looking to merge, and the order is important. After selecting, a list of commits and files changed should load. Outside of sprint development, the files changed should _only_ be the copy files for the services.

- Choose the `Files changed` tab
- Scroll through and check that the changes match expectations of what you want to release
- If they do, click `Create pull request`
- If not, use the CMS to amend content. This will update the content in the development branch

The next page lets you add a title and description to the PR. This is probably unnecessary for a PR that just moves content between branches.

- Add any title/description you'd like, or leave the default values
- Click `Create pull request`

Your PR should now be made, but we need to merge it for the live site to update. Deploy branches are protected from merging by status checks. Vercel bot will comment shortly after a PR is made with a link to the build status check and a deploy preview. A yellow circle means the build is in progress, a green tick means the build was successful and passes the status check, and a red cross means the build has failed. If the build has failed, the logs will need to be checked to find out why.

You can use the deploy preview link as another check to make sure what you are deploying matches expectations.

The other status check is for the PR to be reviewed. An admin can bypass this, though this should only be done for copy changes from the CMS. Either:

- Ask for the PR to be reviewed
- After approval, click `Merge pull request`
- Click `Confirm merge`

Or

- Use the checkbox `Merge without waiting for requirements to be met (administrators only)`
- Click `Merge pull request`
- Click `Confirm merge`

Your PR should now be merged and the live site will update shortly!

## 📃 Useful Information

### Global styles

The MBL app uses styled components with each component consisting of their own set and a global default theme with set variables such as colour scheme, font sizes and gutter sizes which are held separately and accessed globally. This provides consistency and allows each component to reference these variables in ./src/Theme.ts.

### App Wrapper

The MBL app is wrapped which can be seen in ./pages/\_app.tsx. This structure keeps a styling and semantic consistency across the entire app.

### Creating Tests

When creating new tests it's important to keep a similar structure otherwise Jest will thrown an error as the props passed to component via the global theme will appear undefined. The best way around this is the following:

- import { ThemeProvider } from 'styled-components'
- import { MyBestLifeTheme, GlobalStyle } from '../src/Theme'
- When using the render method ensure to wrap the component with the following render( [COMPONENT HERE] )

### The Services

The services functions are located ./cms/services.ts. The getServices() function returns all the services based on the .md (markdown files) held within ./cms/content/services

### Working with CMS Data Locally

The site content is managed by Netlify CMS. The admin UI provided by Netlify stores content inside this git repository by creating branches and merging them into into staging. This happens whether the admin UI is being used locally or on the staging site. To use the CMS locally without affecting the staging site:

- Add `local_backend: true` as a top level property to [config.js](./cms/config.js)
- In a separate terminal run `npx netlify-cms-proxy-server`

For more information, check out Netlify's docs on [working with a local git repository](https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository).

## 📃 License

This program is distributed under the GNU GPLv3 licence, see the [LICENSE](/LICENSE) file for details.

Copyright (c) 2022 New Philanthropy Capital
