<script setup>

import { onMounted, ref } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    backPath: {
        type: String
    }
})

const transition = ref(false)

onMounted(() => {
    transition.value = true
})
</script>

<template>
    <main class="min-h-screen min-w-screen relative mx-auto bg-dark-cover shadow-lg max-w-[900px]">
        <header class="h-[84px] flex items-center ml-[25px]">
            <span @click="$router.push(backPath)" class="text-primary text-lg font-bold flex items-center"><box-icon class="fill-primary" name='chevron-left' ></box-icon>Back</span>
        </header>
        <div class="h-[calc(100vh-84px)] px-[25px] overflow-auto">
            <h1 class="text-primary text-lg font-bold">{{ props.title }}</h1>
            <Transition>
                <section v-if="transition">
                    <slot />
                </section>
            </Transition>
        </div>
    </main>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>