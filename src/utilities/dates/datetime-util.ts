// /**
//  * Tarihi UTC formatına dönüştürür.
//  * @param date Yerel tarih
//  */
// export const toUTC = (date: string | Date): string => {
//   return new Date(date).toISOString();
// };

// /**
//  * UTC bir tarihi yerel saat dilimine çevirir ve otomatik formatlar.
//  * @param date UTC tarih
//  */
// export const toLocalTime = (date: string | Date): string => {
//   return new Intl.DateTimeFormat(navigator.language, {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(date));
// };

// /**
//  * Yerel tarihi formatlar (tamamen otomatik).
//  * @param date Tarih nesnesi veya string tarih
//  */
// export const autoFormatToLocale = (date: string | Date): string => {
//   return new Intl.DateTimeFormat(navigator.language, {
//     dateStyle: "full",
//     timeStyle: "medium",
//   }).format(new Date(date));
// };

// ----------------------------------------------------------------------------------------------------------------------------------





import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

// Day.js eklentilerini yükle
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

/**
 * Tarihi UTC formatına dönüştürür.
 * @param date Yerel tarih
 */
export const toUTC = (date: string | Date): string => {
  return dayjs(date).utc().format(); // ISO 8601 formatı
};

/**
 * UTC bir tarihi yerel saat dilimine çevirir ve otomatik formatlar.
 * @param date UTC tarih
 */
export const toLocalTime = (date: string | Date): string => {
  const timeZone = dayjs.tz.guess(); // Tarayıcının zaman dilimini tahmin eder
  return dayjs(date).tz(timeZone).format("L LT");
};

/**
 * Yerel tarihi formatlar (tamamen otomatik).
 * @param date Tarih nesnesi veya string tarih
 */
export const autoFormatToLocale = (date: string | Date): string => {
  const timeZone = dayjs.tz.guess();
  return dayjs(date).tz(timeZone).format("LLLL"); // Gün, tarih, saat gibi tam format
};



