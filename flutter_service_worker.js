'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "1773c6a30da3e470c40b853f80efb9c5",
"index.html": "672c45a75d6195468fb74925b9005c96",
"/": "672c45a75d6195468fb74925b9005c96",
"main.dart.js": "0084c62284e743a3aba6bf6b5b270b57",
"flutter.js": "4af2b91eb221b73845365e1302528f07",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "55a714da90e319a7a56be808a47ee245",
"assets/AssetManifest.json": "eced2e5562682e6848e04d2f15dfe823",
"assets/NOTICES": "732d4718b6920a5844433b5ec9f87baf",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "ab30f5e790a993f9bd9cabfd29301802",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "5130c9a615b0991021f427aa3154ef96",
"assets/fonts/MaterialIcons-Regular.otf": "57a5b89ab9b0caf753b144f552165d6f",
"assets/assets/images/projects.png": "7c8366c0b23c09f4ff79272220d5932f",
"assets/assets/images/about_me_background.jpg": "754628696bf1bc9625cf0502fec173f0",
"assets/assets/images/finalPhoto.png": "e09cb02a20a4160bd53ca381220a5bda",
"assets/assets/images/about_me_pic.jpg": "3b8b45de6f78fb9b557540a8eb1c8e0d",
"assets/assets/images/pencil.png": "00756fa05d5e1918ab4d827648a35979",
"assets/assets/images/profile-user.png": "5700c04197ee9a4372a35ef16eb78f4e",
"assets/assets/images/about_me_pic_2.jpg": "4e0ea2b3f466bbc78842d7fca7da6ec8",
"assets/assets/images/welcome.png": "e2d2f8ab0d684177325918a3f133d0b7",
"assets/assets/icons/github.svg": "272e350af079ec9072501bd1791ef757",
"assets/assets/icons/python.png": "f51f4e3762acbe66977cc3fcdfe5a11a",
"assets/assets/icons/x.svg": "7d3973961d96c2a7687e67a15b0c4ca6",
"assets/assets/icons/flutter.svg": "757060a5e560f76fa2a81370722d3e6f",
"assets/assets/icons/instagram.svg": "2787d051236c76cedbc00b88caa6efc9",
"assets/assets/icons/sql.png": "b829bbfe053efaa4bba4ff5ce717527c",
"assets/assets/icons/firebase.png": "80fbbeb7b000c326c9c644802a8b2a99",
"assets/assets/icons/java.png": "e7868999b5fff273a1342a96c21cce09",
"assets/assets/icons/telegram.svg": "d9f02cb35161f81529bada45b3a4dc4b",
"assets/assets/icons/html.png": "db87c523f823a23658ac5e50776e686b",
"assets/assets/icons/c++.png": "4cd97dd81f4d7a66dc12ebfcdca886f9",
"assets/assets/icons/linkedin.svg": "c121e56cc18fa7ca79856c92b93cf037",
"assets/assets/icons/twitter.svg": "3e748c9264f2f3494389a0b5b33d7b0e",
"assets/assets/icons/php.png": "0663441f47db0261b2f0fc33948b1067",
"assets/assets/icons/css.png": "efc80566532cc8472b2f5d18175ccbe4",
"assets/assets/pdfs/shrey_pdf.pdf": "869a1be3cc717f88c1aa74f2adc2a1c6",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "4ff83c62a0243119b7245316356685e7",
"canvaskit/canvaskit.js.symbols": "ebec2180c8fd2244c0b887fe4abd79a5",
"canvaskit/skwasm.wasm": "0a5c4a5d97a16304b3e4d1a4c4a24b9c",
"canvaskit/chromium/canvaskit.js.symbols": "85af9a3ce602e02632c701fa742320cb",
"canvaskit/chromium/canvaskit.js": "2f82009588e8a72043db753d360d488f",
"canvaskit/chromium/canvaskit.wasm": "e85c2054a44abc8e393f58b32c1a4a8e",
"canvaskit/canvaskit.js": "7737f5fc722b6a040ac15271ea8d92fb",
"canvaskit/canvaskit.wasm": "b730404c3182c77feae53f97aeab7247",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
