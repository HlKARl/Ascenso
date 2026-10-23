const CACHE='ascenso-v38-nina-clean-20261023';
const ASSETS=['./', './index.html', './style.css', './app.js', './plan.json', './manifest.webmanifest', './icon.svg', './nina/nina-normal-v2.webp', './nina/nina-feliz-v2.webp', './nina/nina-emocionada-v2.webp', './nina/nina-pensativa-v2.webp', './nina/nina-empatica-v2.webp', './nina/nina-picara-v2.webp', './nina/nina-sorprendida-v2.webp', './nina/nina-dormida-v2.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
