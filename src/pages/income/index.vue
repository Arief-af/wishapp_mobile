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
            @click="$router.push('/login')"
            class="bg-white right-6 top-6 w-12 h-12 rounded-full absolute flex justify-center items-center"
          >
            <box-icon class="fill-primary" name="exit"></box-icon>
          </div>
        </div>
        <button @click="addDataModal.showModal()" class="btn w-full mt-5">Add Income</button>
      </section>

      <dialog id="my_modal_1" ref="addDataModal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Tambahkan Income</h3>
        <form @submit.prevent="onSubmit">
          <FormInput
            v-model="data.description"
            type="text"
            placeholder="Masukan description anda"
            class="my-5"
          >
            <template #label>description*</template>
          </FormInput>

          <FormInput
            v-model="data.nominal"
            type="number"
            placeholder="Masukan nominal anda"
            class="my-5"
          >
            <template #label>nominal*</template>
          </FormInput>
          <div class="flex justify-end w-full">
            <button class="btn bg-primary text-dark hover:bg-primary hover:text-dark">Submit</button>
          </div>
        </form>
        <div class="modal-action absolute -top-1 right-5">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  
      <section class="p-5">
        <div
          v-for="item in income"
          class="relative cursor-pointer text-white flex justify-between bg-dark p-8 rounded-lg w-full mb-3"
        >
          <div>
            <div class="text-primary">{{  CapitalizeFirstLetter(item.description) }} </div>
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
  
  const addDataModal = ref(null);
  let data = ref({})
  let income = ref([]);
  let balance = ref([]);
  // Fetch initial list of wishes
  const fetchWishes = async () => {
    try {
      const respBalance = await useBalanceStore().get();
      balance.value = respBalance.data;
      const respIncome = await useAuthStore().incomeList();
      income.value = respIncome.data.data;
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
  
  const onSubmit = async () => {
    try {
      const resp = await useAuthStore().income(data.value);
      const respBalance = await useBalanceStore().get();
      balance.value = respBalance.data;
      notificationStore.showNotification(resp?.data?.message, "success");
      await fetchWishes();
      addDataModal.value.close();
    } catch (error) {
        
    }
  }
  // Fetch wishes on component mount
  fetchWishes();
  </script>
  
  
  <style lang="scss" scoped></style>
  