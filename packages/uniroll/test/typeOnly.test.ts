import "isomorphic-unfetch";
import { bundle } from "../src/bundle";

test("build", async () => {
  const warned = [];
  const files = {
    "/foo.ts": "export type Foo = any;",
    "/index.tsx": "import type { Foo }  from './foo'; console.log(1 as Foo);",
  };

  const bundled = await bundle({
    files,
    input: "/index.tsx",
    rollupOptions: {
      onwarn(warnings, defaultHandler) {
        warned.push(warnings);
        defaultHandler(warnings);
      },
    },
  });
  expect(warned.length).toBe(0);
  const out = await bundled.generate({ format: "es" });
  console.log(out.output[0].code);
  expect(out.output[0]).toMatchSnapshot();
});

test("build", async () => {
  const warned = [];
  const files = {
    "/foo.ts": "export type Foo = any; const x = 1;",
    "/index.tsx": "import { Foo, x }  from './foo'; console.log(x as Foo);",
  };

  const bundled = await bundle({
    files,
    input: "/index.tsx",
    rollupOptions: {
      onwarn(warnings, defaultHandler) {
        warned.push(warnings);
        defaultHandler(warnings);
      },
    },
  });
  expect(warned.length).toBe(0);
  const out = await bundled.generate({ format: "es" });
  console.log(out.output[0].code);
  expect(out.output[0]).toMatchSnapshot();
});
