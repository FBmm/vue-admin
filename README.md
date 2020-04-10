# vue-admin

> 基于 vue 全集桶 + echarts (前端)、express (mock服务器) ，使用 vue-element-admin(vue-admin-template) 模板搭建的企业级后台管理系统 demo，项目模块由vue学习、自研发组件、企业开发场景组件等示例组成。

```bash
# clone the project
git clone git@github.com:FBmm/vue-admin.git

# enter the project directory
cd vue-admin

# install dependency
npm install

# develop
npm run mock # 启动 mock 服务器
npm start # 开发环境启动项目
```

This will automatically open http://localhost:4000

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
