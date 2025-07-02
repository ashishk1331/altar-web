export function captilize(text: string): string {
	if (text.length < 1) return text;
	return text
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.substring(1))
		.join(" ");
}
