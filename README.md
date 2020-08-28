# uniroll

Opinionated rollup wrapper to work in browser.

demo https://focused-raman-3ce115.netlify.com/

## Features

- Run in browser and worker
- TypeScript compile

## How it works

- Create virtual fs with `memfs` by `rollup-plugin-memfs`
- Load npm modules via `rollup-plugin-http-resolver`
- Compile with `rollup`.

## Run in browser

```
npm install uniroll --save
```

```js
import { compile } from "uniroll";
const files = {
  "/foo.tsx": "export default 1",
  "/index.tsx": "import foo from 'foo';\nconsole.log('hello', foo)",
};
const bundle = await compile({
  files,
  input: "/index.tsx",
});
const out = await bundle.generate({ format: "esm" });
console.log(out.output[0]);
```

## as rollup plugin usage

```ts
import { rollup } from "rollup";
import { getBaseConfig } from "uniroll";

const files = {
  "/foo.ts": "export default 1",
  "/index.tsx": 'import foo from "./foo";console.log(foo);',
};
const memfs = createMemoryFs(files);
const { plugins } = getBaseConfig({ fs: memfs });
const rolled = await rollup({
  input: "/index.tsx",
  plugins,
});
// use it as rollup modules
```

## Example: import npm modules via import-map.

```ts
import {compile} from "uniroll";
const importMap = {
  imports: {
    "preact": "https://cdn.skypack.dev/preact"
    "goober": "https://cdn.skypack.dev/goober@2"
  }
}
compile({fs, importMap})
```

```tsx
import { h, render } from "preact";
import { styled, setPragma } from "goober";

setPragma(h);

const PopupWrapper = styled("div")`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 200px;
  height: 100px;
  background-color: wheat;
`;

function Popup() {
  return <PopupWrapper>Hello!</PopupWrapper>;
}

const el = document.createElement("div");
render(<Popup value={text} />, el);
document.body.appendChild(el);
```

## CLI

Run compiler with same logics.

```bash
$ npm install uniroll-tools -g
$ uniroll foo.js -o out.js
```

TODO: Options Documentation

## How to develop

```
yarn install
yarn build
yarn test
```

## ChangeLog

### v1 => v2

TBD

- Use `typescript` compiler instead of `@babel/core` and dorp babel plugins.
- No more `useInMemory: true` option. Just take `fs` or `memfs`.
- Drop `package.json` reading. Use `importMap` [WICG/import\-maps: How to control the behavior of JavaScript imports](https://github.com/WICG/import-maps)

## TODO

- Documentation
- CSS Loader / Optimizer
- Svelte usages
- include tslib

## LICENSE

MIT

- Kotaro Chikuba ~ [@mizchi](https://twitter.com/mizchi)
