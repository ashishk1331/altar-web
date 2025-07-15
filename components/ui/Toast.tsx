import { AlertCircle, CircleCheck, Hand, Info } from "lucide-react";
import toast from "react-hot-toast";

type CustomToastProps = {
	message: string;
	variant?: "normal" | "success" | "error" | "bye";
};

function CustomToast({ message, variant = "normal" }: CustomToastProps) {
	return (
		<div className="p-1.5 px-4 rounded border border-neutral-200 dark:border-neutral-800 flex items-center gap-2 w-xs bg-neutral-50 dark:bg-neutral-900">
			{variant === "success" ? (
				<CircleCheck
					size={20}
					className="text-neutral-50 fill-green-500 dark:stroke-neutral-900"
				/>
			) : variant === "error" ? (
				<AlertCircle
					size={16}
					className="text-neutral-50 fill-red-500 dark:stroke-neutral-900"
				/>
			) : variant === "bye" ? (
				<Hand
					size={16}
					className="text-neutral-50 fill-indigo-500 dark:stroke-neutral-900"
				/>
			) : (
				<Info
					size={16}
					className="text-neutral-50 fill-neutral-500 dark:stroke-neutral-900"
				/>
			)}
			<span>{message}</span>
		</div>
	);
}

export const callToast = {
	success(message: string) {
		toast.custom(<CustomToast variant="success" message={message} />);
	},
	error(message: string) {
		toast.custom(<CustomToast variant="error" message={message} />);
	},
	alert(message: string) {
		toast.custom(<CustomToast variant="normal" message={message} />);
	},
	bye() {
		toast.custom(<CustomToast variant="bye" message="Bye bye" />);
	},
};
