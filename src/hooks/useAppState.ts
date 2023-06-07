import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";


export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const eventListener = AppState.addEventListener('change', onChange);
    return () => {
      eventListener.remove();
    };
  }, [onChange]);
}
