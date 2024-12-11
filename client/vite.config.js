import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "_redirects", // Path to your `_redirects` file
          dest: "", // Copies to the root of the `dist` folder
        },
      ],
    }),
  ],
});
