'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cheerio = require('cheerio');
var vitePluginExternals = require('vite-plugin-externals');
var fs = require('fs');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

/**
 * vite-plugin-external
 * 1. 处理JS模块中导入方式，修改为 window['vue']方式
 * 2. 自动把外部链接插入到HTML中
 */
async function VitePluginExternals() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const keys = Object.keys(options);
  const configRoot = process.cwd();
  const resolvePath = path__default["default"].resolve(configRoot, 'external.config.js');
  // 判断 options 是否有值
  if (!keys.length) {
    try {
      // 配置文件检测
      const info = fs.statSync(resolvePath);
    } catch (error) {
      throw new Error('external.config.js file does not exist');
    }
    // 动态获取配置文件
    const configFile = await (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })(resolvePath);
    if (!configFile.default || typeof configFile.default !== 'object') {
      throw new Error('external.config.js file is error');
    }
    // 覆盖默认配置
    options = configFile.default || {};
  }
  // 生成 external 配置
  const map = {};
  for (const key in options) {
    const varName = options[key]?.varName;
    if (!varName) throw new Error('Vite plugin external missing configuration parameter varName');
    map[key] = varName;
  }
  // 如果未检测到配置变量，则直接返回
  if (!Object.keys(map).length) return {};
  return {
    ...vitePluginExternals.viteExternalsPlugin(map, userOptions),
    name: 'VitePluginExternalsNew',
    // 插入脚本
    transformIndexHtml(html) {
      const $ = cheerio.load(html);
      const headScript = [],
        bodyScript = [];
      for (const key in options) {
        const {
          src,
          inject = 'head',
          defer = true,
          async
        } = options[key] || {};
        const script = `<script type="text/javascript" src=${src} ${defer ? 'defer="defer"' : ''} ${async ? 'async="async"' : ''}></script>\n`;
        if (inject === 'head') {
          src && headScript.push(script);
        } else {
          src && bodyScript.push(script);
        }
      }
      /**
       * 默认注入到第一个脚本的前面
       * 如果页面没有脚本，追加到 head 标签后面
       */
      if ($('head').find('script').length > 0) {
        $('head').find('script').first().before(headScript);
      } else if ($('head').length > 0) {
        $('head').append(headScript).append('\n');
      }
      // 注入到最后
      $('body').append(bodyScript);
      return $.html();
    }
  };
}

exports.VitePluginExternals = VitePluginExternals;
//# sourceMappingURL=index.js.map
