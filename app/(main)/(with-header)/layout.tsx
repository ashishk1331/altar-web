import type { PropsWithChildren } from "react";
import Header from "@/components/blocks/Header";
import WriteButton from "@/components/blocks/WriteButton";
import AFallback from "@/components/blocks/AFallback";
import SigninBanner from "@/components/blocks/SigninBanner";

export default function InnerLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			{children}
			<AFallback fallback={<SigninBanner />}>
				<WriteButton />
			</AFallback>
		</>
	);
}
