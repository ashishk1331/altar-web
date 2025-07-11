import { iconSize } from "@/constants/tokens";
import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { YStack } from "./Stack";
import { P } from "./Heading";

type LoaderProps = {
	variant?: "light" | "dark";
	className?: string;
	message?: string;
};

type VariantDict = Record<NonNullable<LoaderProps["variant"]>, string>;

export default function Loader({
	variant = "light",
	className: passedOnClassName,
	message,
}: LoaderProps) {
	const variants: VariantDict = {
		light: "",
		dark: "",
	};

	return (
		<YStack
			className={twMerge(
				"justify-center",
				variants[variant],
				passedOnClassName,
			)}
		>
			<LoaderCircle size={iconSize} className="animate-spin" />
			{message && <P>{message}</P>}
		</YStack>
	);
}
