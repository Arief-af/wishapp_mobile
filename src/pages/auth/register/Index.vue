<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/Auth.vue'
let data = ref({})
const router = useRouter()
const errors = ref({})
const onSubmit = () => {
    try {
        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem("data");
        let dataArray = [];

        // Parse the existing data if it exists, or initialize as an empty array
        if (existingData) {
            dataArray = JSON.parse(existingData);
        }

        // Add your new object to the array
        dataArray.push(data.value);

        // Store the updated array back in localStorage
        localStorage.setItem("data", JSON.stringify(dataArray));

        router.push("/login");
    } catch (error) {
        console.log(error);
    }
};

</script>

<template>
    <AuthLayout title="Register Akun" back-path="/">
       <form @submit.prevent="onSubmit">
            <FormInput v-model="data.name" type="text" placeholder="Masukan nama anda" class="my-5">
                <template #label>Nama*</template>
                <template v-if="errors.name" #error>{{ errors.name[0] }}</template>
            </FormInput>
            <FormInput v-model="data.username" type="text" placeholder="Masukan username anda" class="my-5">
                <template #label>Username*</template>
                <template v-if="errors.username" #error>{{ errors.username[0] }}</template>
            </FormInput>
            <FormInput v-model="data.email" type="email" placeholder="Masukan email anda" class="my-5">
                <template #label>Email*</template>
                <template v-if="errors.email" #error>{{ errors.email[0] }}</template>
            </FormInput>
            <FormInput v-model="data.phone_number" type="text" placeholder="Masukan nomor telp anda" class="my-5">
                <template #label>No Telp*</template>
                <template v-if="errors.phone_number" #error>{{ errors.phone_number[0] }}</template>
            </FormInput>
            <FormInput v-model="data.date" type="date" placeholder="Masukan tanggal lahir anda" class="my-5">
                <template #label>Date*</template>
                <template v-if="errors.date" #error>{{ errors.date[0] }}</template>
            </FormInput>
            <FormInput v-model="data.password" type="password" placeholder="Masukan password anda" class="mt-5">
                <template #label>Password*</template>
                <template v-if="errors.password" #error>{{ errors.password[0] }}</template>
            </FormInput>
            <FormInput v-model="data.password_confirmation" type="password" placeholder="Masukan password anda kembali" class="mt-5">
                <template #label>Password Konfirmasi*</template>
                <template v-if="errors.password_confirmation" #error>{{ errors.password_confirmation[0] }}</template>
            </FormInput>
            
            <button type="submit" class="mb-5 bg-primary mt-5 border-0 text-dark hover:bg-primary hover:text-dark w-full btn rounded-md">Register</button>
            <div class="flex items-center justify-center mb-5">
                <router-link to="/login" class="label-text text-white">Sudah punya akun? <span class="text-primary font-bold">Klik disini</span></router-link>
            </div>
       </form>
    </AuthLayout>
</template>
