"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { useUserStore } from "@/store/userStore";
import {
	createContext,
	useContext,
	type PropsWithChildren,
	type ReactNode,
} from "react";

type AFallbackProps = {
	fallback?: ReactNode | null;
} & PropsWithChildren;

type UserContextType = {
	user: Doc<"users">;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			"useUserContext must be used within a UserProvider (AFallback component)",
		);
	}
	return context;
}

export default function AFallback({
	children,
	fallback = null,
}: AFallbackProps) {
	const user = useUserStore((state) => state.user);
	if (!user) return fallback;
	return (
		<UserContext.Provider value={{ user }}>
			{user && children}
		</UserContext.Provider>
	);
}
