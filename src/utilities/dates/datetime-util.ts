import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

// Day.js eklentilerini yükle
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

/**
 * Tarayıcı diline göre locale ayarını yapılandırır.
 */
const configureDayjsLocale = async () => {
  const userLanguage = navigator.language || "en"; // Örn: "en-US", "tr-TR"
  const languageCode = userLanguage.split("-")[0]; // Örn: "en", "tr"

  try {
    // Tarayıcı diline uygun locale dosyasını yükle
    await import(`dayjs/locale/${languageCode}.js`);
    dayjs.locale(languageCode);
  } catch (error) {
    console.warn(`Locale "${languageCode}" yüklenemedi. Varsayılan İngilizce kullanılacak.`);
    dayjs.locale("en"); // Varsayılan dil
  }
};

// Locale ayarını başlat
await configureDayjsLocale();

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
