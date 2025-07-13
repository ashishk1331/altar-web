import { motion } from "framer-motion";

type ToggleSwitchProps = {
	isOn: boolean;
	setIsOn: () => void;
};

export default function ToggleSwitch({
	isOn = false,
	setIsOn,
}: ToggleSwitchProps) {
	return (
		<motion.div
			role="button"
			onClick={setIsOn}
			className="w-12 h-6 p-1 rounded-full flex items-center cursor-pointer"
			animate={{
				backgroundColor: isOn
					? "var(--color-indigo-500)"
					: "var(--color-neutral-200)",
			}}
			transition={{ duration: 0.2, ease: "easeInOut" }}
		>
			<motion.div
				className="h-4 w-4 rounded-full bg-white shadow-sm"
				animate={{
					x: isOn ? 24 : 0,
				}}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			/>
		</motion.div>
	);
}
