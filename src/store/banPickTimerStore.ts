import { create } from "zustand";

interface BanPickTimerState {
  remainingTime: number;
  setRemainingTime: (time: number) => void;

  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
}

export const useBanPickTimerStore = create<BanPickTimerState>((set) => ({
  remainingTime: 0,
  setRemainingTime: (time) => set({ remainingTime: time }),

  isMuted: false,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setMuted: (muted) => set({ isMuted: muted }),
}));
