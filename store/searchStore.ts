import { create } from "zustand";

export type SearchStoreState = {
	filter: "poems" | "users";
};

type SearchStoreActions = {
	setFilter: (filter: SearchStoreState["filter"]) => void;
};

export const useSearchStore = create<SearchStoreState & SearchStoreActions>()(
	(set) => ({
		filter: "poems",
		setFilter(filter) {
			return set({ filter });
		},
	}),
);
