const CACHE='andy-ascenso-v34-recuperado-20261024a';
const ASSETS=['./','./index.html','./style.css','./app.js','./plan.json','./manifest.webmanifest','./icon.svg','./nina/normal.webp','./nina/feliz.webp','./nina/emocionada.webp','./nina/pensativa.webp','./nina/empatica.webp','./nina/picara.webp','./nina/sorprendida.webp','./nina/dormida.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('andy-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
