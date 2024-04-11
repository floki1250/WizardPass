<template>
  <div class="min-h-screen">
    <main class="flex">
      <Drawer />
      <section class="space-y-6 text-black w-2/3 p-4 h-screen">
        <div class="flex justify-between">
          <UButton variant="solid" color="gray" icon="i-heroicons-plus-20-solid">Create New Entry</UButton>
          <UButton variant="solid" color="gray" icon="i-heroicons-plus-20-solid" @click="refresh()">Refresh</UButton>
          <UInput color="gray" variant="outline" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid" />
        </div>
        <div class="grid grid-cols-3 gap-4 overflow-y-scroll h-5/6">
          <div v-for="i in data" :key="i"
            class="rounded-lg bg-white/90 backdrop-blur-xl border border-slate-200 hover:border-amber-400 transition-all ease-in-out duration-500 text-black text-center shadow-slate-300 shadow-md flex justify-center items-center w-full h-fit">
            <Account :data="i" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
const { data, pending, error, refresh } = await useFetch("/entries.json");
</script>
