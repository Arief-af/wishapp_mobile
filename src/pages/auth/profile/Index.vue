<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/layouts/App.vue'
let data = ref({})
import { useAuthStore } from '@/stores/authStore';
import { useLoading } from 'vue-loading-overlay';
import { useNotificationStore } from '../../../stores/notification';
const authStore = useAuthStore();
data.value = authStore.user
let errors = ref({})
const notificationStore = useNotificationStore();

let $loading = useLoading();
const onSubmit = async () => {
    const loading = $loading.show({
    })
    try {
        const resp = await authStore.update(data.value);
        notificationStore.showNotification("Data updated", "success");
    } catch (error) {
        notificationStore.showNotification(error?.response?.data?.message, "error");
    } finally {
        loading.hide();
    }
}
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
            <FormInput v-model="data.nik" type="text" placeholder="Masukan nik anda" class="my-5">
                <template #label>nik*</template>
                <template v-if="errors.nik" #error>{{ errors.nik[0] }}</template>
            </FormInput>
            <FormInput v-model="data.ibu_kandung" type="text" placeholder="Masukan Ibu kandung anda" class="my-5">
                <template #label>Ibu kandung*</template>
                <template v-if="errors.ibu_kandung" #error>{{ errors.ibu_kandung[0] }}</template>
            </FormInput>
            <FormInput :required="false" v-model="data.password" type="password" placeholder="Masukan password anda" class="my-5">
                <template #label>Password</template>
                <template v-if="errors.password" #error>{{ errors.password[0] }}</template>
            </FormInput>
            <FormInput :required="false" v-model="data.password_confirmation" type="password" placeholder="Masukan password konfirmasi anda" class="my-5">
                <template #label>Password Konfirmasi</template>
                <template v-if="errors.password_confirmation" #error>{{ errors.password_confirmation[0] }}</template>
            </FormInput>
            
            <div class="flex justify-end">
                <button type="submit" class="btn bg-primary text-dark">Simpan</button>
            </div>
       </form>
    </AppLayout>
</template>
