<template>
  <div>
  <section class="intro flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start">
    <div class="mt-2 lg:mt-32 order-2 lg:order-1">
      <h1 class="metropolis text-6xl">{{$store.state.shop.name}}</h1>
      <p class="max-w-lg light-text text-justify mt-8">
        {{$config.description}}
      </p>
      <div class="flex flex-col md:flex-row mt-8 items-center md:items-start mb-0 xl:mb-20">
        <button class="btn-play" @click="copy()">Zagraj z nami!</button>
        <div class="online-btn ml-0 md:ml-8 mt-2 md:mt-0 flex justify-center items-center light-text"><div :class="{ 'blob green': status, 'blob blob-red': !status }"></div>Online: {{ players }}</div>
      </div>
    </div>
    <div class="mt-8 order-1 lg:order-2">
      <img src="~assets/render.png" alt="render" class="object-fill">
    </div>
  </section>
  <Divider content="Wybierz tryb" :negativeMargin="true"/>
  <section>
    <div class="section-overlay flex items-center columns-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-8 gap-8 w-full">
      <nuxt-link :to="'server/' + server.id" class="lighter-bg p-6 flex justify-between items-center h-full flex-col-reverse lg:flex-row" v-for="server in $store.state.servers" :key="server.id">
        <div class="m-8">
          <h2 class="text-3xl">{{server.name}}</h2>
          <div class="flex items-center">
            <span>Przejdź do sklepu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none" class="ml-2">
              <path d="M1 6H12M12 6L6.80556 1M12 6L6.80556 11" stroke="#ECECEC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div v-if="server.image">
          <img :src="server.image" :alt="server.name" width="130px" height="130px">
        </div>
      </nuxt-link>
    </div>
  </section>
  <Divider content="Administracja serwera" :negativeMargin="false"/>
  <section class="servers mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      <div v-for="user in this.$config.administration" :key="user.name" class="lighter-bg flex px-8 py-7 items-center break-word">
        <div class="flex">
          <img :src='`https://minotar.net/helm/`+user.name+`/64`' :alt="user.name" class="mr-4 h-16 flex self-center">
          <div class="flex flex-col items-start">
            <div class="text-lg"><span :style="`color: ${user.color}`">{{user.rank}}</span>&nbsp;<span class="text-white">{{user.name}}</span></div>
            <span class="text-sm light-text">{{user.description}}</span>
          </div>
          </div>
      </div>
    </div>
  </section>
  <Divider content="Najbogatsi gracze na serwerze" :negativeMargin="false"/>
  <section class="flex flex-col xl:flex-row justify-between">
    <div class="flex gap-6 grid grid-cols-2 md:grid-cols-3 items-start">
      <div v-for="(player, index) in richestPlayer" :key="player.player" :class="`lighter-bg p-8 flex flex-col relative items-center justify-center richest-player order-`+index">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" class="absolute top-4">
          <circle cx="12.5" cy="12.5" r="12" fill="#222222" stroke="url(#paint0_linear_9_176)"/>
          <defs :class="index">
            <linearGradient id="paint0_linear_9_176" x1="12.5" y1="0" x2="12.5" y2="25" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F0F0F0" stop-opacity="0"/>
              <stop offset="1" stop-color="#F0F0F0"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="absolute top-5 text-xs">{{ index+1 }}</span>
        <img :src='`https://minotar.net/helm/`+player.player+`/64`' :alt="player.player" class="h-16 flex self-center">
        <span class="mt-2 text-lg">{{player.player}}</span>
        <span class="text-sm text-center"><span class="light-text">Wydał:</span> {{Math.ceil(player.spend)}}zł</span>
      </div>
    </div>
    <div class="flex p-8 section-overlay ml-0 xl:ml-4 mt-4 xl:mt-0 flex-col">
      <span class="text-3xl uppercase">ostatnie zakupy</span>
      <div class="flex gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 mt-4">
        <div v-for="player in $store.state.latestPayments" :key="player.player" class="lighter-bg p-4 flex">
          <img :src='`https://minotar.net/helm/`+player.player+`/48`' :alt="player.player" class="h-12 mr-4">
          <div class="flex flex-col truncate">
            <span class="text-sm">{{player.player}}</span>
            <span class="text-xs light-text">{{player.product_name}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import Divider from '~/components/Divider.vue'

export default {
  name: "index",
  components: {Divider},
  data: function () {
    return {
      players: '?',
      richestPlayer: [],
      status: true
    }
  },
  async created () {
    await this.loadStatus()
    if (this.$store.state.shop.richest_player) {
      await this.loadRichestPlayer()
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$config.address);
      this.$toast.success('Skopiowano adres serwera')
    },
    async loadStatus(context) {
      return await fetch(`https://api.mcsrvstat.us/2/${this.$config.address}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.online) {
            this.players = 0
            this.status = false
            return
          }
          this.players = data.players.online
        })
        .catch((err) => console.log(err));
    },
    async loadRichestPlayer(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/richest_player/?amount=3`)
      .then((response) => response.json())
      .then((data) => {
        this.richestPlayer = data
      })
      .catch((err) => console.error(err));
    },
  }
}
</script>

<style>
@media (min-width: 1280px) {
  .richest-player:nth-child(1) {
    order: 2 !important;
  }
  .richest-player:nth-child(2) {
    order: 1 !important;
    margin-top: 30px;
  }
  .richest-player:nth-child(3) {
    order: 3;
    margin-top: 30px;
  }
}
</style>

