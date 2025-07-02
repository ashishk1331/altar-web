"use client";

import { H3 } from "@/components/ui/Heading";
import { YStack } from "@/components/ui/Stack";
import { callToast } from "@/components/ui/Toast";
import { useUserStore } from "@/store/userStore";
import { decodeJWT, subsetUser } from "@/utils/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useShallow } from "zustand/shallow";
import { useRouter } from "next/navigation";

export default function SignInPage() {
	const router = useRouter();
	const [setUser, setLastLoggedIn] = useUserStore(
		useShallow((state) => [state.setUser, state.setLastLoggedIn]),
	);

	function handleSuccess(creds: CredentialResponse) {
		const decoded_creds = decodeJWT(creds.credential ?? "");
		const user = subsetUser(decoded_creds);
		setUser(user);
		setLastLoggedIn(Date.now());
		callToast.success("Logged in successfully.");
		router.push("/home");
	}

	function handleError() {
		callToast.error("Error logging you in.");
	}

	return (
		<YStack className="mt-24 gap-4">
			<H3>Login</H3>
			<GoogleLogin onSuccess={handleSuccess} onError={handleError} />
		</YStack>
	);
}
