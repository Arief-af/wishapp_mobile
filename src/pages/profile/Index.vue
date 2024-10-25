<script setup>
import { onMounted, reactive, ref } from "vue";

import App from "@/layouts/App.vue";
let data = ref({});
const errors = ref({});
onMounted(() => {
  data.value = JSON.parse(localStorage.getItem("profile"));
});
const onSubmit = () => {
  try {
    localStorage.setItem("profile", JSON.stringify(data.value));
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <App>
    <div class="p-10">
      <h2 class="text-3xl text-primary">Profile</h2>
      <form @submit.prevent="onSubmit">
        <FormInput
          v-model="data.name"
          type="text"
          placeholder="Masukan nama anda"
          class="my-5"
        >
          <template #label>Nama</template>
          <template v-if="errors.name" #error>{{ errors.name[0] }}</template>
        </FormInput>
        <FormInput
          v-model="data.username"
          type="text"
          placeholder="Masukan nama anda"
          class="my-5"
        >
          <template #label>Username</template>
          <template v-if="errors.name" #error>{{ errors.name[0] }}</template>
        </FormInput>
        <FormInput
          v-model="data.email"
          type="email"
          placeholder="Masukan email anda"
          class="my-5"
        >
          <template #label>Email</template>
          <template v-if="errors.email" #error>{{ errors.email[0] }}</template>
        </FormInput>
        <FormInput
          v-model="data.phone_number"
          type="text"
          placeholder="Masukan nomor telp anda"
          class="my-5"
        >
          <template #label>No Telp</template>
          <template v-if="errors.phone_number" #error>{{
            errors.phone_number[0]
          }}</template>
        </FormInput>
        <FormInput
          v-model="data.date"
          type="date"
          placeholder="Masukan tanggal lahir anda"
          class="my-5"
        >
          <template #label>Date*</template>
          <template v-if="errors.phone_number" #error>{{
            errors.date[0]
          }}</template>
        </FormInput>

        <button
          type="submit"
          class="mb-5 bg-primary mt-5 border-0 text-dark hover:bg-primary hover:text-dark w-full btn rounded-md"
        >
          Update
        </button>
      </form>
      <section class="flex justify-center my-5">
        <div>
          <div class="text-primary text-center text-lg font-bold">
            Rating This App
          </div>
          <div class="rating my-2 mx-auto">
          <input
            type="radio"
            name="rating-4"
            class="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-4"
            class="mask mask-star-2 bg-green-500"
            checked="checked"
          />
          <input
            type="radio"
            name="rating-4"
            class="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-4"
            class="mask mask-star-2 bg-green-500"
          />
          <input
            type="radio"
            name="rating-4"
            class="mask mask-star-2 bg-green-500"
          />
        </div>
        </div>
      </section>
    </div>
  </App>
</template>
