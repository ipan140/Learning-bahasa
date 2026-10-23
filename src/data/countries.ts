export interface CountryItem {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  region: 'Asia' | 'Eropa' | 'Timur Tengah' | 'Amerika' | 'Afrika';
  language: string;
  script: string;
  tableId?: string;
  voiceLang?: string;
}

export const worldCountries: CountryItem[] = [
  // Asia
  { id: 'jepang', name: 'Jepang', nativeName: '日本 (Japan)', flag: '🇯🇵', region: 'Asia', language: 'Bahasa Jepang', script: 'Hiragana, Katakana, Kanji', tableId: 'jepang-hiragana', voiceLang: 'ja-JP' },
  { id: 'korea-selatan', name: 'Korea Selatan', nativeName: '대한민국 (South Korea)', flag: '🇰🇷', region: 'Asia', language: 'Bahasa Korea', script: 'Hangul', tableId: 'korea-hangul', voiceLang: 'ko-KR' },
  { id: 'tiongkok', name: 'Tiongkok / China', nativeName: '中国 (China)', flag: '🇨🇳', region: 'Asia', language: 'Bahasa Mandarin', script: 'Hanzi (Sederhana / Tradisional)', tableId: 'mandarin-dasar', voiceLang: 'zh-CN' },
  { id: 'thailand', name: 'Thailand', nativeName: 'ประเทศไทย', flag: '🇹🇭', region: 'Asia', language: 'Bahasa Thai', script: 'Aksara Thai', voiceLang: 'th-TH' },
  { id: 'vietnam', name: 'Vietnam', nativeName: 'Việt Nam', flag: '🇻🇳', region: 'Asia', language: 'Bahasa Vietnam', script: 'Latin (Chữ Quốc ngữ)', voiceLang: 'vi-VN' },
  { id: 'india', name: 'India', nativeName: 'भारत (India)', flag: '🇮🇳', region: 'Asia', language: 'Hindi & Inggris', script: 'Devanagari', voiceLang: 'hi-IN' },
  { id: 'indonesia', name: 'Indonesia', nativeName: 'Indonesia', flag: '🇮🇩', region: 'Asia', language: 'Bahasa Indonesia', script: 'Latin', voiceLang: 'id-ID' },
  { id: 'malaysia', name: 'Malaysia', nativeName: 'Malaysia', flag: '🇲🇾', region: 'Asia', language: 'Bahasa Melayu', script: 'Latin & Jawi', voiceLang: 'ms-MY' },
  { id: 'filipina', name: 'Filipina', nativeName: 'Pilipinas', flag: '🇵🇭', region: 'Asia', language: 'Filipino / Tagalog', script: 'Latin (Baybayin kuno)', voiceLang: 'fil-PH' },

  // Eropa
  { id: 'jerman', name: 'Jerman', nativeName: 'Deutschland', flag: '🇩🇪', region: 'Eropa', language: 'Bahasa Jerman', script: 'Latin (Umlaut Ä Ö Ü, ß)', tableId: 'jerman-dasar', voiceLang: 'de-DE' },
  { id: 'prancis', name: 'Prancis', nativeName: 'France', flag: '🇫🇷', region: 'Eropa', language: 'Bahasa Prancis', script: 'Latin (Aksen É È Ç Œ)', voiceLang: 'fr-FR' },
  { id: 'spanyol', name: 'Spanyol', nativeName: 'España', flag: '🇪🇸', region: 'Eropa', language: 'Bahasa Spanyol', script: 'Latin (Ñ, ¿)', voiceLang: 'es-ES' },
  { id: 'italia', name: 'Italia', nativeName: 'Italia', flag: '🇮🇹', region: 'Eropa', language: 'Bahasa Italia', script: 'Latin', voiceLang: 'it-IT' },
  { id: 'rusia', name: 'Rusia', nativeName: 'Россия (Russia)', flag: '🇷🇺', region: 'Eropa', language: 'Bahasa Rusia', script: 'Sirilik (Cyrillic)', tableId: 'rusia-cyrillic', voiceLang: 'ru-RU' },
  { id: 'yunani', name: 'Yunani', nativeName: 'Ελλάδα (Greece)', flag: '🇬🇷', region: 'Eropa', language: 'Bahasa Yunani', script: 'Alfabet Yunani (Greek)', tableId: 'yunani-greek', voiceLang: 'el-GR' },
  { id: 'belanda', name: 'Belanda', nativeName: 'Nederland', flag: '🇳🇱', region: 'Eropa', language: 'Bahasa Belanda (Dutch)', script: 'Latin (IJ)', voiceLang: 'nl-NL' },
  { id: 'inggris', name: 'Inggris (UK)', nativeName: 'United Kingdom', flag: '🇬🇧', region: 'Eropa', language: 'Bahasa Inggris', script: 'Latin', voiceLang: 'en-GB' },
  { id: 'swedia', name: 'Swedia', nativeName: 'Sverige', flag: '🇸🇪', region: 'Eropa', language: 'Bahasa Swedia', script: 'Latin (Å Ä Ö)', voiceLang: 'sv-SE' },
  { id: 'turki', name: 'Turki', nativeName: 'Türkiye', flag: '🇹🇷', region: 'Eropa', language: 'Bahasa Turki', script: 'Latin (Ç Ğ I İ Ö Ş Ü)', voiceLang: 'tr-TR' },

  // Timur Tengah
  { id: 'arab-saudi', name: 'Arab Saudi', nativeName: 'المملكة العربية السعودية', flag: '🇸🇦', region: 'Timur Tengah', language: 'Bahasa Arab', script: 'Huruf Hijaiyah', tableId: 'arab-hijaiyah', voiceLang: 'ar-SA' },
  { id: 'mesir', name: 'Mesir', nativeName: 'مصر (Egypt)', flag: '🇪🇸', region: 'Timur Tengah', language: 'Bahasa Arab (Dialek Mesir)', script: 'Hijaiyah', tableId: 'arab-hijaiyah', voiceLang: 'ar-EG' },
  { id: 'uea', name: 'Uni Emirat Arab', nativeName: 'الإمارات العربية المتحدة', flag: '🇦🇪', region: 'Timur Tengah', language: 'Bahasa Arab', script: 'Hijaiyah', tableId: 'arab-hijaiyah', voiceLang: 'ar-AE' },
  { id: 'iran', name: 'Iran', nativeName: 'ایران (Iran)', flag: '🇮🇷', region: 'Timur Tengah', language: 'Bahasa Persia (Farsi)', script: 'Aksara Persia (Arabik)', voiceLang: 'fa-IR' },

  // Amerika
  { id: 'amerika-serikat', name: 'Amerika Serikat', nativeName: 'United States', flag: '🇺🇸', region: 'Amerika', language: 'Bahasa Inggris', script: 'Latin', voiceLang: 'en-US' },
  { id: 'brasil', name: 'Brasil', nativeName: 'Brasil', flag: '🇧🇷', region: 'Amerika', language: 'Bahasa Portugis', script: 'Latin (Ã Õ Ç)', voiceLang: 'pt-BR' },
  { id: 'meksiko', name: 'Meksiko', nativeName: 'México', flag: '🇲🇽', region: 'Amerika', language: 'Bahasa Spanyol', script: 'Latin', voiceLang: 'es-MX' },
  { id: 'kanada', name: 'Kanada', nativeName: 'Canada', flag: '🇨🇦', region: 'Amerika', language: 'Inggris & Prancis', script: 'Latin', voiceLang: 'en-CA' },

  // Afrika
  { id: 'afrika-selatan', name: 'Afrika Selatan', nativeName: 'South Africa', flag: '🇿🇦', region: 'Afrika', language: 'Inggris, Zulu, Afrikaans', script: 'Latin', voiceLang: 'en-ZA' },
  { id: 'maroko', name: 'Maroko', nativeName: 'المغرب (Morocco)', flag: '🇲🇦', region: 'Afrika', language: 'Arab & Amazigh', script: 'Hijaiyah & Tifinagh', tableId: 'arab-hijaiyah', voiceLang: 'ar-MA' }
];
