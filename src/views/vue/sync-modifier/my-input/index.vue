<template>
    <input type="text" :value="value" @input="(e) => this.$emit('input', e.target.value)"/>
</template>

<script>
export default {
  props: {
    value: String,
    title: String,
  },
  watch: {
    value(val) {
      console.log(val);
    }
  }
}
</script>
