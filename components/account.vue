<template>
  <div class="[perspective:1000px] min-w-[200px] min-h-[250px] p-4 h-full w-full">
    <div class="card-inner w-full" :class="{ flipped: isFlipped }">
      <div class="card-front w-full">
        <div class="flex justify-between text-center text-black w-full">
          <div>
            <UAvatar size="xs" :src="getIcon(data.url)" :alt="extractDomain(data.url)?.toUpperCase()"
              class="opacity-80 " />
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
        <br>
        <div class="flex justify-center items-center content-center flex-col w-full">
          <div class="flex-1 w-full">
            <UButtonGroup orientation="horizontal" class="w-full my-1">
              <UInput color="white" variant="outline" placeholder="Login" readonly block :value="data.login"
                class="w-full" />
              <UButton color="white" icon="i-heroicons-clipboard-document" @click="copy(data.login)" />
            </UButtonGroup>

            <UButtonGroup orientation="horizontal" class="w-full my-1">
              <UInput color="white" placeholder="Password" readonly class="w-full" :model-value="data.password"
                :type="showpassword ? 'text' : 'password'" :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                  <UButton class="opacity-40" icon="i-heroicons-eye" square @click="showpassword = !showpassword"
                    variant="ghost" color="white" size="sm" :ui="{ rounded: 'rounded-full' }" />
                </template>
              </UInput>
              <UButton color="white" icon="i-heroicons-clipboard-document" @click="copy(data.password)" />
            </UButtonGroup>
          </div>
          <!--  <UButton variant="outline" class="m-2" color="teal" block icon="i-ph-arrow-square-in-duotone" :to="data.url"
            target="_blank">
            Open In Browser
          </UButton> -->

          <br>
        </div>
        <div class="flex justify-between w-full my-1">
          <UBadge :ui="{ rounded: 'rounded-full' }" variant="outline"
            :color="data.weakness == 'Strong' ? 'teal' : 'amber'">
            {{ data.weakness }}
          </UBadge>
          <UBadge :ui="{ rounded: 'rounded-full' }" variant="outline" color="red">
            {{ data.compromised ? "Compromised" : "Safe" }}
          </UBadge>
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
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";
const isFlipped = ref(false);
const props = defineProps(["data"]);
const source = ref("");
// @ts-ignore
const { copy, copied } = useClipboard({ source });
const showpassword = ref(false);
const toast = useToast();
watch(copied, async (newValcopied, oldValcopied) => {
  if (newValcopied) {
    toast.add({
      id: "Copied",
      title: "Copied",
      icon: "i-heroicons-check-circle",
    });
  }
});

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};
function extractDomain (url: string): string {
  // Remove protocol (http://, https://) if present
  let domain = url
    ?.replace(/(^\w+:|^)\/\//, "")
    .split("/")[0]
    .split(".")[1];
  return domain;
}
function getIcon (url: string): Object {
  const name = extractDomain(url);
  return `https://api.iconify.design/bxl:${name}.svg`;
}
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
