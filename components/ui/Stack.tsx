import type { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = {
	className?: string;
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>;

export function YStack({ children, className, ...rest }: StackProps) {
	return (
		<div
			className={twMerge("flex flex-col items-center gap-2", className)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function XStack({ children, className, ...rest }: StackProps) {
	return (
		<div className={twMerge("flex items-center gap-2", className)} {...rest}>
			{children}
		</div>
	);
}
