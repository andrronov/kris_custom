import { joinStrings } from "@/shared/lib/utils";

export const serializeStringArray = (
  v: string[] | null | undefined,
): string | undefined => {
  if (Array.isArray(v) && v.length > 0) {
    return joinStrings(v);
  }
  return undefined;
};

export const parseStringArray = <T extends string = string>(
  v: unknown,
): T[] => {
  if (!v || typeof v !== "string" || v.trim().length === 0) {
    return [];
  }
  return v.trim().split(",") as T[];
};

export const serializePriceRange = (
  v: readonly [number, number] | null | undefined,
  defaults: readonly [number, number],
): string | undefined => {
  if (!v || !Array.isArray(v) || v.length !== 2) {
    return undefined;
  }
  const [min, max] = v;
  const [defaultMin, defaultMax] = defaults;

  if (min === defaultMin && max === defaultMax) {
    return undefined;
  }
  return `${min},${max}`;
};

export const parsePriceRange = (
  v: unknown,
  defaults: readonly [number, number],
  bounds?: { min: number; max: number },
): [number, number] => {
  if (!v || typeof v !== "string" || v.trim().length === 0) {
    return [...defaults];
  }
  const [minStr, maxStr] = v.split(",");
  let min = Number(minStr);
  let max = Number(maxStr);

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return [...defaults];
  }

  if (bounds) {
    min = Math.max(bounds.min, Math.min(bounds.max, min));
    max = Math.max(bounds.min, Math.min(bounds.max, max));
  }

  return [min, max];
};
