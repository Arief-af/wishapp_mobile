<template>
  <main
    class="h-screen overflow-y-scroll w-full bg-dark-cover min-w-screen relative mx-auto pb-[84px]"
  >
    <slot />
  </main>
  <footer
    class="fixed w-[90%] h-[74px] flex gap-2 justify-center items-center bottom-6 left-1/2 transform -translate-x-1/2 bg-dark-cover bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-full"
  >
    <div class="bg-dark w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary ">
        <box-icon class="fill-primary" name='user' ></box-icon>
    </div>

    <div class="text-dark w-16 h-16 flex justify-center items-center text-sm rounded-full shadow bg-primary ">
        <box-icon class="fill-dark" name='home'></box-icon>
    </div>

    <div class="bg-dark w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary ">
        <box-icon class="fill-primary" name='wallet' ></box-icon>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
