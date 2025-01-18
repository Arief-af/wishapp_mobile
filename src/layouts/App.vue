<template>
  <main
    class="max-w-[900px] h-screen overflow-y-scroll w-full bg-dark-cover min-w-screen relative mx-auto pb-[84px]"
  >
    <slot />
  </main>
  <footer
    class="fixed max-w-[900px] w-[90%] h-[74px] flex gap-2 justify-center items-center bottom-6 left-1/2 transform -translate-x-1/2 bg-dark-cover bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-full"
  >
    <div
      @click="$router.push('/profile')"
      :class="
        $router.currentRoute.value.path == '/profile' ? 'bg-primary' : 'bg-dark'
      "
      class="w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary"
    >
      <box-icon
        :class="
          $router.currentRoute.value.path == '/profile'
            ? 'fill-dark'
            : 'fill-primary'
        "
        name="user"
      ></box-icon>
    </div>
    <div
      @click="$router.push('/home')"
      :class="
        $router.currentRoute.value.path == '/home' ? 'bg-primary' : 'bg-dark'
      "
      class="w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary"
    >
      <box-icon
        :class="
          $router.currentRoute.value.path == '/home'
            ? 'fill-dark'
            : 'fill-primary'
        "
        name="wallet"
      ></box-icon>
    </div>

    <div
      @click="$router.push('/income')"
      :class="
        $router.currentRoute.value.path == '/income' ? 'bg-primary' : 'bg-dark'
      "
      class="w-16 h-16 flex justify-center items-center text-sm rounded-full shadow text-primary"
    >
      <box-icon
        :class="
          $router.currentRoute.value.path == '/income'
            ? 'fill-dark'
            : 'fill-primary'
        "
        name="money-withdraw"
      ></box-icon>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
