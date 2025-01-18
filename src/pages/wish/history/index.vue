<template>
  <AppLayout>
    <section class="p-3">
      <div
        class="relative bg-primary rounded-lg p-5 min-h-[200px] flex justify-center items-center"
      >
        <section class="text-center">
          <div class="text-dark">Your Balance</div>
          <div class="font-bold text-2xl text-dark-cover">{{ currencyFormat(balance.nominal) }}</div>
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
          <div class="text-white text-sm">Saving</div>
        </div>
      </div>
      <div
        class="text-white rounded-xl bg-dark w-28 h-28 justify-center p-4 flex items-center"
      >
        <div class="text-center">
          <div class="block">
            <box-icon class="fill-red-700" name="line-chart-down"></box-icon>
          </div>
          <div class="text-white text-sm">Withdraw</div>
        </div>
      </div>
    </section>

    <section class="p-5">
      <div
        v-for="item in history"
        class="relative cursor-pointer text-white flex justify-between bg-dark p-8 rounded-lg w-full mb-3"
      >
        <div>
          <div :class="item.description ? 'text-red-600' : 'text-primary'">{{  CapitalizeFirstLetter(item.wish.title) }} </div>
          <div :class="item.description ? 'text-red-600' : 'text-primary'">{{  CapitalizeFirstLetter(item.date) }} </div>
          <div v-if="item.description" :class="item.description ? 'text-red-600' : 'text-red-600'">{{  CapitalizeFirstLetter(item.description) }} </div>
          <div class="text-white">{{ currencyFormat(item.nominal) }}</div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/App.vue";
import { ref } from "vue";
import { useWishStore } from "@/stores/wishStore";
import { useNotificationStore } from "@/stores/notification";
import { useAuthStore } from "@/stores/authStore";
import { useBalanceStore } from "@/stores/balanceStore";

const notificationStore = useNotificationStore();
const wishStore = useWishStore();
const authStore = useAuthStore();
const logout = () => {
  authStore.clearState();
}
let history = ref([]);
let balance = ref([]);
// Fetch initial list of wishes
const fetchWishes = async () => {
  try {
    const respHistory = await useAuthStore().history();
    history.value = respHistory.data.data;
    const respBalance = await useBalanceStore().get();
    balance.value = respBalance.data;
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
  }
};

const currencyFormat = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

const CapitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};


// Fetch wishes on component mount
fetchWishes();
</script>


<style lang="scss" scoped></style>
