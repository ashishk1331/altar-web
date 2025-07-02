import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = {
	className?: string;
} & PropsWithChildren;

export function YStack({ children, className: passedOnClassName }: StackProps) {
	return (
		<div
			className={twMerge("flex flex-col items-center gap-2", passedOnClassName)}
		>
			{children}
		</div>
	);
}

export function XStack({ children, className: passedOnClassName }: StackProps) {
	return (
		<div className={twMerge("flex items-center gap-2", passedOnClassName)}>
			{children}
		</div>
	);
}
