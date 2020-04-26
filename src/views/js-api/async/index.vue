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
    // this.demo5()
    this.demo6()

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
     * @title 正常函数与async函数调用顺序
     * @title async 函数返回值
     */
    async demo1() {
      const fn = this.asyncFn()
      console.log('async函数返回值', fn);
      await this.syncFn(1, 2)
    },

    /**
     * @title 测试 async 函数中不含await是否可单独调用
     *
     */
    async demo2() {
      console.log('测试 async 函数中不含await是否可单独调用', true);
    },

    /**
     * @title 测试 async 返回值
     * 1. 返回值Promise
     * 2. 正常是resolved状态
     * 3. 如果函数内部抛出错误，则是rejected
     */
    async demo3() {
      const fn = async () => {
        return 111;
      }

      console.log('async返回值', fn())
      console.log('await得到async返回值', await fn())

      const fn1 = async () => {
        throw new Error('出错了');
      }
      console.log('异常返回', fn1())
    },

    /**
     * @title 获取 async 返回值
     * 1. await
     * 2. then()
     */
    async demo4() {
      const fn = async () => {
        return 111;
      }

      console.log('await', await fn())
      fn().then(_ => console.log('then()', _))
    },

    /**
     * @title await
     * 1. await 后面是 Promise 对象，返回对象的结果
     * 2. 否则，直接返回对应的值
     * 3. await 后面是 thenable对象，会等同于 Promise 对象
     * 4. 返回结果都是Promise对象
     * 5 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
     */
    async demo5() {
      const fn = async () => {
        // 等同于 return 111;
        return await 111;
      }
      console.log('await', fn())
    },

    /**
     * @title await 错误处理
     * 1. 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
     * 2. 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功
     * 3. await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
     */
    async demo6() {
      const fn = async () => {
        // 等同于 return 111;
        throw new Error('await 错误处理');
      }
      await fn()
      // 第一种报错解决办法
      // try {
      //   await fn()
      // } catch (e) {
      //   console.log(e)
      // }

      // 第二种报错解决办法
      // await fn().catch(e => console.log(e))
      console.log('报错后面执行的代码') // 不会执行
    },

    /**
     * @title await 串发写法
     * 
     */
    async demo7() {
      // 写法1 for循环
      async function dbFuc(db) {
        let docs = [{}, {}, {}];

        for (let doc of docs) {
          await db.post(doc);
        }
      }     
      // 写法2 Array.reduce
      async function dbFuc(db) {
        let docs = [{}, {}, {}];

        await docs.reduce(async (_, doc) => {
          await _;
          await db.post(doc);
        }, undefined);
      }
    },

    /**
     * @title await 并发写法
     * 
     */
    async demo8() {
      // 写法一 Promise.all
      async function dbFuc(db) {
        let docs = [{}, {}, {}];
        let promises = docs.map((doc) => db.post(doc));

        let results = await Promise.all(promises);
        console.log(results);
      }

      // 写法二 
      async function dbFuc(db) {
        let docs = [{}, {}, {}];
        let promises = docs.map((doc) => db.post(doc));

        let results = [];
        for (let promise of promises) {
          results.push(await promise);
        }
        console.log(results);
      }
    },

    /**
     * @title async 实现原理
     * 将 Generator 函数和自动执行器，包装在一个函数里
     * 
     */
    async demo9() {
      
    }
  }
}
</script>
