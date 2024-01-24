<template>
  <div class="overflow-x-hidden overflow-y-scroll h-[500px] flex justify-center">
    <div class="shadow-1 grid grid-cols-4 gap-4 m-8  ">
      <div class="box  flex justify-center rounded-lg w-56 h-56">
        <div class="w-full flex justify-center items-center text-">
          <UIcon name="i-ph-plus" class="w-24 h-24 bg-black opacity-10"></UIcon>
        </div>
      </div>
      <div class="box  flex justify-center rounded-lg  w-56 h-56" v-for="i in 10">
        <Account class="p-2" />
      </div>
    </div>
  </div>
</template>
