import { AlertCircle, CircleCheck, Hand, Info } from "lucide-react";
import toast from "react-hot-toast";

type CustomToastProps = {
	message: string;
	variant?: "normal" | "success" | "error" | "bye";
};

function CustomToast({ message, variant = "normal" }: CustomToastProps) {
	return (
		<div className="p-1.5 px-4 rounded border border-neutral-300 shadow flex items-center gap-2 w-xs bg-white">
			{variant === "success" ? (
				<CircleCheck size={20} className="text-white fill-green-500" />
			) : variant === "error" ? (
				<AlertCircle size={16} className="text-white fill-red-500" />
			) : variant === "bye" ? (
				<Hand size={16} className="text-white fill-indigo-500" />
			) : (
				<Info size={16} className="text-white fill-neutral-500" />
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
