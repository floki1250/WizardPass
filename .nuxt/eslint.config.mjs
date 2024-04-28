// ESLint config generated by Nuxt
/// <reference path="./eslint-typegen.d.ts" />

import { composer } from '../node_modules/.pnpm/eslint-flat-config-utils@0.2.3/node_modules/eslint-flat-config-utils/dist/index.mjs';
import typegen from '../node_modules/.pnpm/eslint-typegen@0.2.4_eslint@8.57.0/node_modules/eslint-typegen/dist/index.mjs';
import { createConfigForNuxt, defineFlatConfigs, resolveOptions } from '../node_modules/.pnpm/@nuxt+eslint-config@0.3.9_eslint@8.57.0_typescript@5.3.3/node_modules/@nuxt/eslint-config/dist/flat.mjs';

export { defineFlatConfigs }

export const configs = composer()

export const options = resolveOptions({
  "features": {
    "standalone": true
  },
  "dirs": {
    "pages": [
      "pages"
    ],
    "composables": [
      "composables",
      "utils"
    ],
    "components": [
      "components"
    ],
    "layouts": [
      "layouts"
    ],
    "plugins": [
      "plugins"
    ],
    "middleware": [
      "middleware"
    ],
    "modules": [
      "modules"
    ],
    "servers": [],
    "root": [
      "C:/Users/Mega-PC/Desktop/WizardPass"
    ],
    "src": [
      ""
    ]
  }
})

configs.append(
// Nuxt Configs
createConfigForNuxt(options),

// Set globals from imports registry
{"name":"nuxt/import-globals","languageOptions":{"globals":{"isVue2":"readonly","isVue3":"readonly","defineNuxtLink":"readonly","useNuxtApp":"readonly","defineNuxtPlugin":"readonly","definePayloadPlugin":"readonly","useRuntimeConfig":"readonly","defineAppConfig":"readonly","requestIdleCallback":"readonly","cancelIdleCallback":"readonly","useAppConfig":"readonly","updateAppConfig":"readonly","defineNuxtComponent":"readonly","useAsyncData":"readonly","useLazyAsyncData":"readonly","useNuxtData":"readonly","refreshNuxtData":"readonly","clearNuxtData":"readonly","useHydration":"readonly","callOnce":"readonly","useState":"readonly","clearNuxtState":"readonly","clearError":"readonly","createError":"readonly","isNuxtError":"readonly","showError":"readonly","useError":"readonly","useFetch":"readonly","useLazyFetch":"readonly","useCookie":"readonly","prerenderRoutes":"readonly","useRequestHeader":"readonly","useRequestHeaders":"readonly","useRequestEvent":"readonly","useRequestFetch":"readonly","setResponseStatus":"readonly","onNuxtReady":"readonly","preloadComponents":"readonly","prefetchComponents":"readonly","preloadRouteComponents":"readonly","abortNavigation":"readonly","addRouteMiddleware":"readonly","defineNuxtRouteMiddleware":"readonly","setPageLayout":"readonly","navigateTo":"readonly","useRoute":"readonly","useRouter":"readonly","isPrerendered":"readonly","loadPayload":"readonly","preloadPayload":"readonly","definePayloadReducer":"readonly","definePayloadReviver":"readonly","useLoadingIndicator":"readonly","getAppManifest":"readonly","getRouteRules":"readonly","reloadNuxtApp":"readonly","useRequestURL":"readonly","onBeforeRouteLeave":"readonly","onBeforeRouteUpdate":"readonly","withCtx":"readonly","withDirectives":"readonly","withKeys":"readonly","withMemo":"readonly","withModifiers":"readonly","withScopeId":"readonly","onActivated":"readonly","onBeforeMount":"readonly","onBeforeUnmount":"readonly","onBeforeUpdate":"readonly","onDeactivated":"readonly","onErrorCaptured":"readonly","onMounted":"readonly","onRenderTracked":"readonly","onRenderTriggered":"readonly","onServerPrefetch":"readonly","onUnmounted":"readonly","onUpdated":"readonly","computed":"readonly","customRef":"readonly","isProxy":"readonly","isReactive":"readonly","isReadonly":"readonly","isRef":"readonly","markRaw":"readonly","proxyRefs":"readonly","reactive":"readonly","readonly":"readonly","ref":"readonly","shallowReactive":"readonly","shallowReadonly":"readonly","shallowRef":"readonly","toRaw":"readonly","toRef":"readonly","toRefs":"readonly","triggerRef":"readonly","unref":"readonly","watch":"readonly","watchEffect":"readonly","watchPostEffect":"readonly","watchSyncEffect":"readonly","isShallow":"readonly","effect":"readonly","effectScope":"readonly","getCurrentScope":"readonly","onScopeDispose":"readonly","defineComponent":"readonly","defineAsyncComponent":"readonly","resolveComponent":"readonly","getCurrentInstance":"readonly","h":"readonly","inject":"readonly","hasInjectionContext":"readonly","nextTick":"readonly","provide":"readonly","defineModel":"readonly","defineOptions":"readonly","defineSlots":"readonly","mergeModels":"readonly","toValue":"readonly","useModel":"readonly","useAttrs":"readonly","useCssModule":"readonly","useCssVars":"readonly","useSlots":"readonly","useTransitionState":"readonly","Component":"readonly","ComponentPublicInstance":"readonly","ComputedRef":"readonly","ExtractPropTypes":"readonly","ExtractPublicPropTypes":"readonly","InjectionKey":"readonly","PropType":"readonly","Ref":"readonly","MaybeRef":"readonly","MaybeRefOrGetter":"readonly","VNode":"readonly","injectHead":"readonly","useHead":"readonly","useSeoMeta":"readonly","useHeadSafe":"readonly","useServerHead":"readonly","useServerSeoMeta":"readonly","useServerHeadSafe":"readonly","defineShortcuts":"readonly","useProvideButtonGroup":"readonly","useInjectButtonGroup":"readonly","useCopyToClipboard":"readonly","useFormGroup":"readonly","createPopper":"readonly","usePopper":"readonly","_useShortcuts":"readonly","useShortcuts":"readonly","useTimer":"readonly","useToast":"readonly","useUI":"readonly","useColorMode":"readonly","useNuxtDevTools":"readonly","definePageMeta":"readonly","useLink":"readonly"}}}
)

export function withNuxt(...customs) {
  return configs
    .clone()
    .append(...customs)
    .onResolved(configs => typegen(configs, { dtsPath: new URL("./eslint-typegen.d.ts", import.meta.url), augmentFlatConfigUtils: true }))
}

export default withNuxt