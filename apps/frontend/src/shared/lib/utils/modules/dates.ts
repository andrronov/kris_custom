import { dayjs } from "@/shared/services/dayjs";

type DTime = Date | string | number;
type DateTimeLabel = "morning" | "afternoon" | "evening" | "night";

export function getRelativeTime(date: DTime): string {
  return dayjs(date).fromNow();
}

function getDayTimeLabel(date: DTime = new Date()): DateTimeLabel {
  const h = dayjs(date).hour();

  if (h >= 5 && h < 12) {
    return "morning";
  } else if (h < 5 || h > 22) {
    return "night";
  } else if (h < 17) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export function getDayTime(date: DTime = new Date()) {
  return {
    label: getDayTimeLabel(date),
    hour: dayjs(date).hour(),
    minute: dayjs(date).minute(),
    second: dayjs(date).second(),
  };
}
