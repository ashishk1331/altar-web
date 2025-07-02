"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
	const router = useRouter();
	const user = useUserStore((state) => state.user);

	useEffect(() => {
		if (user) router.push("/home");
	}, [router, user]);

	return children;
}
