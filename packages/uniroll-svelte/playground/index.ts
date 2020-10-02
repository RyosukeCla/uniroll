import "regenerator-runtime";
import { compile } from "../src";

const appCode = `import App from './app.svelte';
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
`;

const svelteTsCode = `
<script lang="ts">
  export let name: string;
  export let counter: number = 0;
  setInterval(() => counter++, 1000);
</script>
<style>
  span {
    display: grid;
    place-items: center;
    color: red;
  }
</style>
<main>
  <span>Hello {name} {counter}</span>
</main>
`;

(async () => {
  const files = {
    "/index.tsx": appCode,
    "/app.svelte": svelteTsCode,
  };
  const rolled = await compile({
    files,
    input: "/index.tsx",
    importmaps: {
      imports: {
        "svelte/internal":
          "https://cdn.skypack.dev/-/svelte@v3.29.0-f16TxK8jvl5AwEZa88Ws/dist=es2020/svelte/internal.js",
      },
    },
  });
  const out = await rolled.generate({
    file: "index.js",
    format: "iife",
    name: "playground",
  });
  const code = out.output[0].code;
  eval(code);
})().catch((err) => {
  console.error(err);
});
