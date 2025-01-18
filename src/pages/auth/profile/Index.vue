<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/layouts/App.vue'
let data = ref({})
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
data.value = authStore.user
let errors = ref({})
</script>

<template>
    <AppLayout>
        <div class="px-5 mt-5 text-primary text-2xl">Profile</div>
       <form class="p-5" @submit.prevent="onSubmit">
            <FormInput v-model="data.name" type="text" placeholder="Masukan nama anda" class="my-5">
                <template #label>Nama*</template>
                <template v-if="errors.name" #error>{{ errors.name[0] }}</template>
            </FormInput>
            <FormInput v-model="data.email" type="email" placeholder="Masukan email anda" class="my-5">
                <template #label>Email*</template>
                <template v-if="errors.email" #error>{{ errors.email[0] }}</template>
            </FormInput>
            <FormInput v-model="data.username" type="text" placeholder="Masukan username anda" class="my-5">
                <template #label>Username*</template>
                <template v-if="errors.username" #error>{{ errors.username[0] }}</template>
            </FormInput>
        
       </form>
    </AppLayout>
</template>
