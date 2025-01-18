<script setup>
import { ref } from "vue";
import AuthLayout from "../../../layouts/Auth.vue";
const data = ref({});
import { useLoading } from "vue-loading-overlay";
import { useAuthStore } from "../../../stores/authStore";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
import { useNotificationStore } from "@/stores/notification";
const notificationStore = useNotificationStore();
const $loading = useLoading();
const onSubmit = async () => {
  const loading = $loading.show({
  })
  try {
    const resp = await authStore.login(data.value);
    notificationStore.showNotification(resp?.data?.message, "success");
    router.push("/home");
  } catch (error) {
    notificationStore.showNotification(error.response.data.message, "error");
  } finally {
    loading.hide();
  }
};
</script>

<template>
  <AuthLayout title="Login Akun" back-path="/">
    <form @submit.prevent="onSubmit">
      <FormInput
        v-model="data.email"
        type="email"
        required
        placeholder="Masukan email anda"
        class="my-5"
      >
        <template #label>Email*</template>
      </FormInput>
      <FormInput
        v-model="data.password"
        type="password"
        required
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
        <router-link to="/report" class="label-text text-white"
          >Lupa password?
          <span class="text-primary font-bold">Klik disini</span></router-link
        >
      </div>
      <button
        type="submit"
        class="bg-primary outline-none border-0 text-dark hover:bg-primary hover:text-dark w-full btn rounded-md"
      >
        Login
      </button>
      <div class="flex items-center justify-center my-5">
        <router-link to="/register" class="label-text text-white"
          >Belum punya akun?
          <span class="text-primary font-bold">Klik disini</span></router-link
        >
      </div>
    </form>
  </AuthLayout>
</template>
