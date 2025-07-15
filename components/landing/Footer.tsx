import { P } from "../ui/Heading";

export default function Footer() {
	return (
		<footer className="my-12 text-neutral-500 flex w-full items-center justify-center">
			<P>
				Altar created by{" "}
				<a
					className="underline underline-offset-2"
					href="https://github.com/ashishk1331"
				>
					AshishK
				</a>
			</P>
		</footer>
	);
}
