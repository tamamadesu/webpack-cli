# webpack 配置模板 #

### 说明
```
一套基本完整的前端开发流程
```

### 目录结构

```
|-- config                           // 开发环境配置
|   |-- index.js                     // 基本入口配置
|   |-- webpack.base.js              // webpack 基本配置
|   |-- webpack.dev.js               // dev 环境配置
|   |-- webpack.prod.js              // 线上环境配置
|
|-- src                              // 源码目录
|   |-- assets                       // 资源目录
|   |-- components                   // 公共组件
|       |-- *.vue
|       |-- *.js
|   |-- js                           // webpack entry 入口
|       |-- [name].js
|   |-- sass                         // 样式目录
|       |-- base.sass
|       |-- *.sass
|   |-- tmpl                         // 模板目录 注： 要与js目录下文件同名，由webpack的 html-webpack-plugin 插件生成 html
|       |-- *.pug
|   |-- html                         // html目录
|       |-- 404.html
|
|-- dist                              // 开发模式打包文件目录
|   |-- css
|       |-- [name].css
|   |-- js
|       |-- [name].js
|   |-- sourceMap
|       |-- [name].js.sourceMap
|       |-- [name].css.sourceMap
|   |-- [name].html
|
|-- build                              // 线上模式打包文件目录
|   |-- css
|       |-- [name].[hash:8].css
|   |-- js
|       |-- [name].[hash:8].js
|   |-- [name].html

```

### 执行命令

_参数： `name1 name2` (js目录下文件名)，默认不填，打包全部内容_

#####开发模式#####

```
 npm run dev
```
#####上线模式#####
```
 npm run build
```




