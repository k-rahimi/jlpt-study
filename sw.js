const C="jlpt-202610262229";
const FILES=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!=="jlpt-fonts").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
  if(u.hostname.includes("fonts.g")){e.respondWith(caches.open("jlpt-fonts").then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n}))));return}
  if(u.origin!==location.origin)return;
  if(u.searchParams.has("update")){e.respondWith(fetch(new Request(u.pathname,{cache:"reload"})).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>{c.put("./",cp.clone());c.put("index.html",cp)})}return n}).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp))}return n}).catch(()=>caches.match("index.html"))))});
