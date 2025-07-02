import Image, { type ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
	variant: "xs" | "sm" | "md" | "lg" | "xl" | "huge";
};

type VariantDict = Record<AvatarProps["variant"], string>;

export default function Avatar({
	src,
	width = 512,
	className: passedOnClassName,
	alt,
	variant = "xs",
}: ImageProps & AvatarProps) {
	const variants: VariantDict = {
		xs: "size-4 rounded-xs",
		sm: "size-6 rounded-sm",
		md: "size-8 rounded-md",
		lg: "size-10 rounded-lg",
		xl: "size-12 rounded-xl",
		huge: "size-48 rounded-4xl",
	};

	if (!src)
		return (
			<div
				className={twMerge(
					"aspect-square bg-neutral-200 animate-pulse",
					variants[variant],
					passedOnClassName,
				)}
			/>
		);

	return (
		<Image
			src={src}
			width={width}
			height={width}
			className={twMerge("aspect-square", variants[variant], passedOnClassName)}
			alt={alt}
		/>
	);
}
