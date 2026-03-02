import { ref, type Ref } from "vue";
import type { APIError } from "@/shared/types";

interface UseAsync<T extends (...args: unknown[]) => unknown, E = APIError> {
  loading: Ref<boolean>;
  error: Ref<E | null>;
  run: (...args: Parameters<T>) => Promise<ReturnType<T>>;
  stop: () => void;
}

interface AsyncProcessOptions {
  refetchInterval?: number;
}

export function createAsyncProcess<T extends (...args: any) => unknown>(
  fn: T,
  options?: AsyncProcessOptions,
): UseAsync<T> {
  const loading = ref(false);
  const error = ref(null);

  const timer = ref<ReturnType<typeof setTimeout> | undefined>();
  const isActive = ref(true);

  const run: UseAsync<T>["run"] = async (...args) => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = undefined;
    }

    try {
      loading.value = true;
      error.value = null;
      const result = await fn(...args);

      if (options?.refetchInterval && isActive.value) {
        timer.value = setTimeout(() => run(...args), options.refetchInterval);
      }

      return result as ReturnType<T>;
    } catch (err) {
      // @ts-ignore
      error.value = err;
      return error as ReturnType<T>;
    } finally {
      loading.value = false;
    }
  };

  const stop: UseAsync<T>["stop"] = () => {
    isActive.value = false;
    if (timer.value) {
      clearTimeout(timer.value);
    }
  };

  return {
    run,
    loading,
    error,
    stop,
  };
}
