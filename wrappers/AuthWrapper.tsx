"use client";

import Blockade from "@/components/blocks/Blockade";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthWrapper({ children }: PropsWithChildren) {
	const router = useRouter();
	const user = useUserStore((state) => state.user);

	useEffect(() => {
		if (!user) router.replace("/");
	}, [router, user]);

	if (!user) return <Blockade />;

	return children;
}
