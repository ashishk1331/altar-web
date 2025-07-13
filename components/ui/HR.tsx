import { twMerge } from "tailwind-merge";

type HRProps = {
	className?: string;
};

export default function HR({ className: passedOnClassName }: HRProps) {
	return (
		<hr
			className={twMerge(
				"text-neutral-200 dark:text-neutral-800",
				passedOnClassName,
			)}
		/>
	);
}
