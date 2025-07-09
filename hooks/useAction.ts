import { callToast } from "@/components/ui/Toast";
import { useState, useCallback } from "react";

type AsyncFn<TArgs extends any[], TResult> = (
	...args: TArgs
) => Promise<TResult>;

export function useAction<TArgs extends any[], TResult>(
	asyncFn: AsyncFn<TArgs, TResult>,
) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const action = useCallback(
		async (...args: TArgs): Promise<TResult | null> => {
			setLoading(true);
			setError(null);

			try {
				const result = await asyncFn(...args);
				return result;
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message ?? "An unknown error occurred.");
					callToast.error(err.message);
				} else {
					setError("An unknown error occurred.");
				}
				return null;
			} finally {
				setLoading(false);
			}
		},
		[asyncFn],
	);

	return { loading, error, action };
}
