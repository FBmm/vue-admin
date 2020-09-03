const menuConfig = [{
    name: 'home',
    title: '首页',
    route: '/home',
    icon: 'el-icon-location',
    hidden: false
  },

  {
    name: 'vue',
    title: 'vue学习',
    route: '/vue',
    icon: 'el-icon-location',
    hidden: false,
    children: [{
      name: 'slot',
      title: '插槽',
      route: '/vue/slot',
      icon: '',
    }, {
      name: 'sync-modifier',
      title: '.sync修饰符',
      route: '/vue/sync-modifier',
      icon: '',
    }, {
      name: 'directive',
      title: '指令',
      route: '/vue/directive',
      icon: '',
    }, {
      name: 'plugin',
      title: '插件',
      route: '/vue/plugin',
      icon: '',
    }]
  },

  {
    name: 'vue-source',
    title: 'vue源码学习',
    route: '/vue-source',
    icon: 'el-icon-location',
    hidden: false,
    children: [{
      name: 'reactive',
      title: '响应式原理',
      route: '/vue-source/reactive',
      icon: '',
    }]
  },

  {
    name: 'js-api',
    title: 'js api学习',
    route: '/js-api',
    icon: 'el-icon-location',
    hidden: false,
    children: [{
      name: 'async',
      title: 'async await',
      route: '/js-api/async',
      icon: '',
    }, {
      name: 'promise',
      title: 'promise',
      route: '/js-api/promise',
      icon: '',
    }, {
      name: 'generator',
      title: 'generator',
      route: '/js-api/generator',
      icon: '',
    }]
  },

  {
    name: 'component',
    title: '组件示例',
    route: '/component',
    icon: 'el-icon-location',
    hidden: false,
    children: [{
      name: 'twoColsLayoutCalc',
      title: '两栏布局 - calc 版',
      route: '/component/twoColsLayout-calc',
      icon: '',
    }, {
      name: 'twoColsLayout',
      title: '两栏布局 - flex 版',
      route: '/component/twoColsLayout-flex',
      icon: '',
    }, {
      name: 'selector',
      title: '选择器',
      route: '/component/selector',
      icon: '',
    }, {
      name: 'drag',
      title: '拖拽指令',
      route: '/component/drag',
      icon: '',
    }]
  },

  {
    name: 'interview',
    title: '面试题',
    route: '/interview',
    icon: 'el-icon-location',
    hidden: false,
    children: [{
      name: 'js',
      title: 'js面试题',
      route: '/interview/js',
      icon: '',
    }]
  },

  // {
  //   name: 'provision',
  //   title: '资源分配',
  //   route: '/provision',
  //   icon: 'el-icon-location',
  //   hidden: false,
  //   children: [{
  //     name: 'host',
  //     title: '主机',
  //     route: '/provision/host',
  //     icon: '',
  //     disabled: true
  //   }, {
  //     name: 'volume',
  //     title: '卷',
  //     route: '/provision/volume',
  //     icon: '',
  //     hidden: false
  //   }]
  // },

  // {
  //   name: 'protected',
  //   title: '数据保护',
  //   route: '/protected',
  //   icon: 'el-icon-location',
  //   children: [{
  //     name: 'replication-pair',
  //     title: '远程复制 Pair',
  //     route: '/protected/replication-pair',
  //     icon: '',
  //   }, {
  //     name: 'consistent-group',
  //     title: '远程复制一致性组',
  //     route: '/provision/consistent-group',
  //     icon: '',
  //   }, {
  //     name: 'duplication-pair',
  //     title: '双活 Pair',
  //     route: '/provision/duplication-pair',
  //     icon: '',
  //   }, {
  //     name: 'duplication-group',
  //     title: '双活一致性组',
  //     route: '/provision/duplication-group',
  //     icon: '',
  //     hidden: true
  //   }]
  // },

  {
    name: 'setting',
    title: '设置',
    route: '/setting',
    icon: '',
    disabled: true
  }
]

function MenuFactory(config) {
  return config;
}

export default new MenuFactory(menuConfig);
