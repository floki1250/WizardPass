<template>
    <div>
        <USlideover v-model="isOpen"
            :ui="{ overlay: { background: 'bg-gray-800/75 backdrop-blur-sm' }, background: 'bg-gray-900/20 backdrop-blur-lg', }">
            <Drawer />
        </USlideover>

        <div>

            <div class="flex  justify-between">
                <div class="pl-4 pt-6">
                    <UButton variant="ghost" @click="isOpen = true" icon="i-heroicons-bars-3-solid" size="xl" class="" />
                </div>

                <div class="p-2 flex">
                    <img src="/logo.jpeg" alt="" class="w-16 h-18">
                    <h1 class="text-3xl text-pretty text-center  text-white pt-6 pl-4">Wizard Pass</h1>
                </div>
                <div></div>
            </div>

            <slot />
        </div>
    </div>
</template>
<script setup>
const isOpen = ref(false)
</script>