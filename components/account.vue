<template>
  <div class="[perspective:1000px] min-w-[200px] min-h-[250px] p-4 h-full w-full">
    <div class="card-inner w-full" :class="{ flipped: isFlipped }">
      <div class="card-front w-full">
        <div class="flex justify-between text-center text-black w-full">
          <div>
            <UAvatar size="sm" :src="getIcon(data.url).img" :alt="extractDomain(data.url).toUpperCase()"
              class="opacity-80" />
          </div>

          <div>
            <h6 class="font-bold text-sm opacity-60 text-wrap capitalize">
              {{ extractDomain(data.url) }}
            </h6>
          </div>
          <div>
            <button @click="flipCard()">
              <UIcon name="i-heroicons-ellipsis-vertical-16-solid" />
            </button>
          </div>
        </div>
        <hr class="w-full m-2" />
        <div class="flex justify-center items-center content-center flex-col w-full">
          <div class="flex-1 w-full">
            <UButtonGroup orientation="horizontal" class="w-full my-1">
              <UInput color="white" variant="outline" placeholder="Login" readonly block :value="data.login"
                class="w-full" />
              <UButton color="white" icon="i-heroicons-clipboard-document" />
            </UButtonGroup>

            <UButtonGroup orientation="horizontal" class="w-full my-1">
              <UInput color="white" placeholder="Password" readonly class="w-full" :model-value="data.password"
                type="text" />
              <UButton color="white" icon="i-heroicons-clipboard-document" />
            </UButtonGroup>
          </div>
          <UButton variant="soft" class="m-2" color="teal" block icon="i-ph-arrow-square-in-duotone">Open In Browser
          </UButton>
        </div>
        <div class="flex justify-start items-end w-full my-1">
          <UBadge :ui="{ rounded: 'rounded-full' }" variant="outline"
            :color="checkPasswordStrength(data.password) === 'Strong' ? 'teal' : 'amber'">{{
              checkPasswordStrength(data.password)
            }}</UBadge>
          <UBadge :ui="{ rounded: 'rounded-full' }" variant="outline" color="red">{{
            isPasswordCompromised(data.password)
          }}</UBadge>
        </div>
      </div>

      <div class="card-back w-full">
        <div class="flex text-center text-black w-full justify-between">
          <div>
            <h6 class="font-bold capitalize">{{ extractDomain(data.url) }}</h6>
          </div>
          <div>
            <button @click="flipCard()">
              <UIcon name="i-heroicons-ellipsis-vertical-16-solid" />
            </button>
          </div>
        </div>
        <hr class="w-full m-2" />
        <div class="flex justify-center items-center content-center flex-col w-full">
          <span class="text-left text-sm text-black/50">
            Date Updated : {{ data.date_updated }}
          </span>
          <span class="text-left text-sm text-black/50">
            Date Created : {{ data.date_created }}
          </span>
          <UButton class="m-2" color="amber" variant="outline" block icon="i-ph-note-pencil-duotone">Edit
          </UButton>
          <UButton class="m-2" color="red" variant="outline" block icon="i-ph-trash-duotone">Delete</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isFlipped = ref(false);
const props = defineProps(["data"]);
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};
function extractDomain (url: string): string {
  // Remove protocol (http://, https://) if present
  let domain = url.replace(/(^\w+:|^)\/\//, "");

  // Remove path and query parameters
  domain = domain.split("/")[0];
  domain = domain.split(".")[1];
  return domain;
}
function getIcon (url: string): Object {
  const name = extractDomain(url);
  console.log("i-bxl-" + name);
  return { img: `https://api.iconify.design/bxl:${name}.svg`, icon: "i-bxl-" + name };
}
function checkPasswordStrength (password: string): string {
  // Define criteria for a strong password
  const minLength = 8;
  const minUppercase = 1;
  const minLowercase = 1;
  const minDigits = 1;
  const minSpecialChars = 1;
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  // Check if password meets the criteria for a strong password
  if (
    password.length >= minLength &&
    password.match(/[A-Z]/g)?.length >= minUppercase &&
    password.match(/[a-z]/g)?.length >= minLowercase &&
    password.match(/[0-9]/g)?.length >= minDigits &&
    password.match(specialChars)?.length >= minSpecialChars
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
    const { data } = await useFetch < string > (`https://api.pwnedpasswords.com/range/${prefix}`);

    const hashes = data.value.split('\n').map(line => line.split(':')[0]);
    console.log(hashes.includes(suffix.toUpperCase()));
    return hashes.includes(suffix.toUpperCase())
  } catch (error) {
    console.error("Failed to check password using HIBP API:", error);
    return false;
  }
}

async function sha1 (input: string): Promise<string> {
  const buffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}
let result = null;

const checkPassword = async () => {
  result = await isPasswordCompromised(password);
};
</script>

<style scoped>
.card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;

  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
