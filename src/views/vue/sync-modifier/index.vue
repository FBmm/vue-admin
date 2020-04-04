<template>
  <div class="app-container">
    <h3>1. prop属性双向绑定</h3>
    <div>输入值1：{{demo1}}</div>
    <div>input: <input type="text" v-model="demo1" v-focus></div>
    <div>v-focus测试: <input type="text" v-focus>（如果存在两个 v-focus，第二个会覆盖第一个）</div>
    <div>组件：<MyInput :value="demo1" @input="onChange"></MyInput></div>
    <h3>2. .sync修饰符</h3>
    <div>输入值2：{{demo2}}</div>
    <SyncDemo :value.sync="demo2"></SyncDemo>(.sync修饰符对一个 prop 进行“双向绑定”)
    <h3>3. .sync修饰符双向绑定多个props</h3>
    <div>{{ people }}</div>
    <PropsSync v-bind.sync="people"></PropsSync>(.sync修饰符对多个 prop 进行“双向绑定”)
  </div>
</template>

<script>
import MyInput from './my-input'
import SyncDemo from './sync-demo'
import PropsSync from './props-sync'
export default {
  components: { MyInput, SyncDemo, PropsSync },
  data() {
    return {
      demo1: '',
      demo2: '',
      people: {
        name: 'wuqian',
        age: 26
      },
    }
  },
  methods: {
    onChange(val) {
      console.log(val)
      this.demo1 = val;
    }
  }
}
</script>
