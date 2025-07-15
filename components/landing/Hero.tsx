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
import AFallback from "../blocks/AFallback";
import Button from "../ui/Button";

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
				<Image
					width={512}
					height={512}
					alt="about"
					src="/altar-light.svg"
					className="block dark:hidden max-w-48 aspect-sqaure"
				/>
				<Image
					width={512}
					height={512}
					alt="about"
					src="/altar-dark.svg"
					className="hidden dark:block max-w-48 aspect-sqaure"
				/>
				<H1>Join the safe place</H1>
				<H3>for your late night writing rituals.</H3>
				<div className="my-8">
					<AFallback
						fallback={
							<GoogleLogin onSuccess={handleSuccess} onError={handleError} />
						}
					>
						<Button onClick={() => router.push("/home")}>Jump to home</Button>
					</AFallback>
				</div>
			</YStack>
		</YStack>
	);
}
