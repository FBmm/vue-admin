export default (Vue)=>{
  // 全局指令 表单输入元素自动获取焦点
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    },
  })

  // Vue指令钩子函数测试
  Vue.directive('directive-hook', {
    bind: function (el, binding, vnode) {
      console.log(arguments)
    },
    inserted: function (e) {
      console.log('inserted', e)
    },
    update: function (e) {
      console.log('update', e)
    },
    componentUpdated: function (e) {
      console.log('componentUpdated', e)
    },
    unbind: function (e) {
      console.log('unbind', e)
    }
  })

  // Vue指令bind函数参数测试
  Vue.directive('bind-attr', {
    bind: (el, binding, vnode) => {
      el.innerHTML = JSON.stringify(binding);
    },
  })

  // 动态指令测试
  Vue.directive('dynamic-directive', {
    bind: (el, binding, vnode) => {
      el.innerHTML = '用指令修改innerHTML，值是：' + JSON.stringify(binding.value)
    },
  })

  // 固定元素
  Vue.directive('pin', {
    bind: function (el, binding, vnode) {
      el.style.position = 'fixed'
      el.style.top = binding.value + 'px'
    }
  })

  // 固定元素-带方向扩展
  // Vue.directive('arg-pin', {
  //   bind: function (el, binding, vnode) {
  //     el.style.position = 'fixed'
  //     var s = (binding.arg == 'left' ? 'left' : 'top')
  //     el.style[s] = binding.value + 'px'
  //   }
  // })
  // 函数简写
   Vue.directive('arg-pin', (el, binding) => {
      el.style.position = 'fixed'
      var s = (binding.arg == 'left' ? 'left' : 'top')
      el.style[s] = binding.value + 'px'
   })
}