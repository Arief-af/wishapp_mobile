<template>
  <AppLayout>
    <section class="p-3">
      <div
        class="relative bg-primary rounded-lg p-5 min-h-[200px] flex justify-center items-center"
      >
        <section class="text-center">
          <div class="text-dark">Your Balance</div>
          <div class="font-bold text-2xl text-dark-cover">IDR 1,000,000</div>
        </section>
        <div
          @click="$router.push('/login')"
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

    <dialog id="my_modal_1" ref="addDataModal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add New Wish!</h3>
        <form @submit.prevent="onSubmit">
          <FormInput
            v-model="data.name"
            type="text"
            placeholder="Masukan wish anda"
            class="my-5"
          >
            <template #label>Name*</template>
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

    <dialog id="my_modal_2" ref="editDataModal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Edit Wish!</h3>
        <form @submit.prevent="onUpdate">
          <FormInput
            v-model="data.name"
            type="text"
            placeholder="Masukan wish anda"
            class="my-5"
          >
            <template #label>Name*</template>
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
        class="relative text-white flex justify-between bg-dark p-8 rounded-lg w-full mb-3"
      >
        <div>
          <div class="text-primary">{{ item.name }}</div>
          <div class="text-white">{{ item.nominal }}</div>
        </div>
        <div class="flex gap-2 flex-col">
          <div @click="onEdit(item.id)" class="btn btn-error">Show</div>
          <div
            @click="onDelete(item.id)"
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

let data = ref({});
let wishes = ref([]);
let addDataModal = ref(null);
let editDataModal = ref(null);
let ID_FOR_UPDATE = ref(null);

// Fetch initial list of wishes
const fetchWishes = async () => {
  try {
    const resp = await axios.get("/wishes");
    console.log(wishes.value);
    
    wishes.value = resp.data;
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
    const resp = await axios.post("/wishes", data.value);
    wishes.value.push(resp.data.data);
    addDataModal.value.close();
    data.value = {};
  } catch (error) {
    console.error("Failed to add wish:", error);
  }
};

// Update existing wish
const onUpdate = async () => {
  try {
    const resp = await axios.put(`/wishes/${ID_FOR_UPDATE.value}`, data.value);
    const updatedWishIndex = wishes.value.findIndex(
      (item) => item.id === ID_FOR_UPDATE.value
    );
    if (updatedWishIndex !== -1) {
      console.log(resp.data.data);
      
      wishes.value[updatedWishIndex] = resp.data.data;
    }
    editDataModal.value.close();
    data.value = {}; // Reset form
  } catch (error) {
    console.error("Failed to update wish:", error);
  }
};

// Delete a wish
const onDelete = async (id) => {
  try {
    await axios.delete(`/wishes/${id}`);
    wishes.value = wishes.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error("Failed to delete wish:", error);
  }
};

// Fetch wishes on component mount
fetchWishes();
</script>


<style lang="scss" scoped></style>
