import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [deno()],
    build: {
        target: "esnext", //browsers can handle the latest ES features
    },
});
