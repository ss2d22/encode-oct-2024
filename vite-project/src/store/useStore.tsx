import { create } from "zustand";

interface AppState {
  keyId: string;
  contractId: string;
  balance: string;
  isAuthenticated: boolean;
  setKeyId: (keyId: string) => void;
  setContractId: (contractId: string) => void;
  setBalance: (balance: string) => void;
}

export const useStore = create<AppState>((set) => ({
  keyId: localStorage.getItem("sp:keyId") || "",
  contractId: "",
  balance: "0",
  
  // Initialize authentication status based on initial state
  isAuthenticated: !!localStorage.getItem("sp:keyId"),

  setKeyId: (keyId) => set((state) => ({
    keyId,
    isAuthenticated: !!keyId && state.contractId !== "",
  })),

  setContractId: (contractId) => set((state) => ({
    contractId,
    isAuthenticated: state.keyId !== "" && !!contractId,
  })),

  setBalance: (balance) => set(() => ({ balance })),
}));
