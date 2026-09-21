import { useSyncExternalStore } from "react";
import { getAppData, subscribeToData } from "@/services/content";

export function useAppData() {
  return useSyncExternalStore(subscribeToData, getAppData, getAppData);
}
