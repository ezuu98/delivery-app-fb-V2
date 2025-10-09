export const FARE_SETTINGS_STORAGE_KEY = 'app.settings.fares';

export const DEFAULT_FARE_SETTINGS = {
  baseFare: 0,
  farePerKm: 2,
};

export function readFareSettings(){
  if (typeof window === 'undefined' || !window.localStorage){
    return { ...DEFAULT_FARE_SETTINGS };
  }
  try{
    const raw = window.localStorage.getItem(FARE_SETTINGS_STORAGE_KEY);
    if (!raw){
      return { ...DEFAULT_FARE_SETTINGS };
    }
    const parsed = JSON.parse(raw);
    const baseFare = Number(parsed?.baseFare);
    const farePerKm = Number(parsed?.farePerKm);
    return {
      baseFare: Number.isFinite(baseFare) ? baseFare : DEFAULT_FARE_SETTINGS.baseFare,
      farePerKm: Number.isFinite(farePerKm) ? farePerKm : DEFAULT_FARE_SETTINGS.farePerKm,
    };
  }catch(_){
    return { ...DEFAULT_FARE_SETTINGS };
  }
}
