/* ASCENSO 4.1 · Offline real: precarga atómica del núcleo, imágenes opcionales. */
const CACHE='andy-ascenso-v41-offline-20261026';
const CORE=['./','./index.html','./style.css','./app.js','./plan.json','./manifest.webmanifest','./icon.svg'];
const IMAGES=['normal','feliz','emocionada','pensativa','empatica','picara','sorprendida','dormida'].map(n=>'./nina/'+n+'.webp');
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 // La instalación no se considera lista si faltan HTML, CSS, JS o plan.
 await cache.addAll(CORE);
 // Una imagen ausente no debe impedir que la aplicación trabaje offline.
 await Promise.allSettled(IMAGES.map(async path=>{const r=await fetch(path,{cache:'reload'});if(r.ok)await cache.put(path,r)}));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('andy-ascenso-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  // Elimina la diferencia entre style.css y style.css?v=... al consultar.
  const key=req.mode==='navigate'?'./index.html':req;
  const hit=await cache.match(key,{ignoreSearch:true});
  if(hit)return hit;
  try{const response=await fetch(req);if(response.ok)await cache.put(req,response.clone());return response}
  catch(err){if(req.mode==='navigate'){const page=await cache.match('./index.html');if(page)return page}throw err}
 })());
});
