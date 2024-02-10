<template>
  <div class="overflow-x-hidden overflow-y-scroll h-[500px] flex justify-center">
    <div class="shadow-1 grid grid-cols-4 gap-4 m-8  ">
      <div class="box  flex justify-center rounded-lg w-56 h-56">
        <div class="w-full flex justify-center items-center " @click="isOpen = true">
          <UIcon name="i-ph-plus" class="w-24 h-24 bg-black opacity-10"></UIcon>
        </div>
      </div>
      <div class="box  flex justify-center rounded-lg  w-56 h-56" v-for="i in data">
        <Account class="p-2" />
      </div>
    </div>
  </div>
  <div>
    <UModal v-model="isOpen">
      <UCard :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow'
        }
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Modal
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>
        <div class="h-full ">
          <UFormGroup label="URL" name="url" class="p-1">
            <UInput type="url" placeholder="https://example.com" />
          </UFormGroup>
          <UFormGroup label="Login" name="login" class="p-1">
            <UInput type="text" placeholder="Login/Email" />
          </UFormGroup>
          <UFormGroup label="Password" name="password" class="p-1">
            <UInput type="password" placeholder="Password" />
          </UFormGroup>
          <div class="p-4 w-full ">
            <UButton color="primary" block variant="solid">Submit</UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
<script setup>
const isOpen = ref(false)
const { data, pending, error, refresh } = await useFetch('/api/password')
</script>
