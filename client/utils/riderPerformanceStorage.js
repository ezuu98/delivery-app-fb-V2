const STORAGE_KEY = 'riderPerformancePct';

function getStorage(){
  if (typeof window === 'undefined') return null;
  try{
    return window.sessionStorage;
  }catch(_){
    return null;
  }
}

export function readRiderPerformanceMap(){
  const storage = getStorage();
  if(!storage) return {};
  try{
    const raw = storage.getItem(STORAGE_KEY);
    if(!raw) return {};
    const parsed = JSON.parse(raw);
    if(parsed && typeof parsed === 'object' && !Array.isArray(parsed)){
      return parsed;
    }
  }catch(_){ }
  return {};
}

export function readRiderPerformance(id){
  if(id === undefined || id === null) return undefined;
  const map = readRiderPerformanceMap();
  const key = String(id);
  return map[key];
}

export function writeRiderPerformance(values){
  if(!values || typeof values !== 'object') return;
  const storage = getStorage();
  if(!storage) return;
  const entries = Object.entries(values);
  if(entries.length === 0) return;
  const current = readRiderPerformanceMap();
  let changed = false;
  const next = { ...current };
  for (const [id, value] of entries){
    const key = String(id);
    let numeric;
    if(typeof value === 'number'){
      numeric = value;
    }else if(typeof value === 'string'){
      numeric = Number(value);
    }else{
      continue;
    }
    if(!Number.isFinite(numeric)) continue;
    if(next[key] !== numeric){
      next[key] = numeric;
      changed = true;
    }
  }
  if(!changed) return;
  try{
    storage.setItem(STORAGE_KEY, JSON.stringify(next));
  }catch(_){ }
}
