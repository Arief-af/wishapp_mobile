<script setup>
import AuthToolbar from '../components/authToolbar/Index.vue'
// Menambahkan variabel referensi untuk mengontrol status dropdown
</script>

<template>
    <main class="min-h-screen bg-dark-cover min-w-screen relative mx-auto shadow-lg max-w-[900px]">
        <div class="h-[calc(100vh-263px)] overflow-auto flex justify-center items-center">
            <slot />
        </div>
        <AuthToolbar class="absolute bottom-0" />
    </main>
</template>
