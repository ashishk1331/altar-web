import AuthWrapper from "@/wrappers/AuthWrapper";
import { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
	return <AuthWrapper>{children}</AuthWrapper>;
}
