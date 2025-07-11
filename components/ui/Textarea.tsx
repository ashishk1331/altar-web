"use client";
import { type TextareaHTMLAttributes, useEffect, useId, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { XStack } from "./Stack";
import { Asterisk } from "lucide-react";

type TextareaProps = {
	label?: string;
	className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
	label = "",
	className: passedOnClassName,
	value,
	...rest
}: TextareaProps) {
	const textareaId = useId();
	const ref = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const resize = () => {
			el.style.height = "auto";
			el.style.height = `${el.scrollHeight}px`;
		};

		// Resize immediately
		resize();

		el.addEventListener("input", resize);
		return () => el.removeEventListener("input", resize);
	}, [value]); // Add value as dependency

	return (
		<>
			{label && (
				<label className="px-1" htmlFor={textareaId}>
					<XStack className="gap-0 items-start">
						<span>{label}</span>
						{rest.required && <Asterisk size={16} className="text-red-400" />}
					</XStack>
				</label>
			)}
			<textarea
				ref={ref}
				value={value}
				className={twMerge(
					"bg-white rounded p-2 px-4 placeholder:text-neutral-400 border border-neutral-200 outline-neutral-100 min-w-3xs resize-none overflow-hidden",
					passedOnClassName,
				)}
				rows={1}
				{...rest}
			/>
		</>
	);
}
