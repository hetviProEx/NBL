addCaches();
function addCaches() {
  try {
    const cacheName = "my-cache";
    // put the static assets and routes you want to cache here
    const filesToCache = [
      "/",
      "/about",
      "/index.html",
      "/about.html",
      "/css/styles.css",
      "/js/app.js",
      "/img/logo.png",
    ];
    this.addEventListener("activate", (e) => this.clients.claim());
    this.addEventListener("install", (e) => {
      e.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
      );
    });
    this.addEventListener("fetch", (e) => {
      e.respondWith(
        caches
          .match(e.request)
          .then((response) => (response ? response : fetch(e.request)))
      );
    });
  } catch (error) {
    console.log(error);
  }
}
