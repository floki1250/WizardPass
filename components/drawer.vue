<template>
    <section class="h-screen p-4 w-1/3">
        <div
            class="flex justify-center flex-col h-full border border-slate-200 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 awesome-shadow">
            <div class="h-full flex flex-col justify-center">
                <h1 class="text-4xl text-pretty reem-kufi text-slate-700">WizardPass</h1>
                <p class="reem-kufi opacity-40">Your password manager</p>
            </div>

            <div class="grid grid-cols-2 gap-4 h-full">
                <div
                    class="rounded-lg shadow-sm border border-white hover:border-teal-400 transition-all ease-in-out duration-500 backdrop-blur-xl bg-white/30 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">{{ compromisedPwdLenght ?
                            compromisedPwdLenght : 0 }}</p>
                        <p class="text-xs font-400 text-center text-wrap">Compromised Passwords</p>
                    </div>
                </div>
                <div
                    class="rounded-lg shadow-sm border border-white hover:border-teal-400 transition-all ease-in-out duration-500 backdrop-blur-xl bg-white/30 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">{{ total ? total : 0 }}</p>
                        <p class="text-xs font-400 text-center text-wrap">Total Entries</p>
                    </div>
                </div>
                <div
                    class="rounded-lg shadow-sm border border-white hover:border-teal-400 transition-all ease-in-out duration-500 backdrop-blur-xl bg-white/30 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">{{ weakPwdLenght ? weakPwdLenght : 0 }}</p>
                        <p class="text-xs font-400 text-center text-wrap">Weak Passwords</p>
                    </div>
                </div>
                <div
                    class="rounded-lg shadow-sm border border-white hover:border-teal-400 transition-all ease-in-out duration-500 backdrop-blur-xl bg-white/30 h-24 flex justify-center items-center">
                    <div>
                        <p class="text-2xl font-bold text-center text-wrap">{{ notweakPwdLenght ? notweakPwdLenght : 0
                            }}
                        </p>
                        <p class="text-xs font-400 text-center text-wrap">Strong Passwords</p>
                    </div>
                </div>
            </div>
            <div class="mt-4 p-4 h-fit flex justify-center items-center rounded-lg bg-white border-slate-100 shadow-sm">
                <div class="w-full flex justify-center flex-col">
                    <p class="text-md opacity-75 reem-kufi my-2">Generate New Password</p>
                    <UButtonGroup size="sm" orientation="horizontal" class="w-full">
                        <UButton icon="i-heroicons-arrow-path" color="teal" variant="soft"
                            @click="password = generateStrongPassword(12)"></UButton>
                        <UInput icon="i-heroicons-lock-closed" placeholder="Generate New Password"
                            class="w-full font-bold" v-model="password" />
                        <UButton icon="i-heroicons-clipboard" color="teal" variant="soft" @click="copy(password)">
                        </UButton>
                    </UButtonGroup>
                </div>
            </div>
            <div class="mt-4">
                <UButton color="gray" variant="soft" @click="openSettings = true" icon="i-heroicons-cog" size="xl">
                    Settings
                </UButton>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">

import { useClipboard } from "@vueuse/core";
import { ref, onMounted } from "vue";
const toast = useToast();
const password = ref("");
const openSettings = ref(false);
defineProps<{
    compromisedPwdLenght?: Number | 0,
    weakPwdLenght?: Number | 0,
    notweakPwdLenght?: Number | 0,
    total?: Number | 0
}>()

// @ts-ignore
const { text, copy, copied, isSupported } = useClipboard({ password });
onMounted(async () => {
    try {
        password.value = generateStrongPassword(12);
    } catch (error: unknown) {
        console.error("Error :", error);
    }
});
watch(copied, async (newValcopied, oldValcopied) => {
    if (newValcopied) {
        toast.add({
            id: "Copied",
            title: "Password Copied",
            icon: "i-heroicons-check-circle",
        });
    }
});
function generateStrongPassword (length: number) {
    var charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    var password = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
</script>
