<template>
<div>
  <Divider :content="$store.state.subpage.name" :negativeMargin="false"/>
  <div class="section-overlay p-8">
    <div class="lighter-bg p-8 links-colored prose max-w-none" v-html="$store.state.subpage.content"></div>
  </div>
</div>
</template>

<script>
import Divider from "@/components/Divider";

export default {
  name: "index",
  components: {Divider},
  mounted () {
    this.$store.dispatch('loadSubpage', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
