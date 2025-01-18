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

    <!-- <section class="mt-5 flex justify-center items-center gap-5">
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
    </section> -->

    <dialog id="my_modal_1" ref="addDataModal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add New Wish!</h3>
        <form @submit.prevent="onSubmit">
          <FormInput
            v-model="data.title"
            type="text"
            placeholder="Masukan wish anda"
            class="my-5"
          >
            <template #label>Name*</template>
          </FormInput>
        
          <FormInput
            v-model="data.start_date"
            type="date"
            placeholder="Kapan anda mulai menabung?"
            class="my-5"
          >
            <template #label>Start date*</template>
          </FormInput>

          <FormInput
            v-model="data.target_date"
            type="date"
            placeholder="Kapan target terkumpul"
            class="my-5"
          >
            <template #label>Target date*</template>
          </FormInput>


          <FormInput
            v-model="data.nominal_target"
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

    <dialog id="my_modal_2" ref="editDataModal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Edit Wish!</h3>
        <form @submit.prevent="onUpdate">
          <FormInput
            v-model="data.title"
            type="text"
            placeholder="Masukan wish anda"
            class="my-5"
          >
            <template #label>Name*</template>
          </FormInput>
          <FormInput
            v-model="data.nominal_target"
            type="number"
            placeholder="Masukan nominal anda"
            class="my-5"
          >
            <template #label>nominal*</template>
          </FormInput>

          <FormInput
            v-model="data.start_date"
            type="date"
            placeholder="Kapan anda mulai menabung?"
            class="my-5"
          >
            <template #label>Start date*</template>
          </FormInput>

          <FormInput
            v-model="data.target_date"
            type="date"
            placeholder="Kapan target terkumpul"
            class="my-5"
          >
            <template #label>Target date*</template>
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
      <div class="flex mb-5 items-center justify-between">
        <div class="text-lg text-white font-light mb-5">Your Wish</div>
        <button
          class="btn bg-primary text-dark hover:bg-primary hover:text-dark"
          onclick="my_modal_1.showModal()"
        >
          Add WIsh
        </button>
      </div>
      <div
        v-for="item in wishes"
        @click="$router.push(`/wish/detail/${item.id}`)"
        class="relative cursor-pointer text-white flex justify-between bg-dark p-8 rounded-lg w-full mb-3"
      >
        <div>
          <div class="text-primary">{{  CapitalizeFirstLetter(item.title) }} </div>
          <div class="text-white">{{ currencyFormat(item.nominal_target) }}</div>
        </div>
        <div class="flex gap-2 flex-col">
          <div @click.stop="onEdit(item.id)" class="btn btn-error">Edit</div>
          <div
            @click.stop="onDelete(item.id)"
            class="btn bg-primary text-dark hover:bg-primary hover:text-dark"
          >
            delete
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/App.vue";
import { ref } from "vue";
import axios from "axios";
import { useWishStore } from "../../stores/wishStore";
import { useBalanceStore } from "../../stores/balanceStore";
import { useNotificationStore } from "../../stores/notification";
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();

const logout = () => {
  authStore.clearState();
}

const notificationStore = useNotificationStore();
const wishStore = useWishStore();
let data = ref({});
let wishes = ref([]);
let addDataModal = ref(null);
let editDataModal = ref(null);
let ID_FOR_UPDATE = ref(null);

let balance = ref([]);

// Fetch initial list of wishes
const fetchWishes = async () => {
  try {
    const resp = await wishStore.get();
    wishes.value = resp.data.wishes;
    const respHistory = await useAuthStore().history();
    const respBalance = await useBalanceStore().get();
    balance.value = respBalance.data;
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
  }
};

// Open edit modal and set selected wish data
const onEdit = (id) => {
  ID_FOR_UPDATE.value = id;
  data.value = wishes.value.find((item) => item.id === id) || {};
  editDataModal.value.showModal();
};

// Submit new wish
const onSubmit = async () => {
  try {
    const resp = await wishStore.post(data.value);
    wishes.value.push(resp.data.wish) 
    addDataModal.value.close();
    notificationStore.showNotification(resp?.data?.message, "success");
  } catch (error) {
    notificationStore.showNotification(error.response.data.message, "error");
    console.error("Failed to add wish:", error);
  }
};

// Update existing wish
const onUpdate = async () => {
  try {
    const resp = await wishStore.put(ID_FOR_UPDATE.value, data.value);
    console.log(resp.data.wish);
    const updatedWishIndex = wishes.value.findIndex(
      (item) => item.id === ID_FOR_UPDATE.value
    );
    if (updatedWishIndex !== -1) {
      wishes.value[updatedWishIndex] = resp.data.wish;
    }
    editDataModal.value.close();
    data.value = {}; 
    notificationStore.showNotification(resp?.data?.message, "success");
  } catch (error) {
    console.error("Failed to update wish:", error);
    notificationStore.showNotification(error.response.data.message, "error");
  }
};

// Delete a wish
const onDelete = async (id) => {
  try {
    await wishStore.delete(id);
    wishes.value = wishes.value.filter((item) => item.id !== id);
    notificationStore.showNotification(resp?.data?.message, "success");
  } catch (error) {
    notificationStore.showNotification(error.response.data.message, "error");
    console.error("Failed to delete wish:", error);
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
