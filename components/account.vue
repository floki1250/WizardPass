<template>
    <div class="[perspective:1000px] min-w-[200px] min-h-[250px] p-4 h-full w-full">
        <div class="card-inner w-full" :class="{ flipped: isFlipped }">
            <div class="card-front w-full">
                <div class="flex justify-between text-center text-black w-full">
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/739984?v=4" class="w-10 h-10 rounded-full" />
                    </div>
                    <div>
                        <h6 class="font-bold">Front</h6>
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
                        <UInput color="white" variant="outline" placeholder="Login" class="p-2" disabled block />
                        <UInput color="white" variant="outline" placeholder="Password" type="password" class="p-2"
                            disabled />
                    </div>
                    <UButton class="m-2" color="white" variant="solid" block icon="i-ph-arrow-square-in-duotone">Open In
                        Browser</UButton>
                </div>
            </div>

            <div class="card-back w-full">
                <div class="flex text-center text-black w-full justify-between">
                    <div>
                        <h6 class="font-bold">Back</h6>
                    </div>
                    <div>
                        <button @click="flipCard()">
                            <UIcon name="i-heroicons-ellipsis-vertical-16-solid" />
                        </button>
                    </div>
                </div>
                <hr class="w-full m-2" />
                <div class="flex justify-center items-center content-center flex-col w-full">
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

const flipCard = () => {
    isFlipped.value = !isFlipped.value;
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
