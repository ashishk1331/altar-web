"use client";

import { useUserStore } from "@/store/userStore";
import { PropsWithChildren, type ReactNode } from "react";

type AFallbackProps = {
	fallback?: ReactNode | null;
} & PropsWithChildren;

export default function AFallback({
	children,
	fallback = null,
}: AFallbackProps) {
	const user = useUserStore((state) => state.user);

	if (!user) return fallback;

	return children;
}
