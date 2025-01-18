<template>
  <AppLayout>
    <section class="p-3">
      <div
        class="relative bg-primary rounded-lg p-5 min-h-[200px] flex justify-center items-center"
      >
        <section class="text-center">
          <div class="text-dark">{{ CapitalizeFirstLetter(wish.title) }}</div>
          <div class="font-bold text-2xl text-dark-cover">
            {{ currencyFormat(wish.nominal_target) }}
          </div>
        </section>
        <div
          @click="logout"
          class="bg-white right-6 top-6 w-12 h-12 rounded-full absolute flex justify-center items-center"
        >
          <box-icon class="fill-primary" name="exit"></box-icon>
        </div>
      </div>
    </section>

    <section class="p-5">
      <div
        class="bg-primary rounded-full flex items-center py-2 text-dark px-5"
      >
        Saving Balance: {{ currencyFormat(wish.balance) }}
      </div>
      <div
        class="mt-2 bg-dark rounded-full flex items-center py-2 text-white px-5"
      >
        Target Day: {{ wish.target_date }}
      </div>
      <div
        class="mt-2 bg-dark rounded-full flex items-center py-2 text-white px-5"
      >
        Spend/day: {{ currencyFormat(wish.spend_per_day) }}
      </div>
    </section>

    <dialog id="my_modal_1" ref="addDataModal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add Saving!</h3>
        <form @submit.prevent="onSubmit">
          <FormInput
            v-model="data.nominal"
            type="text"
            readonly
            placeholder="Nominal"
            class="my-5"
          >
            <template #label>Nominal*</template>
          </FormInput>

          <FormInput v-model="data.date" type="date" readonly class="my-5">
            <template #label>Date*</template>
          </FormInput>

          <div class="flex justify-end w-full">
            <button
              class="btn bg-primary text-dark hover:bg-primary hover:text-dark"
            >
              Submit
            </button>
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
        <h3 class="text-lg font-bold">Withdraw!</h3>
        <form @submit.prevent="onWithdraw">
          <FormInput
            v-model="withdrawData.description"
            type="text"
            placeholder="Untuk keperluan apa withdraw ini?"
            class="my-5"
          >
            <template #label>Deskripsi*</template>
          </FormInput>
          <FormInput
            v-model="withdrawData.nominal"
            type="number"
            placeholder="Masukan nominal anda"
            class="my-5"
          >
            <template #label>nominal*</template>
          </FormInput>

          <div class="flex justify-end w-full">
            <button
              type="submit"
              class="btn bg-primary text-dark hover:bg-primary hover:text-dark"
            >
              Submit
            </button>
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
        <div class="text-lg text-white font-light mb-5">Your Saving</div>
        <div class="h-max flex gap-2">
          <button
            class="p-5 flex items-center justify-center text-xl font-bold rounded-full w-4 h-4 bg-white text-dark hover:bg-primary hover:text-dark"
            onclick="my_modal_1.showModal()"
          >
            +
          </button>
        </div>
      </div>
      <div
        v-for="(saving, index) in savings"
        class="relative cursor-pointer text-white flex justify-between bg-dark p-8 rounded-lg w-full mb-3"
      >
        <div>
          <div class="text-primary">
            {{ currencyFormat(saving.nominal) }}
          </div>
          <div class="text-white">
            {{ saving.date }}
          </div>
        </div>
      </div>
    </section>

    <section class="p-5">
      <div class="flex mb-5 items-center justify-between">
        <div class="text-lg text-white font-light mb-5">Your Withdraw</div>
        <div class="h-max flex gap-2">
          <button
            class="p-5 flex items-center justify-center text-xl font-bold rounded-full w-4 h-4 bg-white text-dark hover:bg-primary hover:text-dark"
            onclick="my_modal_2.showModal()"
          >
            +
          </button>
        </div>
      </div>
      <div
        v-for="(withdraw, index) in withdraws"
        class="relative cursor-pointer text-white flex justify-between bg-dark p-8 rounded-lg w-full mb-3"
      >
        <div>
          <div class="text-red-600">
            {{ CapitalizeFirstLetter(withdraw.description) }}
          </div>
          <div class="text-red-600">
            {{ currencyFormat(withdraw.nominal) }}
          </div>
          <div class="text-white">
            {{ withdraw.date }}
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/App.vue";
import { ref } from "vue";
import { useWishStore } from "@/stores/wishStore";
import { useRouter } from "vue-router";
import { capitalize } from "vue";
import { useSavingStore } from "../../../stores/savingStore";
import { useWithdrawStore } from "../../../stores/withdrawStore";
import { useAuthStore } from "../../../stores/authStore";
import { useLoading } from "vue-loading-overlay";

const authStore = useAuthStore();
const logout = () => {
  authStore.clearState();
}

const wishStore = useWishStore();
let data = ref({});
let wish = ref([]);
let addDataModal = ref(null);
let editDataModal = ref(null);
let savings = ref([]);
let withdrawData = ref({});
let withdraws = ref([]);

const router = useRouter();
const id = router.currentRoute.value.params.id;
const fetchWish = async () => {
  try {
    const resp = await wishStore.getById(id);
    wish.value = resp.data.wish;
    console.log(wish.value);

    data.value.nominal = resp.data.wish.spend_per_day;
    data.value.date = new Date().toISOString().split("T")[0];

    const respSavingList = await useSavingStore().get(id);
    savings.value = respSavingList.data.savings;
    console.log(respSavingList.data.savings);

    const withdrawResp = await useWithdrawStore().get(id);
    withdraws.value = withdrawResp.data.withdraw;
  } catch (error) {
    console.error("Failed to fetch wish:", error);
  }
};

const $loading = useLoading();
const onSubmit = async () => {
  const loading = $loading.show({
    
  })
  try {
    const resp = await useSavingStore().post(id, data.value);
    addDataModal.value.close();
    data.value = {};
    await fetchWish();
  } catch (error) {
    console.error("Failed to add wish:", error);
  } finally {
    loading.hide();
  }
};

const onWithdraw = async () => {
  const loading = $loading.show({
    
  })
  try {
    const resp = await useWithdrawStore().post(id, withdrawData.value);
    editDataModal.value.close();
    withdrawData.value = {};
    await fetchWish();
  } catch (error) {
    console.error("Failed to add withdraw:", error);
  } finally {
    loading.hide();
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

// Fetch wish on component mount
fetchWish();
</script>

<style lang="scss" scoped></style>
