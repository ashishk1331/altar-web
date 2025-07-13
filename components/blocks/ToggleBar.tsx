import { P } from "../ui/Heading";
import { XStack } from "../ui/Stack";
import ToggleSwitch from "../ui/ToggleSwitch";

type SettingBarProps = {
	label: string;
	isOn: boolean;
	setIsOn: () => void;
};

export default function ToggleBar({ label, isOn, setIsOn }: SettingBarProps) {
	return (
		<XStack className="justify-between p-1.5 px-3">
			<P>{label}</P>
			<ToggleSwitch isOn={isOn} setIsOn={setIsOn} />
		</XStack>
	);
}
