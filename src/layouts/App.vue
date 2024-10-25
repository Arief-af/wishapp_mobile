<template>
  <main
    class="h-screen overflow-y-scroll w-full bg-dark-cover min-w-screen relative mx-auto pb-[84px]"
  >
    <Transition>
      <section v-if="transition">
        <slot />
      </section>
    </Transition>
  </main>
  <footer
    class="footer absolute w-[90%] h-[74px] flex gap-2 justify-center items-center bottom-6 left-1/2 transform -translate-x-1/2 bg-dark-cover bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-full"
  >
    <div
      @click="$router.push('/profile')"
      :class="currentRoute == '/profile' ? 'bg-primary' : ''"
      class="w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary"
    >
      <box-icon
        :class="currentRoute == '/profile' ? 'fill-dark' : 'fill-primary'"
        name="user"
      ></box-icon>
    </div>

    <div
      @click="$router.push('/home')"
      :class="currentRoute == '/home' ? 'bg-primary' : ''"
      class="w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary"
    >
      <box-icon
        :class="currentRoute == '/home' ? 'fill-dark' : 'fill-primary'"
        name="home"
      ></box-icon>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const currentRoute = ref(route.path);
console.log(currentRoute.value);

const transition = ref(false);
onMounted(() => {
  transition.value = true;
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
