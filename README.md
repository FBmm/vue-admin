# vue-admin-demo

```bash
# clone the project
git clone git@github.com:FBmm/vue-example.git

# enter the project directory
cd vue-example/vue-admin-template

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