import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
	name: string;
	email: string;
	picture: string;
	given_name: string;
	family_name: string;
};

export type UserStoreState = {
	user: User | null;
	lastLoggedIn: number | null;
};

type UserStoreActions = {
	setUser: (user: User) => void;
	resetUser: () => void;
	setLastLoggedIn: (jsonDate: number) => void;
};

export const useUserStore = create<UserStoreState & UserStoreActions>()(
	persist(
		(set) => ({
			user: null,
			setUser(user) {
				return set({ user });
			},
			resetUser() {
				return set({ user: null });
			},

			lastLoggedIn: null,
			setLastLoggedIn(jsonDate) {
				return set({ lastLoggedIn: jsonDate });
			},
		}),
		{
			name: "altar-auth",
			partialize({ user, lastLoggedIn }) {
				return { user, lastLoggedIn };
			},
		},
	),
);
