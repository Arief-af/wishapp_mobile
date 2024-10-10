<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    backPath: {
        type: String
    }
})
</script>

<template>
    <main class="min-h-screen min-w-screen relative mx-auto bg-dark-cover shadow-lg max-w-[900px]">
        <header class="h-[84px] flex items-center ml-[25px]">
            <span @click="$router.push(backPath)" class="text-primary text-lg font-bold flex items-center">Back</span>
        </header>
        <div class="h-[calc(100vh-84px)] px-[25px] overflow-auto">
            <h1 class="text-primary text-lg font-bold">{{ props.title }}</h1>
            <slot />
        </div>
    </main>
</template>
