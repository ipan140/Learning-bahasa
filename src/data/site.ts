// Brand + navigation
import settings from './site-settings.json';

export const site = {
  ...settings,
  url: 'https://learning-bahasa-nine.vercel.app',
  secondary: { label: 'Buat Tabel Sendiri', href: '#buat-tabel' },
  pro: '/',
  nav: [
    { label: 'Tabel Aksara', href: '/' },
    { label: '+ Buat Tabel Sendiri', href: '#buat-tabel' },
  ],
  menu: [
    { label: 'Tabel Aksara', href: '/' },
    { label: '+ Buat Tabel Sendiri', href: '#buat-tabel' },
  ],
  footer: [
    { title: 'Aksara Asia', links: [['Jepang (Hiragana)', '/'], ['Jepang (Katakana)', '/'], ['Korea (Hangul)', '/']] },
    { title: 'Aksara Lain', links: [['Arab (Hijaiyah)', '/'], ['Rusia (Sirilik)', '/'], ['Yunani (Greek)', '/']] },
    { title: 'Fitur', links: [['Tabel Teks Interaktif', '/'], ['Audio Pengucapan', '/'], ['Buat Tabel Sendiri', '#buat-tabel']] },
  ],
} as const;
