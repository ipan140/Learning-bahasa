// Brand + navigation
import settings from './site-settings.json';

export const site = {
  ...settings,
  url: 'https://learning-bahasa-news.vercel.app',
  secondary: { label: 'Katalog Negara', href: '/katalog' },
  pro: '/belajar',
  nav: [
    { label: 'Tabel Aksara', href: '/belajar' },
    { label: 'Katalog Negara', href: '/katalog' },
    { label: 'Panduan & FAQ', href: '/panduan' },
  ],
  menu: [
    { label: 'Tabel Aksara', href: '/belajar' },
    { label: 'Katalog Negara', href: '/katalog' },
    { label: 'Panduan & FAQ', href: '/panduan' },
    { label: '+ Buat Tabel Kustom', href: '/belajar#buat-tabel' },
  ],
  footer: [
    { 
      title: 'Aksara & Kustom', 
      links: [
        ['Aksara Bawaan Populer', '/belajar'], 
        ['+ Buat Tabel Kustom Bebas', '/belajar#buat-tabel'], 
        ['Mode Flashcard & Kuis', '/belajar?mode=flashcard'], 
        ['Koleksi Frasa Harian', '/belajar?mode=phrases']
      ] 
    },
    { 
      title: 'Katalog Negara', 
      links: [
        ['Jelajahi Semua Negara', '/katalog'], 
        ['Target Belajar Pribadi', '/katalog?filter=targets'], 
        ['Kuis Trivia Dunia', '/katalog?action=trivia'], 
        ['Ekspor / Impor Data Excel', '/katalog']
      ] 
    },
    { 
      title: 'Panduan & FAQ', 
      links: [
        ['Tata Cara Lengkap Fitur', '/panduan'], 
        ['Format Spreadsheet Excel', '/panduan#excel'], 
        ['Pengaturan Suara TTS Global', '/panduan#audio'],
        ['Sinkronisasi Cloud Akun', '/panduan#cloud']
      ] 
    },
  ],
} as const;
