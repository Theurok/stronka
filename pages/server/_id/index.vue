<template>
  <div>
    <div v-if="announcements" class="flex flex-col gap-y-2 -mb-16 mt-6">
      <div class="alert lighter-bg p-6 links-colored" role="alert" v-for="announcement in announcements" :key="announcement.id" v-html="announcement.content">
      </div>
    </div>
    <Divider content="Produkty do kupna" :negativeMargin="false"></Divider>
    <div class="section-overlay p-8 grid gap-x-12 gap-y-8 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      <span v-if="$store.state.products.length===0 && $store.state.server.name">Wybrany serwer nie posiada żadnych produktów.</span>
      <div class="lighter-bg py-4 sm:py-8 px-4 sm:px-20 flex flex-col items-center justify-center h-full" v-for="product in $store.state.products" v-bind:key="product.id">
        <img v-if="product.image" :src="product.image" alt="Zdjęcie produktu" width="200" height="200" class="h-52">
        <span class="text-xl mt-6" v-if="$config.showProductName">{{product.name}}</span>
        <p class="light-text text-sm text-justify self-start mw-full break-word" v-bind:class="{ 'mt-6': $config.showProductName, 'mt-2': !$config.showProductName }" v-if="product.short_description">{{product.short_description}}</p>
        <div class="flex flex-row mt-2 self-start mb-5" v-if="product.main_price">
          <span class="text-xl" :class="{ 'line-through light-text': product.promo }">{{product.main_price}} zł</span>
          <span class="ml-2 text-primary text-xl" v-if="product.promo">{{ $price.calcPrice(product.main_price, product.promo) }} zł</span>
        </div>
        <a :href="'https://vishop.pl/pay/'+$store.state.shop.id+'/'+product.id" class="buy-btn flex items-center justify-center relative">
          Kliknij, aby kupić
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none" class="ml-3">
            <path d="M1 6H12M12 6L6.80556 1M12 6L6.80556 11" stroke="#ECECEC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div v-if="product.promo" class="absolute -top-4 -right-4 promo-indicator">
            -{{product.promo}}%
          </div>
        </a>
      </div>
    </div>
    <div  v-if="$store.state.shop.monthly_goal_public !== null">
      <Divider content="Cel serwera" :negativeMargin="false"></Divider>
      <div class="lighter-bg p-8 flex justify-between">
        <div class="monthly-goal-layer w-full">
          <div class="section-overlay" :style='`width: `+$store.state.shop.monthly_goal_public+`%;`' v-bind:class="{'p-4': $store.state.shop.monthly_goal_public > 0}">
          </div>
        </div>
        <span class="ml-8">{{Math.ceil($store.state.shop.monthly_goal_public)}}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: {Divider},
  data: function () {
    return {
      announcements: []
    }
  },
  async created () {
    await this.$store.dispatch('loadServer', this.$route.params.id)
    await this.$store.dispatch('loadProducts', this.$route.params.id)
    await this.loadAnnouncements()
  },
  methods: {
    async loadAnnouncements(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/announcements/`)
      .then((response) => response.json())
      .then((data) => {
        this.announcements = data
      })
      .catch((err) => console.error(err));
    },
  }
}
</script>

<style scoped>
.product-link:hover {
  cursor: pointer;
}
.buy-btn {
  border-radius: 10px;
  background: #222;
  width: 100%;
  padding: 23px;
  margin-top: auto;
}
.promo-indicator {
  border-radius: 10px;
  background: rgba(94, 230, 72, 0.25);
  color: #5EE648;
  text-align: center;
  font-size: 20px;
  padding: 5px 24px 5px 24px;
}
.monthly-goal-layer {
  border-radius: 10px;
  background: #222;
}
</style>
