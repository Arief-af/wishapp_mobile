<template>
  <AppLayout>
    <section class="p-3">
      <div
        class="relative bg-primary rounded-lg p-5 min-h-[200px] flex justify-center items-center"
      >
        <section class="text-center">
          <div class="text-dark">Hai, {{ data.username }}, Your Balance</div>
          <div class="font-bold text-2xl text-dark-cover">IDR 1,000,000</div>
        </section>
        <div
          @click="logout"
          class="bg-white right-6 top-6 w-12 h-12 rounded-full absolute flex justify-center items-center"
        >
          <box-icon class="fill-primary" name="exit"></box-icon>
        </div>
      </div>
    </section>

    <section class="mt-5 flex justify-center items-center gap-5">
      <div
        class="text-white rounded-xl bg-dark w-28 h-28 justify-center p-4 flex items-center"
      >
        <div class="text-center">
          <div class="block">
            <box-icon class="fill-primary" name="line-chart"></box-icon>
          </div>
          <div class="text-white text-sm">Spend</div>
        </div>
      </div>
      <div
        class="text-white rounded-xl bg-dark w-28 h-28 justify-center p-4 flex items-center"
      >
        <div class="text-center">
          <div class="block">
            <box-icon class="fill-red-700" name="line-chart-down"></box-icon>
          </div>
          <div class="text-white text-sm">Spend</div>
        </div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const data = ref(JSON.parse(localStorage.getItem("profile")));
console.log(data.value);
const router = useRouter();
const logout = () => {
  localStorage.removeItem("data");
  router.push("/login");
}
</script>

<style lang="scss" scoped></style>
