# VitePluginExternals

## 介绍

添加外部依赖，注入远程脚本。

## 使用方式

一、安装插件

```shell
yarn add vite-plugin-externals-new -D
```

二、导入插件

```js
import { defineConfig } from 'vite';
import { VitePluginExternals } from '@hll/vite-plugin-externals';
export default defineConfig({
  ...
  plugins: [VitePluginExternals()],
});
```

三、创建配置

1. 方法一（创建 external.config.js）

```js
export default {
  vue: {
    src: 'https://unpkg.com/vue@3/dist/vue.global.js',
    varName: 'Vue',
    inject: 'head',
    defer: true,
  },
  'vue-router': {
    src: 'https://unpkg.com/vue-router@4',
    varName: 'VueRouter',
    defer: true,
    async: false,
  },
};
```

> `inject`默认为`head`，`defer`默认为`true`

2. 方法二（添加 options 配置）

```js
VitePluginExternals({
  vue: {
    src: 'https://unpkg.com/vue@3/dist/vue.global.js',
    varName: 'Vue',
  },
  'vue-router': {
    src: 'https://unpkg.com/vue-router@4',
    varName: 'VueRouter',
  },
});
```

## 插件配置

```ts
export interface External {
  [key: string]: {
    /** 远程地址 */
    src?: string;
    /** 变量名称 */
    varName: string;
    /** 脚本注入位置 */
    inject?: 'head' | 'body';
    /** 是否为defer */
    defer?: boolean;
    /** 是否为async */
    async?: boolean;
  };
}
```

> `key`为外部依赖模块的名称，比如：要把`vue`设置为外部依赖，则`key`为`vue`。

## 模块配置

| 配置    | 类型    | 说明                                                                          |
| :------ | :------ | :---------------------------------------------------------------------------- |
| src     | string  | 脚本 CDN 地址。                                                               |
| varName | string  | 模块对应的全局变量名称 。                                                     |
| inject  | string  | 脚本注入位置，可选：head/body ，默认为 head，会注入到第一个 script 标签前面。 |
| defer   | boolean | vite 默认构建包为 type=module 类型，因此注入脚本默认为 defer。                |
| async   | boolean | 是否设置异步加载，默认：false 。                                              |

## 示例效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
    <script
      type="text/javascript"
      src="https://unpkg.com/vue@3/dist/vue.global.js"
      defer="defer"
    ></script>
    <script
      type="text/javascript"
      src="https://unpkg.com/vue-router@4"
      defer="defer"
    ></script>
    <script
      type="module"
      crossorigin=""
      src="/assets/index-25c071f5.js"
    ></script>
    <link rel="stylesheet" href="/assets/index-eb1c0fa2.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
