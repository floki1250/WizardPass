<template>
    <div class="[perspective:1000px] min-w-[200px] min-h-[250px] p-4 h-full w-full">
        <div class="card-inner w-full" :class="{ flipped: isFlipped }">
            <div class="card-front w-full">
                <div class="flex justify-between text-center text-black w-full">
                    <div>
                        <UAvatar size="sm" :src="`https://www.google.com/s2/favicons?domain=${data.url}`"
                            alt="example.com" />
                    </div>
                    <div>
                        <h6 class="font-bold">{{ extractDomain(data.url) }}</h6>
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
                            <UInput color="white" variant="outline" placeholder="Login" readonly block
                                :value="data.login" class="w-full" />
                            <UButton color="white" icon="i-heroicons-clipboard-document" />
                        </UButtonGroup>

                        <UButtonGroup orientation="horizontal" class="w-full my-1">
                            <UInput color="white" placeholder="Password" readonly class="w-full"
                                :model-value="data.password" type="text" />
                            <UButton color="white" icon="i-heroicons-clipboard-document" />
                        </UButtonGroup>
                    </div>
                    <UButton variant="outline" class="m-2" color="teal" block icon="i-ph-arrow-square-in-duotone">Open
                        In Browser</UButton>
                </div>
            </div>

            <div class="card-back w-full">
                <div class="flex text-center text-black w-full justify-between">
                    <div>
                        <h6 class="font-bold">{{ extractDomain(data.url) }}</h6>
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

<script setup>
const isFlipped = ref(false);
const props = defineProps(["data"]);
const flipCard = () => {
    isFlipped.value = !isFlipped.value;
};
function extractDomain (url) {
    // Remove protocol (http://, https://) if present
    let domain = url.replace(/(^\w+:|^)\/\//, "");

    // Remove path and query parameters
    domain = domain.split("/")[0];

    return domain;
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
