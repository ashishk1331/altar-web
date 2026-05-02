import type { ZodType } from "zod";

export function zodValidate<T>(
	values: T,
	schema: ZodType<T>,
): Record<string, string> {
	const result = schema.safeParse(values);
	if (result.success) return {};

	const formikErrors: Record<string, string> = {};

	for (const issue of result.error.issues) {
		const key = issue.path[0];
		if (typeof key === "string") {
			formikErrors[key] = issue.message;
		}
	}

	return formikErrors;
}
