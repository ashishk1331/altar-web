import { Asterisk } from "lucide-react";
import { useId, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { XStack } from "./Stack";

type InputProps = {
	label?: string;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
	label = "",
	className: passedOnClassName,
	...rest
}: InputProps) {
	const inputId = useId();

	return (
		<>
			{label && (
				<label className="px-1" htmlFor={inputId}>
					<XStack className="gap-0 items-start">
						<span>{label}</span>
						{rest.required && <Asterisk size={16} className="text-red-400" />}
					</XStack>
				</label>
			)}
			<input
				id={inputId}
				className={twMerge(
					"bg-neutral-100 rounded p-2 px-4 placeholder:text-neutral-400 outline-neutral-100 min-w-3xs",
					passedOnClassName,
				)}
				{...rest}
			/>
		</>
	);
}
