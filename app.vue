<template>
  <NuxtLayout>
    <div class="relative lg:block">
      <div
        class="blur-blob absolute top-20 left-20 md:top-20 md:left-16 lg:top-20 lg:left-16 bg-teal-200 dark:bg-teal-500 w-60 h-60 md:w-80 md:h-80 sm:w-60 sm:h-60 lg:w-96 lg:h-96">
      </div>
      <div
        class="blur-blob absolute top-96 left-16 md:top-20 md:left-2/3 lg:top-20 lg:left-2/3 bg-amber-200 dark:bg-rose-800 w-60 h-60 md:w-80 md:h-80 sm:w-60 sm:h-60 lg:w-96 lg:h-96">
      </div>
    </div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
<script>

</script>
