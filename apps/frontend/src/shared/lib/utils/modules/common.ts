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

export function joinStrings<T extends readonly string[]>(
  arr: T,
  separator: string = ",",
): `${T[number]}` {
  return arr.join(separator) as `${T[number]}`;
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function isObject(val: unknown) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}
