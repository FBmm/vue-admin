<template>
  <div>
    <p>姓名：<input type="text" :value="name" @input="onInputName"/></p> 
    <p>年龄：<input type="number" :value="age" @input="onInputAge"/></p> 
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    age: Number,
  },
  computed: {
    people() {
      return `${this.name}: ${this.age}`
    }
  },
  methods: {
    onInputName(e) {
      this.$emit('update:name', e.target.value)
    },
    onInputAge(e) {
      this.$emit('update:age', e.target.value)
    }
  }
}
</script>
