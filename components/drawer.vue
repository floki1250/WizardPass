<template>
    <section class="col-span-1 h-screen p-4 w-1/3">
        <div class="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl h-full p-6 text-slate-900 awesome-shadow">
            <div class="items-center">
                <div>
                    <img src="/logo.png" alt="" />
                </div>

                <div>
                    <h1 class="text-3xl text-pretty text-center pt-6 pl-4">WizardPass</h1>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div v-for="i in 4" :key="i">
                    <div
                        class="rounded-lg shadow-sm backdrop-blur-xl bg-white/30 hover:bg-teal-500 h-24 flex justify-center items-center">
                        <div>
                            <p class="text-2xl font-bold text-center text-wrap">56</p>
                            <p class="text-md font-400 text-center text-wrap">Compromised</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <UInput></UInput>
                <UButton> Generate new password</UButton>
            </div>
        </div>
    </section>
</template>
<script setup>
const links = [
    {
        label: "Home",
        icon: "i-ph-house-duotone",
        to: "/",
    },
    {
        label: "Password Generator",
        icon: "i-ph-magic-wand-duotone",
        to: "/passwordGenerator",
    },
    {
        label: "Settings",
        icon: "i-ph-gear-duotone",
        to: "/settings",
    },
];
</script>
