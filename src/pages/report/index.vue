<script setup>
import { ref as vueRef } from "vue";
import AuthLayout from "@/layouts/Auth.vue";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useNotificationStore } from "../../stores/notification";
const notificationStore = useNotificationStore();
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBsG6t85orjj_UePLCFPA1oC2igSI-9OsU",
  authDomain: "wishapp-8a6dc.firebaseapp.com",
  databaseURL: "https://wishapp-8a6dc-default-rtdb.firebaseio.com",
  projectId: "wishapp-8a6dc",
  storageBucket: "wishapp-8a6dc.appspot.com", 
  messagingSenderId: "493613167399",
  appId: "1:493613167399:web:9eb3d4f7325c1533bc2f02",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// State management
let data = vueRef({
  nik: "",
  email: "",
  file: null,
});

// Fungsi untuk menyimpan data ke Realtime Database
const saveDataToDatabase = async (nik, email, ibu) => {
  const dataRef = ref(database, `users/${nik}`);
  await set(dataRef, {
    nik: nik,
    email: email,
    ibu_kandung: ibu,
    status: "pending",
    message: `${email} meminta pemulihan akun`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
};

// Fungsi handle submit form
const handleSubmit = async () => {
  // Validasi form
  if (!data.value.ibu_kandung || !data.value.nik || !data.value.email) {
    notificationStore.showNotification("Data belum lengkap", "error");
    return;
  }

  try {
    await saveDataToDatabase(data.value.nik, data.value.email, data.value.ibu_kandung);
    data.value.nik = "";
    data.value.email = "";
    data.value.ibu_kandung = null;
    notificationStore.showNotification("Pengajuan berhasil dilakukan", "success");
  } catch (error) {
  }
};
</script>

<template>
  <AuthLayout title="Pemulihan Akun" back-path="/">
    <form @submit.prevent="handleSubmit">
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
        v-model="data.nik"
        type="text"
        required
        placeholder="Masukan nik anda"
        class="my-5"
      >
        <template #label>NIK*</template>
      </FormInput>

      <FormInput
        v-model="data.ibu_kandung"
        type="text"
        required
        placeholder="Masukan nama ibu kandung"
        class="my-5"
      >
        <template #label>Masukan nama ibu kandung*</template>
      </FormInput>

      <button
        type="submit"
        class="bg-primary outline-none border-0 text-dark hover:bg-primary hover:text-dark w-full btn rounded-md"
      >
        Send
      </button>
    </form>
  </AuthLayout>
</template>
