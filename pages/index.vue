<template>

  <div class="min-h-screen">
    <main class="flex">
      <Drawer :compromisedPwdLenght="compromisedPwdLenght" :weakPwdLenght="weakPwdLenght"
        :notweakpwdlenght="data.length - weakPwdLenght" :total="data.length" />
      <section class="space-y-6 text-black w-2/3 p-4 h-screen">
        <div class="flex justify-between m-2">
          <UButton variant="solid" color="gray" icon="i-heroicons-plus-20-solid" @click="isOpen = true">New Entry
          </UButton>
          <UInput color="gray" variant="outline" placeholder="Search..." v-model="q"
            icon="i-heroicons-magnifying-glass-20-solid" @keyup.enter="search(q)" />
        </div>
        <div class="grid grid-cols-3 gap-4 overflow-y-scroll h-5/6 p-2" v-if="data">
          <div v-for="(i, index) of search(q)" :key="index"
            class="rounded-lg bg-white/80 backdrop-blur-xl border border-slate-200 hover:border-amber-400 transition-all ease-in-out duration-500 text-black text-center shadow-slate-300 shadow-md flex justify-center items-center w-full h-fit">
            <Account :data="i" />
            <br />
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
// @ts-ignore
import type { FormSubmitEvent } from '#ui/types'

import * as crypto from "crypto";


definePageMeta({
  middleware: ["auth"],
})
const store = ref("")
store.value = useState("password", () => "").value.toString();
const encryptionKey = Buffer.from(store.value, 'utf-8');
const iv = Buffer.from('@MagicPasswordIV', 'utf-8');
const isOpen = ref(false);

const data = ref<Array<unknown>>([]);
const compromisedPwdLenght = ref(0);
const weakPwdLenght = ref(0);
onMounted(async () => {
  try {
    const fileData = await fs.readFile("./public/entries.json", "utf-8");
    data.value = (JSON.parse(fileData) as Array<unknown>).map(async (element: any) => {
      element.password = await decryptPassword(element.password);
      if (typeof element === 'object' && element !== null) {
        return {
          ...element,
          compromised: await isPasswordCompromised(element.password),
        };
      } else {
        return element;
      }
    });
    data.value = await Promise.all(data.value);
    compromisedPwdLenght.value = data.value.filter((element: any) => element.compromised).length;
    weakPwdLenght.value = data.value.filter((element: any) => element.weakness === 'Weak').length;
  } catch (error: unknown) {
    console.error("Error reading file:", error);
  }
});
const q = ref("")
function search (q: String) {
  if (q) {
    // Assuming each object in data.value has a property named 'propertyName' to search against
    return data.value.filter((el: any) => el.login.toLowerCase().includes(q.toLowerCase()) ||
      el.url.toLowerCase().includes(q.toLowerCase()));
  } else {
    return data.value;
  }
}

const schema = object({
  url: string().required('Required'),
  login: string().required('Required'),
  password: string().required('Required')
})

type Schema = InferType<typeof schema>
// @ts-ignore
const state = reactive({
  login: undefined,
  password: undefined,
  url: undefined,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  const encryptedpassword = await encryptPassword(event.data.password);
  console.log(encryptedpassword);
  data.value.push({
    url: event.data.url, login: event.data.login, password: encryptedpassword, date_created: new Date().toJSON(), date_updated: new Date().toJSON(), weakness: checkPasswordStrength(event.data.password)
  })
  console.log(event.data)
  fs.writeFile("./public/entries.json", JSON.stringify(data.value), "utf8");
  isOpen.value = false
}
function checkPasswordStrength (password: string): string {

  const minLength = 8;
  const minUppercase = 1;
  const minLowercase = 1;
  const minDigits = 1;
  const minSpecialChars = 1;
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  // Check if password meets the criteria for a strong password

  const uppercaseMatches = password?.match(/[A-Z]/g)?.length ?? 0;
  const lowercaseMatches = password?.match(/[a-z]/g)?.length ?? 0;
  const digitMatches = password?.match(/[0-9]/g)?.length ?? 0;
  const specialMatches = password?.match(specialChars)?.length ?? 0;

  if (
    password?.length >= minLength &&
    uppercaseMatches >= minUppercase &&
    lowercaseMatches >= minLowercase &&
    digitMatches >= minDigits &&
    specialMatches >= minSpecialChars
  ) {
    return "Strong";
  } else {
    return "Weak";
  }
}
async function isPasswordCompromised (password: string): Promise<Boolean> {
  const hash = await sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  try {
    /**
     * Check if a password has been compromised using the Have I Been Pwned API.
     *
     * @param {string} prefix The first 5 characters of a SHA1 hash of the password to check.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the password is compromised.
     */
    //@ts-ignore
    const { data } = await useFetch<string>(`https://api.pwnedpasswords.com/range/${prefix}`);
    // @ts-ignore
    const hashes = data?.value.split('\n').map((line: string) => line.split(':')[0]);
    return hashes.includes(suffix.toUpperCase())
  } catch (error) {
    console.error("Failed to check password using HIBP API:", error);
    return false;
  }
}

async function sha1 (input: string): Promise<string> {
  const hash = crypto.createHash('sha1');
  hash.update(input);
  const hashHex = hash.digest('hex');
  return hashHex;
}


async function encryptPassword (password: string): Promise<string> {
  const salt = '@#MAGICPASSWORDS#@'; // Salt for key derivation
  const iterations = 10000; // Number of iterations for PBKDF2
  const keyLength = 32; // Desired key length in bytes

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(encryptionKey, salt, iterations, keyLength, 'sha256', (err, derivedKey) => {
      if (err) {
        console.error('Error deriving key:', err);
        reject(err);
      } else {
        const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
        let encryptedPassword = cipher.update(password, "utf-8", "hex");
        encryptedPassword += cipher.final("hex");
        resolve(encryptedPassword);
      }
    });
  });
}
async function decryptPassword (encryptedPassword: string): Promise<string> {
  const salt = '@#MAGICPASSWORDS#@'; // Salt for key derivation
  const iterations = 10000; // Number of iterations for PBKDF2
  const keyLength = 32; // Desired key length in bytes

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(encryptionKey, salt, iterations, keyLength, 'sha256', (err, derivedKey) => {
      if (err) {
        console.error('Error deriving key:', err);
        reject(err);
      } else {
        const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
        let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
        decryptedPassword += decipher.final('utf-8');
        resolve(decryptedPassword);
      }
    });
  });
}

</script>
