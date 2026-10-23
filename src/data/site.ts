// Brand + navigation
import settings from './site-settings.json';

export const site = {
  ...settings,
  url: 'https://learning-bahasa-nine.vercel.app',
  secondary: { label: 'Katalog 250 Negara', href: '#katalog-section' },
  pro: '/',
  nav: [
    { label: 'Panduan', href: '#panduan' },
    { label: 'Tabel Aksara', href: '#area-belajar' },
    { label: 'Katalog Negara', href: '#katalog-section' },
    { label: '+ Buat Tabel', href: '#buat-tabel' },
  ],
  menu: [
    { label: 'Panduan', href: '#panduan' },
    { label: 'Tabel Aksara', href: '#area-belajar' },
    { label: 'Katalog Negara', href: '#katalog-section' },
    { label: '+ Buat Tabel', href: '#buat-tabel' },
  ],
  footer: [
    { title: 'Aksara Pilihan', links: [['Jepang (Hiragana)', '#area-belajar'], ['Jerman (Umlaut)', '#area-belajar'], ['Korea (Hangul)', '#area-belajar'], ['Arab (Hijaiyah)', '#area-belajar']] },
    { title: 'Daftar Negara', links: [['Asia (Jepang, Korea, Tiongkok)', '#katalog-section'], ['Eropa (Jerman, Prancis, Spanyol)', '#katalog-section'], ['Timur Tengah (Arab Saudi, Mesir)', '#katalog-section']] },
    { title: 'Fitur', links: [['Tabel Teks Interaktif', '#area-belajar'], ['Audio Web Speech', '#area-belajar'], ['Target Belajar Mandiri', '#katalog-section']] },
  ],
} as const;
