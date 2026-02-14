const STORAGE_KEY_PREFIX = "fcff_state_";

export interface ValuationStoredState {
  symbol: string;
  inputs: any[];
  fetchedInputs: any[];
  stockInfo: any[];
  countryOptions: string;
  industryOptions: string;
  salesToCapManuallyEdited: {
    salesToCapYr1: boolean;
    salesToCapYr2to5: boolean;
    salesToCapYr6to10: boolean;
  };
  roicTerminalYearManuallyEdited: boolean;
  initialWaccManuallyEdited: boolean;
}

export function saveValuationState(symbol: string, state: ValuationStoredState): void {
  if (typeof window === "undefined") return;
  try {
    const key = STORAGE_KEY_PREFIX + symbol.toUpperCase();
    sessionStorage.setItem(key, JSON.stringify(state));
  } catch {
    // sessionStorage full or unavailable — silently fail
  }
}

export function loadValuationState(symbol: string): ValuationStoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const key = STORAGE_KEY_PREFIX + symbol.toUpperCase();
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as ValuationStoredState;
  } catch {
    return null;
  }
}
