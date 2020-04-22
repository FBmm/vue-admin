<template>
  <div class="app-container">
    async
    <div ref="img"></div>
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
    // this.demo4()
    // console.log(stream)
    // 图片异步加载并渲染到dom
    this.loadImgAsync('https://es6.ruanyifeng.com/images/cover-3rd.jpg').then( _ => {
      this.$refs.img.appendChild(_)
    })
    this.demo5()
    // this.demo6()
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

    /**
     * @description 1. Promise 图片异步加载demo
     *
     */
    loadImgAsync(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(img)
        }
        img.onerror = () => {
          reject(new Error(`Can not load img at ${url}`))
        }
        img.width = 200
        img.src = url
      })
    },

    /**
     * @description 1. Promise 异步操作的结果是返回另一个异步操作
     * p1的状态决定了p2的状态
     */
    demo5() {
      const p1 = new Promise((resolve, reject) => {
        reject(1)
        console.log('2')
      })
      const p2 = new Promise((resolve, reject) => {
        resolve(p1)
        // reject(p1)
      })
      p2.then(_ => {
        console.log(p1)
        console.log(p2)
        console.log(_)
      }, _ => {
        console.log(p1)
        console.log(p2)
        console.log(_)
      })
    },

    /**
     * @description 1. Promise 异步操作的结果是返回另一个异步操作 p1 延迟于 p2
     *
     */
    demo6() {
      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('fail'))
        }, 3000)
      })
      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(p1)
        }, 1000)
      }).then(_ => {
        console.log(p1)
        console.log(p2)
        console.log(_)
      })
      .catch(err => {
        console.log(p1)
        console.log(p2)
        console.log(err)
      })
    }
  }
}
</script>
