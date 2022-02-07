import create from "zustand";

const useStore = create(set => ({
    wallet: null,
    setWallet: (wallet) => set(state => ({wallet: wallet}))
}))

export const useWalletStore = useStore;