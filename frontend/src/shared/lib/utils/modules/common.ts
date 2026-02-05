export { objectEntries } from "@vueuse/core";

export function nothing() {}

export function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

export function getKeys<T extends Record<string, unknown>>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function getValues<T extends Record<string, unknown>>(obj: T) {
  return Object.values(obj) as T[keyof T][];
}

export function fromEntries<T extends Array<[PropertyKey, unknown]>>(
  entries: T,
) {
  return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
}
