export interface TableCell {
  romaji: string;
  char: string;
}

export interface LanguageTable {
  id: string;
  name: string;
  badge: string;
  title: string;
  description: string;
  voiceLang?: string; // for SpeechSynthesis e.g. ja-JP, de-DE, ko-KR
  headers?: string[];
  grid: (TableCell | null)[][];
}

export const defaultLanguageTables: LanguageTable[] = [
  {
    id: 'jepang-hiragana',
    name: 'Jepang (Hiragana)',
    badge: 'Hiragana Dasar',
    title: 'A. Tabel Huruf Hiragana Dasar',
    description: 'Aksara fonetik utama dalam bahasa Jepang yang digunakan untuk kata asli Jepang dan tata bahasa.',
    voiceLang: 'ja-JP',
    grid: [
      [
        { romaji: 'A', char: 'あ' },
        { romaji: 'I', char: 'い' },
        { romaji: 'U', char: 'う' },
        { romaji: 'E', char: 'え' },
        { romaji: 'O', char: 'お' }
      ],
      [
        { romaji: 'Ka', char: 'か' },
        { romaji: 'Ki', char: 'き' },
        { romaji: 'Ku', char: 'く' },
        { romaji: 'Ke', char: 'け' },
        { romaji: 'Ko', char: 'こ' }
      ],
      [
        { romaji: 'Sa', char: 'さ' },
        { romaji: 'Shi', char: 'し' },
        { romaji: 'Su', char: 'す' },
        { romaji: 'Se', char: 'せ' },
        { romaji: 'So', char: 'そ' }
      ],
      [
        { romaji: 'Ta', char: 'た' },
        { romaji: 'Chi', char: 'ち' },
        { romaji: 'Tsu', char: 'つ' },
        { romaji: 'Te', char: 'て' },
        { romaji: 'To', char: 'と' }
      ],
      [
        { romaji: 'Na', char: 'な' },
        { romaji: 'Ni', char: 'に' },
        { romaji: 'Nu', char: 'ぬ' },
        { romaji: 'Ne', char: 'ね' },
        { romaji: 'No', char: 'の' }
      ],
      [
        { romaji: 'Ha', char: 'は' },
        { romaji: 'Hi', char: 'ひ' },
        { romaji: 'Fu', char: 'ふ' },
        { romaji: 'He', char: 'へ' },
        { romaji: 'Ho', char: 'ほ' }
      ],
      [
        { romaji: 'Ma', char: 'ま' },
        { romaji: 'Mi', char: 'み' },
        { romaji: 'Mu', char: 'む' },
        { romaji: 'Me', char: 'め' },
        { romaji: 'Mo', char: 'も' }
      ],
      [
        { romaji: 'Ya', char: 'や' },
        null,
        { romaji: 'Yu', char: 'ゆ' },
        null,
        { romaji: 'Yo', char: 'よ' }
      ],
      [
        { romaji: 'Ra', char: 'ら' },
        { romaji: 'Ri', char: 'り' },
        { romaji: 'Ru', char: 'る' },
        { romaji: 'Re', char: 'れ' },
        { romaji: 'Ro', char: 'ろ' }
      ],
      [
        { romaji: 'Wa', char: 'わ' },
        null,
        { romaji: 'N', char: 'ん' },
        null,
        { romaji: 'Wo', char: 'を' }
      ]
    ]
  },
  {
    id: 'jepang-katakana',
    name: 'Jepang (Katakana)',
    badge: 'Katakana Dasar',
    title: 'B. Tabel Huruf Katakana Dasar',
    description: 'Aksara fonetik yang digunakan untuk kata serapan asing, nama non-Jepang, dan penekanan khusus.',
    voiceLang: 'ja-JP',
    grid: [
      [
        { romaji: 'A', char: 'ア' },
        { romaji: 'I', char: 'イ' },
        { romaji: 'U', char: 'ウ' },
        { romaji: 'E', char: 'エ' },
        { romaji: 'O', char: 'オ' }
      ],
      [
        { romaji: 'Ka', char: 'カ' },
        { romaji: 'Ki', char: 'キ' },
        { romaji: 'Ku', char: 'ク' },
        { romaji: 'Ke', char: 'ケ' },
        { romaji: 'Ko', char: 'コ' }
      ],
      [
        { romaji: 'Sa', char: 'サ' },
        { romaji: 'Shi', char: 'シ' },
        { romaji: 'Su', char: 'ス' },
        { romaji: 'Se', char: 'セ' },
        { romaji: 'So', char: 'ソ' }
      ],
      [
        { romaji: 'Ta', char: 'タ' },
        { romaji: 'Chi', char: 'チ' },
        { romaji: 'Tsu', char: 'ツ' },
        { romaji: 'Te', char: 'テ' },
        { romaji: 'To', char: 'ト' }
      ],
      [
        { romaji: 'Na', char: 'ナ' },
        { romaji: 'Ni', char: 'ニ' },
        { romaji: 'Nu', char: 'ヌ' },
        { romaji: 'Ne', char: 'ネ' },
        { romaji: 'No', char: 'ノ' }
      ],
      [
        { romaji: 'Ha', char: 'ハ' },
        { romaji: 'Hi', char: 'ヒ' },
        { romaji: 'Fu', char: 'フ' },
        { romaji: 'He', char: 'ヘ' },
        { romaji: 'Ho', char: 'ホ' }
      ],
      [
        { romaji: 'Ma', char: 'マ' },
        { romaji: 'Mi', char: 'ミ' },
        { romaji: 'Mu', char: 'ム' },
        { romaji: 'Me', char: 'メ' },
        { romaji: 'Mo', char: 'モ' }
      ],
      [
        { romaji: 'Ya', char: 'ヤ' },
        null,
        { romaji: 'Yu', char: 'ユ' },
        null,
        { romaji: 'Yo', char: 'ヨ' }
      ],
      [
        { romaji: 'Ra', char: 'ラ' },
        { romaji: 'Ri', char: 'リ' },
        { romaji: 'Ru', char: 'ル' },
        { romaji: 'Re', char: 'レ' },
        { romaji: 'Ro', char: 'ロ' }
      ],
      [
        { romaji: 'Wa', char: 'ワ' },
        null,
        { romaji: 'N', char: 'ン' },
        null,
        { romaji: 'Wo', char: 'ヲ' }
      ]
    ]
  },
  {
    id: 'jerman-dasar',
    name: 'Jerman (Deutsch)',
    badge: 'Umlaut & Fonetik Jerman',
    title: 'C. Tabel Huruf Khusus & Fonetik Bahasa Jerman',
    description: 'Huruf khusus bahasa Jerman meliputi Umlaut (Ä, Ö, Ü), Eszett (ß), dan kombinasi bunyi vokal/konsonan penting.',
    voiceLang: 'de-DE',
    grid: [
      [
        { romaji: 'A-Umlaut', char: 'Ä ä' },
        { romaji: 'O-Umlaut', char: 'Ö ö' },
        { romaji: 'U-Umlaut', char: 'Ü ü' },
        { romaji: 'Eszett (ss)', char: 'ß' },
        { romaji: 'Bunyi [ai]', char: 'ei' }
      ],
      [
        { romaji: 'Bunyi [oi]', char: 'eu' },
        { romaji: 'Bunyi [oi]', char: 'äu' },
        { romaji: 'Bunyi [i:]', char: 'ie' },
        { romaji: 'Bunyi [kh/sy]', char: 'ch' },
        { romaji: 'Bunyi [sy]', char: 'sch' }
      ],
      [
        { romaji: 'Bunyi [syp]', char: 'sp' },
        { romaji: 'Bunyi [syt]', char: 'st' },
        { romaji: 'Bunyi [f]', char: 'v' },
        { romaji: 'Bunyi [v]', char: 'w' },
        { romaji: 'Bunyi [ts]', char: 'z' }
      ],
      [
        { romaji: 'Halo', char: 'Hallo' },
        { romaji: 'Terima Kasih', char: 'Danke' },
        { romaji: 'Tolong / Sama2', char: 'Bitte' },
        { romaji: 'Selamat Pagi', char: 'Guten Morgen' },
        { romaji: 'Sampai Jumpa', char: 'Tschüss' }
      ]
    ]
  },
  {
    id: 'korea-hangul',
    name: 'Korea (Hangul)',
    badge: 'Hangul Dasar',
    title: 'D. Tabel Huruf Hangul Korea Dasar',
    description: 'Aksara alfabetis Korea ciptaan Raja Sejong yang terdiri dari vokal dan konsonan dasar.',
    voiceLang: 'ko-KR',
    grid: [
      [
        { romaji: 'G/K', char: 'ㄱ' },
        { romaji: 'N', char: 'ㄴ' },
        { romaji: 'D/T', char: 'ㄷ' },
        { romaji: 'R/L', char: 'ㄹ' },
        { romaji: 'M', char: 'ㅁ' }
      ],
      [
        { romaji: 'B/P', char: 'ㅂ' },
        { romaji: 'S', char: 'ㅅ' },
        { romaji: 'Ng/-', char: 'ㅇ' },
        { romaji: 'J', char: 'ㅈ' },
        { romaji: 'Ch', char: 'ㅊ' }
      ],
      [
        { romaji: 'K', char: 'ㅋ' },
        { romaji: 'T', char: 'ㅌ' },
        { romaji: 'P', char: 'ㅍ' },
        { romaji: 'H', char: 'ㅎ' },
        null
      ],
      [
        { romaji: 'A', char: 'ㅏ' },
        { romaji: 'Ya', char: 'ㅑ' },
        { romaji: 'Eo', char: 'ㅓ' },
        { romaji: 'Yeo', char: 'ㅕ' },
        { romaji: 'O', char: 'ㅗ' }
      ],
      [
        { romaji: 'Yo', char: 'ㅛ' },
        { romaji: 'U', char: 'ㅜ' },
        { romaji: 'Yu', char: 'ㅠ' },
        { romaji: 'Eu', char: 'ㅡ' },
        { romaji: 'I', char: 'ㅣ' }
      ]
    ]
  },
  {
    id: 'arab-hijaiyah',
    name: 'Arab (Hijaiyah)',
    badge: 'Huruf Hijaiyah',
    title: 'E. Tabel Huruf Hijaiyah Dasar',
    description: '28 huruf abjad bahasa Arab dari Alif sampai Ya.',
    voiceLang: 'ar-SA',
    grid: [
      [
        { romaji: 'Alif', char: 'ا' },
        { romaji: 'Ba', char: 'ب' },
        { romaji: 'Ta', char: 'ت' },
        { romaji: 'Tsa', char: 'ث' },
        { romaji: 'Jim', char: 'ج' }
      ],
      [
        { romaji: 'Ha', char: 'ح' },
        { romaji: 'Kho', char: 'خ' },
        { romaji: 'Dal', char: 'د' },
        { romaji: 'Dzal', char: 'ذ' },
        { romaji: 'Ra', char: 'ر' }
      ],
      [
        { romaji: 'Zai', char: 'ز' },
        { romaji: 'Sin', char: 'س' },
        { romaji: 'Syin', char: 'ش' },
        { romaji: 'Shod', char: 'ص' },
        { romaji: 'Dhod', char: 'ض' }
      ],
      [
        { romaji: 'Tho', char: 'ط' },
        { romaji: 'Zho', char: 'ظ' },
        { romaji: "'Ain", char: 'ع' },
        { romaji: 'Ghain', char: 'غ' },
        { romaji: 'Fa', char: 'ف' }
      ],
      [
        { romaji: 'Qof', char: 'ق' },
        { romaji: 'Kaf', char: 'ك' },
        { romaji: 'Lam', char: 'ل' },
        { romaji: 'Mim', char: 'م' },
        { romaji: 'Nun', char: 'ن' }
      ],
      [
        { romaji: 'Waw', char: 'و' },
        { romaji: "Ha'", char: 'ه' },
        { romaji: 'Hamzah', char: 'ء' },
        { romaji: 'Ya', char: 'ي' },
        null
      ]
    ]
  },
  {
    id: 'mandarin-dasar',
    name: 'Mandarin (Tiongkok)',
    badge: 'Pinyin & Hanzi Angka',
    title: 'F. Tabel Angka & Sapaan Dasar Bahasa Mandarin',
    description: 'Karakter Hanzi dasar dan sistem pelafalan Pinyin dalam bahasa Mandarin Tiongkok.',
    voiceLang: 'zh-CN',
    grid: [
      [
        { romaji: 'Yī (1)', char: '一' },
        { romaji: 'Èr (2)', char: '二' },
        { romaji: 'Sān (3)', char: '三' },
        { romaji: 'Sì (4)', char: '四' },
        { romaji: 'Wǔ (5)', char: '五' }
      ],
      [
        { romaji: 'Liù (6)', char: '六' },
        { romaji: 'Qī (7)', char: '七' },
        { romaji: 'Bā (8)', char: '八' },
        { romaji: 'Jiǔ (9)', char: '九' },
        { romaji: 'Shí (10)', char: '十' }
      ],
      [
        { romaji: 'Nǐ hǎo (Halo)', char: '你好' },
        { romaji: 'Xièxiè (Trims)', char: '谢谢' },
        { romaji: 'Zàijiàn (Dadah)', char: '再见' },
        { romaji: 'Duìbuqǐ (Maaf)', char: '对不起' },
        { romaji: 'Méiguānxi (Gpp)', char: '没关系' }
      ]
    ]
  },
  {
    id: 'thailand-dasar',
    name: 'Thailand (Aksara Thai)',
    badge: 'Konsonan & Vokal Thai',
    title: 'G. Tabel Aksara Bahasa Thailand Dasar',
    description: 'Aksara fonetik abugida Thailand untuk konsonan utama dan vokal umum.',
    voiceLang: 'th-TH',
    grid: [
      [
        { romaji: 'Ko Kai', char: 'ก' },
        { romaji: 'Kho Khai', char: 'ข' },
        { romaji: 'Kho Khwai', char: 'ค' },
        { romaji: 'Kho Rakhang', char: 'ฆ' },
        { romaji: 'Ngo Ngu', char: 'ง' }
      ],
      [
        { romaji: 'Cho Chan', char: 'จ' },
        { romaji: 'Cho Ching', char: 'ฉ' },
        { romaji: 'Cho Chang', char: 'ช' },
        { romaji: 'So So', char: 'ซ' },
        { romaji: 'Yo Ying', char: 'ญ' }
      ],
      [
        { romaji: 'Do Dek', char: 'ด' },
        { romaji: 'To Tao', char: 'ต' },
        { romaji: 'Tho Thung', char: 'ถ' },
        { romaji: 'Tho Thahan', char: 'ท' },
        { romaji: 'No Nu', char: 'น' }
      ],
      [
        { romaji: 'Bo Baimai', char: 'บ' },
        { romaji: 'Po Pla', char: 'ป' },
        { romaji: 'Pho Phueng', char: 'ผ' },
        { romaji: 'Fo Fa', char: 'ฝ' },
        { romaji: 'Mo Ma', char: 'ม' }
      ],
      [
        { romaji: 'Sawatdee (Halo)', char: 'สวัสดี' },
        { romaji: 'Khop khun (Trims)', char: 'ขอบคุณ' },
        { romaji: 'Chai (Ya)', char: 'ใช่' },
        { romaji: 'Mai (Tidak)', char: 'ไม่' },
        { romaji: 'Aroy (Enak)', char: 'อร่อย' }
      ]
    ]
  },
  {
    id: 'spanyol-dasar',
    name: 'Spanyol (Español)',
    badge: 'Alfabet & Aksen Spanyol',
    title: 'H. Tabel Huruf Khusus & Sapaan Bahasa Spanyol',
    description: 'Huruf khusus bahasa Spanyol seperti Eñe (Ñ), vokal beraksen tilde, dan tanda baca pembuka khusus.',
    voiceLang: 'es-ES',
    grid: [
      [
        { romaji: 'Eñe', char: 'Ñ ñ' },
        { romaji: 'Doble L', char: 'LL ll' },
        { romaji: 'Doble R', char: 'RR rr' },
        { romaji: 'Tanya Balik', char: '¿' },
        { romaji: 'Seru Balik', char: '¡' }
      ],
      [
        { romaji: 'A-Aksen', char: 'Á á' },
        { romaji: 'E-Aksen', char: 'É é' },
        { romaji: 'I-Aksen', char: 'Í í' },
        { romaji: 'O-Aksen', char: 'Ó ó' },
        { romaji: 'U-Aksen', char: 'Ú ú' }
      ],
      [
        { romaji: 'Halo', char: '¡Hola!' },
        { romaji: 'Terima Kasih', char: 'Gracias' },
        { romaji: 'Sama-sama', char: 'De nada' },
        { romaji: 'Tolong', char: 'Por favor' },
        { romaji: 'Sampai Jumpa', char: 'Adiós' }
      ]
    ]
  },
  {
    id: 'prancis-dasar',
    name: 'Prancis (Français)',
    badge: 'Aksen & Huruf Prancis',
    title: 'I. Tabel Aksen & Huruf Khusus Bahasa Prancis',
    description: 'Tanda aksen fonetik vokal Prancis (Aigu, Grave, Circonflexe) dan ligatur khusus.',
    voiceLang: 'fr-FR',
    grid: [
      [
        { romaji: 'E-Aigu', char: 'É é' },
        { romaji: 'E-Grave', char: 'È è' },
        { romaji: 'A-Grave', char: 'À à' },
        { romaji: 'U-Grave', char: 'Ù ù' },
        { romaji: 'C-Cédille', char: 'Ç ç' }
      ],
      [
        { romaji: 'Circonflexe', char: 'Â â' },
        { romaji: 'E-Circonflexe', char: 'Ê ê' },
        { romaji: 'I-Circonflexe', char: 'Î î' },
        { romaji: 'O-Circonflexe', char: 'Ô ô' },
        { romaji: 'Ligatur OE', char: 'Œ œ' }
      ],
      [
        { romaji: 'Halo', char: 'Bonjour' },
        { romaji: 'Terima Kasih', char: 'Merci' },
        { romaji: 'Tolong', char: "S'il vous plaît" },
        { romaji: 'Selamat Malam', char: 'Bonsoir' },
        { romaji: 'Sampai Jumpa', char: 'Au revoir' }
      ]
    ]
  },
  {
    id: 'italia-dasar',
    name: 'Italia (Italiano)',
    badge: 'Fonetik & Sapaan Italia',
    title: 'J. Tabel Kombinasi Bunyi & Sapaan Bahasa Italia',
    description: 'Pola bunyi fonetik konsonan ganda bahasa Italia serta kata sapaan umum.',
    voiceLang: 'it-IT',
    grid: [
      [
        { romaji: 'Bunyi [k]', char: 'ca, co, cu' },
        { romaji: 'Bunyi [k]', char: 'che, chi' },
        { romaji: 'Bunyi [c]', char: 'ce, ci' },
        { romaji: 'Bunyi [c]', char: 'cia, cio, ciu' },
        { romaji: 'Bunyi [ny]', char: 'gn' }
      ],
      [
        { romaji: 'Bunyi [ly]', char: 'gli' },
        { romaji: 'Bunyi [sy]', char: 'sci, sce' },
        { romaji: 'Bunyi [sk]', char: 'sche, schi' },
        { romaji: 'Vokal Beraksen', char: 'à, è, é, ì, ò, ù' },
        null
      ],
      [
        { romaji: 'Halo / Dadah', char: 'Ciao' },
        { romaji: 'Terima Kasih', char: 'Grazie' },
        { romaji: 'Sama-sama', char: 'Prego' },
        { romaji: 'Selamat Pagi', char: 'Buongiorno' },
        { romaji: 'Sampai Jumpa', char: 'Arrivederci' }
      ]
    ]
  },
  {
    id: 'rusia-cyrillic',
    name: 'Rusia (Sirilik)',
    badge: 'Sirilik Dasar',
    title: 'K. Tabel Huruf Sirilik Rusia Dasar',
    description: 'Aksara Sirilik Rusia yang digunakan di kawasan Eropa Timur dan Asia Utara.',
    voiceLang: 'ru-RU',
    grid: [
      [
        { romaji: 'A', char: 'А' },
        { romaji: 'B', char: 'Б' },
        { romaji: 'V', char: 'В' },
        { romaji: 'G', char: 'Г' },
        { romaji: 'D', char: 'Д' }
      ],
      [
        { romaji: 'E', char: 'Е' },
        { romaji: 'Yo', char: 'Ё' },
        { romaji: 'Zh', char: 'Ж' },
        { romaji: 'Z', char: 'З' },
        { romaji: 'I', char: 'И' }
      ],
      [
        { romaji: 'Y', char: 'Й' },
        { romaji: 'K', char: 'К' },
        { romaji: 'L', char: 'Л' },
        { romaji: 'M', char: 'М' },
        { romaji: 'N', char: 'Н' }
      ],
      [
        { romaji: 'O', char: 'О' },
        { romaji: 'P', char: 'П' },
        { romaji: 'R', char: 'Р' },
        { romaji: 'S', char: 'С' },
        { romaji: 'T', char: 'Т' }
      ],
      [
        { romaji: 'U', char: 'У' },
        { romaji: 'F', char: 'Ф' },
        { romaji: 'Kh', char: 'Х' },
        { romaji: 'Ts', char: 'Ц' },
        { romaji: 'Ch', char: 'Ч' }
      ],
      [
        { romaji: 'Sh', char: 'Ш' },
        { romaji: 'Shch', char: 'Щ' },
        { romaji: 'Hard', char: 'Ъ' },
        { romaji: 'Y', char: 'Ы' },
        { romaji: 'Soft', char: 'Ь' }
      ],
      [
        { romaji: 'E', char: 'Э' },
        { romaji: 'Yu', char: 'Ю' },
        { romaji: 'Ya', char: 'Я' },
        null,
        null
      ]
    ]
  },
  {
    id: 'yunani-greek',
    name: 'Yunani (Greek)',
    badge: 'Yunani Kuno & Modern',
    title: 'L. Tabel Alfabet Yunani Dasar',
    description: 'Aksara Yunani dasar yang digunakan dalam bahasa Yunani serta simbol ilmiah matematika & sains.',
    voiceLang: 'el-GR',
    grid: [
      [
        { romaji: 'Alpha', char: 'Α α' },
        { romaji: 'Beta', char: 'Β β' },
        { romaji: 'Gamma', char: 'Γ γ' },
        { romaji: 'Delta', char: 'Δ δ' },
        { romaji: 'Epsilon', char: 'Ε ε' }
      ],
      [
        { romaji: 'Zeta', char: 'Ζ ζ' },
        { romaji: 'Eta', char: 'Η η' },
        { romaji: 'Theta', char: 'Θ θ' },
        { romaji: 'Iota', char: 'Ι ι' },
        { romaji: 'Kappa', char: 'Κ κ' }
      ],
      [
        { romaji: 'Lambda', char: 'Λ λ' },
        { romaji: 'Mu', char: 'Μ μ' },
        { romaji: 'Nu', char: 'Ν ν' },
        { romaji: 'Xi', char: 'Ξ ξ' },
        { romaji: 'Omicron', char: 'Ο ο' }
      ],
      [
        { romaji: 'Pi', char: 'Π π' },
        { romaji: 'Rho', char: 'Ρ ρ' },
        { romaji: 'Sigma', char: 'Σ σ' },
        { romaji: 'Tau', char: 'Τ τ' },
        { romaji: 'Upsilon', char: 'Υ υ' }
      ],
      [
        { romaji: 'Phi', char: 'Φ φ' },
        { romaji: 'Chi', char: 'Χ χ' },
        { romaji: 'Psi', char: 'Ψ ψ' },
        { romaji: 'Omega', char: 'Ω ω' },
        null
      ]
    ]
  }
];
