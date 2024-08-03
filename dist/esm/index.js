import { load } from 'cheerio';
import { viteExternalsPlugin } from 'vite-plugin-externals';

function VitePluginExternals(options) {
  let userOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const keys = Object.keys(options);
  // 判断 options 是否有值
  if (!keys.length) {
    throw new Error('Options is empty, please check the configuration of VitePluginExternals');
  }
  // 生成 external 配置
  const map = {};
  for (const key in options) {
    const varName = options[key]?.varName;
    if (!varName) throw new Error('Vite plugin external missing configuration parameter varName');
    map[key] = varName;
  }
  return {
    ...viteExternalsPlugin(map, userOptions),
    name: 'VitePluginExternalsNew',
    // 插入脚本
    transformIndexHtml(html) {
      const $ = load(html);
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

export { VitePluginExternals };
//# sourceMappingURL=index.js.map
