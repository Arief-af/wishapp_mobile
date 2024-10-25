<script setup>

</script>
<template>
    <section class="w-full">
        <div class="text-2xl text-white px-10 py-10">
            <div class="mb-2 font-bold text-primary">WishApp</div>
            <div class="mb-12 font-light">
                Atur Keuangan, Raih Impian
            </div>
            <button @click="$router.push('/login')" class="btn bg-primary text-dark border-0 hover:bg-primary block w-full">Login</button>
        </div>
    </section>
    <!-- <footer class="h-[263px] w-full bg-primary rounded-t-[57px] p-8">
        <section class="text-black text-sm h-[60%] flex justify-center items-center text-center">
            <main>
                <h4 class="font-bold">WishApp</h4>
                Atur Keuangan, Raih Impian
            </main>
        </section>
        <section class="text-white h-[calc(40%] flex justify-center items-center text-center mt-3">
            <div class="wrapper w-full">
                <main @click="$router.push('/login')" class="bg-dark font-bold text-primary py-3 w-full rounded-lg mb-2">
                    Login
                </main>
                <router-link to="/register" class="text-sm text-dark-cover">Don't have an account?</router-link>
            </div>
        </section>
    </footer> -->
</template>