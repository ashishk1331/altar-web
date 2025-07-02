import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
	className: passedOnClassName,
	...rest
}: InputProps) {
	return (
		<input
			className={twMerge(
				"bg-neutral-100 rounded p-2 px-4 placeholder:text-neutral-400 outline-neutral-100 min-w-3xs",
				passedOnClassName,
			)}
			{...rest}
		/>
	);
}
