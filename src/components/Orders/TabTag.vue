<template>
  <div class="input-wrap">
      <span v-for="(item,index) in tags" :key="index"
      class="form-span" :class="{'checked': selectTag == item}"
      @click="$emit"
      >

      </span>
  </div>
</template>

<script>
export default {
    name: 'order',
    props: {
        tags: Array,
        selectTag: String
    },
    created() {
        console.log(this.tags)
    }
}
</script>

<style scoped>

</style>