import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConfigStoreState = {
	darkMode: boolean;
	shutProfanity: boolean;
};

type ConfigStoreActions = {
	toggleDarkMode: () => void;
	toggleShutProfanity: () => void;
	initializeDarkMode: () => void;
};

export const useConfigStore = create<ConfigStoreState & ConfigStoreActions>()(
	persist(
		(set, get) => ({
			darkMode: false,
			shutProfanity: true,
   		
			toggleDarkMode() {
				set((prev) => {
					const newDarkMode = !prev.darkMode;
					document.documentElement.dataset.theme = newDarkMode ? 'dark' : 'light';
					return { darkMode: newDarkMode };
				});
			},
   		
			toggleShutProfanity() {
				return set((prev) => ({ shutProfanity: !prev.shutProfanity }));
			},
   		
			initializeDarkMode() {
				const { darkMode } = get();
				const hasPersistedData = localStorage.getItem('config-store') !== null;
   			
				if (hasPersistedData) {
					document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
				} else {
					const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					document.documentElement.dataset.theme = systemPrefersDark ? 'dark' : 'light';
					set({ darkMode: systemPrefersDark });
				}
			},
		}),
		{
			name: 'config-store',
			partialize: (state) => ({
				darkMode: state.darkMode,
				shutProfanity: state.shutProfanity,
			}),
		}
	)
);