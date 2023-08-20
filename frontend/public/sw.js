if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, n) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let t = {};
    const r = (e) => a(e, i),
      d = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-7c2a5a06"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/JquWEPC5Hte_za4CHeaSb/_buildManifest.js",
          revision: "43662a6e920ffb44c81d1297b693cd65",
        },
        {
          url: "/_next/static/JquWEPC5Hte_za4CHeaSb/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/154-454aae7a1f6cc481.js",
          revision: "454aae7a1f6cc481",
        },
        {
          url: "/_next/static/chunks/163-70eba806be4f45ee.js",
          revision: "70eba806be4f45ee",
        },
        {
          url: "/_next/static/chunks/23-cb7030939f1d55ab.js",
          revision: "cb7030939f1d55ab",
        },
        {
          url: "/_next/static/chunks/637-c0d3125bdeb1e413.js",
          revision: "c0d3125bdeb1e413",
        },
        {
          url: "/_next/static/chunks/670-6ac8e1dc4df7e0bf.js",
          revision: "6ac8e1dc4df7e0bf",
        },
        {
          url: "/_next/static/chunks/737-220f8102d8dfbd6a.js",
          revision: "220f8102d8dfbd6a",
        },
        {
          url: "/_next/static/chunks/755-e13aabd2214fd84d.js",
          revision: "e13aabd2214fd84d",
        },
        {
          url: "/_next/static/chunks/887-38b862e874ccc669.js",
          revision: "38b862e874ccc669",
        },
        {
          url: "/_next/static/chunks/990-8de0a48ac356d499.js",
          revision: "8de0a48ac356d499",
        },
        {
          url: "/_next/static/chunks/framework-7a7e500878b44665.js",
          revision: "7a7e500878b44665",
        },
        {
          url: "/_next/static/chunks/main-bda482389c04dca5.js",
          revision: "bda482389c04dca5",
        },
        {
          url: "/_next/static/chunks/pages/AssignTask-04fe5b199fc65305.js",
          revision: "04fe5b199fc65305",
        },
        {
          url: "/_next/static/chunks/pages/_app-d82c7fc412c5253a.js",
          revision: "d82c7fc412c5253a",
        },
        {
          url: "/_next/static/chunks/pages/_error-fb57ec51cee19545.js",
          revision: "fb57ec51cee19545",
        },
        {
          url: "/_next/static/chunks/pages/allTasks-36c4b92594971deb.js",
          revision: "36c4b92594971deb",
        },
        {
          url: "/_next/static/chunks/pages/applicants/%5Bid%5D-ed94034363eda92b.js",
          revision: "ed94034363eda92b",
        },
        {
          url: "/_next/static/chunks/pages/index-f7335979d9c159dc.js",
          revision: "f7335979d9c159dc",
        },
        {
          url: "/_next/static/chunks/pages/login-34d817366d2a1e0b.js",
          revision: "34d817366d2a1e0b",
        },
        {
          url: "/_next/static/chunks/pages/notifications-42ae6107bc3f0d69.js",
          revision: "42ae6107bc3f0d69",
        },
        {
          url: "/_next/static/chunks/pages/task/%5Bid%5D-fc60823bcb638759.js",
          revision: "fc60823bcb638759",
        },
        {
          url: "/_next/static/chunks/pages/userProfile/%5Bid%5D-d4d3a1df5b7c280d.js",
          revision: "d4d3a1df5b7c280d",
        },
        {
          url: "/_next/static/chunks/pages/userTasks-7fbdb39534fc0a4f.js",
          revision: "7fbdb39534fc0a4f",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-6ef43a8d4a395f49.js",
          revision: "6ef43a8d4a395f49",
        },
        {
          url: "/_next/static/css/2e1eb09c5eebad71.css",
          revision: "2e1eb09c5eebad71",
        },
        {
          url: "/_next/static/css/323a474e4b5a76a7.css",
          revision: "323a474e4b5a76a7",
        },
        {
          url: "/_next/static/css/40be3d2c28d57fd5.css",
          revision: "40be3d2c28d57fd5",
        },
        {
          url: "/_next/static/css/420a54614c283eef.css",
          revision: "420a54614c283eef",
        },
        {
          url: "/_next/static/css/46723a39893b158b.css",
          revision: "46723a39893b158b",
        },
        {
          url: "/_next/static/css/5c9145e07175e3b8.css",
          revision: "5c9145e07175e3b8",
        },
        {
          url: "/_next/static/css/865c0d76b9a53a8d.css",
          revision: "865c0d76b9a53a8d",
        },
        {
          url: "/_next/static/css/8a3c114353a97873.css",
          revision: "8a3c114353a97873",
        },
        {
          url: "/_next/static/css/b88d5e13e489482c.css",
          revision: "b88d5e13e489482c",
        },
        {
          url: "/_next/static/css/f3add7fb586e62fd.css",
          revision: "f3add7fb586e62fd",
        },
        { url: "/chouchou.jpg", revision: "7206f43495383ebdea563b7e501c568f" },
        { url: "/favicon.ico", revision: "c30c7d42707a47a3f4591831641e50dc" },
        { url: "/location.png", revision: "7d289403fc5a4b69f11882d34fa41c3d" },
        { url: "/logo.jpg", revision: "077d52ad42a0e55a771c90232619bd79" },
        { url: "/logo192.jpg", revision: "fd4d661b97e6f6e8e55ec423d85a674b" },
        { url: "/manifest.json", revision: "51aa8474d9e6e109d69a6ca70205476b" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/profile.png", revision: "560ebca27da97c577ed4dd898382f810" },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
        { url: "/山道猴子.png", revision: "e229a7017a09a8b0c34dbbd3a860e72d" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
