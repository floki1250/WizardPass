<template>
    <section class="h-screen p-4 w-1/3">
        <div
            class="flex justify-center flex-col h-full border border-white hover:border-teal-100 transition-all ease-in-out duration-500 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 awesome-shadow">
            <div class="h-full flex flex-col justify-center">
                <h1 class="text-4xl text-pretty reem-kufi text-slate-700">WizardPass</h1>
                <p class="reem-kufi opacity-40">Your password manager</p>
            </div>

            <div class="grid grid-cols-2 gap-4 h-full">
                <div
                    class="rounded-lg shadow-sm backdrop-blur-xl bg-white/30 hover:bg-teal-500 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">1</p>
                        <p class="text-md font-400 text-center text-wrap">Compromised</p>
                    </div>
                </div>
                <div
                    class="rounded-lg shadow-sm backdrop-blur-xl bg-white/30 hover:bg-teal-500 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">2</p>
                        <p class="text-md font-400 text-center text-wrap">Compromised</p>
                    </div>
                </div>
                <div class="rounded-lg shadow-sm backdrop-blur-xl bg-white/30 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">3</p>
                        <p class="text-md font-400 text-center text-wrap">Compromised</p>
                    </div>
                </div>
                <div class="rounded-lg shadow-sm backdrop-blur-xl bg-white/30 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">4</p>
                        <p class="text-md font-400 text-center text-wrap">Compromised</p>
                    </div>
                </div>
            </div>
            <div class="mt-4 p-4 h-fit flex justify-left items-center rounded-lg">
                <div class="">
                    <p class="text-xl opacity-45 reem-kufi">Generate New Password</p>
                    <UButtonGroup size="sm" orientation="horizontal">
                        <UInput icon="i-heroicons-lock-closed" placeholder="Generate New Password" />
                        <UButton icon="i-heroicons-arrow-path" color="teal" variant="soft"></UButton>
                    </UButtonGroup>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup></script>
