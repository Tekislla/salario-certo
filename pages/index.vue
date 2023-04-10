<template>
  <div class="h-screen grid gap-8">
    <Navigation class="col-span-full w-full px-10"/>
  
    <div class="col-span-full flex items-center justify-center">
      <div class="">
        <span class="flex text-4xl text-text mb-8 w-[500px] h-24 font-semibold dark:text-background">Calculadora de salário líquido</span>
        <span class="flex text-xl text-caption w-[360px] h-[48px] font-semibold dark:text-caption-dark">Facilitando informações que podem confundir o trabalhador.</span>
        <span class="mt-[68px] flex text-[12px] text-caption w-[391px] h-[30px] font-semibold dark:text-caption-dark">Entenda o que é, como funciona os cálculo, quais os descontos e muito mais.</span>
        <div class="mt-6">
          <button type="button" class="w-40 h-10 text-white bg-primary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">FAQ</button>
          <!-- <button type="button" @click="openList()" data-cy="button" class="w-40 h-10 bg-button rounded-lg font-medium text-text  hover:bg-buttonHover">FAQ</button> -->
        </div>
      </div>
      <div class="pl-60 min-width-80">
        <img class="w-80 h-80" src="../assets/imgs/annotation.svg" alt=""/>
      </div>
    </div>
    <div class="col-span-full w-full px-10 content-end">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "Home",
  components: {
    Navigation,
    Footer,
  },
  data () {
    return {
    }
  },
  methods: {
    openList (){
      this.$router.push('/lista'); 
    }
    
  }
};
</script>

<style>
.slotBtn {
  padding-top: 78px;
}
</style>