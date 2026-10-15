(function(){
 const C=window.SYRUEN_SUPABASE_CONFIG||{};
 const base=(C.url||'').replace(/\/$/,''); const key=C.anonKey||'';
 const tables={data:'syruen_data',users:'syruen_users'};
 async function req(path,opts={}){
   const r=await fetch(base+path,{...opts,headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json',...(opts.headers||{})}});
   const body=await r.text();
   if(!r.ok) throw new Error('HTTP '+r.status+' '+body);
   return r.status===204||!body?null:JSON.parse(body);
 }
 async function pull(table){
   return req('/rest/v1/'+table+'?select=id,payload&limit=1').then(a=>a[0]?.payload||null);
 }
 async function put(table,id,payload){
   const body=JSON.stringify({id,payload,updated_at:new Date().toISOString()});
   try{
     await req('/rest/v1/'+table+'?id=eq.'+encodeURIComponent(id),{
       method:'PATCH',
       headers:{Prefer:'return=minimal'},
       body
     });
     return true;
   }catch(patchError){
     await req('/rest/v1/'+table,{
       method:'POST',
       headers:{Prefer:'return=minimal'},
       body
     });
     return true;
   }
 }
 window.SYRUEN_SYNC={
  async hydrate(){
   if(!base||!key){window.SYRUEN_ONLINE=false;return false;}
   try{
     const [d,u]=await Promise.all([pull(tables.data),pull(tables.users)]);
     if(d) localStorage.setItem('syruen_v4_data',JSON.stringify(d));
     if(u) localStorage.setItem('syruen_v4_users',JSON.stringify(u));
     window.SYRUEN_ONLINE=true; return true;
   }catch(e){
     console.warn('Supabase no disponible:',e);
     window.SYRUEN_ONLINE=false; return false;
   }
  },
  async saveData(v){
   try{await put(tables.data,'main',v);window.SYRUEN_ONLINE=true;return true}
   catch(e){console.error('No se pudo guardar SYRUEN en Supabase:',e);window.SYRUEN_ONLINE=false;return false}
  },
  async saveUsers(v){
   try{await put(tables.users,'main',v);window.SYRUEN_ONLINE=true;return true}
   catch(e){console.error('No se pudieron guardar usuarios en Supabase:',e);window.SYRUEN_ONLINE=false;return false}
  }
 };
 window.SYRUEN_SUPABASE_READY=window.SYRUEN_SYNC.hydrate();
})();