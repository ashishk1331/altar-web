import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type BannerBoxProps = {
	className?: string;
	variant?: "success" | "error";
} & PropsWithChildren;

type VariantDict = Record<NonNullable<BannerBoxProps["variant"]>, string>;

export default function BannerBox({
	children,
	className: passedOnClassName,
	variant = "error",
}: BannerBoxProps) {
	const variants: VariantDict = {
		success: "bg-green-100 border-green-300",
		error: "bg-red-100 border-red-300",
	};

	return (
		<div
			className={twMerge(
				"p-2 w-full border rounded text-center bg-neutral-200",
				variants[variant],
				passedOnClassName,
			)}
		>
			{children}
		</div>
	);
}
