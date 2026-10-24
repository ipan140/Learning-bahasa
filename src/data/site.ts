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
        ['Jepang (Hiragana)', '/belajar?lang=jepang-hiragana'], 
        ['Jerman (Umlaut)', '/belajar?lang=jerman-dasar'], 
        ['Korea (Hangul)', '/belajar?lang=korea-hangul'], 
        ['Arab (Hijaiyah)', '/belajar?lang=arab-hijaiyah']
      ] 
    },
    { 
      title: 'Daftar Negara', 
      links: [
        ['Asia (Jepang, Korea, Tiongkok)', '/katalog'], 
        ['Eropa (Jerman, Prancis, Spanyol)', '/katalog'], 
        ['Timur Tengah (Arab Saudi, Mesir)', '/katalog']
      ] 
    },
    { 
      title: 'Fitur', 
      links: [
        ['Studio Belajar Aksara', '/belajar'], 
        ['Database 250 Negara', '/katalog'], 
        ['Sinkronisasi Cloud', '/belajar']
      ] 
    },
  ],
} as const;
