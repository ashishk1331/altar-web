import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type TextProps = {
	className?: string;
} & PropsWithChildren;

export function H1({ className: passedOnClassName, children }: TextProps) {
	return (
		<h1
			className={twMerge(
				"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
				passedOnClassName,
			)}
		>
			{children}
		</h1>
	);
}

export function H2({ className: passedOnClassName, children }: TextProps) {
	return (
		<h2
			className={twMerge(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
				passedOnClassName,
			)}
		>
			{children}
		</h2>
	);
}

export function H3({ className: passedOnClassName, children }: TextProps) {
	return (
		<h3
			className={twMerge(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				passedOnClassName,
			)}
		>
			{children}
		</h3>
	);
}

export function H4({ className: passedOnClassName, children }: TextProps) {
	return (
		<h4
			className={twMerge(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				passedOnClassName,
			)}
		>
			{children}
		</h4>
	);
}

export function P({ className: passedOnClassName, children }: TextProps) {
	return <p className={twMerge("leading-7", passedOnClassName)}>{children}</p>;
}

export function Caption({ className: passedOnClassName, children }: TextProps) {
	return (
		<span className={twMerge("text-xs leading-7", passedOnClassName)}>
			{children}
		</span>
	);
}
