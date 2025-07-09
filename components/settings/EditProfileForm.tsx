"use client";

import { ChangeEvent, useState } from "react";
import { useUserContext } from "../blocks/AFallback";
import BackNav from "../blocks/BackNav";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { XStack, YStack } from "../ui/Stack";
import Textarea from "../ui/Textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAction } from "@/hooks/useAction";
import { callToast } from "../ui/Toast";
import { Doc } from "@/convex/_generated/dataModel";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { View } from "lucide-react";
import { iconSize } from "@/constants/tokens";
import { P } from "../ui/Heading";

export default function EditProfileForm() {
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
			if (firstName !== userDetails.firstName) {
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
								<View size={iconSize - 4} />
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
