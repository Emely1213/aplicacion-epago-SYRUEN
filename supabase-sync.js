(function(){
 const C=window.SYRUEN_SUPABASE_CONFIG||{};
 const base=(C.url||'').replace(/\/$/,''); const key=C.anonKey||'';
 const tables={data:'syruen_data',users:'syruen_users'};
 async function req(path,opts={}){const r=await fetch(base+path,{...opts,headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json',...(opts.headers||{})}}); if(!r.ok) throw new Error(await r.text()); return r.status===204?null:r.json()}
 async function pull(table){return req('/rest/v1/'+table+'?select=id,payload&limit=1').then(a=>a[0]?.payload||null)}
 async function put(table,id,payload){return req('/rest/v1/'+table+'?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({id,payload,updated_at:new Date().toISOString()})})}
 window.SYRUEN_SYNC={
  async hydrate(){
   if(!base||!key)return;
   try{const [d,u]=await Promise.all([pull(tables.data),pull(tables.users)]); if(d){localStorage.setItem('syruen_v4_data',JSON.stringify(d));} if(u){localStorage.setItem('syruen_v4_users',JSON.stringify(u));} window.SYRUEN_ONLINE=true;}catch(e){console.warn('Supabase no disponible:',e);window.SYRUEN_ONLINE=false}
  },
  async saveData(v){try{await put(tables.data,'main',v);window.SYRUEN_ONLINE=true}catch(e){console.warn('No se pudo guardar SYRUEN:',e);window.SYRUEN_ONLINE=false}},
  async saveUsers(v){try{await put(tables.users,'main',v);window.SYRUEN_ONLINE=true}catch(e){console.warn('No se pudieron guardar usuarios:',e);window.SYRUEN_ONLINE=false}}
 };
 window.SYRUEN_SUPABASE_READY=window.SYRUEN_SYNC.hydrate();
})();
