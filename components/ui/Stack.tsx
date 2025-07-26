import { forwardRef, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = {
	className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const YStack = forwardRef<HTMLDivElement, StackProps>(
	({ children, className, ...rest }, ref) => (
		<div
			ref={ref}
			className={twMerge("flex flex-col items-center gap-2", className)}
			{...rest}
		>
			{children}
		</div>
	),
);
YStack.displayName = "YStack";

export const XStack = forwardRef<HTMLDivElement, StackProps>(
	({ children, className, ...rest }, ref) => (
		<div
			ref={ref}
			className={twMerge("flex items-center gap-2", className)}
			{...rest}
		>
			{children}
		</div>
	),
);
XStack.displayName = "XStack";
