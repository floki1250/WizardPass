<template>
  <div class="min-h-screen">
    <main class="flex">
      <Drawer />
      <section class="space-y-6 text-black w-2/3 p-4 h-screen">
        <div class="flex justify-between m-2">
          <UButton variant="solid" color="gray" icon="i-heroicons-plus-20-solid" @click="isOpen = true">New Entry
          </UButton>
          <UInput color="gray" variant="outline" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid" />
        </div>
        <div class="grid grid-cols-3 gap-4 overflow-y-scroll h-5/6 p-2" v-if="data">
          <div v-for="i in data" :key="i"
            class="rounded-lg bg-white/90 backdrop-blur-xl border border-slate-200 hover:border-amber-400 transition-all ease-in-out duration-500 text-black text-center shadow-slate-300 shadow-md flex justify-center items-center w-full h-fit">
            <Account :data="i" />
          </div>
        </div>
      </section>
    </main>
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h1 class="text-xl font-bold">New Entry</h1>
        </template>
        <div class="p-2 flex justify-center items-center flex-col w-full">
          <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormGroup label="Url" name="url">
              <UInput v-model="state.url" />
            </UFormGroup>
            <UFormGroup label="Login" name="login">
              <UInput v-model="state.login" />
            </UFormGroup>
            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>
            <UButton type="submit" color="teal" variant="soft" block> Submit </UButton>
          </UForm>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import fs from "fs/promises";
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const isOpen = ref(false);

const data = ref < Array < unknown >> ([]);
onMounted(async () => {
  try {
    data.value = JSON.parse(await fs.readFile("./public/entries.json", "utf-8"));
  } catch (error: unknown) {
    console.error("Error reading file:", error);
  }
});
const schema = object({
  url: string().required('Required'),
  login: string().required('Required'),
  password: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  login: undefined,
  password: undefined,
  url: undefined,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>
