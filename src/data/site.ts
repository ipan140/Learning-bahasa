// Brand + navigation
import settings from './site-settings.json';

export const site = {
  ...settings,
  url: 'https://learning-bahasa-nine.vercel.app',
  secondary: { label: 'Katalog 250 Negara', href: '/katalog' },
  pro: '/belajar',
  nav: [
    { label: 'Panduan', href: '/#panduan' },
    { label: 'Tabel Aksara', href: '/belajar' },
    { label: 'Katalog 250 Negara', href: '/katalog' },
    { label: '+ Buat Tabel', href: '/belajar#buat-tabel' },
  ],
  menu: [
    { label: 'Panduan', href: '/#panduan' },
    { label: 'Tabel Aksara', href: '/belajar' },
    { label: 'Katalog 250 Negara', href: '/katalog' },
    { label: '+ Buat Tabel', href: '/belajar#buat-tabel' },
  ],
  footer: [
    { 
      title: 'Aksara Pilihan', 
      links: [
        ['Jepang (Hiragana & Katakana)', '/belajar?lang=jepang-hiragana'], 
        ['Jerman (Umlaut)', '/belajar?lang=jerman-dasar'], 
        ['Korea (Hangul)', '/belajar?lang=korea-hangul'], 
        ['Arab (Hijaiyah)', '/belajar?lang=arab-hijaiyah']
      ] 
    },
    { 
      title: 'Database 250 Negara', 
      links: [
        ['Semua 250 Negara Terintegrasi', '/katalog'], 
        ['Kawasan Asia & Oseania', '/katalog?region=Asia'], 
        ['Kawasan Eropa', '/katalog?region=Eropa'], 
        ['Kawasan Timur Tengah & Afrika', '/katalog?region=Timur+Tengah'],
        ['Target Belajar Saya', '/katalog?filter=targets']
      ] 
    },
    { 
      title: 'Fitur Sistem', 
      links: [
        ['Studio Belajar Aksara', '/belajar'], 
        ['Database 250 Negara Lengkap', '/katalog'], 
        ['Integrasi Cloud Otomatis', '/#panduan']
      ] 
    },
  ],
} as const;
