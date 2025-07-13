"use client";

import { useUserContext } from "@/components/blocks/AFallback";
import BackNav from "@/components/blocks/BackNav";
import Button from "@/components/ui/Button";
import { P } from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import { XStack, YStack } from "@/components/ui/Stack";
import Textarea from "@/components/ui/Textarea";
import { callToast } from "@/components/ui/Toast";
import { iconSize } from "@/constants/tokens";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAction } from "@/hooks/useAction";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "convex/react";
import { View } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function EditProfilePage() {
	const {
		user: { firstName, lastName, bio, _id: userId },
	} = useUserContext();
	const updateLocalUser = useUserStore((state) => state.updateUser);

	const [userDetails, setUserDetails] = useState({ firstName, lastName, bio });

	const updateUser = useMutation(api.users.updateUser);
	const { loading: isLoading, action: handleSubmit } = useAction(
		async function () {
			const payload: Partial<
				Pick<Doc<"users">, "firstName" | "lastName" | "bio">
			> = {};
			if (firstName !== userDetails.firstName && firstName.length > 0) {
				payload.firstName = userDetails.firstName;
			}
			if (lastName !== userDetails.lastName) {
				payload.lastName = userDetails.lastName;
			}
			if (bio !== userDetails.bio) {
				payload.bio = userDetails.bio;
			}
			updateLocalUser(payload);
			await updateUser({ userId, ...payload });
			callToast.success("Updated user details.");
		},
	);

	function handleChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setUserDetails((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	return (
		<>
			<BackNav
				title="Edit Profile"
				rightExtra={
					<XStack className="ml-auto gap-4">
						<Link href={`/author/${userId}`} target="_blank">
							<Button variant="outline">
								<View size={iconSize} />
								<P>View</P>
							</Button>
						</Link>
						<Button
							isLoading={isLoading}
							disabled={isLoading}
							onClick={handleSubmit}
						>
							Save
						</Button>
					</XStack>
				}
			/>
			<YStack className="*:w-full mt-8 gap-4 [&_input]:not-last:mb-4">
				<Input
					disabled={isLoading}
					name="firstName"
					value={userDetails.firstName}
					onChange={handleChange}
					placeholder="First Name"
					type="text"
					label="First Name"
				/>
				<Input
					disabled={isLoading}
					name="lastName"
					value={userDetails.lastName}
					onChange={handleChange}
					placeholder="Last Name"
					type="text"
					label="Last Name"
				/>
				<Textarea
					disabled={isLoading}
					name="bio"
					value={userDetails.bio}
					onChange={handleChange}
					placeholder="Bio"
					label="Bio"
				/>
			</YStack>
		</>
	);
}
