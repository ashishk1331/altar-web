import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { iconSize } from "@/constants/tokens";

type ButtonProps = {
	className?: string;
	variant?: "primary" | "outline" | "icon";
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type VariantDict = Record<NonNullable<ButtonProps["variant"]>, string>;

export default function Button({
	role = "button",
	children,
	variant = "primary",
	className: passedOnClassName,
	onClick,
	isLoading = false,
	disabled = false,
	...rest
}: ButtonProps) {
	const variants: VariantDict = {
		primary:
			"bg-indigo-600 text-white dark:text-neutral-900 dark:font-medium hover:bg-indigo-500",
		outline:
			"text-black dark:text-neutral-100 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900",
		icon: "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 aspect-square",
	};

	const loaderVariants: VariantDict = {
		primary: "text-white dark:text-neutral-900",
		outline: "text-black dark:text-neutral-100",
		icon: "text-black dark:text-neutral-100",
	};

	return (
		<button
			role={role}
			onClick={onClick}
			className={twMerge(
				"p-1.5 px-3 flex items-center gap-2 rounded cursor-pointer active:scale-90 transition disabled:opacity-75",
				variants[variant],
				passedOnClassName,
			)}
			disabled={isLoading || disabled}
			{...rest}
		>
			{isLoading ? (
				<LoaderCircle
					size={iconSize}
					className={twJoin("animate-spin", loaderVariants[variant])}
				/>
			) : (
				children
			)}
		</button>
	);
}
