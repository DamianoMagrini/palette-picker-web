export type DebouncedFunction<Args extends any[], ReturnType> = (...args: Args) => ReturnType;

/**
 * Returns a wrapped version of the input function that runs, at most, once every `interval`. When the wrapped function
 * doesn't run, the last (cached) result is returned instead. Adapted from https://www.npmjs.com/package/debounce.
 *
 * @param debouncee The function to debounce.
 * @param interval The timeout, in milliseconds.
 * @param context The context to run the function with.
 * @param immediate Whether to execute at the beginning.
 */
export const debounce = <Args extends any[], ReturnType>(
	debouncee: (...args: Args) => ReturnType,
	interval: number = 100,
	immediate: boolean = false,
	context: any = undefined,
) => {
	let timeout_ref: number, debouncee_args: any[], last_result: ReturnType;

	const call_debouncee = () => {
		last_result = debouncee.apply(context, debouncee_args);
		debouncee_args.length = 0;
	};

	const later = () => {
		timeout_ref = null;
		if (!immediate) call_debouncee();
	};

	const debounced: DebouncedFunction<Args, ReturnType> = (...args) => {
		debouncee_args = args;
		const should_call = immediate && !timeout_ref;

		if (!timeout_ref) timeout_ref = window.setTimeout(later, interval);
		if (should_call) call_debouncee();

		return last_result;
	};

	return debounced;
};
