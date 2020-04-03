<template>
    <input type="text" :value="value" @input="onInput"/>
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
  },
  methods: {
    onInput(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>
