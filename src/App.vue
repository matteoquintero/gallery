<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Cta from "@/components/Cta.vue";
import Galery from "@/components/Galery.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="h-screen">
    <header class="z-10">
      <Header/>
    </header>
    <section class="h-4/5 z-0">
      <Cta/>
    </section>
    <article>
      <Galery/>
    </article>
    <footer class="h-56">
      <Footer/>
    </footer>
  </div>

  <RouterView />
</template>
