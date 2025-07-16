"use client";
import Blockade from "@/components/blocks/Blockade";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { isAfter, addDays } from "date-fns";
import { useShallow } from "zustand/shallow";

export default function AuthWrapper({ children }: PropsWithChildren) {
	const router = useRouter();
	const [user, lastLoggedIn, resetUser] = useUserStore(
		useShallow((state) => [state.user, state.lastLoggedIn, state.resetUser]),
	);

	useEffect(() => {
		if (user && lastLoggedIn) {
			const lastLoginDate = new Date(lastLoggedIn);
			const expiryDate = addDays(lastLoginDate, 3);
			const now = new Date();

			if (isAfter(now, expiryDate)) {
				resetUser();
				router.replace("/");
				return;
			}
		}

		if (!user) {
			router.replace("/");
		}
	}, [router, user, lastLoggedIn, resetUser]);

	if (!user) return <Blockade />;
	return children;
}
