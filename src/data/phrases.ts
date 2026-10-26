export interface PhraseItem {
  native: string;
  transliteration: string;
  meaning: string;
}

export interface LanguagePhrases {
  tableId: string; // matches id in languages.ts (e.g. 'jepang-hiragana')
  languageName: string;
  flag: string;
  voiceLang: string;
  categories: {
    categoryName: string;
    items: PhraseItem[];
  }[];
}

export const languagePhrasesData: Record<string, LanguagePhrases> = {
  'jepang-hiragana': {
    tableId: 'jepang-hiragana',
    languageName: 'Bahasa Jepang',
    flag: '🇯🇵',
    voiceLang: 'ja-JP',
    categories: [
      {
        categoryName: 'Salam & Ucapan Dasar',
        items: [
          { native: 'こんにちは', transliteration: 'Konnichiwa', meaning: 'Halo / Selamat siang' },
          { native: 'おはようございます', transliteration: 'Ohayou gozaimasu', meaning: 'Selamat pagi' },
          { native: 'こんばんは', transliteration: 'Konbanwa', meaning: 'Selamat malam' },
          { native: 'ありがとうございます', transliteration: 'Arigatou gozaimasu', meaning: 'Terima kasih banyak' },
          { native: 'すみません', transliteration: 'Sumimasen', meaning: 'Permisi / Maaf' },
          { native: 'ごめんなさい', transliteration: 'Gomennasai', meaning: 'Mohon maaf' },
          { native: 'さようなら', transliteration: 'Sayounara', meaning: 'Selamat tinggal' },
          { native: 'はい / いいえ', transliteration: 'Hai / Iie', meaning: 'Ya / Tidak' },
          { native: 'お元気ですか', transliteration: 'Ogenki desu ka?', meaning: 'Apa kabar?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: '一 (いち)', transliteration: 'Ichi', meaning: 'Satu (1)' },
          { native: '二 (に)', transliteration: 'Ni', meaning: 'Dua (2)' },
          { native: '三 (さん)', transliteration: 'San', meaning: 'Tiga (3)' },
          { native: '四 (よん / し)', transliteration: 'Yon / Shi', meaning: 'Empat (4)' },
          { native: '五 (ご)', transliteration: 'Go', meaning: 'Lima (5)' },
          { native: '六 (ろく)', transliteration: 'Roku', meaning: 'Enam (6)' },
          { native: '七 (なな / しち)', transliteration: 'Nana / Shichi', meaning: 'Tujuh (7)' },
          { native: '八 (はち)', transliteration: 'Hachi', meaning: 'Delapan (8)' },
          { native: '九 (きゅう / く)', transliteration: 'Kyuu / Ku', meaning: 'Sembilan (9)' },
          { native: '十 (じゅう)', transliteration: 'Juu', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'jepang-katakana': {
    tableId: 'jepang-katakana',
    languageName: 'Bahasa Jepang (Katakana Kata Serapan)',
    flag: '🇯🇵',
    voiceLang: 'ja-JP',
    categories: [
      {
        categoryName: 'Kata Serapan Populer',
        items: [
          { native: 'コーヒー', transliteration: 'Koohii', meaning: 'Kopi' },
          { native: 'ホテル', transliteration: 'Hoteru', meaning: 'Hotel' },
          { native: 'レストラン', transliteration: 'Resutoran', meaning: 'Restoran' },
          { native: 'タクシー', transliteration: 'Takushii', meaning: 'Taksi' },
          { native: 'バス', transliteration: 'Basu', meaning: 'Bus' },
          { native: 'トイレ', transliteration: 'Toire', meaning: 'Toilet' },
          { native: 'スマホ', transliteration: 'Sumaho', meaning: 'Smartphone' },
          { native: 'メニュー', transliteration: 'Menyuu', meaning: 'Buku Menu' }
        ]
      }
    ]
  },
  'jerman-dasar': {
    tableId: 'jerman-dasar',
    languageName: 'Bahasa Jerman',
    flag: '🇩🇪',
    voiceLang: 'de-DE',
    categories: [
      {
        categoryName: 'Salam & Ucapan Sehari-hari',
        items: [
          { native: 'Hallo', transliteration: 'Hallo', meaning: 'Halo' },
          { native: 'Guten Morgen', transliteration: 'Guten Morgen', meaning: 'Selamat pagi' },
          { native: 'Guten Tag', transliteration: 'Guten Tag', meaning: 'Selamat siang' },
          { native: 'Guten Abend', transliteration: 'Guten Abend', meaning: 'Selamat malam' },
          { native: 'Danke schön', transliteration: 'Danke schoen', meaning: 'Terima kasih banyak' },
          { native: 'Bitte schön', transliteration: 'Bitte schoen', meaning: 'Sama-sama / Silakan' },
          { native: 'Entschuldigung', transliteration: 'Entschuldigung', meaning: 'Permisi / Maaf' },
          { native: 'Auf Wiedersehen', transliteration: 'Auf Wiedersehen', meaning: 'Sampai jumpa lagi' },
          { native: 'Tschüss', transliteration: 'Tschuess', meaning: 'Dah / Dadah' },
          { native: 'Wie geht es Ihnen?', transliteration: 'Wie geht es Ihnen?', meaning: 'Apa kabar?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: 'eins', transliteration: 'eins', meaning: 'Satu (1)' },
          { native: 'zwei', transliteration: 'zwei', meaning: 'Dua (2)' },
          { native: 'drei', transliteration: 'drei', meaning: 'Tiga (3)' },
          { native: 'vier', transliteration: 'vier', meaning: 'Empat (4)' },
          { native: 'fünf', transliteration: 'fuenf', meaning: 'Lima (5)' },
          { native: 'sechs', transliteration: 'sechs', meaning: 'Enam (6)' },
          { native: 'sieben', transliteration: 'sieben', meaning: 'Tujuh (7)' },
          { native: 'acht', transliteration: 'acht', meaning: 'Delapan (8)' },
          { native: 'neun', transliteration: 'neun', meaning: 'Sembilan (9)' },
          { native: 'zehn', transliteration: 'zehn', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'korea-hangul': {
    tableId: 'korea-hangul',
    languageName: 'Bahasa Korea',
    flag: '🇰🇷',
    voiceLang: 'ko-KR',
    categories: [
      {
        categoryName: 'Salam & Ucapan Sehari-hari',
        items: [
          { native: '안녕하세요', transliteration: 'Annyeonghaseyo', meaning: 'Halo / Selamat siang' },
          { native: '감사합니다', transliteration: 'Gamsahamnida', meaning: 'Terima kasih' },
          { native: '죄송합니다', transliteration: 'Joesonghamnida', meaning: 'Mohon maaf' },
          { native: '실례합니다', transliteration: 'Sillyehamnida', meaning: 'Permisi' },
          { native: '네 / 아니요', transliteration: 'Ne / Aniyo', meaning: 'Ya / Tidak' },
          { native: '안녕히 가세요', transliteration: 'Annyeonghi gaseyo', meaning: 'Selamat jalan' },
          { native: '안녕히 계세요', transliteration: 'Annyeonghi gyeseyo', meaning: 'Selamat tinggal' },
          { native: '맛있어요', transliteration: 'Masisseoyo', meaning: 'Enak sekali' },
          { native: '얼마예요?', transliteration: 'Eolmayeyo?', meaning: 'Berapa harganya?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10 (Sino-Korea)',
        items: [
          { native: '일', transliteration: 'Il', meaning: 'Satu (1)' },
          { native: '이', transliteration: 'I', meaning: 'Dua (2)' },
          { native: '삼', transliteration: 'Sam', meaning: 'Tiga (3)' },
          { native: '사', transliteration: 'Sa', meaning: 'Empat (4)' },
          { native: '오', transliteration: 'O', meaning: 'Lima (5)' },
          { native: '육', transliteration: 'Yuk', meaning: 'Enam (6)' },
          { native: '칠', transliteration: 'Chil', meaning: 'Tujuh (7)' },
          { native: '팔', transliteration: 'Pal', meaning: 'Delapan (8)' },
          { native: '구', transliteration: 'Gu', meaning: 'Sembilan (9)' },
          { native: '십', transliteration: 'Sip', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'arab-hijaiyah': {
    tableId: 'arab-hijaiyah',
    languageName: 'Bahasa Arab',
    flag: '🇸🇦',
    voiceLang: 'ar-SA',
    categories: [
      {
        categoryName: 'Salam & Ungkapan Populer',
        items: [
          { native: 'السلام عليكم', transliteration: 'Assalamu alaikum', meaning: 'Semoga kedamaian menyertaimu' },
          { native: 'أهلاً وسهلاً', transliteration: 'Ahlan wa sahlan', meaning: 'Selamat datang' },
          { native: 'صباح الخير', transliteration: 'Sabah al-khayr', meaning: 'Selamat pagi' },
          { native: 'مساء الخير', transliteration: 'Masa al-khayr', meaning: 'Selamat sore / malam' },
          { native: 'شكراً جزيلاً', transliteration: 'Shukran jazilan', meaning: 'Terima kasih banyak' },
          { native: 'عفواً', transliteration: 'Afwan', meaning: 'Sama-sama / Maaf' },
          { native: 'من فضلك', transliteration: 'Min fadlak', meaning: 'Tolong / Silakan' },
          { native: 'مع السلامة', transliteration: 'Ma’a as-salama', meaning: 'Selamat tinggal' },
          { native: 'نعم / لا', transliteration: 'Na’am / La', meaning: 'Ya / Tidak' },
          { native: 'كيف حالك؟', transliteration: 'Kayfa haluka?', meaning: 'Apa kabar?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: 'واحد (١)', transliteration: 'Wahid', meaning: 'Satu (1)' },
          { native: 'اثنان (٢)', transliteration: 'Ithnan', meaning: 'Dua (2)' },
          { native: 'ثلاثة (٣)', transliteration: 'Thalatha', meaning: 'Tiga (3)' },
          { native: 'أربعة (٤)', transliteration: 'Arba’a', meaning: 'Empat (4)' },
          { native: 'خمسة (٥)', transliteration: 'Khamsa', meaning: 'Lima (5)' },
          { native: 'ستة (٦)', transliteration: 'Sitta', meaning: 'Enam (6)' },
          { native: 'سبعة (٧)', transliteration: 'Sab’a', meaning: 'Tujuh (7)' },
          { native: 'ثمانية (٨)', transliteration: 'Thamaniya', meaning: 'Delapan (8)' },
          { native: 'تسعة (٩)', transliteration: 'Tis’a', meaning: 'Sembilan (9)' },
          { native: 'عشرة (١٠)', transliteration: 'Ashara', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'mandarin-dasar': {
    tableId: 'mandarin-dasar',
    languageName: 'Bahasa Mandarin',
    flag: '🇨🇳',
    voiceLang: 'zh-CN',
    categories: [
      {
        categoryName: 'Salam & Frasa Penting',
        items: [
          { native: '你好', transliteration: 'Nǐ hǎo', meaning: 'Halo' },
          { native: '早上好', transliteration: 'Zǎoshang hǎo', meaning: 'Selamat pagi' },
          { native: '晚上好', transliteration: 'Wǎnshang hǎo', meaning: 'Selamat malam' },
          { native: '谢谢', transliteration: 'Xièxie', meaning: 'Terima kasih' },
          { native: '不客气', transliteration: 'Bú kèqi', meaning: 'Sama-sama' },
          { native: '对不起', transliteration: 'Duìbuqǐ', meaning: 'Maaf' },
          { native: '再见', transliteration: 'Zàijiàn', meaning: 'Sampai jumpa' },
          { native: '多少钱？', transliteration: 'Duōshao qián?', meaning: 'Berapa harganya?' },
          { native: '听不懂', transliteration: 'Tīng bù dǒng', meaning: 'Saya tidak mengerti' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: '一', transliteration: 'Yī', meaning: 'Satu (1)' },
          { native: '二', transliteration: 'Èr', meaning: 'Dua (2)' },
          { native: '三', transliteration: 'Sān', meaning: 'Tiga (3)' },
          { native: '四', transliteration: 'Sì', meaning: 'Empat (4)' },
          { native: '五', transliteration: 'Wǔ', meaning: 'Lima (5)' },
          { native: '六', transliteration: 'Liù', meaning: 'Enam (6)' },
          { native: '七', transliteration: 'Qī', meaning: 'Tujuh (7)' },
          { native: '八', transliteration: 'Bā', meaning: 'Delapan (8)' },
          { native: '九', transliteration: 'Jiǔ', meaning: 'Sembilan (9)' },
          { native: '十', transliteration: 'Shí', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'thailand-dasar': {
    tableId: 'thailand-dasar',
    languageName: 'Bahasa Thai',
    flag: '🇹🇭',
    voiceLang: 'th-TH',
    categories: [
      {
        categoryName: 'Salam & Ucapan Sehari-hari',
        items: [
          { native: 'สวัสดี', transliteration: 'Sawasdee', meaning: 'Halo / Selamat sejahtera' },
          { native: 'ขอบคุณ', transliteration: 'Khop khun', meaning: 'Terima kasih' },
          { native: 'ขอโทษ', transliteration: 'Khor thot', meaning: 'Maaf / Permisi' },
          { native: 'ใช่ / ไม่ใช่', transliteration: 'Chai / Mai chai', meaning: 'Ya / Bukan' },
          { native: 'อร่อย', transliteration: 'Aroi', meaning: 'Enak / Lezat' },
          { native: 'เท่าไหร่?', transliteration: 'Thao rai?', meaning: 'Berapa harganya?' },
          { native: 'ลาก่อน', transliteration: 'Laa korn', meaning: 'Selamat tinggal' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: 'หนึ่ง (๑)', transliteration: 'Nueng', meaning: 'Satu (1)' },
          { native: 'สอง (๒)', transliteration: 'Song', meaning: 'Dua (2)' },
          { native: 'สาม (๓)', transliteration: 'Sam', meaning: 'Tiga (3)' },
          { native: 'สี่ (๔)', transliteration: 'See', meaning: 'Empat (4)' },
          { native: 'ห้า (๕)', transliteration: 'Ha', meaning: 'Lima (5)' },
          { native: 'หก (๖)', transliteration: 'Hok', meaning: 'Enam (6)' },
          { native: 'เจ็ด (๗)', transliteration: 'Jet', meaning: 'Tujuh (7)' },
          { native: 'แปด (๘)', transliteration: 'Paet', meaning: 'Delapan (8)' },
          { native: 'เก้า (๙)', transliteration: 'Gao', meaning: 'Sembilan (9)' },
          { native: 'สิบ (๑๐)', transliteration: 'Sip', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'spanyol-dasar': {
    tableId: 'spanyol-dasar',
    languageName: 'Bahasa Spanyol',
    flag: '🇪🇸',
    voiceLang: 'es-ES',
    categories: [
      {
        categoryName: 'Salam & Ungkapan Dasar',
        items: [
          { native: '¡Hola!', transliteration: 'Hola', meaning: 'Halo!' },
          { native: 'Buenos días', transliteration: 'Buenos dias', meaning: 'Selamat pagi' },
          { native: 'Buenas tardes', transliteration: 'Buenas tardes', meaning: 'Selamat sore' },
          { native: 'Buenas noches', transliteration: 'Buenas noches', meaning: 'Selamat malam' },
          { native: 'Muchas gracias', transliteration: 'Muchas gracias', meaning: 'Terima kasih banyak' },
          { native: 'De nada', transliteration: 'De nada', meaning: 'Sama-sama' },
          { native: 'Por favor', transliteration: 'Por favor', meaning: 'Tolong / Silakan' },
          { native: 'Perdón / Disculpe', transliteration: 'Perdon / Disculpe', meaning: 'Maaf / Permisi' },
          { native: '¡Adiós!', transliteration: 'Adios', meaning: 'Selamat tinggal!' },
          { native: '¿Cómo estás?', transliteration: 'Como estas?', meaning: 'Apa kabar?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: 'uno', transliteration: 'uno', meaning: 'Satu (1)' },
          { native: 'dos', transliteration: 'dos', meaning: 'Dua (2)' },
          { native: 'tres', transliteration: 'tres', meaning: 'Tiga (3)' },
          { native: 'cuatro', transliteration: 'cuatro', meaning: 'Empat (4)' },
          { native: 'cinco', transliteration: 'cinco', meaning: 'Lima (5)' },
          { native: 'seis', transliteration: 'seis', meaning: 'Enam (6)' },
          { native: 'siete', transliteration: 'siete', meaning: 'Tujuh (7)' },
          { native: 'ocho', transliteration: 'ocho', meaning: 'Delapan (8)' },
          { native: 'nueve', transliteration: 'nueve', meaning: 'Sembilan (9)' },
          { native: 'diez', transliteration: 'diez', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'prancis-dasar': {
    tableId: 'prancis-dasar',
    languageName: 'Bahasa Prancis',
    flag: '🇫🇷',
    voiceLang: 'fr-FR',
    categories: [
      {
        categoryName: 'Salam & Ungkapan Sopan',
        items: [
          { native: 'Bonjour', transliteration: 'Bonjour', meaning: 'Halo / Selamat siang' },
          { native: 'Bonsoir', transliteration: 'Bonsoir', meaning: 'Selamat malam' },
          { native: 'Merci beaucoup', transliteration: 'Merci beaucoup', meaning: 'Terima kasih banyak' },
          { native: 'De rien', transliteration: 'De rien', meaning: 'Sama-sama' },
          { native: 'S’il vous plaît', transliteration: 'S’il vous plait', meaning: 'Tolong / Silakan' },
          { native: 'Pardon / Excusez-moi', transliteration: 'Pardon / Excusez-moi', meaning: 'Maaf / Permisi' },
          { native: 'Au revoir', transliteration: 'Au revoir', meaning: 'Sampai jumpa' },
          { native: 'Oui / Non', transliteration: 'Oui / Non', meaning: 'Ya / Tidak' },
          { native: 'Comment allez-vous?', transliteration: 'Comment allez-vous?', meaning: 'Apa kabar?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: 'un', transliteration: 'un', meaning: 'Satu (1)' },
          { native: 'deux', transliteration: 'deux', meaning: 'Dua (2)' },
          { native: 'trois', transliteration: 'trois', meaning: 'Tiga (3)' },
          { native: 'quatre', transliteration: 'quatre', meaning: 'Empat (4)' },
          { native: 'cinq', transliteration: 'cinq', meaning: 'Lima (5)' },
          { native: 'six', transliteration: 'six', meaning: 'Enam (6)' },
          { native: 'sept', transliteration: 'sept', meaning: 'Tujuh (7)' },
          { native: 'huit', transliteration: 'huit', meaning: 'Delapan (8)' },
          { native: 'neuf', transliteration: 'neuf', meaning: 'Sembilan (9)' },
          { native: 'dix', transliteration: 'dix', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  },
  'rusia-cyrillic': {
    tableId: 'rusia-cyrillic',
    languageName: 'Bahasa Rusia',
    flag: '🇷🇺',
    voiceLang: 'ru-RU',
    categories: [
      {
        categoryName: 'Salam & Ungkapan Dasar',
        items: [
          { native: 'Здравствуйте', transliteration: 'Zdravstvuyte', meaning: 'Halo (formal)' },
          { native: 'Привет', transliteration: 'Privet', meaning: 'Hai (santai)' },
          { native: 'Доброе утро', transliteration: 'Dobroye utro', meaning: 'Selamat pagi' },
          { native: 'Спасибо', transliteration: 'Spasibo', meaning: 'Terima kasih' },
          { native: 'Пожалуйста', transliteration: 'Pozhaluysta', meaning: 'Sama-sama / Silakan' },
          { native: 'Извините', transliteration: 'Izvinite', meaning: 'Maaf / Permisi' },
          { native: 'До свидания', transliteration: 'Do svidaniya', meaning: 'Sampai jumpa' },
          { native: 'Да / Нет', transliteration: 'Da / Net', meaning: 'Ya / Tidak' },
          { native: 'Как дела?', transliteration: 'Kak dela?', meaning: 'Apa kabar?' }
        ]
      },
      {
        categoryName: 'Angka 1 - 10',
        items: [
          { native: 'один', transliteration: 'odin', meaning: 'Satu (1)' },
          { native: 'два', transliteration: 'dva', meaning: 'Dua (2)' },
          { native: 'три', transliteration: 'tri', meaning: 'Tiga (3)' },
          { native: 'четыре', transliteration: 'chetyre', meaning: 'Empat (4)' },
          { native: 'пять', transliteration: 'pyat', meaning: 'Lima (5)' },
          { native: 'шесть', transliteration: 'shest', meaning: 'Enam (6)' },
          { native: 'семь', transliteration: 'sem', meaning: 'Tujuh (7)' },
          { native: 'восемь', transliteration: 'vosem', meaning: 'Delapan (8)' },
          { native: 'девять', transliteration: 'devyat', meaning: 'Sembilan (9)' },
          { native: 'десять', transliteration: 'desyat', meaning: 'Sepuluh (10)' }
        ]
      }
    ]
  }
};
