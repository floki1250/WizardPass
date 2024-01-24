// ignore
export default defineNuxtConfig({
  modules: ["nuxt-electron", "@nuxt/ui", "@nuxtjs/color-mode"],
  css: ["assets/css/main.css"],
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
    icons: ["ph"],
  },
});
