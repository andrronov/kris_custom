export { objectEntries } from "@vueuse/core";

export function nothing() {};

export function isDefined<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null;
  }
