<script setup>
import { ref } from "vue";
import AuthLayout from "../../../layouts/Auth.vue";
import { useRouter } from "vue-router";

const data = ref({ username: '', password: '' }); // Initialize with empty strings
const router = useRouter();

const onSubmit = () => {
  try {
    const existingData = localStorage.getItem("data");
    let dataArray = [];

    if (existingData) {
      dataArray = JSON.parse(existingData);
    }

    const user = dataArray.find(
      (user) => user.username === data.value.username && user.password === data.value.password 
    );

    localStorage.setItem("profile", JSON.stringify(user));


    if (user) {
      router.push("/home");
    } else {
      alert("Invalid username or password");
    }
    
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <AuthLayout title="Login Akun" back-path="/">
    <form @submit.prevent="onSubmit">
      <FormInput
        v-model="data.username"
        type="text"
        placeholder="Masukan username anda"
        class="my-5"
      >
        <template #label>Username*</template>
      </FormInput>
      <FormInput
        v-model="data.password"
        type="password"
        placeholder="Masukan password anda"
        class="mt-5"
      >
        <template #label>Password*</template>
      </FormInput>
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-3 my-5 cursor-pointer">
          <input
            type="checkbox"
            checked="checked"
            class="checkbox checkbox-sm"
          />
          <span class="label-text text-white">Remember me</span>
        </label>
        <router-link to="/forgot-password" class="label-text text-primary">
          Forgot password?
        </router-link>
      </div>
      <button
        type="submit"
        class="bg-primary outline-none border-0 text-dark hover:bg-primary hover:text-dark w-full btn rounded-md"
      >
        Login
      </button>
      <div class="flex items-center justify-center my-5">
        <router-link to="/register" class="label-text text-white">
          Belum punya akun?
          <span class="text-primary font-bold">Klik disini</span>
        </router-link>
      </div>
    </form>
  </AuthLayout>
</template>
