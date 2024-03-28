<template>
  <div class="mt-6 xl:mt-52">
    <footer class="flex items-center justify-center flex-col">
      <div class="divider mb-10"></div>
      <div class="flex">
        <div class="flex flex-col mr-2 sm:mr-8">
            <span class="uppercase text-sm mb-2 mt-4">menu</span>
          <ul class="flex flex-col">
            <li v-if="$store.state.shop.home_link">
              <nuxt-link to="/" class="nav-link uppercase text-xs">Strona główna</nuxt-link>
            </li>
            <li v-for="navElement in $store.state.shop.navigation" v-bind:key="navElement.id">
              <nuxt-link :to="'/subpage/'+navElement.subpage" v-if="navElement.subpage" class="nav-link uppercase text-xs">{{navElement.name}}</nuxt-link>
              <a :href="navElement.url" v-else class="nav-link uppercase text-xs">{{navElement.name}}</a>
            </li>
          </ul>
        </div>
        <div class="vertical-divider"></div>
        <img :src="$store.state.shop.logo" alt="Logo serwera" class="h-40 mx-2 sm:mx-16">
        <div class="vertical-divider"></div>
        <div class="flex flex-col ml-2 sm:ml-8">
            <span class="uppercase text-sm mb-2 mt-4">social media</span>
            <ul class="flex flex-col">
              <li v-for="social in this.$config.socialMedia" :key="social.name">
                <a :href="social.link" class="nav-link uppercase text-xs">{{social.name}}</a>
              </li>
            </ul>
        </div>
      </div>
      <div class="lighter-bg p-6 w-full my-8 flex items-center justify-between flex-col-reverse sm:flex-row">
        <div class="flex justify-start justify-self-start light-text text-xs">
          Projekt graficzny: m4fik
        </div>
        <div class="flex justify-center justify-self-center">
          <!-- usunięcie, użycie znacznika rel w linku, zmiana/zmniejszenie widoczności poniższego akapitu będzie złamaniem licencji oraz blokadą sklepu -->
          <!-- zakazana jest również edycja zawartości poniższej linijki, nie można nic dopisywać, podawać się za autora, ani zmieniać -->
          <p>Strona jest zasilana przez <a href="https://vishop.pl" class="text-primary">itemshop Minecraft</a> <b>VIshop.pl</b></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
svg {
  transition: .3s;
  width: 40px;
  height: 40px;
  fill: currentColor;
}
.link-icon:hover > svg {
  fill: #000 !important;
}
.vertical-divider {
  background: linear-gradient(180deg, rgba(236, 236, 236, 0.00) 0%, rgba(236, 236, 236, 0.50) 49.48%, rgba(236, 236, 236, 0.00) 100%);
  width: 2px;
height: 160px;
}
</style>
