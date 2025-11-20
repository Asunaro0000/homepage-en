export async function loadYAML(url){
  const res = await fetch(url, {cache:'no-store'});
  const txt = await res.text();
  try{ return jsyaml.load(txt); }catch(e){ console.error('YAML parse error', e); return null; }
}
