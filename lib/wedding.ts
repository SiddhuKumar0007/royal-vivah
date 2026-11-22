export const wedding = {
  title: 'The Royal Vivah',
  subtitle: 'A Timeless Love Story',
  groom: 'सौरभ कुमार सिंह',
  bride: 'दीपांजलि सिंह',
  groomFather: 'श्री पवन कुमार सिंह',
  brideFather: 'श्री कामेश्वर सिंह',
  couple: 'सौरभ एवं दीपांजलि',
  shortGroom: 'सौरभ',
  shortBride: 'दीपांजलि',
  groomEnglish: 'Saurabh',
  brideEnglish: 'Deepanjali',
  venueShortEnglish: 'Paterva, Bihar',
  dateISO: '2026-12-04T16:00:00+05:30',
  timezone: 'Asia/Kolkata',
  dateHindi: '4 दिसंबर 2026, शुक्रवार',
  dateEnglish: 'Friday, 4 December 2026',
  time: 'शाम 4:00 बजे से',
  venue: ['ग्राम–पटेरवा,', 'पोस्ट–रुपडीह,', 'थाना–मुफ्फसिल मोतिहारी,', 'जिला–पूर्वी चम्पारण,', 'बिहार, भारत'],
  ceremonies: [
    { id: 'puja', name: 'पूजा एवं मटकोर', english: 'Puja & Matkor', date: '2 दिसंबर 2026, बुधवार', caption: 'आस्था से आरंभ', kind: 'kalash' },
    { id: 'haldi', name: 'हल्दी एवं मेहंदी', english: 'Haldi & Mehendi', date: '3 दिसंबर 2026, गुरुवार', caption: 'रंगों में रचा प्रेम', kind: 'lotus' },
    { id: 'pret-bhoj', name: 'प्रीत भोज', english: 'Pret Bhoj', time: 'शाम 4:00 बजे से', caption: 'स्नेह और सत्कार', kind: 'feast' },
  ],
  invitation: 'आप सपरिवार पधारकर शुभ अवसर की शोभा बढ़ाएँ।',
  closing: 'सौरभ ♥ दीपांजलि',
} as const;

const weddingDate = new Date(wedding.dateISO);
const format = (options: Intl.DateTimeFormatOptions, locale = 'en-GB') => new Intl.DateTimeFormat(locale, { ...options, timeZone: wedding.timezone }).format(weddingDate);
export const dateDisplay = { day: format({ day: '2-digit' }), month: format({ month: 'long' }).toUpperCase(), monthNumber: format({ month: '2-digit' }), year: format({ year: 'numeric' }), weekdayHindi: format({ weekday: 'long' }, 'hi-IN') };
export const dateLine = `${dateDisplay.day} ${dateDisplay.month} ${dateDisplay.year}`;

export const mapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue.join(' '))}`;

export function getCountdown(now: number) {
  const remaining = Math.max(0, Date.parse(wedding.dateISO) - now);
  return {
    passed: remaining === 0,
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
}
