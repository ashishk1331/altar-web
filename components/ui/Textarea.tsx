"use client";
import { type TextareaHTMLAttributes, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type TextareaProps = {
	className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
	className: passedOnClassName,
	value,
	...rest
}: TextareaProps) {
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
		<textarea
			ref={ref}
			value={value}
			className={twMerge(
				"bg-neutral-100 rounded p-2 px-4 placeholder:text-neutral-400 outline-neutral-100 min-w-3xs resize-none overflow-hidden",
				passedOnClassName,
			)}
			rows={1}
			{...rest}
		/>
	);
}