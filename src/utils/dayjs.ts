import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import type { Timestamp } from "firebase/firestore";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const formatPostDate = (firebaseTimestamp: Timestamp): string => {
  const created = dayjs(firebaseTimestamp.toDate());
  const now = dayjs();

  return now.diff(created, "day") >= 1
    ? created.format("YYYY.MM.DD")
    : created.fromNow();
};
