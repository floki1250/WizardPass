// ignore
export default defineNuxtConfig({
  modules: ["nuxt-electron", "@nuxt/ui", "@nuxtjs/color-mode"],
  css: ["assets/css/main.scss"],
  colorMode: {
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
  },
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: "electron/main.ts",
      },
    ],
    renderer: {},
  },
  ui: {
    icons: ["ph", "bxl"],
  },
});
