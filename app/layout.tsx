import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import Container from "@/components/blocks/Container";
import Tupperware from "@/components/blocks/Tupperware";
import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { twMerge } from "tailwind-merge";
import ThemeWrapper from "@/wrappers/ThemeWrapper";
import { ModalWrapper } from "@/components/ui/Modal";

const barlow = Barlow({
	variable: "--font-barlow",
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Altar",
	description: "Place to share your poems.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={twMerge(
					barlow.variable,
					"antialiased",
					"text-neutral-900 bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-100",
				)}
			>
				<ModalWrapper>
					<ThemeWrapper>
						<GoogleOAuthProvider
							clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
						>
							<ConvexClientProvider>
								<Container>
									<Tupperware>{children}</Tupperware>
								</Container>
							</ConvexClientProvider>
						</GoogleOAuthProvider>
					</ThemeWrapper>
				</ModalWrapper>
				<Toaster position="bottom-right" reverseOrder />
			</body>
		</html>
	);
}
