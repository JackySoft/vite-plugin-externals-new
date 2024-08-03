'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cheerio = require('cheerio');
var vitePluginExternals = require('vite-plugin-externals');

/**
 * vite-plugin-external
 * 1. 处理JS模块中导入方式，修改为 window['vue']方式
 * 2. 自动把外部链接插入到HTML中
 */
function VitePluginExternals(options) {
  let userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const keys = Object.keys(options);
  process.cwd();
  // 判断 options 是否有值
  if (!keys.length) {
    // 覆盖默认配置
    return {};
  }
  // 生成 external 配置
  const map = {};
  for (const key in options) {
    const varName = options[key]?.varName;
    if (!varName) throw new Error('Vite plugin external missing configuration parameter varName');
    map[key] = varName;
  }
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
