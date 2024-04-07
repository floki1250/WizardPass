<template>
  <div class="min-h-screen">
    <main class="flex">
      <Drawer />
      <section class="col-span-2 space-y-6 text-black w-2/3 p-4 h-screen overflow-y-scroll">
        <div class="flex justify-end">
          <UInput color="gray" variant="outline" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="i in 10" :key="i"
            class="rounded-lg bg-white/70 backdrop-blur-xl border border-slate-200 hover:border-amber-400 transition-all ease-in-out duration-500 text-black text-center shadow-slate-300 shadow-md flex justify-center items-center w-full">
            <Account />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
const { data, pending, error, refresh } = await useFetch("/api/password");
</script>
