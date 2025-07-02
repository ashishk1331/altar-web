import { User } from "@/store/userStore";

export function decodeJWT(token: string) {
	const payload = token.split(".")[1];

	const decodedPayload = JSON.parse(atob(payload));
	return decodedPayload;
}

export function subsetUser(originalPayload: Record<string, string>): User {
	const { email, picture, given_name, family_name, name } = originalPayload;
	return { email, picture, given_name, family_name, name };
}
