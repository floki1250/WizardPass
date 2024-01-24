import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "../../node_modules/.pnpm/nuxt@3.9.1_vite@5.0.11/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}