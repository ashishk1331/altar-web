import AFallback from "@/components/blocks/AFallback";
import AuthWrapper from "@/wrappers/AuthWrapper";
import { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
	return (
		<AuthWrapper>
			<AFallback>{children}</AFallback>
		</AuthWrapper>
	);
}
