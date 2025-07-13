import { create } from "zustand";

export type ConfigStoreState = {
	darkMode: boolean;
	shutProfanity: boolean;
};

type ConfigStoreActions = {
	toggleDarkMode: () => void;
	toggleShutProfanity: () => void;
};

export const useConfigStore = create<ConfigStoreState & ConfigStoreActions>()(
	(set) => ({
		darkMode: false,
		toggleDarkMode() {
			return set((prev) => ({ darkMode: !prev.darkMode }));
		},

		shutProfanity: true,
		toggleShutProfanity() {
			return set((prev) => ({ shutProfanity: !prev.shutProfanity }));
		},
	}),
);
