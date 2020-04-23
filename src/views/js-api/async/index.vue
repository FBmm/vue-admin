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
    // this.demo5()
    // this.demo6()
    // this.demo7()
    // this.demo8()
    this.demo9()
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
    },

    /**
     * @description 1. Promise.all
     *
     * 接收数组或者伪数组作为参数
     * 不是 Promise 实例，就会先调用Promise.resolve()方法，将参数转为 Promise 实例
     * Promise.all 的状态由 传入的promise决定
     * 都变成fulfilled 它的状态才是fulfilled
     * 只要有一个是rejected 它的状态就变成rejected
     * 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法
     */
    demo7() {
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(3000)
        }, 3000)
      })
      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(3000)
        }, 3000)
      }).then(res => {
        console.log(res)
      })
      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1000)
        }, 1000)
      })
      // 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法
      const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('fail'))
        }, 1500)
      }).catch(err => {
        console.log(err)
      })
      const p4 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('fail'))
        }, 1500)
      })
      const promises = Promise.all([p, p1, p2, p3, p4]).then(res => {
        console.log(res)
      })
      console.log(promises)
    },

    /**
     * @description 1. Promise.all
     *
     * 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法
     *
     * p1会resolved，p2首先会rejected，
     * 但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。
     * 该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，
     * 因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。
     * 如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。
     */
    demo8() {
      const p1 = new Promise((resolve, reject) => {
        resolve('hello');
      })
      .then(result => result)
      .catch(e => e);

      const p2 = new Promise((resolve, reject) => {
        throw new Error('报错了');
      })
      .then(result => result)
      .catch(e => e);

      Promise.all([p1, p2])
      .then(result => console.log(result))
      .catch(e => console.log(e));
    },

     /**
     * @description 1. Promise.race
     *
     * 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
     * 最先改变的 Promise 实例的返回值，就传递给p的回调函数。
     */
    demo9() {
      const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(3000)
        }, 3000)
      })

      const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1500)
        }, 1500)
      })

      const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1000)
        }, 1000)
      })

      const p = Promise.race([p1, p2, p3])
      p.then(res => console.log(res))
      .catch(e => console.log(e))
    }
  }
}
</script>
