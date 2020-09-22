# Parcel + Typescript + React + Semantic-UI Setup

Initialize workspace

```sh
yarn init
git init .
```

Edit `package.json` for your own information

```json
{
  "name": "harvest-farm",
  "source": [
    "src/index.tsx",
    "src/index.html"
  ],
  "scripts": {
    "start": "parcel serve --dist-dir .dev ./src/index.html",
    "build": "parcel build  --public-url ./ ./src/index.html",
    "preinstall": "npx npm-force-resolutions"
  },
  "resolutions": {
    "browserslist": "4.14.2",
    "caniuse-lite": "1.0.30001129"
  }
}
```

Setup `parcel` + `babel 7` + `react` + `typescript`.

```sh
yarn add --dev parcel@next @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime
yarn add react react-dom react-router react-router-dom
```

Setup `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true // fix @types/lodash error
  },
  "include": ["src/**/*"]
}
```

Setup `.babelrc`:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

不加`@babel/plugin-transform-runtime`的话使用`async/await`会出现“regeneratorRuntime is not defined"错误。

Add Semantic UI with `semantic-ui-react` and `semantic-ui-less`.

```sh
yarn add --dev less
yarn add semantic-ui-react semantic-ui-less
```

Setup `semantic-ui-less`:

```sh
# prepare directory for semantic ui
mkdir src/semantic-ui -p

# copy skels from semantic-ui-less package
cp node_modules/semantic-ui-less/_site src/semantic-ui/site -a
cp node_modules/semantic-ui-less/theme.config.example src/semantic-ui/theme.config

# copy or link semantic-ui-less modules
#   here we use link
cd src/semantic-ui
ln ../../node_modules/semantic-ui-less/semantic.less . -sf
ln ../../node_modules/semantic-ui-less/definitions . -sf
ln ../../node_modules/semantic-ui-less/theme.less . -sf
# link themes
ln ../../node_modules/semantic-ui-less/themes . -sf
# or link sub-themes, copy a theme from semantic-ui-less, or use any theme you have.
mkdir themes
ls ../../../node_modules/semantic-ui-less/themes |xargs -i ln ../../../node_modules/semantic-ui-less/themes/{} . -sf
```

Import `semantic ui` in main js `src/index.js`:

```jsx
import * as React from 'react';

import './semantic-ui/semantic.less';

import { Breadcrumb, Divider } from 'semantic-ui-react'

const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

const BreadcrumbExampleSize = () => (
  <React.Fragment>
    {sizes.map((size) => (
      <React.Fragment key={size}>
        <Breadcrumb size={size}>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section link>Registration</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section active>Personal Information</Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
      </React.Fragment>
    ))}
  </React.Fragment>
)

export default BreadcrumbExampleSize
```

Examples html `src/index.html`:

```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
  </head>
  <body>
    <div id="app"></div>
    <script src="./index.tsx"></script>
  </body>
</html>
```

`src/index.tsx`:

```ts
import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './Demo'
let root = document.getElementById('app')
ReactDOM.render(<Demo />, root)
```

Node target support:

```ts
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Demo from './Demo'

let demo = <Demo />

let strings = ReactDOMServer.renderToString(demo)

console.log(strings)
```