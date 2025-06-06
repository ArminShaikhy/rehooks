import { useCallback, useEffect, useRef } from "react";

const description = "Returns a throttled version of the provided function.";

/**
 * Type for throttle options
 * @typedef {Object} ThrottleOptions
 * @property {number} [wait=300] - The number of milliseconds to throttle invocations to
 * @property {boolean} [leading=true] - Specify invoking on the leading edge of the timeout
 * @property {boolean} [trailing=true] - Specify invoking on the trailing edge of the timeout
 */

/**
 * Returns a throttled version of the provided function.
 * The throttled function will only execute at most once per every `wait` milliseconds.
 *
 * @template T - Generic type extending function
 * @param {T} fn - The function to throttle
 * @param {ThrottleOptions} [options] - The configuration options
 * @param {number} [options.wait=300] - The number of milliseconds to throttle invocations to
 * @param {boolean} [options.leading=true] - If true, the function will execute on the leading edge of the timeout
 * @param {boolean} [options.trailing=true] - If true, the function will execute on the trailing edge of the timeout
 *
 * @returns {(...args: Parameters<T>) => void} A throttled version of the provided function
 */

type ThrottleOptions = {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
};

export function useThrottle<T extends (...args: unknown[]) => void>(
  fn: T,
  options: ThrottleOptions = {},
): (...args: Parameters<T>) => void {
  const { wait = 300, leading = true, trailing = true } = options;

  const timeoutRef = useRef<number | null>(null);
  const lastRunRef = useRef<number>(0);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const fnRef = useRef(fn);
  const isFirstCall = useRef(true);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const elapsed = now - lastRunRef.current;
      lastArgsRef.current = args;

      const execute = () => {
        if (lastArgsRef.current) {
          fnRef.current(...lastArgsRef.current);
          lastRunRef.current = Date.now();
          timeoutRef.current = null;
        }
      };

      if (isFirstCall.current) {
        isFirstCall.current = false;
        if (leading) {
          execute();
          return;
        }
      }

      if (elapsed >= wait) {
        if (leading) {
          execute();
        } else if (trailing && timeoutRef.current === null) {
          timeoutRef.current = window.setTimeout(execute, wait);
        }
      } else if (trailing && timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(execute, wait - elapsed);
      }
    },
    [fn, wait, leading, trailing],
  );
}
