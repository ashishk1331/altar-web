import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
	return (
		<div className="relative container mx-auto max-w-xl p-4">{children}</div>
	);
}
