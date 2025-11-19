import { create } from "zustand";
import type { Label } from "./label.entity";

interface LabelStore {
  labels: Label[];
  addLabel: (label: Label) => void;
  setLabels: (labels: Label[]) => void;
}

export const useLabelStore = create<LabelStore>((set, get) => ({
  labels: [],
  addLabel: (label: Label) => {
    set({ labels: [...get().labels, label] });
  },
  setLabels: (labels: Label[]) => {
    set({ labels });
  },
}));
