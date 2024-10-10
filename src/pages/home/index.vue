<template>
  <AppLayout>
    <section class="p-3">
      <div
        class="bg-primary rounded-lg p-5 min-h-[200px] flex justify-center items-center"
      >
        <div class="font-bold text-2xl text-dark-cover">
            IDR 1,000,000
        </div>
      </div>
    </section>
    
    <section class="mt-5 flex justify-center items-center  gap-5">
        <div class="text-white bg-dark w-28 h-28 justify-center p-4 flex items-center">
            Income
        </div>
        <div class="text-white bg-dark w-28 h-28 justify-center p-4 flex items-center">
            Spend
        </div>
    </section>

    <section class="p-5">
      <div class="text-lg text-white font-light mb-5">Your Wish</div>
      <div v-for="i in 3" class="text-white bg-dark p-8 rounded-lg w-full mb-3">
        <div class="text-primary">IDR 2,000,000</div>
        <div class="text-white">12 Oktober 2024</div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/App.vue";
</script>

<style lang="scss" scoped></style>
