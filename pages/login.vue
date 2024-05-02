<template>
    <div class="absolute t w-full h-full flex justify-center items-center flex-col  rounded-xl">
        <div class="bg-white/50 flex justify-center items-center flex-col p-8 rounded-xl shadow-lg border border-white">
            <UIcon name="i-heroicons-lock-closed" class="w-20 h-20 mb-1 text-black/50" />
            <p class="text-2xl font-bold mb-4 font-mono text-black/50">Locked,Enter Your Main Password</p>

            <UInput color="white" placeholder="Main Password" :type="showpassword ? 'text' : 'password'"
                v-model="password" :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                    <UButton class="opacity-40" icon="i-heroicons-eye" @click="showpassword = !showpassword"
                        variant="ghost" color="white" size="sm" :ui="{ rounded: 'rounded-full' }" />
                </template>
            </UInput>

            <UButton class="mt-4  text-center" icon="i-heroicons-lock-open" size="xl" color="teal" variant="ghost"
                @click="unblock()">
                Unlock</UButton>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import fs from "fs/promises";
import * as crypto from "crypto";
const showpassword = ref(false)
const password = ref("")
const toast = useToast();
async function unblock () {
    let fileData: any;
    try {
        fileData = await fs.readFile("./public/entries.json", "utf-8");
        fileData = JSON.parse(fileData)
    } catch (error) {
        console.error("Error reading file:", error);
    }
    try {
        const verifyKey = await decryptPassword(fileData[0].password);
        const store = useState("password", () => password.value);

        navigateTo("/");
    } catch (error) {
        console.error("Error Password:", error);
    }

}
async function decryptPassword (encryptedPassword: string): Promise<string> {
    const salt = '@#MAGICPASSWORDS#@'; // Salt for key derivation
    const iterations = 10000; // Number of iterations for PBKDF2
    const keyLength = 32; // Desired key length in bytes
    const iv = Buffer.from('@MagicPasswordIV', 'utf-8');
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password.value, salt, iterations, keyLength, 'sha256', (err, derivedKey) => {
            if (err) {
                console.error('Error deriving key:', err);
                reject(err);
            } else {
                try {
                    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
                    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
                    decryptedPassword += decipher.final('utf-8');
                    resolve(decryptedPassword);
                } catch (error) {
                    toast.add({
                        id: "Error",
                        title: "Error",
                        icon: "i-heroicons-x-circle",
                        color: "red",
                        description: "Wrong Password !",
                    });
                }
            }
        });
    });
}
</script>