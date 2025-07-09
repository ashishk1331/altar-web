"use client";

import Image from "next/image";
import { H1, H3 } from "../ui/Heading";
import { YStack } from "../ui/Stack";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserStore } from "@/store/userStore";
import { useShallow } from "zustand/shallow";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { decodeJWT, subsetUser } from "@/utils/auth";
import { callToast } from "../ui/Toast";

export default function Hero() {
	const router = useRouter();
	const upsertUser = useMutation(api.users.upsertUser);
	const [setUser, setLastLoggedIn] = useUserStore(
		useShallow((state) => [state.setUser, state.setLastLoggedIn]),
	);

	async function handleSuccess(creds: CredentialResponse) {
		const decoded_creds = decodeJWT(creds.credential ?? "");
		const user = subsetUser(decoded_creds);
		const dbUser = await upsertUser(user);
		setUser(dbUser);
		setLastLoggedIn(Date.now());
		callToast.success("Logged in successfully.");
		router.push("/home");
	}

	function handleError() {
		callToast.error("Error logging you in.");
	}

	return (
		<YStack>
			<YStack className="my-12 justify-center">
				<H1>Join the safe place</H1>
				<H3>for your writing rituals.</H3>
				<div className="mt-4">
					<GoogleLogin onSuccess={handleSuccess} onError={handleError} />
				</div>
			</YStack>
			<Image
				src="/people.webp"
				width={1024}
				height={720}
				alt="Banner image."
				className="scale-110 md:scale-none"
				priority
			/>
		</YStack>
	);
}
