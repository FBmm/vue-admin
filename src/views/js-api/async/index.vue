<template>
  <div class="app-container">
    async
  </div>
</template>

<script>
export default {
  name: 'Async',
  data() {
    return {}
  },
  mounted() {
    // this.demo1()
    // this.demo2()
    // this.demo3()
    this.demo4()
    // console.log(stream)
  },
  methods: {
    syncFn() {
      console.log('sync method')
    },
    async asyncFn() {
      await setTimeout(() => {
        console.log('1s delay setTimeout')
      }, 1000)
      return '1';
    },

    /**
     * @description 1. 正常函数与async函数调用顺序
     * @description 2. async 函数返回值
     */
    async demo1() {
      const fn = this.asyncFn()
      console.log('async函数返回值', fn);
      await this.syncFn(1, 2)
    },

    /**
     * @description 1. 测试 async 函数中不含await是否可单独调用
     *
     */
    async demo2() {
      console.log('测试 async 函数中不含await是否可单独调用', true);
    },

    /**
     * @description 1. 简单Promise
     *
     */
    demo3() {
      const p = new Promise((resolve, reject) => {
        resolve(`success：${new Date().toLocaleString()}`)
        // resolve 或 reject 调用后状态不再变
        reject('err')
      })
      p.then(_ => {
        console.log(_)
      })
      .catch(err => {
        console.log(err)
      })

      // 可以多次调用 then catch方法 返回的结果不改变 -  所有 new Date().getTime() 输出第一次调用的时间
      p.then(_ => {
        console.log(_)
      })
    },

    /**
     * @description 1. Promise 实现延迟执行
     *
     */
    demo4() {
      new Promise((resolve, reject) => {
        console.log('promise do')
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      .then( _ => {
         console.log('1s 后执行') 
      })
    },
  }
}
</script>
