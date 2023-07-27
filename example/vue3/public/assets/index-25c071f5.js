(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) c(t);
  new MutationObserver((t) => {
    for (const e of t)
      if (e.type === 'childList')
        for (const o of e.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && c(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(t) {
    const e = {};
    return (
      t.integrity && (e.integrity = t.integrity),
      t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (e.credentials = 'include')
        : t.crossOrigin === 'anonymous'
        ? (e.credentials = 'omit')
        : (e.credentials = 'same-origin'),
      e
    );
  }
  function c(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = n(t);
    fetch(t.href, e);
  }
})();
const p = 'modulepreload',
  _ = function (s) {
    return '/' + s;
  },
  d = {},
  w = function (r, n, c) {
    if (!n || n.length === 0) return r();
    const t = document.getElementsByTagName('link');
    return Promise.all(
      n.map((e) => {
        if (((e = _(e)), e in d)) return;
        d[e] = !0;
        const o = e.endsWith('.css'),
          u = o ? '[rel="stylesheet"]' : '';
        if (!!c)
          for (let a = t.length - 1; a >= 0; a--) {
            const l = t[a];
            if (l.href === e && (!o || l.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${e}"]${u}`)) return;
        const i = document.createElement('link');
        if (
          ((i.rel = o ? 'stylesheet' : p),
          o || ((i.as = 'script'), (i.crossOrigin = '')),
          (i.href = e),
          document.head.appendChild(i),
          o)
        )
          return new Promise((a, l) => {
            i.addEventListener('load', a),
              i.addEventListener('error', () =>
                l(new Error(`Unable to preload CSS for ${e}`)),
              );
          });
      }),
    )
      .then(() => r())
      .catch((e) => {
        const o = new Event('vite:preloadError', { cancelable: !0 });
        if (((o.payload = e), window.dispatchEvent(o), !o.defaultPrevented))
          throw e;
      });
  },
  f = window.VueRouter.createRouter,
  m = window.VueRouter.createWebHashHistory,
  v = f({
    history: m(),
    routes: [
      {
        path: '/demo',
        name: 'demo',
        component: () => w(() => import('./demo-fc9d693c.js'), []),
      },
    ],
  });
const h = '/vite.svg',
  V = '/assets/vue-5532db34.svg';
const g = (s, r) => {
  const n = s.__vccOpts || s;
  for (const [c, t] of r) n[c] = t;
  return n;
};
window.Vue.toDisplayString;
window.Vue.createElementVNode;
window.Vue.createTextVNode;
window.Vue.Fragment;
window.Vue.openBlock;
window.Vue.createElementBlock;
window.Vue.pushScopeId;
window.Vue.popScopeId;
window.Vue.ref;
const y = window.Vue.createElementVNode,
  b = window.Vue.resolveComponent,
  E = window.Vue.createVNode,
  N = window.Vue.createStaticVNode,
  S = window.Vue.openBlock,
  k = window.Vue.createElementBlock;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const B = N(
    '<a href="https://vitejs.dev" target="_blank" data-v-1ececb15><img src="' +
      h +
      '" class="logo" alt="Vite logo" data-v-1ececb15></a><a href="https://vuejs.org/" target="_blank" data-v-1ececb15><img src="' +
      V +
      '" class="logo vue" alt="Vue logo" data-v-1ececb15></a><div data-v-1ececb15><a href="#/demo" data-v-1ececb15>页面跳转</a></div>',
    3,
  ),
  L = {
    __name: 'App',
    setup(s) {
      return (r, n) => {
        const c = b('router-view');
        return S(), k('div', null, [B, y('div', null, [E(c)])]);
      };
    },
  },
  O = g(L, [['__scopeId', 'data-v-1ececb15']]),
  P = window.Vue.createApp,
  R = P(O);
R.use(v).mount('#app');
export { g as _ };
