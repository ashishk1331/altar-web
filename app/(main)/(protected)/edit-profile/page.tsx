import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { YStack } from "@/components/ui/Stack";
import Textarea from "@/components/ui/Textarea";

export default function EditProfilePage() {
	return (
		<>
			<BackNav
				title="Edit Profile"
				rightExtra={<Button className="ml-auto">Save</Button>}
			/>
			<YStack className="*:w-full mt-8 gap-4">
				<Input placeholder="First Name" />
				<Input placeholder="Last Name" />
				<Textarea placeholder="Bio" />
				<Input placeholder="Password" />
				<Input placeholder="Confirm Password" />
			</YStack>
		</>
	);
}
