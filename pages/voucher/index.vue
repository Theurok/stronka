<template>
<div class="section-overlay p-8">
  <div class="lighter-bg p-8">
    <div class="flex flex-col gap-2 items-center">
      <input type="text" class="input-txt" placeholder="Nick" v-model="nick">
      <input type="text" class="input-txt" placeholder="Kod" v-model="code">
      <button class="custom-btn" @click="useVoucher">Zrealizuj</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      nick: "",
      code: ""
    }
  },
  methods: {
    async useVoucher(context) {
      const params = {
          headers: {
              'Accept': "application/json, text/plain, */*",
              'Content-Type': "application/json;charset=utf-8"
          },
          body: JSON.stringify({ player: this.nick, code: this.code }),
          method: "POST"
      }

      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/vouchers/use/`, params)
        .then((response) => {
          if (!response.ok) {
            this.$toast.error('Niepoprawny voucher')
            throw Error(response.status);
          }
          return response.json()
        })
        .then((data) => {
          this.$toast.success('Voucher został zrealizowany')
        })
        .catch((err) => console.log(err));
    },
  }
}
</script>

<style scoped>
.input-txt {
  padding: 20px;
  background: #222;
  color: #ECECEC;
  outline: none;
  border-radius: 10px;
}
.custom-btn {
  padding: 20px;
  background: var(--primary-color);
  border-radius: 10px;
  text-align: center;
}
</style>
