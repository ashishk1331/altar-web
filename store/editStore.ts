import { PoemWithAuthor } from "@/types/ComplexTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EditStoreState = {
	draft: PoemWithAuthor | null;
};

type EditStoreActions = {
	setDraft: (draft: PoemWithAuthor | Partial<PoemWithAuthor>) => void;
	updateDraft: (partialDraft: Partial<PoemWithAuthor>) => void;
	reset: () => void;
};

export const useEditStore = create<EditStoreState & EditStoreActions>()(
	persist(
		(set) => ({
			draft: null,
			setDraft(draft) {
				return set({ draft: draft as PoemWithAuthor });
			},
			updateDraft(partialDraft) {
				return set((state) => ({
					draft: state.draft ? { ...state.draft, ...partialDraft } : null,
				}));
			},
			reset() {
				return set({ draft: null });
			},
		}),
		{
			name: "altar-edit-store",
			partialize({ draft }) {
				return { draft };
			},
		},
	),
);